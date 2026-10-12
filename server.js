import Fastify from 'fastify';
import fastifyStatic from '@fastify/static';
import fastifyFormBody from '@fastify/formbody';
import twilio from 'twilio';
import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import OpenAI from 'openai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = Number(process.env.PORT || 3000);

const ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const twilioConfigured = Boolean(
    ACCOUNT_SID && AUTH_TOKEN && TWILIO_PHONE_NUMBER
);

const twilioClient = twilioConfigured
    ? twilio(ACCOUNT_SID, AUTH_TOKEN)
    : null;

const openai = OPENAI_API_KEY
    ? new OpenAI({ apiKey: OPENAI_API_KEY })
    : null;

const app = Fastify({ logger: true });

await app.register(fastifyFormBody);

await app.register(fastifyStatic, {
    root: __dirname,
    prefix: '/'
});

// HEALTH CHECK
app.get('/api/health', async () => ({
    ok: true,
    twilioConfigured,
    message: twilioConfigured
        ? 'Twilio is configured'
        : 'Twilio is not configured'
}));

// TWILIO VOICE RESPONSE
app.all('/api/voice', async (request, reply) => {
    reply.type('text/xml; charset=utf-8');

    return `<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Say voice="alice" language="en-IN">
        Hello, welcome to On-Ground Call Centre.
        How can I help you today?
    </Say>
</Response>`;
});

// OPENAI TEST ROUTE
app.post('/api/ai/test', async (request, reply) => {
    if (!openai) {
        return reply.code(503).send({
            ok: false,
            error: 'OPENAI_API_KEY is missing in the server environment.'
        });
    }

    try {
        const response = await openai.responses.create({
            model: 'gpt-4.1-mini',
            input: 'Say hello and introduce yourself as the On-Ground Call Centre AI assistant in one short sentence.'
        });

        return {
            ok: true,
            reply: response.output_text
        };
    } catch (error) {
        request.log.error(error);

        return reply.code(500).send({
            ok: false,
            error: 'AI request failed. Check the server logs and API account credits.'
        });
    }
});

// REAL TRIAL PHONE CALL
app.post('/api/trial-call', async (request, reply) => {
    if (!twilioConfigured) {
        return reply.code(503).send({
            ok: false,
            error: 'Twilio is not configured. Check your Render environment variables.'
        });
    }

    const to = String(request.body?.to || '').trim();

    // International format, for example +919876543210
    if (!/^\+[1-9]\d{7,14}$/.test(to)) {
        return reply.code(400).send({
            ok: false,
            error: 'Enter the phone number in international format, for example +919876543210.'
        });
    }

    try {
        const call = await twilioClient.calls.create({
            to,
            from: TWILIO_PHONE_NUMBER,
            url: 'https://call-1-sl8t.onrender.com/api/voice',
            method: 'POST'
        });

        return {
            ok: true,
            callSid: call.sid,
            message: 'Real Twilio trial call started successfully.'
        };
    } catch (error) {
        request.log.error(error);

        return reply.code(500).send({
            ok: false,
            error: error.message
        });
    }
});

// HOME PAGE
app.get('/', async (request, reply) => {
    return reply.sendFile('index.html');
});

// START SERVER
try {
    await app.listen({
        port: PORT,
        host: '0.0.0.0'
    });

    app.log.info(`On-Ground Call Centre running on port ${PORT}`);
} catch (error) {
    app.log.error(error);
    process.exit(1);
}
import Fastify from 'fastify';
import fastifyStatic from '@fastify/static';
import fastifyFormBody from '@fastify/formbody';
import twilio from 'twilio';
import dotenv from 'dotenv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT || 3000);

const ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER;

const twilioConfigured = Boolean(
    ACCOUNT_SID &&
    AUTH_TOKEN &&
    TWILIO_PHONE_NUMBER
);

const twilioClient =
    twilioConfigured
        ? twilio(ACCOUNT_SID, AUTH_TOKEN)
        : null;

const app = Fastify({
    logger: true
});

await app.register(fastifyFormBody);

await app.register(
    fastifyStatic,
    {
        root: __dirname,
        prefix: '/'
    }
);


// --------------------------------------------------
// HEALTH CHECK
// --------------------------------------------------
app.post('/api/voice', async (request, reply) => {
    reply.type('text/xml');

    return `
        <Response>
            <Say voice="alice" language="en-IN">
                Hello, welcome to On-Ground Call Centre.
                How can I help you today?
            </Say>
        </Response>
    `;
});
app.get('/api/health', async () => {
    return {
        ok: true,
        twilioConfigured,
        message: twilioConfigured
            ? 'Twilio is configured'
            : 'Twilio is not configured'
    };
});


// --------------------------------------------------
// REAL TRIAL PHONE CALL
// --------------------------------------------------

app.post('/api/trial-call', async (request, reply) => {

    if (!twilioConfigured) {
        return reply.code(503).send({
            ok: false,
            error:
                'Twilio is not configured. Add TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN and TWILIO_PHONE_NUMBER to .env'
        });
    }

    const to = String(
        request.body?.to || ''
    ).trim();


    // Check phone number format
    if (!/^\+[1-9]\d{7,14}$/.test(to)) {

        return reply.code(400).send({
            ok: false,
            error:
                'Enter the phone number in international format. Example: +919876543210'
        });

    }


    try {

        /*
         * IMPORTANT:
         *
         * Twilio Trial does not allow:
         *
         * <Dial><Number>
         * <Dial><Client>
         * ConversationRelay
         *
         * Therefore we use Twilio's official trial
         * Text-to-Speech template.
         */

        const call = await twilioClient.calls.create({

            to: to,

            from: TWILIO_PHONE_NUMBER,

            url:
                'https://webhooks.twilio.com/v1/Voice/Template/voice_text_to_speech'

        });


        return {
            ok: true,
            callSid: call.sid,
            message:
                'Real Twilio trial call started successfully.'
        };

    } catch (error) {

        app.log.error(error);

        return reply.code(500).send({
            ok: false,
            error: error.message
        });

    }

});


// --------------------------------------------------
// HOME PAGE
// --------------------------------------------------

app.get('/', async (request, reply) => {

    return reply.sendFile('index.html');

});


// --------------------------------------------------
// START SERVER
// --------------------------------------------------

app.listen({
    port: PORT,
    host: '0.0.0.0'
})
.then(() => {

    console.log(
        `On-Ground Call Centre running at http://localhost:${PORT}`
    );

})
.catch((error) => {

    console.error(error);

    process.exit(1);

});


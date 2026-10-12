# On-Ground.ai Call Centre Rebuild

A front-end rebuild of the On-Ground.ai call-centre workflow, extended with a **real telephony backend** so the browser can place calls to real phone numbers.

## What is included

- Dashboard, Plan, Calendar, Pulse and Avani screens based on the supplied mock workflow.
- Lead detail and customer journey views with sample lead data.
- Retail / Healthcare context switcher.
- **Real human-to-human calling:** an agent opens the browser dialer, enters a real customer number in E.164 format, and the browser connects through Twilio Voice to the customer's phone.
- **Real AI-to-human calling:** the backend starts a Twilio outbound PSTN call and connects the customer to Twilio ConversationRelay + OpenAI for a spoken AI conversation.
- Incoming browser calls are accepted through the Twilio Voice JavaScript SDK.
- No peer IDs and no simulated audio are used for the calling flow.

## Calling architecture

Browser microphone → Twilio Voice JavaScript SDK → Twilio Voice → customer phone number.

For AI calling:

Customer phone → Twilio Voice → ConversationRelay → WebSocket → OpenAI → ConversationRelay → customer phone.

The browser never receives Twilio secrets. It requests a short-lived Voice Access Token from `/api/token`.

## Requirements

- Node.js 20+ recommended.
- Twilio account with a voice-enabled Twilio phone number.
- Twilio API Key SID + Secret.
- A TwiML App whose Voice URL points to `/api/voice/outbound`.
- OpenAI API key for AI-to-human calling.
- A public HTTPS/WSS URL for Twilio webhooks and ConversationRelay. For local testing, ngrok can expose the Node server.

Twilio's current Voice JavaScript SDK supports browser calling and uses a TwiML App/server webhook for outbound calls. Twilio ConversationRelay provides the real-time speech-to-text / text-to-speech bridge used by the AI call.

## Setup

1. Open a terminal in this folder.
2. Install dependencies:

```bash
npm install
```

3. Copy `.env.example` to `.env` and fill in your credentials:

```bash
copy .env.example .env
```

On macOS/Linux use `cp .env.example .env`.

4. Start the app:

```bash
npm start
```

5. Open `http://localhost:3000`.

### Local public URL

For Twilio to reach your local server, run:

```bash
ngrok http 3000
```

Set `PUBLIC_BASE_URL` to the HTTPS hostname from ngrok, without the trailing slash. Example:

```text
PUBLIC_BASE_URL=https://abcd-1234.ngrok.app
```

Restart the Node server after changing `.env`.

## Twilio configuration

Create/configure a TwiML App in Twilio and set its Voice Request URL to:

```text
https://YOUR_PUBLIC_DOMAIN/api/voice/outbound
```

Use HTTP POST.

Set your Twilio phone number as `TWILIO_PHONE_NUMBER`.

For a Twilio trial account, outbound calls can be restricted to verified destination numbers. Use a number you are allowed to call for the demo.

## How to demonstrate the real calling requirement

### Demo 1 — Human agent to human customer

1. Open the app in Chrome/Edge.
2. Open **Plan → Calls to make**.
3. Open a lead or **Open real dialer**.
4. Enter your own second phone number in E.164 format.
5. Click the green phone button.
6. Allow microphone access.
7. The phone should ring from the Twilio number.
8. Answer it and speak from the browser. The phone and browser are the two human endpoints.

### Demo 2 — AI to human customer

1. Open the real dialer.
2. Enter a verified destination number.
3. Click **AI calls this number**.
4. The backend creates a real Twilio outbound call.
5. The customer answers and speaks naturally with the AI voice agent.

## Demo video requirement

The repository contains the working calling implementation, but a real-call recording must be captured from the configured Twilio account because it requires a live phone number and a human answering the call.

For the submission video, record the browser and the answering phone together. Show:

1. The lead number in the web dialer.
2. Clicking the real call button.
3. The phone ringing.
4. The customer answering.
5. At least 15–30 seconds of clear two-way conversation.
6. Ending the call.
7. Optionally repeat with **AI calls this number** to demonstrate AI-to-human calling.

Do not record or publish private phone numbers without consent.

## Short note for the assignment

> Calling is implemented with Twilio Voice rather than a simulated call screen. The web app uses the Twilio Voice JavaScript SDK to obtain a short-lived Access Token and connect the browser microphone to Twilio. Twilio then executes server-side TwiML that dials the customer's real E.164 phone number. AI-to-human calling uses Twilio Programmable Voice + ConversationRelay, with a secure WebSocket to an OpenAI model for the spoken AI response. This gives the app a real call-centre flow instead of peer IDs or simulated audio.

## Security

Never commit `.env`, Twilio API secrets, or the OpenAI API key. Only the backend holds provider secrets; the browser receives a temporary Voice Access Token.

## Project structure

```text
index.html       Main call-centre UI
styles.css       UI styling
app.js           UI logic + Twilio browser dialer
server.js        Fastify API, TwiML and AI WebSocket
package.json     Backend dependencies and scripts
.env.example     Required environment variables
README.md        Setup, architecture and demo instructions
```

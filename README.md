# On-Ground.ai Call Centre App — Assignment Submission

## Overview

This is an original front-end rebuild of the On-Ground.ai Call Centre web app, using the supplied mock as the product/reference source. The implementation is intentionally written from scratch rather than copying the supplied mock's HTML structure.

The app is a responsive, data-driven demo for a call-centre staff member at The Sleep Company. It focuses on the core workflow: understand today's work, prioritise leads, make/review calls, follow up over WhatsApp, collaborate in Pulse, use Avani coaching, and manage calendar/settings.

## Included screens

- **Dashboard** — OG Score, CSAT, handle time, queue, progress, earnings, tasks and 7-day trends.
- **Plan** — Calls to make, Incoming missed calls, Recent call history and Practise a call.
- **Lead analysis** — Lead score, AI summary, customer journey, signal buckets, pre-call notes and action buttons.
- **On-ground Call SOP** — Pre-call checklist before connecting the call.
- **Call simulation** — Incoming/practice call, live transcript, timer and AI-drafted wrap-up.
- **SOP review** — Review a completed call and jump to Avani practice for the weak skill.
- **Calendar** — Month view and upcoming store/coaching/callback events.
- **Pulse** — Channels, DMs, Customer Conversations and Kudos, plus AvaniBot actions.
- **Avani AI** — Assess, Learn and Practise flows with sample coaching content.
- **Notifications** — All/attention-style notification list.
- **Settings** — Employee profile, store, role, customer channel, industry and LinkedIn section.
- **Avatar** — Selling persona selector.
- **Action sheets** — No Interest, Came Back and WhatsApp follow-up flows.

## How to run

No build step or package installation is required.

1. Keep `index.html`, `styles.css` and `app.js` in the same folder.
2. Open `index.html` in Chrome/Edge/Firefox.
3. Use the bottom navigation to explore the app.
4. Click a lead in **Plan → Calls to make** to open the full lead analysis.
5. Use **On-ground Call** to see the SOP checklist and simulated call flow.

For a more realistic local run, serve the folder with any static HTTP server, for example:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Reference-to-implementation mapping

The supplied mock uses a Dashboard / Plan / Calendar / Pulse navigation model and a dedicated Avani coaching area. The rebuild preserves that information architecture while simplifying the implementation into maintainable data-driven JavaScript.

The supplied mock also contains lead actions such as No Interest, WhatsApp, On-ground Call and Came Back, as well as missed-call ranking, recent-call SOP review, customer conversations, Pulse channels/DMs and Avani coaching. Those workflows are represented here with sample data and functional demo interactions.

## Design approach

- Responsive web layout with a mobile-friendly bottom navigation.
- Neutral warm background, white cards, green operational actions and purple AI/coaching accents.
- No external framework or dependency is required.
- Sample data is stored in `app.js` so the UI can be replaced with API data later.
- Interactions are intentionally local/demo-only; there is no backend, authentication or real telephony/WhatsApp/LinkedIn integration.

## Product context from the assignment brief

The brief describes On-Ground.ai as an AI platform for premium offline products and services, connecting leads and customer conversations across call centre, store and field workflows. It states that the team has analysed more than 5,000 floor conversations across three retail brands, has around seven enterprise customers, and was selected by Sarvam as a startup to watch. It also highlights the reported 86% walk-in/no-follow-up problem and a +23.6 percentage-point conversion result associated with naming the shopper.

These claims are included here only as assignment context; the demo itself uses synthetic sample data.

## Files

- `index.html` — app shell and screen/overlay markup.
- `styles.css` — responsive visual system and component styles.
- `app.js` — sample data, rendering and interactions.

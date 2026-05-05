# Hotel Alimara AI Solutions MVP

A simple React + Vite exam MVP for Hotel Alimara Barcelona. The application demonstrates two local AI-enabled hospitality solutions without using any external AI API, backend, database, API key, or environment variables.

## MVPs Included

1. **Hotel Alimara FAQ Assistant**
   - Chat-style assistant for common guest questions.
   - Uses a fixed verified knowledge base and local keyword matching.
   - Answers in English or Spanish when the language is clearly detected.
   - Refuses unsupported topics instead of inventing hotel policies.

2. **Event Request Classifier**
   - Analyzes pasted event inquiries locally.
   - Classifies the event type, estimated size, date/time, requested services, urgency, department, missing information, confidence, and reasoning.
   - Generates a staff-ready reply draft without confirming availability or inventing prices.

## Install and Run Locally

```bash
npm install
npm run dev
```

Then open the local URL shown in the terminal, usually:

```bash
http://localhost:5173
```

## Deploy on Netlify or Vercel

This project is a standard Vite React app.

- Build command: `npm run build`
- Output directory: `dist`
- No environment variables are required.
- No serverless functions or backend routes are required.

## Main Technologies

- React
- Vite
- Local JavaScript rule-based logic
- CSS responsive layout

## Main Limitations

- The FAQ Assistant only answers questions covered by the verified local knowledge base.
- Out-of-scope, uncertain, overly specific, or live-information questions are refused politely and redirected to Hotel Alimara. This reduces hallucinations and keeps the assistant reliable.
- The Event Request Classifier uses transparent rules and keyword matching, so ambiguous requests may need human correction.
- The app does not check real availability, current prices, promotions, room inventory, or live hotel policies.
- All final guest or client replies should be reviewed by Hotel Alimara staff.

## Data Source Note

The demo is based on official Hotel Alimara website information used locally in the app, including location, contact details, rooms, check-in/check-out, parking, breakfast, restaurant, events, services, sustainability, pet policy, Wi-Fi, transport access, accessibility, families, luggage storage, gym, and payment information. The app does not scrape live data.

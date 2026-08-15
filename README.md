# Harbour Crew / 智工隊

Hong Kong SME product in the same category as [praxisclaw.ai](https://www.praxisclaw.ai/): a local AI-employee team, not a generic chatbot.

This is an independent demo. It is **not** affiliated with Praxis Claw or SOCIF.

## What’s in the app

- Bilingual marketing site (中 / EN): local appliance story, case study, consult form
- Console: hire AI staff, chat, skills, knowledge files, cron jobs, integrations, marketplace, audit log
- Chat uses SpaceXAI (`grok-4.6`) when `XAI_API_KEY` is set; otherwise the console runs in rehearsal mode

## Local

```bash
npm install
cp .env.example .env.local
# put XAI_API_KEY in .env.local for live Grok replies
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Console is at `/console`.

## Vercel

Framework is Next.js. Add `XAI_API_KEY` in project environment variables to turn rehearsal chat into live staff.

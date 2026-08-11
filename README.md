# FinOS

Personal financial operating system for India.

## Current product slice

- Executive financial dashboard built with Next.js
- Live Supabase read path for salary, holdings, liabilities and net-worth snapshots
- Safe demo mode when Supabase is not configured or temporarily unavailable
- Deployment-ready on Vercel

## Stack

- Next.js 14
- Tailwind CSS
- Supabase
- Vercel

## Vercel deployment

Import this repository into Vercel. It is automatically detected as a Next.js project.

Add these environment variables in **Vercel → Project → Settings → Environment Variables** for Production, Preview and Development:

```
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_publishable_or_legacy_anon_key
```

The dashboard remains available in labelled demo mode if those variables are intentionally absent, so preview deployments do not fail. When the variables are present, it reads live data from Supabase.

Run locally:

```bash
npm install
npm run dev
```

## Current Supabase tables

- `salary_profile`
- `investment_holdings`
- `liabilities`
- `networth_snapshot`
- `ai_documents`
- `ai_extractions`

> The present database is for demo data only. Enable Row Level Security and add ownership policies before storing real financial documents or connecting broker accounts.

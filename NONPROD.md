# FinancialOS Non-Production Environment

This branch is used to test changes before promotion to production.

## Environment

- Branch: `feature/nonprod-terminal`
- Purpose: preview and validate FinancialOS features before production
- Production branch remains unchanged until a tested change is promoted

## Current test target

- Dashboard: `/dashboard`
- Terminal / AI Command Centre: `/command`
- Home route: `/` → command centre

## Validation checklist

- [ ] Vercel preview deployment succeeds
- [ ] Dashboard loads live Supabase data
- [ ] Terminal loads live Supabase data
- [ ] Terminal appears in the dashboard sidebar
- [ ] Terminal navigation opens `/command`
- [ ] No regression in dashboard data or layout

Do not merge this branch to production until the above checks pass.

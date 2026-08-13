# Zerodha Kite Connect Integration

## App identity

- Provider: Zerodha Kite Connect
- App name: FinancialOS
- Intended use: read-only personal holdings sync
- Product tier: Kite Connect Personal

## Security

**Never commit the Kite API secret or access token to Git.** Store them as encrypted environment variables/secrets in Vercel/Supabase Edge Functions.

Required runtime secrets:

- `KITE_API_KEY`
- `KITE_API_SECRET`
- `KITE_ACCESS_TOKEN` (short-lived/session-derived; do not persist in source control)

The redirect URI is environment-specific and is configured in the Kite developer console and application environment settings.

## Flow

```text
FinancialOS
   |
   | Connect Zerodha
   v
Kite Login
   |
   | request_token
   v
FinancialOS callback
   |
   | exchange request_token for access_token
   v
Kite /portfolio/holdings
   |
   +--> investment_holdings (current state)
   |
   +--> zerodha_holding_snapshots (daily history)
   |
   +--> zerodha_sync_runs (audit)
```

## Database ownership

All user-owned financial records must contain `user_id uuid` referencing `auth.users(id)`.

The Zerodha tables are designed for:

- `zerodha_accounts`: connection/account metadata
- `zerodha_holding_snapshots`: immutable daily holding snapshots
- `zerodha_sync_runs`: sync attempt/audit log

## Current implementation status

- [x] Supabase schema created
- [x] `user_id` ownership fields added
- [x] Existing sample investment holdings cleared
- [ ] Kite callback endpoint
- [ ] OAuth request-token exchange
- [ ] Holdings fetch
- [ ] Current-holdings upsert
- [ ] Daily snapshot insert
- [ ] Scheduled sync
- [ ] RLS policies for authenticated users
- [ ] First live sync

## Important rule

The Git repository must never contain real API secrets. If credentials are ever exposed, rotate/revoke them in the provider console immediately.

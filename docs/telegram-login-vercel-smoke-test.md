# Telegram Login + Vercel Smoke Test

This test is intentionally isolated from the FinOS product code.

## What the test can prove
- Vercel can serve a Next.js page and HTTPS callback endpoint.
- Telegram website login can authenticate a dashboard user using the current documented OIDC flow.
- The server can validate the ID token and establish an app session.

## What it cannot prove
- Telegram website login is not an MTProto client login.
- A successful dashboard login does not grant archive rights to channels.
- Vercel functions are not a persistent Telegram update listener. Their filesystem is read-only apart from temporary scratch space and is not durable storage.
- This smoke test does not download or extract protected content.

## Setup checklist
1. Create/register the app's Telegram Login configuration with @BotFather.
2. Add the Vercel production URL and callback URL to Allowed URLs.
3. Add server-side environment variables in Vercel:
   - TELEGRAM_LOGIN_CLIENT_ID
   - TELEGRAM_LOGIN_CLIENT_SECRET
   - APP_SESSION_SECRET (generate a high-entropy random secret)
   - APP_BASE_URL (canonical https origin)
4. Do not use NEXT_PUBLIC_ for secrets.
5. Implement OIDC Authorization Code Flow with PKCE, state and nonce; validate issuer, audience, signature, expiry, and nonce on the server.
6. Establish a Secure, HttpOnly, SameSite session cookie with appropriate expiry and CSRF defenses.
7. Confirm a logged-in user sees their Telegram profile ID and a dashboard message stating: "Website login verified; Telegram client session not connected."
8. For future authorized ingestion, provision a separate persistent Linux worker with a durable disk. Only add channels that you own/administer and are authorized to archive. Skip protected content.

## Vercel deployment
Import the feature branch into a separate Vercel preview project if you want isolation from the financial dashboard. Do not deploy this test into the FinOS production domain unless you explicitly want that association.

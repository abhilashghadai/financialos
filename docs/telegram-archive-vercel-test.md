# Telegram Login & Authorized Archive Feasibility Test

## Goal
Test Telegram website login on a Vercel-hosted web dashboard and validate boundaries between website authentication, Telegram API access, and persistent file storage.

## Important separation
- Use Telegram's current OpenID Connect (OIDC) Authorization Code Flow with PKCE where available. Register the production and preview callback URLs in @BotFather as allowed URLs.
- Website login only authenticates a dashboard user. It does not create an MTProto client session for channel updates or authorize any particular channel.
- Vercel is suitable for the web UI and request/response endpoints. Do not use a Vercel function as an always-on Telegram update listener.
- Vercel function filesystem writes are ephemeral scratch storage, not a durable media archive. Use a persistent Linux worker/server with a persistent disk for continuous ingestion and server-disk storage.
- Only ingest media from channels the operator owns/administers and is authorized to archive. Respect Telegram content protection; do not extract protected media from app caches or bypass forwarding/saving restrictions.

## Feasibility stages
1. Deploy a minimal Next.js dashboard to Vercel.
2. Configure Telegram Login's current OIDC flow and validate ID tokens server-side using the documented issuer/JWKS and registered client configuration.
3. Establish a secure app session using HTTP-only, Secure, SameSite cookies; use short expiry and CSRF protections.
4. Add a dashboard status screen that reports website login separately from Telegram client-session connectivity.
5. Separately provision a persistent Linux worker and disk for channels approved for archiving.
6. Connect the worker through a supported Telegram authorization flow; ingest new posts only from an administrator-maintained allowlist and skip protected media.
7. Test with a channel you own/administer and sample media whose archiving is permitted.

## Server-side environment variables
- TELEGRAM_LOGIN_CLIENT_ID
- TELEGRAM_LOGIN_CLIENT_SECRET
- TELEGRAM_BOT_USERNAME (non-secret)
- APP_SESSION_SECRET (random, high entropy)
Never use NEXT_PUBLIC_* for secrets. Keep all credentials out of logs and Git.

## Acceptance checks
- Verified Telegram login establishes a dashboard session.
- Invalid or replayed authentication results are rejected according to OIDC validation and nonce/state requirements.
- No secrets are returned to the browser.
- Dashboard does not equate website login with channel access.
- Durable archive storage runs on persistent storage, not Vercel function scratch space.
- Protected content is not downloaded or extracted.

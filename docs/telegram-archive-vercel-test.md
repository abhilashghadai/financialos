# Telegram Login & Authorized Archive Feasibility Test

## Goal
Test Telegram website login on a Vercel-hosted web dashboard and validate the boundaries between website authentication, Telegram API access, and persistent file storage.

## Important platform distinction
- Telegram website login authenticates a visitor to the dashboard. It does not create an MTProto client session for reading channel updates.
- A Vercel deployment is suitable for the web UI and request/response endpoints. Serverless functions should not be treated as an always-on Telegram update listener.
- Local filesystem writes in a serverless function are ephemeral. They are not durable archive storage.
- Use a separate persistent worker/server and persistent disk for continuous ingestion and local-file archive storage.
- The app must only ingest media from channels the operator owns/administers and is authorized to archive. Respect Telegram content protection; do not extract protected media from app caches or bypass forwarding/saving restrictions.

## Feasibility stages
1. Deploy a minimal Next.js page to Vercel.
2. Configure Telegram's official website login using its current documented integration; verify the signed login payload on the server.
3. Store only the app session in a secure, HTTP-only, SameSite cookie; do not store Telegram API hashes, login codes, passwords, or MTProto session strings in the browser.
4. Add a dashboard status page that reports web login success, without claiming that an MTProto client is connected.
5. Separately provision a persistent Linux worker and disk for channels approved for archiving.
6. Connect the worker to Telegram through a supported client authorization flow; ingest new posts only from an administrator-maintained allowlist and skip protected media.
7. Test with a channel you own/administer and sample media whose archiving is permitted.

## Secrets (Vercel environment variables)
- TELEGRAM_BOT_TOKEN: only if needed by the selected official login integration; server-side only.
- TELEGRAM_LOGIN_BOT_USERNAME: public bot username, not a secret.
- APP_SESSION_SECRET: a random 32+ byte secret for signing/encrypting app sessions.
- Allowed origin / canonical site URL.
Never put secrets in NEXT_PUBLIC_* variables, client bundles, logs, or Git history.

## Acceptance checks
- Verified Telegram login establishes a dashboard session.
- An invalid or replayed login payload is rejected according to the chosen official flow's validation rules.
- No secrets are returned to the browser.
- Dashboard does not equate website login with channel access.
- Server disk archive is implemented on persistent storage, not Vercel ephemeral storage.
- Protected content is not downloaded or extracted.

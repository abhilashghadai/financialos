# FinancialOS Staging

This branch mirrors production and is the safe environment for developing and testing the Terminal / AI Command Centre before promotion to production.

## Branch model

- `main` — production
- `stage` — staging / preview
- `feature/*` — isolated feature work

Staging should initially remain functionally equivalent to production. New Terminal and AI functionality is added and verified here before merging to `main`.

# FinancialOS Staging

This branch is a staging environment for validating the Terminal / AI Command Centre before promotion to production.

## Branch

`staging/financialos-terminal`

## Purpose

- Mirror the current production dashboard and data model.
- Validate the Terminal navigation and `/command` experience.
- Test future AI, OCR, and integrations without changing production.

## Promotion rule

Only promote changes after the Vercel preview is verified for build success, dashboard regression safety, Supabase connectivity, and Terminal navigation.

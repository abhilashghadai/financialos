# Dashboard Premium V4

## Design direction

Rebuild the FinancialOS home experience as a premium personal financial operating system rather than a generic KPI dashboard.

### Primary goals

- One strong daily financial briefing at the top.
- Large, calm typography and generous whitespace.
- Minimal borders; cards used only when they add hierarchy.
- Live Supabase data remains the source of truth.
- Existing service/data contracts remain intact.
- Existing AI Command Center remains a separate workspace within the existing app shell.
- Modules render only when meaningful source data exists.
- No fabricated values or “Coming Soon” placeholders.

## Information architecture

1. Overview
2. Investments
3. Accounts
4. Planning
5. AI
6. Settings

Secondary capabilities such as debt, documents, cash flow and protection should appear within these workspaces rather than as a long flat sidebar.

## Overview composition

### Hero

- Good morning / evening greeting.
- Current net worth.
- Today’s change when historical/current market data exists.
- Last sync timestamp.
- One primary action: Add data / Connect an account.

### Daily financial brief

A compact narrative layer explaining what changed and what matters today.

Examples:

- portfolio movement
- salary or cash-flow events
- upcoming EMI/SIP
- unusual spending
- goal progress

### Portfolio preview

Show real holdings only when present. The section should support provider/source badges and daily gain/loss once the source supplies it.

### Planning

Show only goals that actually exist.

### Timeline / activity

Show meaningful system events and financial events when records exist, such as successful broker syncs, statement imports, salary credits, SIPs and major net-worth milestones.

### AI briefing

Display concise deterministic or LLM-generated insights. The calculation engine remains authoritative for numbers; the LLM explains them.

## Visual system

- Background: deep charcoal / near-black.
- Primary accent: lime.
- Positive: cyan/teal.
- Attention: amber.
- Risk: muted red.
- Typography: strong display face for headline, neutral sans for body, mono only for financial/system metadata.
- Avoid dense grid layouts and excessive outlined cards.

## Data-first rendering contract

For every module:

```text
real data exists -> render module
no data -> render nothing
```

Do not display empty states for future providers unless the user explicitly opens the related integration/settings area.

## Backend contract

Do not change the existing Supabase service layer merely for visual redesign. Continue consuming the typed `DashboardSummary` and existing integration services, then expand the model intentionally as new providers are connected.

## Acceptance criteria

- Feels like a premium financial product, not an admin dashboard.
- First viewport clearly answers: net worth, what changed, and what needs attention.
- No fake financial values.
- No “Coming Soon” provider cards on the home page.
- AI Command Center continues to work without route confusion.
- Responsive on iPad and desktop.
- Existing Supabase wiring remains functional.

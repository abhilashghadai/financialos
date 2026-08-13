# FinancialOS dashboard data-visibility rules

## Principle

The dashboard is data-driven and should render only financial sections for which the authenticated user has real, non-zero data.

Do not render placeholder or "Coming Soon" investment sources.

Examples:

- Show Zerodha only when there is a valid Zerodha holding/sync result for the user.
- Show Mutual Funds only when mutual-fund holdings exist.
- Show US Stocks only when US-stock records exist.
- Show Crypto only when crypto records exist.
- Show EPF only when EPF data exists.
- Show Gold only when gold holdings exist.

## Empty-state behavior

A missing data source should normally be invisible, not displayed as an empty card.

The dashboard should therefore be composed from a set of data-backed modules. Each module decides whether it is visible from its data availability state.

## Portfolio summary contract

The portfolio aggregation layer should return:

- total current value
- total invested value
- total gain/loss
- today's change
- holding count
- last sync time
- source summaries

Each source summary should include a stable provider/type identifier and a numeric current value so the UI can filter out unavailable or empty sources.

## Architecture

```text
Provider integrations
        ↓
Normalized holdings / assets
        ↓
Portfolio aggregation service
        ↓
Dashboard view model
        ↓
Visible modules only
```

The frontend must not invent data to fill the dashboard. Demo fixtures may be used in isolated development components, but production/staging dashboard data should come from the authenticated user's real records.

## Future sources

New providers can be added without changing the dashboard shell:

- Zerodha
- CAMS / mutual funds
- US stocks
- EPF
- Gold
- Crypto
- Bank/cash
- NPS / PPF
- Real estate

A source appears automatically after its normalized records exist.

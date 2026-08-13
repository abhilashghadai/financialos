# Dynamic Investment Portfolio Card

## Behavior

The Investment Portfolio card is a data-driven summary of all investments available to the authenticated user.

It must not show placeholders such as "Coming Soon" for sources that have no records.

A source becomes visible only after real records exist for that source.

## Initial source

- Zerodha holdings, refreshed daily.

## Future sources

These should appear automatically when data is available:

- Mutual funds / CAMS
- US stocks
- EPF
- Gold
- Crypto
- NPS / PPF
- Bank/cash investments
- Other supported assets

## Card metrics

When data exists, show:

- Current investment value
- Invested value
- Overall gain/loss
- Overall return percentage
- Today's change
- Number of holdings
- Last sync timestamp

## Source breakdown

Show only source rows for sources with a positive data presence. Do not show empty or planned sources.

## No-data behavior

If no investments are connected yet, show one compact empty state explaining that investments will appear here after a source is connected. Do not manufacture values.

## Architectural rule

The dashboard should receive a normalized portfolio view model from the service layer. The UI should not contain provider-specific logic for deciding whether a source exists.

```text
Provider integrations
       ↓
Normalized holdings/assets
       ↓
Portfolio aggregation
       ↓
Dashboard view model
       ↓
Investment card
```

This same conditional-visibility principle should apply across the entire dashboard: cards, sections and metrics should appear only when the underlying user data exists.
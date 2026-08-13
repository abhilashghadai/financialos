# Dynamic Investment Portfolio Card

## Product rule

FinancialOS is data-driven. A module, source, card, metric, or section is rendered only when it has real data for the authenticated user.

Do not render `Coming Soon`, zero-value placeholders, or fabricated investment sources.

## Current investment card

The card should aggregate all investment sources that currently have records.

### Example

```text
INVESTMENTS

Total current value      ₹X.XXL
Invested value           ₹X.XXL
Overall gain             ₹X.XX
Overall return           X.XX%
Holdings                 N
Last updated             Today · HH:MM

Sources
Zerodha                  ₹X.XXL
Mutual Funds             ₹X.XXL
US Stocks                ₹X.XXL
EPF                      ₹X.XXL
Gold                     ₹X.XXL
```

Only rows with actual holdings are displayed. The source list is generated from the database and is not hardcoded.

## Data flow

```text
Integration
   ↓
Normalized holdings
   ↓
Investment aggregation view/service
   ↓
Investment Portfolio Card
   ↓
Dashboard / AI Command Center
```

## Current source

Zerodha is the first live investment integration. The first successful Kite holdings sync should populate `investment_holdings` and the aggregation views automatically.

## Future sources

CAMS mutual funds, US equities, EPF, gold, crypto, NPS and other assets plug into the same normalized model. No UI code should be added solely to support an unavailable source.

## Empty state

When there are no investment records, show a compact neutral state such as:

`No investment data connected yet.`

Do not show source placeholders.

## Dashboard-wide rule

The same principle applies across the entire product:

- No insurance card until insurance data exists.
- No crypto section until crypto data exists.
- No goal widget until goals exist.
- No US equities section until US equity records exist.
- No debt analytics until liabilities are populated.
- No AI insight until the financial engine has enough real data to support it.

The dashboard should progressively reveal capabilities as the user's real financial data grows.
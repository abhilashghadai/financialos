# Financial Engine V1

The Financial Intelligence Engine is deterministic TypeScript code owned by FinancialOS. It calculates authoritative financial facts; AI providers explain those facts later.

## Pipeline

```text
Supabase / integrations
        ↓
Normalized financial inputs
        ↓
Financial Engine V1
        ├── Net worth
        ├── Portfolio
        ├── Cash flow
        ├── Debt
        ├── Financial health scoring
        └── Rule-based insights
        ↓
Structured financial context
        ↓
AI provider (later)
        ↓
Dashboard / AI Command Center
```

## Modules

- `networth.ts` — assets minus liabilities.
- `portfolio.ts` — invested value, current value, gain/loss, allocation and concentration.
- `cashflow.ts` — income, expenses, surplus and savings rate.
- `debt.ts` — outstanding debt, EMI, debt-to-assets and highest interest rate.
- `scoring.ts` — transparent weighted Financial Health Score.
- `insights.ts` — deterministic rules that produce explainable financial findings.
- `types.ts` — shared contracts between the engine, dashboard and future AI layer.

## Design rules

1. The engine does not call an LLM.
2. The engine does not access external broker APIs directly.
3. Integrations write normalized data to Supabase; the engine consumes normalized data.
4. Every scoring rule must be deterministic, documented and testable.
5. Every insight should identify its source rule.
6. Engine changes should be versioned so historical scores can be explained later.
7. AI receives structured engine output rather than raw database tables whenever possible.

## V1 boundaries

The first implementation intentionally does not calculate tax, retirement Monte Carlo, XIRR, insurance adequacy or goal probability. Those are planned for later engine versions.

## AI contract

A future AI adapter should consume `FinancialEngineOutput` and turn it into explanations, summaries, questions and recommendations. Swapping GPT, Claude, Gemini or another provider should not change the Financial Engine.

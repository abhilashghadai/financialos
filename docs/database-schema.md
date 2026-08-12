# FinancialOS Database Schema

This document is the source-of-truth reference for the current FinancialOS database model. It describes the purpose of each table, field meanings, expected data types, and how the application should use the data.

> The database is currently single-user, but the model should remain scalable to multiple users later. User scoping can be introduced through `user_id` foreign keys and Row Level Security without changing the core financial entities.

## 1. `networth_snapshot`

Stores point-in-time balance-sheet snapshots used by the dashboard and historical net-worth analysis.

| Field | Type | Definition |
|---|---|---|
| `id` | bigint / integer | Primary key for the snapshot record. |
| `snapshot_date` | date | Business date represented by the snapshot. This is the field used to identify the current/latest snapshot. |
| `assets` | numeric | Total assets at the snapshot date. |
| `liabilities` | numeric | Total liabilities at the snapshot date. |
| `networth` | numeric | Net worth at the snapshot date; normally `assets - liabilities`. |
| `created_at` | timestamptz | Audit timestamp for when the database row was created. Not the business date. |

### Rules

- `snapshot_date` is the business key for daily/monthly balance-sheet snapshots.
- Only one snapshot should exist for a given `snapshot_date`.
- The application must query the latest snapshot using `ORDER BY snapshot_date DESC`.
- `created_at` is for auditing and must not be used to determine the financial period represented by a snapshot.

## 2. `salary_profile`

Stores the latest known salary/net-salary information extracted from payslips or entered manually.

| Field | Type | Definition |
|---|---|---|
| `id` | bigint / integer | Primary key. |
| `company` | text | Employer associated with the salary record. |
| `monthly_net` | numeric | Monthly net salary available after payroll deductions. |
| `updated_at` | timestamptz | Timestamp when the salary record was last updated. |

### Rules

- `monthly_net` is the value used by the dashboard for current net income.
- Salary history should eventually move to a dedicated historical table rather than overwriting one current profile.

## 3. `investment_holdings`

Stores current investment positions from manual imports and future integrations such as Zerodha/CAS/CDSL.

| Field | Type | Definition |
|---|---|---|
| `id` | bigint / integer | Primary key for the holding. |
| `asset_name` | text | Display name of the investment/asset. |
| `asset_type` | text | Broad investment type, e.g. Stock, ETF, Mutual Fund, Retirement, Crypto, Gold. |
| `platform` | text | Source/platform, e.g. Zerodha, CAMS, Manual, eTrade. |
| `current_value` | numeric | Current market/value amount used in dashboard calculations. |
| `updated_at` | timestamptz | Last time the holding value was updated, when available. |

### Rules

- `current_value` is the live/current value for the holding, not the original invested amount.
- The dashboard derives total investments by summing `current_value` across holdings.
- Future integrations should write normalized records into this table rather than creating provider-specific dashboard tables.

## 4. Planned `investment_snapshots`

This table is planned for the next data-model phase. It will preserve historical portfolio values without overwriting current holdings.

Suggested fields:

| Field | Type | Definition |
|---|---|---|
| `id` | bigint | Primary key. |
| `snapshot_date` | date | Date of the portfolio valuation. |
| `source` | text | Data source such as Zerodha, CAS, CDSL, Manual. |
| `total_value` | numeric | Total portfolio value on the snapshot date. |
| `invested_value` | numeric | Total invested capital represented by the source, where available. |
| `pnl` | numeric | Profit/loss represented by the snapshot. |
| `created_at` | timestamptz | Audit timestamp. |

## 5. Planned `loans`

Stores debt facilities and repayment information.

Suggested fields:

| Field | Type | Definition |
|---|---|---|
| `id` | bigint | Primary key. |
| `lender` | text | Bank/lender/provider. |
| `loan_type` | text | Vehicle, Personal, Home, Credit Card, etc. |
| `outstanding_principal` | numeric | Remaining principal amount. |
| `emi` | numeric | Current scheduled monthly EMI. |
| `interest_rate` | numeric | Annual interest rate, where known. |
| `remaining_months` | integer | Estimated remaining tenure. |
| `updated_at` | timestamptz | Last update timestamp. |

## 6. Planned `goals`

Stores financial goals such as house purchase, retirement/FIRE, education, or emergency fund targets.

Suggested fields:

| Field | Type | Definition |
|---|---|---|
| `id` | bigint | Primary key. |
| `name` | text | Human-readable goal name. |
| `target_amount` | numeric | Amount required for the goal. |
| `target_date` | date | Target completion date. |
| `current_amount` | numeric | Current amount already assigned/funded. |
| `priority` | integer | Relative planning priority. |
| `status` | text | Active, achieved, paused, or archived. |

## 7. Planned `documents`

Tracks uploaded financial documents used for OCR/import. Original files should be deleted after extraction and user confirmation unless the retention policy explicitly requires otherwise.

Suggested fields:

| Field | Type | Definition |
|---|---|---|
| `id` | bigint | Primary key. |
| `document_type` | text | Payslip, CAS, loan statement, bank statement, insurance, etc. |
| `source_filename` | text | Original uploaded filename. |
| `storage_path` | text | Temporary Supabase Storage object path. |
| `ocr_status` | text | Uploaded, processing, extracted, confirmed, failed, deleted. |
| `extracted_at` | timestamptz | When OCR/extraction completed. |
| `confirmed_at` | timestamptz | When the user confirmed the extracted data. |
| `deleted_at` | timestamptz | When the temporary file was deleted. |

## 8. Planned `ai_insights`

Stores generated financial explanations and recommendations so the UI can display an auditable AI history.

Suggested fields:

| Field | Type | Definition |
|---|---|---|
| `id` | bigint | Primary key. |
| `insight_type` | text | Net-worth, debt, investment, goal, alert, monthly-review, etc. |
| `severity` | text | Info, good, watch, warning. |
| `title` | text | Short human-readable insight title. |
| `body` | text | AI-generated explanation. |
| `source_snapshot_date` | date | Financial date used to generate the insight. |
| `model` | text | Model/provider used to generate the insight. |
| `created_at` | timestamptz | Generation timestamp. |

## 9. Planned `sync_history`

Tracks imports and integrations such as Zerodha or CAS.

| Field | Type | Definition |
|---|---|---|
| `id` | bigint | Primary key. |
| `source` | text | Zerodha, CAMS, Manual, OCR, etc. |
| `started_at` | timestamptz | Sync start time. |
| `completed_at` | timestamptz | Sync completion time. |
| `status` | text | Running, completed, failed. |
| `records_imported` | integer | Number of normalized records created/updated. |
| `error_message` | text | Diagnostic message when a sync fails. |

## 10. Application conventions

### Current-value vs historical-value

- Current state belongs in entities such as `investment_holdings` and `loans`.
- Historical state belongs in snapshot/history tables.
- Never infer the business period from `created_at` when a dedicated date field exists.

### Money fields

Use PostgreSQL `numeric` for money/value amounts instead of floating point types.

### Source lineage

Every imported or synchronized financial record should carry a source/provider identifier wherever practical. This enables reconciliation, debugging, and AI explanations.

### AI safety

AI outputs are interpretations of structured financial data. The database remains the source of truth. Generated recommendations should retain the data date and model used for auditability.

### Single-user to multi-user migration

The initial application can run without authentication. Before multi-user release, add `user_id` to user-owned tables, foreign-key them to the auth user identity, and enforce Row Level Security.

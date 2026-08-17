import type { FinancialHealthScore } from './types';

const clamp = (value: number) => Math.max(0, Math.min(100, value));

/**
 * Transparent first-version scoring rules. These are intentionally simple and
 * deterministic; they can be versioned as the FinancialOS financial model grows.
 */
export function scoreFinancialHealth(input: {
  savingsRate: number;
  debtToAssetRatio: number;
  emergencyFundMonths: number;
  investmentDiversificationScore: number;
  goalFundingScore: number;
  protectionScore: number;
}): FinancialHealthScore {
  const savings = clamp(input.savingsRate * 1.5);
  const debt = clamp(100 - input.debtToAssetRatio * 2);
  const liquidity = clamp(input.emergencyFundMonths * 16.67);
  const investments = clamp(input.investmentDiversificationScore);
  const goals = clamp(input.goalFundingScore);
  const protection = clamp(input.protectionScore);

  const overall = Math.round(
    savings * 0.2 +
      debt * 0.2 +
      liquidity * 0.15 +
      investments * 0.2 +
      goals * 0.15 +
      protection * 0.1,
  );

  return {
    overall: clamp(overall),
    dimensions: {
      savings: Math.round(savings),
      debt: Math.round(debt),
      liquidity: Math.round(liquidity),
      investments: Math.round(investments),
      goals: Math.round(goals),
      protection: Math.round(protection),
    },
  };
}

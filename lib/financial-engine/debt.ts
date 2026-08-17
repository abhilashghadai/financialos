import type { DebtAnalysis } from './types';

export function analyzeDebt(
  totalOutstanding: number,
  monthlyEmi: number,
  highestInterestRate: number,
  totalAssets: number,
): DebtAnalysis {
  const outstanding = Math.max(0, totalOutstanding);
  const assets = Math.max(0, totalAssets);

  return {
    totalOutstanding: outstanding,
    monthlyEmi: Math.max(0, monthlyEmi),
    debtToAssetRatio: assets > 0 ? (outstanding / assets) * 100 : 0,
    highestInterestRate: Math.max(0, highestInterestRate),
  };
}

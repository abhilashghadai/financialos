import type { NetWorthAnalysis } from './types';

export function analyzeNetWorth(totalAssets: number, totalLiabilities: number): NetWorthAnalysis {
  const assets = Math.max(0, totalAssets);
  const liabilities = Math.max(0, totalLiabilities);

  return {
    totalAssets: assets,
    totalLiabilities: liabilities,
    netWorth: assets - liabilities,
  };
}

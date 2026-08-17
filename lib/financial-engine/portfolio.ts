import type { PortfolioAnalysis, PortfolioHolding } from './types';

const add = (map: Record<string, number>, key: string, value: number) => {
  map[key] = (map[key] ?? 0) + value;
};

export function analyzePortfolio(holdings: PortfolioHolding[]): PortfolioAnalysis {
  const totalInvested = holdings.reduce((sum, holding) => sum + holding.investedValue, 0);
  const totalValue = holdings.reduce((sum, holding) => sum + holding.currentValue, 0);
  const gainLoss = totalValue - totalInvested;
  const gainLossPercent = totalInvested > 0 ? (gainLoss / totalInvested) * 100 : 0;

  let largestHolding: PortfolioAnalysis['largestHolding'] = null;
  const allocationByType: Record<string, number> = {};
  const allocationByPlatform: Record<string, number> = {};

  for (const holding of holdings) {
    if (holding.currentValue <= 0) continue;
    const type = holding.type || 'Other';
    const platform = holding.platform || 'Other';
    add(allocationByType, type, holding.currentValue);
    add(allocationByPlatform, platform, holding.currentValue);

    const weight = totalValue > 0 ? (holding.currentValue / totalValue) * 100 : 0;
    if (!largestHolding || weight > largestHolding.weight) {
      largestHolding = { name: holding.name, value: holding.currentValue, weight };
    }
  }

  return {
    totalInvested,
    totalValue,
    gainLoss,
    gainLossPercent,
    holdingCount: holdings.length,
    largestHolding,
    allocationByType,
    allocationByPlatform,
  };
}

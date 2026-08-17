import type { FinancialInsight } from './types';

export function generateFinancialInsights(input: {
  savingsRate: number;
  debtToAssetRatio: number;
  emergencyFundMonths: number;
  largestHoldingWeight: number;
  totalInvestments: number;
}): FinancialInsight[] {
  const insights: FinancialInsight[] = [];

  if (input.emergencyFundMonths > 0 && input.emergencyFundMonths < 6) {
    insights.push({
      id: 'liquidity-below-target',
      severity: input.emergencyFundMonths < 3 ? 'critical' : 'warning',
      title: 'Emergency reserve is below target',
      message: `Current emergency-fund coverage is ${input.emergencyFundMonths.toFixed(1)} months; the first target is 6 months.`,
      source: 'liquidity-rule-v1',
    });
  }

  if (input.debtToAssetRatio > 30) {
    insights.push({
      id: 'debt-ratio-high',
      severity: input.debtToAssetRatio > 50 ? 'critical' : 'warning',
      title: 'Debt burden is elevated',
      message: `Liabilities are ${input.debtToAssetRatio.toFixed(1)}% of assets.`,
      source: 'debt-rule-v1',
    });
  }

  if (input.largestHoldingWeight > 20 && input.totalInvestments > 0) {
    insights.push({
      id: 'concentration-high',
      severity: input.largestHoldingWeight > 30 ? 'critical' : 'warning',
      title: 'Portfolio concentration is high',
      message: `The largest holding represents ${input.largestHoldingWeight.toFixed(1)}% of invested value.`,
      source: 'portfolio-rule-v1',
    });
  }

  if (input.savingsRate >= 25) {
    insights.push({
      id: 'savings-healthy',
      severity: 'info',
      title: 'Savings rate is healthy',
      message: `Current modeled savings rate is ${input.savingsRate.toFixed(1)}%.`,
      source: 'savings-rule-v1',
    });
  }

  return insights;
}

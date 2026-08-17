export type FinancialHealthDimension =
  | 'savings'
  | 'debt'
  | 'liquidity'
  | 'investments'
  | 'goals'
  | 'protection';

export type FinancialHealthScore = {
  overall: number;
  dimensions: Record<FinancialHealthDimension, number>;
};

export type PortfolioHolding = {
  id: number;
  name: string;
  type: string | null;
  platform: string | null;
  investedValue: number;
  currentValue: number;
  quantity?: number;
};

export type PortfolioAnalysis = {
  totalInvested: number;
  totalValue: number;
  gainLoss: number;
  gainLossPercent: number;
  holdingCount: number;
  largestHolding: {
    name: string;
    value: number;
    weight: number;
  } | null;
  allocationByType: Record<string, number>;
  allocationByPlatform: Record<string, number>;
};

export type CashFlowAnalysis = {
  monthlyIncome: number;
  monthlyExpenses: number;
  monthlySurplus: number;
  savingsRate: number;
};

export type DebtAnalysis = {
  totalOutstanding: number;
  monthlyEmi: number;
  debtToAssetRatio: number;
  highestInterestRate: number;
};

export type NetWorthAnalysis = {
  totalAssets: number;
  totalLiabilities: number;
  netWorth: number;
};

export type FinancialInsight = {
  id: string;
  severity: 'info' | 'warning' | 'critical';
  title: string;
  message: string;
  source: string;
};

export type FinancialEngineInput = {
  netWorth: NetWorthAnalysis;
  portfolio: PortfolioAnalysis;
  cashFlow: CashFlowAnalysis;
  debt: DebtAnalysis;
  financialHealth: FinancialHealthScore;
};

export type FinancialEngineOutput = FinancialEngineInput & {
  insights: FinancialInsight[];
  generatedAt: string;
  engineVersion: '1.0.0';
};

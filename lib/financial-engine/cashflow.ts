import type { CashFlowAnalysis } from './types';

export function analyzeCashFlow(monthlyIncome: number, monthlyExpenses: number): CashFlowAnalysis {
  const income = Math.max(0, monthlyIncome);
  const expenses = Math.max(0, monthlyExpenses);
  const monthlySurplus = income - expenses;
  const savingsRate = income > 0 ? Math.max(0, Math.min(100, (monthlySurplus / income) * 100)) : 0;

  return {
    monthlyIncome: income,
    monthlyExpenses: expenses,
    monthlySurplus,
    savingsRate,
  };
}

import { isSupabaseConfigured, supabase } from '@/lib/supabase';

export type HoldingPreview = {
  id: number;
  assetName: string;
  assetType: string | null;
  platform: string | null;
  currentValue: number;
};

export type DashboardSummary = {
  netWorth: number;
  totalAssets: number;
  totalInvestments: number;
  totalLiabilities: number;
  monthlyNetSalary: number;
  holdings: HoldingPreview[];
  dataMode: 'live' | 'demo';
};

const demoSummary: DashboardSummary = {
  netWorth: 809000,
  totalAssets: 1499000,
  totalInvestments: 1499000,
  totalLiabilities: 690000,
  monthlyNetSalary: 205000,
  dataMode: 'demo',
  holdings: [
    { id: 1, assetName: 'Equity mutual funds', assetType: 'Mutual Fund', platform: 'CAMS', currentValue: 620000 },
    { id: 2, assetName: 'Indian equities', assetType: 'Stocks', platform: 'Zerodha', currentValue: 380000 },
    { id: 3, assetName: 'Employee Provident Fund', assetType: 'EPF', platform: null, currentValue: 250000 },
    { id: 4, assetName: 'US ETF portfolio', assetType: 'ETF', platform: 'US broker', currentValue: 160000 },
    { id: 5, assetName: 'Emergency reserve', assetType: 'Cash', platform: 'Bank', currentValue: 80000 },
  ],
};

/**
 * Returns live financial data where Supabase is configured and reachable.
 * Preview deployments remain useful even without secrets or while the database
 * is unavailable, rather than turning into a Vercel build/runtime failure.
 */
export async function getDashboardSummary(): Promise<DashboardSummary> {
  if (!isSupabaseConfigured || !supabase) return demoSummary;

  try {
    const [
      { data: networthRows, error: networthError },
      { data: salaryRows, error: salaryError },
      { data: investmentRows, error: investmentError },
    ] = await Promise.all([
      supabase.from('networth_snapshot').select('assets, liabilities, networth').order('created_at', { ascending: false }).limit(1),
      supabase.from('salary_profile').select('monthly_net').order('updated_at', { ascending: false }).limit(1),
      supabase.from('investment_holdings').select('id, asset_name, asset_type, platform, current_value').order('current_value', { ascending: false }),
    ]);

    if (networthError || salaryError || investmentError) {
      throw networthError ?? salaryError ?? investmentError;
    }

    const networth = networthRows?.[0];
    const salary = salaryRows?.[0];
    const holdings = (investmentRows ?? []).map((holding) => ({
      id: Number(holding.id),
      assetName: holding.asset_name ?? 'Unnamed holding',
      assetType: holding.asset_type,
      platform: holding.platform,
      currentValue: Number(holding.current_value ?? 0),
    }));

    return {
      netWorth: Number(networth?.networth ?? 0),
      totalAssets: Number(networth?.assets ?? 0),
      totalInvestments: holdings.reduce((sum, holding) => sum + holding.currentValue, 0),
      totalLiabilities: Number(networth?.liabilities ?? 0),
      monthlyNetSalary: Number(salary?.monthly_net ?? 0),
      holdings,
      dataMode: 'live',
    };
  } catch (error) {
    console.error('FinancialOS dashboard data fallback:', error);
    return demoSummary;
  }
}

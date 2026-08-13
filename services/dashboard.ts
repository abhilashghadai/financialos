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

const emptyLiveSummary: DashboardSummary = {
  netWorth: 0,
  totalAssets: 0,
  totalInvestments: 0,
  totalLiabilities: 0,
  monthlyNetSalary: 0,
  dataMode: 'live',
  holdings: [],
};

/**
 * Returns live financial data when Supabase is configured and reachable.
 * We intentionally return an empty live state instead of financial sample data
 * so the dashboard never presents fabricated holdings while integrations are
 * being connected.
 */
export async function getDashboardSummary(): Promise<DashboardSummary> {
  if (!isSupabaseConfigured || !supabase) return emptyLiveSummary;

  try {
    const [
      { data: networthRows, error: networthError },
      { data: salaryRows, error: salaryError },
      { data: investmentRows, error: investmentError },
    ] = await Promise.all([
      supabase
        .from('networth_snapshot')
        .select('assets, liabilities, networth')
        .order('created_at', { ascending: false })
        .limit(1),
      supabase
        .from('salary_profile')
        .select('monthly_net')
        .order('updated_at', { ascending: false })
        .limit(1),
      supabase
        .from('investment_holdings')
        .select('id, asset_name, asset_type, platform, current_value')
        .order('current_value', { ascending: false }),
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
    console.error('FinancialOS dashboard data error:', error);
    return emptyLiveSummary;
  }
}

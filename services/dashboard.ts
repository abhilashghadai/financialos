import { supabase } from '@/lib/supabase';

export type DashboardSummary = {
  netWorth: number;
  totalAssets: number;
  totalInvestments: number;
  totalLiabilities: number;
  monthlyNetSalary: number;
};

export async function getDashboardSummary(): Promise<DashboardSummary> {
  const [{ data: networthRows, error: networthError }, { data: salaryRows, error: salaryError }] = await Promise.all([
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
  ]);

  if (networthError) throw networthError;
  if (salaryError) throw salaryError;

  const networth = networthRows?.[0];
  const salary = salaryRows?.[0];

  return {
    netWorth: Number(networth?.networth ?? 0),
    totalAssets: Number(networth?.assets ?? 0),
    totalInvestments: Number(networth?.assets ?? 0),
    totalLiabilities: Number(networth?.liabilities ?? 0),
    monthlyNetSalary: Number(salary?.monthly_net ?? 0),
  };
}

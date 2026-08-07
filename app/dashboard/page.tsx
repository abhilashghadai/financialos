import { NetWorthCard } from '@/components/dashboard/NetWorthCard';
import { AssetsCard } from '@/components/dashboard/AssetsCard';
import { InvestmentCard } from '@/components/dashboard/InvestmentCard';
import { LiabilityCard } from '@/components/dashboard/LiabilityCard';
import { getDashboardSummary } from '@/services/dashboard';

export default async function DashboardPage() {
  const summary = await getDashboardSummary();

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-8 text-slate-100">
      <div className="mx-auto max-w-7xl space-y-8">
        <header className="space-y-2">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">FinancialOS</p>
          <h1 className="text-3xl font-semibold">Dashboard</h1>
          <p className="text-sm text-slate-400">Live summary powered by Supabase</p>
        </header>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <NetWorthCard netWorth={summary.netWorth} />
          <AssetsCard totalAssets={summary.totalAssets} />
          <InvestmentCard totalInvestments={summary.totalInvestments} />
          <LiabilityCard totalLiabilities={summary.totalLiabilities} />
        </section>

        <section className="rounded-2xl border border-white/10 bg-slate-900/80 p-6 shadow-lg shadow-black/10">
          <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Monthly Salary</p>
          <h2 className="mt-3 text-3xl font-semibold text-white">
            {new Intl.NumberFormat('en-IN', {
              style: 'currency',
              currency: 'INR',
              maximumFractionDigits: 0,
            }).format(summary.monthlyNetSalary)}
          </h2>
          <p className="mt-2 text-sm text-slate-400">Latest net salary from Supabase</p>
        </section>
      </div>
    </main>
  );
}

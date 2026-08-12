export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { Sparkles, Terminal, TrendingUp, Wallet, CreditCard, Target } from 'lucide-react';
import { getDashboardSummary } from '@/services/dashboard';

function formatINR(value: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);
}

function formatLakhs(value: number): string {
  return `₹${(value / 100000).toFixed(2)}L`;
}

function formatSyncTime(): string {
  return new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(new Date());
}

export default async function CommandPage() {
  const summary = await getDashboardSummary();
  const debtRatio = summary.totalAssets > 0
    ? Math.round((summary.totalLiabilities / summary.totalAssets) * 100)
    : 0;
  const syncedAt = formatSyncTime();

  return (
    <main className="min-h-screen bg-black px-4 py-6 font-mono text-emerald-300 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-4 flex items-center gap-3 border-b border-emerald-900/60 pb-4">
          <Terminal size={18} />
          <div className="flex-1">
            <p className="text-sm font-semibold text-emerald-200">FINOS COMMAND TERMINAL</p>
            <p className="text-[11px] text-emerald-700">Live financial data stream · Supabase</p>
          </div>
          <div className="text-right text-[10px] text-emerald-700">
            <p>LAST SYNC</p>
            <p className="text-emerald-300">{syncedAt} IST</p>
          </div>
        </div>

        <section className="rounded-xl border border-emerald-900/70 bg-[#03120d] p-4 shadow-[0_0_40px_rgba(16,185,129,.06)] sm:p-6">
          <p className="text-xs text-emerald-700">$ finos status</p>
          <div className="mt-2 text-sm leading-7 sm:text-base">
            <p><span className="text-emerald-700">system</span> :: ONLINE</p>
            <p><span className="text-emerald-700">source</span> :: SUPABASE</p>
            <p><span className="text-emerald-700">portfolio</span> :: {summary.holdings.length} holdings loaded</p>
            <p><span className="text-emerald-700">net_worth</span> :: <span className="text-emerald-100">{formatLakhs(summary.netWorth)}</span></p>
          </div>

          <div className="my-5 h-px bg-emerald-950" />

          <p className="text-xs text-emerald-700">$ finos snapshot --today</p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <Metric icon={<TrendingUp size={14} />} label="NET WORTH" value={formatLakhs(summary.netWorth)} />
            <Metric icon={<Wallet size={14} />} label="ASSETS" value={formatLakhs(summary.totalAssets)} />
            <Metric icon={<CreditCard size={14} />} label="LIABILITIES" value={formatLakhs(summary.totalLiabilities)} />
            <Metric icon={<Target size={14} />} label="NET SALARY" value={formatINR(summary.monthlyNetSalary)} />
          </div>

          <div className="my-5 h-px bg-emerald-950" />

          <p className="text-xs text-emerald-700">$ finos portfolio --top 4</p>
          <div className="mt-3 space-y-2 text-xs sm:text-sm">
            {summary.holdings.slice(0, 4).map((holding) => (
              <div key={holding.id} className="grid grid-cols-[1fr_auto] gap-4 border-b border-emerald-950 pb-2 last:border-0">
                <div>
                  <span className="text-emerald-200">{holding.assetName}</span>
                  <span className="ml-2 text-emerald-700">[{holding.assetType || 'Investment'}]</span>
                </div>
                <span className="text-emerald-100">{formatLakhs(holding.currentValue)}</span>
              </div>
            ))}
          </div>

          <div className="my-5 h-px bg-emerald-950" />

          <p className="text-xs text-emerald-700">$ finos health --quickscan</p>
          <div className="mt-3 space-y-2 text-sm">
            <p><span className="text-lime-300">[GOOD]</span> Investment base is {formatLakhs(summary.totalInvestments)}.</p>
            <p><span className={debtRatio < 30 ? 'text-lime-300' : 'text-amber-300'}>[{debtRatio < 30 ? 'GOOD' : 'WATCH'}]</span> Debt-to-assets ratio is {debtRatio}%.</p>
            <p><span className="text-sky-300">[INFO]</span> Monthly net salary is {formatINR(summary.monthlyNetSalary)}.</p>
          </div>

          <div className="mt-6 rounded-lg border border-emerald-900 bg-black/30 p-4">
            <div className="flex items-center gap-2 text-emerald-200">
              <Sparkles size={14} />
              <span className="text-xs uppercase tracking-[0.2em]">AI CO-PILOT</span>
            </div>
            <p className="mt-3 text-sm text-emerald-700">AI reasoning layer is not connected yet.</p>
            <p className="mt-2 text-sm leading-6 text-emerald-300">
              Once enabled, this terminal becomes conversational: ask about your net worth, debt, investments,
              goals, or financial decisions and the copilot will answer using the structured data above.
            </p>
            <div className="mt-3 border-t border-emerald-950 pt-3 text-sm text-emerald-700">$ ask _</div>
          </div>
        </section>
      </div>
    </main>
  );
}

function Metric({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-lg border border-emerald-950 bg-black/30 p-3">
      <div className="flex items-center gap-2 text-emerald-700">
        {icon}
        <span className="text-[10px] tracking-[0.18em]">{label}</span>
      </div>
      <p className="mt-2 text-lg font-semibold text-emerald-100">{value}</p>
    </div>
  );
}

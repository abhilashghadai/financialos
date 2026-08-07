import { NetWorthCard } from '@/components/dashboard/NetWorthCard';
import { AssetsCard } from '@/components/dashboard/AssetsCard';
import { InvestmentCard } from '@/components/dashboard/InvestmentCard';
import { LiabilityCard } from '@/components/dashboard/LiabilityCard';
import { getDashboardSummary } from '@/services/dashboard';

const netWorthSeries = [34.2, 35.4, 35.1, 36.6, 38.4, 37.9, 39.7, 41.1, 42.5, 42.2, 44.1, 46.0, 48.62];

function formatINR(value: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);
}

function hasSupabaseEnv(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

function NetWorthChart() {
  const width = 640;
  const height = 180;
  const padding = 12;
  const min = Math.min(...netWorthSeries) * 0.96;
  const max = Math.max(...netWorthSeries) * 1.02;

  const points = netWorthSeries.map((value, index) => {
    const x = (index / (netWorthSeries.length - 1)) * width;
    const normalized = (value - min) / (max - min);
    const y = height - padding - normalized * (height - padding * 2);
    return `${x},${y}`;
  });

  const line = `M ${points.join(' L ')}`;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-44 w-full">
      <defs>
        <linearGradient id="networthFill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="rgba(59,130,246,0.35)" />
          <stop offset="100%" stopColor="rgba(59,130,246,0)" />
        </linearGradient>
      </defs>
      <path d={`${line} L ${width},${height} L 0,${height} Z`} fill="url(#networthFill)" />
      <path d={line} fill="none" stroke="#60a5fa" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      {points.map((point, index) => {
        if (index !== points.length - 1) return null;
        const [cx, cy] = point.split(',');
        return <circle key={point} cx={Number(cx)} cy={Number(cy)} r="5" fill="#fff" stroke="#60a5fa" strokeWidth="3" />;
      })}
    </svg>
  );
}

function DashboardFallback() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-[1600px] gap-6 px-4 py-4 lg:px-6">
        <aside className="hidden w-64 shrink-0 flex-col rounded-3xl border border-white/10 bg-slate-900/80 p-5 shadow-lg shadow-black/10 lg:flex">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-slate-400">FinancialOS</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">ArthaOS</h2>
            <p className="mt-2 text-sm text-slate-400">Personal finance command center</p>
          </div>

          <nav className="mt-8 space-y-2 text-sm">
            {['Dashboard', 'Salary', 'Investments', 'Liabilities', 'AI Copilot', 'Settings'].map((item, index) => (
              <a
                key={item}
                href="#"
                className={`flex items-center rounded-2xl px-4 py-3 transition ${
                  index === 0 ? 'bg-white/10 text-white' : 'text-slate-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <span className="mr-3 h-2 w-2 rounded-full bg-sky-400" />
                {item}
              </a>
            ))}
          </nav>

          <div className="mt-auto rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Status</p>
            <p className="mt-2 font-medium text-white">Demo shell ready</p>
            <p className="mt-1 text-slate-400">Connect Supabase env vars to unlock live data</p>
          </div>
        </aside>

        <section className="flex-1 space-y-6">
          <header className="flex items-center justify-between rounded-3xl border border-white/10 bg-slate-900/70 px-5 py-4 shadow-lg shadow-black/10">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Dashboard</p>
              <h1 className="mt-1 text-xl font-semibold text-white">Live financial overview</h1>
            </div>
            <div className="hidden text-right sm:block">
              <p className="text-sm text-slate-400">Monthly Net Salary</p>
              <p className="text-lg font-semibold text-white">Awaiting environment setup</p>
            </div>
          </header>

          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <NetWorthCard netWorth={0} />
            <AssetsCard totalAssets={0} />
            <InvestmentCard totalInvestments={0} />
            <LiabilityCard totalLiabilities={0} />
          </section>

          <section className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
            <article className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-lg shadow-black/10">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Visual Summary</p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">Net worth trend</h2>
                  <p className="mt-1 text-sm text-slate-400">Demo view ready for live data once env vars are added.</p>
                </div>
                <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-right">
                  <p className="text-xs uppercase tracking-[0.25em] text-emerald-300">Current</p>
                  <p className="mt-1 text-lg font-semibold text-white">Demo</p>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-white/5 bg-black/20 p-4">
                <NetWorthChart />
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/5 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Assets</p>
                  <p className="mt-2 text-lg font-semibold text-white">Ready to sync</p>
                </div>
                <div className="rounded-2xl border border-white/5 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Liabilities</p>
                  <p className="mt-2 text-lg font-semibold text-white">Ready to sync</p>
                </div>
                <div className="rounded-2xl border border-white/5 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Salary</p>
                  <p className="mt-2 text-lg font-semibold text-white">Ready to sync</p>
                </div>
              </div>
            </article>

            <article className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-lg shadow-black/10">
              <p className="text-xs uppercase tracking-[0.25em] text-slate-400">AI Insight</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">Environment setup pending</h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                The UI is ready. Add <span className="font-semibold text-white">NEXT_PUBLIC_SUPABASE_URL</span> and{' '}
                <span className="font-semibold text-white">NEXT_PUBLIC_SUPABASE_ANON_KEY</span> in Vercel to enable
                live data at build time.
              </p>

              <div className="mt-6 space-y-3">
                <div className="rounded-2xl border border-white/5 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Net worth</p>
                  <p className="mt-2 text-lg font-semibold text-white">Waiting</p>
                </div>
                <div className="rounded-2xl border border-white/5 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Investment base</p>
                  <p className="mt-2 text-lg font-semibold text-white">Waiting</p>
                </div>
              </div>
            </article>
          </section>
        </section>
      </div>
    </main>
  );
}

export default async function DashboardPage() {
  if (!hasSupabaseEnv()) {
    return <DashboardFallback />;
  }

  const summary = await getDashboardSummary();

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-[1600px] gap-6 px-4 py-4 lg:px-6">
        <aside className="hidden w-64 shrink-0 flex-col rounded-3xl border border-white/10 bg-slate-900/80 p-5 shadow-lg shadow-black/10 lg:flex">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-slate-400">FinancialOS</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">ArthaOS</h2>
            <p className="mt-2 text-sm text-slate-400">Personal finance command center</p>
          </div>

          <nav className="mt-8 space-y-2 text-sm">
            {['Dashboard', 'Salary', 'Investments', 'Liabilities', 'AI Copilot', 'Settings'].map((item, index) => (
              <a
                key={item}
                href="#"
                className={`flex items-center rounded-2xl px-4 py-3 transition ${
                  index === 0 ? 'bg-white/10 text-white' : 'text-slate-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <span className="mr-3 h-2 w-2 rounded-full bg-sky-400" />
                {item}
              </a>
            ))}
          </nav>

          <div className="mt-auto rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
            <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Status</p>
            <p className="mt-2 font-medium text-white">Data synchronized</p>
            <p className="mt-1 text-slate-400">Powered by Supabase</p>
          </div>
        </aside>

        <section className="flex-1 space-y-6">
          <header className="flex items-center justify-between rounded-3xl border border-white/10 bg-slate-900/70 px-5 py-4 shadow-lg shadow-black/10">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Dashboard</p>
              <h1 className="mt-1 text-xl font-semibold text-white">Live financial overview</h1>
            </div>
            <div className="hidden text-right sm:block">
              <p className="text-sm text-slate-400">Monthly Net Salary</p>
              <p className="text-lg font-semibold text-white">{formatINR(summary.monthlyNetSalary)}</p>
            </div>
          </header>

          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <NetWorthCard netWorth={summary.netWorth} />
            <AssetsCard totalAssets={summary.totalAssets} />
            <InvestmentCard totalInvestments={summary.totalInvestments} />
            <LiabilityCard totalLiabilities={summary.totalLiabilities} />
          </section>

          <section className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
            <article className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-lg shadow-black/10">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Visual Summary</p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">Net worth trend</h2>
                  <p className="mt-1 text-sm text-slate-400">Illustrative trajectory based on your seeded snapshot data.</p>
                </div>
                <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-right">
                  <p className="text-xs uppercase tracking-[0.25em] text-emerald-300">Current</p>
                  <p className="mt-1 text-lg font-semibold text-white">{formatINR(summary.netWorth)}</p>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-white/5 bg-black/20 p-4">
                <NetWorthChart />
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/5 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Assets</p>
                  <p className="mt-2 text-lg font-semibold text-white">{formatINR(summary.totalAssets)}</p>
                </div>
                <div className="rounded-2xl border border-white/5 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Liabilities</p>
                  <p className="mt-2 text-lg font-semibold text-white">{formatINR(summary.totalLiabilities)}</p>
                </div>
                <div className="rounded-2xl border border-white/5 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Salary</p>
                  <p className="mt-2 text-lg font-semibold text-white">{formatINR(summary.monthlyNetSalary)}</p>
                </div>
              </div>
            </article>

            <article className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-lg shadow-black/10">
              <p className="text-xs uppercase tracking-[0.25em] text-slate-400">AI Insight</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">You are on track.</h2>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                Your current net worth, salary, and investment levels are enough to power the first version of the
                FinancialOS copilot. Once document ingestion is connected, these cards can update from salary slips and
                statements automatically.
              </p>

              <div className="mt-6 space-y-3">
                <div className="rounded-2xl border border-white/5 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Net worth</p>
                  <p className="mt-2 text-lg font-semibold text-white">{formatINR(summary.netWorth)}</p>
                </div>
                <div className="rounded-2xl border border-white/5 bg-white/5 p-4">
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Investment base</p>
                  <p className="mt-2 text-lg font-semibold text-white">{formatINR(summary.totalInvestments)}</p>
                </div>
              </div>
            </article>
          </section>
        </section>
      </div>
    </main>
  );
}

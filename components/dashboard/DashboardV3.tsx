'use client';

import {
  ArrowUpRight,
  CreditCard,
  Landmark,
  PieChart,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  WalletCards,
} from 'lucide-react';
import type { DashboardSummary } from '@/services/dashboard';

function money(value: number) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);
}

function lakhs(value: number) {
  return `₹${(value / 100000).toFixed(2)}L`;
}

function ScoreCard({ label, score, icon }: { label: string; score: number; icon: React.ReactNode }) {
  const tone = score >= 75 ? 'text-cyan-300' : score >= 50 ? 'text-amber-300' : 'text-red-400';
  const bar = score >= 75 ? 'bg-cyan-300' : score >= 50 ? 'bg-amber-300' : 'bg-red-400';
  return (
    <article className="rounded-xl border border-white/8 bg-[#141925] p-4">
      <div className="flex items-center justify-between text-slate-400"><span className="text-xs">{label}</span><span>{icon}</span></div>
      <div className={`mt-5 text-3xl font-semibold ${tone}`}>{score}</div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#232a39]"><div className={`h-full ${bar}`} style={{ width: `${score}%` }} /></div>
    </article>
  );
}

function Section({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-white/8 bg-[#121722] p-5 md:p-6">
      <div>
        <h2 className="text-xl font-semibold text-[#f0eee7]">{title}</h2>
        {subtitle && <p className="mt-1 text-xs text-slate-400">{subtitle}</p>}
      </div>
      {children}
    </section>
  );
}

export function DashboardV3({ summary }: { summary: DashboardSummary }) {
  const debtRatio = summary.totalAssets ? Math.round((summary.totalLiabilities / summary.totalAssets) * 100) : 0;
  const savingsRate = summary.monthlyNetSalary > 0 ? 0 : 0;
  const investmentScore = summary.totalInvestments > 0 ? 72 : 0;
  const healthScore = summary.netWorth > 0 ? 78 : 0;
  const riskScore = debtRatio > 50 ? 35 : debtRatio > 30 ? 55 : 72;

  return (
    <main className="min-h-screen bg-[#0b0f16] text-slate-200">
      <div className="border-b border-white/8 bg-[#0b0f16] px-5 py-4 md:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <Kpi label="NET WORTH" value={lakhs(summary.netWorth)} />
          <Kpi label="HEALTH SCORE" value={healthScore ? `${healthScore}/100` : '—'} />
          <Kpi label="SAVINGS RATE" value={savingsRate ? `${savingsRate}%` : '—'} />
          <Kpi label="MONTHLY SURPLUS" value={summary.monthlyNetSalary ? money(summary.monthlyNetSalary) : '—'} />
          <Kpi label="DEBT RATIO" value={`${debtRatio}%`} />
        </div>
      </div>

      <div className="space-y-5 px-5 py-6 md:px-8">
        <header>
          <p className="font-mono text-[10px] tracking-[.2em] text-amber-300/80">EXECUTIVE SUMMARY</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-[#f0eee7] md:text-4xl">Financial Command Center</h1>
        </header>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          <ScoreCard label="Financial Health" score={healthScore} icon={<Sparkles size={16} />} />
          <ScoreCard label="Risk" score={riskScore} icon={<ShieldCheck size={16} />} />
          <ScoreCard label="Savings" score={savingsRate || 0} icon={<WalletCards size={16} />} />
          <ScoreCard label="Debt" score={debtRatio === 0 ? 100 : Math.max(0, 100 - debtRatio)} icon={<Landmark size={16} />} />
          <ScoreCard label="Investments" score={investmentScore} icon={<TrendingUp size={16} />} />
        </section>

        <section className="grid gap-5 xl:grid-cols-2">
          <Section title="Net Worth Forecast" subtitle="Deterministic projection will use your financial engine inputs.">
            <div className="mt-6 flex h-64 items-center justify-center rounded-xl border border-dashed border-white/10 bg-[#0f141e] text-center text-sm text-slate-500">
              Forecast chart appears when historical snapshots and contribution assumptions are available.
            </div>
          </Section>
          <Section title="Asset Allocation" subtitle={`Total assets ${lakhs(summary.totalAssets)}`}>
            {summary.holdings.length ? (
              <div className="mt-5 space-y-3">
                {summary.holdings.slice(0, 8).map((holding) => (
                  <div key={holding.id} className="flex items-center gap-3 rounded-lg border border-white/6 bg-[#0f141e] px-3 py-3">
                    <PieChart size={16} className="text-amber-300" />
                    <div className="min-w-0 flex-1"><p className="truncate text-sm font-medium text-slate-200">{holding.assetName}</p><p className="text-[11px] text-slate-500">{holding.assetType || 'Investment'}{holding.platform ? ` · ${holding.platform}` : ''}</p></div>
                    <span className="text-sm font-semibold">{lakhs(holding.currentValue)}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-6 flex h-64 items-center justify-center rounded-xl border border-dashed border-white/10 bg-[#0f141e] text-sm text-slate-500">No investment data available yet.</div>
            )}
          </Section>
        </section>

        {summary.holdings.length > 0 && (
          <Section title="Investments" subtitle={`${summary.holdings.length} live holding${summary.holdings.length === 1 ? '' : 's'}`}>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {summary.holdings.map((holding) => (
                <div key={holding.id} className="rounded-xl border border-white/8 bg-[#171c27] p-4"><div className="flex items-center justify-between"><p className="truncate text-sm font-semibold">{holding.assetName}</p><ArrowUpRight size={15} className="text-cyan-300" /></div><p className="mt-1 text-[11px] text-slate-500">{holding.assetType || 'Investment'}{holding.platform ? ` · ${holding.platform}` : ''}</p><p className="mt-5 text-xl font-semibold">{lakhs(holding.currentValue)}</p></div>
              ))}
            </div>
          </Section>
        )}

        {summary.totalLiabilities > 0 && (
          <Section title="Debt & Liquidity" subtitle="Risk view based on confirmed liabilities.">
            <div className="mt-5 rounded-xl border border-red-400/10 bg-red-400/5 p-4"><div className="flex items-center gap-3"><CreditCard size={18} className="text-red-300" /><div><p className="text-sm font-semibold text-slate-100">Liabilities {lakhs(summary.totalLiabilities)}</p><p className="mt-1 text-xs text-slate-400">Add EMI and interest-rate details to unlock the debt optimizer.</p></div></div></div>
          </Section>
        )}

        <Section title="AI Insights" subtitle="Rule-based today; LLM-powered later.">
          <div className="mt-5 space-y-3">
            {summary.totalLiabilities > 0 && <Insight tone="danger">Your liabilities are present. Once interest rates and EMI data are connected, FinancialOS can rank debt payoff priorities.</Insight>}
            {summary.totalInvestments > 0 && <Insight tone="good">Your investment records are live. Portfolio intelligence can now be calculated from confirmed holdings.</Insight>}
            {!summary.totalInvestments && <Insight tone="neutral">Investment intelligence will appear automatically after your first real integration sync.</Insight>}
          </div>
        </Section>

        <Section title="Goals & Planning" subtitle="Only show planning modules when real goals exist.">
          <div className="mt-5 flex items-center justify-center rounded-xl border border-dashed border-white/10 bg-[#0f141e] px-6 py-10 text-sm text-slate-500"><Target size={16} className="mr-2" /> No goals recorded yet.</div>
        </Section>
      </div>
    </main>
  );
}

function Kpi({ label, value }: { label: string; value: string }) {
  return <div className="border-l border-white/8 pl-4 first:border-l-0 first:pl-0"><p className="text-[10px] tracking-[.14em] text-slate-500">{label}</p><p className="mt-1 font-mono text-lg font-semibold text-cyan-300">{value}</p></div>;
}

function Insight({ tone, children }: { tone: 'danger' | 'good' | 'neutral'; children: React.ReactNode }) {
  const cls = tone === 'danger' ? 'border-l-red-400 bg-red-400/5' : tone === 'good' ? 'border-l-cyan-300 bg-cyan-300/5' : 'border-l-slate-500 bg-[#171c27]';
  return <div className={`rounded-lg border border-white/5 border-l-2 px-4 py-3 text-sm leading-6 text-slate-300 ${cls}`}>{children}</div>;
}

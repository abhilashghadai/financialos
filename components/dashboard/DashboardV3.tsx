'use client';

import {
  ArrowUpRight,
  Bell,
  ChevronRight,
  CircleDollarSign,
  CreditCard,
  Landmark,
  PieChart,
  Search,
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
    <article className="group rounded-2xl border border-white/10 bg-[#151a25] p-4 shadow-[0_8px_30px_rgba(0,0,0,.18)] transition duration-300 hover:-translate-y-0.5 hover:border-white/15">
      <div className="flex items-center justify-between text-slate-500"><span className="text-xs">{label}</span><span>{icon}</span></div>
      <div className={`mt-5 text-[31px] font-semibold tracking-tight ${tone}`}>{score || '—'}</div>
      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-[#242b39]"><div className={`h-full rounded-full ${bar}`} style={{ width: `${score}%` }} /></div>
    </article>
  );
}

function Section({ title, subtitle, children, className = '' }: { title: string; subtitle?: string; children: React.ReactNode; className?: string }) {
  return (
    <section className={`rounded-2xl border border-white/10 bg-[#121722] p-5 shadow-[0_12px_40px_rgba(0,0,0,.15)] md:p-6 ${className}`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-[21px] font-semibold tracking-tight text-[#f4f1e9]">{title}</h2>
          {subtitle && <p className="mt-1 text-xs text-slate-500">{subtitle}</p>}
        </div>
      </div>
      {children}
    </section>
  );
}

export function DashboardV3({ summary }: { summary: DashboardSummary }) {
  const debtRatio = summary.totalAssets ? Math.round((summary.totalLiabilities / summary.totalAssets) * 100) : 0;
  const savingsRate = 0;
  const investmentScore = summary.totalInvestments > 0 ? 72 : 0;
  const healthScore = summary.netWorth > 0 ? 78 : 0;
  const riskScore = debtRatio > 50 ? 35 : debtRatio > 30 ? 55 : 72;

  return (
    <main className="min-h-screen bg-[#0a0f16] text-slate-200">
      <div className="sticky top-0 z-10 border-b border-white/8 bg-[#0a0f16]/95 px-5 py-3 backdrop-blur md:px-8">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <Kpi label="NET WORTH" value={lakhs(summary.netWorth)} />
          <Kpi label="HEALTH SCORE" value={healthScore ? `${healthScore}/100` : '—'} />
          <Kpi label="SAVINGS RATE" value={savingsRate ? `${savingsRate}%` : '—'} />
          <Kpi label="MONTHLY SURPLUS" value={summary.monthlyNetSalary ? money(summary.monthlyNetSalary) : '—'} />
          <Kpi label="DEBT RATIO" value={`${debtRatio}%`} />
        </div>
      </div>

      <div className="px-5 pb-12 pt-6 md:px-8">
        <header className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="font-mono text-[10px] tracking-[.22em] text-amber-300/80">EXECUTIVE SUMMARY</p>
            <h1 className="mt-2 text-[34px] font-semibold tracking-[-.03em] text-[#f4f1e9] md:text-5xl">Your financial command center.</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">A live view of what you own, what you owe, how you are progressing, and what deserves your attention next.</p>
          </div>
          <div className="flex items-center gap-2">
            <button aria-label="Search" className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-[#121722] text-slate-400 hover:text-white"><Search size={16} /></button>
            <button aria-label="Notifications" className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-[#121722] text-slate-400 hover:text-white"><Bell size={16} /></button>
            <button className="flex h-10 items-center gap-2 rounded-xl bg-[#d9ff68] px-4 text-xs font-bold text-[#0a0f16] shadow-[0_0_24px_rgba(217,255,104,.12)]"><Sparkles size={14} /> Add data</button>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          <ScoreCard label="Financial Health" score={healthScore} icon={<Sparkles size={16} />} />
          <ScoreCard label="Risk" score={riskScore} icon={<ShieldCheck size={16} />} />
          <ScoreCard label="Savings" score={savingsRate} icon={<WalletCards size={16} />} />
          <ScoreCard label="Debt" score={debtRatio === 0 ? 100 : Math.max(0, 100 - debtRatio)} icon={<Landmark size={16} />} />
          <ScoreCard label="Investments" score={investmentScore} icon={<TrendingUp size={16} />} />
        </section>

        <section className="mt-5 grid gap-5 xl:grid-cols-[1.05fr_.95fr]">
          <Section title="Net worth" subtitle="Current position and trajectory">
            <div className="mt-6 rounded-xl bg-[#0e131c] p-4">
              <div className="flex items-end justify-between gap-4">
                <div><p className="text-xs text-slate-500">Total net worth</p><p className="mt-1 text-4xl font-semibold tracking-tight text-[#f4f1e9]">{lakhs(summary.netWorth)}</p></div>
                <div className="text-right"><p className="text-xs text-slate-500">Live liabilities</p><p className="mt-1 text-sm font-semibold text-slate-300">{lakhs(summary.totalLiabilities)}</p></div>
              </div>
              <div className="mt-5 h-36 overflow-hidden rounded-lg border border-white/6 bg-[#0a0f16] p-3">
                <svg viewBox="0 0 800 180" className="h-full w-full" preserveAspectRatio="none">
                  <defs><linearGradient id="networth-fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#3dd7dc" stopOpacity=".24"/><stop offset="100%" stopColor="#3dd7dc" stopOpacity="0"/></linearGradient></defs>
                  <path d="M0 150 C120 140 180 120 260 128 C360 136 410 86 520 94 C620 100 680 56 800 34 L800 180 L0 180 Z" fill="url(#networth-fill)"/>
                  <path d="M0 150 C120 140 180 120 260 128 C360 136 410 86 520 94 C620 100 680 56 800 34" fill="none" stroke="#44d8de" strokeWidth="4" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="mt-3 flex justify-between text-[10px] text-slate-600"><span>Aug '25</span><span>Nov</span><span>Feb '26</span><span>May</span><span>Today</span></div>
            </div>
          </Section>

          <Section title="Today's position" subtitle="What matters right now">
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <MiniStat label="Assets" value={lakhs(summary.totalAssets)} icon={<Landmark size={15} />} />
              <MiniStat label="Investments" value={lakhs(summary.totalInvestments)} icon={<TrendingUp size={15} />} />
              <MiniStat label="Income" value={money(summary.monthlyNetSalary)} icon={<CircleDollarSign size={15} />} />
              <MiniStat label="Debt ratio" value={`${debtRatio}%`} icon={<CreditCard size={15} />} />
            </div>
            <div className="mt-4 rounded-xl border border-amber-300/10 bg-amber-300/5 px-4 py-3 text-xs leading-5 text-slate-400">{summary.totalLiabilities > 0 ? 'You have liabilities on the balance sheet. Adding EMI and interest-rate data will unlock a ranked payoff plan.' : 'No liabilities are currently recorded. The dashboard will surface debt intelligence when liabilities exist.'}</div>
          </Section>
        </section>

        <section className="mt-5 grid gap-5 xl:grid-cols-[1.1fr_.9fr]">
          <Section title="Portfolio" subtitle={summary.holdings.length ? `${summary.holdings.length} confirmed live holdings` : 'Only appears when real investment data exists'}>
            {summary.holdings.length ? (
              <div className="mt-5 space-y-2">
                {summary.holdings.slice(0, 6).map((holding) => (
                  <div key={holding.id} className="flex items-center gap-3 rounded-xl border border-white/8 bg-[#0f141e] px-4 py-3 transition hover:border-white/15">
                    <div className="grid h-9 w-9 place-items-center rounded-lg bg-[#1a2330] text-amber-300"><PieChart size={16} /></div>
                    <div className="min-w-0 flex-1"><p className="truncate text-sm font-medium text-slate-200">{holding.assetName}</p><p className="text-[11px] text-slate-500">{holding.assetType || 'Investment'}{holding.platform ? ` · ${holding.platform}` : ''}</p></div>
                    <div className="text-right"><p className="text-sm font-semibold text-[#f4f1e9]">{lakhs(holding.currentValue)}</p><p className="mt-0.5 text-[10px] text-cyan-300">Live value</p></div>
                  </div>
                ))}
                <button className="mt-2 flex w-full items-center justify-between rounded-xl border border-dashed border-white/8 px-4 py-3 text-xs font-semibold text-slate-400 hover:text-white">View portfolio <ChevronRight size={14} /></button>
              </div>
            ) : (
              <div className="mt-5 rounded-xl border border-dashed border-white/10 bg-[#0e131c] px-6 py-10 text-center text-sm text-slate-600">Portfolio modules will appear automatically after the first real investment sync.</div>
            )}
          </Section>

          <Section title="AI briefing" subtitle="Rule-based today. LLM-powered next.">
            <div className="mt-5 space-y-3">
              {summary.totalLiabilities > 0 && <BriefingItem tone="danger" title="Debt deserves attention">Your liabilities are present. Connect EMI and interest-rate data to prioritize repayment intelligently.</BriefingItem>}
              {summary.holdings.length > 0 && <BriefingItem tone="good" title="Portfolio is live">Your confirmed holdings are now available for allocation, concentration, and performance analysis.</BriefingItem>}
              {!summary.holdings.length && <BriefingItem tone="neutral" title="Investment intelligence is waiting">Once Zerodha or another real source syncs, portfolio intelligence will populate automatically.</BriefingItem>}
            </div>
            <button className="mt-4 flex items-center gap-2 text-xs font-semibold text-[#d9ff68]">Open AI Command Center <ArrowUpRight size={14} /></button>
          </Section>
        </section>

        <section className="mt-5 grid gap-5 xl:grid-cols-[.95fr_1.05fr]">
          <Section title="Planning" subtitle="Show goals only when you have actual goals recorded.">
            <div className="mt-5 rounded-xl border border-dashed border-white/10 bg-[#0e131c] px-6 py-8 text-center text-sm text-slate-600"><Target size={18} className="mx-auto mb-2 text-slate-700" />No goals recorded yet.</div>
          </Section>
          <Section title="Data sources" subtitle="Your dashboard grows as your real data grows.">
            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              <Source status="Supabase" detail="Connected" active />
              <Source status="Zerodha" detail="Connect to sync holdings" />
              <Source status="Mutual funds" detail="Appears when imported" />
              <Source status="Documents" detail="Appears when uploaded" />
            </div>
          </Section>
        </section>
      </div>
    </main>
  );
}

function Kpi({ label, value }: { label: string; value: string }) {
  return <div className="border-l border-white/8 pl-4 first:border-l-0 first:pl-0"><p className="text-[10px] tracking-[.14em] text-slate-500">{label}</p><p className="mt-1 font-mono text-lg font-semibold text-cyan-300">{value}</p></div>;
}

function MiniStat({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return <div className="rounded-xl border border-white/8 bg-[#0f141e] p-4"><div className="flex items-center justify-between text-slate-500"><span className="text-xs">{label}</span>{icon}</div><p className="mt-3 text-lg font-semibold text-[#f4f1e9]">{value}</p></div>;
}

function BriefingItem({ tone, title, children }: { tone: 'danger' | 'good' | 'neutral'; title: string; children: React.ReactNode }) {
  const cls = tone === 'danger' ? 'border-l-red-400 bg-red-400/5' : tone === 'good' ? 'border-l-cyan-300 bg-cyan-300/5' : 'border-l-slate-500 bg-[#171c27]';
  return <div className={`rounded-xl border border-white/5 border-l-2 px-4 py-4 ${cls}`}><p className="text-sm font-semibold text-slate-100">{title}</p><p className="mt-1 text-xs leading-5 text-slate-400">{children}</p></div>;
}

function Source({ status, detail, active = false }: { status: string; detail: string; active?: boolean }) {
  return <div className="flex items-center gap-3 rounded-xl border border-white/8 bg-[#0f141e] px-4 py-3"><span className={`h-2.5 w-2.5 rounded-full ${active ? 'bg-[#d9ff68] shadow-[0_0_10px_rgba(217,255,104,.55)]' : 'bg-slate-700'}`} /><div><p className="text-xs font-semibold text-slate-200">{status}</p><p className="text-[10px] text-slate-500">{detail}</p></div></div>;
}

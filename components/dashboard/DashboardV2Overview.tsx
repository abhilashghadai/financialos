'use client';

import type { DashboardSummary } from '@/services/dashboard';
import { ArrowUpRight, CreditCard, ShieldCheck, Target, TrendingUp, WalletCards } from 'lucide-react';

function inr(value: number) { return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value); }
function lakh(value: number) { return `₹${(value / 100000).toFixed(2)}L`; }

export function DashboardV2Overview({ summary }: { summary: DashboardSummary }) {
  const debtRatio = Math.round((summary.totalLiabilities / Math.max(summary.totalAssets, 1)) * 100);
  const monthlySurplus = summary.monthlyNetSalary ? Math.round(summary.monthlyNetSalary * 0.38) : 0;
  return <div className="space-y-5">
    <section className="grid gap-5 xl:grid-cols-[1.6fr_.8fr]">
      <article className="rounded-2xl border border-[#dce6df] bg-white p-6 shadow-sm">
        <div className="flex items-start justify-between gap-4"><div><p className="text-[10px] font-bold tracking-[.16em] text-slate-500">NET WORTH</p><div className="mt-2 flex items-end gap-3"><h2 className="text-4xl font-extrabold tracking-tight">{lakh(summary.netWorth)}</h2><span className="mb-1 inline-flex items-center gap-1 text-xs font-bold text-[#087059]"><ArrowUpRight size={14}/> Live position</span></div><p className="mt-2 text-xs text-slate-500">Assets {lakh(summary.totalAssets)} · Liabilities {lakh(summary.totalLiabilities)}</p></div><div className="rounded-lg bg-[#eff6f1] px-3 py-2 text-right"><p className="text-[9px] font-bold tracking-[.12em] text-slate-500">MONTHLY INCOME</p><p className="mt-1 text-sm font-extrabold text-[#087059]">{inr(summary.monthlyNetSalary)}</p></div></div>
        <div className="mt-6 h-52 rounded-xl bg-gradient-to-b from-[#eef7f1] to-white p-4"><div className="relative h-full overflow-hidden rounded-lg"><div className="absolute inset-0 opacity-40" style={{backgroundImage:'linear-gradient(#dce8df 1px,transparent 1px),linear-gradient(90deg,#dce8df 1px,transparent 1px)',backgroundSize:'42px 42px'}} /><svg viewBox="0 0 720 180" className="relative h-full w-full"><path d="M0 145 C90 132 110 148 180 118 S280 115 340 94 S440 112 500 78 S620 82 720 34 L720 180 L0 180 Z" fill="rgba(8,112,89,.10)"/><path d="M0 145 C90 132 110 148 180 118 S280 115 340 94 S440 112 500 78 S620 82 720 34" fill="none" stroke="#087059" strokeWidth="3" strokeLinecap="round"/><circle cx="720" cy="34" r="6" fill="#fff" stroke="#087059" strokeWidth="3"/></svg></div></div>
      </article>
      <article className="rounded-2xl bg-[#183a2e] p-6 text-white shadow-sm"><p className="text-[10px] font-bold tracking-[.16em] text-[#a9c0b2]">FINANCIAL HEALTH</p><div className="mt-3 flex items-end gap-2"><h2 className="text-5xl font-extrabold">84</h2><span className="mb-2 text-sm text-[#a9c0b2]">/100</span></div><p className="mt-5 text-sm leading-6 text-[#c0d1c7]">Strong base. The next improvement is reducing expensive debt while keeping long-term investing consistent.</p><div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4"><p className="text-[10px] font-bold tracking-[.14em] text-[#caf060]">AI READY</p><p className="mt-2 text-xs leading-5 text-[#d4e2db]">Your structured financial data is ready for personalized analysis.</p></div></article>
    </section>

    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <Metric icon={<TrendingUp size={17}/>} title="Investments" value={lakh(summary.totalInvestments)} detail="Live holdings" />
      <Metric icon={<WalletCards size={17}/>} title="Monthly surplus" value={inr(monthlySurplus)} detail="38% modeled savings" />
      <Metric icon={<Target size={17}/>} title="Goal funding" value="68%" detail="House + financial freedom" />
      <Metric icon={<CreditCard size={17}/>} title="Debt / assets" value={`${debtRatio}%`} detail={debtRatio < 30 ? 'Healthy' : 'Needs attention'} />
    </section>

    <section className="grid gap-5 xl:grid-cols-[1.2fr_.8fr]">
      <article className="rounded-2xl border border-[#dce6df] bg-white p-6 shadow-sm"><div className="flex items-center justify-between"><div><h3 className="text-sm font-extrabold">Portfolio snapshot</h3><p className="mt-1 text-xs text-slate-500">Top positions from the live dataset</p></div><span className="rounded-full bg-[#edf5ef] px-3 py-1 text-[10px] font-bold text-[#087059]">{summary.holdings.length} holdings</span></div><div className="mt-5 divide-y divide-[#edf1ee]">{summary.holdings.slice(0,5).map((holding) => <div key={holding.id} className="flex items-center gap-4 py-3 first:pt-0 last:pb-0"><div className="grid h-9 w-9 place-items-center rounded-lg bg-[#eff5f0]"><TrendingUp size={16} className="text-[#087059]"/></div><div className="min-w-0 flex-1"><p className="truncate text-xs font-bold">{holding.assetName}</p><p className="text-[10px] text-slate-500">{holding.assetType || 'Investment'}{holding.platform ? ` · ${holding.platform}` : ''}</p></div><p className="text-xs font-extrabold">{lakh(holding.currentValue)}</p></div>)}</div></article>
      <article className="rounded-2xl border border-[#dce6df] bg-white p-6 shadow-sm"><div className="flex items-center gap-2"><ShieldCheck size={17} className="text-[#087059]"/><h3 className="text-sm font-extrabold">Protection & resilience</h3></div><div className="mt-5 space-y-3"><Row label="Emergency liquidity" value="Needs review" /><Row label="Debt management" value={debtRatio < 30 ? 'On track' : 'Priority'} /><Row label="Investment consistency" value="Strong" /><Row label="Data coverage" value={summary.holdings.length ? 'Connected' : 'Partial'} /></div></article>
    </section>
  </div>;
}

function Metric({ icon, title, value, detail }: { icon: React.ReactNode; title: string; value: string; detail: string }) { return <article className="rounded-2xl border border-[#dce6df] bg-white p-5 shadow-sm"><div className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-lg bg-[#eef5f0] text-[#087059]">{icon}</span><div><p className="text-[10px] text-slate-500">{title}</p><p className="mt-0.5 text-lg font-extrabold">{value}</p></div></div><p className="mt-3 text-[10px] text-slate-500">{detail}</p></article>; }
function Row({ label, value }: { label: string; value: string }) { return <div className="flex items-center justify-between border-b border-[#edf1ee] pb-3 text-xs last:border-0 last:pb-0"><span className="text-slate-600">{label}</span><span className="font-bold text-[#087059]">{value}</span></div>; }

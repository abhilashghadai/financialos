'use client';

import type { DashboardSummary } from '@/services/dashboard';
import { Activity, Terminal } from 'lucide-react';

function lakh(value: number) { return `₹${(value / 100000).toFixed(2)}L`; }
function inr(value: number) { return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value); }

export function DashboardV2AI({ summary }: { summary: DashboardSummary }) {
  const debtRatio = summary.totalAssets ? Math.round((summary.totalLiabilities / summary.totalAssets) * 100) : 0;
  return <div className="rounded-2xl border border-emerald-900 bg-[#020b08] p-5 font-mono text-emerald-300 shadow-[0_0_50px_rgba(16,185,129,.08)] sm:p-7">
    <div className="flex items-center gap-3 border-b border-emerald-950 pb-4"><Terminal size={18} /><div className="flex-1"><p className="text-sm font-semibold text-emerald-200">FINOS AI COMMAND CENTER</p><p className="text-[10px] text-emerald-700">Workspace only · AI reasoning intentionally disconnected</p></div><span className="inline-flex items-center gap-2 rounded-full border border-emerald-900 px-3 py-1 text-[10px] text-lime-300"><Activity size={11}/> ONLINE</span></div>
    <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4"><Stat label="NET WORTH" value={lakh(summary.netWorth)} /><Stat label="ASSETS" value={lakh(summary.totalAssets)} /><Stat label="LIABILITIES" value={lakh(summary.totalLiabilities)} /><Stat label="NET SALARY" value={inr(summary.monthlyNetSalary)} /></div>
    <div className="my-6 h-px bg-emerald-950" />
    <p className="text-[10px] tracking-[.16em] text-emerald-700">$ finos quickscan</p>
    <div className="mt-4 space-y-2 text-sm leading-7"><p><span className="text-lime-300">[GOOD]</span> {summary.holdings.length} investment holdings loaded.</p><p><span className={debtRatio < 30 ? 'text-lime-300' : 'text-amber-300'}>[{debtRatio < 30 ? 'GOOD' : 'WATCH'}]</span> Debt-to-assets ratio: {debtRatio}%.</p><p><span className="text-sky-300">[INFO]</span> Live data source: {summary.dataMode === 'live' ? 'Supabase' : 'demo fallback'}.</p></div>
    <div className="mt-8 rounded-xl border border-emerald-900 bg-black/30 p-5"><p className="text-[10px] tracking-[.16em] text-emerald-700">$ ask</p><p className="mt-3 text-emerald-200">&gt; _</p><p className="mt-4 text-xs leading-6 text-emerald-700">Later this input will send structured financial context to the selected LLM and return personalized answers, scenarios, and recommendations.</p></div>
  </div>;
}
function Stat({ label, value }: { label: string; value: string }) { return <div className="rounded-xl border border-emerald-950 bg-black/30 p-4"><p className="text-[9px] tracking-[.16em] text-emerald-700">{label}</p><p className="mt-2 text-lg font-semibold text-emerald-100">{value}</p></div>; }

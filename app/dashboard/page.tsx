import {
  ArrowUpRight,
  Bell,
  BriefcaseBusiness,
  ChevronDown,
  CircleDollarSign,
  CreditCard,
  LayoutDashboard,
  PieChart,
  Settings,
  ShieldCheck,
  Sparkles,
  Target,
  TrendingUp,
  WalletCards,
  type LucideIcon,
} from 'lucide-react';
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

function NetWorthChart() {
  const values = [34.2, 35.4, 35.1, 36.6, 38.4, 37.9, 39.7, 41.1, 42.5, 42.2, 44.1, 46, 48.62];
  const width = 720;
  const height = 190;
  const padding = 12;
  const min = Math.min(...values) * 0.96;
  const max = Math.max(...values) * 1.02;
  const points = values.map((value, index) => {
    const x = (index / (values.length - 1)) * width;
    const y = height - padding - ((value - min) / (max - min)) * (height - padding * 2);
    return `${x},${y}`;
  });
  const line = `M ${points.join(' L ')}`;
  const [endX, endY] = points.at(-1)!.split(',');

  return (
    <div className="relative mt-4 h-52">
      <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" className="h-full w-full overflow-visible">
        <defs>
          <linearGradient id="worth-fill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#0c8063" stopOpacity=".24" />
            <stop offset="100%" stopColor="#0c8063" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={`${line} L ${width},${height} L 0,${height} Z`} fill="url(#worth-fill)" />
        <path d={line} fill="none" stroke="#0b765d" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx={Number(endX)} cy={Number(endY)} r="6" fill="#fff" stroke="#0b765d" strokeWidth="3.5" />
      </svg>
      <div className="absolute inset-x-0 bottom-0 flex justify-between pt-2 font-mono text-[10px] tracking-wide text-slate-400">
        <span>AUG '25</span><span>NOV</span><span>FEB '26</span><span>MAY</span><span>JUL</span>
      </div>
    </div>
  );
}

type NavItem = {
  icon: LucideIcon;
  label: string;
  href: string;
};

const nav: NavItem[] = [
  { icon: LayoutDashboard, label: 'Command centre', href: '/dashboard' },
  { icon: PieChart, label: 'Portfolio', href: '/portfolio' },
  { icon: WalletCards, label: 'Cash flow', href: '/cashflow' },
  { icon: Target, label: 'Goals & retirement', href: '/goals' },
  { icon: CreditCard, label: 'Debt optimizer', href: '/debt' },
  { icon: ShieldCheck, label: 'Protection', href: '/protection' },
];

export default async function DashboardPage() {
  const summary = await getDashboardSummary();
  const assetBase = Math.max(summary.totalAssets, 1);
  const debtRatio = Math.round((summary.totalLiabilities / assetBase) * 100);
  const savingsRate = summary.monthlyNetSalary ? 38 : 0;
  const holdingPreview = summary.holdings.slice(0, 4);

  return (
    <main className="min-h-screen bg-[#f5f8f5] text-[#163026]">
      <aside className="fixed inset-y-0 left-0 hidden w-[248px] flex-col bg-[#10271e] px-4 py-6 text-[#c4d4cb] lg:flex">
        <div className="mb-9 flex items-center gap-2 px-2 text-xl font-extrabold tracking-tight text-white">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-[#caf060] text-sm text-[#123027]">A</span>
          artha<span className="font-medium text-[#8eaa9b]">OS</span>
        </div>
        <div className="mb-6 flex items-center gap-3 border-y border-white/10 px-1 py-4">
          <div className="grid h-9 w-9 place-items-center rounded-full bg-[#e7d7c5] text-[10px] font-bold text-[#745539]">AK</div>
          <div><p className="text-xs font-bold text-white">Abhilash Kumar</p><p className="mt-0.5 text-[10px] text-[#95b0a1]">Private client · India</p></div>
        </div>
        <nav className="space-y-1">
          {nav.map(({ icon: Icon, label, href }, index) => (
            <a key={label} href={href} className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-xs font-semibold transition ${index === 0 ? 'bg-[#29483d] text-white' : 'text-[#a0b6aa] hover:bg-white/5 hover:text-white'}`}>
              <Icon size={16} strokeWidth={1.8} />
              {label}
            </a>
          ))}
        </nav>
        <div className="mt-auto border-t border-white/10 px-2 pt-4">
          <div className="mb-4 flex gap-2 text-[9px] leading-4 tracking-[.08em] text-[#93aa9e]"><span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#caf060]" />DATA SYNCHRONIZED<br /><span className="tracking-normal text-[#718d7e]">Updated from Supabase</span></div>
          <a href="/settings" className="flex items-center gap-3 text-xs font-semibold text-[#9bb0a4]"><Settings size={15} /> Settings</a>
        </div>
      </aside>

      <section className="min-h-screen lg:ml-[248px]">
        <header className="flex items-center justify-between px-5 py-6 sm:px-9 lg:px-12">
          <div><p className="font-mono text-[10px] tracking-[.13em] text-slate-500">LIVE FINANCIAL POSITION</p><h1 className="mt-1 text-2xl font-extrabold tracking-tight sm:text-[27px]">Good morning, Abhilash.</h1><p className="mt-1 text-xs text-slate-500">Your financial operating system is up to date.</p></div>
          <div className="flex items-center gap-2"><button aria-label="Notifications" className="grid h-9 w-9 place-items-center rounded-lg border border-[#dce6df] bg-white text-slate-600"><Bell size={16} /></button><button className="hidden items-center gap-2 rounded-lg bg-[#087059] px-3.5 py-2.5 text-xs font-bold text-white sm:flex"><Sparkles size={14} />Add financial data</button></div>
        </header>

        <div className="space-y-4 px-5 pb-10 sm:px-9 lg:px-12">
          <section className="grid gap-4 xl:grid-cols-[1.65fr_.8fr]">
            <article className="rounded-xl border border-[#dce6df] bg-white p-5 shadow-[0_2px_8px_rgba(19,45,33,.03)] sm:p-6">
              <div className="flex justify-between"><div><p className="label">TOTAL NET WORTH</p><h2 className="mt-1 text-3xl font-extrabold tracking-tight sm:text-[34px]">{formatLakhs(summary.netWorth)}</h2><p className="mt-2 text-[11px] font-semibold text-[#087059]"><ArrowUpRight className="mr-1 inline h-3.5 w-3.5" />Growing from your confirmed financial records</p></div><button className="flex h-7 items-center gap-1 rounded-md border border-[#dce6df] px-2 text-[10px] font-bold text-slate-600">1Y <ChevronDown size={12} /></button></div>
              <NetWorthChart />
              <div className="grid grid-cols-3 border-t border-[#e8eeea] pt-4 text-[11px]"><div><p className="text-slate-500">Assets</p><b className="mt-1 block">{formatLakhs(summary.totalAssets)}</b></div><div><p className="text-slate-500">Liabilities</p><b className="mt-1 block">{formatLakhs(summary.totalLiabilities)}</b></div><div><p className="text-slate-500">Monthly income</p><b className="mt-1 block text-[#087059]">{formatLakhs(summary.monthlyNetSalary)}</b></div></div>
            </article>
            <article className="rounded-xl bg-[#e6f0e4] p-6">
              <div className="flex items-start justify-between"><div><p className="label">FINANCIAL HEALTH</p><h2 className="mt-1 text-4xl font-extrabold tracking-tight">84<span className="text-sm font-medium text-slate-500">/100</span></h2></div><div className="grid h-14 w-14 place-items-center rounded-full bg-[conic-gradient(#087059_84%,#bed0c3_0)]"><span className="grid h-11 w-11 place-items-center rounded-full bg-[#e6f0e4] text-xs font-bold">84</span></div></div>
              <p className="mt-7 max-w-[260px] text-xs leading-5 text-[#51695e]">Excellent trajectory. Your investment base and income provide a strong platform for the next goal.</p>
              <button className="mt-3 text-xs font-bold text-[#087059]">View scorecard →</button>
            </article>
          </section>

          <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <Metric icon={<TrendingUp size={17} />} color="bg-[#e7f0ff] text-[#3679eb]" title="Investments" value={formatLakhs(summary.totalInvestments)} detail="Across live holdings" />
            <Metric icon={<CircleDollarSign size={17} />} color="bg-[#eee9ff] text-[#7d60dc]" title="Monthly surplus" value={formatINR(Math.max(summary.monthlyNetSalary * savingsRate / 100, 0))} detail={`${savingsRate}% savings rate`} />
            <Metric icon={<Target size={17} />} color="bg-[#fff3d7] text-[#be8113]" title="Goal funding" value="68%" detail="Home & FI plan on track" />
            <Metric icon={<CreditCard size={17} />} color="bg-[#fce8e8] text-[#ce5d60]" title="Debt-to-assets" value={`${debtRatio}%`} detail={debtRatio < 30 ? 'Healthy balance sheet' : 'Review debt plan'} />
          </section>

          <section className="grid gap-4 xl:grid-cols-2">
            <article className="rounded-xl border border-[#dce6df] bg-white p-5"><div className="flex items-start justify-between"><div><h3 className="text-sm font-extrabold">Portfolio intelligence</h3><p className="mt-1 text-[11px] text-slate-500">Live holdings from your data workspace</p></div><span className="rounded bg-[#e8f1d9] px-2 py-1 font-mono text-[9px] text-[#587517]">{summary.holdings.length} HOLDINGS</span></div><div className="mt-5 space-y-3">{holdingPreview.length ? holdingPreview.map((holding, index) => <div key={holding.id} className="flex items-center gap-3"><span className={`h-2 w-2 rounded-sm ${['bg-[#087059]','bg-[#85a477]','bg-[#d9e75c]','bg-[#e8b75b]'][index]}`} /><div className="min-w-0 flex-1"><p className="truncate text-xs font-bold">{holding.assetName}</p><p className="text-[10px] text-slate-500">{holding.assetType || 'Investment'}{holding.platform ? ` · ${holding.platform}` : ''}</p></div><b className="text-xs">{formatLakhs(holding.currentValue)}</b></div>) : <p className="rounded-lg bg-[#f4f7f4] p-4 text-xs text-slate-500">Add investment holdings in Supabase to populate portfolio intelligence.</p>}</div><button className="mt-5 text-xs font-bold text-[#087059]">Portfolio deep dive →</button></article>

            <article className="rounded-xl bg-[#183a2e] p-5 text-white"><Sparkles className="h-5 w-5 text-[#caf060]" /><p className="mt-3 font-mono text-[10px] tracking-[.1em] text-[#afc7b8]">ARTHA INTELLIGENCE</p><h3 className="mt-2 max-w-sm text-xl font-extrabold leading-7">You could reach financial independence <span className="text-[#caf060]">earlier.</span></h3><p className="mt-3 max-w-md text-xs leading-5 text-[#b8cdc0]">Redirecting a portion of monthly surplus toward long-term investments can improve your projected financial independence timeline. Scenario tools come next.</p><button className="mt-5 rounded-md bg-[#caf060] px-3 py-2 text-[11px] font-bold text-[#183a2e]">Explore scenario analysis →</button></article>
          </section>

          <section className="grid gap-4 xl:grid-cols-[1.4fr_.8fr]">
            <article className="rounded-xl border border-[#dce6df] bg-white p-5"><div className="flex justify-between"><div><h3 className="text-sm font-extrabold">Debt & liquidity watch</h3><p className="mt-1 text-[11px] text-slate-500">Priority action based on current liabilities</p></div><BriefcaseBusiness size={18} className="text-[#087059]" /></div><div className="mt-5 rounded-lg bg-[#f1f6ef] p-4"><p className="text-xs font-bold">Keep high-cost debt ahead of discretionary investing.</p><p className="mt-1 text-[11px] leading-5 text-slate-500">Current liability balance is {formatINR(summary.totalLiabilities)}. Add interest rates and EMIs to unlock the prepayment optimizer.</p></div></article>
            <article className="rounded-xl border border-[#dce6df] bg-white p-5"><p className="label">DATA FOUNDATION</p><h3 className="mt-1 text-sm font-extrabold">Ready for the next layer</h3><div className="mt-4 space-y-2 text-[11px]"><Status label="Salary and net worth snapshot" done /><Status label="Investment holdings" done={summary.holdings.length > 0} /><Status label="Document ingestion & review" /><Status label="Scenario simulator" /></div></article>
          </section>
        </div>
      </section>
    </main>
  );
}

function Metric({ icon, color, title, value, detail }: { icon: React.ReactNode; color: string; title: string; value: string; detail: string }) {
  return <article className="flex items-center gap-3 rounded-xl border border-[#dce6df] bg-white p-4"><span className={`grid h-9 w-9 place-items-center rounded-lg ${color}`}>{icon}</span><div><p className="text-[10px] text-slate-500">{title}</p><p className="mt-0.5 text-base font-extrabold tracking-tight">{value}</p><p className="text-[9px] text-slate-500">{detail}</p></div></article>;
}

function Status({ label, done = false }: { label: string; done?: boolean }) {
  return <p className="flex items-center justify-between border-b border-[#edf1ee] pb-2 last:border-0"><span className="text-slate-600">{label}</span><span className={`rounded px-1.5 py-0.5 text-[9px] font-bold ${done ? 'bg-[#e8f1d9] text-[#587517]' : 'bg-[#f0f2f1] text-slate-400'}`}>{done ? 'READY' : 'NEXT'}</span></p>;
}

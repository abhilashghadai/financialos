type NetWorthCardProps = {
  netWorth: number;
};

function formatINR(value: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);
}

export function NetWorthCard({ netWorth }: NetWorthCardProps) {
  return (
    <section className="rounded-2xl border border-white/10 bg-slate-900/80 p-6 shadow-lg shadow-black/10">
      <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Net Worth</p>
      <h2 className="mt-3 text-3xl font-semibold text-white">{formatINR(netWorth)}</h2>
      <p className="mt-2 text-sm text-slate-400">Live value from Supabase</p>
    </section>
  );
}

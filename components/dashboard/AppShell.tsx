'use client';

import type { ReactNode } from 'react';
import { useState } from 'react';
import Link from 'next/link';
import { CreditCard, LayoutDashboard, Menu, PieChart, Settings, ShieldCheck, Target, Terminal, WalletCards, X, ChevronsLeft, ChevronsRight, Bell, Search } from 'lucide-react';

type Workspace = 'dashboard' | 'ai';

type NavItem = {
  label: string;
  icon: typeof LayoutDashboard;
  workspace?: Workspace;
  href?: string;
};

const nav: NavItem[] = [
  { label: 'Command centre', icon: LayoutDashboard, workspace: 'dashboard' },
  { label: 'AI Command Center', icon: Terminal, workspace: 'ai' },
  { label: 'Portfolio', icon: PieChart, href: '#' },
  { label: 'Cash flow', icon: WalletCards, href: '#' },
  { label: 'Goals & retirement', icon: Target, href: '#' },
  { label: 'Debt optimizer', icon: CreditCard, href: '#' },
  { label: 'Protection', icon: ShieldCheck, href: '#' },
];

export function AppShell({ dashboard, ai }: { dashboard: ReactNode; ai: ReactNode }) {
  const [workspace, setWorkspace] = useState<Workspace>('dashboard');
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const sidebarWidth = collapsed ? 'lg:ml-[78px]' : 'lg:ml-[252px]';

  return (
    <div className="min-h-screen bg-[#07110e] text-[#ecf4ef]">
      <aside className={`fixed inset-y-0 left-0 z-40 hidden flex-col border-r border-white/10 bg-[#081713]/95 px-3 py-6 text-[#a8bbb2] shadow-[0_0_50px_rgba(0,0,0,.35)] backdrop-blur lg:flex ${collapsed ? 'w-[78px]' : 'w-[252px]'} transition-[width] duration-200`}>
        <div className={`mb-8 flex items-center ${collapsed ? 'justify-center' : 'gap-2 px-2'}`}>
          <span className="grid h-8 w-8 place-items-center rounded-xl bg-[#c9f56a] text-sm font-black text-[#10231b] shadow-[0_0_24px_rgba(201,245,106,.18)]">A</span>
          {!collapsed && <div><p className="text-[18px] font-extrabold tracking-tight text-white">artha<span className="font-medium text-[#78958a]">OS</span></p><p className="mt-0.5 font-mono text-[8px] uppercase tracking-[.2em] text-[#58746a]">Personal financial system</p></div>}
        </div>
        {!collapsed && (
          <div className="mb-6 rounded-xl border border-white/10 bg-white/[.03] p-3">
            <div className="flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-full bg-[#d6c2ad] text-[10px] font-bold text-[#523b2c]">AK</div>
              <div className="min-w-0"><p className="truncate text-xs font-bold text-white">Abhilash Kumar</p><p className="mt-0.5 text-[10px] text-[#708b80]">Private client · India</p></div>
              <span className="ml-auto h-2 w-2 rounded-full bg-[#c9f56a] shadow-[0_0_10px_rgba(201,245,106,.6)]" />
            </div>
          </div>
        )}
        <p className={`${collapsed ? 'sr-only' : ''} mb-2 px-2 font-mono text-[9px] uppercase tracking-[.18em] text-[#4e6b60]`}>Workspace</p>
        <nav className="space-y-1">
          {nav.map((item) => {
            const Icon = item.icon;
            const active = item.workspace === workspace;
            if (item.workspace) {
              return (
                <button key={item.label} type="button" onClick={() => setWorkspace(item.workspace!)} title={collapsed ? item.label : undefined}
                  className={`group flex w-full items-center ${collapsed ? 'justify-center' : 'gap-3'} rounded-xl px-3 py-2.5 text-left text-xs font-semibold transition ${active ? 'border border-white/10 bg-white/[.07] text-white shadow-[inset_3px_0_0_#c9f56a]' : 'text-[#78958a] hover:bg-white/[.04] hover:text-white'}`}>
                  <Icon size={17} strokeWidth={1.8} className={active ? 'text-[#c9f56a]' : ''}/>{!collapsed && item.label}
                </button>
              );
            }
            return (
              <Link key={item.label} href={item.href ?? '#'} title={collapsed ? item.label : undefined}
                className={`flex items-center ${collapsed ? 'justify-center' : 'gap-3'} rounded-xl px-3 py-2.5 text-xs font-semibold text-[#78958a] transition hover:bg-white/[.04] hover:text-white`}>
                <Icon size={17} strokeWidth={1.8}/>{!collapsed && item.label}
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto space-y-3 border-t border-white/10 px-1 pt-4">
          {!collapsed && <div className="rounded-lg border border-[#334a41] bg-[#0d211a] p-3"><div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-[#c9f56a] shadow-[0_0_8px_rgba(201,245,106,.55)]"/><span className="font-mono text-[9px] uppercase tracking-[.14em] text-[#8ea99e]">Data synchronized</span></div><p className="mt-1 pl-4 text-[9px] text-[#557267]">Supabase live workspace</p></div>}
          <button type="button" onClick={() => setCollapsed((value) => !value)} title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className={`flex w-full items-center ${collapsed ? 'justify-center' : 'gap-3'} rounded-lg py-2 text-[#7d978d] transition hover:bg-white/[.04] hover:text-white`}>
            {collapsed ? <ChevronsRight size={16}/> : <><ChevronsLeft size={16}/><span className="text-xs font-semibold">Collapse</span></>}
          </button>
          {!collapsed && <Link href="#" className="flex items-center gap-3 rounded-lg py-2 text-xs font-semibold text-[#7d978d] hover:bg-white/[.04] hover:text-white"><Settings size={15}/>Settings</Link>}
        </div>
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 lg:hidden" onClick={() => setMobileOpen(false)}>
          <aside className="h-full w-[270px] border-r border-white/10 bg-[#081713] p-5 text-[#c4d4cb]" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-center justify-between"><span className="text-lg font-bold text-white">arthaOS</span><button type="button" onClick={() => setMobileOpen(false)}><X/></button></div>
            <nav className="mt-8 space-y-1">{nav.map((item) => { const Icon = item.icon; return item.workspace ? <button key={item.label} type="button" onClick={() => { setWorkspace(item.workspace!); setMobileOpen(false); }} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm text-[#c4d4cb] hover:bg-white/5"><Icon size={17}/>{item.label}</button> : <Link key={item.label} href={item.href ?? '#'} onClick={() => setMobileOpen(false)} className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-[#c4d4cb] hover:bg-white/5"><Icon size={17}/>{item.label}</Link>; })}</nav>
          </aside>
        </div>
      )}

      <section className={`min-h-screen ${sidebarWidth} bg-[#0b1512] transition-[margin] duration-200`}>
        <header className="sticky top-0 z-20 flex items-center justify-between border-b border-white/10 bg-[#0b1512]/90 px-5 py-5 backdrop-blur sm:px-8 lg:px-10">
          <div className="flex items-center gap-3">
            <button className="lg:hidden" onClick={() => setMobileOpen(true)} aria-label="Open menu"><Menu size={20}/></button>
            <div><p className="font-mono text-[9px] tracking-[.2em] text-[#668379]">{workspace === 'dashboard' ? 'LIVE FINANCIAL POSITION' : 'FINOS AI COMMAND CENTER'}</p><h1 className="mt-1 text-2xl font-black tracking-tight text-white sm:text-[28px]">{workspace === 'dashboard' ? 'Good morning, Abhilash.' : 'AI Command Center'}</h1><p className="mt-1 text-xs text-[#678278]">{workspace === 'dashboard' ? 'Your financial operating system is up to date.' : 'Terminal workspace · Supabase data connected'}</p></div>
          </div>
          <div className="hidden items-center gap-2 sm:flex"><button aria-label="Search" className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-white/[.03] text-[#769188] hover:text-white"><Search size={15}/></button><button aria-label="Notifications" className="grid h-9 w-9 place-items-center rounded-lg border border-white/10 bg-white/[.03] text-[#769188] hover:text-white"><Bell size={15}/></button><button className="rounded-lg bg-[#c9f56a] px-3.5 py-2.5 text-[11px] font-extrabold text-[#10231b] shadow-[0_0_22px_rgba(201,245,106,.12)]">+ Add data</button></div>
        </header>
        <div className="px-5 pb-10 pt-5 sm:px-8 lg:px-10">{workspace === 'dashboard' ? dashboard : ai}</div>
      </section>
    </div>
  );
}

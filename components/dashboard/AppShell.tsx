'use client';

import type { ReactNode } from 'react';
import { useState } from 'react';
import Link from 'next/link';
import { CreditCard, LayoutDashboard, Menu, PieChart, Settings, ShieldCheck, Target, Terminal, WalletCards, X, ChevronsLeft, ChevronsRight } from 'lucide-react';

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
  const sidebarWidth = collapsed ? 'lg:ml-[76px]' : 'lg:ml-[248px]';

  return (
    <div className="min-h-screen bg-[#f5f8f5] text-[#163026]">
      <aside className={`fixed inset-y-0 left-0 z-40 hidden flex-col bg-[#10271e] px-3 py-6 text-[#c4d4cb] lg:flex ${collapsed ? 'w-[76px]' : 'w-[248px]'} transition-[width] duration-200`}>
        <div className={`mb-8 flex items-center ${collapsed ? 'justify-center' : 'gap-2 px-2'}`}>
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-[#caf060] text-sm font-bold text-[#123027]">A</span>
          {!collapsed && <span className="text-xl font-extrabold tracking-tight text-white">artha<span className="font-medium text-[#8eaa9b]">OS</span></span>}
        </div>
        {!collapsed && (
          <div className="mb-6 flex items-center gap-3 border-y border-white/10 px-1 py-4">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-[#e7d7c5] text-[10px] font-bold text-[#745539]">AK</div>
            <div><p className="text-xs font-bold text-white">Abhilash Kumar</p><p className="mt-0.5 text-[10px] text-[#95b0a1]">Private client · India</p></div>
          </div>
        )}
        <nav className="space-y-1">
          {nav.map((item) => {
            const Icon = item.icon;
            const active = item.workspace === workspace;
            if (item.workspace) {
              return (
                <button key={item.label} type="button" onClick={() => setWorkspace(item.workspace!)} title={collapsed ? item.label : undefined}
                  className={`flex w-full items-center ${collapsed ? 'justify-center' : 'gap-3'} rounded-lg px-3 py-2.5 text-left text-xs font-semibold transition ${active ? 'bg-[#29483d] text-white' : 'text-[#a0b6aa] hover:bg-white/5 hover:text-white'}`}>
                  <Icon size={17} strokeWidth={1.8}/>{!collapsed && item.label}
                </button>
              );
            }
            return (
              <Link key={item.label} href={item.href ?? '#'} title={collapsed ? item.label : undefined}
                className={`flex items-center ${collapsed ? 'justify-center' : 'gap-3'} rounded-lg px-3 py-2.5 text-xs font-semibold text-[#a0b6aa] hover:bg-white/5 hover:text-white`}>
                <Icon size={17} strokeWidth={1.8}/>{!collapsed && item.label}
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto border-t border-white/10 px-2 pt-4">
          <button type="button" onClick={() => setCollapsed((value) => !value)} title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className={`flex w-full items-center ${collapsed ? 'justify-center' : 'gap-3'} rounded-lg py-2 text-[#9bb0a4] hover:bg-white/5`}>
            {collapsed ? <ChevronsRight size={16}/> : <><ChevronsLeft size={16}/><span className="text-xs font-semibold">Collapse</span></>}
          </button>
          {!collapsed && <Link href="#" className="mt-3 flex items-center gap-3 text-xs font-semibold text-[#9bb0a4]"><Settings size={15}/>Settings</Link>}
        </div>
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 lg:hidden" onClick={() => setMobileOpen(false)}>
          <aside className="h-full w-[260px] bg-[#10271e] p-5 text-[#c4d4cb]" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-center justify-between"><span className="text-lg font-bold text-white">arthaOS</span><button type="button" onClick={() => setMobileOpen(false)}><X/></button></div>
            <nav className="mt-8 space-y-1">
              {nav.map((item) => { const Icon = item.icon; return item.workspace ?
                <button key={item.label} type="button" onClick={() => { setWorkspace(item.workspace!); setMobileOpen(false); }} className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm text-[#c4d4cb]"><Icon size={17}/>{item.label}</button> :
                <Link key={item.label} href={item.href ?? '#'} onClick={() => setMobileOpen(false)} className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-[#c4d4cb]"><Icon size={17}/>{item.label}</Link>; })}
            </nav>
          </aside>
        </div>
      )}

      <section className={`min-h-screen ${sidebarWidth} transition-[margin] duration-200`}>
        <header className="flex items-center justify-between border-b border-[#e2e9e3] bg-[#f5f8f5] px-5 py-5 sm:px-9 lg:px-12">
          <div className="flex items-center gap-3">
            <button className="lg:hidden" onClick={() => setMobileOpen(true)} aria-label="Open menu"><Menu size={20}/></button>
            <div>
              <p className="font-mono text-[10px] tracking-[.13em] text-slate-500">{workspace === 'dashboard' ? 'LIVE FINANCIAL POSITION' : 'FINOS AI COMMAND CENTER'}</p>
              <h1 className="mt-1 text-2xl font-extrabold tracking-tight sm:text-[27px]">{workspace === 'dashboard' ? 'Good morning, Abhilash.' : 'AI Command Center'}</h1>
              <p className="mt-1 text-xs text-slate-500">{workspace === 'dashboard' ? 'Your financial operating system is up to date.' : 'Terminal workspace · Supabase data connected'}</p>
            </div>
          </div>
        </header>

        <div className="px-5 pb-10 pt-5 sm:px-9 lg:px-12">
          {workspace === 'dashboard' ? dashboard : ai}
        </div>
      </section>
    </div>
  );
}

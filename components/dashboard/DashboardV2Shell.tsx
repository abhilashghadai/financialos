'use client';

import { useState } from 'react';
import { LayoutDashboard, Menu, Settings, Sparkles, Terminal, X } from 'lucide-react';

type Workspace = 'overview' | 'ai';

export function DashboardV2Shell({ overview, ai }: { overview: React.ReactNode; ai: React.ReactNode }) {
  const [workspace, setWorkspace] = useState<Workspace>('overview');
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#f5f8f5] text-[#163026]">
      <aside className={`fixed inset-y-0 left-0 z-40 hidden flex-col bg-[#10271e] px-3 py-6 text-[#c4d4cb] transition-[width] duration-200 lg:flex ${collapsed ? 'w-[76px]' : 'w-[248px]'}`}>
        <div className={`mb-8 flex items-center ${collapsed ? 'justify-center' : 'gap-2 px-2'}`}>
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#caf060] text-sm font-bold text-[#123027]">A</span>
          {!collapsed && <span className="text-xl font-extrabold tracking-tight text-white">artha<span className="font-medium text-[#8eaa9b]">OS</span></span>}
        </div>
        <div className="mb-6 flex items-center gap-3 border-y border-white/10 px-1 py-4">
          <div className="grid h-9 w-9 place-items-center rounded-full bg-[#e7d7c5] text-[10px] font-bold text-[#745539]">AK</div>
          {!collapsed && <div><p className="text-xs font-bold text-white">Abhilash Kumar</p><p className="mt-0.5 text-[10px] text-[#95b0a1]">Private client · India</p></div>}
        </div>
        <nav className="space-y-1">
          <button type="button" onClick={() => setWorkspace('overview')} className={`flex w-full items-center ${collapsed ? 'justify-center' : 'gap-3'} rounded-lg px-3 py-2.5 text-left text-xs font-semibold ${workspace === 'overview' ? 'bg-[#29483d] text-white' : 'text-[#a0b6aa] hover:bg-white/5 hover:text-white'}`} title={collapsed ? 'Overview' : undefined}><LayoutDashboard size={17} />{!collapsed && 'Overview'}</button>
          <button type="button" onClick={() => setWorkspace('ai')} className={`flex w-full items-center ${collapsed ? 'justify-center' : 'gap-3'} rounded-lg px-3 py-2.5 text-left text-xs font-semibold ${workspace === 'ai' ? 'bg-[#29483d] text-white' : 'text-[#a0b6aa] hover:bg-white/5 hover:text-white'}`} title={collapsed ? 'AI Command Center' : undefined}><Terminal size={17} />{!collapsed && 'AI Command Center'}</button>
        </nav>
        <div className="mt-auto border-t border-white/10 px-2 pt-4">
          <button type="button" onClick={() => setCollapsed((v) => !v)} title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'} className={`flex w-full items-center ${collapsed ? 'justify-center' : 'gap-3'} rounded-lg py-2 text-[#9bb0a4] hover:bg-white/5`}>{collapsed ? <Menu size={17} /> : <><X size={15} /><span className="text-xs font-semibold">Collapse</span></>}</button>
          {!collapsed && <button type="button" className="mt-2 flex items-center gap-3 text-xs font-semibold text-[#9bb0a4]"><Settings size={15} />Settings</button>}
        </div>
      </aside>

      {mobileOpen && <div className="fixed inset-0 z-50 bg-black/40 lg:hidden" onClick={() => setMobileOpen(false)}><aside className="h-full w-[260px] bg-[#10271e] p-5 text-[#c4d4cb]" onClick={(e) => e.stopPropagation()}><div className="flex items-center justify-between"><span className="text-lg font-bold text-white">arthaOS</span><button type="button" onClick={() => setMobileOpen(false)}><X /></button></div><nav className="mt-8 space-y-1"><button type="button" onClick={() => { setWorkspace('overview'); setMobileOpen(false); }} className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm text-[#c4d4cb]"><LayoutDashboard size={17} />Overview</button><button type="button" onClick={() => { setWorkspace('ai'); setMobileOpen(false); }} className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm text-[#c4d4cb]"><Terminal size={17} />AI Command Center</button></nav></aside></div>}

      <section className={`min-h-screen transition-[margin] duration-200 ${collapsed ? 'lg:ml-[76px]' : 'lg:ml-[248px]'}`}>
        <header className="flex items-center justify-between border-b border-[#dfe8e1] bg-[#f5f8f5]/95 px-5 py-5 backdrop-blur sm:px-9 lg:px-12">
          <div className="flex items-center gap-3"><button className="lg:hidden" onClick={() => setMobileOpen(true)} aria-label="Open menu"><Menu size={20} /></button><div><p className="font-mono text-[10px] tracking-[.14em] text-slate-500">{workspace === 'overview' ? 'FINANCIAL POSITION' : 'FINOS AI COMMAND CENTER'}</p><h1 className="mt-1 text-2xl font-extrabold tracking-tight sm:text-[28px]">{workspace === 'overview' ? 'Good morning, Abhilash.' : 'AI Command Center'}</h1><p className="mt-1 text-xs text-slate-500">{workspace === 'overview' ? 'Your financial operating system, rebuilt cleanly.' : 'Live terminal workspace · Supabase data context ready'}</p></div></div><div className="hidden items-center gap-2 sm:flex"><button className="grid h-9 w-9 place-items-center rounded-lg border border-[#dce6df] bg-white text-slate-600" aria-label="Notifications"><Sparkles size={15} /></button></div></header>
        <div className="px-5 py-5 sm:px-9 lg:px-12">{workspace === 'overview' ? overview : ai}</div>
      </section>
    </main>
  );
}

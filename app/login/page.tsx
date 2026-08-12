'use client';

import { useState } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function signInWithGoogle() {
    if (!supabase) {
      setError('Supabase Auth is not configured for this environment yet.');
      return;
    }

    setLoading(true);
    setError(null);

    const { error: authError } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#0b1712] px-6 py-10 text-white">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-md items-center justify-center">
        <section className="w-full rounded-2xl border border-white/10 bg-[#10271e] p-8 shadow-2xl">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-[#caf060] text-lg font-bold text-[#123027]">A</div>
          <p className="mt-6 text-center font-mono text-[10px] tracking-[.24em] text-[#8eaa9b]">ARTHAOS</p>
          <h1 className="mt-2 text-center text-3xl font-extrabold tracking-tight">Your AI Financial Operating System</h1>
          <p className="mx-auto mt-3 max-w-sm text-center text-sm leading-6 text-[#9fb6aa]">
            Sign in to access your dashboard, investments, goals, documents, and future AI financial copilot.
          </p>

          <button
            type="button"
            onClick={signInWithGoogle}
            disabled={loading || !isSupabaseConfigured}
            className="mt-8 flex w-full items-center justify-center gap-3 rounded-xl bg-white px-4 py-3 text-sm font-bold text-slate-900 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <span className="grid h-5 w-5 place-items-center rounded-full border border-slate-300 text-[11px] font-bold">G</span>
            {loading ? 'Connecting…' : 'Continue with Google'}
          </button>

          {error && <p className="mt-4 rounded-lg border border-red-400/20 bg-red-500/10 p-3 text-xs leading-5 text-red-200">{error}</p>}
          {!isSupabaseConfigured && <p className="mt-4 text-center text-[11px] text-amber-200/80">Add Supabase environment variables before enabling Google sign-in.</p>}

          <p className="mt-6 text-center text-[10px] leading-5 text-[#718d7e]">Private financial workspace · Powered by Supabase Auth</p>
        </section>
      </div>
    </main>
  );
}

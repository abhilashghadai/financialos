import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { fetchKiteHoldings } from '@/lib/kite/client';

export const dynamic = 'force-dynamic';

export async function POST() {
  if (!supabase) return NextResponse.json({ error: 'Supabase is not configured' }, { status: 500 });

  const { data: account, error: accountError } = await supabase
    .from('zerodha_accounts')
    .select('id, kite_user_id, access_token')
    .eq('sync_status', 'success')
    .order('updated_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (accountError || !account?.access_token) {
    return NextResponse.json({ error: 'No connected Zerodha account' }, { status: 404 });
  }

  const startedAt = new Date().toISOString();
  const { data: run, error: runError } = await supabase
    .from('zerodha_sync_runs')
    .insert({ account_id: account.id, status: 'running', started_at: startedAt })
    .select('id')
    .single();

  if (runError || !run) return NextResponse.json({ error: runError?.message ?? 'Unable to start sync' }, { status: 500 });

  try {
    const holdings = await fetchKiteHoldings(account.access_token);
    const snapshotDate = new Date().toISOString().slice(0, 10);

    const rows = holdings.map((holding) => ({
      account_id: account.id,
      snapshot_date: snapshotDate,
      tradingsymbol: String(holding.tradingsymbol ?? ''),
      exchange: holding.exchange ? String(holding.exchange) : null,
      isin: holding.isin ? String(holding.isin) : null,
      instrument_token: holding.instrument_token == null ? null : Number(holding.instrument_token),
      product: holding.product ? String(holding.product) : null,
      quantity: Number(holding.quantity ?? 0),
      average_price: holding.average_price == null ? null : Number(holding.average_price),
      last_price: holding.last_price == null ? null : Number(holding.last_price),
      close_price: holding.close_price == null ? null : Number(holding.close_price),
      pnl: holding.pnl == null ? null : Number(holding.pnl),
      day_change: holding.day_change == null ? null : Number(holding.day_change),
      day_change_percentage: holding.day_change_percentage == null ? null : Number(holding.day_change_percentage),
      authorised_quantity: holding.authorised_quantity == null ? null : Number(holding.authorised_quantity),
      collateral_quantity: holding.collateral_quantity == null ? null : Number(holding.collateral_quantity),
      t1_quantity: holding.t1_quantity == null ? null : Number(holding.t1_quantity),
      raw_payload: holding,
    }));

    if (rows.length) {
      const { error } = await supabase
        .from('zerodha_holding_snapshots')
        .upsert(rows, { onConflict: 'account_id,snapshot_date,tradingsymbol' });
      if (error) throw error;
    }

    await supabase.from('zerodha_sync_runs').update({
      status: 'success',
      finished_at: new Date().toISOString(),
      holdings_count: holdings.length,
      portfolio_value: holdings.reduce((sum, holding) => sum + Number(holding.last_price ?? 0) * Number(holding.quantity ?? 0), 0),
    }).eq('id', run.id);

    await supabase.from('zerodha_accounts').update({
      last_sync_at: new Date().toISOString(),
      sync_status: 'success',
      sync_message: `${holdings.length} holdings synced.`,
    }).eq('id', account.id);

    return NextResponse.json({ ok: true, holdingsCount: holdings.length });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown sync error';
    await supabase.from('zerodha_sync_runs').update({ status: 'failed', finished_at: new Date().toISOString(), error_message: message }).eq('id', run.id);
    await supabase.from('zerodha_accounts').update({ sync_status: 'error', sync_message: message }).eq('id', account.id);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

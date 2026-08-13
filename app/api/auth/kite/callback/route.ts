import { NextRequest, NextResponse } from 'next/server';
import { exchangeRequestToken, fetchKiteHoldings } from '@/lib/kite/client';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const requestToken = request.nextUrl.searchParams.get('request_token');
  const error = request.nextUrl.searchParams.get('error');

  if (error) {
    return NextResponse.redirect(new URL(`/dashboard?zerodha=error&message=${encodeURIComponent(error)}`, request.url));
  }

  if (!requestToken) {
    return NextResponse.json({ error: 'Missing Kite request_token' }, { status: 400 });
  }

  if (!supabase) {
    return NextResponse.json({ error: 'Supabase is not configured' }, { status: 500 });
  }

  try {
    const session = await exchangeRequestToken(requestToken);
    const holdings = await fetchKiteHoldings(session.access_token);

    // The authenticated-user binding will be added when Google/Supabase Auth is
    // enforced in staging. For now this callback records the provider session
    // against the Kite user id and imports the holdings into the read-only
    // integration tables. No orders are placed.
    const kiteUserId = session.user_id;

    const { data: account, error: accountError } = await supabase
      .from('zerodha_accounts')
      .upsert({
        kite_user_id: kiteUserId,
        api_key: undefined,
        redirect_uri: process.env.KITE_REDIRECT_URI ?? null,
        access_token: session.access_token,
        last_login_at: new Date().toISOString(),
        sync_status: 'connected',
        sync_message: `Connected. ${holdings.length} holdings fetched.`,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'kite_user_id' })
      .select('id')
      .single();

    if (accountError || !account) throw accountError ?? new Error('Could not create Zerodha account record');

    const snapshotDate = new Date().toISOString().slice(0, 10);
    const snapshotRows = holdings.map((holding) => ({
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

    if (snapshotRows.length) {
      const { error: snapshotError } = await supabase
        .from('zerodha_holding_snapshots')
        .upsert(snapshotRows, { onConflict: 'account_id,snapshot_date,tradingsymbol' });
      if (snapshotError) throw snapshotError;
    }

    await supabase.from('zerodha_sync_runs').insert({
      account_id: account.id,
      status: 'success',
      finished_at: new Date().toISOString(),
      holdings_count: holdings.length,
      portfolio_value: holdings.reduce((sum, holding) => sum + Number(holding.last_price ?? 0) * Number(holding.quantity ?? 0), 0),
      request_id: null,
      error_message: null,
    });

    await supabase
      .from('zerodha_accounts')
      .update({ last_sync_at: new Date().toISOString(), sync_status: 'success', sync_message: `${holdings.length} holdings synced.` })
      .eq('id', account.id);

    return NextResponse.redirect(new URL('/dashboard?zerodha=connected', request.url));
  } catch (error) {
    console.error('Zerodha callback failed:', error);
    return NextResponse.redirect(new URL('/dashboard?zerodha=error', request.url));
  }
}

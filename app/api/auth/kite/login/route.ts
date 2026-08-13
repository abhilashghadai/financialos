import { NextResponse } from 'next/server';
import { getKiteLoginUrl } from '@/lib/kite/client';

export async function GET() {
  try {
    return NextResponse.redirect(getKiteLoginUrl());
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Kite configuration is missing';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

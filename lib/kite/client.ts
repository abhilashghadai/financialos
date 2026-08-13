import { createHash } from 'node:crypto';
import { kiteConfig, assertKiteConfigured } from './config';

const KITE_BASE_URL = 'https://api.kite.trade';

type KiteSessionResponse = {
  status: string;
  data?: {
    user_id: string;
    user_name?: string;
    email?: string;
    access_token: string;
    public_token?: string;
  };
};

type KiteHoldingsResponse = {
  status: string;
  data?: Array<Record<string, unknown>>;
};

export function getKiteLoginUrl() {
  assertKiteConfigured();
  return `https://kite.zerodha.com/connect/login?v=3&api_key=${encodeURIComponent(kiteConfig.apiKey)}`;
}

export async function exchangeRequestToken(requestToken: string) {
  assertKiteConfigured();

  const checksum = createHash('sha256')
    .update(`${kiteConfig.apiKey}${requestToken}${kiteConfig.apiSecret}`)
    .digest('hex');

  const body = new URLSearchParams({
    api_key: kiteConfig.apiKey,
    request_token: requestToken,
    checksum,
  });

  const response = await fetch(`${KITE_BASE_URL}/session/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'X-Kite-Version': '3',
    },
    body,
    cache: 'no-store',
  });

  const payload = (await response.json()) as KiteSessionResponse;
  if (!response.ok || payload.status !== 'success' || !payload.data) {
    throw new Error(`Kite token exchange failed: ${JSON.stringify(payload)}`);
  }

  return payload.data;
}

export async function fetchKiteHoldings(accessToken: string) {
  assertKiteConfigured();

  const response = await fetch(`${KITE_BASE_URL}/portfolio/holdings`, {
    headers: {
      Authorization: `token ${kiteConfig.apiKey}:${accessToken}`,
      'X-Kite-Version': '3',
    },
    cache: 'no-store',
  });

  const payload = (await response.json()) as KiteHoldingsResponse;
  if (!response.ok || payload.status !== 'success') {
    throw new Error(`Kite holdings fetch failed: ${JSON.stringify(payload)}`);
  }

  return payload.data ?? [];
}

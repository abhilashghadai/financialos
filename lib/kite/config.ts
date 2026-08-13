export const kiteConfig = {
  apiKey: process.env.KITE_API_KEY ?? '',
  apiSecret: process.env.KITE_API_SECRET ?? '',
  redirectUri: process.env.KITE_REDIRECT_URI ?? '',
};

export function assertKiteConfigured() {
  const missing = Object.entries(kiteConfig)
    .filter(([, value]) => !value)
    .map(([key]) => key);

  if (missing.length) {
    throw new Error(`Missing Kite configuration: ${missing.join(', ')}`);
  }
}

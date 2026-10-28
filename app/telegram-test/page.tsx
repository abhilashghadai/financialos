export const metadata = {
  title: "Telegram Login Test",
  description: "Feasibility test for Telegram website login and authorized archiving.",
};

const checks = [
  {
    title: "Website login",
    status: "Not configured",
    description:
      "Configure Telegram Login with @BotFather, register this deployment URL, then add server-side OIDC callback validation.",
  },
  {
    title: "Telegram client session",
    status: "Not connected",
    description:
      "This is separate from website login. An authorized MTProto session must run in a secure, persistent worker.",
  },
  {
    title: "Authorized channel ingestion",
    status: "Not configured",
    description:
      "For channels you own/administer, ingest only media you are permitted to archive. Protected content must be skipped.",
  },
  {
    title: "Persistent disk",
    status: "Not configured",
    description:
      "Vercel function storage is not durable. Use a separate Linux worker with persistent disk for the eventual archive.",
  },
];

export default function TelegramTestPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-5 py-12 text-slate-100">
      <div className="mx-auto max-w-3xl">
        <a href="/" className="text-sm text-sky-300 hover:text-sky-200">
          ← Back to FinOS
        </a>
        <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900 p-7 sm:p-10">
          <div className="inline-flex rounded-full border border-sky-800 bg-sky-950 px-3 py-1 text-xs font-semibold tracking-wide text-sky-200">
            FEASIBILITY TEST
          </div>
          <h1 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
            Telegram Login &amp; Archive
          </h1>
          <p className="mt-4 max-w-2xl leading-7 text-slate-300">
            Test website authentication first. This page does not connect to a
            Telegram client session or download media. Login to the website and
            permission to archive a channel are separate concerns.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {checks.map((check) => (
              <section
                key={check.title}
                className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <h2 className="font-medium">{check.title}</h2>
                  <span className="shrink-0 rounded-full border border-amber-900 bg-amber-950/60 px-2 py-1 text-xs text-amber-200">
                    {check.status}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-400">
                  {check.description}
                </p>
              </section>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <h2 className="font-medium">Next setup steps</h2>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-6 text-slate-300">
              <li>
                Register the web application in Telegram Login via @BotFather.
              </li>
              <li>
                Add the Vercel deployment origin and callback URI to Allowed
                URLs.
              </li>
              <li>
                Configure server-only client ID, client secret, and app-session
                secret in Vercel environment settings.
              </li>
              <li>
                Implement the OIDC Authorization Code flow with PKCE and
                server-side ID-token validation before declaring login ready.
              </li>
            </ol>
          </div>

          <p className="mt-7 text-xs leading-5 text-slate-500">
            Safety boundary: this prototype is for channels you own/administer
            and content you are authorized to archive. It does not bypass
            Telegram protected-content restrictions. Vercel hosts the dashboard;
            continuous ingestion and local disk storage require a persistent
            worker host.
          </p>
        </div>
      </div>
    </main>
  );
}

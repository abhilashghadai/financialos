import { getDashboardSummary } from '@/services/dashboard';
import { AppShell } from '@/components/dashboard/AppShell';
import { DashboardView } from '@/components/dashboard/DashboardView';
import { AICommandView } from '@/components/dashboard/AICommandView';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

export default async function DashboardPage() {
  const summary = await getDashboardSummary();
  return <AppShell dashboard={<DashboardView summary={summary} />} ai={<AICommandView summary={summary} />} />;
}

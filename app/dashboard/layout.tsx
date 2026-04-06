import { DashboardShell } from '../../src/features/dashboard/components/dashboard-shell';
import { AuthGuard } from '../../src/shared/components/guard/auth-guard';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <DashboardShell>{children}</DashboardShell>
    </AuthGuard>
  );
}

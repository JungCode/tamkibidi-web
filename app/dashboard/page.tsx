'use client';

import { OrderStatus } from '../../src/shared/api/schemas';
import { OrderListCard } from './_components/order-list-card';
import { StatsSection } from './_components/stats-section';

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
      {/* ── Left column ───────────────────────────────────────────── */}
      <div className="flex flex-col gap-10 lg:col-span-8">
        <StatsSection />
        <OrderListCard
          status={OrderStatus.Completed}
          title="Completed Orders"
        />
      </div>

      {/* ── Right column ──────────────────────────────────────────── */}
      <aside className="flex flex-col gap-10 lg:col-span-4">
        <OrderListCard
          showBadge
          status={OrderStatus.Active}
          title="Active Orders"
          variant="active"
        />
        <OrderListCard status={OrderStatus.Pending} title="Pending Queue" />
      </aside>
    </div>
  );
}

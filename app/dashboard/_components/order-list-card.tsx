'use client';

import { OrderStatus } from '../../../src/shared/api/schemas';
import { OrderItem, useOrderPagination } from '../_hooks/use-order-pagination';
import { fmtDate, trimZeroDecimals } from '../_utils/format';
import { ChangeStatusButton } from '../change-status-button';

const EMPTY_MESSAGES: Record<OrderStatus, string> = {
  [OrderStatus.Active]: 'No active orders.',
  [OrderStatus.Completed]: 'No completed orders yet.',
  [OrderStatus.Pending]: 'Queue is empty.',
};

// ─── Order row ──────────────────────────────────────────────────────────────

interface OrderRowProps {
  isActive: boolean;
  order: OrderItem;
}

function OrderRow({ isActive, order }: OrderRowProps) {
  const userName = order.user?.userName;
  return (
    <div
      className={`flex items-center gap-3 rounded-xl p-3 ${
        isActive
          ? 'border border-emerald-400/30 bg-emerald-500/10'
          : 'border border-white/5 bg-[#282a2f]'
      }`}
    >
      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-black ${
          isActive
            ? 'bg-emerald-500/20 text-emerald-200'
            : 'bg-[#33353a] text-white'
        }`}
      >
        {order.id.slice(-2).toUpperCase()}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-bold text-white">
          #{order.id.slice(-8)}
        </p>
        <p
          className={`truncate text-xs ${
            isActive ? 'text-emerald-100/80' : 'text-[#8f8fa0]'
          }`}
        >
          User: {userName ?? order.userId.slice(-8)}
        </p>
      </div>
      <div className="text-right">
        <p className="text-xs font-bold text-white">
          Qty: {trimZeroDecimals(order.quantity)}
        </p>
        <span
          className={`text-[10px] ${
            isActive ? 'text-emerald-100/80' : 'text-[#8f8fa0]'
          }`}
        >
          {fmtDate(order.createdAt)}
        </span>
      </div>
    </div>
  );
}

// ─── Order list card ─────────────────────────────────────────────────────────

interface OrderListCardProps {
  /** Show total-count badge next to title */
  showBadge?: boolean;
  status: OrderStatus;
  title: string;
  /** Renders the active-order emerald colour scheme */
  variant?: 'default' | 'active';
}

export function OrderListCard({
  showBadge = false,
  status,
  title,
  variant = 'default',
}: OrderListCardProps) {
  const { hasMore, isFetchingMore, items, loading, sentinelRef, total } =
    useOrderPagination(status);

  const isActive = variant === 'active';
  const skeletonBg = isActive ? 'bg-emerald-500/10' : 'bg-[#282a2f]';

  return (
    <div className="rounded-2xl border border-white/5 bg-[#1d2024] p-8">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-black tracking-tight text-white">
          {title}
        </h2>
        <div className="flex items-center gap-2">
          {showBadge && (
            <span className="rounded-full bg-[#5865f2]/20 px-3 py-1 text-xs font-black text-[#5865f2]">
              {total ?? items.length}
            </span>
          )}
          <ChangeStatusButton currentStatus={status} />
        </div>
      </div>

      {/* Initial loading skeletons */}
      {loading && items.length === 0 ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div
              className={`h-14 animate-pulse rounded-lg ${skeletonBg}`}
              key={i}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {items.length === 0 && (
            <p className="py-4 text-center text-sm text-[#8f8fa0]">
              {EMPTY_MESSAGES[status]}
            </p>
          )}

          {items.map((order) => (
            <OrderRow isActive={isActive} key={order.id} order={order} />
          ))}

          {/* Sentinel triggers next page fetch when scrolled into view */}
          {hasMore && <div className="h-4" ref={sentinelRef} />}

          {/* Fetch-more skeleton */}
          {isFetchingMore && (
            <div className={`h-14 animate-pulse rounded-lg ${skeletonBg}`} />
          )}
        </div>
      )}
    </div>
  );
}

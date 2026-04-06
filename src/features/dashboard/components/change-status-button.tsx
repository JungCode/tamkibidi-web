'use client';

import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

import { useIsAdmin } from '../../../lib/auth-context';
import { OrderStatus } from '../../../shared/api/schemas';
import { useChangeOrderStatusMutation } from '../../../shared/changeorderstatus.schemas';
import {
  OrderListByStatusDocument,
  useOrderListByStatusQuery,
} from '../../../shared/orderlistbystatus.schemas';
import { Button } from '../../../shared/components/ui/button';
import { Checkbox } from '../../../shared/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../../../shared/components/ui/dialog';
import { Label } from '../../../shared/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../shared/components/ui/select';

const ALL_STATUSES = [
  OrderStatus.Active,
  OrderStatus.Pending,
  OrderStatus.Completed,
];
const LIST_LIMIT = 4;

type CsOrderItem = NonNullable<
  ReturnType<typeof useOrderListByStatusQuery>['data']
>['orderListByStatus']['items'][number];

const STATUS_LABEL: Record<OrderStatus, string> = {
  [OrderStatus.Active]: 'Active',
  [OrderStatus.Completed]: 'Completed',
  [OrderStatus.Pending]: 'Pending',
};

interface Props {
  currentStatus: OrderStatus;
}

export function ChangeStatusButton({ currentStatus }: Props) {
  const isAdmin = useIsAdmin();
  const [open, setOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [newStatus, setNewStatus] = useState<OrderStatus | null>(null);

  // Extra pages (page 2+) accumulated via fetchMore.
  // Reset in the onOpenChange handler (event, not effect) each time the dialog opens.
  const [extra, setExtra] = useState<{
    isFetchingMore: boolean;
    items: CsOrderItem[];
    page: number;
  }>({ isFetchingMore: false, items: [], page: 1 });

  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const {
    data,
    fetchMore,
    loading: loadingOrders,
  } = useOrderListByStatusQuery({
    fetchPolicy: 'network-only',
    skip: !open,
    variables: { input: { status: currentStatus }, limit: LIST_LIMIT, page: 1 },
  });

  // Page 1 derived directly from query — no effect needed.
  const page1Items = data?.orderListByStatus?.items ?? [];
  const total = data?.orderListByStatus?.meta?.total ?? null;

  // Deduplicate extra pages against page 1 at render time.
  const p1Ids = new Set(page1Items.map((o) => o.id));
  const allOrders = [
    ...page1Items,
    ...extra.items.filter((o) => !p1Ids.has(o.id)),
  ];
  const hasMore = total !== null && allOrders.length < total;
  const { isFetchingMore } = extra;
  const currentPage = extra.page;

  useEffect(() => {
    if (!open) return;
    const sentinel = sentinelRef.current;
    if (!sentinel || !hasMore || isFetchingMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting || loadingOrders || isFetchingMore)
          return;
        const nextPage = currentPage + 1;
        setExtra((prev) => ({ ...prev, isFetchingMore: true }));
        fetchMore({
          variables: {
            input: { status: currentStatus },
            limit: LIST_LIMIT,
            page: nextPage,
          },
        })
          .then((result) => {
            if (!result.data) return;
            const incoming = result.data.orderListByStatus.items;
            setExtra((prev) => {
              const prevSeen = new Set(prev.items.map((o) => o.id));
              return {
                isFetchingMore: false,
                items: [
                  ...prev.items,
                  ...incoming.filter((o) => !prevSeen.has(o.id)),
                ],
                page: nextPage,
              };
            });
          })
          .catch(() => {
            setExtra((prev) => ({ ...prev, isFetchingMore: false }));
          });
      },
      { root: null, rootMargin: '120px' },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [
    open,
    hasMore,
    loadingOrders,
    isFetchingMore,
    fetchMore,
    currentStatus,
    currentPage,
  ]);

  const [changeStatus, { loading }] = useChangeOrderStatusMutation({
    awaitRefetchQueries: true,
    refetchQueries: ALL_STATUSES.map((status) => ({
      query: OrderListByStatusDocument,
      variables: { input: { status }, limit: LIST_LIMIT, page: 1 },
    })),
  });

  if (!isAdmin) return null;

  const availableStatuses = ALL_STATUSES.filter((s) => s !== currentStatus);

  function toggleId(id: string) {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!newStatus || selectedIds.length === 0) return;
    try {
      await changeStatus({
        variables: { input: { orderIds: selectedIds, status: newStatus! } },
      });
      toast.success(
        `${selectedIds.length} order(s) moved to ${STATUS_LABEL[newStatus!]}.`,
      );
      setOpen(false);
      setSelectedIds([]);
      setNewStatus(null);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Status update failed';
      toast.error(msg);
    }
  }

  return (
    <Dialog
      onOpenChange={(v) => {
        setOpen(v);
        // Reset accumulated extra pages each time the dialog opens so the
        // list always starts fresh (event handler, not a useEffect).
        if (v) setExtra({ isFetchingMore: false, items: [], page: 1 });
      }}
      open={open}
    >
      <DialogTrigger
        render={
          <Button
            className="border-white/10 text-xs font-bold text-[#8f8fa0] hover:text-white"
            size="sm"
            variant="outline"
          >
            Change Status
          </Button>
        }
      />
      <DialogContent className="border-white/10 bg-[#191c20] text-[#e2e2e8] sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-black text-white">
            Change Order Status
          </DialogTitle>
          <p className="text-sm text-[#8f8fa0]">
            Currently showing{' '}
            <span className="font-bold text-white">
              {STATUS_LABEL[currentStatus]}
            </span>{' '}
            orders.
          </p>
        </DialogHeader>

        <form className="mt-4 space-y-5" onSubmit={handleSubmit}>
          {/* Order list */}
          <div className="max-h-64 space-y-2 overflow-y-auto rounded-xl border border-white/10 bg-[#111318] p-3">
            {loadingOrders && (
              <p className="py-4 text-center text-sm text-[#8f8fa0]">
                Loading orders…
              </p>
            )}
            {!loadingOrders && allOrders.length === 0 && (
              <p className="py-4 text-center text-sm text-[#8f8fa0]">
                No {STATUS_LABEL[currentStatus].toLowerCase()} orders.
              </p>
            )}
            {allOrders.map((order) => {
              const userName = order.user?.userName;
              return (
                <label
                  className="flex cursor-pointer items-start gap-3 rounded-lg px-2 py-2 transition hover:bg-white/5"
                  key={order.id}
                >
                  <Checkbox
                    checked={selectedIds.includes(order.id)}
                    className="mt-0.5"
                    onCheckedChange={() => toggleId(order.id)}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-white">
                      #{order.id.slice(-8)}
                    </p>
                    <p className="truncate text-xs text-[#8f8fa0]">
                      User: {userName ?? order.userId.slice(-8)}
                    </p>
                    <p className="text-xs text-[#8f8fa0]">
                      Qty: {order.quantity} ·{' '}
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </label>
              );
            })}
            {hasMore && <div className="h-4" ref={sentinelRef} />}
            {isFetchingMore && (
              <div className="h-10 animate-pulse rounded-lg bg-[#1d2024]" />
            )}
          </div>

          {/* New status picker */}
          <div className="space-y-1.5">
            <Label>Move selected to</Label>
            <Select
              onValueChange={(v) => setNewStatus(v as OrderStatus | null)}
              value={newStatus}
            >
              <SelectTrigger className="border-white/10 bg-[#282a2f]">
                <SelectValue placeholder="Select new status…" />
              </SelectTrigger>
              <SelectContent className="border-white/10 bg-[#282a2f]">
                {availableStatuses.map((s) => (
                  <SelectItem key={s} value={s}>
                    {STATUS_LABEL[s]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs text-[#8f8fa0]">
              {selectedIds.length} selected
            </span>
            <div className="flex gap-3">
              <Button
                onClick={() => setOpen(false)}
                type="button"
                variant="ghost"
              >
                Cancel
              </Button>
              <Button
                className="bg-[#5865f2] font-bold text-white hover:opacity-90"
                disabled={loading || selectedIds.length === 0 || !newStatus}
                type="submit"
              >
                {loading ? 'Updating…' : 'Update Status'}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

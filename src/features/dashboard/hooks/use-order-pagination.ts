'use client';

import { useEffect, useRef, useState } from 'react';

import { OrderStatus } from '../../../shared/api/schemas';
import { useOrderListByStatusQuery } from '../../../shared/orderlistbystatus.schemas';

export const ORDER_LIMIT = 4;

export type OrderItem = NonNullable<
  ReturnType<typeof useOrderListByStatusQuery>['data']
>['orderListByStatus']['items'][number];

/**
 * Walks up the DOM to find the first ancestor that scrolls vertically.
 * Used as IntersectionObserver root so the sentinel fires relative to the
 * scrollable shell (main) rather than the browser viewport — which doesn't
 * work correctly when the shell uses `h-screen overflow-hidden`.
 */
function getScrollParent(el: HTMLElement): HTMLElement | null {
  const parent = el.parentElement;
  if (!parent) return null;
  const overflow = window.getComputedStyle(parent).overflowY;
  if (overflow === 'auto' || overflow === 'scroll') return parent;
  return getScrollParent(parent);
}

// Extra pages (page 2+) accumulated via fetchMore, keyed by statusKey.
// When `status` changes, `isMatch` is false so the stale items are ignored
// without needing a reset effect.
type ExtraState = {
  isFetchingMore: boolean;
  items: OrderItem[];
  page: number;
  statusKey: OrderStatus;
};

/**
 * Fetches the first page of orders for `status`, then appends pages on
 * demand as the sentinel scrolls into view.
 *
 * Key design choices:
 * - Page-1 items are derived directly from `data` — no state or effect needed.
 * - Extra pages are stored in a single keyed state object; stale pages for a
 *   previous status are silently dropped at read time (no reset effect).
 * - `fetchMore` resolution is read from the promise return value directly
 *   (not from watching `data`), because Apollo stores `fetchMore` results
 *   under a different cache key than the original query.
 */
export function useOrderPagination(status: OrderStatus) {
  const [extra, setExtra] = useState<ExtraState>({
    isFetchingMore: false,
    items: [],
    page: 1,
    statusKey: status,
  });

  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const { data, fetchMore, loading } = useOrderListByStatusQuery({
    fetchPolicy: 'network-only',
    variables: { input: { status }, limit: ORDER_LIMIT, page: 1 },
  });

  // Page 1 derived directly from the query — no effect needed.
  const page1Items = data?.orderListByStatus?.items ?? [];
  const total = data?.orderListByStatus?.meta?.total ?? null;

  // Extra state only applies when statusKey matches the current status.
  // When status changes and a new query fires, isMatch is false until the
  // new extra state is written, so stale items never appear.
  const isMatch = extra.statusKey === status;
  const extraItems = isMatch ? extra.items : [];
  const currentPage = isMatch ? extra.page : 1;
  const isFetchingMore = isMatch ? extra.isFetchingMore : false;

  // Deduplicate extra pages against page 1 at render time.
  const p1Ids = new Set(page1Items.map((o) => o.id));
  const allItems = [
    ...page1Items,
    ...extraItems.filter((o) => !p1Ids.has(o.id)),
  ];
  const hasMore = total !== null && allItems.length < total;

  // Attach IntersectionObserver to sentinel; fire fetchMore when it enters view.
  // Only setState calls here are inside async `.then()`/`.catch()` callbacks —
  // never synchronously in the effect body.
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !hasMore || isFetchingMore) return;

    const root = getScrollParent(sentinel);

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting || loading || isFetchingMore) return;
        const nextPage = currentPage + 1;
        setExtra((prev) => ({
          ...prev,
          isFetchingMore: true,
          statusKey: status,
        }));
        fetchMore({
          variables: { input: { status }, limit: ORDER_LIMIT, page: nextPage },
        })
          .then((result) => {
            if (!result.data) return;
            const incoming = result.data.orderListByStatus.items;
            setExtra((prev) => {
              if (prev.statusKey !== status) return prev;
              const prevSeen = new Set(prev.items.map((o) => o.id));
              return {
                isFetchingMore: false,
                items: [
                  ...prev.items,
                  ...incoming.filter((o) => !prevSeen.has(o.id)),
                ],
                page: nextPage,
                statusKey: status,
              };
            });
          })
          .catch(() => {
            setExtra((prev) => ({ ...prev, isFetchingMore: false }));
          });
      },
      { root, rootMargin: '0px' },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore, loading, isFetchingMore, fetchMore, status, currentPage]);

  return {
    hasMore,
    isFetchingMore,
    items: allItems,
    loading,
    sentinelRef,
    total,
  };
}

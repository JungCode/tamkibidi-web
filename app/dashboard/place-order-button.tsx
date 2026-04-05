'use client';

import { useState } from 'react';
import { toast } from 'sonner';

import {
  ExchangeRateListDocument,
  useExchangeRateListQuery,
} from '../../src/shared/exchangeratelist.schemas';
import { InventoryListDocument } from '../../src/shared/inventorylist.schemas';
import { OrderListByStatusDocument } from '../../src/shared/orderlistbystatus.schemas';
import { usePlaceOrderMutation } from '../../src/shared/placeorder.schemas';
import { Button } from '../components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';

interface Props {
  className?: string;
}

export function PlaceOrderButton({ className }: Props) {
  const [open, setOpen] = useState(false);
  const [exchangeRateId, setExchangeRateId] = useState('');
  const [quantity, setQuantity] = useState('');

  const { data: ratesData } = useExchangeRateListQuery({
    skip: !open,
    variables: { limit: 50, page: 1 },
  });

  const [placeOrder, { loading }] = usePlaceOrderMutation({
    awaitRefetchQueries: true,
    refetchQueries: [
      { query: InventoryListDocument, variables: { limit: 10, page: 1 } },
      { query: ExchangeRateListDocument, variables: { limit: 50, page: 1 } },
      {
        query: OrderListByStatusDocument,
        variables: {
          input: { status: 'ACTIVE' },
          limit: 20,
          page: 1,
        },
      },
      {
        query: OrderListByStatusDocument,
        variables: {
          input: { status: 'PENDING' },
          limit: 20,
          page: 1,
        },
      },
      {
        query: OrderListByStatusDocument,
        variables: {
          input: { status: 'COMPLETED' },
          limit: 20,
          page: 1,
        },
      },
    ],
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!exchangeRateId || !quantity) return;
    try {
      await placeOrder({ variables: { input: { exchangeRateId, quantity } } });
      toast.success('Order placed successfully!');
      setOpen(false);
      setExchangeRateId('');
      setQuantity('');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to place order';
      toast.error(msg);
    }
  }

  const rates = ratesData?.exchangeRateList?.items ?? [];

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger
        render={
          <Button
            className={[
              'rounded-xl bg-[#5865f2] font-bold text-white hover:opacity-90',
              className ?? '',
            ].join(' ')}
          >
            Place an Order
          </Button>
        }
      />
      <DialogContent className="border-white/10 bg-[#191c20] text-[#e2e2e8] sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-black text-white">
            Place Order
          </DialogTitle>
        </DialogHeader>
        <form className="mt-4 space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-1.5">
            <Label>Exchange Rate</Label>
            <Select
              onValueChange={(v) => setExchangeRateId(v ?? '')}
              value={exchangeRateId}
            >
              <SelectTrigger className="border-white/10 bg-[#282a2f]">
                <SelectValue placeholder="Select rate…" />
              </SelectTrigger>
              <SelectContent className="border-white/10 bg-[#282a2f]">
                {rates.map((r) => (
                  <SelectItem key={r.id} value={r.id}>
                    {r.assetType} {r.actionType} — {r.exchangeRate}{' '}
                    {r.currencyCode} / {r.baseUnit}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="po-qty">Quantity</Label>
            <Input
              className="border-white/10 bg-[#282a2f]"
              id="po-qty"
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="e.g. 50"
              required
              value={quantity}
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button
              onClick={() => setOpen(false)}
              type="button"
              variant="ghost"
            >
              Cancel
            </Button>
            <Button
              className="bg-[#5865f2] font-bold text-white hover:opacity-90"
              disabled={loading || !exchangeRateId || !quantity}
              type="submit"
            >
              {loading ? 'Placing…' : 'Place Order'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

'use client';

import { Pencil } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

import { useIsAdmin } from '../../src/lib/auth-context';
import { ActionType, AssetType } from '../../src/shared/api/schemas';
import { useEditExchangeRateMutation } from '../../src/shared/editexchangerate.schemas';
import { ExchangeRateListDocument } from '../../src/shared/exchangeratelist.schemas';
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
import { trimZeroDecimals } from './_utils/format';

interface ExchangeRateItem {
  actionType: ActionType;
  assetType: AssetType;
  baseUnit: string;
  currencyCode: string;
  exchangeRate: string;
  id: string;
}

interface Props {
  item: ExchangeRateItem;
}

export function EditExchangeRateButton({ item }: Props) {
  const isAdmin = useIsAdmin();
  const [open, setOpen] = useState(false);
  const [exchangeRate, setExchangeRate] = useState(
    trimZeroDecimals(item.exchangeRate),
  );
  const [currencyCode, setCurrencyCode] = useState(item.currencyCode);
  const [baseUnit, setBaseUnit] = useState(trimZeroDecimals(item.baseUnit));

  const [editRate, { loading }] = useEditExchangeRateMutation({
    awaitRefetchQueries: true,
    refetchQueries: [ExchangeRateListDocument],
  });

  if (!isAdmin) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await editRate({
        variables: {
          input: {
            baseUnit: trimZeroDecimals(baseUnit),
            currencyCode,
            exchangeRate: trimZeroDecimals(exchangeRate),
            id: item.id,
          },
        },
      });
      toast.success('Exchange rate updated');
      setOpen(false);
    } catch {
      toast.error('Failed to update exchange rate');
    }
  }

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger
        render={
          <button
            aria-label="Edit exchange rate"
            className="rounded p-1 text-[#8f8fa0] transition-colors hover:text-white"
          >
            <Pencil size={14} />
          </button>
        }
      />
      <DialogContent className="border-white/10 bg-[#1d2024] text-white">
        <DialogHeader>
          <DialogTitle>Edit Exchange Rate</DialogTitle>
        </DialogHeader>
        <form className="flex flex-col gap-4 pt-2" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="er-exchangeRate">Exchange Rate</Label>
            <Input
              className="border-white/10 bg-[#111318] text-white"
              id="er-exchangeRate"
              onChange={(e) => setExchangeRate(e.target.value)}
              value={exchangeRate}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="er-currencyCode">Currency Code</Label>
            <Input
              className="border-white/10 bg-[#111318] text-white"
              id="er-currencyCode"
              onChange={(e) => setCurrencyCode(e.target.value)}
              value={currencyCode}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="er-baseUnit">Base Unit</Label>
            <Input
              className="border-white/10 bg-[#111318] text-white"
              id="er-baseUnit"
              onChange={(e) => setBaseUnit(e.target.value)}
              value={baseUnit}
            />
          </div>
          <Button className="mt-2" disabled={loading} type="submit">
            {loading ? 'Saving…' : 'Save Changes'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

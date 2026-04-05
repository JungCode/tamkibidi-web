'use client';

import { Pencil } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

import { useIsAdmin } from '../../src/lib/auth-context';
import { AssetType } from '../../src/shared/api/schemas';
import { useEditInventoryByIdMutation } from '../../src/shared/editinventorybyid.schemas';
import { InventoryListDocument } from '../../src/shared/inventorylist.schemas';
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

interface InventoryItem {
  assetType: AssetType;
  id: string;
  minThreshold: string;
  quantity: string;
}

interface Props {
  item: InventoryItem;
}

export function EditInventoryButton({ item }: Props) {
  const isAdmin = useIsAdmin();
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState(trimZeroDecimals(item.quantity));
  const [minThreshold, setMinThreshold] = useState(
    trimZeroDecimals(item.minThreshold),
  );

  const [editInventory, { loading }] = useEditInventoryByIdMutation({
    awaitRefetchQueries: true,
    refetchQueries: [InventoryListDocument],
  });

  if (!isAdmin) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await editInventory({
        variables: {
          input: {
            id: item.id,
            minThreshold: trimZeroDecimals(minThreshold),
            quantity: trimZeroDecimals(quantity),
          },
        },
      });
      toast.success('Inventory updated');
      setOpen(false);
    } catch {
      toast.error('Failed to update inventory');
    }
  }

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger
        render={
          <button
            aria-label="Edit inventory"
            className="rounded p-1 text-[#8f8fa0] transition-colors hover:text-white"
          >
            <Pencil size={14} />
          </button>
        }
      />
      <DialogContent className="border-white/10 bg-[#1d2024] text-white">
        <DialogHeader>
          <DialogTitle>Edit Inventory</DialogTitle>
        </DialogHeader>
        <form className="flex flex-col gap-4 pt-2" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="inv-quantity">Quantity</Label>
            <Input
              className="border-white/10 bg-[#111318] text-white"
              id="inv-quantity"
              onChange={(e) => setQuantity(e.target.value)}
              value={quantity}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="inv-minThreshold">Min Threshold</Label>
            <Input
              className="border-white/10 bg-[#111318] text-white"
              id="inv-minThreshold"
              onChange={(e) => setMinThreshold(e.target.value)}
              value={minThreshold}
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

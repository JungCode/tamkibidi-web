'use client';

import { ActionType, AssetType } from '../../../src/shared/api/schemas';
import { useExchangeRateListQuery } from '../../../src/shared/exchangeratelist.schemas';
import { useInventoryListQuery } from '../../../src/shared/inventorylist.schemas';
import { fmtCompactNum, fmtRate, toMoneyInMillions } from '../_utils/format';
import { EditExchangeRateButton } from '../edit-exchange-rate-button';
import { EditInventoryButton } from '../edit-inventory-button';
import { CardSkeleton, StatCard } from './stat-card';

export function StatsSection() {
  const { data: inv, loading: invLoading } = useInventoryListQuery({
    variables: { limit: 10, page: 1 },
  });
  const { data: rates, loading: ratesLoading } = useExchangeRateListQuery({
    variables: { limit: 50, page: 1 },
  });

  const inventoryItems = inv?.inventoryList?.items ?? [];
  const skelyStock = inventoryItems.find(
    (i) => i.assetType === AssetType.Skely,
  );
  const moneyStock = inventoryItems.find(
    (i) => i.assetType === AssetType.Money,
  );

  const rateItems = rates?.exchangeRateList?.items ?? [];
  const skelyBuyRate = rateItems.find(
    (r) => r.assetType === AssetType.Skely && r.actionType === ActionType.Buy,
  );
  const skelySellRate = rateItems.find(
    (r) => r.assetType === AssetType.Skely && r.actionType === ActionType.Sell,
  );
  const moneyBuyRate = rateItems.find(
    (r) => r.assetType === AssetType.Money && r.actionType === ActionType.Buy,
  );
  const moneySellRate = rateItems.find(
    (r) => r.assetType === AssetType.Money && r.actionType === ActionType.Sell,
  );

  if (invLoading || ratesLoading) {
    return (
      <section className="flex flex-col gap-6">
        {[...Array(6)].map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </section>
    );
  }

  return (
    <section className="flex flex-col gap-6">
      {/* Inventory */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <StatCard
          action={
            skelyStock ? <EditInventoryButton item={skelyStock} /> : undefined
          }
          label="Skely Stock"
          unitColor="text-[#5865f2]"
          value={fmtCompactNum(Number(skelyStock?.quantity ?? 0))}
        />
        <StatCard
          action={
            moneyStock ? <EditInventoryButton item={moneyStock} /> : undefined
          }
          label="Money Stock"
          unitColor="text-[#ffb689]"
          value={fmtCompactNum(Number(moneyStock?.quantity ?? 0))}
        />
      </div>

      {/* Buy Rates */}
      <div>
        <p className="mb-3 text-[10px] font-black tracking-[0.2em] text-[#8f8fa0] uppercase">
          Buy Rates
        </p>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <StatCard
            action={
              moneyBuyRate ? (
                <EditExchangeRateButton item={moneyBuyRate} />
              ) : undefined
            }
            detail={`1M = ${fmtRate(moneyBuyRate?.exchangeRate)} ${moneyBuyRate?.currencyCode ?? 'VND'}`}
            label="Money BUY"
            unitColor="text-[#ffb689]"
            value={fmtRate(moneyBuyRate?.exchangeRate)}
          />
          <StatCard
            action={
              skelyBuyRate ? (
                <EditExchangeRateButton item={skelyBuyRate} />
              ) : undefined
            }
            detail={`1 = ${fmtRate(skelyBuyRate?.exchangeRate)} ${skelyBuyRate?.currencyCode ?? 'VND'} = ${toMoneyInMillions(skelyBuyRate?.exchangeRate, moneyBuyRate?.exchangeRate)}M money`}
            label="Skely BUY"
            unitColor="text-[#5865f2]"
            value={fmtRate(skelyBuyRate?.exchangeRate)}
          />
        </div>
      </div>

      {/* Sell Rates */}
      <div>
        <p className="mb-3 text-[10px] font-black tracking-[0.2em] text-[#8f8fa0] uppercase">
          Sell Rates
        </p>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <StatCard
            action={
              moneySellRate ? (
                <EditExchangeRateButton item={moneySellRate} />
              ) : undefined
            }
            detail={`1M = ${fmtRate(moneySellRate?.exchangeRate)} ${moneySellRate?.currencyCode ?? 'VND'}`}
            label="Money SELL"
            unitColor="text-[#ffb689]"
            value={fmtRate(moneySellRate?.exchangeRate)}
          />
          <StatCard
            action={
              skelySellRate ? (
                <EditExchangeRateButton item={skelySellRate} />
              ) : undefined
            }
            detail={`1 = ${fmtRate(skelySellRate?.exchangeRate)} ${skelySellRate?.currencyCode ?? 'VND'} = ${toMoneyInMillions(skelySellRate?.exchangeRate, moneySellRate?.exchangeRate)}M money`}
            label="Skely SELL"
            unitColor="text-[#5865f2]"
            value={fmtRate(skelySellRate?.exchangeRate)}
          />
        </div>
      </div>
    </section>
  );
}

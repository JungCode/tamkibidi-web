import React from 'react';

export function CardSkeleton() {
  return (
    <div className="min-h-50 animate-pulse rounded-2xl border border-white/5 bg-[#191c20] p-8" />
  );
}

export interface StatCardProps {
  action?: React.ReactNode;
  detail?: string;
  label: string;
  unitColor?: string;
  value: string;
}

export function StatCard({
  action,
  detail,
  label,
  unitColor = 'text-[#5865f2]',
  value,
}: StatCardProps) {
  return (
    <div className="flex min-h-50 flex-col justify-between rounded-2xl border border-white/5 bg-[#191c20] p-8 shadow-xl">
      <div>
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[10px] font-black tracking-[0.2em] text-[#8f8fa0] uppercase">
            {label}
          </span>
          {action}
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-black text-white">{value}</span>
        </div>
        {detail ? (
          <p className={`mt-3 text-sm font-bold ${unitColor}`}>{detail}</p>
        ) : null}
      </div>
    </div>
  );
}

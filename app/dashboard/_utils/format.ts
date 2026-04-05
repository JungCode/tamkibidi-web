export function fmtCompactNum(n: string | number | undefined): string {
  if (n === undefined || n === null) return '—';
  const val = Number(n);
  if (isNaN(val)) return String(n);
  if (val >= 1_000_000) return `${(val / 1_000_000).toFixed(0)}M`;
  if (val >= 1_000) return `${(val / 1_000).toFixed(1)}k`;
  return val.toLocaleString();
}

export function trimZeroDecimals(value: string | number | undefined): string {
  if (value === undefined || value === null) return '—';
  const str = String(value);
  if (!str.includes('.')) return str;
  return str.replace(/(\.\d*?[1-9])0+$/, '$1').replace(/\.0+$/, '');
}

export function fmtRate(n: string | number | undefined): string {
  if (n === undefined || n === null) return '—';
  const val = Number(n);
  if (isNaN(val)) return trimZeroDecimals(n);
  return val.toLocaleString('en-US', { maximumFractionDigits: 3 });
}

export function toMoneyInMillions(
  skelyRate?: string,
  moneyRate?: string,
): string {
  const skely = Number(skelyRate ?? NaN);
  const money = Number(moneyRate ?? NaN);
  if (Number.isNaN(skely) || Number.isNaN(money) || money === 0) return '—';
  return (skely / money).toFixed(3);
}

export function fmtDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

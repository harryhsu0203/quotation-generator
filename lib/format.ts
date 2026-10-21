const nf = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });

/** 千分位數字，例如 12,300 */
export function formatNumber(n: number): string {
  return nf.format(Math.round(n));
}

/** NT$ 千分位，例如 NT$ 12,300 */
export function formatNTD(n: number): string {
  return `NT$ ${formatNumber(n)}`;
}

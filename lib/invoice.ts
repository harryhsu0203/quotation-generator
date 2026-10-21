import { TAX_RATE } from "./tax";

export type InvoiceKind = "triple" | "duplicate";
export type TaxCategory = "taxable" | "zero" | "exempt";
export type AmountBasis = "inclusive" | "exclusive";

export interface InvoiceItem {
  quantity: number;
  unitPrice: number;
}

export interface InvoiceOptions {
  kind: InvoiceKind;
  basis: AmountBasis;
  category: TaxCategory;
}

export interface InvoiceTotals {
  /** 銷售額（未稅） */
  sales: number;
  /** 營業稅 */
  tax: number;
  /** 總計（含稅） */
  total: number;
}

export interface InvoiceLine {
  unitPrice: number;
  amount: number;
}

/** 品項合計（四捨五入為整數）。 */
export function sumItems(items: InvoiceItem[]): number {
  return Math.round(items.reduce((acc, it) => acc + it.quantity * it.unitPrice, 0));
}

/**
 * 依輸入合計金額計算銷售額、稅額、總計。
 * - 應稅＋未稅：稅額 = round(銷售額 × 5%)，總計 = 銷售額 + 稅額
 * - 應稅＋含稅：銷售額 = round(總計 ÷ 1.05)，稅額 = 總計 − 銷售額
 * - 零稅率、免稅：稅額為 0
 * - 二聯式金額皆為含稅：若輸入為未稅，總計為加上 5% 後的含稅金額（銷售額、稅額僅供參考，不印在發票上）
 */
export function calcInvoiceTotals(amount: number, { basis, category }: Pick<InvoiceOptions, "basis" | "category"> & Partial<InvoiceOptions>): InvoiceTotals {
  const s = Math.round(amount);
  if (category !== "taxable") return { sales: s, tax: 0, total: s };

  if (basis === "exclusive") {
    const tax = Math.round(s * TAX_RATE);
    return { sales: s, tax, total: s + tax };
  }
  // 含稅輸入：二聯式與三聯式的總計皆為輸入金額
  const sales = Math.round(s / (1 + TAX_RATE));
  return { sales, tax: s - sales, total: s };
}

/**
 * 發票上各品項列的顯示單價與金額。
 * 三聯式列示未稅金額（加總 = 銷售額）；二聯式列示含稅金額（加總 = 總計）。
 * 逐列換算會有四捨五入差，差額併入最後一列，確保加總與合計一致。
 */
export function calcInvoiceLines(items: InvoiceItem[], opts: InvoiceOptions): InvoiceLine[] {
  const { kind, basis, category } = opts;
  const taxable = category === "taxable";
  const toNet = (x: number) => (taxable && basis === "inclusive" ? Math.round(x / (1 + TAX_RATE)) : Math.round(x));
  const toGross = (x: number) => (taxable && basis === "exclusive" ? Math.round(x * (1 + TAX_RATE)) : Math.round(x));
  const conv = kind === "triple" ? toNet : toGross;

  const lines = items.map((it) => ({
    unitPrice: conv(it.unitPrice),
    amount: conv(Math.round(it.quantity * it.unitPrice)),
  }));
  if (lines.length === 0) return lines;

  const totals = calcInvoiceTotals(sumItems(items), opts);
  const target = kind === "triple" ? totals.sales : totals.total;
  const diff = target - lines.reduce((acc, l) => acc + l.amount, 0);
  if (diff !== 0) lines[lines.length - 1].amount += diff;
  return lines;
}

/* ---------- 日期：民國年與雙月期別 ---------- */

export interface RocDate {
  year: number; // 民國年
  month: number;
  day: number;
}

export function parseIsoDate(iso: string): { y: number; m: number; d: number } | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!match) return null;
  const [y, m, d] = [Number(match[1]), Number(match[2]), Number(match[3])];
  if (m < 1 || m > 12 || d < 1 || d > 31) return null;
  return { y, m, d };
}

export function toRocDate(iso: string): RocDate | null {
  const p = parseIsoDate(iso);
  return p ? { year: p.y - 1911, month: p.m, day: p.d } : null;
}

const ZH_DIGITS = ["〇", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
const ZH_MONTHS = ["", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"];

/** 逐位轉成國字數字，例如 115 → 「一一五」（發票期別的寫法）。 */
export function toZhDigits(n: number): string {
  return String(Math.abs(Math.round(n)))
    .split("")
    .map((d) => ZH_DIGITS[Number(d)])
    .join("");
}

export interface InvoicePeriod {
  rocYear: number;
  /** 例如「9-10」 */
  months: string;
  /** 例如「中華民國 115 年 9-10 月份」 */
  label: string;
  /** 國字民國年，例如「一一五」 */
  yearZh: string;
  /** 國字雙月，例如「九、十」「十一、十二」「一、二」 */
  monthsZh: string;
  /** 例如「一一五年 九、十月份」 */
  labelZh: string;
}

/** 發票期別為雙月一期：1-2、3-4、…、11-12。 */
export function rocPeriod(iso: string): InvoicePeriod | null {
  const p = parseIsoDate(iso);
  if (!p) return null;
  const start = p.m % 2 === 0 ? p.m - 1 : p.m;
  const months = `${start}-${start + 1}`;
  const rocYear = p.y - 1911;
  const yearZh = toZhDigits(rocYear);
  const monthsZh = `${ZH_MONTHS[start]}、${ZH_MONTHS[start + 1]}`;
  return {
    rocYear,
    months,
    label: `中華民國 ${rocYear} 年 ${months} 月份`,
    yearZh,
    monthsZh,
    labelZh: `${yearZh}年 ${monthsZh}月份`,
  };
}

/* ---------- 大寫金額 9 格（億～元） ---------- */

export const INVOICE_CAPITAL_LABELS = ["億", "仟", "佰", "拾", "萬", "仟", "佰", "拾", "元"] as const;
const CAPITAL_DIGITS = ["零", "壹", "貳", "參", "肆", "伍", "陸", "柒", "捌", "玖"];
export const INVOICE_CAPITAL_SLOTS = INVOICE_CAPITAL_LABELS.length;
export const INVOICE_MAX_TOTAL = 999_999_999;

export type LeadingFill = "zero" | "cross";

export interface CapitalCells {
  cells: string[];
  /** 金額超過 9 格可填寫的範圍 */
  overflow: boolean;
}

/**
 * 將總計拆成 9 格大寫數字（億、仟、佰、拾、萬、仟、佰、拾、元）。
 * 最高位前面的空格依 leading 填「零」或畫「╳」；數字之間的零一律填「零」。
 */
export function toInvoiceCapitalCells(total: number, leading: LeadingFill = "zero"): CapitalCells {
  const n = Math.round(Math.abs(total));
  if (n > INVOICE_MAX_TOTAL) return { cells: Array(INVOICE_CAPITAL_SLOTS).fill(""), overflow: true };

  const digits = String(n).padStart(INVOICE_CAPITAL_SLOTS, "0").split("");
  const firstNonZero = digits.findIndex((d) => d !== "0");
  const lead = leading === "cross" ? "╳" : "零";
  const cells = digits.map((d, i) => {
    // 金額為 0 時，只有最後一格（元）填「零」
    const isLeading = firstNonZero === -1 ? i < INVOICE_CAPITAL_SLOTS - 1 : i < firstNonZero;
    return isLeading ? lead : CAPITAL_DIGITS[Number(d)];
  });
  return { cells, overflow: false };
}

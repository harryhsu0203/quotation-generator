import { QUOTE_PRODUCT } from "@/lib/products";
import { toChineseAmount } from "@/lib/chinese-amount";
import { calcTotals } from "@/lib/tax";
import type { Quote, Seller } from "@/lib/types";

/** 四種版面共用同一份資料。主題色由外層的 CSS 變數 --accent 提供。 */
export interface TemplateProps {
  seller: Seller;
  quote: Quote;
}

export const TAX_LABEL = {
  exclusive: "未稅（外加 5% 營業稅）",
  inclusive: "含稅（內含 5% 營業稅）",
  none: "免稅",
} as const;

/** 各版面共用的計算結果。 */
export function quoteView(quote: Quote) {
  const totals = calcTotals(quote.items, quote.taxMode);
  return {
    totals,
    showTax: quote.taxMode !== "none",
    capital: toChineseAmount(totals.total),
  };
}

export function Row({
  label,
  value,
  labelClass = "text-slate-400",
  width = "w-12",
}: {
  label: string;
  value?: string;
  labelClass?: string;
  width?: string;
}) {
  if (!value) return null;
  return (
    <div className="flex gap-2">
      <span className={`${width} shrink-0 ${labelClass}`}>{label}</span>
      <span className="min-w-0 break-words">{value}</span>
    </div>
  );
}

export function SellerLogo({ seller, className = "h-16 max-w-[9rem]" }: { seller: Seller; className?: string }) {
  if (!seller.logo) return null;
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={seller.logo} alt="Logo" className={`${className} object-contain`} />;
}

export function SellerStamp({ seller, className = "max-h-20 max-w-full" }: { seller: Seller; className?: string }) {
  if (!seller.stamp) return null;
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={seller.stamp} alt="印章" className={`${className} object-contain`} />;
}

export function ProductFooter({ className = "" }: { className?: string }) {
  return <footer className={`text-center text-[10px] text-slate-400 ${className}`}>本報價單由 Seqlon {QUOTE_PRODUCT.name} 免費產生</footer>;
}

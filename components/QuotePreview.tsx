import { CountUp } from "./ui";
import ScaledPaper from "./ScaledPaper";
import { QUOTE_PRODUCT } from "@/lib/products";
import { toChineseAmount } from "@/lib/chinese-amount";
import { formatNTD, formatNumber } from "@/lib/format";
import { calcTotals, itemAmount } from "@/lib/tax";
import type { Quote, Seller } from "@/lib/types";

interface Props {
  seller: Seller;
  quote: Quote;
}

const TAX_LABEL = {
  exclusive: "未稅（外加 5% 營業稅）",
  inclusive: "含稅（內含 5% 營業稅）",
  none: "免稅",
} as const;

function Row({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div className="flex gap-2">
      <span className="w-12 shrink-0 text-slate-400">{label}</span>
      <span className="min-w-0 break-words">{value}</span>
    </div>
  );
}

export default function QuotePreview({ seller, quote }: Props) {
  const totals = calcTotals(quote.items, quote.taxMode);
  const showTax = quote.taxMode !== "none";

  return (
    <ScaledPaper>
      <div className="h-2.5 bg-brand-700" />
      <div className="paper-inner min-h-[1080px] p-12 text-[13px] leading-relaxed text-slate-800">
        {/* 標題區 */}
        <header className="flex items-start justify-between gap-6">
          <div className="flex min-w-0 items-center gap-4">
            {seller.logo && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={seller.logo} alt="Logo" className="h-16 max-w-[9rem] object-contain" />
            )}
            <div className="min-w-0 space-y-0.5 text-xs">
              <div className="text-base font-bold text-ink">{seller.name || "（我方公司名稱）"}</div>
              <Row label="統編" value={seller.taxId} />
              <Row label="電話" value={seller.phone} />
              <Row label="Email" value={seller.email} />
              <Row label="地址" value={seller.address} />
            </div>
          </div>
          <div className="shrink-0 text-right">
            <h1 className="text-[32px] font-bold leading-none tracking-[0.25em] text-brand-700">報價單</h1>
            <div className="mt-1.5 text-[11px] font-medium tracking-[0.4em] text-slate-400">QUOTATION</div>
          </div>
        </header>

        {/* 客戶與單據資訊 */}
        <div className="mt-8 grid grid-cols-[1.3fr_1fr] gap-4">
          <div className="rounded-lg border border-line p-4">
            <div className="mb-2 text-[11px] font-bold tracking-widest text-brand-700">客戶 BILL TO</div>
            <div className="mb-1 text-sm font-bold text-ink">{quote.customer.name || "（客戶名稱）"}</div>
            <div className="space-y-0.5 text-xs">
              <Row label="統編" value={quote.customer.taxId} />
              <Row label="聯絡人" value={quote.customer.contact} />
              <Row label="電話" value={quote.customer.phone} />
              <Row label="地址" value={quote.customer.address} />
            </div>
          </div>
          <div className="rounded-lg bg-brand-50 p-4">
            <div className="mb-2 text-[11px] font-bold tracking-widest text-brand-700">單據 DETAILS</div>
            <div className="space-y-1 text-xs">
              <Row label="單號" value={quote.number} />
              <Row label="日期" value={quote.date} />
              <Row label="有效至" value={quote.validUntil} />
              <Row label="報價人" value={seller.contact} />
            </div>
          </div>
        </div>

        {/* 品項 */}
        <table className="mt-7 w-full border-collapse text-xs">
          <thead>
            <tr className="bg-brand-100 text-brand-900">
              <th className="w-9 rounded-tl-md px-2 py-2 text-center font-bold">#</th>
              <th className="px-2 py-2 text-left font-bold">品名</th>
              <th className="px-2 py-2 text-left font-bold">規格</th>
              <th className="w-14 px-2 py-2 text-center font-bold">數量</th>
              <th className="w-12 px-2 py-2 text-center font-bold">單位</th>
              <th className="w-24 px-2 py-2 text-right font-bold">單價</th>
              <th className="w-28 rounded-tr-md px-2 py-2 text-right font-bold">小計</th>
            </tr>
          </thead>
          <tbody>
            {quote.items.map((it, i) => (
              <tr key={it.id} className={i % 2 === 1 ? "bg-slate-50" : ""}>
                <td className="px-2 py-2 text-center text-slate-400">{i + 1}</td>
                <td className="px-2 py-2 font-medium text-ink">{it.name}</td>
                <td className="px-2 py-2 text-slate-600">{it.spec}</td>
                <td className="px-2 py-2 text-center tabular-nums">{it.quantity}</td>
                <td className="px-2 py-2 text-center">{it.unit}</td>
                <td className="px-2 py-2 text-right tabular-nums">{formatNumber(it.unitPrice)}</td>
                <td className="px-2 py-2 text-right font-medium tabular-nums">{formatNumber(itemAmount(it))}</td>
              </tr>
            ))}
            {quote.items.length === 0 && (
              <tr>
                <td colSpan={7} className="px-2 py-6 text-center text-slate-400">
                  尚無品項
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="h-px bg-line" />

        {/* 合計 */}
        <div className="avoid-break mt-5 flex items-start justify-between gap-6">
          <div className="pt-1 text-xs text-slate-500">稅別：{TAX_LABEL[quote.taxMode]}</div>
          <div className="w-72 overflow-hidden rounded-lg border border-line">
            {showTax && (
              <div className="space-y-1.5 px-4 py-3 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">未稅金額</span>
                  <CountUp value={totals.subtotal} format={formatNTD} className="tabular-nums" />
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">營業稅（5%）</span>
                  <CountUp value={totals.tax} format={formatNTD} className="tabular-nums" />
                </div>
              </div>
            )}
            <div className="flex items-center justify-between bg-brand-700 px-4 py-3 text-white">
              <span className="text-sm font-bold">總計</span>
              <CountUp value={totals.total} format={formatNTD} className="text-xl font-bold tabular-nums" />
            </div>
          </div>
        </div>

        <div className="avoid-break mt-3 flex items-center gap-3 rounded-lg bg-brand-50 px-4 py-3">
          <span className="text-[11px] font-bold tracking-widest text-brand-700">大寫金額</span>
          <span className="text-sm font-bold text-brand-900">{toChineseAmount(totals.total)}</span>
        </div>

        {/* 備註 */}
        {(quote.paymentTerms || quote.notes) && (
          <div className="avoid-break mt-6 grid grid-cols-2 gap-6 text-xs">
            {quote.paymentTerms && (
              <div>
                <div className="mb-1 text-[11px] font-bold tracking-widest text-brand-700">付款條件</div>
                <div className="whitespace-pre-wrap">{quote.paymentTerms}</div>
              </div>
            )}
            {quote.notes && (
              <div>
                <div className="mb-1 text-[11px] font-bold tracking-widest text-brand-700">備註</div>
                <div className="whitespace-pre-wrap">{quote.notes}</div>
              </div>
            )}
          </div>
        )}

        {/* 簽章 */}
        <div className="avoid-break mt-12 grid grid-cols-2 gap-10">
          <div>
            <div className="h-20" />
            <div className="border-t border-slate-300 pt-1 text-center text-[11px] text-slate-500">客戶確認簽章</div>
          </div>
          <div>
            <div className="flex h-20 items-end justify-center">
              {seller.stamp && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={seller.stamp} alt="印章" className="max-h-20 max-w-full object-contain" />
              )}
            </div>
            <div className="border-t border-slate-300 pt-1 text-center text-[11px] text-slate-500">報價單位簽章</div>
          </div>
        </div>

        <footer className="mt-10 border-t border-line pt-3 text-center text-[10px] text-slate-400">
          本報價單由 {QUOTE_PRODUCT.name} 免費產生
        </footer>
      </div>
    </ScaledPaper>
  );
}

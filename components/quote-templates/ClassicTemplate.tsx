import { CountUp } from "@/components/ui";
import { formatNTD, formatNumber } from "@/lib/format";
import { itemAmount } from "@/lib/tax";
import { ProductFooter, Row, SellerLogo, SellerStamp, TAX_LABEL, quoteView, type TemplateProps } from "./shared";

/** 經典：清楚平衡的商務版面。 */
export default function ClassicTemplate({ seller, quote }: TemplateProps) {
  const { totals, showTax, capital } = quoteView(quote);

  return (
    <>
      <div className="h-2.5 acc-bg" />
      <div className="paper-inner min-h-[1080px] p-12 text-[13px] leading-relaxed text-slate-800">
        <header className="flex items-start justify-between gap-6">
          <div className="flex min-w-0 items-center gap-4">
            <SellerLogo seller={seller} />
            <div className="min-w-0 space-y-0.5 text-xs">
              <div className="text-base font-bold text-ink">{seller.name || "（我方公司名稱）"}</div>
              <Row label="統編" value={seller.taxId} />
              <Row label="電話" value={seller.phone} />
              <Row label="Email" value={seller.email} />
              <Row label="地址" value={seller.address} />
            </div>
          </div>
          <div className="shrink-0 text-right">
            <h1 className="acc-text text-[32px] font-bold leading-none tracking-[0.25em]">報價單</h1>
            <div className="mt-1.5 text-[11px] font-medium tracking-[0.4em] text-slate-400">QUOTATION</div>
          </div>
        </header>

        <div className="mt-8 grid grid-cols-[1.3fr_1fr] gap-4">
          <div className="rounded-lg border border-line p-4">
            <div className="acc-text mb-2 text-[11px] font-bold tracking-widest">客戶 BILL TO</div>
            <div className="mb-1 text-sm font-bold text-ink">{quote.customer.name || "（客戶名稱）"}</div>
            <div className="space-y-0.5 text-xs">
              <Row label="統編" value={quote.customer.taxId} />
              <Row label="聯絡人" value={quote.customer.contact} />
              <Row label="電話" value={quote.customer.phone} />
              <Row label="地址" value={quote.customer.address} />
            </div>
          </div>
          <div className="acc-tint rounded-lg p-4">
            <div className="acc-text mb-2 text-[11px] font-bold tracking-widest">單據 DETAILS</div>
            <div className="space-y-1 text-xs">
              <Row label="單號" value={quote.number} />
              <Row label="日期" value={quote.date} />
              <Row label="有效至" value={quote.validUntil} />
              <Row label="報價人" value={seller.contact} />
            </div>
          </div>
        </div>

        <table data-items-table className="mt-7 w-full border-collapse text-xs">
          <thead>
            <tr className="acc-tint2 text-ink">
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
            <div className="acc-bg flex items-center justify-between px-4 py-3 text-white">
              <span className="text-sm font-bold">總計</span>
              <CountUp value={totals.total} format={formatNTD} className="text-xl font-bold tabular-nums" />
            </div>
          </div>
        </div>

        <div className="avoid-break acc-tint mt-3 flex items-center gap-3 rounded-lg px-4 py-3">
          <span className="acc-text text-[11px] font-bold tracking-widest">大寫金額</span>
          <span className="acc-ink text-sm font-bold">{capital}</span>
        </div>

        {(quote.paymentTerms || quote.notes) && (
          <div className="avoid-break mt-6 grid grid-cols-2 gap-6 text-xs">
            {quote.paymentTerms && (
              <div>
                <div className="acc-text mb-1 text-[11px] font-bold tracking-widest">付款條件</div>
                <div className="whitespace-pre-wrap">{quote.paymentTerms}</div>
              </div>
            )}
            {quote.notes && (
              <div>
                <div className="acc-text mb-1 text-[11px] font-bold tracking-widest">備註</div>
                <div className="whitespace-pre-wrap">{quote.notes}</div>
              </div>
            )}
          </div>
        )}

        <div className="avoid-break mt-12 grid grid-cols-2 gap-10">
          <div>
            <div className="h-20" />
            <div className="border-t border-slate-300 pt-1 text-center text-[11px] text-slate-500">客戶確認簽章</div>
          </div>
          <div>
            <div className="flex h-20 items-end justify-center">
              <SellerStamp seller={seller} />
            </div>
            <div className="border-t border-slate-300 pt-1 text-center text-[11px] text-slate-500">報價單位簽章</div>
          </div>
        </div>

        <ProductFooter className="mt-10 border-t border-line pt-3" />
      </div>
    </>
  );
}

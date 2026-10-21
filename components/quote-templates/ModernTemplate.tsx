import { CountUp } from "@/components/ui";
import { formatNTD, formatNumber } from "@/lib/format";
import { itemAmount } from "@/lib/tax";
import { ProductFooter, Row, SellerLogo, SellerStamp, TAX_LABEL, quoteView, type TemplateProps } from "./shared";

/** 現代：頂部整條主題色色帶、卡片式客戶與單據資訊。 */
export default function ModernTemplate({ seller, quote }: TemplateProps) {
  const { totals, showTax, capital } = quoteView(quote);

  return (
    <div className="paper-inner min-h-[1080px] p-12 pt-0 text-[13px] leading-relaxed text-slate-800">
      <header className="bleed acc-bg -mx-12 flex items-start justify-between gap-6 px-12 pb-14 pt-10 text-white">
        <div className="flex min-w-0 items-center gap-4">
          {seller.logo && (
            <span className="grid shrink-0 place-items-center rounded-xl bg-white p-2">
              <SellerLogo seller={seller} className="h-12 max-w-[8rem]" />
            </span>
          )}
          <div className="min-w-0">
            <div className="text-xl font-bold leading-tight">{seller.name || "（我方公司名稱）"}</div>
            {seller.taxId && <div className="mt-0.5 text-xs text-white/80">統一編號 {seller.taxId}</div>}
          </div>
        </div>
        <div className="shrink-0 text-right">
          <h1 className="text-[30px] font-bold leading-none tracking-[0.2em]">報價單</h1>
          <div className="mt-1.5 text-[11px] font-medium tracking-[0.45em] text-white/80">QUOTATION</div>
        </div>
      </header>

      <div className="relative -mt-8 grid grid-cols-[1.3fr_1fr] gap-4">
        <div className="rounded-xl border border-line bg-white p-4 shadow-[0_4px_16px_rgb(11_27_43/0.08)]">
          <div className="acc-text mb-2 text-[11px] font-bold tracking-widest">客戶 BILL TO</div>
          <div className="mb-1 text-sm font-bold text-ink">{quote.customer.name || "（客戶名稱）"}</div>
          <div className="space-y-0.5 text-xs">
            <Row label="統編" value={quote.customer.taxId} />
            <Row label="聯絡人" value={quote.customer.contact} />
            <Row label="電話" value={quote.customer.phone} />
            <Row label="地址" value={quote.customer.address} />
          </div>
        </div>
        <div className="rounded-xl border border-line bg-white p-4 shadow-[0_4px_16px_rgb(11_27_43/0.08)]">
          <div className="acc-text mb-2 text-[11px] font-bold tracking-widest">單據 DETAILS</div>
          <div className="space-y-1 text-xs">
            <Row label="單號" value={quote.number} />
            <Row label="日期" value={quote.date} />
            <Row label="有效至" value={quote.validUntil} />
            <Row label="報價人" value={seller.contact} />
            <Row label="電話" value={seller.phone} />
            <Row label="Email" value={seller.email} />
          </div>
        </div>
      </div>
      {seller.address && <div className="mt-2 text-[11px] text-slate-500">公司地址：{seller.address}</div>}

      <table className="mt-6 w-full border-collapse text-xs">
        <thead>
          <tr className="acc-border border-b-2 text-left">
            <th className="acc-text w-9 px-2 py-2 text-center font-bold">#</th>
            <th className="acc-text px-2 py-2 font-bold">品名</th>
            <th className="acc-text px-2 py-2 font-bold">規格</th>
            <th className="acc-text w-14 px-2 py-2 text-center font-bold">數量</th>
            <th className="acc-text w-12 px-2 py-2 text-center font-bold">單位</th>
            <th className="acc-text w-24 px-2 py-2 text-right font-bold">單價</th>
            <th className="acc-text w-28 px-2 py-2 text-right font-bold">小計</th>
          </tr>
        </thead>
        <tbody>
          {quote.items.map((it, i) => (
            <tr key={it.id} className="border-b border-line">
              <td className="px-2 py-2.5 text-center text-slate-400">{i + 1}</td>
              <td className="px-2 py-2.5 font-medium text-ink">{it.name}</td>
              <td className="px-2 py-2.5 text-slate-600">{it.spec}</td>
              <td className="px-2 py-2.5 text-center tabular-nums">{it.quantity}</td>
              <td className="px-2 py-2.5 text-center">{it.unit}</td>
              <td className="px-2 py-2.5 text-right tabular-nums">{formatNumber(it.unitPrice)}</td>
              <td className="px-2 py-2.5 text-right font-medium tabular-nums">{formatNumber(itemAmount(it))}</td>
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

      <div className="avoid-break mt-6 grid grid-cols-[1fr_17rem] items-start gap-6">
        <div className="space-y-2">
          <div className="text-xs text-slate-500">稅別：{TAX_LABEL[quote.taxMode]}</div>
          <div className="acc-tint rounded-xl px-4 py-3">
            <div className="acc-text text-[11px] font-bold tracking-widest">大寫金額</div>
            <div className="acc-ink mt-0.5 text-sm font-bold">{capital}</div>
          </div>
        </div>
        <div className="acc-border overflow-hidden rounded-xl border-l-4 bg-slate-50">
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
          <div className="flex items-center justify-between border-t border-line px-4 py-3">
            <span className="text-sm font-bold">總計</span>
            <CountUp value={totals.total} format={formatNTD} className="acc-text text-xl font-bold tabular-nums" />
          </div>
        </div>
      </div>

      {(quote.paymentTerms || quote.notes) && (
        <div className="avoid-break mt-6 grid grid-cols-2 gap-4 text-xs">
          {quote.paymentTerms && (
            <div className="rounded-xl border border-line p-4">
              <div className="acc-text mb-1 text-[11px] font-bold tracking-widest">付款條件</div>
              <div className="whitespace-pre-wrap">{quote.paymentTerms}</div>
            </div>
          )}
          {quote.notes && (
            <div className="rounded-xl border border-line p-4">
              <div className="acc-text mb-1 text-[11px] font-bold tracking-widest">備註</div>
              <div className="whitespace-pre-wrap">{quote.notes}</div>
            </div>
          )}
        </div>
      )}

      <div className="avoid-break mt-10 grid grid-cols-2 gap-6">
        <div className="rounded-xl border border-dashed border-slate-300 p-3">
          <div className="h-16" />
          <div className="text-center text-[11px] text-slate-500">客戶確認簽章</div>
        </div>
        <div className="rounded-xl border border-dashed border-slate-300 p-3">
          <div className="flex h-16 items-end justify-center">
            <SellerStamp seller={seller} className="max-h-16 max-w-full" />
          </div>
          <div className="text-center text-[11px] text-slate-500">報價單位簽章</div>
        </div>
      </div>

      <ProductFooter className="mt-8" />
    </div>
  );
}

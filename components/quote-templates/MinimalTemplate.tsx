import { CountUp } from "@/components/ui";
import { formatNTD, formatNumber } from "@/lib/format";
import { itemAmount } from "@/lib/tax";
import { ProductFooter, SellerLogo, SellerStamp, TAX_LABEL, quoteView, type TemplateProps } from "./shared";

function Field({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div className="mt-1">
      <div className="text-[9px] uppercase tracking-[0.2em] text-neutral-400">{label}</div>
      <div className="break-words text-neutral-900">{value}</div>
    </div>
  );
}

/** 極簡：純黑白、大量留白、細線分隔（固定黑白，不套用主題色）。 */
export default function MinimalTemplate({ seller, quote }: TemplateProps) {
  const { totals, showTax, capital } = quoteView(quote);

  return (
    <div className="paper-inner min-h-[1080px] p-12 text-[12px] leading-snug text-neutral-900">
      <header className="flex items-start justify-between gap-8 border-b border-neutral-900 pb-6">
        <div className="min-w-0">
          <SellerLogo seller={seller} className="mb-2 h-9 max-w-[7rem]" />
          <div className="text-[15px] font-medium tracking-wide">{seller.name || "（我方公司名稱）"}</div>
          <div className="mt-1 space-y-0.5 text-[11px] text-neutral-500">
            {seller.taxId && <div>統編 {seller.taxId}</div>}
            {seller.address && <div>{seller.address}</div>}
            {(seller.phone || seller.email) && <div>{[seller.phone, seller.email].filter(Boolean).join("　")}</div>}
          </div>
        </div>
        <div className="shrink-0 text-right">
          <h1 className="text-[34px] font-light leading-none tracking-[0.3em]">報價單</h1>
          <div className="mt-2 text-[10px] uppercase tracking-[0.5em] text-neutral-400">Quotation</div>
        </div>
      </header>

      <div className="mt-6 grid grid-cols-3 gap-8 text-[11px]">
        <div className="col-span-1">
          <div className="text-[9px] uppercase tracking-[0.2em] text-neutral-400">客戶 To</div>
          <div className="mt-1 text-[13px] font-medium">{quote.customer.name || "（客戶名稱）"}</div>
          <Field label="統編" value={quote.customer.taxId} />
          <Field label="聯絡人" value={quote.customer.contact} />
        </div>
        <div>
          <Field label="電話" value={quote.customer.phone} />
          <Field label="地址" value={quote.customer.address} />
        </div>
        <div>
          <Field label="單號" value={quote.number} />
          <Field label="日期" value={quote.date} />
          <Field label="有效至" value={quote.validUntil} />
          <Field label="報價人" value={seller.contact} />
        </div>
      </div>

      <table data-items-table className="mt-5 w-full border-collapse text-[11px]">
        <thead>
          <tr className="border-b border-neutral-900 text-left text-[9px] uppercase tracking-[0.2em] text-neutral-500">
            <th className="w-8 py-2 font-normal">#</th>
            <th className="py-2 font-normal">品名</th>
            <th className="py-2 font-normal">規格</th>
            <th className="w-14 py-2 text-center font-normal">數量</th>
            <th className="w-12 py-2 text-center font-normal">單位</th>
            <th className="w-24 py-2 text-right font-normal">單價</th>
            <th className="w-28 py-2 text-right font-normal">小計</th>
          </tr>
        </thead>
        <tbody>
          {quote.items.map((it, i) => (
            <tr key={it.id} className="border-b border-neutral-200">
              <td className="py-2.5 text-neutral-400">{i + 1}</td>
              <td className="py-2.5 font-medium">{it.name}</td>
              <td className="py-2.5 text-neutral-600">{it.spec}</td>
              <td className="py-2.5 text-center tabular-nums">{it.quantity}</td>
              <td className="py-2.5 text-center">{it.unit}</td>
              <td className="py-2.5 text-right tabular-nums">{formatNumber(it.unitPrice)}</td>
              <td className="py-2.5 text-right tabular-nums">{formatNumber(itemAmount(it))}</td>
            </tr>
          ))}
          {quote.items.length === 0 && (
            <tr>
              <td colSpan={7} className="py-8 text-center text-neutral-400">
                尚無品項
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="avoid-break ml-auto mt-6 w-72 text-[11px]">
        {showTax && (
          <div className="space-y-1.5 border-b border-neutral-200 pb-3">
            <div className="flex justify-between">
              <span className="text-neutral-500">未稅金額</span>
              <CountUp value={totals.subtotal} format={formatNTD} className="tabular-nums" />
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">營業稅 5%</span>
              <CountUp value={totals.tax} format={formatNTD} className="tabular-nums" />
            </div>
          </div>
        )}
        <div className="flex items-baseline justify-between pt-3">
          <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-500">總計</span>
          <CountUp value={totals.total} format={formatNTD} className="text-[22px] font-medium tabular-nums" />
        </div>
        <div className="mt-1 text-right text-[10px] text-neutral-400">{TAX_LABEL[quote.taxMode]}</div>
      </div>

      <div className="avoid-break mt-5 border-b border-t border-neutral-900 py-3 text-[12px]">
        <span className="mr-3 text-[9px] uppercase tracking-[0.25em] text-neutral-500">大寫金額</span>
        <span className="font-medium tracking-wide">{capital}</span>
      </div>

      {(quote.paymentTerms || quote.notes) && (
        <div className="avoid-break mt-6 grid grid-cols-2 gap-10 text-[11px]">
          {quote.paymentTerms && (
            <div>
              <div className="mb-1 text-[9px] uppercase tracking-[0.25em] text-neutral-500">付款條件</div>
              <div className="whitespace-pre-wrap text-neutral-700">{quote.paymentTerms}</div>
            </div>
          )}
          {quote.notes && (
            <div>
              <div className="mb-1 text-[9px] uppercase tracking-[0.25em] text-neutral-500">備註</div>
              <div className="whitespace-pre-wrap text-neutral-700">{quote.notes}</div>
            </div>
          )}
        </div>
      )}

      <div className="avoid-break mt-10 grid grid-cols-2 gap-16">
        <div>
          <div className="h-12" />
          <div className="border-t border-neutral-900 pt-1 text-[10px] tracking-widest text-neutral-500">客戶確認簽章</div>
        </div>
        <div>
          <div className="flex h-12 items-end">
            <SellerStamp seller={seller} className="max-h-16 max-w-full" />
          </div>
          <div className="border-t border-neutral-900 pt-1 text-[10px] tracking-widest text-neutral-500">報價單位簽章</div>
        </div>
      </div>

      <ProductFooter className="mt-8 text-neutral-400" />
    </div>
  );
}

import { formatNumber } from "@/lib/format";
import { itemAmount } from "@/lib/tax";
import { ProductFooter, SellerLogo, SellerStamp, TAX_LABEL, quoteView, type TemplateProps } from "./shared";

const MIN_ROWS = 8;
const cell = "border border-slate-800 px-2 py-1.5";

/** 正式：傳統台灣商用報價單格式，全表格框線、欄位對齊。 */
export default function FormalTemplate({ seller, quote }: TemplateProps) {
  const { totals, showTax, capital } = quoteView(quote);
  const fillers = Math.max(0, MIN_ROWS - quote.items.length);

  return (
    <div className="paper-inner min-h-[1080px] p-10 text-[12px] leading-snug text-slate-900">
      <header className="relative text-center">
        <div className="absolute left-0 top-0">
          <SellerLogo seller={seller} className="h-14 max-w-[7rem]" />
        </div>
        <div className="text-[20px] font-bold tracking-widest">{seller.name || "（我方公司名稱）"}</div>
        <h1 className="acc-text mt-1 inline-block border-b-2 border-slate-900 px-6 pb-1 text-[26px] font-bold tracking-[0.6em]">
          報價單
        </h1>
      </header>

      <table className="mt-5 w-full border-collapse">
        <tbody>
          <tr>
            <th className={`${cell} acc-tint w-24 text-left font-bold`}>客戶名稱</th>
            <td className={cell}>{quote.customer.name}</td>
            <th className={`${cell} acc-tint w-24 text-left font-bold`}>報價單號</th>
            <td className={`${cell} w-44 tabular-nums`}>{quote.number}</td>
          </tr>
          <tr>
            <th className={`${cell} acc-tint text-left font-bold`}>統一編號</th>
            <td className={`${cell} tabular-nums`}>{quote.customer.taxId}</td>
            <th className={`${cell} acc-tint text-left font-bold`}>報價日期</th>
            <td className={`${cell} tabular-nums`}>{quote.date}</td>
          </tr>
          <tr>
            <th className={`${cell} acc-tint text-left font-bold`}>聯絡人</th>
            <td className={cell}>{quote.customer.contact}</td>
            <th className={`${cell} acc-tint text-left font-bold`}>有效期限</th>
            <td className={`${cell} tabular-nums`}>{quote.validUntil}</td>
          </tr>
          <tr>
            <th className={`${cell} acc-tint text-left font-bold`}>電　　話</th>
            <td className={cell}>{quote.customer.phone}</td>
            <th className={`${cell} acc-tint text-left font-bold`}>報 價 人</th>
            <td className={cell}>{seller.contact}</td>
          </tr>
          <tr>
            <th className={`${cell} acc-tint text-left font-bold`}>地　　址</th>
            <td className={cell} colSpan={3}>
              {quote.customer.address}
            </td>
          </tr>
        </tbody>
      </table>

      <table data-items-table className="mt-3 w-full border-collapse">
        <thead>
          <tr className="acc-tint2">
            <th className={`${cell} w-14 whitespace-nowrap text-center font-bold`}>項次</th>
            <th className={`${cell} text-left font-bold`}>品　名</th>
            <th className={`${cell} text-left font-bold`}>規　格</th>
            <th className={`${cell} w-14 text-center font-bold`}>數量</th>
            <th className={`${cell} w-12 text-center font-bold`}>單位</th>
            <th className={`${cell} w-24 text-right font-bold`}>單價</th>
            <th className={`${cell} w-28 text-right font-bold`}>金額</th>
          </tr>
        </thead>
        <tbody>
          {quote.items.map((it, i) => (
            <tr key={it.id}>
              <td className={`${cell} text-center tabular-nums`}>{i + 1}</td>
              <td className={cell}>{it.name}</td>
              <td className={cell}>{it.spec}</td>
              <td className={`${cell} text-center tabular-nums`}>{it.quantity}</td>
              <td className={`${cell} text-center`}>{it.unit}</td>
              <td className={`${cell} text-right tabular-nums`}>{formatNumber(it.unitPrice)}</td>
              <td className={`${cell} text-right tabular-nums`}>{formatNumber(itemAmount(it))}</td>
            </tr>
          ))}
          {Array.from({ length: fillers }, (_, i) => (
            <tr key={`filler-${i}`} aria-hidden>
              <td className={`${cell} text-center text-transparent`}>{quote.items.length + i + 1}</td>
              <td className={cell} />
              <td className={cell} />
              <td className={cell} />
              <td className={cell} />
              <td className={cell} />
              <td className={cell} />
            </tr>
          ))}
        </tbody>
      </table>

      <table className="avoid-break w-full border-collapse">
        <tbody>
          {showTax && (
            <>
              <tr>
                <td className={`${cell} text-right font-bold`}>合計（未稅）</td>
                <td className={`${cell} w-40 text-right tabular-nums`}>{formatNumber(totals.subtotal)}</td>
              </tr>
              <tr>
                <td className={`${cell} text-right font-bold`}>營業稅（5%）</td>
                <td className={`${cell} text-right tabular-nums`}>{formatNumber(totals.tax)}</td>
              </tr>
            </>
          )}
          <tr className="acc-tint">
            <td className={`${cell} text-right text-[13px] font-bold`}>總計（新台幣）</td>
            <td className={`${cell} text-right text-[13px] font-bold tabular-nums`}>{formatNumber(totals.total)}</td>
          </tr>
          <tr>
            <td className={cell} colSpan={2}>
              <span className="mr-3 font-bold">大寫金額</span>
              <span className="font-bold tracking-wide">{capital}</span>
              <span className="ml-4 text-[11px] text-slate-500">（{TAX_LABEL[quote.taxMode]}）</span>
            </td>
          </tr>
        </tbody>
      </table>

      <table className="avoid-break mt-3 w-full border-collapse">
        <tbody>
          <tr>
            <th className={`${cell} acc-tint w-24 align-top text-left font-bold`}>付款條件</th>
            <td className={`${cell} h-14 whitespace-pre-wrap align-top`}>{quote.paymentTerms}</td>
          </tr>
          <tr>
            <th className={`${cell} acc-tint w-24 align-top text-left font-bold`}>備　　註</th>
            <td className={`${cell} h-14 whitespace-pre-wrap align-top`}>{quote.notes}</td>
          </tr>
        </tbody>
      </table>

      <table className="avoid-break mt-3 w-full border-collapse text-center">
        <thead>
          <tr>
            <th className={`${cell} acc-tint font-bold`}>報價單位（蓋章）</th>
            <th className={`${cell} acc-tint font-bold`}>客戶確認（簽章）</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={`${cell} h-24 align-top text-left text-[11px]`}>
              <div className="space-y-0.5">
                <div>統一編號：{seller.taxId}</div>
                <div>電　　話：{seller.phone}</div>
                <div>地　　址：{seller.address}</div>
                {seller.email && <div>Email：{seller.email}</div>}
              </div>
              <div className="mt-1 flex justify-end">
                <SellerStamp seller={seller} className="max-h-16 max-w-[8rem]" />
              </div>
            </td>
            <td className={`${cell} h-24`} />
          </tr>
        </tbody>
      </table>

      <ProductFooter className="mt-6" />
    </div>
  );
}

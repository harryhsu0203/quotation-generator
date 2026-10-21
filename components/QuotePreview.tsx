import { SITE_NAME } from "@/lib/config";
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

function Line({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div>
      <span className="text-gray-500">{label}：</span>
      {value}
    </div>
  );
}

export default function QuotePreview({ seller, quote }: Props) {
  const totals = calcTotals(quote.items, quote.taxMode);
  const showTax = quote.taxMode !== "none";

  return (
    <div className="quote-sheet mx-auto w-full max-w-[210mm] bg-white p-[8mm] text-[13px] leading-relaxed text-black shadow sm:p-[12mm] md:min-h-[297mm]">
      <header className="flex items-start justify-between gap-4 border-b-2 border-gray-800 pb-3">
        <div className="flex items-center gap-3">
          {seller.logo && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={seller.logo} alt="Logo" className="h-14 max-w-[8rem] object-contain" />
          )}
          <div>
            <div className="text-lg font-bold">{seller.name || "（我方公司名稱）"}</div>
            <Line label="統編" value={seller.taxId} />
          </div>
        </div>
        <h1 className="text-2xl font-bold tracking-widest">報價單</h1>
      </header>

      <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-0.5">
          <div className="font-semibold">客戶資料</div>
          <div>{quote.customer.name || "（客戶名稱）"}</div>
          <Line label="統編" value={quote.customer.taxId} />
          <Line label="聯絡人" value={quote.customer.contact} />
          <Line label="電話" value={quote.customer.phone} />
          <Line label="地址" value={quote.customer.address} />
        </div>
        <div className="space-y-0.5 sm:text-right">
          <Line label="報價單號" value={quote.number} />
          <Line label="報價日期" value={quote.date} />
          <Line label="有效期限" value={quote.validUntil} />
          <Line label="報價人" value={seller.contact} />
          <Line label="電話" value={seller.phone} />
          <Line label="Email" value={seller.email} />
          <Line label="地址" value={seller.address} />
        </div>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full border-collapse text-[12px]">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-400 px-2 py-1 w-8">#</th>
              <th className="border border-gray-400 px-2 py-1 text-left">品名</th>
              <th className="border border-gray-400 px-2 py-1 text-left">規格</th>
              <th className="border border-gray-400 px-2 py-1">數量</th>
              <th className="border border-gray-400 px-2 py-1">單位</th>
              <th className="border border-gray-400 px-2 py-1 text-right">單價</th>
              <th className="border border-gray-400 px-2 py-1 text-right">小計</th>
            </tr>
          </thead>
          <tbody>
            {quote.items.map((it, i) => (
              <tr key={it.id}>
                <td className="border border-gray-400 px-2 py-1 text-center">{i + 1}</td>
                <td className="border border-gray-400 px-2 py-1">{it.name}</td>
                <td className="border border-gray-400 px-2 py-1">{it.spec}</td>
                <td className="border border-gray-400 px-2 py-1 text-center">{it.quantity}</td>
                <td className="border border-gray-400 px-2 py-1 text-center">{it.unit}</td>
                <td className="border border-gray-400 px-2 py-1 text-right tabular-nums">{formatNumber(it.unitPrice)}</td>
                <td className="border border-gray-400 px-2 py-1 text-right tabular-nums">{formatNumber(itemAmount(it))}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="avoid-break mt-3 flex flex-col gap-3 sm:flex-row sm:justify-between">
        <div className="text-[12px] text-gray-600">稅別：{TAX_LABEL[quote.taxMode]}</div>
        <dl className="w-full space-y-1 sm:w-64">
          {showTax && (
            <>
              <div className="flex justify-between">
                <dt>未稅金額</dt>
                <dd className="tabular-nums">{formatNTD(totals.subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt>營業稅（5%）</dt>
                <dd className="tabular-nums">{formatNTD(totals.tax)}</dd>
              </div>
            </>
          )}
          <div className="flex justify-between border-t border-gray-800 pt-1 text-base font-bold">
            <dt>總計</dt>
            <dd className="tabular-nums">{formatNTD(totals.total)}</dd>
          </div>
        </dl>
      </div>

      <div className="avoid-break mt-2 border border-gray-400 px-3 py-2">
        <span className="text-gray-500">總計（大寫）：</span>
        <span className="font-semibold">{toChineseAmount(totals.total)}</span>
      </div>

      {(quote.notes || quote.paymentTerms) && (
        <div className="avoid-break mt-4 space-y-3">
          {quote.paymentTerms && (
            <div>
              <div className="font-semibold">付款條件</div>
              <div className="whitespace-pre-wrap">{quote.paymentTerms}</div>
            </div>
          )}
          {quote.notes && (
            <div>
              <div className="font-semibold">備註</div>
              <div className="whitespace-pre-wrap">{quote.notes}</div>
            </div>
          )}
        </div>
      )}

      <div className="avoid-break mt-8 flex items-end justify-between gap-4">
        <div className="w-40 border-t border-gray-500 pt-1 text-center text-[12px] text-gray-600">客戶確認簽章</div>
        <div className="flex h-24 w-40 flex-col items-center justify-end">
          {seller.stamp && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={seller.stamp} alt="印章" className="max-h-20 max-w-full object-contain" />
          )}
          <div className="mt-1 w-full border-t border-gray-500 pt-1 text-center text-[12px] text-gray-600">報價單位簽章</div>
        </div>
      </div>

      <footer className="mt-8 text-center text-[10px] text-gray-400">
        本報價單由 {SITE_NAME} 免費產生
      </footer>
    </div>
  );
}

import { formatNumber } from "@/lib/format";
import {
  INVOICE_CAPITAL_LABELS,
  type CapitalCells,
  type InvoiceKind,
  type InvoiceLine,
  type InvoicePeriod,
  type InvoiceTotals,
  type RocDate,
  type TaxCategory,
} from "@/lib/invoice";

export interface InvoiceItemView {
  name: string;
  quantity: number;
  line: InvoiceLine;
}

export interface InvoicePaperData {
  kind: InvoiceKind;
  period: InvoicePeriod | null;
  roc: RocDate | null;
  buyer: string;
  taxId: string;
  address: string;
  items: InvoiceItemView[];
  totals: InvoiceTotals;
  category: TaxCategory;
  capital: CapitalCells;
}

/** 示意圖上可被高亮的格子 */
export type CellKey =
  | "serial"
  | "period"
  | "buyer"
  | "taxId"
  | "address"
  | "date"
  | "items"
  | "sales"
  | "tax"
  | "total"
  | "capital"
  | "stamp";

/** 示意圖上的編號圈：數字對應下方說明。 */
function Num({ n }: { n: number }) {
  return (
    <span className="mr-1 inline-grid size-[18px] shrink-0 place-items-center rounded-full bg-[#8f2d2d] align-middle font-sans text-[10px] font-bold leading-none text-white">
      {n}
    </span>
  );
}

function Cell({
  k,
  hl,
  className = "",
  children,
}: {
  k: CellKey;
  hl: ReadonlySet<CellKey>;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div data-cell={k} className={`${className} ${hl.has(k) ? "inv-hl" : ""}`}>
      {children}
    </div>
  );
}

const MIN_ROWS = 6;

function CapitalBoxes({ capital, hl, n }: { capital: CapitalCells; hl: ReadonlySet<CellKey>; n: number }) {
  return (
    <Cell k="capital" hl={hl} className="inv-b p-2">
      <div className="mb-1 text-[11px] font-bold">
        <Num n={n} />
        總計新台幣（中文大寫）
      </div>
      <div className="grid grid-cols-8 border-l border-t border-[var(--inv-line)]">
        {INVOICE_CAPITAL_LABELS.map((l) => (
          <div key={l} className="border-b border-r border-[var(--inv-line)] py-0.5 text-center text-[10px]">
            {l}
          </div>
        ))}
        {capital.cells.map((c, i) => (
          <div
            key={i}
            className="hand grid h-9 place-items-center border-b border-r border-[var(--inv-line)] text-[20px] leading-none"
          >
            {c}
          </div>
        ))}
      </div>
      {capital.overflow && <div className="mt-1 text-[10px] font-bold text-red-600">金額超過手開發票格數</div>}
    </Cell>
  );
}

function StampBox({ hl, n }: { hl: ReadonlySet<CellKey>; n: number }) {
  return (
    <Cell k="stamp" hl={hl} className="inv-b flex h-full min-h-[96px] flex-col items-center justify-center border-dashed p-2 text-center">
      <div className="text-[11px] font-bold">
        <Num n={n} />
        營業人蓋用統一發票專用章
      </div>
      <div className="mt-1 text-[10px] opacity-70">（此處蓋章，示意圖不含印章）</div>
    </Cell>
  );
}

function ItemsTable({
  items,
  hl,
  n,
  withRemark,
  amountLabel,
}: {
  items: InvoiceItemView[];
  hl: ReadonlySet<CellKey>;
  n: number;
  withRemark: boolean;
  amountLabel: string;
}) {
  const fillers = Math.max(0, MIN_ROWS - items.length);
  const c = "border border-[var(--inv-line)] px-1.5 py-1";
  return (
    <div data-cell="items" className={hl.has("items") ? "inv-hl" : ""}>
      <table className="w-full border-collapse text-[12px]">
        <thead>
          <tr>
            <th className={`${c} text-left`}>
              <Num n={n} />
              品　名
            </th>
            <th className={`${c} w-14`}>數量</th>
            <th className={`${c} w-20`}>單價</th>
            <th className={`${c} w-28`}>{amountLabel}</th>
            {withRemark && <th className={`${c} w-24`}>備註</th>}
          </tr>
        </thead>
        <tbody>
          {items.map((it, i) => (
            <tr key={i} className="hand">
              <td className={`${c} h-8 text-[15px]`}>{it.name}</td>
              <td className={`${c} text-center text-[15px] tabular-nums`}>{it.quantity || ""}</td>
              <td className={`${c} text-right text-[15px] tabular-nums`}>{it.line.unitPrice ? formatNumber(it.line.unitPrice) : ""}</td>
              <td className={`${c} text-right text-[15px] tabular-nums`}>{it.line.amount ? formatNumber(it.line.amount) : ""}</td>
              {withRemark && <td className={c} />}
            </tr>
          ))}
          {Array.from({ length: fillers }, (_, i) => (
            <tr key={`f${i}`}>
              <td className={`${c} h-8`} />
              <td className={c} />
              <td className={c} />
              <td className={c} />
              {withRemark && <td className={c} />}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Header({ data, hl, kindLabel, nums }: { data: InvoicePaperData; hl: ReadonlySet<CellKey>; kindLabel: string; nums: { serial: number; period: number } }) {
  return (
    <>
      <h2 className="text-center text-[26px] font-bold tracking-[0.3em]">統一發票（{kindLabel}）</h2>
      <div className="mt-3 grid grid-cols-[1fr_1fr] gap-3">
        <Cell k="serial" hl={hl} className="inv-b px-3 py-2">
          <div className="text-[11px] font-bold">
            <Num n={nums.serial} />
            字軌號碼
          </div>
          <div className="mt-0.5 flex items-baseline gap-2">
            <span className="hand text-[22px] tracking-widest">AB-12345678</span>
            <span className="text-[10px] opacity-70">依實際發票填寫</span>
          </div>
        </Cell>
        <Cell k="period" hl={hl} className="inv-b px-3 py-2">
          <div className="text-[11px] font-bold">
            <Num n={nums.period} />
            期別
          </div>
          <div className="hand mt-0.5 min-h-[30px] text-[18px]">{data.period?.label ?? ""}</div>
        </Cell>
      </div>
    </>
  );
}

function DateCell({ roc, hl, n }: { roc: RocDate | null; hl: ReadonlySet<CellKey>; n: number }) {
  return (
    <Cell k="date" hl={hl} className="inv-b px-3 py-2">
      <div className="text-[11px] font-bold">
        <Num n={n} />
        日期
      </div>
      <div className="mt-0.5 flex items-baseline gap-1 text-[12px]">
        民國
        <span className="hand min-w-9 border-b border-[var(--inv-line)] text-center text-[18px] tabular-nums">{roc?.year ?? ""}</span>年
        <span className="hand min-w-7 border-b border-[var(--inv-line)] text-center text-[18px] tabular-nums">{roc?.month ?? ""}</span>月
        <span className="hand min-w-7 border-b border-[var(--inv-line)] text-center text-[18px] tabular-nums">{roc?.day ?? ""}</span>日
      </div>
    </Cell>
  );
}

function TaxIdBoxes({ value, hl, n }: { value: string; hl: ReadonlySet<CellKey>; n: number }) {
  const chars = value.padEnd(8, " ").slice(0, 8).split("");
  return (
    <Cell k="taxId" hl={hl} className="inv-b px-3 py-2">
      <div className="text-[11px] font-bold">
        <Num n={n} />
        統一編號
      </div>
      <div className="mt-1 grid grid-cols-8 border-l border-t border-[var(--inv-line)]">
        {chars.map((ch, i) => (
          <div key={i} className="hand grid h-8 place-items-center border-b border-r border-[var(--inv-line)] text-[20px] tabular-nums">
            {ch.trim()}
          </div>
        ))}
      </div>
    </Cell>
  );
}

function Triple({ data, hl }: { data: InvoicePaperData; hl: ReadonlySet<CellKey> }) {
  const { totals, category } = data;
  const checks: { id: TaxCategory; label: string }[] = [
    { id: "taxable", label: "應稅" },
    { id: "zero", label: "零稅率" },
    { id: "exempt", label: "免稅" },
  ];
  return (
    <>
      <Header data={data} hl={hl} kindLabel="三聯式" nums={{ serial: 1, period: 2 }} />

      <div className="mt-3 grid grid-cols-[1.4fr_1fr] gap-3">
        <Cell k="buyer" hl={hl} className="inv-b px-3 py-2">
          <div className="text-[11px] font-bold">
            <Num n={3} />
            買受人
          </div>
          <div className="hand mt-0.5 min-h-[32px] text-[19px]">{data.buyer}</div>
        </Cell>
        <TaxIdBoxes value={data.taxId} hl={hl} n={4} />
      </div>
      <div className="mt-3 grid grid-cols-[1.4fr_1fr] gap-3">
        <Cell k="address" hl={hl} className="inv-b px-3 py-2">
          <div className="text-[11px] font-bold">
            <Num n={5} />
            地址
          </div>
          <div className="hand mt-0.5 min-h-[32px] text-[16px]">{data.address}</div>
        </Cell>
        <DateCell roc={data.roc} hl={hl} n={6} />
      </div>

      <div className="mt-3">
        <ItemsTable items={data.items} hl={hl} n={7} withRemark amountLabel="金額（未稅）" />
      </div>

      <div className="mt-3 grid grid-cols-[1fr_1.5fr_1fr] gap-3">
        <Cell k="sales" hl={hl} className="inv-b px-3 py-2">
          <div className="text-[11px] font-bold">
            <Num n={8} />
            銷售額合計
          </div>
          <div className="hand mt-1 text-right text-[20px] tabular-nums">{formatNumber(totals.sales)}</div>
        </Cell>
        <Cell k="tax" hl={hl} className="inv-b px-3 py-2">
          <div className="text-[11px] font-bold">
            <Num n={9} />
            營　業　稅
          </div>
          <div className="mt-1 flex items-center justify-between gap-2">
            <div className="flex gap-2 text-[11px]">
              {checks.map((ck) => (
                <span key={ck.id} className="flex items-center gap-0.5">
                  <span className="hand grid size-4 place-items-center border border-[var(--inv-line)] text-[14px] leading-none">
                    {category === ck.id ? "✓" : ""}
                  </span>
                  {ck.label}
                </span>
              ))}
            </div>
            <span className="hand text-[18px] tabular-nums">{formatNumber(totals.tax)}</span>
          </div>
        </Cell>
        <Cell k="total" hl={hl} className="inv-b px-3 py-2">
          <div className="text-[11px] font-bold">
            <Num n={10} />
            總　　計
          </div>
          <div className="hand mt-1 text-right text-[20px] tabular-nums">{formatNumber(totals.total)}</div>
        </Cell>
      </div>

      <div className="mt-3 grid grid-cols-[1.6fr_1fr] gap-3">
        <CapitalBoxes capital={data.capital} hl={hl} n={11} />
        <StampBox hl={hl} n={12} />
      </div>
    </>
  );
}

function Duplicate({ data, hl }: { data: InvoicePaperData; hl: ReadonlySet<CellKey> }) {
  return (
    <>
      <Header data={data} hl={hl} kindLabel="二聯式" nums={{ serial: 1, period: 2 }} />

      <div className="mt-3 grid grid-cols-[1.4fr_1fr] gap-3">
        <Cell k="buyer" hl={hl} className="inv-b px-3 py-2">
          <div className="text-[11px] font-bold">
            <Num n={3} />
            買受人
          </div>
          <div className="hand mt-0.5 min-h-[32px] text-[19px]">{data.buyer}</div>
        </Cell>
        <DateCell roc={data.roc} hl={hl} n={4} />
      </div>

      <div className="mt-3">
        <ItemsTable items={data.items} hl={hl} n={5} withRemark={false} amountLabel="金額（含稅）" />
      </div>

      <div className="mt-3 grid grid-cols-[1fr_1.6fr] gap-3">
        <Cell k="total" hl={hl} className="inv-b px-3 py-2">
          <div className="text-[11px] font-bold">
            <Num n={6} />
            總計（含稅）
          </div>
          <div className="hand mt-1 text-right text-[22px] tabular-nums">{formatNumber(data.totals.total)}</div>
          <div className="mt-0.5 text-right text-[10px] opacity-70">二聯式不另列營業稅</div>
        </Cell>
        <CapitalBoxes capital={data.capital} hl={hl} n={7} />
      </div>

      <div className="mt-3">
        <StampBox hl={hl} n={8} />
      </div>
    </>
  );
}

/** 以 HTML/CSS 自行繪製的手開統一發票示意圖（欄位結構參考手開發票，非任何官方設計或圖片）。 */
export default function InvoicePaper({ data, hl }: { data: InvoicePaperData; hl: ReadonlySet<CellKey> }) {
  return (
    <div className="paper-inner inv p-10 text-[13px]">
      <div className="border-2 border-[var(--inv-line)] p-5">
        {data.kind === "triple" ? <Triple data={data} hl={hl} /> : <Duplicate data={data} hl={hl} />}
      </div>
      <p className="mt-3 text-center text-[10px] opacity-70">手開發票填寫參考示意圖｜僅供對照填寫，非正式發票</p>
    </div>
  );
}

import { formatNumber } from "@/lib/format";
import {
  INVOICE_CAPITAL_LABELS,
  type CapitalCells,
  type InvoiceKind,
  type InvoiceTotals,
  type RocDate,
  type TaxCategory,
} from "@/lib/invoice";

export interface InvoiceItemView {
  name: string;
  /** 0 代表不顯示 */
  quantity: number;
  unitPrice: number;
  amount: number;
}

export interface InvoicePaperData {
  kind: InvoiceKind;
  /** 字軌：兩個英文字母（示意值） */
  serial: string;
  periodZh: { yearZh: string; monthsZh: string } | null;
  roc: RocDate | null;
  buyer: string;
  taxId: string;
  address: string;
  /** 只含已填寫的品項 */
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
  | "diag"
  | "sales"
  | "tax"
  | "total"
  | "capital"
  | "stamp";

type HL = ReadonlySet<CellKey>;

/** 圓形編號：對應示意圖下方的逐格說明。 */
function Num({ n }: { n: number }) {
  return (
    <span className="mr-1 inline-grid size-[17px] shrink-0 place-items-center rounded-full bg-brand-700 align-middle font-sans text-[10px] font-bold leading-none text-white">
      {n}
    </span>
  );
}

function Hl({
  k,
  hl,
  className = "",
  children,
}: {
  k: CellKey;
  hl: HL;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div data-cell={k} className={`${className} ${hl.has(k) ? "inv-hl" : ""}`}>
      {children}
    </div>
  );
}

/** 主表格內的格子（以 grid 位置放置，黑色格線由外層 gap 產生）。 */
function G({
  r,
  c,
  k,
  hl,
  className = "",
  children,
}: {
  r: string | number;
  c: string | number;
  k?: CellKey;
  hl?: HL;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      data-cell={k}
      style={{ gridRow: r, gridColumn: c }}
      className={`relative flex min-w-0 items-center bg-white px-1.5 ${className} ${k && hl?.has(k) ? "inv-hl" : ""}`}
    >
      {children}
    </div>
  );
}

/** 手寫字（藍色） */
function Hand({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <span className={`hand ${className}`}>{children}</span>;
}

/** 字距拉開的印刷標籤 */
function Spaced({ children, wide }: { children: React.ReactNode; wide?: boolean }) {
  return <span className={wide ? "tracking-[0.6em]" : "tracking-[0.35em]"}>{children}</span>;
}

function Diagonal() {
  return (
    <svg className="absolute inset-0 size-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
      <line x1="100" y1="0" x2="0" y2="100" stroke="#000" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
      <line x1="46" y1="46" x2="54" y2="54" stroke="#000" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

function Check({ on }: { on: boolean }) {
  return <Hand className="text-[17px] leading-none">{on ? "✓" : ""}</Hand>;
}

/** 日期：中華民國 ○ 年 ○ 月 ○ 日（阿拉伯數字） */
function DateLine({ roc, hl, n }: { roc: RocDate | null; hl: HL; n: number }) {
  const blank = "hand inline-block min-w-8 border-b border-black/30 text-center text-[16px] tabular-nums";
  return (
    <Hl k="date" hl={hl} className="flex items-baseline gap-1.5 text-[12px]">
      <Num n={n} />
      <Spaced>中華民國</Spaced>
      <span className={blank}>{roc?.year ?? ""}</span>年<span className={blank}>{roc?.month ?? ""}</span>
      <Spaced>月</Spaced>
      <span className={blank}>{roc?.day ?? ""}</span>
      <Spaced>日</Spaced>
    </Hl>
  );
}

const ADDRESS_PARTS = ["縣市", "鄉鎮市區", "路街", "段", "巷", "弄", "號", "樓", "室"];

function AddressRow({ address, hl, n }: { address: string; hl: HL; n: number }) {
  return (
    <Hl k="address" hl={hl} className="relative mt-1.5 flex min-h-[34px] items-end gap-2 text-[12px]">
      <span className="shrink-0 pb-0.5">
        <Num n={n} />
        <Spaced>地址：</Spaced>
      </span>
      <div className="relative min-w-0 flex-1 pb-0.5">
        <Hand className="absolute inset-x-0 -top-0.5 truncate text-[15px] leading-tight">{address}</Hand>
        <div className="flex justify-between pt-3.5 text-[11px] text-black/80">
          {ADDRESS_PARTS.map((p) => (
            <span key={p}>{p}</span>
          ))}
        </div>
      </div>
    </Hl>
  );
}

/** 總計新臺幣（中文大寫）：標籤＋ 9 格（億～元） */
function CapitalCellsView({ capital, n }: { capital: CapitalCells; n: number }) {
  return (
    <div className="grid h-full w-full grid-cols-[minmax(0,116fr)_repeat(9,minmax(0,50fr))] bg-white">
      <div className="flex flex-col justify-center border-r border-black px-1.5 text-[10.5px] leading-tight">
        <span>
          <Num n={n} />
          總計新臺幣
        </span>
        <span className="pl-[21px]">(中文大寫)</span>
      </div>
      {capital.cells.map((c, i) => (
        <div
          key={i}
          className={`flex flex-col items-center justify-center ${i > 0 ? "border-l border-dotted border-black/30" : ""}`}
        >
          <Hand className="min-h-[22px] text-[18px] leading-[22px]">{c}</Hand>
          <span className="text-[11px] leading-none">{INVOICE_CAPITAL_LABELS[i]}</span>
        </div>
      ))}
    </div>
  );
}

const TAX_OPTIONS: { id: TaxCategory; label: string }[] = [
  { id: "taxable", label: "應稅" },
  { id: "zero", label: "零稅率" },
  { id: "exempt", label: "免稅" },
];

/** 以 HTML/CSS 自行繪製的手開統一發票示意圖（依手開統一發票的實際版面結構，非圖片）。 */
export default function InvoicePaper({ data, hl }: { data: InvoicePaperData; hl: HL }) {
  const triple = data.kind === "triple";
  const baseRows = triple ? 5 : 6;
  const R = Math.max(baseRows, data.items.length);
  const used = data.items.length;
  const unused = R - used;

  // 欄寬（品名 | 數量 | 單價 | 金額 | 備註）
  const columns = triple
    ? "27.5fr 10.6fr 11fr 19.8fr 31.1fr"
    : "26fr 11.2fr 11.3fr 20fr 31.5fr";
  // 列高：表頭 + 品項 + 下方合計區
  const bottom = triple ? "30px 20px 26px 30px 44px" : "30px 44px 30px";
  const rowHeight = "30px";
  const rows = `24px repeat(${R}, ${rowHeight}) ${bottom}`;
  const lastRow = 1 + R + (triple ? 5 : 3); // 最後一列的編號
  const baseN = triple ? { diag: 8, sales: 9, tax: 10, total: 11, capital: 12, stamp: 13 } : { diag: 7, total: 8, capital: 9, tax: 10, stamp: 11 };

  return (
    <div className="paper-inner inv relative p-10 text-[12.5px] font-bold text-black">
      <div className="inv-watermark" aria-hidden />
      {/* ---- 上方：字軌、標題、期別、買受人、統編／日期、地址 ---- */}
      <div className="grid grid-cols-[4.5rem_1fr_4.5rem] items-center">
        <Hl k="serial" hl={hl} className="w-fit">
          <Num n={1} />
          <span className="text-[24px] tracking-wider">{data.serial}</span>
        </Hl>
        <h2 className="text-center text-[22px] font-bold">
          <span className="tracking-[0.55em]">統一發票</span>
          <span className="tracking-[0.2em]">（{triple ? "三聯式" : "二聯式"}）</span>
        </h2>
        <div />
      </div>

      <Hl k="period" hl={hl} className="mx-auto mt-1 flex w-fit items-baseline gap-1 text-[13px]">
        <Num n={2} />
        <Hand className="min-w-14 text-center text-[16px]">{data.periodZh?.yearZh ?? ""}</Hand>
        年
        <Hand className="min-w-14 text-center text-[16px]">{data.periodZh?.monthsZh ?? ""}</Hand>
        <Spaced>月份</Spaced>
      </Hl>

      {triple ? (
        <>
          <Hl k="buyer" hl={hl} className="mt-1.5 flex items-baseline gap-2 text-[12.5px]">
            <span className="shrink-0">
              <Num n={3} />
              <Spaced>買受人：</Spaced>
            </span>
            <Hand className="min-h-[24px] text-[17px]">{data.buyer}</Hand>
          </Hl>

          <div className="mt-1.5 grid grid-cols-[1.1fr_1fr] items-center gap-4">
            <Hl k="taxId" hl={hl} className="flex items-center gap-1.5">
              <span className="shrink-0 text-[12.5px]">
                <Num n={4} />
                <Spaced>統一編號：</Spaced>
              </span>
              <div className="grid flex-1 grid-cols-8 border-l border-t border-black">
                {data.taxId
                  .padEnd(8, " ")
                  .slice(0, 8)
                  .split("")
                  .map((ch, i) => (
                    <div key={i} className="grid h-[26px] place-items-center border-b border-r border-black">
                      <Hand className="text-[17px] tabular-nums leading-none">{ch.trim()}</Hand>
                    </div>
                  ))}
              </div>
            </Hl>
            <DateLine roc={data.roc} hl={hl} n={5} />
          </div>
          <AddressRow address={data.address} hl={hl} n={6} />
        </>
      ) : (
        <>
          <div className="mt-1.5 flex justify-end pr-[4%]">
            <DateLine roc={data.roc} hl={hl} n={3} />
          </div>
          <Hl k="buyer" hl={hl} className="mt-1 flex items-baseline gap-2 text-[12.5px]">
            <span className="shrink-0">
              <Num n={4} />
              <Spaced>買受人：</Spaced>
            </span>
            <Hand className="min-h-[24px] text-[17px]">{data.buyer}</Hand>
          </Hl>
          <AddressRow address={data.address} hl={hl} n={5} />
        </>
      )}

      {/* ---- 主表格 ---- */}
      <div
        className="mt-1.5 grid gap-px border-2 border-black bg-black"
        style={{ gridTemplateColumns: columns, gridTemplateRows: rows }}
      >
        {/* 表頭 */}
        <G r={1} c={1} className="justify-between px-3 text-[12px]">
          <span>
            <Num n={triple ? 7 : 6} />品
          </span>
          <span>名</span>
        </G>
        <G r={1} c={2} className="justify-center text-[12px]">
          <Spaced>數量</Spaced>
        </G>
        <G r={1} c={3} className="justify-center text-[12px]">
          <Spaced>單價</Spaced>
        </G>
        <G r={1} c={4} className="justify-between px-3 text-[12px]">
          <span>金</span>
          <span>額</span>
        </G>
        <G r={1} c={5} className="justify-between px-4 text-[12px]">
          <span>備</span>
          <span>註</span>
        </G>

        {/* 品項列 */}
        {Array.from({ length: R }, (_, i) => {
          const row = 2 + i;
          const it = data.items[i];
          return (
            <FragmentRow key={i} row={row} item={it} hl={hl} firstUnused={i === used} unused={unused} diagN={baseN.diag} />
          );
        })}

        {/* 備註（上半）、專用章標示、專用章框（延伸到表格底部） */}
        <G r="2 / span 2" c={5} className="justify-start" />
        <G r={4} c={5} className="justify-center px-1 text-[11px]">
          <span className="text-center leading-tight">營業人蓋用統一發票專用章</span>
        </G>
        <G r={`5 / ${lastRow + 1}`} c={5} k="stamp" hl={hl} className="items-start">
          <span className="mt-1">
            <Num n={baseN.stamp} />
          </span>
          <span className="absolute inset-0 grid place-items-center text-[11px] font-medium text-slate-400">請於此蓋發票章</span>
        </G>

        {triple ? (
          <>
            {/* 銷售額合計 */}
            <G r={R + 2} c="1 / span 3" className="justify-center text-[12.5px]">
              <Num n={baseN.sales!} />
              <Spaced wide>銷售額合計</Spaced>
            </G>
            <G r={R + 2} c={4} k="sales" hl={hl} className="justify-end px-2">
              <Hand className="text-[17px] tabular-nums">{formatNumber(data.totals.sales)}</Hand>
            </G>

            {/* 營業稅：應稅｜零稅率｜免稅 */}
            <G r={`${R + 3} / span 2`} c="1 / span 3" k="tax" hl={hl} className="!p-0">
              <div
                className="grid size-full gap-px bg-black"
                style={{ gridTemplateColumns: "176fr 76fr 76fr 75fr", gridTemplateRows: "20px 1fr" }}
              >
                <div className="row-span-2 flex items-center justify-center bg-white text-[12.5px]">
                  <Num n={baseN.tax} />
                  <Spaced wide>營業稅</Spaced>
                </div>
                {TAX_OPTIONS.map((o) => (
                  <div key={o.id} className="flex items-center justify-center bg-white text-[10.5px]">
                    {o.label}
                  </div>
                ))}
                {TAX_OPTIONS.map((o) => (
                  <div key={o.id} className="flex items-center justify-center bg-white">
                    <Check on={data.category === o.id} />
                  </div>
                ))}
              </div>
            </G>
            <G r={`${R + 3} / span 2`} c={4} k="tax" hl={hl} className="justify-end px-2">
              <Hand className="text-[17px] tabular-nums">{formatNumber(data.totals.tax)}</Hand>
            </G>

            {/* 總計 */}
            <G r={R + 5} c="1 / span 3" className="justify-between px-[15%] text-[12.5px]">
              <span>
                <Num n={baseN.total} />
                總
              </span>
              <span>計</span>
            </G>
            <G r={R + 5} c={4} k="total" hl={hl} className="justify-end px-2">
              <Hand className="text-[17px] tabular-nums">{formatNumber(data.totals.total)}</Hand>
            </G>

            {/* 大寫 9 格 */}
            <G r={R + 6} c="1 / span 4" k="capital" hl={hl} className="!p-0">
              <CapitalCellsView capital={data.capital} n={baseN.capital} />
            </G>
          </>
        ) : (
          <>
            {/* 總計（含稅） */}
            <G r={R + 2} c="1 / span 3" className="justify-between px-[8%] text-[12.5px]">
              <span>
                <Num n={baseN.total} />
                總
              </span>
              <span>計</span>
            </G>
            <G r={R + 2} c={4} k="total" hl={hl} className="justify-end px-2">
              <Hand className="text-[17px] tabular-nums">{formatNumber(data.totals.total)}</Hand>
            </G>

            {/* 大寫 9 格 */}
            <G r={R + 3} c="1 / span 4" k="capital" hl={hl} className="!p-0">
              <CapitalCellsView capital={data.capital} n={baseN.capital} />
            </G>

            {/* 課稅別：應稅｜零稅率｜免稅 */}
            <G r={R + 4} c="1 / span 4" k="tax" hl={hl} className="!p-0">
              <div
                className="grid size-full gap-px bg-black"
                style={{ gridTemplateColumns: "120fr 58fr 90fr 78fr 90fr 58fr 90fr" }}
              >
                <div className="flex items-center justify-center bg-white text-[12px]">
                  <Num n={baseN.tax} />
                  <Spaced wide>課稅別</Spaced>
                </div>
                {TAX_OPTIONS.flatMap((o) => [
                  <div key={`${o.id}-l`} className="flex items-center justify-center bg-white text-[12px]">
                    {o.label}
                  </div>,
                  <div key={`${o.id}-c`} className="flex items-center justify-center bg-white">
                    <Check on={data.category === o.id} />
                  </div>,
                ])}
              </div>
            </G>
          </>
        )}
      </div>

      {/* ---- 表格下方註記與「第　聯」 ---- */}
      <div className="mt-1 flex items-start justify-between gap-4 text-[10.5px] font-medium">
        <span>※應稅、零稅率、免稅之銷售額應分別開立統一發票，並應於各該欄打「✓」。</span>
        <span className="shrink-0 pr-6 font-bold tracking-[0.4em]">第　　聯</span>
      </div>
      <p className="mt-3 text-center text-[10px] font-normal text-black/50">手開發票填寫參考示意圖｜僅供對照填寫，非正式發票</p>
    </div>
  );
}

/** 單一品項列（品名、數量、單價、金額）；空白列在「金額」欄合併畫斜線。 */
function FragmentRow({
  row,
  item,
  hl,
  firstUnused,
  unused,
  diagN,
}: {
  row: number;
  item?: InvoiceItemView;
  hl: HL;
  firstUnused: boolean;
  unused: number;
  diagN: number;
}) {
  return (
    <>
      <G r={row} c={1} k="items" hl={hl} className="px-2">
        <Hand className="truncate text-[15px]">{item?.name}</Hand>
      </G>
      <G r={row} c={2} k="items" hl={hl} className="justify-center">
        <Hand className="text-[15px] tabular-nums">{item && item.quantity ? item.quantity : ""}</Hand>
      </G>
      <G r={row} c={3} k="items" hl={hl} className="justify-end px-2">
        <Hand className="text-[15px] tabular-nums">{item && item.unitPrice ? formatNumber(item.unitPrice) : ""}</Hand>
      </G>
      {item ? (
        <G r={row} c={4} k="items" hl={hl} className="justify-end px-2">
          <Hand className="text-[15px] tabular-nums">{item.amount ? formatNumber(item.amount) : ""}</Hand>
        </G>
      ) : firstUnused ? (
        <G r={`${row} / span ${unused}`} c={4} k="diag" hl={hl}>
          <Diagonal />
          <span className="absolute left-1 top-1 z-10">
            <Num n={diagN} />
          </span>
        </G>
      ) : null}
    </>
  );
}

"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Copy, Info, Plus, Printer, Trash2 } from "lucide-react";
import InvoicePaper, { type CellKey, type InvoicePaperData } from "./InvoicePaper";
import { GUIDE } from "./guide";
import ScaledPaper from "@/components/ScaledPaper";
import { Button, EASE, Field, IconButton } from "@/components/ui";
import { toChineseAmount } from "@/lib/chinese-amount";
import { formatNumber } from "@/lib/format";
import {
  calcInvoiceLines,
  calcInvoiceTotals,
  INVOICE_MAX_TOTAL,
  rocPeriod,
  sumItems,
  toInvoiceCapitalCells,
  toRocDate,
  type AmountBasis,
  type InvoiceKind,
  type LeadingFill,
  type TaxCategory,
} from "@/lib/invoice";
import { isValidTaxId } from "@/lib/tax-id";
import { toDateInput } from "@/lib/types";

type InputKey = "date" | "buyer" | "taxId" | "address" | "items" | "basis" | "category" | "leading";

/** 滑鼠移到（或聚焦）輸入欄位時，示意圖上要高亮的格子 */
const HIGHLIGHT: Record<InputKey, CellKey[]> = {
  date: ["period", "date"],
  buyer: ["buyer"],
  taxId: ["taxId"],
  address: ["address"],
  items: ["items", "diag", "sales", "tax", "total", "capital"],
  basis: ["items", "diag", "sales", "tax", "total", "capital"],
  category: ["tax", "sales", "total", "capital"],
  leading: ["capital"],
};

interface RowItem {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
}

let rowSeq = 0;
const newRow = (): RowItem => ({ id: `row-${++rowSeq}`, name: "", quantity: 1, unitPrice: 0 });
const num = (v: string) => (v === "" ? 0 : Math.max(0, Number(v) || 0));

function Segmented<T extends string>({
  value,
  options,
  onChange,
  name,
}: {
  value: T;
  options: { value: T; label: string; note?: string }[];
  onChange: (v: T) => void;
  name: string;
}) {
  return (
    <div role="radiogroup" aria-label={name} className="mt-1.5 grid auto-cols-fr grid-flow-col gap-2">
      {options.map((o) => {
        const active = value === o.value;
        return (
          <label
            key={o.value}
            className={`flex min-h-12 cursor-pointer flex-col items-center justify-center rounded-ui border px-2 py-1.5 text-center transition-colors focus-within:ring-4 focus-within:ring-brand-500/20 ${
              active ? "border-brand-700 bg-brand-50 text-brand-800" : "border-line bg-white hover:border-slate-300"
            }`}
          >
            <input type="radio" name={name} className="sr-only" checked={active} onChange={() => onChange(o.value)} />
            <span className="text-sm font-bold">{o.label}</span>
            {o.note && <span className="text-[11px] text-muted">{o.note}</span>}
          </label>
        );
      })}
    </div>
  );
}

export default function InvoiceTool() {
  const [date, setDate] = useState("");
  const [buyer, setBuyer] = useState("");
  const [taxId, setTaxId] = useState("");
  const [address, setAddress] = useState("");
  const [mode, setMode] = useState<"items" | "lump">("items");
  const [rows, setRows] = useState<RowItem[]>(() => [newRow()]);
  const [lumpName, setLumpName] = useState("");
  const [lumpAmount, setLumpAmount] = useState(0);
  const [basis, setBasis] = useState<AmountBasis>("exclusive");
  const [category, setCategory] = useState<TaxCategory>("taxable");
  const [kindOverride, setKindOverride] = useState<InvoiceKind | null>(null);
  const [leading, setLeading] = useState<LeadingFill>("zero");
  const [active, setActive] = useState<InputKey | null>(null);
  const [copied, setCopied] = useState(false);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 開立日期預設今天（掛載後才取得，避免 SSR 與用戶端不一致）
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- 掛載後才能取得今天的日期
    setDate(toDateInput(new Date()));
  }, []);

  const kind: InvoiceKind = kindOverride ?? (taxId.trim() ? "triple" : "duplicate");

  const view = useMemo(() => {
    const src =
      mode === "lump"
        ? [{ name: lumpName, quantity: 1, unitPrice: lumpAmount }]
        : rows.map((r) => ({ name: r.name, quantity: r.quantity, unitPrice: r.unitPrice }));
    const opts = { kind, basis, category };
    const totals = calcInvoiceTotals(sumItems(src), opts);
    const lines = calcInvoiceLines(src, opts);
    const capital = toInvoiceCapitalCells(totals.total, leading);
    const period = rocPeriod(date);
    // 只把已填寫的品項畫到發票上；未使用的列由示意圖畫斜線
    const items = src
      .map((s, i) => ({
        name: s.name,
        quantity: mode === "lump" ? 0 : s.quantity,
        unitPrice: mode === "lump" ? 0 : lines[i].unitPrice,
        amount: lines[i].amount,
      }))
      .filter((it) => it.name.trim() !== "" || it.amount > 0);
    const data: InvoicePaperData = {
      kind,
      serial: "AB",
      periodZh: period ? { yearZh: period.yearZh, monthsZh: period.monthsZh } : null,
      roc: toRocDate(date),
      buyer,
      taxId,
      address,
      items,
      totals,
      category,
      capital,
    };
    return { data, totals, capital };
  }, [mode, lumpName, lumpAmount, rows, kind, basis, category, leading, date, buyer, taxId, address]);

  const hl = useMemo<ReadonlySet<CellKey>>(() => new Set(active ? HIGHLIGHT[active] : []), [active]);
  const hover = (key: InputKey) => ({
    onMouseEnter: () => setActive(key),
    onMouseLeave: () => setActive(null),
    onFocusCapture: () => setActive(key),
    onBlurCapture: () => setActive(null),
  });

  const updateRow = (id: string, patch: Partial<RowItem>) =>
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, ...patch } : r)));

  const taxIdHint = !taxId
    ? kind === "triple"
      ? "三聯式需要買受人統一編號"
      : undefined
    : !/^\d{8}$/.test(taxId)
      ? "統一編號應為 8 碼數字"
      : !isValidTaxId(taxId)
        ? "統一編號檢查碼不符，請確認是否輸入正確"
        : undefined;

  const copyNumbers = async () => {
    const { totals } = view;
    const lines =
      kind === "triple"
        ? [`銷售額：${formatNumber(totals.sales)}`, `營業稅：${formatNumber(totals.tax)}`, `總計：${formatNumber(totals.total)}`]
        : [`總計（含稅）：${formatNumber(totals.total)}`];
    lines.push(`大寫：${toChineseAmount(totals.total)}`);
    const text = lines.join("\n");
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
      } catch {
        // 無法複製時不處理
      }
      ta.remove();
    }
    setCopied(true);
    if (copyTimer.current) clearTimeout(copyTimer.current);
    copyTimer.current = setTimeout(() => setCopied(false), 1600);
  };

  const guide = GUIDE[kind];

  return (
    <>
      <div className="no-print sticky top-14 z-30 border-b border-line bg-white/80 backdrop-blur-lg">
        <div className="container-x flex h-14 items-center justify-between gap-3">
          <h1 className="text-[15px] font-bold tracking-tight">發票助手</h1>
          <div className="flex items-center gap-2">
            <Button onClick={copyNumbers}>
              {copied ? <Check className="size-4 text-emerald-600" aria-hidden /> : <Copy className="size-4" aria-hidden />}
              <span className="hidden sm:inline">{copied ? "已複製" : "複製數字"}</span>
              <span className="sr-only sm:hidden">{copied ? "已複製" : "複製數字"}</span>
            </Button>
            <Button variant="primary" onClick={() => window.print()}>
              <Printer className="size-4" aria-hidden />
              <span className="hidden sm:inline">列印示意圖</span>
              <span className="sr-only sm:hidden">列印示意圖</span>
            </Button>
          </div>
        </div>
      </div>

      <main id="tool" className="container-x flex-1 pb-12 pt-6">
        <div className="no-print mb-4 flex gap-3 rounded-[1rem] border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          <Info className="mt-0.5 size-5 shrink-0" aria-hidden />
          <p>本工具僅協助計算與填寫參考，不會開立發票。實際開立請依財政部規定。</p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
          {/* ---- 輸入區 ---- */}
          <div className="no-print space-y-4">
            <section className="card space-y-4 p-4 sm:p-5">
              <h2 className="text-base font-bold">買受人與日期</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div {...hover("date")}>
                  <Field label="開立日期">
                    <input className="input" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                  </Field>
                </div>
                <div {...hover("buyer")}>
                  <Field label="買受人名稱">
                    <input className="input" placeholder="例：大安股份有限公司" value={buyer} onChange={(e) => setBuyer(e.target.value)} />
                  </Field>
                </div>
                <div {...hover("taxId")}>
                  <Field label={`統一編號（${kind === "triple" ? "三聯式必填" : "二聯式免填"}）`} hint={taxIdHint}>
                    <input
                      className="input tabular-nums"
                      inputMode="numeric"
                      maxLength={8}
                      placeholder="例：22099131"
                      value={taxId}
                      onChange={(e) => setTaxId(e.target.value.trim())}
                    />
                  </Field>
                </div>
                <div {...hover("address")}>
                  <Field label="地址（選填）">
                    <input className="input" placeholder="例：台北市大安區忠孝東路四段 1 號" value={address} onChange={(e) => setAddress(e.target.value)} />
                  </Field>
                </div>
              </div>
            </section>

            <section className="card space-y-4 p-4 sm:p-5" {...hover("items")}>
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-base font-bold">品項與金額</h2>
                <div role="radiogroup" aria-label="填寫方式" className="inline-flex rounded-ui bg-slate-100 p-1 text-sm">
                  {(
                    [
                      ["items", "逐項填寫"],
                      ["lump", "只填總額"],
                    ] as const
                  ).map(([v, label]) => (
                    <button
                      key={v}
                      type="button"
                      role="radio"
                      aria-checked={mode === v}
                      onClick={() => setMode(v)}
                      className={`min-h-9 rounded-[0.5rem] px-3 font-medium transition-colors ${
                        mode === v ? "bg-white text-ink shadow-sm" : "text-muted"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {mode === "items" ? (
                <div className="space-y-3">
                  <AnimatePresence initial={false}>
                    {rows.map((r, i) => (
                      <motion.div
                        key={r.id}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.22, ease: EASE }}
                        style={{ overflow: "hidden" }}
                      >
                        <div className="rounded-ui border border-line bg-slate-50/60 p-3">
                          <div className="mb-2 flex items-center justify-between">
                            <span className="text-xs font-bold text-brand-600">品項 {i + 1}</span>
                            <IconButton label="刪除品項" disabled={rows.length === 1} onClick={() => setRows((rs) => rs.filter((x) => x.id !== r.id))}>
                              <Trash2 className="size-4" />
                            </IconButton>
                          </div>
                          <div className="grid grid-cols-3 gap-2">
                            <label className="label col-span-3">
                              品名
                              <input className="input mt-1" placeholder="例：網站設計" value={r.name} onChange={(e) => updateRow(r.id, { name: e.target.value })} />
                            </label>
                            <label className="label">
                              數量
                              <input className="input mt-1 tabular-nums" type="number" inputMode="decimal" min={0} value={r.quantity} onChange={(e) => updateRow(r.id, { quantity: num(e.target.value) })} />
                            </label>
                            <label className="label col-span-2">
                              單價
                              <input className="input mt-1 tabular-nums" type="number" inputMode="decimal" min={0} value={r.unitPrice} onChange={(e) => updateRow(r.id, { unitPrice: num(e.target.value) })} />
                            </label>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  <Button onClick={() => setRows((rs) => [...rs, newRow()])}>
                    <Plus className="size-4" aria-hidden />
                    新增品項
                  </Button>
                </div>
              ) : (
                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="label">
                    品名（選填）
                    <input className="input mt-1" placeholder="例：設計費" value={lumpName} onChange={(e) => setLumpName(e.target.value)} />
                  </label>
                  <label className="label">
                    總額
                    <input className="input mt-1 tabular-nums" type="number" inputMode="decimal" min={0} value={lumpAmount} onChange={(e) => setLumpAmount(num(e.target.value))} />
                  </label>
                </div>
              )}
            </section>

            <section className="card space-y-4 p-4 sm:p-5">
              <h2 className="text-base font-bold">稅別</h2>
              <div {...hover("basis")}>
                <div className="label">輸入的金額是</div>
                <Segmented
                  name="amountBasis"
                  value={basis}
                  onChange={setBasis}
                  options={[
                    { value: "exclusive", label: "未稅", note: "另加 5%" },
                    { value: "inclusive", label: "含稅", note: "已含 5%" },
                  ]}
                />
                {category !== "taxable" && <p className="mt-1.5 text-xs text-muted">零稅率與免稅不計營業稅，含稅或未稅結果相同。</p>}
              </div>
              <div {...hover("category")}>
                <div className="label">課稅別</div>
                <Segmented
                  name="taxCategory"
                  value={category}
                  onChange={setCategory}
                  options={[
                    { value: "taxable", label: "應稅" },
                    { value: "zero", label: "零稅率" },
                    { value: "exempt", label: "免稅" },
                  ]}
                />
              </div>
            </section>
          </div>

          {/* ---- 示意圖 ---- */}
          <div className="print-area lg:sticky lg:top-[7.5rem] lg:self-start">
            <div className="no-print mb-3 flex flex-wrap items-center justify-between gap-3">
              <div role="tablist" aria-label="發票種類" className="relative inline-flex rounded-ui bg-slate-100 p-1">
                {(
                  [
                    ["triple", "三聯式"],
                    ["duplicate", "二聯式"],
                  ] as const
                ).map(([v, label]) => (
                  <button
                    key={v}
                    type="button"
                    role="tab"
                    aria-selected={kind === v}
                    onClick={() => setKindOverride(v)}
                    className={`relative min-h-10 rounded-[0.5rem] px-4 text-sm font-medium transition-colors ${kind === v ? "text-ink" : "text-muted"}`}
                  >
                    {kind === v && (
                      <motion.span
                        layoutId="invoice-kind"
                        className="absolute inset-0 rounded-[0.5rem] bg-white shadow-sm"
                        transition={{ duration: 0.22, ease: EASE }}
                      />
                    )}
                    <span className="relative">{label}</span>
                  </button>
                ))}
              </div>
              <div {...hover("leading")} className="flex items-center gap-2 text-xs text-muted">
                <span>大寫最高位前的空格</span>
                <div role="radiogroup" aria-label="大寫空格填法" className="inline-flex rounded-ui bg-slate-100 p-1">
                  {(
                    [
                      ["zero", "填「零」"],
                      ["cross", "畫「╳」"],
                    ] as const
                  ).map(([v, label]) => (
                    <button
                      key={v}
                      type="button"
                      role="radio"
                      aria-checked={leading === v}
                      onClick={() => setLeading(v)}
                      className={`min-h-9 rounded-[0.5rem] px-2.5 font-medium transition-colors ${leading === v ? "bg-white text-ink shadow-sm" : ""}`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <p className="no-print mb-3 text-xs text-muted">
              {kindOverride === null
                ? `已依${taxId.trim() ? "有" : "沒有"}統編自動選擇${kind === "triple" ? "三聯式" : "二聯式"}，也可以手動切換。`
                : "已手動選擇發票種類。"}
              大寫空格的實務作法依各地國稅局或會計師建議。
            </p>

            <ScaledPaper>
              {/* 切換三聯式／二聯式時淡入 */}
              <motion.div
                key={kind}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.25, ease: EASE }}
              >
                <InvoicePaper data={view.data} hl={hl} />
              </motion.div>
            </ScaledPaper>

            {view.capital.overflow && (
              <p className="no-print mt-3 rounded-ui border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                金額超過手開發票格數（最多 {formatNumber(INVOICE_MAX_TOTAL)} 元），大寫欄位無法填寫。
              </p>
            )}
          </div>
        </div>

        {/* ---- 逐格說明（列印時一併輸出，方便對照手寫）---- */}
        <section className="print-guide mt-8 max-w-4xl">
          <h2 className="text-lg font-bold">每一格怎麼填（{kind === "triple" ? "三聯式" : "二聯式"}）</h2>
          <ol className="mt-3 grid gap-2 sm:grid-cols-2">
            {guide.map((g) => (
              <li
                key={g.n}
                onMouseEnter={() => setActive(null)}
                className="avoid-break flex gap-3 rounded-ui border border-line bg-white p-3 text-sm"
              >
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-brand-700 text-xs font-bold text-white">{g.n}</span>
                <span>
                  <span className="block font-bold">{g.title}</span>
                  <span className="mt-0.5 block leading-relaxed text-slate-600">{g.text}</span>
                </span>
              </li>
            ))}
          </ol>
          <p className="mt-4 text-xs text-muted">本工具僅協助計算與填寫參考，不會開立發票。實際開立請依財政部規定。</p>
        </section>
      </main>
    </>
  );
}

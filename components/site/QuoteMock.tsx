"use client";

import { motion } from "motion/react";
import { EASE } from "@/components/ui";
import { toChineseAmount } from "@/lib/chinese-amount";
import { formatNTD, formatNumber } from "@/lib/format";
import { calcTotals } from "@/lib/tax";

const ROWS = [
  { name: "品牌網站設計", quantity: 1, unitPrice: 18000 },
  { name: "RWD 切版（5 頁）", quantity: 1, unitPrice: 10000 },
  { name: "網域與主機（1 年）", quantity: 1, unitPrice: 3000 },
];

/** 首頁用的報價單示意圖（範例資料，非真實客戶）。 */
export default function QuoteMock() {
  const totals = calcTotals(ROWS, "exclusive");
  return (
    <div className="relative mx-auto w-full max-w-md">
      <motion.div
        aria-hidden
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
      >
        <div className="overflow-hidden rounded-md bg-white shadow-[var(--shadow-paper)]">
          <div className="h-2 bg-brand-700" />
          <div className="p-5 text-[11px] text-slate-700">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-sm font-bold text-ink">範例工作室</div>
                <div className="text-slate-400">統編 04595257</div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold tracking-[0.25em] text-brand-700">報價單</div>
                <div className="text-[9px] tracking-[0.35em] text-slate-400">QUOTATION</div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-[1.3fr_1fr] gap-2">
              <div className="rounded border border-line p-2">
                <div className="text-[9px] font-bold tracking-widest text-brand-700">客戶 BILL TO</div>
                <div className="font-bold text-ink">範例股份有限公司</div>
              </div>
              <div className="rounded bg-brand-50 p-2">
                <div className="text-[9px] font-bold tracking-widest text-brand-700">單據</div>
                <div className="tabular-nums">Q-20260101-001</div>
              </div>
            </div>

            <div className="mt-4 flex justify-between rounded-t bg-brand-100 px-2 py-1.5 font-bold text-brand-900">
              <span>品名</span>
              <span>小計</span>
            </div>
            {ROWS.map((r, i) => (
              <motion.div
                key={r.name}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, ease: EASE, delay: 0.5 + i * 0.12 }}
                className={`flex justify-between px-2 py-1.5 ${i % 2 === 1 ? "bg-slate-50" : ""}`}
              >
                <span>{r.name}</span>
                <span className="tabular-nums">{formatNumber(r.quantity * r.unitPrice)}</span>
              </motion.div>
            ))}

            <div className="ml-auto mt-3 w-44 overflow-hidden rounded border border-line">
              <div className="space-y-1 px-2.5 py-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">未稅金額</span>
                  <span className="tabular-nums">{formatNTD(totals.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">營業稅 5%</span>
                  <span className="tabular-nums">{formatNTD(totals.tax)}</span>
                </div>
              </div>
              <div className="flex justify-between bg-brand-700 px-2.5 py-2 font-bold text-white">
                <span>總計</span>
                <span className="tabular-nums">{formatNTD(totals.total)}</span>
              </div>
            </div>

            <div className="mt-2 rounded bg-brand-50 px-2.5 py-2">
              <span className="text-[9px] font-bold tracking-widest text-brand-700">大寫金額　</span>
              <span className="font-bold text-brand-900">{toChineseAmount(totals.total)}</span>
            </div>
          </div>
        </div>
      </motion.div>
      <p className="mt-3 text-center text-xs text-muted">示意畫面，內容為範例資料</p>
    </div>
  );
}

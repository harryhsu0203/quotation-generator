"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";
import { Button, EASE, IconButton } from "./ui";
import { formatNumber } from "@/lib/format";
import { itemAmount } from "@/lib/tax";
import { newItem, type Item } from "@/lib/types";

interface Props {
  items: Item[];
  onChange: (items: Item[]) => void;
}

/** 手機：6 欄卡片；桌機：單列 12 欄 */
const GRID = "grid grid-cols-6 gap-x-2 gap-y-2 md:grid-cols-[minmax(0,3fr)_minmax(0,2.5fr)_4.5rem_4rem_6rem_5.5rem_auto] md:items-center";
const HEAD = "text-xs font-medium text-muted";

export default function ItemsTable({ items, onChange }: Props) {
  const update = (id: string, patch: Partial<Item>) =>
    onChange(items.map((it) => (it.id === id ? { ...it, ...patch } : it)));
  const remove = (id: string) => onChange(items.filter((it) => it.id !== id));
  const move = (index: number, dir: -1 | 1) => {
    const target = index + dir;
    if (target < 0 || target >= items.length) return;
    const next = [...items];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  };
  const num = (v: string) => (v === "" ? 0 : Math.max(0, Number(v) || 0));

  return (
    <div>
      <div className={`${GRID} mb-2 hidden px-1 md:grid`}>
        <span className={HEAD}>品名</span>
        <span className={HEAD}>規格</span>
        <span className={HEAD}>數量</span>
        <span className={HEAD}>單位</span>
        <span className={HEAD}>單價</span>
        <span className={`${HEAD} text-right`}>小計</span>
        <span className="w-[7.5rem]" />
      </div>

      <div>
        <AnimatePresence initial={false}>
          {items.map((it, i) => (
            <motion.div
              key={it.id}
              layout="position"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: EASE }}
              style={{ overflow: "hidden" }}
            >
              <div className="p-1 pb-3">
                <div className="rounded-ui border border-line bg-slate-50/60 p-3 md:border-0 md:bg-transparent md:p-0">
                  <div className={GRID}>
                    <div className="col-span-6 flex items-center justify-between md:hidden">
                      <span className="text-xs font-bold text-brand-700">品項 {i + 1}</span>
                    </div>
                    <label className="col-span-6 md:col-span-1">
                      <span className={`${HEAD} md:sr-only`}>品名</span>
                      <input className="input" placeholder="例：網站設計" value={it.name} onChange={(e) => update(it.id, { name: e.target.value })} />
                    </label>
                    <label className="col-span-6 md:col-span-1">
                      <span className={`${HEAD} md:sr-only`}>規格</span>
                      <input className="input" placeholder="例：RWD 五頁式" value={it.spec} onChange={(e) => update(it.id, { spec: e.target.value })} />
                    </label>
                    <label className="col-span-2 md:col-span-1">
                      <span className={`${HEAD} md:sr-only`}>數量</span>
                      <input className="input tabular-nums" type="number" inputMode="decimal" min={0} value={it.quantity} onChange={(e) => update(it.id, { quantity: num(e.target.value) })} />
                    </label>
                    <label className="col-span-2 md:col-span-1">
                      <span className={`${HEAD} md:sr-only`}>單位</span>
                      <input className="input" placeholder="式" value={it.unit} onChange={(e) => update(it.id, { unit: e.target.value })} />
                    </label>
                    <label className="col-span-2 md:col-span-1">
                      <span className={`${HEAD} md:sr-only`}>單價</span>
                      <input className="input tabular-nums" type="number" inputMode="decimal" min={0} value={it.unitPrice} onChange={(e) => update(it.id, { unitPrice: num(e.target.value) })} />
                    </label>
                    <div className="col-span-3 text-sm md:col-span-1 md:text-right">
                      <span className="text-muted md:hidden">小計 </span>
                      <span className="font-bold tabular-nums">{formatNumber(itemAmount(it))}</span>
                    </div>
                    <div className="col-span-3 flex justify-end gap-1.5 md:col-span-1">
                      <IconButton label="上移" disabled={i === 0} onClick={() => move(i, -1)}>
                        <ArrowUp className="size-4" />
                      </IconButton>
                      <IconButton label="下移" disabled={i === items.length - 1} onClick={() => move(i, 1)}>
                        <ArrowDown className="size-4" />
                      </IconButton>
                      <IconButton label="刪除" className="text-red-500 hover:bg-red-50 hover:text-red-600" onClick={() => remove(it.id)}>
                        <Trash2 className="size-4" />
                      </IconButton>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {items.length === 0 && (
        <p className="py-6 text-center text-sm text-muted">還沒有品項，點下方按鈕新增第一筆。</p>
      )}

      <Button variant="primary" className="mt-1 w-full sm:w-auto" onClick={() => onChange([...items, newItem()])}>
        <Plus className="size-4" aria-hidden />
        新增品項
      </Button>
    </div>
  );
}

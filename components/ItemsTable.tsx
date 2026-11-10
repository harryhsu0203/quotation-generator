"use client";

import { useLayoutEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";
import { Button, EASE, IconButton } from "./ui";
import { formatNumber } from "@/lib/format";
import { itemAmount } from "@/lib/tax";
import { newItem, type Item } from "@/lib/types";

interface Props {
  items: Item[];
  onChange: (items: Item[]) => void;
  /** 正在編輯的品項 id；離開時為 null */
  onActiveChange?: (id: string | null) => void;
}

/** 多行輸入框：1 行起，依內容自動長高 */
function AutoTextarea({ value, ...rest }: Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "value"> & { value: string }) {
  const ref = useRef<HTMLTextAreaElement>(null);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight + 2}px`;
  }, [value]);
  return <textarea ref={ref} rows={1} value={value} className="input block w-full min-w-0 resize-none overflow-hidden leading-snug" {...rest} />;
}

/** 欄位排版見 globals.css 的 .item-grid：編輯區夠寬為單列，否則為卡片 */
const HEAD = "text-xs font-medium text-muted";

export default function ItemsTable({ items, onChange, onActiveChange }: Props) {
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
    <div className="items-wrap">
      <div className="item-grid item-head mb-2 px-1">
        <span className={HEAD}>品名</span>
        <span className={HEAD}>規格</span>
        <span className={HEAD}>數量</span>
        <span className={HEAD}>單位</span>
        <span className={HEAD}>單價</span>
        <span className={`${HEAD} text-right`}>小計</span>
        <span className="item-actions-head" />
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
                <div
                  className="item-row rounded-ui border border-line bg-slate-50/60 p-3"
                  onFocus={() => onActiveChange?.(it.id)}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) onActiveChange?.(null);
                  }}
                >
                  <div className="item-grid">
                    <div className="item-title flex items-center justify-between">
                      <span className="text-xs font-bold text-brand-700">品項 {i + 1}</span>
                    </div>
                    <label className="cell-name">
                      <span className={`${HEAD} item-label`}>品名</span>
                      <AutoTextarea placeholder="例：AI 主機建置" value={it.name} onChange={(e) => update(it.id, { name: e.target.value })} />
                    </label>
                    <label className="cell-spec">
                      <span className={`${HEAD} item-label`}>規格</span>
                      <AutoTextarea placeholder="例：RTX 顯卡、64GB 記憶體" value={it.spec} onChange={(e) => update(it.id, { spec: e.target.value })} />
                    </label>
                    <label className="cell-qty">
                      <span className={`${HEAD} item-label`}>數量</span>
                      <input className="input w-full min-w-0 tabular-nums" type="number" inputMode="decimal" min={0} value={it.quantity} onChange={(e) => update(it.id, { quantity: num(e.target.value) })} />
                    </label>
                    <label className="cell-unit">
                      <span className={`${HEAD} item-label`}>單位</span>
                      <input className="input w-full min-w-0" placeholder="式" value={it.unit} onChange={(e) => update(it.id, { unit: e.target.value })} />
                    </label>
                    <label className="cell-price">
                      <span className={`${HEAD} item-label`}>單價</span>
                      <input className="input w-full min-w-0 tabular-nums" type="number" inputMode="decimal" min={0} value={it.unitPrice} onChange={(e) => update(it.id, { unitPrice: num(e.target.value) })} />
                    </label>
                    <div className="cell-total text-right text-sm">
                      <span className={`${HEAD} item-label`}>小計</span>
                      <span className="block break-all font-bold tabular-nums">{formatNumber(itemAmount(it))}</span>
                    </div>
                    <div className="cell-actions flex justify-end gap-1.5">
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

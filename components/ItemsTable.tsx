"use client";

import { formatNumber } from "@/lib/format";
import { itemAmount } from "@/lib/tax";
import { newItem, type Item } from "@/lib/types";

interface Props {
  items: Item[];
  onChange: (items: Item[]) => void;
}

const input =
  "w-full rounded border border-gray-300 bg-white px-2 py-1.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500";

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

  const actions = (it: Item, i: number) => (
    <div className="flex gap-1">
      <button type="button" aria-label="上移" disabled={i === 0} onClick={() => move(i, -1)} className="btn-icon">
        ↑
      </button>
      <button type="button" aria-label="下移" disabled={i === items.length - 1} onClick={() => move(i, 1)} className="btn-icon">
        ↓
      </button>
      <button type="button" aria-label="刪除" onClick={() => remove(it.id)} className="btn-icon text-red-600">
        ✕
      </button>
    </div>
  );

  return (
    <div>
      {/* 桌機：表格 */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-600">
              <th className="p-1 font-medium">品名</th>
              <th className="p-1 font-medium">規格</th>
              <th className="p-1 w-20 font-medium">數量</th>
              <th className="p-1 w-16 font-medium">單位</th>
              <th className="p-1 w-28 font-medium">單價</th>
              <th className="p-1 w-24 text-right font-medium">小計</th>
              <th className="p-1 w-28" />
            </tr>
          </thead>
          <tbody>
            {items.map((it, i) => (
              <tr key={it.id}>
                <td className="p-1"><input className={input} value={it.name} onChange={(e) => update(it.id, { name: e.target.value })} /></td>
                <td className="p-1"><input className={input} value={it.spec} onChange={(e) => update(it.id, { spec: e.target.value })} /></td>
                <td className="p-1"><input className={input} type="number" inputMode="decimal" min={0} value={it.quantity} onChange={(e) => update(it.id, { quantity: num(e.target.value) })} /></td>
                <td className="p-1"><input className={input} value={it.unit} onChange={(e) => update(it.id, { unit: e.target.value })} /></td>
                <td className="p-1"><input className={input} type="number" inputMode="decimal" min={0} value={it.unitPrice} onChange={(e) => update(it.id, { unitPrice: num(e.target.value) })} /></td>
                <td className="p-1 text-right tabular-nums">{formatNumber(itemAmount(it))}</td>
                <td className="p-1">{actions(it, i)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 手機：卡片 */}
      <div className="md:hidden space-y-3">
        {items.map((it, i) => (
          <div key={it.id} className="rounded-lg border border-gray-200 bg-gray-50 p-3 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">品項 {i + 1}</span>
              {actions(it, i)}
            </div>
            <label className="block text-xs text-gray-600">品名
              <input className={input} value={it.name} onChange={(e) => update(it.id, { name: e.target.value })} />
            </label>
            <label className="block text-xs text-gray-600">規格
              <input className={input} value={it.spec} onChange={(e) => update(it.id, { spec: e.target.value })} />
            </label>
            <div className="grid grid-cols-3 gap-2">
              <label className="block text-xs text-gray-600">數量
                <input className={input} type="number" inputMode="decimal" min={0} value={it.quantity} onChange={(e) => update(it.id, { quantity: num(e.target.value) })} />
              </label>
              <label className="block text-xs text-gray-600">單位
                <input className={input} value={it.unit} onChange={(e) => update(it.id, { unit: e.target.value })} />
              </label>
              <label className="block text-xs text-gray-600">單價
                <input className={input} type="number" inputMode="decimal" min={0} value={it.unitPrice} onChange={(e) => update(it.id, { unitPrice: num(e.target.value) })} />
              </label>
            </div>
            <div className="text-right text-sm">小計：<span className="font-medium tabular-nums">NT$ {formatNumber(itemAmount(it))}</span></div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => onChange([...items, newItem()])}
        className="mt-3 rounded border border-dashed border-gray-400 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        ＋ 新增品項
      </button>
    </div>
  );
}

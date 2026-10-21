export const SEQ_KEY = "quote:seq";

type KV = Pick<Storage, "getItem" | "setItem">;

function ymd(d: Date): string {
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}`;
}

export function formatQuoteNumber(date: string, seq: number): string {
  return `Q-${date}-${String(seq).padStart(3, "0")}`;
}

function readSeq(store: KV, date: string): number {
  try {
    const raw = store.getItem(SEQ_KEY);
    if (!raw) return 0;
    const parsed = JSON.parse(raw) as { date?: string; seq?: number };
    return parsed.date === date && typeof parsed.seq === "number" ? parsed.seq : 0;
  } catch {
    return 0;
  }
}

/** 預覽下一個單號（不遞增）。 */
export function peekQuoteNumber(store: KV | null, now = new Date()): string {
  const date = ymd(now);
  return formatQuoteNumber(date, (store ? readSeq(store, date) : 0) + 1);
}

/** 取用下一個單號並寫回當日流水號。 */
export function nextQuoteNumber(store: KV | null, now = new Date()): string {
  const date = ymd(now);
  const seq = (store ? readSeq(store, date) : 0) + 1;
  try {
    store?.setItem(SEQ_KEY, JSON.stringify({ date, seq }));
  } catch {
    // localStorage 無法寫入時仍回傳單號
  }
  return formatQuoteNumber(date, seq);
}

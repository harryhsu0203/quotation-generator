export const SELLER_KEY = "quote:seller";
export const DRAFT_KEY = "quote:draft";

export function readJSON<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    return raw === null ? fallback : (JSON.parse(raw) as T);
  } catch {
    return fallback;
  }
}

/** 寫入失敗（容量不足、隱私模式）時回傳 false。 */
export function writeJSON(key: string, value: unknown): boolean {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export function removeKey(key: string): void {
  try {
    window.localStorage.removeItem(key);
  } catch {
    // ignore
  }
}

/** 取得可用的 localStorage，不可用時回傳 null。 */
export function getStore(): Storage | null {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

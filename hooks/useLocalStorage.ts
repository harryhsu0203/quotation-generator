"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { readJSON, writeJSON } from "@/lib/storage";

/**
 * 掛載後才讀取 localStorage（避免 SSR hydration 不一致），
 * 之後的變更以 debounce 方式自動寫回。
 * `ready` 為 false 時表示尚未載入，此時不會寫入。
 */
export function useLocalStorage<T>(key: string, initial: T, debounceMs = 400) {
  const [value, setValue] = useState<T>(initial);
  const [ready, setReady] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- 掛載後才能讀取 localStorage
    setValue(readJSON<T>(key, initial));
    setReady(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  useEffect(() => {
    if (!ready) return;
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => writeJSON(key, value), debounceMs);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [key, value, ready, debounceMs]);

  const reset = useCallback((next: T) => setValue(next), []);

  return [value, setValue, { ready, reset }] as const;
}

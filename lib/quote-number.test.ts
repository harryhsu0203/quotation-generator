import { describe, expect, it } from "vitest";
import { nextQuoteNumber, peekQuoteNumber } from "./quote-number";

function memoryStore() {
  const m = new Map<string, string>();
  return {
    getItem: (k: string) => m.get(k) ?? null,
    setItem: (k: string, v: string) => void m.set(k, v),
  };
}

describe("quote number", () => {
  const day1 = new Date(2026, 0, 5);
  const day2 = new Date(2026, 0, 6);

  it("當日流水號遞增", () => {
    const s = memoryStore();
    expect(nextQuoteNumber(s, day1)).toBe("Q-20260105-001");
    expect(nextQuoteNumber(s, day1)).toBe("Q-20260105-002");
    expect(nextQuoteNumber(s, day1)).toBe("Q-20260105-003");
  });
  it("隔天重新從 001 開始", () => {
    const s = memoryStore();
    nextQuoteNumber(s, day1);
    expect(nextQuoteNumber(s, day2)).toBe("Q-20260106-001");
  });
  it("peek 不遞增", () => {
    const s = memoryStore();
    expect(peekQuoteNumber(s, day1)).toBe("Q-20260105-001");
    expect(peekQuoteNumber(s, day1)).toBe("Q-20260105-001");
  });
  it("無 storage 或資料損毀仍可用", () => {
    expect(nextQuoteNumber(null, day1)).toBe("Q-20260105-001");
    const s = memoryStore();
    s.setItem("quote:seq", "{bad");
    expect(nextQuoteNumber(s, day1)).toBe("Q-20260105-001");
  });
});

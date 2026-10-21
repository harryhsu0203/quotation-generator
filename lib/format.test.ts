import { describe, expect, it } from "vitest";
import { formatNTD, formatNumber } from "./format";

describe("format", () => {
  it("千分位", () => {
    expect(formatNumber(1234567)).toBe("1,234,567");
    expect(formatNumber(0)).toBe("0");
  });
  it("NT$", () => {
    expect(formatNTD(12300)).toBe("NT$ 12,300");
  });
});

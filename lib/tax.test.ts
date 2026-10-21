import { describe, expect, it } from "vitest";
import { calcTotals } from "./tax";

const items = [
  { quantity: 2, unitPrice: 500 },
  { quantity: 1, unitPrice: 1000 },
];

describe("calcTotals", () => {
  it("exclusive：外加 5%", () => {
    expect(calcTotals(items, "exclusive")).toEqual({ subtotal: 2000, tax: 100, total: 2100 });
  });
  it("exclusive：稅額 .5 四捨五入", () => {
    // 10 * 5% = 0.5 → 1
    expect(calcTotals([{ quantity: 1, unitPrice: 10 }], "exclusive")).toEqual({
      subtotal: 10,
      tax: 1,
      total: 11,
    });
  });
  it("inclusive：內含 5%", () => {
    expect(calcTotals([{ quantity: 1, unitPrice: 2100 }], "inclusive")).toEqual({
      subtotal: 2000,
      tax: 100,
      total: 2100,
    });
  });
  it("inclusive：未稅四捨五入，稅額＝總計−未稅", () => {
    // 100 / 1.05 = 95.238 → 95
    expect(calcTotals([{ quantity: 1, unitPrice: 100 }], "inclusive")).toEqual({
      subtotal: 95,
      tax: 5,
      total: 100,
    });
    // 11 / 1.05 = 10.476 → 10
    expect(calcTotals([{ quantity: 1, unitPrice: 11 }], "inclusive")).toEqual({
      subtotal: 10,
      tax: 1,
      total: 11,
    });
  });
  it("none：免稅", () => {
    expect(calcTotals(items, "none")).toEqual({ subtotal: 2000, tax: 0, total: 2000 });
  });
  it("空品項", () => {
    expect(calcTotals([], "exclusive")).toEqual({ subtotal: 0, tax: 0, total: 0 });
  });
});

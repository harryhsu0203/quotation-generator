import { describe, expect, it } from "vitest";
import {
  calcInvoiceLines,
  calcInvoiceTotals,
  rocPeriod,
  sumItems,
  toInvoiceCapitalCells,
  toRocDate,
} from "./invoice";

const triple = { kind: "triple", basis: "exclusive", category: "taxable" } as const;

describe("calcInvoiceTotals", () => {
  it("三聯式未稅：稅額 5%，總計 = 銷售額 + 稅額", () => {
    expect(calcInvoiceTotals(1000, triple)).toEqual({ sales: 1000, tax: 50, total: 1050 });
  });
  it("三聯式未稅：稅額 .5 四捨五入", () => {
    expect(calcInvoiceTotals(10, triple)).toEqual({ sales: 10, tax: 1, total: 11 });
    expect(calcInvoiceTotals(30, triple)).toEqual({ sales: 30, tax: 2, total: 32 });
  });
  it("三聯式含稅：銷售額 = round(總計 ÷ 1.05)，稅額 = 總計 − 銷售額", () => {
    expect(calcInvoiceTotals(1050, { ...triple, basis: "inclusive" })).toEqual({ sales: 1000, tax: 50, total: 1050 });
    // 100 / 1.05 = 95.238 → 95
    expect(calcInvoiceTotals(100, { ...triple, basis: "inclusive" })).toEqual({ sales: 95, tax: 5, total: 100 });
    // 11 / 1.05 = 10.476 → 10
    expect(calcInvoiceTotals(11, { ...triple, basis: "inclusive" })).toEqual({ sales: 10, tax: 1, total: 11 });
  });
  it("零稅率、免稅：稅額為 0", () => {
    for (const category of ["zero", "exempt"] as const) {
      for (const basis of ["inclusive", "exclusive"] as const) {
        expect(calcInvoiceTotals(1234, { kind: "triple", basis, category })).toEqual({
          sales: 1234,
          tax: 0,
          total: 1234,
        });
      }
    }
  });
  it("二聯式：含稅輸入總計不變；未稅輸入總計加 5%", () => {
    const dup = { kind: "duplicate", category: "taxable" } as const;
    expect(calcInvoiceTotals(1050, { ...dup, basis: "inclusive" }).total).toBe(1050);
    expect(calcInvoiceTotals(1000, { ...dup, basis: "exclusive" }).total).toBe(1050);
  });
  it("二聯式免稅：總計為輸入金額", () => {
    expect(calcInvoiceTotals(500, { kind: "duplicate", basis: "inclusive", category: "exempt" }).total).toBe(500);
  });
});

describe("calcInvoiceLines", () => {
  it("三聯式含稅輸入：各列換成未稅，加總等於銷售額", () => {
    const items = [
      { quantity: 1, unitPrice: 100 },
      { quantity: 1, unitPrice: 100 },
      { quantity: 1, unitPrice: 100 },
    ];
    const opts = { kind: "triple", basis: "inclusive", category: "taxable" } as const;
    const lines = calcInvoiceLines(items, opts);
    const { sales } = calcInvoiceTotals(sumItems(items), opts);
    expect(lines.reduce((a, l) => a + l.amount, 0)).toBe(sales);
  });
  it("二聯式未稅輸入：各列換成含稅，加總等於總計", () => {
    const items = [
      { quantity: 3, unitPrice: 33 },
      { quantity: 1, unitPrice: 17 },
    ];
    const opts = { kind: "duplicate", basis: "exclusive", category: "taxable" } as const;
    const lines = calcInvoiceLines(items, opts);
    const { total } = calcInvoiceTotals(sumItems(items), opts);
    expect(lines.reduce((a, l) => a + l.amount, 0)).toBe(total);
  });
  it("無品項回傳空陣列", () => {
    expect(calcInvoiceLines([], triple)).toEqual([]);
  });
});

describe("期別與民國日期", () => {
  it("1 月、2 月屬於 1-2 月份", () => {
    expect(rocPeriod("2026-01-15")?.months).toBe("1-2");
    expect(rocPeriod("2026-02-28")?.months).toBe("1-2");
  });
  it("12 月屬於 11-12 月份", () => {
    expect(rocPeriod("2026-12-31")?.label).toBe("中華民國 115 年 11-12 月份");
  });
  it("9 月屬於 9-10 月份", () => {
    expect(rocPeriod("2026-09-10")?.label).toBe("中華民國 115 年 9-10 月份");
    expect(rocPeriod("2026-10-01")?.months).toBe("9-10");
  });
  it("無效日期回傳 null", () => {
    expect(rocPeriod("")).toBeNull();
    expect(rocPeriod("2026-13-01")).toBeNull();
  });
  it("民國日期換算", () => {
    expect(toRocDate("2026-03-05")).toEqual({ year: 115, month: 3, day: 5 });
  });
});

describe("toInvoiceCapitalCells", () => {
  it("12,345 → 零 零 零 壹 貳 參 肆 伍", () => {
    expect(toInvoiceCapitalCells(12345)).toEqual({
      cells: ["零", "零", "零", "壹", "貳", "參", "肆", "伍"],
      overflow: false,
    });
  });
  it("最高位前改畫 ╳", () => {
    expect(toInvoiceCapitalCells(12345, "cross").cells).toEqual(["╳", "╳", "╳", "壹", "貳", "參", "肆", "伍"]);
  });
  it("數字之間的零仍填「零」", () => {
    expect(toInvoiceCapitalCells(10001, "cross").cells).toEqual(["╳", "╳", "╳", "壹", "零", "零", "零", "壹"]);
    expect(toInvoiceCapitalCells(10000).cells).toEqual(["零", "零", "零", "壹", "零", "零", "零", "零"]);
  });
  it("8 位數與 0", () => {
    expect(toInvoiceCapitalCells(99999999).cells).toEqual(Array(8).fill("玖"));
    expect(toInvoiceCapitalCells(0, "cross").cells).toEqual(["╳", "╳", "╳", "╳", "╳", "╳", "╳", "零"]);
  });
  it("超過 8 位數時標示 overflow", () => {
    expect(toInvoiceCapitalCells(100000000)).toEqual({ cells: Array(8).fill(""), overflow: true });
  });
});

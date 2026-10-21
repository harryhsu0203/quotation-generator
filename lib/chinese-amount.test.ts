import { describe, expect, it } from "vitest";
import { toChineseAmount } from "./chinese-amount";

describe("toChineseAmount", () => {
  it.each([
    [0, "新台幣零元整"],
    [1, "新台幣壹元整"],
    [10, "新台幣壹拾元整"],
    [101, "新台幣壹佰零壹元整"],
    [1010, "新台幣壹仟零壹拾元整"],
    [12300, "新台幣壹萬貳仟參佰元整"],
    [100000, "新台幣壹拾萬元整"],
    [10001, "新台幣壹萬零壹元整"],
    [1000000, "新台幣壹佰萬元整"],
    [100010000, "新台幣壹億零壹萬元整"],
    [100000001, "新台幣壹億零壹元整"],
    [123456789, "新台幣壹億貳仟參佰肆拾伍萬陸仟柒佰捌拾玖元整"],
  ])("%i → %s", (n, expected) => {
    expect(toChineseAmount(n)).toBe(expected);
  });

  it("小數四捨五入、負數加負", () => {
    expect(toChineseAmount(10.5)).toBe("新台幣壹拾壹元整");
    expect(toChineseAmount(-5)).toBe("負新台幣伍元整");
  });
});

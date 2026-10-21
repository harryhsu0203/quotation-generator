import { describe, expect, it } from "vitest";
import { DEFAULT_STYLE, isHexColor, normalizeStyle } from "./quote-style";

describe("normalizeStyle", () => {
  it("合法的值原樣保留", () => {
    expect(normalizeStyle({ layout: "modern", accent: "#0F766E" })).toEqual({ layout: "modern", accent: "#0F766E" });
  });
  it("不合法的版面或顏色退回預設", () => {
    expect(normalizeStyle({ layout: "fancy", accent: "red" })).toEqual(DEFAULT_STYLE);
    expect(normalizeStyle(null)).toEqual(DEFAULT_STYLE);
    expect(normalizeStyle("x")).toEqual(DEFAULT_STYLE);
  });
  it("只壞一個欄位時，另一個欄位保留", () => {
    expect(normalizeStyle({ layout: "formal", accent: "nope" })).toEqual({ layout: "formal", accent: DEFAULT_STYLE.accent });
  });
});

describe("isHexColor", () => {
  it("僅接受 #RRGGBB", () => {
    expect(isHexColor("#2F6BFF")).toBe(true);
    expect(isHexColor("#fff")).toBe(false);
    expect(isHexColor("2F6BFF")).toBe(false);
    expect(isHexColor(123)).toBe(false);
  });
});

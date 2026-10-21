import { describe, expect, it } from "vitest";
import { quotePdfFilename, sanitizeFilePart } from "./pdf-filename";

describe("quotePdfFilename", () => {
  it("報價單_{單號}_{客戶名稱}.pdf", () => {
    expect(quotePdfFilename("Q-20261021-001", "大安股份有限公司")).toBe("報價單_Q-20261021-001_大安股份有限公司.pdf");
  });
  it("客戶名稱空白時省略", () => {
    expect(quotePdfFilename("Q-20261021-001", "")).toBe("報價單_Q-20261021-001.pdf");
    expect(quotePdfFilename("Q-20261021-001", "   ")).toBe("報價單_Q-20261021-001.pdf");
  });
  it("單號與客戶都空白時只剩「報價單」", () => {
    expect(quotePdfFilename("", "")).toBe("報價單.pdf");
  });
  it("去除檔名不允許的字元", () => {
    expect(quotePdfFilename("Q/001", 'A:B*C?"D<E>F|G\\H')).toBe("報價單_Q001_ABCDEFGH.pdf");
  });
  it("空白換成底線、去掉前後的點", () => {
    expect(sanitizeFilePart("  大安  股份 ")).toBe("大安_股份");
    expect(sanitizeFilePart("..hidden..")).toBe("hidden");
  });
  it("過長的名稱會截斷", () => {
    expect(sanitizeFilePart("字".repeat(200))).toHaveLength(60);
  });
});

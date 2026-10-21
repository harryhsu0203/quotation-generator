import { describe, expect, it } from "vitest";
import { isValidTaxId } from "./tax-id";

describe("isValidTaxId", () => {
  it.each(["04595257", "10458575", "22099131", "53212539"])("有效 %s", (id) => {
    expect(isValidTaxId(id)).toBe(true);
  });
  it.each(["12345678", "04595258", "00000001", "1234567", "123456789", "abcdefgh", ""])(
    "無效 %s",
    (id) => {
      expect(isValidTaxId(id)).toBe(false);
    },
  );
});

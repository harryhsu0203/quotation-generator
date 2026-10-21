const DIGITS = ["零", "壹", "貳", "參", "肆", "伍", "陸", "柒", "捌", "玖"];
const SMALL_UNITS = ["", "拾", "佰", "仟"];
const BIG_UNITS = ["", "萬", "億", "兆"];

/** 將 0–9999 轉成國字（不含前導零）。 */
function convertGroup(n: number): string {
  let out = "";
  let pendingZero = false;
  for (let pos = 3; pos >= 0; pos--) {
    const d = Math.floor(n / 10 ** pos) % 10;
    if (d === 0) {
      if (out) pendingZero = true;
      continue;
    }
    if (pendingZero) out += DIGITS[0];
    pendingZero = false;
    out += DIGITS[d] + SMALL_UNITS[pos];
  }
  return out;
}

export function toChineseAmount(value: number): string {
  const n = Math.round(Math.abs(value));
  const prefix = value < 0 ? "負" : "";
  if (n === 0) return "新台幣零元整";

  const groups: number[] = [];
  for (let rest = n; rest > 0; rest = Math.floor(rest / 10000)) {
    groups.push(rest % 10000);
  }

  let out = "";
  for (let i = groups.length - 1; i >= 0; i--) {
    const g = groups[i];
    if (g === 0) continue;
    if (out && g < 1000) out += DIGITS[0];
    out += convertGroup(g) + BIG_UNITS[i];
  }
  return `${prefix}新台幣${out}元整`;
}

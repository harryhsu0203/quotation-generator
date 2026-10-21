const WEIGHTS = [1, 2, 1, 2, 1, 2, 4, 1];

/** 兩位數乘積的十位數與個位數相加。 */
function digitSum(n: number): number {
  return Math.floor(n / 10) + (n % 10);
}

/** 統一編號（8 碼）驗證，財政部新版規則：加權加總可被 5 整除。 */
export function isValidTaxId(id: string): boolean {
  if (!/^\d{8}$/.test(id)) return false;
  const digits = id.split("").map(Number);

  // 第 7 碼為 7 時，乘積 28 的加總可視為 1 或 0，任一可被 5 整除即有效
  let base = 0;
  digits.forEach((d, i) => {
    if (i === 6 && d === 7) return;
    base += digitSum(d * WEIGHTS[i]);
  });
  if (digits[6] === 7) return (base + 1) % 5 === 0 || base % 5 === 0;
  return base % 5 === 0;
}

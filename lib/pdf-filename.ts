/** 移除檔名不允許的字元（Windows／macOS／Linux 通用）與控制字元，並把連續空白換成底線。 */
export function sanitizeFilePart(value: string): string {
  return value
    .replace(/[\\/:*?"<>|\u0000-\u001f\u007f]/g, "")
    .replace(/\s+/g, "_")
    .replace(/^[._]+|[._]+$/g, "")
    .slice(0, 60);
}

/** 報價單 PDF 檔名：報價單_{報價單號}_{客戶名稱}.pdf（缺的部分省略）。 */
export function quotePdfFilename(number: string, customerName: string): string {
  const parts = ["報價單", sanitizeFilePart(number), sanitizeFilePart(customerName)].filter(Boolean);
  return `${parts.join("_")}.pdf`;
}

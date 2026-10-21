import type { InvoiceKind } from "@/lib/invoice";
import type { CellKey } from "./InvoicePaper";

export interface GuideEntry {
  n: number;
  cell: CellKey;
  title: string;
  text: string;
}

/** 示意圖編號對應的填寫說明（編號需與 InvoicePaper 一致）。 */
export const GUIDE: Record<InvoiceKind, GuideEntry[]> = {
  triple: [
    { n: 1, cell: "serial", title: "字軌號碼", text: "每本發票預先印好的英文字軌與 8 碼號碼，請照手上這一份發票上印的號碼填寫。示意圖用「AB-12345678」示範，依實際發票填寫。" },
    { n: 2, cell: "period", title: "期別", text: "依開立日期所屬的雙月期別填寫，例如 9-10 月份。本工具會依開立日期自動換算民國年與期別。" },
    { n: 3, cell: "buyer", title: "買受人", text: "填客戶的公司名稱，建議與營業登記上的名稱一致。" },
    { n: 4, cell: "taxId", title: "統一編號", text: "三聯式需填買受人的統一編號 8 碼，一格填一個數字，請務必核對，避免寫錯。" },
    { n: 5, cell: "address", title: "地址", text: "選填，可視客戶需求填寫。" },
    { n: 6, cell: "date", title: "日期", text: "填實際開立的日期，以民國年／月／日表示。" },
    { n: 7, cell: "items", title: "品名、數量、單價、金額", text: "逐項填寫。三聯式的金額欄為未稅金額，單價 × 數量 = 金額。若輸入的是含稅價，示意圖會換算成未稅金額，各列可能因四捨五入與單價 × 數量差 1～2 元，實務上請調整單價讓數字吻合。" },
    { n: 8, cell: "sales", title: "銷售額合計", text: "所有品項未稅金額的加總。" },
    { n: 9, cell: "tax", title: "營業稅", text: "勾選課稅別（應稅、零稅率、免稅）並填入稅額。一般應稅為銷售額 × 5%（四捨五入）；零稅率與免稅的稅額為 0。" },
    { n: 10, cell: "total", title: "總計", text: "銷售額合計 + 營業稅。" },
    { n: 11, cell: "capital", title: "總計新台幣（中文大寫）", text: "以大寫數字逐格填寫，個位數填在「元」格。最高位前面的空格，實務作法依各地國稅局或會計師建議，可填「零」或畫「╳」，本工具可切換。" },
    { n: 12, cell: "stamp", title: "營業人蓋用統一發票專用章", text: "由開立發票的營業人蓋用統一發票專用章。示意圖只留空白框，不含任何印章。" },
  ],
  duplicate: [
    { n: 1, cell: "serial", title: "字軌號碼", text: "照手上這一份發票上印的字軌與號碼填寫。示意圖用「AB-12345678」示範，依實際發票填寫。" },
    { n: 2, cell: "period", title: "期別", text: "依開立日期所屬的雙月期別填寫，例如 9-10 月份。本工具會依開立日期自動換算。" },
    { n: 3, cell: "buyer", title: "買受人", text: "填客戶名稱。二聯式通常不需要填統一編號。" },
    { n: 4, cell: "date", title: "日期", text: "填實際開立的日期，以民國年／月／日表示。" },
    { n: 5, cell: "items", title: "品名、數量、單價、金額", text: "二聯式的單價與金額皆為含稅價。若輸入的是未稅價，示意圖會換算成含稅金額，各列可能因四捨五入差 1～2 元。" },
    { n: 6, cell: "total", title: "總計（含稅）", text: "所有品項含稅金額的加總。二聯式不另列營業稅。" },
    { n: 7, cell: "capital", title: "總計新台幣（中文大寫）", text: "以大寫數字逐格填寫，個位數填在「元」格。最高位前面的空格，實務作法依各地國稅局或會計師建議，可填「零」或畫「╳」，本工具可切換。" },
    { n: 8, cell: "stamp", title: "營業人蓋用統一發票專用章", text: "由開立發票的營業人蓋用統一發票專用章。示意圖只留空白框，不含任何印章。" },
  ],
};

import type { InvoiceKind } from "@/lib/invoice";
import type { CellKey } from "./InvoicePaper";

export interface GuideEntry {
  n: number;
  cell: CellKey;
  title: string;
  text: string;
}

const CAPITAL_TEXT =
  "以大寫數字逐格填寫，個位數填在「元」格（共 9 格：億、仟、佰、拾、萬、仟、佰、拾、元）。最高位前面的空格，實務作法依各地國稅局或會計師建議，可填「零」或畫「╳」，本工具可切換。";
const STAMP_TEXT = "由開立發票的營業人蓋用統一發票專用章。示意圖只留空白框，不含任何印章。";
const DIAG_TEXT =
  "沒有用到的空白品項列，在「金額」欄從右上到左下畫一條斜線，表示這幾列不再填寫。示意圖會依你填的品項數量，自動把斜線畫在未使用的列。";

/** 示意圖編號對應的填寫說明（編號需與 InvoicePaper 一致）。 */
export const GUIDE: Record<InvoiceKind, GuideEntry[]> = {
  triple: [
    { n: 1, cell: "serial", title: "字軌", text: "發票左上角預先印好的兩個英文字母。每本發票的字軌不同，照手上這一本印的為準；示意圖以「AB」示範。" },
    { n: 2, cell: "period", title: "期別", text: "以國字寫民國年與雙月期別，例如「一一五年 九、十月份」。依開立日期所屬的雙月填寫，本工具會依開立日期自動換算。" },
    { n: 3, cell: "buyer", title: "買受人", text: "填客戶的公司名稱，建議與營業登記上的名稱一致。" },
    { n: 4, cell: "taxId", title: "統一編號", text: "三聯式必填買受人的統一編號 8 碼，一格填一個數字，請務必核對，避免寫錯。" },
    { n: 5, cell: "date", title: "日期", text: "填實際開立的日期：中華民國○年○月○日，以阿拉伯數字書寫。" },
    { n: 6, cell: "address", title: "地址（可省略）", text: "選填，可視客戶需求填寫。若要填，依縣市、鄉鎮市區、路街、段、巷、弄、號、樓、室的順序書寫。" },
    { n: 7, cell: "items", title: "品名、數量、單價、金額", text: "逐項填寫。三聯式的金額欄為未稅金額，單價 × 數量 = 金額。若輸入的是含稅價，示意圖會換算成未稅金額，各列可能因四捨五入與單價 × 數量差 1～2 元，實務上請調整單價讓數字吻合。品項超過 5 列時，示意圖會自動增加列數。" },
    { n: 8, cell: "diag", title: "空白列的斜線", text: DIAG_TEXT },
    { n: 9, cell: "sales", title: "銷售額合計", text: "所有品項未稅金額的加總。" },
    { n: 10, cell: "tax", title: "營業稅", text: "在「應稅、零稅率、免稅」對應的小格打 ✓，並在右側填入稅額。一般應稅為銷售額 × 5%（四捨五入）；零稅率與免稅的稅額為 0。應稅、零稅率、免稅的銷售額應分別開立發票。" },
    { n: 11, cell: "total", title: "總計", text: "銷售額合計 + 營業稅。銷售額、稅額、總計分開填寫。" },
    { n: 12, cell: "capital", title: "總計新臺幣（中文大寫）", text: CAPITAL_TEXT },
    { n: 13, cell: "stamp", title: "營業人蓋用統一發票專用章", text: STAMP_TEXT },
  ],
  duplicate: [
    { n: 1, cell: "serial", title: "字軌", text: "發票左上角預先印好的兩個英文字母。照手上這一本印的為準；示意圖以「AB」示範。" },
    { n: 2, cell: "period", title: "期別", text: "以國字寫民國年與雙月期別，例如「一一五年 九、十月份」。依開立日期所屬的雙月填寫，本工具會依開立日期自動換算。" },
    { n: 3, cell: "date", title: "日期", text: "填實際開立的日期：中華民國○年○月○日，以阿拉伯數字書寫。" },
    { n: 4, cell: "buyer", title: "買受人（可省略）", text: "二聯式的買受人可省略；若客戶需要，可填客戶名稱。二聯式沒有統一編號欄位。" },
    { n: 5, cell: "address", title: "地址（可省略）", text: "選填。若要填，依縣市、鄉鎮市區、路街、段、巷、弄、號、樓、室的順序書寫。" },
    { n: 6, cell: "items", title: "品名、數量、單價、金額", text: "二聯式的單價與金額皆為含稅價。若輸入的是未稅價，示意圖會換算成含稅金額，各列可能因四捨五入差 1～2 元。品項超過 6 列時，示意圖會自動增加列數。" },
    { n: 7, cell: "diag", title: "空白列的斜線", text: DIAG_TEXT },
    { n: 8, cell: "total", title: "總計（含稅）", text: "所有品項含稅金額的加總。二聯式不另列銷售額與營業稅。" },
    { n: 9, cell: "capital", title: "總計新臺幣（中文大寫）", text: CAPITAL_TEXT },
    { n: 10, cell: "tax", title: "課稅別", text: "在「應稅、零稅率、免稅」對應的格子打 ✓。應稅、零稅率、免稅的銷售額應分別開立發票。" },
    { n: 11, cell: "stamp", title: "營業人蓋用統一發票專用章", text: STAMP_TEXT },
  ],
};

import {
  CalendarCheck,
  FileSpreadsheet,
  FileWarning,
  Calculator,
  Copy,
  Hammer,
  Laptop,
  Palette,
  Printer,
  ShieldCheck,
  Smartphone,
  Store,
  Type,
  Users,
  Lock,
  Percent,
  type LucideIcon,
} from "lucide-react";

export interface Feature {
  icon: LucideIcon;
  title: string;
  short: string;
  detail: string;
  points: string[];
}

/** 功能描述必須與網站實際功能一致。 */
export const FEATURES: Feature[] = [
  {
    icon: ShieldCheck,
    title: "統編驗證",
    short: "輸入統一編號時，即時檢查是否打錯。",
    detail:
      "依財政部統一編號檢查規則，驗證 8 碼數字的檢查碼。格式錯誤只會顯示提示，不會阻擋你繼續輸入。",
    points: ["我方與客戶統編都會檢查", "僅檢查號碼格式與檢查碼", "無法確認該公司是否真實登記"],
  },
  {
    icon: Type,
    title: "國字大寫金額",
    short: "總計自動轉成「新台幣壹萬貳仟參佰元整」。",
    detail:
      "不必再手動轉換大寫金額。總計一變動，大寫就跟著更新，並正確處理零、連續零與萬、億進位。",
    points: ["顯示在報價單總計下方", "支援萬、億級距的金額", "小數會四捨五入為整數"],
  },
  {
    icon: Percent,
    title: "含稅／未稅自動計算",
    short: "未稅外加 5%、含稅內含 5%、免稅，一鍵切換。",
    detail:
      "選擇稅別後，未稅金額、營業稅與總計會自動計算。營業稅四捨五入為整數，含稅時以總計回推未稅金額。",
    points: ["未稅（外加 5%）", "含稅（內含 5%）", "免稅"],
  },
  {
    icon: Printer,
    title: "一鍵存 PDF",
    short: "A4 排版，用瀏覽器直接列印或存成 PDF。",
    detail:
      "按下「列印 / 存 PDF」，列印視窗只會出現報價單本身。在列印視窗把目的地選為「另存為 PDF」即可存檔。",
    points: ["A4 尺寸、保留彩色設計", "不會把編輯介面印出來", "PDF 由瀏覽器產生，不經過伺服器"],
  },
  {
    icon: Lock,
    title: "資料不上傳",
    short: "你填的內容只存在自己的瀏覽器。",
    detail:
      "沒有資料庫、不需登入。我方資訊與草稿都存在瀏覽器的 localStorage，下次打開會自動帶入。",
    points: ["我方資訊自動記住", "編輯內容自動暫存草稿", "換電腦或清除瀏覽器資料後不會保留"],
  },
  {
    icon: Smartphone,
    title: "手機也能用",
    short: "手機版提供編輯／預覽切換，預覽縮放整張 A4。",
    detail:
      "在手機上用「編輯」與「預覽」兩個分頁操作，品項會變成卡片式排列，按鈕與輸入框都方便點選。",
    points: ["底部固定切換列", "預覽依螢幕寬度等比縮放", "手機瀏覽器可直接列印或存 PDF"],
  },
];

export const PAINS = [
  {
    icon: FileWarning,
    title: "格式一動就跑掉",
    text: "在 Word 裡調整欄寬，表格就整個位移；換一台電腦開啟，版面又不一樣。",
  },
  {
    icon: Calculator,
    title: "稅額要自己算",
    text: "未稅、含稅、四捨五入……用 Excel 公式容易寫錯，一個小數點就讓總計對不上。",
  },
  {
    icon: Type,
    title: "大寫金額手動打",
    text: "「壹萬零壹佰元整」這類零與進位最容易出錯，每次都要再檢查一遍。",
  },
  {
    icon: Copy,
    title: "舊檔複製再改",
    text: "每次都從上一份報價單另存新檔再修改，一不小心就把別的客戶資料帶到新報價單。",
  },
];

export const AUDIENCES: { icon: LucideIcon; title: string; text: string; href?: string }[] = [
  { icon: Laptop, title: "接案者", text: "設計、寫作、開發，用一份清楚的報價單開啟合作。", href: "/quote/templates/graphic-design" },
  { icon: Users, title: "工作室", text: "固定的公司資訊自動帶入，每次只需要改客戶與品項。", href: "/quote/templates/website-design" },
  { icon: Store, title: "小店家", text: "快速給客戶一張正式的書面報價，不用另外買軟體。" },
  { icon: Hammer, title: "維修業", text: "把檢測、零件與工資分開列，客戶一看就懂。", href: "/quote/templates/pc-repair" },
  { icon: CalendarCheck, title: "工程業", text: "依工項與坪數分項報價，註明追加工程的處理方式。", href: "/quote/templates/interior-renovation" },
  { icon: Palette, title: "電腦組裝", text: "逐項列出零組件與價格，讓比價更透明。", href: "/quote/templates/pc-build" },
];

export const STEPS = [
  { icon: FileSpreadsheet, title: "填資料", text: "輸入我方與客戶資訊，新增品項、選擇稅別。我方資訊只需填一次。" },
  { icon: Calculator, title: "即時預覽", text: "右側（手機為預覽分頁）即時顯示 A4 報價單，金額與大寫自動計算。" },
  { icon: Printer, title: "存成 PDF", text: "按下「列印 / 存 PDF」，在列印視窗選擇「另存為 PDF」，寄給客戶。" },
];

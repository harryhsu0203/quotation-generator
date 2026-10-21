import type { Metadata } from "next";
import LegalPage, { type LegalSection } from "@/components/site/LegalPage";
import { COMPANY_NAME_EN, CONTACT_EMAIL } from "@/lib/config";
import { QUOTE_PRODUCT } from "@/lib/products";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "使用條款",
  description: "使用 Seqlon 的產品與網站前，請先閱讀使用條款。",
  path: "/terms",
});

const SECTIONS: LegalSection[] = [
  {
    title: "服務內容",
    body: [
      `${COMPANY_NAME_EN} 提供多項線上工具，目前可使用的是 ${QUOTE_PRODUCT.name}：一個在瀏覽器中運作的工具，協助你填寫、計算並列印報價單。目前提供免費使用，不需註冊。`,
    ],
  },
  {
    title: "使用者責任",
    body: [
      "報價單上的所有內容（公司資料、品項、金額、稅別、付款條件等）皆由你自行填寫，請自行確認其正確性與合法性。",
      "工具提供的稅額計算、國字大寫與統編檢查僅為輔助，不構成稅務、會計或法律建議。如有疑問，請諮詢專業人士。",
    ],
  },
  {
    title: "資料保存",
    body: [
      "你的資料只儲存在自己的瀏覽器。更換裝置、更換瀏覽器或清除網站資料後，資料將無法保留或復原。請自行以 PDF 等方式備份重要文件。",
    ],
  },
  {
    title: "商業使用",
    body: ["你可以將產生的報價單用於自己的商業往來。請勿將本服務用於違法或侵害他人權益的用途。"],
  },
  {
    title: "免責聲明",
    body: [
      "本服務以現狀提供，我們不保證服務不中斷或完全無誤。在法律允許的範圍內，因使用或無法使用本服務所造成的損失，我們不負賠償責任。",
    ],
  },
  {
    title: "條款變更與聯絡",
    body: ["我們可能調整本條款，更新後的內容會公布於此頁面。", `若有疑問，請來信：${CONTACT_EMAIL}`],
  },
];

export default function TermsPage() {
  return <LegalPage title="使用條款" intro="使用本網站前，請先閱讀以下條款。" sections={SECTIONS} />;
}

import type { Metadata } from "next";
import LegalPage, { type LegalSection } from "@/components/site/LegalPage";
import { COMPANY_NAME_EN, COMPANY_NAME_ZH, CONTACT_EMAIL } from "@/lib/config";
import { QUOTE_PRODUCT } from "@/lib/products";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "使用條款",
  description: "使用序隆科技網站與免費工具前，請先閱讀使用條款。",
  path: "/terms",
});

const SECTIONS: LegalSection[] = [
  {
    title: "網站內容",
    body: [
      `本網站由${COMPANY_NAME_ZH}（${COMPANY_NAME_EN}）經營，介紹 AI 本地化與軟體開發服務，並提供免費工具。網站上的服務說明、情境與流程僅供一般資訊參考，不構成報價、承諾或保證。`,
      "實際的服務內容、範圍、費用與時程，以雙方另行簽訂的合約或確認的文件為準。",
    ],
  },
  {
    title: "免費工具",
    body: [
      `目前提供的免費工具包括${QUOTE_PRODUCT.name}（協助填寫、計算並列印報價單）與發票助手（手開統一發票的填寫參考），都在瀏覽器中運作。目前提供免費使用，不需註冊。`,
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
      "免費工具的資料只儲存在你自己的瀏覽器。更換裝置、更換瀏覽器或清除網站資料後，資料將無法保留或復原。請自行以 PDF 等方式備份重要文件。",
    ],
  },
  {
    title: "商業使用",
    body: ["你可以將產生的報價單用於自己的商業往來。請勿將本服務用於違法或侵害他人權益的用途。"],
  },
  {
    title: "免責聲明",
    body: [
      "免費工具以現狀提供，我們不保證服務不中斷或完全無誤。在法律允許的範圍內，因使用或無法使用免費工具所造成的損失，我們不負賠償責任。",
    ],
  },
  {
    title: "條款變更與聯絡",
    body: ["我們可能調整本條款，更新後的內容會公布於此頁面。", `若有疑問，請來信：${CONTACT_EMAIL}`],
  },
];

export default function TermsPage() {
  return <LegalPage title="使用條款" intro="使用本網站與免費工具前，請先閱讀以下條款。" sections={SECTIONS} />;
}

import type { Metadata } from "next";
import LegalPage, { type LegalSection } from "@/components/site/LegalPage";
import { COMPANY_NAME_EN, CONTACT_EMAIL } from "@/lib/config";
import { QUOTE_PRODUCT } from "@/lib/products";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "隱私權政策",
  description: "你在序隆科技免費工具填寫的資料只存在你的瀏覽器，不會上傳到伺服器；預約諮詢時提供的資料僅用於回覆你。",
  path: "/privacy",
});

const SECTIONS: LegalSection[] = [
  {
    title: "免費工具：資料只存在你的瀏覽器",
    body: [
      `${COMPANY_NAME_EN} 網站目前沒有資料庫，${QUOTE_PRODUCT.name} 等免費工具也不需要註冊或登入。你在工具中填寫的公司資料、客戶資料、品項與圖片（Logo、印章），只會儲存在你自己裝置的瀏覽器（localStorage）。`,
      "這些資料不會被傳送到我們的伺服器，我們無法讀取、備份或還原這些內容。",
    ],
  },
  {
    title: "瀏覽器儲存的內容",
    body: [
      "為了讓你下次開啟時自動帶入，報價助手會在瀏覽器儲存：我方資訊、目前編輯中的草稿，以及用來產生報價單號的當日流水號。",
      "你可以隨時在瀏覽器的設定中清除網站資料，儲存的內容就會被刪除。清除後無法復原。",
    ],
  },
  {
    title: "列印與 PDF",
    body: ["報價單的列印與存成 PDF 都由你的瀏覽器在本機完成，不會經過我們的伺服器。"],
  },
  {
    title: "預約諮詢與聯絡",
    body: [
      "本網站沒有表單。當你主動透過 Email 或 LINE 官方帳號與我們聯絡時，你提供的資訊（例如聯絡方式與需求說明）僅用於回覆你與評估合作，我們不會將其用於與此無關的用途。",
      "請避免在初次聯絡時傳送機密文件或個人敏感資料。",
    ],
  },
  {
    title: "第三方服務",
    body: [
      "網站的字型（Noto Sans TC、Sora）由 Google Fonts 提供，載入頁面時你的瀏覽器會向 Google 的伺服器請求字型檔案，Google 可能因此取得你的 IP 位址等一般連線資訊。",
      "網站目前沒有使用廣告或行為追蹤服務。若日後加入網站流量分析，我們會在本政策中更新說明。",
      "你透過 LINE 或 Email 聯絡我們時，也適用該服務提供者自己的隱私權規範。",
    ],
  },
  {
    title: "你的內容由你負責",
    body: ["你在報價單中填入的任何個人或公司資料，都存放在你自己的裝置，請自行妥善保管匯出的 PDF 檔案。"],
  },
  {
    title: "政策更新與聯絡",
    body: [
      "本政策內容若有變動，會更新在此頁面。",
      `若對隱私權有任何疑問，請來信：${CONTACT_EMAIL}`,
    ],
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      title="隱私權政策"
      intro="重點：免費工具的資料只存在你的瀏覽器，不會上傳到伺服器；預約諮詢時你主動提供的資料，僅用於回覆你。"
      sections={SECTIONS}
    />
  );
}

import type { Metadata } from "next";
import InvoiceTool from "@/components/invoice/InvoiceTool";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "發票助手｜手開統一發票填寫範例（三聯式、二聯式）",
  description:
    "免費手開發票填寫參考：輸入買受人與品項，即時看到三聯式、二聯式統一發票的填寫示意圖，自動計算銷售額、營業稅、總計與大寫金額。本工具不會開立發票。",
  path: "/invoice",
  absoluteTitle: true,
});

export default function InvoicePage() {
  return <InvoiceTool />;
}

import type { Metadata } from "next";
import QuoteTool from "@/components/QuoteTool";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Seqlon Quote 報價單工具",
  description:
    "填寫公司與客戶資料、新增品項，自動計算營業稅與國字大寫金額，即時預覽 A4 報價單並列印或存成 PDF。",
  path: "/quote/app",
});

export default function QuotePage() {
  return <QuoteTool />;
}

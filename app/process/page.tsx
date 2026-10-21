import type { Metadata } from "next";
import CtaBand from "@/components/site/CtaBand";
import PageHero from "@/components/site/PageHero";
import ProcessTabs from "@/components/site/ProcessTabs";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "AI 本地化與軟體開發流程",
  description:
    "AI 本地化：需求訪談、評估規劃、硬體建置、模型與知識庫部署、教育訓練、持續維運。軟體開發：需求訪談、功能規劃與報價、介面設計、開發與測試、上線部署、維護與擴充。",
  path: "/process",
});

export default function ProcessPage() {
  return (
    <>
      <PageHero
        eyebrow="PROCESS"
        title="導入與開發流程"
        description="每個階段都清楚說明我們做什麼、需要你提供什麼。切換分頁查看 AI 本地化或軟體開發的流程。"
      />
      <section className="container-x py-6">
        <ProcessTabs />
      </section>
      <CtaBand
        title="從需求訪談開始"
        description="先聊聊你的需求，我們幫你評估。"
        href="/contact"
        label="預約諮詢"
      />
    </>
  );
}

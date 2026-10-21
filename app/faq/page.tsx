import type { Metadata } from "next";
import CtaBand from "@/components/site/CtaBand";
import Faq from "@/components/site/Faq";
import PageHero from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { FAQS } from "@/lib/faq";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "常見問題",
  description:
    "什麼是 AI 本地化、需要多貴的設備、本地 AI 與雲端 AI 的差異、資料會不會外流，以及免費報價助手的常見問題。",
  path: "/faq",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function FaqPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <PageHero eyebrow="FAQ" title="常見問題" description="找不到答案？歡迎預約諮詢，直接詢問我們。" />
      <section className="container-x grid items-start gap-10 py-6 lg:grid-cols-2 xl:grid-cols-3">
        <Reveal>
          <h2 className="mb-4 text-xl font-bold">AI 本地化</h2>
          <Faq items={FAQS.filter((f) => f.category === "ai")} />
        </Reveal>
        <Reveal>
          <h2 className="mb-4 text-xl font-bold">軟體開發</h2>
          <Faq items={FAQS.filter((f) => f.category === "software")} />
        </Reveal>
        <Reveal>
          <h2 className="mb-4 text-xl font-bold">免費工具</h2>
          <Faq items={FAQS.filter((f) => f.category === "tools")} />
        </Reveal>
      </section>
      <CtaBand
        title="還有其他問題？"
        description="先聊聊你的需求，我們幫你評估。"
        href="/contact"
        label="預約諮詢"
      />
    </>
  );
}

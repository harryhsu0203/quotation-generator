import type { Metadata } from "next";
import CtaBand from "@/components/site/CtaBand";
import Faq from "@/components/site/Faq";
import PageHero from "@/components/site/PageHero";
import { FAQS } from "@/lib/faq";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "常見問題",
  description:
    "資料存在哪裡、是否免費、怎麼存 PDF、統編怎麼驗證、換電腦資料會不見嗎、可以商用嗎——報價單產生器的常見問題。",
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
      <PageHero eyebrow="FAQ" title="常見問題" description="找不到答案？歡迎透過聯絡方式詢問我們。" />
      <section className="mx-auto w-full max-w-3xl px-4 py-6">
        <Faq items={FAQS} />
      </section>
      <CtaBand />
    </>
  );
}

import type { Metadata } from "next";
import { Eye, Lock, Sparkles } from "lucide-react";
import CtaBand from "@/components/site/CtaBand";
import PageHero from "@/components/site/PageHero";
import { Reveal, RevealGroup, RevealItem } from "@/components/site/Reveal";
import { COMPANY_NAME_EN, COMPANY_NAME_ZH } from "@/lib/config";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: `關於 ${COMPANY_NAME_EN}`,
  description: `認識${COMPANY_NAME_ZH}（${COMPANY_NAME_EN}）：我們為什麼做這些工具，以及對簡單、透明與隱私的堅持。`,
  path: "/about",
});

const VALUES = [
  { icon: Sparkles, title: "簡單好用", text: "[在此填寫：你希望工具帶給使用者怎樣的使用感受。]" },
  { icon: Eye, title: "透明誠實", text: "[在此填寫：你對功能描述與資訊透明的看法。]" },
  { icon: Lock, title: "尊重隱私", text: "資料只存在使用者自己的瀏覽器，不上傳伺服器。" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="ABOUT"
        title={`關於 ${COMPANY_NAME_EN}`}
        description={`${COMPANY_NAME_ZH}（${COMPANY_NAME_EN}）：[在此填寫一句話公司介紹。]`}
      />

      <section className="mx-auto w-full max-w-3xl space-y-4 px-4 py-6">
        <Reveal className="space-y-4 text-[15px] leading-relaxed text-slate-700">
          <h2 className="text-xl font-bold text-ink">我們為什麼做這些工具</h2>
          <p>[在此填寫：說明你發現了什麼問題，例如小型企業或個人工作者在日常工作中遇到的困擾。]</p>
          <p>[在此填寫：說明你是怎麼想到用網頁工具來解決，以及希望達成的目標。]</p>
          <h2 className="pt-2 text-xl font-bold text-ink">我們的理念</h2>
          <p>[在此填寫：用幾句話說明品牌背後的理念與未來的方向。]</p>
        </Reveal>
      </section>

      <section className="mx-auto w-full max-w-5xl px-4 py-8">
        <RevealGroup className="grid gap-4 md:grid-cols-3">
          {VALUES.map(({ icon: Icon, title, text }) => (
            <RevealItem key={title} className="card p-5">
              <span className="grid size-10 place-items-center rounded-ui bg-brand-50 text-brand-700">
                <Icon className="size-5" aria-hidden />
              </span>
              <h3 className="mt-4 text-[15px] font-bold">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{text}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      <CtaBand
        title="試試 Seqlon Quote"
        description="目前可使用的產品：免費線上報價單，免註冊、資料只存在你的瀏覽器。"
        href="/quote"
        label="認識 Seqlon Quote"
      />
    </>
  );
}

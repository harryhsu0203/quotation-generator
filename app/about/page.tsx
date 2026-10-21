import type { Metadata } from "next";
import { Gift, KeyRound, Wrench } from "lucide-react";
import CtaBand from "@/components/site/CtaBand";
import PageHero from "@/components/site/PageHero";
import { Reveal, RevealGroup, RevealItem } from "@/components/site/Reveal";
import { COMPANY_NAME_EN, COMPANY_NAME_ZH } from "@/lib/config";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: `關於${COMPANY_NAME_ZH}`,
  description: `${COMPANY_NAME_ZH}（${COMPANY_NAME_EN}）有兩大業務：AI 本地化與軟體開發。結合硬體建置、網路與資安整合、AI 模型部署與系統開發，協助企業在自己的環境裡安全地使用 AI，並讓流程自動化。`,
  path: "/about",
});

const VALUES = [
  { icon: KeyRound, title: "資料留在自己手上", text: "AI 應該成為企業的能力，而不是把資料交出去的代價。" },
  { icon: Wrench, title: "軟硬體一起考量", text: "從主機、網路、資安，到模型、知識庫與系統開發，一起規劃才能真正用得起來。" },
  { icon: Gift, title: "持續做實用的免費工具", text: "把我們開發的工具免費提供出來，讓更多人體驗科技帶來的效率。" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="ABOUT" title={`關於${COMPANY_NAME_ZH}`} />

      <section className="container-x py-4">
        <Reveal className="max-w-3xl space-y-4 text-[15px] leading-relaxed text-slate-700">
          <p>
            {COMPANY_NAME_ZH}（{COMPANY_NAME_EN}）有兩大業務：AI 本地化與軟體開發。我們相信，AI
            應該成為企業的能力，而不是把資料交出去的代價；好的系統，則應該讓流程更順暢。
          </p>
          <p>
            我們結合硬體建置、網路與資安整合、AI 模型部署，以及系統開發與整合的實務能力，協助企業在自己的環境裡安全地使用 AI，並讓重複的流程自動化。同時，我們也持續開發實用的免費工具，讓更多人體驗科技帶來的效率。
          </p>
          <p className="rounded-ui border border-brand-200 bg-brand-50 p-4 text-brand-800">
            「序」是秩序，「隆」是興隆——讓一切有序，讓事業興隆。
          </p>
        </Reveal>
      </section>

      <section className="container-x py-8">
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
        title="想知道你的公司適不適合 AI 本地化？"
        description="先聊聊你的需求，我們幫你評估。"
        href="/contact"
        label="預約諮詢"
      />
    </>
  );
}

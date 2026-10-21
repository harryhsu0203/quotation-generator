import type { Metadata } from "next";
import { Check } from "lucide-react";
import CtaBand from "@/components/site/CtaBand";
import PageHero from "@/components/site/PageHero";
import { RevealGroup, RevealItem } from "@/components/site/Reveal";
import { SERVICES } from "@/lib/services";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMeta({
    title: "地端 AI 導入服務｜私有化部署、企業知識庫、本地 LLM",
    description:
      "序隆科技提供地端 AI 導入服務：導入評估、AI 主機建置、本地 LLM 部署、企業知識庫、內網資安整合與教育訓練，AI 私有化部署，資料不外流。",
    path: "/services",
    absoluteTitle: true,
  }),
  keywords: ["地端 AI", "私有化部署", "企業知識庫", "本地 LLM", "AI 本地化", "AI 主機建置"],
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="SERVICES"
        title="服務項目"
        description="從導入評估、主機建置到模型部署與維運，協助企業把 AI 部署在自己的環境裡。實際服務範圍會依評估結果與雙方約定而定。"
      />
      <section className="mx-auto w-full max-w-5xl px-4 py-6">
        <RevealGroup className="space-y-4">
          {SERVICES.map(({ id, icon: Icon, title, summary, details, includes }, i) => (
            <RevealItem key={id} className="card scroll-mt-24 p-5 sm:p-6">
              <div id={id} className="scroll-mt-24" />
              <div className="flex items-start gap-4">
                <span className="grid size-12 shrink-0 place-items-center rounded-ui bg-brand-50 text-brand-700">
                  <Icon className="size-6" aria-hidden />
                </span>
                <div className="min-w-0">
                  <div className="font-display text-xs font-bold text-slate-300">0{i + 1}</div>
                  <h2 className="text-lg font-bold">{title}</h2>
                  <p className="mt-1 text-sm text-brand-600">{summary}</p>
                </div>
              </div>
              <div className="mt-4 grid gap-5 md:grid-cols-[1.4fr_1fr]">
                <div className="space-y-3 text-sm leading-relaxed text-slate-700">
                  {details.map((d) => (
                    <p key={d}>{d}</p>
                  ))}
                </div>
                <div className="rounded-ui bg-slate-50 p-4">
                  <div className="text-xs font-bold tracking-widest text-muted">包含內容</div>
                  <ul className="mt-2 space-y-1.5 text-sm text-slate-700">
                    {includes.map((it) => (
                      <li key={it} className="flex items-start gap-2">
                        <Check className="mt-0.5 size-4 shrink-0 text-emerald-600" aria-hidden />
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>
      <CtaBand
        title="不確定需要哪些服務？"
        description="先聊聊你的需求，我們幫你評估適合的範圍。"
        href="/contact"
        label="預約諮詢"
      />
    </>
  );
}

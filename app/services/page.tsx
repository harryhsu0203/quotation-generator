import type { Metadata } from "next";
import { Braces, Check, Server, type LucideIcon } from "lucide-react";
import CtaBand from "@/components/site/CtaBand";
import PageHero from "@/components/site/PageHero";
import { Reveal, RevealGroup, RevealItem } from "@/components/site/Reveal";
import { SERVICES, SOFTWARE_SERVICES, type Service } from "@/lib/services";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMeta({
    title: "AI 本地化與軟體開發服務｜地端 AI、企業知識庫、客製化系統",
    description:
      "序隆科技提供 AI 本地化部署（AI 主機建置、本地 LLM、企業知識庫、內網資安）與客製化軟體開發（Web App、企業內部系統、流程自動化、AI 應用整合、系統串接），資料不外流。",
    path: "/services",
    absoluteTitle: true,
  }),
  keywords: [
    "地端 AI",
    "私有化部署",
    "企業知識庫",
    "本地 LLM",
    "AI 本地化",
    "AI 主機建置",
    "客製化軟體開發",
    "企業內部系統",
    "流程自動化",
    "Web App 開發",
  ],
};

function Group({
  id,
  icon: Icon,
  title,
  description,
  services,
}: {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  services: Service[];
}) {
  return (
    <section id={id} className="container-x scroll-mt-28 py-8">
      <Reveal className="mb-6 flex items-start gap-4">
        <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-brand-700 text-white shadow-[0_8px_24px_rgb(47_107_255/0.3)]">
          <Icon className="size-6" aria-hidden />
        </span>
        <div>
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">{title}</h2>
          <p className="mt-1.5 max-w-3xl text-[15px] leading-relaxed text-muted">{description}</p>
        </div>
      </Reveal>
      <RevealGroup className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {services.map(({ id: sid, icon: SIcon, title: stitle, summary, details, includes }, i) => (
          <RevealItem key={sid} className="card scroll-mt-28 p-5 sm:p-6">
            <div id={sid} className="scroll-mt-28" />
            <div className="flex items-start gap-4">
              <span className="grid size-12 shrink-0 place-items-center rounded-ui bg-brand-50 text-brand-700">
                <SIcon className="size-6" aria-hidden />
              </span>
              <div className="min-w-0">
                <div className="font-display text-xs font-bold text-slate-300">0{i + 1}</div>
                <h3 className="text-lg font-bold">{stitle}</h3>
                <p className="mt-1 text-sm text-brand-600">{summary}</p>
              </div>
            </div>
            <div className="mt-4 space-y-3 text-sm leading-relaxed text-slate-700">
              {details.map((d) => (
                <p key={d}>{d}</p>
              ))}
            </div>
            <div className="mt-4 rounded-ui bg-slate-50 p-4">
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
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="SERVICES"
        title="服務項目"
        description="序隆科技有兩大業務：AI 本地化與軟體開發。實際服務範圍會依評估結果與雙方約定而定。"
      />
      <Group
        id="ai"
        icon={Server}
        title="AI 本地化"
        description="在自有主機與內網部署 AI，從導入評估、主機建置到模型部署與維運，資料不外流。"
        services={SERVICES}
      />
      <Group
        id="software"
        icon={Braces}
        title="軟體開發"
        description="依需求打造專屬系統，讓流程自動化，從網站、內部系統到 AI 應用整合與系統串接。"
        services={SOFTWARE_SERVICES}
      />
      <CtaBand
        title="不確定需要哪些服務？"
        description="先聊聊你的需求，我們幫你評估適合的範圍。"
        href="/contact"
        label="預約諮詢"
      />
    </>
  );
}

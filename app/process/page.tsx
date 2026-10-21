import type { Metadata } from "next";
import CtaBand from "@/components/site/CtaBand";
import PageHero from "@/components/site/PageHero";
import { RevealGroup, RevealItem } from "@/components/site/Reveal";
import { PROCESS_STEPS } from "@/lib/services";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "AI 本地化導入流程",
  description:
    "從需求訪談、評估規劃、硬體建置、模型與知識庫部署，到教育訓練與持續維運，了解地端 AI 導入每個階段會做什麼。",
  path: "/process",
});

export default function ProcessPage() {
  return (
    <>
      <PageHero
        eyebrow="PROCESS"
        title="導入流程"
        description="六個階段，每一步都清楚說明我們做什麼、需要你提供什麼。時程與費用依專案規模而定，評估後再與你討論。"
      />
      <section className="mx-auto w-full max-w-4xl px-4 py-6">
        <RevealGroup className="relative space-y-4">
          {PROCESS_STEPS.map((s, i) => (
            <RevealItem key={s.id} className="card flex gap-4 p-5 sm:gap-5 sm:p-6">
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-brand-700 font-display text-base font-bold text-white">
                {i + 1}
              </span>
              <div className="min-w-0 flex-1">
                <h2 className="text-lg font-bold">{s.title}</h2>
                <p className="mt-1 text-sm text-slate-600">{s.summary}</p>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-ui bg-brand-50/70 p-4">
                    <div className="text-xs font-bold tracking-widest text-brand-600">我們會做</div>
                    <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-slate-700">
                      {s.we.map((w) => (
                        <li key={w}>{w}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-ui bg-slate-50 p-4">
                    <div className="text-xs font-bold tracking-widest text-muted">需要你提供</div>
                    <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-slate-700">
                      {s.you.map((y) => (
                        <li key={y}>{y}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
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

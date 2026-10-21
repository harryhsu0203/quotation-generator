import type { Metadata } from "next";
import { Check, Info } from "lucide-react";
import CtaBand from "@/components/site/CtaBand";
import PageHero from "@/components/site/PageHero";
import { Reveal, RevealGroup, RevealItem } from "@/components/site/Reveal";
import { SOLUTIONS } from "@/lib/services";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMeta({
    title: "企業 AI 應用情境｜地端 AI 解決方案（依行業）",
    description:
      "會計與法律事務所、醫療診所、製造業與企業內部：地端 AI 與企業知識庫的適用情境，AI 私有化部署，文件與資料留在自己的環境。",
    path: "/solutions",
    absoluteTitle: true,
  }),
  keywords: ["地端 AI", "企業知識庫", "私有化部署", "本地 LLM", "AI 解決方案"],
};

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="SOLUTIONS"
        title="適用情境"
        description="依行業整理本地 AI 常見的應用方向：先看痛點，再看本地 AI 可以怎麼幫忙。"
      />

      <section className="container-x py-2">
        <Reveal>
          <div className="flex gap-3 rounded-[1rem] border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
            <Info className="mt-0.5 size-5 shrink-0" aria-hidden />
            <p>以下為情境說明，用來呈現本地 AI 可能的應用方式，並非已完成的導入案例。實際成效依資料、模型與使用方式而定。</p>
          </div>
        </Reveal>
      </section>

      <section className="container-x py-6">
        <RevealGroup className="grid gap-4 xl:grid-cols-2">
          {SOLUTIONS.map(({ id, icon: Icon, industry, pain, solution, uses, note }) => (
            <RevealItem key={id} className="card p-5 sm:p-6">
              <div className="flex items-center gap-3">
                <span className="grid size-12 place-items-center rounded-ui bg-brand-50 text-brand-700">
                  <Icon className="size-6" aria-hidden />
                </span>
                <h2 className="text-lg font-bold">{industry}</h2>
              </div>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div className="rounded-ui bg-amber-50/60 p-4">
                  <div className="text-xs font-bold tracking-widest text-amber-600">痛點</div>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-700">{pain}</p>
                </div>
                <div className="rounded-ui bg-brand-50/70 p-4">
                  <div className="text-xs font-bold tracking-widest text-brand-600">本地 AI 怎麼解決</div>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-700">{solution}</p>
                </div>
              </div>
              <div className="mt-4">
                <div className="text-xs font-bold tracking-widest text-muted">可規劃的應用</div>
                <ul className="mt-2 grid gap-1.5 text-sm text-slate-700 sm:grid-cols-3">
                  {uses.map((u) => (
                    <li key={u} className="flex items-start gap-2">
                      <Check className="mt-0.5 size-4 shrink-0 text-emerald-600" aria-hidden />
                      {u}
                    </li>
                  ))}
                </ul>
              </div>
              {note && <p className="mt-3 text-xs text-muted">※ {note}</p>}
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      <CtaBand
        title="你的產業不在清單上？"
        description="告訴我們你的情境，我們一起評估本地 AI 能不能幫上忙。"
        href="/contact"
        label="預約諮詢"
      />
    </>
  );
}

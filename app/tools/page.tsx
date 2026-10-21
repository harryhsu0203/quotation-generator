import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import CtaBand from "@/components/site/CtaBand";
import PageHero from "@/components/site/PageHero";
import { RevealGroup, RevealItem } from "@/components/site/Reveal";
import { PRODUCTS, isAvailable } from "@/lib/products";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "免費工具｜報價助手、發票助手",
  description:
    "序隆科技打造的免費線上工具：報價助手可自動計算營業稅、統編檢查與國字大寫；發票助手開發中。免費、免註冊，資料只存在你的瀏覽器。",
  path: "/tools",
  absoluteTitle: true,
});

export default function ToolsPage() {
  return (
    <>
      <PageHero
        eyebrow="FREE TOOLS"
        title="免費工具"
        description="我們也打造實用的免費工具，體驗序隆科技的開發品質。免費、免註冊，資料只存在你的瀏覽器。"
      />
      <section className="mx-auto w-full max-w-5xl px-4 py-6">
        <RevealGroup className="grid gap-4 sm:grid-cols-2">
          {PRODUCTS.map((p) => {
            const Icon = p.icon;
            const available = isAvailable(p);
            return (
              <RevealItem key={p.slug} className="h-full">
                <div
                  className={`flex h-full flex-col rounded-[1rem] p-5 ${
                    available ? "card" : "border border-dashed border-slate-300 bg-white/50"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <span
                      className={`grid size-11 place-items-center rounded-ui ${
                        available ? "bg-brand-50 text-brand-700" : "bg-slate-100 text-slate-400"
                      }`}
                    >
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        available ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-muted"
                      }`}
                    >
                      {available ? "可使用" : "即將推出"}
                    </span>
                  </div>
                  <h2 className="mt-4 text-lg font-bold">
                    {p.name} <span className="text-sm font-normal text-muted">{p.nameEn}</span>
                  </h2>
                  <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted">{p.description}</p>
                  <div className="mt-5 flex flex-wrap gap-4 text-sm font-medium">
                    {available ? (
                      <>
                        {p.appHref && (
                          <Link href={p.appHref} className="inline-flex min-h-11 items-center gap-1 text-brand-600 hover:underline">
                            開始使用
                            <ArrowRight className="size-4" aria-hidden />
                          </Link>
                        )}
                        <Link href={p.href} className="inline-flex min-h-11 items-center text-slate-600 hover:text-brand-600">
                          了解更多
                        </Link>
                      </>
                    ) : (
                      <Link href={p.href} className="inline-flex min-h-11 items-center text-slate-600 hover:text-brand-600">
                        查看說明
                      </Link>
                    )}
                  </div>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
        <p className="mt-6 text-center text-sm text-muted">之後新增的免費工具，也會放在這裡。</p>
      </section>
      <CtaBand
        title="想把 AI 導入自己的公司？"
        description="除了免費工具，序隆科技的主要服務是企業 AI 本地化導入。"
        href="/contact"
        label="預約諮詢"
      />
    </>
  );
}

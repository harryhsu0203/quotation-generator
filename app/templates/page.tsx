import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import CtaBand from "@/components/site/CtaBand";
import PageHero from "@/components/site/PageHero";
import { RevealGroup, RevealItem } from "@/components/site/Reveal";
import { TEMPLATES, templateTitle } from "@/lib/templates";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "報價單範本｜免費線上產生",
  description:
    "電腦組裝、電腦維修、平面設計、室內裝修、網站設計等行業的報價單範本，一鍵帶入範例品項，再依實際情況修改。",
  path: "/templates",
  absoluteTitle: true,
});

export default function TemplatesPage() {
  return (
    <>
      <PageHero
        eyebrow="TEMPLATES"
        title="報價單範本"
        description="選擇你的行業，一鍵帶入範例品項，再改成自己的內容。範本中的品項與金額僅供參考，請依實際情況調整。"
      />
      <section className="mx-auto w-full max-w-5xl px-4 py-6">
        <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TEMPLATES.map((t) => (
            <RevealItem key={t.slug}>
              <Link
                href={`/templates/${t.slug}`}
                title={templateTitle(t)}
                className="card group flex h-full flex-col p-5 transition-shadow hover:shadow-[0_8px_30px_rgb(15_23_42/0.08)]"
              >
                <h2 className="text-[17px] font-bold">{t.name}報價單</h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{t.summary}</p>
                <div className="mt-4 flex items-center justify-between text-sm">
                  <span className="text-slate-500">{t.items.length} 個範例品項</span>
                  <span className="inline-flex items-center gap-1 font-medium text-brand-700">
                    查看範本
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </span>
                </div>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>
      <CtaBand
        title="找不到你的行業？"
        description="直接從空白報價單開始，所有欄位都可以自由填寫。"
        label="從空白開始"
      />
    </>
  );
}

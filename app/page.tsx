import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import ButtonLink from "@/components/site/ButtonLink";
import CtaBand from "@/components/site/CtaBand";
import LocalAiDiagram from "@/components/site/LocalAiDiagram";
import { Reveal, RevealGroup, RevealItem } from "@/components/site/Reveal";
import SectionHeading from "@/components/site/SectionHeading";
import {
  BRAND_ASSETS,
  BRAND_BADGE,
  BRAND_SLOGAN,
  BRAND_SUBSLOGAN,
  COMPANY_NAME_EN,
  COMPANY_NAME_ZH,
  HOME_TITLE,
  SITE_DESCRIPTION,
  SITE_URL,
} from "@/lib/config";
import { PRODUCTS, isAvailable } from "@/lib/products";
import {
  BUSINESSES,
  PROCESS_STEPS,
  SERVICES,
  SOFTWARE_PROCESS_STEPS,
  SOFTWARE_SERVICES,
  SOLUTIONS,
  WHY_POINTS,
} from "@/lib/services";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: HOME_TITLE,
  description: SITE_DESCRIPTION,
  path: "/",
  absoluteTitle: true,
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: COMPANY_NAME_EN,
  alternateName: COMPANY_NAME_ZH,
  url: SITE_URL,
  logo: `${SITE_URL}${BRAND_ASSETS.icon}`,
  description: SITE_DESCRIPTION,
};

const cardHover = "transition-shadow hover:shadow-[0_8px_30px_rgb(11_27_43/0.08)]";

/** 首頁服務摘要：AI 本地化 + 軟體開發，共 12 張卡片（4 欄 × 3 列） */
const SERVICE_CARDS = [
  ...SERVICES.map((s) => ({ ...s, tag: "AI 本地化", tagClass: "bg-brand-50 text-brand-600" })),
  ...SOFTWARE_SERVICES.map((s) => ({ ...s, tag: "軟體開發", tagClass: "bg-emerald-50 text-emerald-700" })),
];

export default function CompanyHome() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      {/* Hero：左文字、右視覺各佔一半，高度約 80vh */}
      <section className="container-x pb-10 pt-8 lg:flex lg:min-h-[calc(80vh-3.5rem)] lg:items-stretch lg:py-10">
        <div className="grid w-full items-stretch gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal className="flex flex-col justify-center">
            <span className="inline-flex w-fit items-center rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-medium text-brand-600">
              {BRAND_BADGE}
            </span>
            <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-ink md:text-5xl xl:text-6xl">
              AI 留在你的環境裡，
              <br />
              <span className="text-brand-700">資料不出門。</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted lg:text-lg">{BRAND_SUBSLOGAN}</p>
            <h2 className="sr-only">{BRAND_SLOGAN}</h2>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <ButtonLink href="/contact" variant="primary" className="px-6">
                預約諮詢
                <ArrowRight className="size-4" aria-hidden />
              </ButtonLink>
              <ButtonLink href="/services">了解服務</ButtonLink>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="lg:h-full">
            <LocalAiDiagram />
          </Reveal>
        </div>
      </section>

      {/* 兩大業務 */}
      <section className="container-x py-12">
        <SectionHeading eyebrow="WHAT WE DO" title="兩大業務" description="AI 本地化與軟體開發，可以單獨進行，也能整合在一起。" />
        <RevealGroup className="grid gap-5 md:grid-cols-2">
          {BUSINESSES.map(({ id, icon: Icon, title, summary, points, href, cta }) => (
            <RevealItem key={id} className="h-full">
              <div className={`card flex h-full flex-col p-6 lg:p-8 ${cardHover}`}>
                <span className="grid size-14 place-items-center rounded-2xl bg-brand-700 text-white shadow-[0_8px_24px_rgb(47_107_255/0.3)]">
                  <Icon className="size-7" aria-hidden />
                </span>
                <h3 className="mt-5 text-2xl font-bold tracking-tight">{title}</h3>
                <p className="mt-2 text-base text-muted">{summary}</p>
                <ul className="mt-5 grid flex-1 gap-2.5 sm:grid-cols-2">
                  {points.map((p) => (
                    <li key={p} className="flex items-center gap-2 text-sm font-medium text-slate-700">
                      <Check className="size-4 shrink-0 text-emerald-600" aria-hidden />
                      {p}
                    </li>
                  ))}
                </ul>
                <Link href={href} className="mt-6 inline-flex min-h-11 w-fit items-center gap-1 text-sm font-bold text-brand-600 hover:underline">
                  {cta}
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* 為什麼要 AI 本地化 */}
      <section className="container-x py-12">
        <SectionHeading eyebrow="WHY LOCAL AI" title="雲端 AI 很方便，但不是每份資料都能上雲" />
        <RevealGroup className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {WHY_POINTS.map(({ icon: Icon, title, text }) => (
            <RevealItem key={title} className="card p-5 lg:p-6">
              <span className="grid size-10 place-items-center rounded-ui bg-brand-50 text-brand-700">
                <Icon className="size-5" aria-hidden />
              </span>
              <h3 className="mt-4 text-[15px] font-bold">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{text}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* 服務項目 */}
      <section className="container-x py-12">
        <SectionHeading
          eyebrow="SERVICES"
          title="從評估、開發到維運，一站完成"
          description="AI 本地化與軟體開發的服務項目，每一項都能依你的情況調整範圍。"
        />
        <RevealGroup className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {SERVICE_CARDS.map(({ id, icon: Icon, title, summary, tag, tagClass }) => (
            <RevealItem key={id}>
              <Link href={`/services#${id}`} className={`card flex h-full flex-col p-5 lg:p-6 ${cardHover}`}>
                <div className="flex items-center justify-between">
                  <span className="grid size-10 place-items-center rounded-ui bg-brand-50 text-brand-700">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <span className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${tagClass}`}>{tag}</span>
                </div>
                <h3 className="mt-4 text-[15px] font-bold">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{summary}</p>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
        <Reveal className="mt-6 text-center">
          <Link href="/services" className="inline-flex min-h-11 items-center gap-1 text-sm font-medium text-brand-600 hover:underline">
            查看服務詳情
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </Reveal>
      </section>

      {/* 適用情境 */}
      <section className="container-x py-12">
        <SectionHeading
          eyebrow="SOLUTIONS"
          title="哪些情境適合本地 AI"
          description="以下為依行業整理的情境說明，並非已完成的導入案例。"
        />
        <RevealGroup className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {SOLUTIONS.map(({ id, icon: Icon, industry, pain, solution }) => (
            <RevealItem key={id} className="card p-5 lg:p-6">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-ui bg-brand-50 text-brand-700">
                  <Icon className="size-5" aria-hidden />
                </span>
                <h3 className="text-[15px] font-bold">{industry}</h3>
              </div>
              <dl className="mt-4 space-y-3 text-sm leading-relaxed">
                <div>
                  <dt className="text-xs font-bold tracking-widest text-amber-600">痛點</dt>
                  <dd className="mt-0.5 text-slate-600">{pain}</dd>
                </div>
                <div>
                  <dt className="text-xs font-bold tracking-widest text-brand-600">本地 AI 怎麼解決</dt>
                  <dd className="mt-0.5 text-slate-700">{solution}</dd>
                </div>
              </dl>
            </RevealItem>
          ))}
        </RevealGroup>
        <Reveal className="mt-6 text-center">
          <Link href="/solutions" className="inline-flex min-h-11 items-center gap-1 text-sm font-medium text-brand-600 hover:underline">
            查看更多情境
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </Reveal>
      </section>

      {/* 流程 */}
      <section className="container-x py-12">
        <SectionHeading eyebrow="PROCESS" title="六個步驟，穩穩進行" />
        <div className="space-y-6">
          {[
            { label: "AI 本地化導入", steps: PROCESS_STEPS },
            { label: "軟體開發", steps: SOFTWARE_PROCESS_STEPS },
          ].map((row) => (
            <div key={row.label}>
              <div className="mb-3 text-sm font-bold text-muted">{row.label}</div>
              <RevealGroup className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
                {row.steps.map((s, i) => (
                  <RevealItem key={s.id} className="card flex items-center gap-3 p-4">
                    <span className="grid size-8 shrink-0 place-items-center rounded-full bg-brand-700 text-sm font-bold text-white">{i + 1}</span>
                    <h3 className="text-sm font-bold">{s.title}</h3>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          ))}
        </div>
        <Reveal className="mt-6 text-center">
          <Link href="/process" className="inline-flex min-h-11 items-center gap-1 text-sm font-medium text-brand-600 hover:underline">
            查看每個階段做什麼
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </Reveal>
      </section>

      {/* 我們開發的免費工具 */}
      <section className="container-x py-12">
        <SectionHeading
          eyebrow="OUR WORK"
          title="我們開發的免費工具"
          description="這些工具展示了我們的開發能力，你的專屬系統也能做到這樣的品質。免費、免註冊，資料只存在你的瀏覽器。"
        />
        <RevealGroup className="grid gap-4 sm:grid-cols-2">
          {PRODUCTS.map((p) => {
            const Icon = p.icon;
            const available = isAvailable(p);
            const body = (
              <>
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
                <h3 className="mt-4 text-lg font-bold">{p.name}</h3>
                <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted">{p.description}</p>
                {available && (
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand-600">
                    立即使用
                    <ArrowRight className="size-4" aria-hidden />
                  </span>
                )}
              </>
            );
            return (
              <RevealItem key={p.slug} className="h-full">
                {available ? (
                  <Link href={p.href} className={`card flex h-full flex-col p-5 lg:p-6 ${cardHover}`}>
                    {body}
                  </Link>
                ) : (
                  <div className="flex h-full flex-col rounded-[1rem] border border-dashed border-slate-300 bg-white/50 p-5 lg:p-6">
                    {body}
                  </div>
                )}
              </RevealItem>
            );
          })}
        </RevealGroup>
        <Reveal className="mt-6 text-center">
          <Link href="/tools" className="inline-flex min-h-11 items-center gap-1 text-sm font-medium text-brand-600 hover:underline">
            查看所有工具
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </Reveal>
      </section>

      <CtaBand
        title="有想解決的問題嗎？"
        description="不論是 AI 導入還是系統開發，先聊聊你的需求。"
        href="/contact"
        label="預約諮詢"
      />
    </>
  );
}

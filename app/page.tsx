import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
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
import { PROCESS_STEPS, SERVICES, SOLUTIONS, WHY_POINTS } from "@/lib/services";
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

export default function CompanyHome() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      {/* Hero */}
      <section className="mx-auto w-full max-w-6xl px-4 pb-10 pt-8 md:pt-14">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
          <Reveal>
            <span className="inline-flex items-center rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-medium text-brand-600">
              {BRAND_BADGE}
            </span>
            <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-ink md:text-5xl">
              AI 留在你的環境裡，
              <br />
              <span className="text-brand-700">資料不出門。</span>
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">{BRAND_SUBSLOGAN}</p>
            <h2 className="sr-only">{BRAND_SLOGAN}</h2>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <ButtonLink href="/contact" variant="primary" className="px-6">
                預約諮詢
                <ArrowRight className="size-4" aria-hidden />
              </ButtonLink>
              <ButtonLink href="/services">了解服務</ButtonLink>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <LocalAiDiagram />
          </Reveal>
        </div>
      </section>

      {/* 為什麼要 AI 本地化 */}
      <section className="mx-auto w-full max-w-6xl px-4 py-12">
        <SectionHeading eyebrow="WHY LOCAL AI" title="雲端 AI 很方便，但不是每份資料都能上雲" />
        <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_POINTS.map(({ icon: Icon, title, text }) => (
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

      {/* 服務項目 */}
      <section className="mx-auto w-full max-w-6xl px-4 py-12">
        <SectionHeading
          eyebrow="SERVICES"
          title="從評估到維運，一站完成"
          description="硬體、模型、知識庫、資安與教育訓練，都由同一個團隊處理。"
        />
        <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map(({ id, icon: Icon, title, summary }, i) => (
            <RevealItem key={id}>
              <Link href={`/services#${id}`} className={`card flex h-full flex-col p-5 ${cardHover}`}>
                <div className="flex items-center justify-between">
                  <span className="grid size-10 place-items-center rounded-ui bg-brand-50 text-brand-700">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <span className="font-display text-sm font-bold text-slate-300">0{i + 1}</span>
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
      <section className="mx-auto w-full max-w-6xl px-4 py-12">
        <SectionHeading
          eyebrow="SOLUTIONS"
          title="哪些情境適合本地 AI"
          description="以下為依行業整理的情境說明，並非已完成的導入案例。"
        />
        <RevealGroup className="grid gap-4 md:grid-cols-2">
          {SOLUTIONS.map(({ id, icon: Icon, industry, pain, solution }) => (
            <RevealItem key={id} className="card p-5">
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

      {/* 導入流程 */}
      <section className="mx-auto w-full max-w-6xl px-4 py-12">
        <SectionHeading eyebrow="PROCESS" title="六個步驟，穩穩導入" />
        <RevealGroup className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
          {PROCESS_STEPS.map((s, i) => (
            <RevealItem key={s.id} className="card p-4">
              <span className="grid size-8 place-items-center rounded-full bg-brand-700 text-sm font-bold text-white">{i + 1}</span>
              <h3 className="mt-3 text-sm font-bold">{s.title}</h3>
            </RevealItem>
          ))}
        </RevealGroup>
        <Reveal className="mt-6 text-center">
          <Link href="/process" className="inline-flex min-h-11 items-center gap-1 text-sm font-medium text-brand-600 hover:underline">
            查看每個階段做什麼
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </Reveal>
      </section>

      {/* 免費工具 */}
      <section className="mx-auto w-full max-w-6xl px-4 py-12">
        <SectionHeading
          eyebrow="FREE TOOLS"
          title="我們也打造實用的免費工具"
          description="體驗序隆科技的開發品質，免費、免註冊，資料只存在你的瀏覽器。"
        />
        <RevealGroup className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-2">
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
                  <Link href={p.href} className={`card flex h-full flex-col p-5 ${cardHover}`}>
                    {body}
                  </Link>
                ) : (
                  <div className="flex h-full flex-col rounded-[1rem] border border-dashed border-slate-300 bg-white/50 p-5">
                    {body}
                  </div>
                )}
              </RevealItem>
            );
          })}
        </RevealGroup>
        <Reveal className="mt-6 text-center">
          <Link href="/tools" className="inline-flex min-h-11 items-center gap-1 text-sm font-medium text-brand-600 hover:underline">
            查看所有免費工具
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </Reveal>
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

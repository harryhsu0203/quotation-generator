import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Mail, MessageCircle } from "lucide-react";
import ButtonLink from "@/components/site/ButtonLink";
import BrandVisual from "@/components/site/BrandVisual";
import { Reveal, RevealGroup, RevealItem } from "@/components/site/Reveal";
import SectionHeading from "@/components/site/SectionHeading";
import {
  BRAND_ASSETS,
  BRAND_SLOGAN,
  BRAND_SUBSLOGAN,
  COMPANY_NAME_EN,
  COMPANY_NAME_ZH,
  CONTACT_EMAIL,
  LINE_URL,
  SITE_DESCRIPTION,
  SITE_FULL_NAME,
  SITE_URL,
  isPlaceholder,
} from "@/lib/config";
import { PRODUCTS, isAvailable } from "@/lib/products";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: SITE_FULL_NAME,
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

export default function CompanyHome() {
  const emailReady = !isPlaceholder(CONTACT_EMAIL);
  const lineReady = !isPlaceholder(LINE_URL);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      {/* Hero */}
      <section className="mx-auto w-full max-w-6xl px-4 pb-10 pt-8 md:pt-16">
        <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-14">
          <Reveal>
            <span className="inline-flex items-center rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-medium text-brand-600">
              {COMPANY_NAME_ZH}・{COMPANY_NAME_EN}
            </span>
            <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-ink md:text-5xl">{BRAND_SLOGAN}</h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">{BRAND_SUBSLOGAN}</p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <ButtonLink href="#products" variant="primary" className="px-6">
                探索產品
                <ArrowRight className="size-4" aria-hidden />
              </ButtonLink>
              <ButtonLink href="/contact">聯絡我們</ButtonLink>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <BrandVisual />
          </Reveal>
        </div>
      </section>

      {/* 產品 */}
      <section id="products" className="mx-auto w-full max-w-6xl scroll-mt-20 px-4 py-12">
        <SectionHeading
          eyebrow="PRODUCTS"
          title="我們的產品"
          description="每個產品都專注解決一件事，並盡量做到簡單、好上手。"
        />
        <RevealGroup className="grid gap-4 md:grid-cols-3">
          {PRODUCTS.map((p) => {
            const Icon = p.icon;
            const available = isAvailable(p);
            return (
              <RevealItem key={p.slug} className="h-full">
                <div
                  className={`flex h-full flex-col rounded-[1rem] p-5 ${
                    available
                      ? "card transition-shadow hover:shadow-[0_8px_30px_rgb(11_27_43/0.08)]"
                      : "border border-dashed border-slate-300 bg-white/50"
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
                  <h3 className="mt-4 text-lg font-bold">
                    {p.name}
                    {p.nameZh && <span className="ml-2 text-sm font-normal text-muted">{p.nameZh}</span>}
                  </h3>
                  <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted">{p.description}</p>
                  {available && (
                    <div className="mt-5 flex flex-wrap gap-2">
                      <ButtonLink href={p.href}>了解更多</ButtonLink>
                      {p.appHref && (
                        <ButtonLink href={p.appHref} variant="primary">
                          開始使用
                        </ButtonLink>
                      )}
                    </div>
                  )}
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </section>

      {/* 關於 */}
      <section className="mx-auto w-full max-w-6xl px-4 py-12">
        <Reveal>
          <div className="grid gap-6 rounded-[1.25rem] bg-brand-800 p-6 text-white md:grid-cols-[1fr_1.4fr] md:p-10">
            <div>
              <div className="text-xs font-bold tracking-widest text-brand-200">ABOUT</div>
              <h2 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">關於 {COMPANY_NAME_EN}</h2>
            </div>
            <div>
              <p className="text-[15px] leading-relaxed text-slate-300">[在此填寫公司簡介：我們是誰、做什麼、想解決什麼問題。]</p>
              <Link href="/about" className="mt-4 inline-flex min-h-11 items-center gap-1 text-sm font-medium text-white hover:underline">
                進一步了解
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      {/* 聯絡 */}
      <section className="mx-auto w-full max-w-6xl px-4 py-12">
        <SectionHeading eyebrow="CONTACT" title="聯絡我們" description="使用上的問題、功能建議或合作想法，都歡迎與我們聯繫。" />
        <RevealGroup className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-2">
          <RevealItem className="card flex items-center gap-4 p-5">
            <span className="grid size-11 shrink-0 place-items-center rounded-ui bg-brand-50 text-brand-700">
              <Mail className="size-5" aria-hidden />
            </span>
            <div className="min-w-0">
              <div className="text-sm font-bold">Email</div>
              {emailReady ? (
                <a href={`mailto:${CONTACT_EMAIL}`} className="break-all text-sm text-brand-600 hover:underline">{CONTACT_EMAIL}</a>
              ) : (
                <div className="break-all text-sm text-slate-400">{CONTACT_EMAIL}</div>
              )}
            </div>
          </RevealItem>
          <RevealItem className="card flex items-center gap-4 p-5">
            <span className="grid size-11 shrink-0 place-items-center rounded-ui bg-emerald-50 text-emerald-600">
              <MessageCircle className="size-5" aria-hidden />
            </span>
            <div className="min-w-0">
              <div className="text-sm font-bold">LINE 官方帳號</div>
              {lineReady ? (
                <a href={LINE_URL} target="_blank" rel="noopener noreferrer" className="text-sm text-brand-600 hover:underline">加入好友</a>
              ) : (
                <div className="break-all text-sm text-slate-400">{LINE_URL}</div>
              )}
            </div>
          </RevealItem>
        </RevealGroup>
        <Reveal className="mt-6 text-center">
          <Link href="/contact" className="inline-flex min-h-11 items-center gap-1 text-sm font-medium text-brand-600 hover:underline">
            更多聯絡方式
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </Reveal>
      </section>
    </>
  );
}

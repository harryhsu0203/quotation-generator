import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import ButtonLink from "@/components/site/ButtonLink";
import CtaBand from "@/components/site/CtaBand";
import Faq from "@/components/site/Faq";
import QuoteMock from "@/components/site/QuoteMock";
import { Reveal, RevealGroup, RevealItem } from "@/components/site/Reveal";
import SectionHeading from "@/components/site/SectionHeading";
import { AUDIENCES, FEATURES, PAINS, STEPS } from "@/components/site/content";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/config";
import { FAQS, HOME_FAQ_IDS } from "@/lib/faq";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: `${SITE_NAME}｜${SITE_TAGLINE}`,
  description: SITE_DESCRIPTION,
  path: "/",
  absoluteTitle: true,
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  inLanguage: "zh-TW",
  offers: { "@type": "Offer", price: "0", priceCurrency: "TWD" },
  featureList: FEATURES.map((f) => f.title),
};

export default function HomePage() {
  const homeFaqs = FAQS.filter((f) => HOME_FAQ_IDS.includes(f.id));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      {/* Hero */}
      <section className="mx-auto w-full max-w-6xl px-4 pb-10 pt-8 md:pt-14">
        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
          <Reveal>
            <span className="inline-flex items-center rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700">
              免費・免註冊・資料只存在你的瀏覽器
            </span>
            <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-ink md:text-5xl">
              三分鐘，做出一張
              <span className="whitespace-nowrap text-brand-600">專業的報價單</span>
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
              專為台灣小店家與接案者設計。自動計算營業稅、檢查統一編號、轉換國字大寫金額，完成後直接列印或存成
              PDF，寄給客戶。
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <ButtonLink href="/quote" variant="primary" className="px-6">
                免費開始製作
                <ArrowRight className="size-4" aria-hidden />
              </ButtonLink>
              <ButtonLink href="/templates">瀏覽範本</ButtonLink>
            </div>
            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-600">
              {["自動計算營業稅", "統編即時檢查", "國字大寫金額"].map((t) => (
                <li key={t} className="flex items-center gap-1.5">
                  <Check className="size-4 text-emerald-600" aria-hidden />
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <QuoteMock />
          </Reveal>
        </div>
      </section>

      {/* 痛點 */}
      <section className="mx-auto w-full max-w-6xl px-4 py-12">
        <SectionHeading
          eyebrow="PAIN POINTS"
          title="用 Word、Excel 做報價單，是不是常遇到這些事？"
          description="報價單看起來簡單，但每次都花不少時間在排版與計算上。"
        />
        <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PAINS.map(({ icon: Icon, title, text }) => (
            <RevealItem key={title} className="card p-5">
              <span className="grid size-10 place-items-center rounded-ui bg-amber-50 text-amber-600">
                <Icon className="size-5" aria-hidden />
              </span>
              <h3 className="mt-4 text-[15px] font-bold">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{text}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* 功能特色 */}
      <section className="mx-auto w-full max-w-6xl px-4 py-12">
        <SectionHeading
          eyebrow="FEATURES"
          title="把重複又容易出錯的部分，交給工具"
          description="你只需要專心填內容，計算與排版自動完成。"
        />
        <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, short }) => (
            <RevealItem key={title} className="card p-5 transition-shadow hover:shadow-[0_8px_30px_rgb(15_23_42/0.08)]">
              <span className="grid size-10 place-items-center rounded-ui bg-brand-50 text-brand-700">
                <Icon className="size-5" aria-hidden />
              </span>
              <h3 className="mt-4 text-[15px] font-bold">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{short}</p>
            </RevealItem>
          ))}
        </RevealGroup>
        <Reveal className="mt-6 text-center">
          <Link href="/features" className="inline-flex min-h-11 items-center gap-1 text-sm font-medium text-brand-700 hover:underline">
            查看完整功能介紹
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </Reveal>
      </section>

      {/* 使用步驟 */}
      <section className="mx-auto w-full max-w-6xl px-4 py-12">
        <SectionHeading eyebrow="HOW IT WORKS" title="三個步驟，完成一張報價單" />
        <RevealGroup className="grid gap-4 md:grid-cols-3">
          {STEPS.map(({ icon: Icon, title, text }, i) => (
            <RevealItem key={title} className="card relative p-5">
              <div className="flex items-center gap-3">
                <span className="grid size-8 place-items-center rounded-full bg-brand-700 text-sm font-bold text-white">{i + 1}</span>
                <Icon className="size-5 text-brand-600" aria-hidden />
              </div>
              <h3 className="mt-4 text-[15px] font-bold">{title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{text}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* 適用對象 */}
      <section className="mx-auto w-full max-w-6xl px-4 py-12">
        <SectionHeading
          eyebrow="WHO IT'S FOR"
          title="適合需要常常報價的你"
          description="不論是個人接案還是小型團隊，都能快速做出一致、專業的報價單。"
        />
        <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {AUDIENCES.map(({ icon: Icon, title, text, href }) => {
            const body = (
              <>
                <span className="grid size-10 shrink-0 place-items-center rounded-ui bg-brand-50 text-brand-700">
                  <Icon className="size-5" aria-hidden />
                </span>
                <span>
                  <span className="block text-[15px] font-bold">{title}</span>
                  <span className="mt-1 block text-sm leading-relaxed text-muted">{text}</span>
                </span>
              </>
            );
            return (
              <RevealItem key={title}>
                {href ? (
                  <Link href={href} className="card flex h-full gap-4 p-5 transition-shadow hover:shadow-[0_8px_30px_rgb(15_23_42/0.08)]">
                    {body}
                  </Link>
                ) : (
                  <div className="card flex h-full gap-4 p-5">{body}</div>
                )}
              </RevealItem>
            );
          })}
        </RevealGroup>
      </section>

      {/* FAQ */}
      <section className="mx-auto w-full max-w-3xl px-4 py-12">
        <SectionHeading eyebrow="FAQ" title="常見問題" />
        <Faq items={homeFaqs} />
        <Reveal className="mt-6 text-center">
          <Link href="/faq" className="inline-flex min-h-11 items-center gap-1 text-sm font-medium text-brand-700 hover:underline">
            看更多常見問題
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </Reveal>
      </section>

      <CtaBand />
    </>
  );
}

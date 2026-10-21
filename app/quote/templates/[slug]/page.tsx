import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Lightbulb } from "lucide-react";
import ButtonLink from "@/components/site/ButtonLink";
import CtaBand from "@/components/site/CtaBand";
import PageHero from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { formatNumber } from "@/lib/format";
import { pageMeta } from "@/lib/seo";
import { calcTotals, itemAmount } from "@/lib/tax";
import { TEMPLATES, getTemplate, templateTitle } from "@/lib/templates";

interface Params {
  slug: string;
}

export function generateStaticParams(): Params[] {
  return TEMPLATES.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const t = getTemplate(slug);
  if (!t) return {};
  return pageMeta({
    title: templateTitle(t),
    description: `${t.name}報價單範本：${t.summary}免費線上產生，自動計算營業稅與國字大寫金額，可直接列印或存成 PDF。`,
    path: `/quote/templates/${t.slug}`,
    absoluteTitle: true,
  });
}

export default async function TemplatePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const t = getTemplate(slug);
  if (!t) notFound();

  const totals = calcTotals(t.items, "exclusive");
  const others = TEMPLATES.filter((o) => o.slug !== t.slug);

  return (
    <>
      <PageHero eyebrow="TEMPLATE" title={`${t.name}報價單範本`} description={t.summary}>
        <ButtonLink href={`/quote/app?template=${t.slug}`} variant="primary" className="px-6">
          使用此範本開始編輯
          <ArrowRight className="size-4" aria-hidden />
        </ButtonLink>
      </PageHero>

      <section className="mx-auto w-full max-w-5xl space-y-4 px-4 py-6">
        <Reveal className="space-y-3 text-[15px] leading-relaxed text-slate-700">
          {t.intro.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </Reveal>
      </section>

      <section className="mx-auto w-full max-w-5xl px-4 py-6">
        <Reveal>
          <h2 className="text-xl font-bold">範例品項</h2>
          <p className="mt-1 text-sm text-muted">以下品項與金額僅為示意，請依實際情況調整。</p>
          <div className="card mt-4 overflow-hidden">
            <div className="hidden grid-cols-[2fr_2fr_0.7fr_0.7fr_1fr_1fr] gap-3 bg-brand-50 px-5 py-3 text-xs font-bold text-brand-800 md:grid">
              <span>品名</span>
              <span>規格</span>
              <span>數量</span>
              <span>單位</span>
              <span className="text-right">單價</span>
              <span className="text-right">小計</span>
            </div>
            {t.items.map((it) => (
              <div
                key={it.name}
                className="grid grid-cols-[auto_auto_1fr_auto] gap-x-3 gap-y-1 border-t border-line px-5 py-3 text-sm first:border-t-0 md:grid-cols-[2fr_2fr_0.7fr_0.7fr_1fr_1fr] md:items-center"
              >
                <span className="col-span-4 font-medium md:col-span-1">{it.name}</span>
                <span className="col-span-4 text-slate-600 md:col-span-1">{it.spec}</span>
                <span className="tabular-nums text-slate-600">
                  <span className="text-muted md:hidden">數量 </span>
                  {it.quantity}
                </span>
                <span className="text-slate-600">
                  <span className="text-muted md:hidden">單位 </span>
                  {it.unit}
                </span>
                <span className="tabular-nums text-slate-600 md:text-right">
                  <span className="text-muted md:hidden">單價 </span>
                  {formatNumber(it.unitPrice)}
                </span>
                <span className="text-right font-medium tabular-nums">
                  <span className="font-normal text-muted md:hidden">小計 </span>
                  {formatNumber(itemAmount(it))}
                </span>
              </div>
            ))}
            <div className="flex items-center justify-between border-t border-line bg-slate-50 px-5 py-3 text-sm">
              <span className="text-slate-600">範例合計（未稅）</span>
              <span className="font-bold tabular-nums">NT$ {formatNumber(totals.subtotal)}</span>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto w-full max-w-5xl px-4 py-6">
        <Reveal>
          <div className="rounded-[1rem] border border-brand-200 bg-brand-50 p-5">
            <h2 className="flex items-center gap-2 text-base font-bold text-brand-800">
              <Lightbulb className="size-5" aria-hidden />
              製作{t.name}報價單的小提醒
            </h2>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-slate-700">
              {t.tips.map((tip) => (
                <li key={tip}>{tip}</li>
              ))}
            </ul>
            <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
              <div>
                <div className="text-xs font-bold tracking-widest text-brand-700">付款條件（範例）</div>
                <p className="mt-1 text-slate-700">{t.paymentTerms}</p>
              </div>
              <div>
                <div className="text-xs font-bold tracking-widest text-brand-700">備註（範例）</div>
                <p className="mt-1 text-slate-700">{t.notes}</p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto w-full max-w-5xl px-4 py-6">
        <h2 className="text-base font-bold">其他行業範本</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {others.map((o) => (
            <Link
              key={o.slug}
              href={`/quote/templates/${o.slug}`}
              className="inline-flex min-h-11 items-center rounded-full border border-line bg-white px-4 text-sm text-slate-700 transition-colors hover:border-brand-500 hover:text-brand-700"
            >
              {o.name}報價單
            </Link>
          ))}
        </div>
      </section>

      <CtaBand
        title={`用${t.name}範本開始製作`}
        description="帶入範例品項後，可自由新增、刪除與修改。"
        href={`/quote/app?template=${t.slug}`}
        label="使用此範本開始編輯"
      />
    </>
  );
}

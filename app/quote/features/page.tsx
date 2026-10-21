import type { Metadata } from "next";
import { Check, Info } from "lucide-react";
import CtaBand from "@/components/site/CtaBand";
import PageHero from "@/components/site/PageHero";
import { Reveal, RevealGroup, RevealItem } from "@/components/site/Reveal";
import SectionHeading from "@/components/site/SectionHeading";
import { FEATURES } from "@/components/site/content";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "功能介紹",
  description:
    "統編驗證、國字大寫金額、含稅未稅自動計算、一鍵存 PDF、資料不上傳、手機可用——報價助手（Seqlon Quote）的完整功能說明。",
  path: "/quote/features",
});

const TAX_ROWS = [
  { mode: "未稅（外加 5%）", rule: "營業稅 = 品項合計 × 5%（四捨五入）；總計 = 合計 + 營業稅", example: "合計 10,000 → 稅 500 → 總計 10,500" },
  { mode: "含稅（內含 5%）", rule: "總計 = 品項合計；未稅 = 總計 ÷ 1.05（四捨五入）；稅額 = 總計 − 未稅", example: "合計 10,500 → 未稅 10,000 → 稅 500" },
  { mode: "免稅", rule: "不計營業稅，總計 = 品項合計", example: "合計 10,000 → 總計 10,000" },
];

export default function FeaturesPage() {
  return (
    <>
      <PageHero
        eyebrow="FEATURES"
        title="功能介紹"
        description="專注把報價單做好：自動計算、格式正確、隨時可列印，並且尊重你的資料隱私。"
      />

      <section className="mx-auto w-full max-w-5xl space-y-4 px-4 py-6">
        <RevealGroup className="space-y-4">
          {FEATURES.map(({ icon: Icon, title, detail, points }) => (
            <RevealItem key={title} className="card grid gap-4 p-5 sm:grid-cols-[auto_1fr] sm:gap-6 sm:p-6">
              <span className="grid size-12 place-items-center rounded-ui bg-brand-50 text-brand-700">
                <Icon className="size-6" aria-hidden />
              </span>
              <div>
                <h2 className="text-lg font-bold">{title}</h2>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{detail}</p>
                <ul className="mt-3 space-y-1.5 text-sm text-slate-600">
                  {points.map((p) => (
                    <li key={p} className="flex items-start gap-2">
                      <Check className="mt-0.5 size-4 shrink-0 text-emerald-600" aria-hidden />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      <section className="mx-auto w-full max-w-5xl px-4 py-10">
        <SectionHeading center={false} eyebrow="TAX" title="三種稅別怎麼算" description="以下為計算規則與簡單範例。" />
        <Reveal>
          <div className="card overflow-hidden">
            <div className="hidden grid-cols-[1fr_2fr_1.5fr] gap-4 bg-brand-50 px-5 py-3 text-xs font-bold text-brand-800 md:grid">
              <span>稅別</span>
              <span>計算方式</span>
              <span>範例</span>
            </div>
            {TAX_ROWS.map((r) => (
              <div key={r.mode} className="grid gap-1 border-t border-line px-5 py-4 text-sm first:border-t-0 md:grid-cols-[1fr_2fr_1.5fr] md:gap-4">
                <span className="font-bold">{r.mode}</span>
                <span className="text-slate-600">{r.rule}</span>
                <span className="tabular-nums text-slate-600">{r.example}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="mx-auto w-full max-w-5xl px-4 py-6">
        <Reveal>
          <div className="flex gap-3 rounded-[1rem] border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
            <Info className="mt-0.5 size-5 shrink-0" aria-hidden />
            <div>
              <h2 className="font-bold">使用前請留意</h2>
              <ul className="mt-2 list-disc space-y-1 pl-5 leading-relaxed">
                <li>資料只存在目前的瀏覽器，換電腦、換瀏覽器或清除瀏覽器資料後不會保留，建議完成後存成 PDF 備份。</li>
                <li>統編驗證只檢查號碼格式與檢查碼，不會連線查詢公司登記資料。</li>
                <li>本工具協助計算與排版，報價內容與稅務處理請自行確認，必要時諮詢會計師。</li>
              </ul>
            </div>
          </div>
        </Reveal>
      </section>

      <CtaBand />
    </>
  );
}

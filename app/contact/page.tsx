import type { Metadata } from "next";
import { Check, Mail, MessageCircle } from "lucide-react";
import ButtonLink from "@/components/site/ButtonLink";
import PageHero from "@/components/site/PageHero";
import { Reveal, RevealGroup, RevealItem } from "@/components/site/Reveal";
import { CONTACT_EMAIL, LINE_URL, SOCIAL_LINKS, isPlaceholder } from "@/lib/config";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "預約諮詢",
  description: "告訴我們你的產業與需求，序隆科技會盡快回覆。透過 Email 或 LINE 官方帳號預約 AI 本地化或軟體開發諮詢。",
  path: "/contact",
});

const BRIEF = ["你的產業與公司規模", "想解決的問題，或想做的系統／想用 AI 處理的工作", "會用到哪些資料或現有系統（例如合約、手冊、規章、表單）", "預計使用的人數", "現有的網路、設備或系統狀況（如果知道的話）"];

export default function ContactPage() {
  const emailReady = !isPlaceholder(CONTACT_EMAIL);
  const lineReady = !isPlaceholder(LINE_URL);

  return (
    <>
      <PageHero
        eyebrow="CONTACT"
        title="預約諮詢"
        description="告訴我們你的產業與需求，我們會盡快回覆。"
      />
      <section className="container-x py-6">
        <RevealGroup className="grid gap-4 md:grid-cols-2">
          <RevealItem className="card flex flex-col p-6">
            <span className="grid size-11 place-items-center rounded-ui bg-brand-50 text-brand-700">
              <Mail className="size-5" aria-hidden />
            </span>
            <h2 className="mt-4 text-lg font-bold">Email</h2>
            <p className="mt-1 break-all text-sm text-slate-600">{CONTACT_EMAIL}</p>
            {emailReady && (
              <div className="mt-4">
                <ButtonLink href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("預約諮詢")}`} variant="primary">
                  寄信預約
                </ButtonLink>
              </div>
            )}
          </RevealItem>

          <RevealItem className="card flex flex-col p-6">
            <span className="grid size-11 place-items-center rounded-ui bg-emerald-50 text-emerald-600">
              <MessageCircle className="size-5" aria-hidden />
            </span>
            <h2 className="mt-4 text-lg font-bold">LINE 官方帳號</h2>
            <p className="mt-1 break-all text-sm text-slate-600">{lineReady ? "歡迎加入好友，直接傳訊息給我們" : LINE_URL}</p>
            {lineReady && (
              <div className="mt-4">
                <ButtonLink href={LINE_URL} variant="primary" external>
                  加入 LINE
                </ButtonLink>
              </div>
            )}
          </RevealItem>
        </RevealGroup>

        <Reveal className="mt-6">
          <div className="rounded-[1rem] border border-brand-200 bg-brand-50 p-5">
            <h2 className="text-base font-bold text-brand-800">聯絡時可以先告訴我們</h2>
            <ul className="mt-3 space-y-1.5 text-sm text-slate-700">
              {BRIEF.map((b) => (
                <li key={b} className="flex items-start gap-2">
                  <Check className="mt-0.5 size-4 shrink-0 text-brand-700" aria-hidden />
                  {b}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-muted">不確定也沒關係，我們可以在諮詢時一起釐清。</p>
          </div>
        </Reveal>

        <div className="mt-6 text-sm text-slate-600">
          <p>回覆時間：[回覆時間說明]</p>
          {SOCIAL_LINKS.length > 0 && (
            <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1">
              {SOCIAL_LINKS.map((s) => (
                <li key={s.label}>
                  {isPlaceholder(s.href) ? (
                    <span className="text-slate-400">{s.label}：{s.href}</span>
                  ) : (
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline">
                      {s.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import { Mail, MessageCircle } from "lucide-react";
import ButtonLink from "@/components/site/ButtonLink";
import PageHero from "@/components/site/PageHero";
import { RevealGroup, RevealItem } from "@/components/site/Reveal";
import { CONTACT_EMAIL, LINE_URL, SOCIAL_LINKS, isPlaceholder } from "@/lib/config";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "聯絡方式",
  description: "有問題或建議嗎？歡迎透過 Email 或 LINE 官方帳號聯絡我們。",
  path: "/contact",
});

export default function ContactPage() {
  const emailReady = !isPlaceholder(CONTACT_EMAIL);
  const lineReady = !isPlaceholder(LINE_URL);

  return (
    <>
      <PageHero
        eyebrow="CONTACT"
        title="聯絡方式"
        description="使用上的問題、功能建議或合作想法，都歡迎來信或加入 LINE 官方帳號。"
      />
      <section className="mx-auto w-full max-w-5xl px-4 py-6">
        <RevealGroup className="grid gap-4 md:grid-cols-2">
          <RevealItem className="card flex flex-col p-6">
            <span className="grid size-11 place-items-center rounded-ui bg-brand-50 text-brand-700">
              <Mail className="size-5" aria-hidden />
            </span>
            <h2 className="mt-4 text-lg font-bold">Email</h2>
            <p className="mt-1 break-all text-sm text-slate-600">{CONTACT_EMAIL}</p>
            {emailReady && (
              <div className="mt-4">
                <ButtonLink href={`mailto:${CONTACT_EMAIL}`} variant="primary">
                  寄信給我們
                </ButtonLink>
              </div>
            )}
          </RevealItem>

          <RevealItem className="card flex flex-col p-6">
            <span className="grid size-11 place-items-center rounded-ui bg-emerald-50 text-emerald-600">
              <MessageCircle className="size-5" aria-hidden />
            </span>
            <h2 className="mt-4 text-lg font-bold">LINE 官方帳號</h2>
            <p className="mt-1 break-all text-sm text-slate-600">{lineReady ? "歡迎加入好友詢問" : LINE_URL}</p>
            {lineReady && (
              <div className="mt-4">
                <ButtonLink href={LINE_URL} variant="primary" external>
                  加入 LINE
                </ButtonLink>
              </div>
            )}
          </RevealItem>
        </RevealGroup>

        <div className="mt-6 text-sm text-slate-600">
          <p>回覆時間：[回覆時間說明]</p>
          {SOCIAL_LINKS.length > 0 && (
            <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1">
              {SOCIAL_LINKS.map((s) => (
                <li key={s.label}>
                  {isPlaceholder(s.href) ? (
                    <span className="text-slate-400">{s.label}：{s.href}</span>
                  ) : (
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-brand-700 hover:underline">
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

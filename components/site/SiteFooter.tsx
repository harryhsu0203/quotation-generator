import Link from "next/link";
import Logo from "./Logo";
import {
  COMPANY_BLURB,
  COMPANY_NAME_EN,
  COMPANY_NAME_ZH,
  CONTACT_EMAIL,
  LINE_URL,
  SOCIAL_LINKS,
  isPlaceholder,
} from "@/lib/config";
import { PRODUCTS, isAvailable } from "@/lib/products";

function Col({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="mb-3 text-sm font-bold text-ink">{title}</h2>
      <ul className="space-y-2 text-sm text-slate-600">{children}</ul>
    </div>
  );
}

const linkCls = "inline-block py-0.5 transition-colors hover:text-brand-600";

/** 有真實連結時渲染成連結，佔位文字則顯示為一般文字。 */
function MaybeLink({ href, children, mail }: { href: string; children: React.ReactNode; mail?: boolean }) {
  if (isPlaceholder(href)) return <span className="text-slate-400">{children}</span>;
  return (
    <a
      href={mail ? `mailto:${href}` : href}
      className={linkCls}
      {...(mail ? {} : { target: "_blank", rel: "noopener noreferrer" })}
    >
      {children}
    </a>
  );
}

async function currentYear(): Promise<number> {
  "use cache";
  return new Date().getFullYear();
}

export default async function SiteFooter() {
  const year = await currentYear();
  return (
    <footer className="no-print mt-8 border-t border-line bg-white pb-24 md:pb-0">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Link href="/" aria-label={`${COMPANY_NAME_EN} 首頁`}>
            <Logo />
          </Link>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">{COMPANY_BLURB}</p>
        </div>

        <Col title="產品">
          {PRODUCTS.map((p) => (
            <li key={p.slug}>
              {isAvailable(p) ? (
                <Link href={p.href} className={linkCls}>
                  {p.name}
                  {p.nameZh ? ` ${p.nameZh}` : ""}
                </Link>
              ) : (
                <span className="text-slate-400">{p.name}（即將推出）</span>
              )}
            </li>
          ))}
          <li><Link href="/quote/templates" className={linkCls}>報價單範本</Link></li>
        </Col>

        <Col title="公司">
          <li><Link href="/about" className={linkCls}>關於 {COMPANY_NAME_EN}</Link></li>
          <li><Link href="/contact" className={linkCls}>聯絡我們</Link></li>
          <li><Link href="/faq" className={linkCls}>常見問題</Link></li>
          <li><Link href="/privacy" className={linkCls}>隱私權政策</Link></li>
          <li><Link href="/terms" className={linkCls}>使用條款</Link></li>
        </Col>

        <Col title="聯絡方式">
          <li><MaybeLink href={CONTACT_EMAIL} mail>{CONTACT_EMAIL}</MaybeLink></li>
          <li><MaybeLink href={LINE_URL}>LINE 官方帳號</MaybeLink></li>
          {SOCIAL_LINKS.map((s) => (
            <li key={s.label}><MaybeLink href={s.href}>{s.label}</MaybeLink></li>
          ))}
        </Col>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-4 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <span>© {year} {COMPANY_NAME_ZH} {COMPANY_NAME_EN}. All rights reserved.</span>
          <span className="flex gap-4">
            <Link href="/privacy" className="py-1 hover:text-brand-600">隱私權政策</Link>
            <Link href="/terms" className="py-1 hover:text-brand-600">使用條款</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}

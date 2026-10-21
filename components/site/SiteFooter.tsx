import Link from "next/link";
import Logo from "./Logo";
import {
  BRAND_TAGLINE_EN,
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
      <div className="container-x grid gap-8 py-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1fr]">
        <div className="sm:col-span-2 lg:col-span-1">
          <Link href="/" aria-label={`${COMPANY_NAME_EN} 首頁`}>
            <Logo />
          </Link>
          <p className="mt-3 font-display text-sm font-bold tracking-[-0.01em] text-ink">{BRAND_TAGLINE_EN}</p>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted">{COMPANY_BLURB}</p>
        </div>

        <Col title="服務">
          <li><Link href="/services#ai" className={linkCls}>AI 本地化</Link></li>
          <li><Link href="/services#software" className={linkCls}>軟體開發</Link></li>
          <li><Link href="/solutions" className={linkCls}>解決方案</Link></li>
          <li><Link href="/process" className={linkCls}>導入與開發流程</Link></li>
        </Col>

        <Col title="資源">
          {PRODUCTS.map((p) => (
            <li key={p.slug}>
              <Link href={p.href} className={linkCls}>
                {p.name}
                {!isAvailable(p) && <span className="text-slate-400">（即將推出）</span>}
              </Link>
            </li>
          ))}
          <li><Link href="/tools" className={linkCls}>所有工具</Link></li>
          <li><Link href="/faq" className={linkCls}>常見問題</Link></li>
        </Col>

        <Col title="公司">
          <li><Link href="/about" className={linkCls}>關於我們</Link></li>
          <li><Link href="/privacy" className={linkCls}>隱私權政策</Link></li>
          <li><Link href="/terms" className={linkCls}>使用條款</Link></li>
        </Col>

        <Col title="聯絡">
          <li><Link href="/contact" className={linkCls}>預約諮詢</Link></li>
          <li><MaybeLink href={CONTACT_EMAIL} mail>{CONTACT_EMAIL}</MaybeLink></li>
          <li><MaybeLink href={LINE_URL}>LINE 官方帳號</MaybeLink></li>
          {SOCIAL_LINKS.map((s) => (
            <li key={s.label}><MaybeLink href={s.href}>{s.label}</MaybeLink></li>
          ))}
        </Col>
      </div>

      <div className="border-t border-line">
        <div className="container-x flex flex-col gap-2 py-4 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <span>© {year} {COMPANY_NAME_ZH} {COMPANY_NAME_EN}</span>
          <span className="flex gap-4">
            <Link href="/privacy" className="py-1 hover:text-brand-600">隱私權政策</Link>
            <Link href="/terms" className="py-1 hover:text-brand-600">使用條款</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}

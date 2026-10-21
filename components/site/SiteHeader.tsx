"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, Menu, X } from "lucide-react";
import ButtonLink from "./ButtonLink";
import Logo from "./Logo";
import { EASE } from "@/components/ui";
import { SITE_FULL_NAME } from "@/lib/config";
import { PRIMARY_START_HREF, PRODUCTS, isAvailable } from "@/lib/products";

const LINKS = [
  { href: "/about", label: "關於" },
  { href: "/contact", label: "聯絡" },
];

function ComingSoonBadge() {
  return (
    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-muted">即將推出</span>
  );
}

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);
  const menuRef = useRef<HTMLDivElement>(null);

  // 換頁時收起選單（在 render 期間比對路徑，避免在 effect 內 setState）
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
    setMenuOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 產品下拉：點擊外部或按 Esc 關閉
  useEffect(() => {
    if (!menuOpen) return;
    const onDown = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const productActive = PRODUCTS.some((p) => isAvailable(p) && isActive(p.href));
  const linkCls = (active: boolean) =>
    `rounded-ui px-3 py-2 text-sm font-medium transition-colors ${
      active ? "bg-brand-50 text-brand-600" : "text-slate-600 hover:bg-slate-100 hover:text-ink"
    }`;

  return (
    <header
      className={`no-print sticky top-0 z-40 border-b transition-[background-color,box-shadow,border-color,backdrop-filter] duration-300 ${
        scrolled || open
          ? "border-line bg-white/80 shadow-[0_1px_8px_rgb(11_27_43/0.06)] backdrop-blur-lg"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4">
        <Link href="/" aria-label={`${SITE_FULL_NAME} 首頁`} className="rounded-ui py-1 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-500/25">
          <Logo />
        </Link>

        <nav aria-label="主選單" className="hidden items-center gap-1 md:flex">
          <div ref={menuRef} className="relative">
            <button
              type="button"
              aria-expanded={menuOpen}
              aria-haspopup="true"
              onClick={() => setMenuOpen((o) => !o)}
              className={`${linkCls(productActive || menuOpen)} inline-flex items-center gap-1`}
            >
              產品
              <motion.span animate={{ rotate: menuOpen ? 180 : 0 }} transition={{ duration: 0.2, ease: EASE }}>
                <ChevronDown className="size-4" aria-hidden />
              </motion.span>
            </button>
            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.98 }}
                  transition={{ duration: 0.18, ease: EASE }}
                  className="card absolute left-0 top-full mt-2 w-80 p-2 shadow-xl"
                >
                  {PRODUCTS.map((p) => {
                    const Icon = p.icon;
                    const inner = (
                      <>
                        <span
                          className={`grid size-9 shrink-0 place-items-center rounded-ui ${
                            isAvailable(p) ? "bg-brand-50 text-brand-700" : "bg-slate-100 text-slate-400"
                          }`}
                        >
                          <Icon className="size-[18px]" aria-hidden />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="flex items-center gap-2">
                            <span className="text-sm font-bold">{p.name}</span>
                            {p.nameZh && <span className="text-xs text-muted">{p.nameZh}</span>}
                            {!isAvailable(p) && <ComingSoonBadge />}
                          </span>
                          <span className="mt-0.5 line-clamp-2 block text-xs leading-relaxed text-muted">
                            {p.description}
                          </span>
                        </span>
                      </>
                    );
                    return isAvailable(p) ? (
                      <Link key={p.slug} href={p.href} className="flex gap-3 rounded-ui p-2.5 transition-colors hover:bg-slate-50">
                        {inner}
                      </Link>
                    ) : (
                      <div key={p.slug} aria-disabled="true" className="flex gap-3 rounded-ui p-2.5 opacity-70">
                        {inner}
                      </div>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} aria-current={isActive(l.href) ? "page" : undefined} className={linkCls(isActive(l.href))}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ButtonLink href={PRIMARY_START_HREF} variant="primary" className="hidden sm:inline-flex">
            開始使用
          </ButtonLink>
          <button
            type="button"
            aria-label={open ? "關閉選單" : "開啟選單"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="grid size-11 place-items-center rounded-ui text-slate-700 hover:bg-slate-100 md:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.nav
            aria-label="手機選單"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="overflow-hidden md:hidden"
          >
            <div className="space-y-1 px-4 pb-4 pt-1">
              <div className="px-3 pb-1 pt-2 text-xs font-bold tracking-widest text-muted">產品</div>
              {PRODUCTS.map((p) => {
                const Icon = p.icon;
                const body = (
                  <>
                    <Icon className="size-[18px] shrink-0" aria-hidden />
                    <span className="font-medium">{p.name}</span>
                    {p.nameZh && <span className="text-xs text-muted">{p.nameZh}</span>}
                    {!isAvailable(p) && <ComingSoonBadge />}
                  </>
                );
                return isAvailable(p) ? (
                  <Link
                    key={p.slug}
                    href={p.href}
                    aria-current={isActive(p.href) ? "page" : undefined}
                    className={`flex min-h-12 items-center gap-2.5 rounded-ui px-3 text-[15px] ${
                      isActive(p.href) ? "bg-brand-50 text-brand-600" : "text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    {body}
                  </Link>
                ) : (
                  <div key={p.slug} aria-disabled="true" className="flex min-h-12 items-center gap-2.5 px-3 text-[15px] text-slate-400">
                    {body}
                  </div>
                );
              })}
              <div className="my-2 border-t border-line" />
              {LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  aria-current={isActive(l.href) ? "page" : undefined}
                  className={`flex min-h-12 items-center rounded-ui px-3 text-[15px] font-medium ${
                    isActive(l.href) ? "bg-brand-50 text-brand-600" : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {l.label}
                </Link>
              ))}
              <Link
                href={PRIMARY_START_HREF}
                className="mt-2 flex min-h-12 items-center justify-center rounded-ui bg-brand-700 text-[15px] font-medium text-white"
              >
                開始使用
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

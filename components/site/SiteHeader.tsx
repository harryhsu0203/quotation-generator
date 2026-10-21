"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import ButtonLink from "./ButtonLink";
import Logo from "./Logo";
import { EASE } from "@/components/ui";
import { SITE_FULL_NAME } from "@/lib/config";
import { PRODUCTS, isAvailable } from "@/lib/products";

const NAV_BEFORE_TOOLS = [
  { href: "/services", label: "服務" },
  { href: "/solutions", label: "解決方案" },
  { href: "/process", label: "導入流程" },
];
const NAV_AFTER_TOOLS = [{ href: "/about", label: "關於我們" }];
const TOOL_PREFIXES = ["/tools", "/quote", "/invoice"];

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

  // 免費工具下拉：點擊外部或按 Esc 關閉
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
  const toolsActive = TOOL_PREFIXES.some(isActive);
  const linkCls = (active: boolean) =>
    `rounded-ui px-3 py-2 text-sm font-medium transition-colors ${
      active ? "bg-brand-50 text-brand-600" : "text-slate-600 hover:bg-slate-100 hover:text-ink"
    }`;
  const mobileLinkCls = (active: boolean) =>
    `flex min-h-12 items-center rounded-ui px-3 text-[15px] font-medium ${
      active ? "bg-brand-50 text-brand-600" : "text-slate-700 hover:bg-slate-100"
    }`;

  return (
    <header
      className={`no-print sticky top-0 z-40 border-b transition-[background-color,box-shadow,border-color,backdrop-filter] duration-300 ${
        scrolled || open
          ? "border-line bg-white/80 shadow-[0_1px_8px_rgb(11_27_43/0.06)] backdrop-blur-lg"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="container-x flex h-14 items-center justify-between gap-4">
        <Link
          href="/"
          aria-label={`${SITE_FULL_NAME} 首頁`}
          className="rounded-ui py-1 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-500/25"
        >
          <Logo />
        </Link>

        <nav aria-label="主選單" className="hidden items-center gap-1 md:flex">
          {NAV_BEFORE_TOOLS.map((l) => (
            <Link key={l.href} href={l.href} aria-current={isActive(l.href) ? "page" : undefined} className={linkCls(isActive(l.href))}>
              {l.label}
            </Link>
          ))}

          <div ref={menuRef} className="relative">
            <button
              type="button"
              aria-expanded={menuOpen}
              aria-haspopup="true"
              onClick={() => setMenuOpen((o) => !o)}
              className={`${linkCls(toolsActive || menuOpen)} inline-flex items-center gap-1`}
            >
              免費工具
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
                    return (
                      <Link key={p.slug} href={p.href} className="flex gap-3 rounded-ui p-2.5 transition-colors hover:bg-slate-50">
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
                            {!isAvailable(p) && <ComingSoonBadge />}
                          </span>
                          <span className="mt-0.5 line-clamp-2 block text-xs leading-relaxed text-muted">{p.description}</span>
                        </span>
                      </Link>
                    );
                  })}
                  <Link
                    href="/tools"
                    className="mt-1 flex items-center justify-between rounded-ui border-t border-line px-3 py-2.5 text-sm font-medium text-brand-600 hover:bg-slate-50"
                  >
                    查看所有免費工具
                    <ArrowRight className="size-4" aria-hidden />
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {NAV_AFTER_TOOLS.map((l) => (
            <Link key={l.href} href={l.href} aria-current={isActive(l.href) ? "page" : undefined} className={linkCls(isActive(l.href))}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ButtonLink href="/contact" variant="primary" className="hidden sm:inline-flex">
            預約諮詢
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
              {NAV_BEFORE_TOOLS.map((l) => (
                <Link key={l.href} href={l.href} aria-current={isActive(l.href) ? "page" : undefined} className={mobileLinkCls(isActive(l.href))}>
                  {l.label}
                </Link>
              ))}
              <Link href="/tools" aria-current={pathname === "/tools" ? "page" : undefined} className={mobileLinkCls(toolsActive)}>
                免費工具
              </Link>
              {PRODUCTS.map((p) => {
                const Icon = p.icon;
                return (
                  <Link
                    key={p.slug}
                    href={p.href}
                    className="flex min-h-11 items-center gap-2.5 rounded-ui pl-8 pr-3 text-sm text-slate-600 hover:bg-slate-100"
                  >
                    <Icon className="size-4 shrink-0" aria-hidden />
                    {p.name}
                    {!isAvailable(p) && <ComingSoonBadge />}
                  </Link>
                );
              })}
              {NAV_AFTER_TOOLS.map((l) => (
                <Link key={l.href} href={l.href} aria-current={isActive(l.href) ? "page" : undefined} className={mobileLinkCls(isActive(l.href))}>
                  {l.label}
                </Link>
              ))}
              <Link
                href="/contact"
                className="mt-2 flex min-h-12 items-center justify-center rounded-ui bg-brand-700 text-[15px] font-medium text-white"
              >
                預約諮詢
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

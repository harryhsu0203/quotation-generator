"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { FileText, Menu, X } from "lucide-react";
import ButtonLink from "./ButtonLink";
import { EASE } from "@/components/ui";
import { NAV_LINKS, SITE_NAME } from "@/lib/config";

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);

  // 換頁時收起手機選單（在 render 期間比對路徑，避免在 effect 內 setState）
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header
      className={`no-print sticky top-0 z-40 border-b transition-[background-color,box-shadow,border-color,backdrop-filter] duration-300 ${
        scrolled || open
          ? "border-line bg-white/80 shadow-[0_1px_8px_rgb(15_23_42/0.06)] backdrop-blur-lg"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4">
        <Link href="/" className="flex items-center gap-2.5" aria-label={`${SITE_NAME} 首頁`}>
          <span className="grid size-8 place-items-center rounded-ui bg-brand-700 text-white shadow-sm">
            <FileText className="size-[18px]" aria-hidden />
          </span>
          <span className="text-[15px] font-bold tracking-tight">{SITE_NAME}</span>
        </Link>

        <nav aria-label="主選單" className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={isActive(l.href) ? "page" : undefined}
              className={`rounded-ui px-3 py-2 text-sm font-medium transition-colors ${
                isActive(l.href) ? "bg-brand-50 text-brand-700" : "text-slate-600 hover:bg-slate-100 hover:text-ink"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ButtonLink href="/quote" variant="primary" className="hidden sm:inline-flex">
            開始製作
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
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  aria-current={isActive(l.href) ? "page" : undefined}
                  className={`flex min-h-12 items-center rounded-ui px-3 text-[15px] font-medium ${
                    isActive(l.href) ? "bg-brand-50 text-brand-700" : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {l.label}
                </Link>
              ))}
              <Link
                href="/quote"
                className="mt-2 flex min-h-12 items-center justify-center rounded-ui bg-brand-700 text-[15px] font-medium text-white"
              >
                開始製作
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

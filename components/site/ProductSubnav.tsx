"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ButtonLink from "./ButtonLink";
import { QUOTE_PRODUCT } from "@/lib/products";

const ITEMS = [
  { href: "/quote", label: "介紹", exact: true },
  { href: "/quote/features", label: "功能" },
  { href: "/quote/templates", label: "範本" },
];

/** Seqlon Quote 產品頁的次級導覽（工具頁本身有自己的操作列，不顯示）。 */
export default function ProductSubnav() {
  const pathname = usePathname();
  if (pathname === "/quote/app") return null;

  return (
    <div className="no-print border-b border-line bg-white/70 backdrop-blur">
      <div className="mx-auto flex h-12 max-w-6xl items-center justify-between gap-3 px-4">
        <div className="flex min-w-0 items-center gap-1 overflow-x-auto">
          <span className="mr-2 hidden whitespace-nowrap text-sm font-bold sm:inline">
            {QUOTE_PRODUCT.name} <span className="font-normal text-muted">{QUOTE_PRODUCT.nameZh}</span>
          </span>
          {ITEMS.map((it) => {
            const active = it.exact ? pathname === it.href : pathname.startsWith(it.href);
            return (
              <Link
                key={it.href}
                href={it.href}
                aria-current={active ? "page" : undefined}
                className={`whitespace-nowrap rounded-ui px-3 py-2 text-sm font-medium transition-colors ${
                  active ? "bg-brand-50 text-brand-600" : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {it.label}
              </Link>
            );
          })}
        </div>
        <ButtonLink href="/quote/app" variant="primary" className="shrink-0 sm:hidden">
          開始使用
        </ButtonLink>
      </div>
    </div>
  );
}

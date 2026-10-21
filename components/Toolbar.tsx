"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, FilePlus2, FileText, Printer } from "lucide-react";
import { Button, EASE } from "./ui";
import { SITE_NAME } from "@/lib/config";

interface Props {
  saved: boolean;
  onNew: () => void;
  onPrint: () => void;
}

export default function Toolbar({ saved, onNew, onPrint }: Props) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`no-print sticky top-0 z-30 border-b transition-[background-color,box-shadow,border-color,backdrop-filter] duration-300 ${
        scrolled
          ? "border-line bg-white/75 shadow-[0_1px_8px_rgb(15_23_42/0.06)] backdrop-blur-lg"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-14 max-w-[1600px] items-center justify-between gap-3 px-4">
        <div className="flex items-center gap-2.5">
          <span className="grid size-8 place-items-center rounded-ui bg-brand-700 text-white shadow-sm">
            <FileText className="size-[18px]" aria-hidden />
          </span>
          <span className="text-[15px] font-bold tracking-tight">{SITE_NAME}</span>
        </div>

        <div className="flex items-center gap-2">
          <AnimatePresence>
            {saved && (
              <motion.span
                key="saved"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2, ease: EASE }}
                role="status"
                className="mr-1 inline-flex items-center gap-1 text-xs font-medium text-emerald-600"
              >
                <Check className="size-3.5" aria-hidden />
                <span className="hidden sm:inline">已自動儲存</span>
                <span className="sm:hidden">已儲存</span>
              </motion.span>
            )}
          </AnimatePresence>
          <Button variant="secondary" onClick={onNew}>
            <FilePlus2 className="size-4" aria-hidden />
            <span className="hidden sm:inline">新報價單</span>
            <span className="sr-only sm:hidden">新報價單</span>
          </Button>
          <Button variant="primary" onClick={onPrint}>
            <Printer className="size-4" aria-hidden />
            <span className="hidden sm:inline">列印 / 存 PDF</span>
            <span className="sr-only sm:hidden">列印 / 存 PDF</span>
          </Button>
        </div>
      </div>
    </header>
  );
}

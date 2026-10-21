"use client";

import { AnimatePresence, motion } from "motion/react";
import { Check, FilePlus2, Printer } from "lucide-react";
import { Button, EASE } from "./ui";

interface Props {
  saved: boolean;
  onNew: () => void;
  onPrint: () => void;
}

/** 報價單工具的操作列（固定在全站導覽列下方）。 */
export default function Toolbar({ saved, onNew, onPrint }: Props) {
  return (
    <div className="no-print sticky top-14 z-30 border-b border-line bg-white/80 backdrop-blur-lg">
      <div className="container-x flex h-14 items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <h1 className="text-[15px] font-bold tracking-tight">報價單工具</h1>
          <AnimatePresence>
            {saved && (
              <motion.span
                key="saved"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2, ease: EASE }}
                role="status"
                className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600"
              >
                <Check className="size-3.5" aria-hidden />
                已自動儲存
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-2">
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
    </div>
  );
}

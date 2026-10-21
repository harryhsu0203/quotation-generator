"use client";

import { AnimatePresence, motion } from "motion/react";
import { Check, Download, FilePlus2, Loader2, Printer, TriangleAlert } from "lucide-react";
import { Button, EASE } from "./ui";

interface Props {
  saved: boolean;
  exporting: boolean;
  exportError: string;
  onNew: () => void;
  onPrint: () => void;
  onExport: () => void;
}

/** 報價單工具的操作列（固定在全站導覽列下方）。 */
export default function Toolbar({ saved, exporting, exportError, onNew, onPrint, onExport }: Props) {
  return (
    <div className="no-print sticky top-14 z-30 border-b border-line bg-white/80 backdrop-blur-lg">
      <div className="container-x flex h-14 items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <h1 className="shrink-0 text-[15px] font-bold tracking-tight">報價單工具</h1>
          <AnimatePresence>
            {exportError ? (
              <motion.span
                key="error"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2, ease: EASE }}
                role="alert"
                className="inline-flex min-w-0 items-center gap-1 text-xs font-medium text-red-600"
              >
                <TriangleAlert className="size-3.5 shrink-0" aria-hidden />
                <span className="truncate">{exportError}</span>
              </motion.span>
            ) : (
              saved && (
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
                  <span className="hidden sm:inline">已自動儲存</span>
                  <span className="sr-only sm:hidden">已儲存</span>
                </motion.span>
              )
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="secondary" onClick={onNew}>
            <FilePlus2 className="size-4" aria-hidden />
            <span className="hidden sm:inline">新報價單</span>
            <span className="sr-only sm:hidden">新報價單</span>
          </Button>
          <Button variant="secondary" onClick={onPrint}>
            <Printer className="size-4" aria-hidden />
            <span className="hidden sm:inline">列印</span>
            <span className="sr-only sm:hidden">列印</span>
          </Button>
          <Button variant="primary" onClick={onExport} disabled={exporting} aria-busy={exporting}>
            {exporting ? (
              <Loader2 className="size-4 animate-spin" aria-hidden />
            ) : (
              <Download className="size-4" aria-hidden />
            )}
            <span>{exporting ? "產生中…" : "下載 PDF"}</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

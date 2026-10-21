"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { EASE } from "@/components/ui";
import type { FaqItem } from "@/lib/faq";

export default function Faq({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <div className="space-y-3">
      {items.map((f) => {
        const isOpen = open === f.id;
        return (
          <div key={f.id} className="card overflow-hidden">
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`faq-${f.id}`}
                onClick={() => setOpen(isOpen ? null : f.id)}
                className="flex min-h-14 w-full items-center justify-between gap-3 px-4 py-3 text-left text-[15px] font-bold transition-colors hover:bg-slate-50/70 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-brand-500/25 sm:px-5"
              >
                {f.q}
                <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.25, ease: EASE }}>
                  <ChevronDown className="size-5 shrink-0 text-muted" aria-hidden />
                </motion.span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`faq-${f.id}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: EASE }}
                  style={{ overflow: "hidden" }}
                >
                  <p className="border-t border-line px-4 py-4 text-sm leading-relaxed text-slate-600 sm:px-5">{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

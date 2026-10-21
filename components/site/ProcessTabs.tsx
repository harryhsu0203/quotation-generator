"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Braces, Server } from "lucide-react";
import { EASE } from "@/components/ui";
import { PROCESS_STEPS, SOFTWARE_PROCESS_STEPS, type ProcessStep } from "@/lib/services";

type Flow = "ai" | "software";

const FLOWS: { id: Flow; label: string; icon: typeof Server; intro: string; steps: ProcessStep[] }[] = [
  {
    id: "ai",
    label: "AI 本地化導入",
    icon: Server,
    intro: "六個階段，從需求訪談到持續維運。時程與費用依專案規模而定，評估後再與你討論。",
    steps: PROCESS_STEPS,
  },
  {
    id: "software",
    label: "軟體開發",
    icon: Braces,
    intro: "六個階段，先確認範圍與報價、再設計與開發。時程與費用依需求而定，規劃後提供。",
    steps: SOFTWARE_PROCESS_STEPS,
  },
];

export default function ProcessTabs() {
  const [flow, setFlow] = useState<Flow>("ai");

  // 支援 /process#software 直接開啟軟體開發流程
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- 掛載後才能讀取網址 hash
    if (window.location.hash === "#software") setFlow("software");
  }, []);

  const current = FLOWS.find((f) => f.id === flow) ?? FLOWS[0];

  return (
    <div>
      <div role="tablist" aria-label="流程類型" className="relative inline-flex rounded-ui bg-slate-100 p-1">
        {FLOWS.map((f) => {
          const Icon = f.icon;
          const active = flow === f.id;
          return (
            <button
              key={f.id}
              type="button"
              role="tab"
              id={`flow-tab-${f.id}`}
              aria-selected={active}
              aria-controls="flow-panel"
              onClick={() => setFlow(f.id)}
              className={`relative inline-flex min-h-11 items-center gap-2 rounded-[0.5rem] px-4 text-sm font-medium transition-colors ${active ? "text-ink" : "text-muted"}`}
            >
              {active && (
                <motion.span
                  layoutId="flow-pill"
                  className="absolute inset-0 rounded-[0.5rem] bg-white shadow-sm"
                  transition={{ duration: 0.22, ease: EASE }}
                />
              )}
              <Icon className="relative size-4" aria-hidden />
              <span className="relative">{f.label}</span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={flow}
          id="flow-panel"
          role="tabpanel"
          aria-labelledby={`flow-tab-${flow}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.22, ease: EASE }}
          className="mt-5"
        >
          <p className="max-w-3xl text-sm text-muted">{current.intro}</p>
          <div className="mt-5 grid gap-4 xl:grid-cols-2">
            {current.steps.map((s, i) => (
              <div key={s.id} className="card flex gap-4 p-5 sm:gap-5 sm:p-6">
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-brand-700 font-display text-base font-bold text-white">
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <h2 className="text-lg font-bold">{s.title}</h2>
                  <p className="mt-1 text-sm text-slate-600">{s.summary}</p>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-ui bg-brand-50/70 p-4">
                      <div className="text-xs font-bold tracking-widest text-brand-600">我們會做</div>
                      <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-slate-700">
                        {s.we.map((w) => (
                          <li key={w}>{w}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-ui bg-slate-50 p-4">
                      <div className="text-xs font-bold tracking-widest text-muted">需要你提供</div>
                      <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-slate-700">
                        {s.you.map((y) => (
                          <li key={y}>{y}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

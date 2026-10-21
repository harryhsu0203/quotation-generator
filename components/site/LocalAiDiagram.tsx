"use client";

import { motion, useReducedMotion } from "motion/react";
import { Cloud, Database, Lock, Server, Users, type LucideIcon } from "lucide-react";

function Node({
  icon: Icon,
  title,
  sub,
  highlight,
}: {
  icon: LucideIcon;
  title: string;
  sub: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex w-[5.25rem] shrink-0 flex-col items-center text-center sm:w-28 lg:w-32 xl:w-36">
      <span
        className={`grid size-14 place-items-center rounded-2xl shadow-sm sm:size-16 lg:size-20 xl:size-24 xl:rounded-3xl ${
          highlight ? "bg-brand-700 text-white shadow-[0_8px_24px_rgb(47_107_255/0.35)]" : "border border-line bg-white text-brand-700"
        }`}
      >
        <Icon className="size-6 sm:size-7 lg:size-9 xl:size-11" aria-hidden />
      </span>
      <span className="mt-2 text-xs font-bold leading-tight text-ink sm:text-sm lg:mt-3 lg:text-base">{title}</span>
      <span className="mt-0.5 text-[11px] leading-tight text-muted sm:text-xs lg:text-sm">{sub}</span>
    </div>
  );
}

function Connector({ delay = 0 }: { delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <div className="relative h-px min-w-4 flex-1 bg-brand-200 lg:h-0.5">
      {!reduce && (
        <motion.span
          className="absolute -top-[3px] size-[7px] rounded-full bg-brand-700 lg:-top-[5px] lg:size-3"
          animate={{ left: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, delay }}
        />
      )}
    </div>
  );
}

/** 公司內網 → 本地 AI 主機 → 員工使用；資料不經過外部雲端。可填滿父層高度。 */
export default function LocalAiDiagram() {
  return (
    <div
      className="flex h-full w-full flex-col justify-center gap-5 lg:gap-8"
      role="img"
      aria-label="架構示意：公司內網的資料送到本地 AI 主機，再由員工使用；資料不經過外部雲端"
    >
      <div className="relative rounded-[1.5rem] border-2 border-dashed border-brand-200 bg-white/80 p-5 pt-9 shadow-[var(--shadow-paper)] lg:flex lg:flex-1 lg:items-center lg:rounded-[2rem] lg:p-10 lg:pt-14">
        <span className="absolute -top-3 left-5 inline-flex items-center gap-1.5 rounded-full bg-brand-800 px-3 py-1 text-xs font-medium text-white lg:-top-4 lg:left-8 lg:px-4 lg:py-1.5 lg:text-sm">
          <Lock className="size-3 lg:size-4" aria-hidden />
          你的環境（自有主機與內網）
        </span>
        <div className="flex w-full items-start justify-between gap-1">
          <Node icon={Database} title="公司內網" sub="文件・資料" />
          <div className="flex h-14 flex-1 items-center sm:h-16 lg:h-20 xl:h-24">
            <Connector />
          </div>
          <Node icon={Server} title="本地 AI 主機" sub="模型・知識庫" highlight />
          <div className="flex h-14 flex-1 items-center sm:h-16 lg:h-20 xl:h-24">
            <Connector delay={1} />
          </div>
          <Node icon={Users} title="員工使用" sub="內部介面" />
        </div>
      </div>

      <div className="flex items-center justify-center gap-3 text-xs text-muted lg:text-sm">
        <span className="h-px w-8 border-t border-dashed border-slate-300 lg:w-16" />
        <span className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-slate-300 bg-white/60 px-3 py-1.5 lg:px-5 lg:py-2.5">
          <Cloud className="size-4 text-slate-400 lg:size-5" aria-hidden />
          <span className="line-through decoration-slate-400">外部雲端</span>
          <span>資料不經過</span>
        </span>
        <span className="h-px w-8 border-t border-dashed border-slate-300 lg:w-16" />
      </div>
    </div>
  );
}

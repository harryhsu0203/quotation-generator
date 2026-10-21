"use client";

import { motion } from "motion/react";
import { BRAND_ASSETS, SITE_NAME } from "@/lib/config";

/** 首頁 Hero 右側的品牌視覺：Logo 置於柔和的色塊與格線上。 */
export default function BrandVisual() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-sm" aria-hidden>
      <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-brand-100 via-white to-brand-50 shadow-[var(--shadow-paper)]" />
      <div
        className="absolute inset-0 rounded-[2rem] opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(rgb(11 27 43 / 0.05) 1px, transparent 1px), linear-gradient(90deg, rgb(11 27 43 / 0.05) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <motion.div
        className="absolute inset-0 grid place-items-center"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
      >
        <div className="flex flex-col items-center gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={BRAND_ASSETS.mark} alt="" width={132} height={132} className="size-32" />
          <span className="font-display text-4xl font-bold tracking-[-0.03em] text-ink">{SITE_NAME}</span>
        </div>
      </motion.div>
    </div>
  );
}

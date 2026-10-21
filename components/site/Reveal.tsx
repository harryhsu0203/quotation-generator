"use client";

import { motion } from "motion/react";
import { EASE, fadeUp, staggerParent } from "@/components/ui";

const VIEWPORT = { once: true, margin: "-60px" } as const;

/** 捲動進入畫面時淡入上移。 */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.4, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/** 一組依序淡入的子項目（搭配 RevealItem）。 */
export function RevealGroup({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={staggerParent} initial="hidden" whileInView="show" viewport={VIEWPORT}>
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div className={className} variants={fadeUp}>
      {children}
    </motion.div>
  );
}

"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { EASE, buttonClass } from "@/components/ui";

interface Props {
  href: string;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  className?: string;
  external?: boolean;
  children: React.ReactNode;
}

/** 外觀與 Button 一致的連結按鈕（含 hover / 按下動畫）。 */
export default function ButtonLink({ href, variant = "secondary", className = "", external, children }: Props) {
  const cls = `${buttonClass(variant)} ${className}`;
  return (
    <motion.span
      className="inline-flex"
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.96 }}
      transition={{ duration: 0.15, ease: EASE }}
    >
      {external ? (
        <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      ) : (
        <Link href={href} className={cls}>
          {children}
        </Link>
      )}
    </motion.span>
  );
}

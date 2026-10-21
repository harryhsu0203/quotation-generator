"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type HTMLMotionProps,
  type Variants,
} from "motion/react";
import { ChevronDown, type LucideIcon } from "lucide-react";

/** 共用緩動與時間（150–400ms） */
export const EASE = [0.22, 1, 0.36, 1] as const;

export const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.04 } },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE } },
};

/* ---------- Button ---------- */

type Variant = "primary" | "secondary" | "ghost" | "danger";

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-brand-700 text-white shadow-[0_1px_2px_rgb(15_23_42/0.2),inset_0_1px_0_rgb(255_255_255/0.15)] hover:bg-brand-600",
  secondary: "bg-white text-ink border border-line shadow-sm hover:border-slate-300 hover:bg-slate-50",
  ghost: "text-slate-600 hover:bg-slate-100",
  danger: "text-red-600 hover:bg-red-50",
};

export function buttonClass(variant: Variant = "secondary"): string {
  return `inline-flex min-h-11 items-center justify-center gap-2 rounded-ui px-4 text-sm font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-500/25 disabled:cursor-not-allowed disabled:opacity-40 md:min-h-10 ${VARIANTS[variant]}`;
}

export function Button({
  variant = "secondary",
  className = "",
  children,
  ...props
}: HTMLMotionProps<"button"> & { variant?: Variant }) {
  const disabled = props.disabled;
  return (
    <motion.button
      type="button"
      whileHover={disabled ? undefined : { y: -1 }}
      whileTap={disabled ? undefined : { scale: 0.96 }}
      transition={{ duration: 0.15, ease: EASE }}
      className={`${buttonClass(variant)} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}

export function IconButton({
  label,
  className = "",
  children,
  ...props
}: HTMLMotionProps<"button"> & { label: string }) {
  const disabled = props.disabled;
  return (
    <motion.button
      type="button"
      aria-label={label}
      title={label}
      whileHover={disabled ? undefined : { y: -1 }}
      whileTap={disabled ? undefined : { scale: 0.9 }}
      transition={{ duration: 0.15, ease: EASE }}
      className={`inline-flex size-11 items-center justify-center rounded-ui border border-line bg-white text-slate-600 transition-colors hover:bg-slate-50 hover:text-ink focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-500/25 disabled:cursor-not-allowed disabled:opacity-35 md:size-9 ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}

/* ---------- 可收合區塊 ---------- */

export function Section({
  icon: Icon,
  title,
  description,
  summary,
  defaultOpen = true,
  children,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  /** 收合時顯示的摘要 */
  summary?: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <motion.section variants={fadeUp} className="card overflow-hidden">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="flex min-h-16 w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-slate-50/70 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-brand-500/25 sm:px-5"
      >
        <span className="grid size-9 shrink-0 place-items-center rounded-ui bg-brand-50 text-brand-700">
          <Icon className="size-[18px]" aria-hidden />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[15px] font-bold">{title}</span>
          <span className="block truncate text-xs text-muted">
            {!open && summary ? summary : description}
          </span>
        </span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25, ease: EASE }}>
          <ChevronDown className="size-5 text-muted" aria-hidden />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: EASE }}
            style={{ overflow: "hidden" }}
          >
            <div className="border-t border-line p-4 sm:p-5">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}

export function Field({
  label,
  children,
  full,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  full?: boolean;
  hint?: string;
}) {
  return (
    <label className={`label ${full ? "sm:col-span-2" : ""}`}>
      {label}
      <span className="mt-1.5 block">{children}</span>
      <AnimatePresence initial={false}>
        {hint && (
          <motion.span
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: EASE }}
            className="block overflow-hidden text-xs font-normal text-amber-600"
          >
            <span className="mt-1.5 block">{hint}</span>
          </motion.span>
        )}
      </AnimatePresence>
    </label>
  );
}

/* ---------- 數字滾動 ---------- */

/** 數值變動時以 count-up 滾動過渡；初次渲染直接顯示，不閃動。 */
export function CountUp({
  value,
  format,
  className,
}: {
  value: number;
  format: (n: number) => string;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const mv = useMotionValue(value);
  const text = useTransform(mv, (v) => format(Math.round(v)));
  const first = useRef(true);

  useEffect(() => {
    if (first.current || reduce) {
      first.current = false;
      mv.set(value);
      return;
    }
    const controls = animate(mv, value, { duration: 0.4, ease: EASE });
    return () => controls.stop();
  }, [value, reduce, mv]);

  return <motion.span className={className}>{text}</motion.span>;
}

"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowDown, FileDown, ShieldCheck, Type } from "lucide-react";
import { Button, fadeUp, staggerParent } from "./ui";

const FEATURES = [
  { icon: ShieldCheck, title: "統編驗證", text: "輸入時即時檢查統一編號" },
  { icon: Type, title: "國字大寫", text: "總計自動轉為大寫金額" },
  { icon: FileDown, title: "一鍵存 PDF", text: "A4 排版，直接列印或存檔" },
];

export default function Hero({ onStart }: { onStart: () => void }) {
  const reduce = useReducedMotion();
  return (
    <section className="no-print mx-auto w-full max-w-[1600px] px-4 pb-6 pt-8 md:pt-10">
      <motion.div
        variants={staggerParent}
        initial={reduce ? "show" : "hidden"}
        animate="show"
        className="grid items-center gap-6 lg:grid-cols-[1.25fr_1fr] lg:gap-12"
      >
        <div>
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700"
          >
            免費・免註冊・資料只存在你的瀏覽器
          </motion.span>
          <motion.h2 variants={fadeUp} className="mt-3 text-3xl font-bold leading-tight tracking-tight text-ink md:text-4xl">
            三分鐘，做出一張
            <span className="text-brand-600">專業的報價單</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted">
            專為台灣小店家與接案者設計。自動計算營業稅、轉換國字大寫，完成後直接列印或存成 PDF 寄給客戶。
          </motion.p>
          <motion.div variants={fadeUp} className="mt-5">
            <Button variant="primary" className="px-5" onClick={onStart}>
              開始製作報價單
              <ArrowDown className="size-4" aria-hidden />
            </Button>
          </motion.div>
        </div>

        <ul className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
          {FEATURES.map(({ icon: Icon, title, text }) => (
            <motion.li
              key={title}
              variants={fadeUp}
              className="card flex items-center gap-3 px-4 py-3"
            >
              <span className="grid size-9 shrink-0 place-items-center rounded-ui bg-brand-50 text-brand-700">
                <Icon className="size-[18px]" aria-hidden />
              </span>
              <span>
                <span className="block text-sm font-bold">{title}</span>
                <span className="block text-xs text-muted">{text}</span>
              </span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}

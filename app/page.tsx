"use client";

import { useEffect, useRef, useState } from "react";
import { MotionConfig, motion, useAnimationControls } from "motion/react";
import { Eye, PencilLine } from "lucide-react";
import ConfirmDialog from "@/components/ConfirmDialog";
import EditorForm from "@/components/EditorForm";
import Hero from "@/components/Hero";
import QuotePreview from "@/components/QuotePreview";
import Toolbar from "@/components/Toolbar";
import { EASE } from "@/components/ui";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { DEFAULT_VALID_DAYS, SITE_NAME } from "@/lib/config";
import { nextQuoteNumber } from "@/lib/quote-number";
import { DRAFT_KEY, SELLER_KEY, getStore } from "@/lib/storage";
import {
  addDays,
  emptyParty,
  emptySeller,
  newItem,
  toDateInput,
  type Quote,
  type Seller,
} from "@/lib/types";

/** SSR 與首次渲染使用的穩定初始值（不含日期、單號、隨機 id）。 */
const blankQuote: Quote = {
  number: "",
  date: "",
  validUntil: "",
  customer: emptyParty,
  items: [],
  taxMode: "exclusive",
  notes: "",
  paymentTerms: "",
};

function freshQuote(): Quote {
  const today = toDateInput(new Date());
  return {
    ...blankQuote,
    number: nextQuoteNumber(getStore()),
    date: today,
    validUntil: addDays(today, DEFAULT_VALID_DAYS),
    items: [newItem()],
  };
}

type Tab = "edit" | "preview";

export default function Home() {
  const [seller, setSeller, sellerState] = useLocalStorage(SELLER_KEY, emptySeller);
  const [quote, setQuote, draftState] = useLocalStorage<Quote>(DRAFT_KEY, blankQuote);
  const [tab, setTab] = useState<Tab>("edit");
  const [confirmNew, setConfirmNew] = useState(false);
  const [saved, setSaved] = useState(false);

  const interacted = useRef(false);
  const prevTab = useRef<Tab>("edit");
  const editCtl = useAnimationControls();
  const previewCtl = useAnimationControls();

  const ready = sellerState.ready && draftState.ready;
  const savedAt = Math.max(sellerState.savedAt, draftState.savedAt);

  // 沒有草稿時，載入後自動產生單號、日期與一列空白品項
  useEffect(() => {
    if (draftState.ready && quote.number === "") setQuote(freshQuote());
  }, [draftState.ready, quote.number, setQuote]);

  // 使用者編輯後儲存完成，短暫顯示「已自動儲存」
  useEffect(() => {
    if (!savedAt || !interacted.current) return;
    setSaved(true);
    const t = setTimeout(() => setSaved(false), 1800);
    return () => clearTimeout(t);
  }, [savedAt]);

  // 手機「編輯／預覽」左右滑動
  useEffect(() => {
    if (prevTab.current === tab) return;
    const dir = tab === "preview" ? 1 : -1;
    prevTab.current = tab;
    const ctl = tab === "preview" ? previewCtl : editCtl;
    ctl.set({ x: dir * 28, opacity: 0 });
    ctl.start({ x: 0, opacity: 1, transition: { duration: 0.28, ease: EASE } });
  }, [tab, editCtl, previewCtl]);

  const changeSeller = (s: Seller) => {
    interacted.current = true;
    setSeller(s);
  };
  const changeQuote = (q: Quote) => {
    interacted.current = true;
    setQuote(q);
  };

  const startNew = () => {
    interacted.current = true;
    setQuote(freshQuote());
    setConfirmNew(false);
    setTab("edit");
  };

  const scrollToTool = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById("tool")?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  };

  return (
    <MotionConfig reducedMotion="user">
      <Toolbar saved={saved} onNew={() => setConfirmNew(true)} onPrint={() => window.print()} />
      <Hero onStart={scrollToTool} />

      <main id="tool" className="mx-auto w-full max-w-[1600px] flex-1 scroll-mt-16 px-4 pb-28 lg:pb-12">
        {!ready ? (
          <p className="no-print py-16 text-center text-sm text-muted">載入中…</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] xl:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
            <motion.div
              animate={editCtl}
              className={`no-print ${tab === "edit" ? "block" : "hidden"} lg:block`}
            >
              <EditorForm
                seller={seller}
                quote={quote}
                onSellerChange={changeSeller}
                onQuoteChange={changeQuote}
              />
            </motion.div>
            <motion.div
              animate={previewCtl}
              className={`print-area ${tab === "preview" ? "block" : "hidden"} lg:sticky lg:top-20 lg:block lg:self-start`}
            >
              <QuotePreview seller={seller} quote={quote} />
            </motion.div>
          </div>
        )}
      </main>

      <footer className="no-print hidden pb-8 text-center text-xs text-muted lg:block">
        {SITE_NAME}・資料僅儲存在你的瀏覽器，不會上傳
      </footer>

      {/* 手機底部切換列 */}
      <nav
        aria-label="編輯與預覽切換"
        className="no-print fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white/85 pb-[env(safe-area-inset-bottom)] backdrop-blur-lg lg:hidden"
      >
        <div className="mx-auto grid max-w-md grid-cols-2 gap-1 p-1.5">
          {(
            [
              ["edit", "編輯", PencilLine],
              ["preview", "預覽", Eye],
            ] as const
          ).map(([id, label, Icon]) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              aria-pressed={tab === id}
              className={`relative flex min-h-12 items-center justify-center gap-2 rounded-ui text-sm font-medium transition-colors ${
                tab === id ? "text-brand-700" : "text-muted"
              }`}
            >
              {tab === id && (
                <motion.span
                  layoutId="tab-pill"
                  className="absolute inset-0 rounded-ui bg-brand-50"
                  transition={{ duration: 0.25, ease: EASE }}
                />
              )}
              <Icon className="relative size-[18px]" aria-hidden />
              <span className="relative">{label}</span>
            </button>
          ))}
        </div>
      </nav>

      <ConfirmDialog
        open={confirmNew}
        title="建立新的報價單？"
        message="目前的客戶與品項內容會被清除，我方資訊會保留。此動作無法復原。"
        confirmLabel="清除並新建"
        onConfirm={startNew}
        onCancel={() => setConfirmNew(false)}
      />
    </MotionConfig>
  );
}

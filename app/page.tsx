"use client";

import { useEffect, useState } from "react";
import EditorForm from "@/components/EditorForm";
import QuotePreview from "@/components/QuotePreview";
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

export default function Home() {
  const [seller, setSeller, sellerState] = useLocalStorage(SELLER_KEY, emptySeller);
  const [quote, setQuote, draftState] = useLocalStorage<Quote>(DRAFT_KEY, blankQuote);
  const [tab, setTab] = useState<"edit" | "preview">("edit");

  const ready = sellerState.ready && draftState.ready;

  // 沒有草稿時，載入後自動產生單號、日期與一列空白品項
  useEffect(() => {
    if (draftState.ready && quote.number === "") {
      setQuote(freshQuote());
    }
  }, [draftState.ready, quote.number, setQuote]);

  const tabBtn = (id: "edit" | "preview", label: string) => (
    <button
      type="button"
      onClick={() => setTab(id)}
      className={`flex-1 py-2 text-sm font-medium ${
        tab === id ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="flex min-h-screen flex-col">
      <header className="no-print sticky top-0 z-10 border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-4 py-3">
          <h1 className="text-lg font-bold">{SITE_NAME}</h1>
          <button
            type="button"
            onClick={() => window.print()}
            className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            列印 / 存 PDF
          </button>
        </div>
        <div className="flex border-t border-gray-100 lg:hidden">
          {tabBtn("edit", "編輯")}
          {tabBtn("preview", "預覽")}
        </div>
      </header>

      {!ready ? (
        <p className="no-print p-6 text-center text-gray-500">載入中…</p>
      ) : (
        <main className="mx-auto grid w-full max-w-[1600px] flex-1 grid-cols-1 gap-6 p-4 lg:grid-cols-2">
          <div className={`no-print ${tab === "edit" ? "block" : "hidden"} lg:block`}>
            <EditorForm
              seller={seller}
              quote={quote}
              onSellerChange={setSeller}
              onQuoteChange={setQuote}
              onNewQuote={() => setQuote(freshQuote())}
            />
          </div>
          <div
            className={`print-area ${tab === "preview" ? "block" : "hidden"} lg:block lg:sticky lg:top-20 lg:self-start`}
          >
            <QuotePreview seller={seller} quote={quote} />
          </div>
        </main>
      )}
    </div>
  );
}

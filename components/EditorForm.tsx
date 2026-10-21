"use client";

import { useState } from "react";
import ItemsTable from "./ItemsTable";
import { fileToCompressedDataUrl } from "@/lib/image";
import { isValidTaxId } from "@/lib/tax-id";
import type { TaxMode } from "@/lib/tax";
import type { Party, Quote, Seller } from "@/lib/types";

interface Props {
  seller: Seller;
  quote: Quote;
  onSellerChange: (s: Seller) => void;
  onQuoteChange: (q: Quote) => void;
  onNewQuote: () => void;
}

const input =
  "mt-1 w-full rounded border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <h2 className="mb-3 text-base font-semibold">{title}</h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">{children}</div>
    </section>
  );
}

function Field({
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
    <label className={`block text-sm text-gray-700 ${full ? "sm:col-span-2" : ""}`}>
      {label}
      {children}
      {hint && <span className="mt-1 block text-xs text-amber-600">{hint}</span>}
    </label>
  );
}

function taxIdHint(id: string): string | undefined {
  if (id === "") return undefined;
  if (!/^\d{8}$/.test(id)) return "統一編號應為 8 碼數字";
  if (!isValidTaxId(id)) return "統一編號檢查碼不符，請確認是否輸入正確";
  return undefined;
}

const TAX_OPTIONS: { value: TaxMode; label: string }[] = [
  { value: "exclusive", label: "未稅（外加 5%）" },
  { value: "inclusive", label: "含稅（內含 5%）" },
  { value: "none", label: "免稅" },
];

export default function EditorForm({
  seller,
  quote,
  onSellerChange,
  onQuoteChange,
  onNewQuote,
}: Props) {
  const [imgError, setImgError] = useState("");

  const setSeller = (patch: Partial<Seller>) => onSellerChange({ ...seller, ...patch });
  const setQuote = (patch: Partial<Quote>) => onQuoteChange({ ...quote, ...patch });
  const setCustomer = (patch: Partial<Party>) =>
    setQuote({ customer: { ...quote.customer, ...patch } });

  const upload = async (file: File | undefined, key: "logo" | "stamp") => {
    if (!file) return;
    setImgError("");
    try {
      setSeller({ [key]: await fileToCompressedDataUrl(file, key === "logo" ? 400 : 300) });
    } catch (e) {
      setImgError(e instanceof Error ? e.message : "圖片處理失敗");
    }
  };

  const imageField = (key: "logo" | "stamp", label: string) => (
    <Field label={label}>
      <input
        type="file"
        accept="image/*"
        className="mt-1 block w-full text-sm file:mr-3 file:rounded file:border-0 file:bg-gray-100 file:px-3 file:py-2"
        onChange={(e) => {
          upload(e.target.files?.[0], key);
          e.target.value = "";
        }}
      />
      {seller[key] && (
        <span className="mt-2 flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={seller[key]} alt={label} className="h-12 max-w-[8rem] object-contain" />
          <button type="button" className="text-xs text-red-600 underline" onClick={() => setSeller({ [key]: "" })}>
            移除
          </button>
        </span>
      )}
    </Field>
  );

  const sellerHint = taxIdHint(seller.taxId);
  const customerHint = taxIdHint(quote.customer.taxId);

  return (
    <div className="space-y-4">
      <Section title="我方資訊（會自動記住）">
        <Field label="公司名稱">
          <input className={input} value={seller.name} onChange={(e) => setSeller({ name: e.target.value })} />
        </Field>
        <Field label="統一編號" hint={sellerHint}>
          <input className={input} inputMode="numeric" maxLength={8} value={seller.taxId} onChange={(e) => setSeller({ taxId: e.target.value.trim() })} />
        </Field>
        <Field label="地址" full>
          <input className={input} value={seller.address} onChange={(e) => setSeller({ address: e.target.value })} />
        </Field>
        <Field label="電話">
          <input className={input} type="tel" value={seller.phone} onChange={(e) => setSeller({ phone: e.target.value })} />
        </Field>
        <Field label="Email">
          <input className={input} type="email" value={seller.email} onChange={(e) => setSeller({ email: e.target.value })} />
        </Field>
        <Field label="聯絡人">
          <input className={input} value={seller.contact} onChange={(e) => setSeller({ contact: e.target.value })} />
        </Field>
        <div className="hidden sm:block" />
        {imageField("logo", "公司 Logo")}
        {imageField("stamp", "印章圖")}
        {imgError && <p className="text-sm text-red-600 sm:col-span-2">{imgError}</p>}
      </Section>

      <Section title="客戶資訊">
        <Field label="公司名稱">
          <input className={input} value={quote.customer.name} onChange={(e) => setCustomer({ name: e.target.value })} />
        </Field>
        <Field label="統一編號" hint={customerHint}>
          <input className={input} inputMode="numeric" maxLength={8} value={quote.customer.taxId} onChange={(e) => setCustomer({ taxId: e.target.value.trim() })} />
        </Field>
        <Field label="聯絡人">
          <input className={input} value={quote.customer.contact} onChange={(e) => setCustomer({ contact: e.target.value })} />
        </Field>
        <Field label="電話">
          <input className={input} type="tel" value={quote.customer.phone} onChange={(e) => setCustomer({ phone: e.target.value })} />
        </Field>
        <Field label="地址" full>
          <input className={input} value={quote.customer.address} onChange={(e) => setCustomer({ address: e.target.value })} />
        </Field>
      </Section>

      <Section title="報價資訊">
        <Field label="報價單號（自動產生）">
          <input className={input} value={quote.number} onChange={(e) => setQuote({ number: e.target.value })} />
        </Field>
        <div className="hidden sm:block" />
        <Field label="報價日期">
          <input className={input} type="date" value={quote.date} onChange={(e) => setQuote({ date: e.target.value })} />
        </Field>
        <Field label="有效期限">
          <input className={input} type="date" value={quote.validUntil} onChange={(e) => setQuote({ validUntil: e.target.value })} />
        </Field>
      </Section>

      <section className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
        <h2 className="mb-3 text-base font-semibold">報價品項</h2>
        <ItemsTable items={quote.items} onChange={(items) => setQuote({ items })} />
      </section>

      <Section title="稅別">
        <div className="flex flex-wrap gap-4 sm:col-span-2">
          {TAX_OPTIONS.map((o) => (
            <label key={o.value} className="flex items-center gap-2 text-sm">
              <input type="radio" name="taxMode" checked={quote.taxMode === o.value} onChange={() => setQuote({ taxMode: o.value })} />
              {o.label}
            </label>
          ))}
        </div>
      </Section>

      <Section title="備註與付款條件">
        <Field label="備註" full>
          <textarea className={input} rows={3} value={quote.notes} onChange={(e) => setQuote({ notes: e.target.value })} />
        </Field>
        <Field label="付款條件" full>
          <textarea className={input} rows={3} value={quote.paymentTerms} onChange={(e) => setQuote({ paymentTerms: e.target.value })} />
        </Field>
      </Section>

      <button
        type="button"
        onClick={() => {
          if (window.confirm("要清除目前內容並建立新的報價單嗎？（我方資訊會保留）")) onNewQuote();
        }}
        className="rounded border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        新增空白報價單
      </button>
    </div>
  );
}

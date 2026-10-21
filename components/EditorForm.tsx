"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Building2, ImagePlus, ListChecks, NotebookText, Receipt, UserRound, X } from "lucide-react";
import ItemsTable from "./ItemsTable";
import { Field, Section, staggerParent } from "./ui";
import { fileToCompressedDataUrl } from "@/lib/image";
import { isValidTaxId } from "@/lib/tax-id";
import type { TaxMode } from "@/lib/tax";
import type { Party, Quote, Seller } from "@/lib/types";

interface Props {
  seller: Seller;
  quote: Quote;
  onSellerChange: (s: Seller) => void;
  onQuoteChange: (q: Quote) => void;
}

function taxIdHint(id: string): string | undefined {
  if (id === "") return undefined;
  if (!/^\d{8}$/.test(id)) return "統一編號應為 8 碼數字";
  if (!isValidTaxId(id)) return "統一編號檢查碼不符，請確認是否輸入正確";
  return undefined;
}

const TAX_OPTIONS: { value: TaxMode; label: string; note: string }[] = [
  { value: "exclusive", label: "未稅", note: "外加 5%" },
  { value: "inclusive", label: "含稅", note: "內含 5%" },
  { value: "none", label: "免稅", note: "不計營業稅" },
];

export default function EditorForm({ seller, quote, onSellerChange, onQuoteChange }: Props) {
  const [imgError, setImgError] = useState("");
  // 我方資訊已填過就預設收合（掛載時 seller 已從 localStorage 載入）
  const [sellerFilled] = useState(() => seller.name.trim() !== "");

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
    <div>
      <span className="label">{label}</span>
      <div className="mt-1.5 flex items-center gap-3">
        <label className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-ui border border-dashed border-slate-300 bg-slate-50 px-3 text-sm text-slate-600 transition-colors hover:border-brand-500 hover:bg-brand-50 hover:text-brand-700 md:min-h-10">
          <ImagePlus className="size-4" aria-hidden />
          {seller[key] ? "更換圖片" : "上傳圖片"}
          <input
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={(e) => {
              upload(e.target.files?.[0], key);
              e.target.value = "";
            }}
          />
        </label>
        {seller[key] && (
          <span className="flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={seller[key]} alt={label} className="h-10 max-w-[6rem] rounded border border-line bg-white object-contain p-0.5" />
            <button
              type="button"
              aria-label={`移除${label}`}
              onClick={() => setSeller({ [key]: "" })}
              className="grid size-8 place-items-center rounded-full text-slate-500 hover:bg-red-50 hover:text-red-600"
            >
              <X className="size-4" />
            </button>
          </span>
        )}
      </div>
    </div>
  );

  const sellerSummary = seller.name
    ? `${seller.name}${seller.taxId ? `　統編 ${seller.taxId}` : ""}`
    : undefined;
  const customerSummary = quote.customer.name || undefined;
  const grid = "grid grid-cols-1 gap-4 sm:grid-cols-2";

  return (
    <motion.div variants={staggerParent} initial="hidden" animate="show" className="space-y-4">
      <Section
        icon={Building2}
        title="我方資訊"
        description="只需填一次，下次開啟會自動帶入"
        summary={sellerSummary}
        defaultOpen={!sellerFilled}
      >
        <div className={grid}>
          <Field label="公司名稱">
            <input className="input" placeholder="例：好日子設計工作室" value={seller.name} onChange={(e) => setSeller({ name: e.target.value })} />
          </Field>
          <Field label="統一編號" hint={taxIdHint(seller.taxId)}>
            <input className="input tabular-nums" inputMode="numeric" maxLength={8} placeholder="例：04595257" value={seller.taxId} onChange={(e) => setSeller({ taxId: e.target.value.trim() })} />
          </Field>
          <Field label="地址" full>
            <input className="input" placeholder="例：台北市中正區重慶南路一段 122 號" value={seller.address} onChange={(e) => setSeller({ address: e.target.value })} />
          </Field>
          <Field label="電話">
            <input className="input" type="tel" placeholder="例：02-2345-6789" value={seller.phone} onChange={(e) => setSeller({ phone: e.target.value })} />
          </Field>
          <Field label="Email">
            <input className="input" type="email" placeholder="例：hello@example.com" value={seller.email} onChange={(e) => setSeller({ email: e.target.value })} />
          </Field>
          <Field label="聯絡人">
            <input className="input" placeholder="例：業務窗口" value={seller.contact} onChange={(e) => setSeller({ contact: e.target.value })} />
          </Field>
          <div className="hidden sm:block" />
          {imageField("logo", "公司 Logo")}
          {imageField("stamp", "印章圖")}
          {imgError && <p className="text-sm text-red-600 sm:col-span-2">{imgError}</p>}
        </div>
      </Section>

      <Section
        icon={UserRound}
        title="客戶資訊"
        description="報價對象的公司與聯絡方式"
        summary={customerSummary}
      >
        <div className={grid}>
          <Field label="公司名稱">
            <input className="input" placeholder="例：大安股份有限公司" value={quote.customer.name} onChange={(e) => setCustomer({ name: e.target.value })} />
          </Field>
          <Field label="統一編號" hint={taxIdHint(quote.customer.taxId)}>
            <input className="input tabular-nums" inputMode="numeric" maxLength={8} placeholder="例：22099131" value={quote.customer.taxId} onChange={(e) => setCustomer({ taxId: e.target.value.trim() })} />
          </Field>
          <Field label="聯絡人">
            <input className="input" placeholder="例：採購部經理" value={quote.customer.contact} onChange={(e) => setCustomer({ contact: e.target.value })} />
          </Field>
          <Field label="電話">
            <input className="input" type="tel" placeholder="例：0912-345-678" value={quote.customer.phone} onChange={(e) => setCustomer({ phone: e.target.value })} />
          </Field>
          <Field label="地址" full>
            <input className="input" placeholder="例：台北市大安區忠孝東路四段 1 號" value={quote.customer.address} onChange={(e) => setCustomer({ address: e.target.value })} />
          </Field>
        </div>
      </Section>

      <Section
        icon={ListChecks}
        title="報價品項"
        description="品名、數量與單價，可調整順序"
        summary={`${quote.items.length} 個品項`}
      >
        <ItemsTable items={quote.items} onChange={(items) => setQuote({ items })} />
      </Section>

      <Section
        icon={Receipt}
        title="報價資訊"
        description="單號、日期與稅別"
        summary={`${quote.number}　${TAX_OPTIONS.find((o) => o.value === quote.taxMode)?.label}`}
      >
        <div className={grid}>
          <Field label="報價單號（自動產生）" full>
            <input className="input tabular-nums" value={quote.number} onChange={(e) => setQuote({ number: e.target.value })} />
          </Field>
          <Field label="報價日期">
            <input className="input" type="date" value={quote.date} onChange={(e) => setQuote({ date: e.target.value })} />
          </Field>
          <Field label="有效期限">
            <input className="input" type="date" value={quote.validUntil} onChange={(e) => setQuote({ validUntil: e.target.value })} />
          </Field>
          <fieldset className="sm:col-span-2">
            <legend className="label">稅別</legend>
            <div className="mt-1.5 grid grid-cols-3 gap-2">
              {TAX_OPTIONS.map((o) => {
                const active = quote.taxMode === o.value;
                return (
                  <label
                    key={o.value}
                    className={`relative flex min-h-14 cursor-pointer flex-col items-center justify-center rounded-ui border px-2 py-2 text-center transition-colors focus-within:ring-4 focus-within:ring-brand-500/20 ${
                      active ? "border-brand-600 bg-brand-50 text-brand-800" : "border-line bg-white hover:border-slate-300"
                    }`}
                  >
                    <input type="radio" name="taxMode" className="sr-only" checked={active} onChange={() => setQuote({ taxMode: o.value })} />
                    <span className="text-sm font-bold">{o.label}</span>
                    <span className="text-xs text-muted">{o.note}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>
        </div>
      </Section>

      <Section icon={NotebookText} title="備註與付款條件" description="會顯示在報價單下方" defaultOpen={false}
        summary={quote.paymentTerms || quote.notes || undefined}
      >
        <div className="grid grid-cols-1 gap-4">
          <Field label="付款條件">
            <textarea className="input" rows={3} placeholder={"例：簽約後付 50%，完成驗收後付尾款 50%"} value={quote.paymentTerms} onChange={(e) => setQuote({ paymentTerms: e.target.value })} />
          </Field>
          <Field label="備註">
            <textarea className="input" rows={3} placeholder="例：本報價不含網域與主機費用" value={quote.notes} onChange={(e) => setQuote({ notes: e.target.value })} />
          </Field>
        </div>
      </Section>
    </motion.div>
  );
}

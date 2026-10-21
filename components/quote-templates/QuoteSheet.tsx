import ClassicTemplate from "./ClassicTemplate";
import FormalTemplate from "./FormalTemplate";
import MinimalTemplate from "./MinimalTemplate";
import ModernTemplate from "./ModernTemplate";
import type { QuoteStyle } from "@/lib/quote-style";
import type { Quote, Seller } from "@/lib/types";

const TEMPLATES = {
  classic: ClassicTemplate,
  modern: ModernTemplate,
  minimal: MinimalTemplate,
  formal: FormalTemplate,
} as const;

/** 依所選版面渲染一張報價單（預覽、列印、匯出 PDF 共用）。主題色以 CSS 變數 --accent 傳入。 */
export default function QuoteSheet({ seller, quote, style }: { seller: Seller; quote: Quote; style: QuoteStyle }) {
  const Template = TEMPLATES[style.layout];
  return (
    <div style={{ "--accent": style.accent } as React.CSSProperties}>
      <Template seller={seller} quote={quote} />
    </div>
  );
}

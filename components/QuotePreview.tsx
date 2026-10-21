import ScaledPaper from "./ScaledPaper";
import ClassicTemplate from "./quote-templates/ClassicTemplate";
import FormalTemplate from "./quote-templates/FormalTemplate";
import MinimalTemplate from "./quote-templates/MinimalTemplate";
import ModernTemplate from "./quote-templates/ModernTemplate";
import type { QuoteStyle } from "@/lib/quote-style";
import type { Quote, Seller } from "@/lib/types";

interface Props {
  seller: Seller;
  quote: Quote;
  style: QuoteStyle;
}

const TEMPLATES = {
  classic: ClassicTemplate,
  modern: ModernTemplate,
  minimal: MinimalTemplate,
  formal: FormalTemplate,
} as const;

/** 依所選版面渲染報價單；四種版面共用同一份資料，主題色以 --accent 傳入。 */
export default function QuotePreview({ seller, quote, style }: Props) {
  const Template = TEMPLATES[style.layout];
  return (
    <ScaledPaper>
      <div style={{ "--accent": style.accent } as React.CSSProperties}>
        <Template seller={seller} quote={quote} />
      </div>
    </ScaledPaper>
  );
}

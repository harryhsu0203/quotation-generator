import ScaledPaper from "./ScaledPaper";
import QuoteSheet from "./quote-templates/QuoteSheet";
import type { QuoteStyle } from "@/lib/quote-style";
import type { Quote, Seller } from "@/lib/types";

interface Props {
  seller: Seller;
  quote: Quote;
  style: QuoteStyle;
}

/** 預覽：以 A4 寬度排版並等比縮放。 */
export default function QuotePreview({ seller, quote, style }: Props) {
  return (
    <ScaledPaper>
      <QuoteSheet seller={seller} quote={quote} style={style} />
    </ScaledPaper>
  );
}

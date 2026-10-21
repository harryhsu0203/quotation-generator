import { buildFontCss } from "./fonts";
import { PAGE_H, PAGE_W, mountStage, paginate } from "./pages";
import { quotePdfFilename } from "@/lib/pdf-filename";
import type { QuoteStyle } from "@/lib/quote-style";
import type { Quote, Seller } from "@/lib/types";

const SCALE = 3;

const nextFrame = () => new Promise<void>((r) => requestAnimationFrame(() => r()));

/** 等字型與 Logo、印章圖片都載入完成，避免缺字或圖片空白。 */
async function waitForAssets(root: HTMLElement): Promise<void> {
  const images = Array.from(root.querySelectorAll("img"));
  await Promise.all(
    images.map((img) =>
      img.complete && img.naturalWidth > 0
        ? img.decode().catch(() => undefined)
        : new Promise<void>((resolve) => {
            img.addEventListener("load", () => resolve(), { once: true });
            img.addEventListener("error", () => resolve(), { once: true });
          }),
    ),
  );
  await document.fonts.ready;
  await nextFrame();
  await nextFrame();
  await document.fonts.ready;
}

/**
 * 在瀏覽器端產生並下載報價單 PDF（不開啟列印視窗）：
 * modern-screenshot 以 3 倍解析度把每一頁轉成圖片，jsPDF 以 A4 滿版放入，並依檔名規則下載。
 */
export async function exportQuotePdf(seller: Seller, quote: Quote, style: QuoteStyle): Promise<void> {
  const { stage, unmount } = mountStage(seller, quote, style);
  try {
    await waitForAssets(stage);
    const pages = paginate(stage);
    const pagesHost = document.createElement("div");
    Object.assign(pagesHost.style, { position: "fixed", left: "-10000px", top: "0", width: `${PAGE_W}px` });
    pagesHost.setAttribute("aria-hidden", "true");
    pages.forEach((p) => pagesHost.appendChild(p));
    document.body.appendChild(pagesHost);

    try {
      const fontCss = await buildFontCss(stage);
      const [{ domToCanvas }, { jsPDF }] = await Promise.all([import("modern-screenshot"), import("jspdf")]);
      const pdf = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait", compress: true });

      for (let i = 0; i < pages.length; i++) {
        const canvas = await domToCanvas(pages[i], {
          scale: SCALE,
          width: PAGE_W,
          height: PAGE_H,
          backgroundColor: "#ffffff",
          font: fontCss ? { cssText: fontCss } : undefined,
        });
        if (i > 0) pdf.addPage("a4", "portrait");
        // 滿版：貼齊 A4 四邊（內距由報價單版面本身控制）
        pdf.addImage(canvas.toDataURL("image/jpeg", 0.93), "JPEG", 0, 0, 210, 297, undefined, "FAST");
      }
      pdf.save(quotePdfFilename(quote.number, quote.customer.name));
    } finally {
      pagesHost.remove();
    }
  } finally {
    unmount();
  }
}

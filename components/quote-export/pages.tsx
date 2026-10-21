import { flushSync } from "react-dom";
import { createRoot } from "react-dom/client";
import QuoteSheet from "@/components/quote-templates/QuoteSheet";
import type { QuoteStyle } from "@/lib/quote-style";
import type { Quote, Seller } from "@/lib/types";

/** A4 @96dpi：210mm ≈ 794px；高度取 1122px（略小於 297mm），避免多出空白頁。 */
export const PAGE_W = 794;
export const PAGE_H = 1122;
/** 合計區換頁時，至少帶幾列品項一起換頁 */
const KEEP_ROWS_WITH_TOTALS = 3;

export interface Stage {
  host: HTMLElement;
  stage: HTMLElement;
  unmount: () => void;
}

/** 把報價單以 A4 寬度渲染到畫面外，用來量測與複製成各頁。 */
export function mountStage(seller: Seller, quote: Quote, style: QuoteStyle): Stage {
  const host = document.createElement("div");
  host.setAttribute("aria-hidden", "true");
  Object.assign(host.style, {
    position: "fixed",
    left: "-10000px",
    top: "0",
    width: `${PAGE_W}px`,
    pointerEvents: "none",
  });
  document.body.appendChild(host);
  const root = createRoot(host);
  flushSync(() => root.render(<QuoteSheet seller={seller} quote={quote} style={style} />));
  const stage = host.firstElementChild as HTMLElement;
  return {
    host,
    stage,
    unmount: () => {
      root.unmount();
      host.remove();
    },
  };
}

interface PageSpec {
  /** 本頁顯示的品項列範圍 [from, to) */
  from: number;
  to: number;
  /** 顯示品項表格上方的內容（只有第一頁） */
  before: boolean;
  /** 顯示品項表格下方的內容（合計、備註、簽章） */
  after: boolean;
  /** 是否顯示品項表格 */
  table: boolean;
}

function buildPage(stage: HTMLElement, spec: PageSpec, padTop: number): HTMLElement {
  const clone = stage.cloneNode(true) as HTMLElement;
  const container = clone.querySelector<HTMLElement>(".paper-inner");
  if (container) {
    container.style.minHeight = "0";
    if (!spec.before) container.style.paddingTop = `${padTop}px`;
  }

  const table = clone.querySelector<HTMLTableElement>("[data-items-table]");
  if (table) {
    const rows = Array.from(table.tBodies[0]?.rows ?? []);
    rows.forEach((row, i) => {
      if (i < spec.from || i >= spec.to) row.style.display = "none";
    });
    if (!spec.table) table.style.display = "none";

    // 沿著表格往上，依本頁需要隱藏上方／下方的兄弟元素
    let node: HTMLElement = table;
    while (node !== clone && node.parentElement) {
      const parent: HTMLElement = node.parentElement;
      let afterNode = false;
      for (const sib of Array.from(parent.children) as HTMLElement[]) {
        if (sib === node) {
          afterNode = true;
          continue;
        }
        if ((!afterNode && !spec.before) || (afterNode && !spec.after)) sib.style.display = "none";
      }
      node = parent;
    }
  }

  const page = document.createElement("div");
  Object.assign(page.style, {
    position: "relative",
    width: `${PAGE_W}px`,
    height: `${PAGE_H}px`,
    overflow: "hidden",
    background: "#ffffff",
  });
  page.dataset.quotePage = "";
  page.appendChild(clone);
  return page;
}

/**
 * 依 A4 高度分頁：以「列」為單位，不會把一列品項切成兩半；
 * 每頁都帶表頭（thead）；合計、備註、簽章放在最後一頁，放不下時另起一頁。
 * 回傳的頁面是 stage 的複製品（需自行加入 DOM）。
 */
export function paginate(stage: HTMLElement): HTMLElement[] {
  const container = stage.querySelector<HTMLElement>(".paper-inner");
  const table = stage.querySelector<HTMLTableElement>("[data-items-table]");
  if (container) container.style.minHeight = "0";

  const cs = container ? getComputedStyle(container) : null;
  const padX = cs ? parseFloat(cs.paddingLeft) || 48 : 48;
  const padBottom = cs ? parseFloat(cs.paddingBottom) || padX : padX;
  const limit = PAGE_H - padBottom - 2;

  const rows = table ? Array.from(table.tBodies[0]?.rows ?? []) : [];
  if (!table || rows.length === 0) {
    return [buildPage(stage, { from: 0, to: 0, before: true, after: true, table: true }, padX)];
  }

  const stageRect = stage.getBoundingClientRect();
  const tableRect = table.getBoundingClientRect();
  const theadH = table.tHead?.getBoundingClientRect().height ?? 0;
  const beforeH = tableRect.top - stageRect.top;
  const afterH = Math.max(0, stageRect.bottom - tableRect.bottom - padBottom);
  const rowH = rows.map((r) => r.getBoundingClientRect().height);

  const specs: PageSpec[] = [];
  let i = 0;
  let first = true;
  for (;;) {
    let used = (first ? beforeH : padX) + theadH;
    const start = i;
    while (i < rows.length && (used + rowH[i] <= limit || i === start)) {
      used += rowH[i];
      i++;
    }
    if (i >= rows.length) {
      if (used + afterH <= limit) {
        specs.push({ from: start, to: i, before: first, after: true, table: true });
      } else {
        // 合計區放不下：把最後幾列品項一起移到下一頁，避免合計孤零零自成一頁
        const keep = Math.min(KEEP_ROWS_WITH_TOTALS, i - start - 1);
        const split = i - keep;
        specs.push({ from: start, to: split, before: first, after: false, table: true });
        specs.push({ from: split, to: i, before: false, after: true, table: keep > 0 });
      }
      break;
    }
    specs.push({ from: start, to: i, before: first, after: false, table: true });
    first = false;
  }

  return specs.map((spec) => buildPage(stage, spec, padX));
}

/**
 * 列印用：在 beforeprint 時把報價單分成 A4 頁面放進 #print-root，列印 CSS 只顯示它。
 * 全程同步（字型與圖片已在預覽載入），回傳清理函式（afterprint 時呼叫）。
 */
export function preparePrintPages(seller: Seller, quote: Quote, style: QuoteStyle): () => void {
  const { stage, unmount } = mountStage(seller, quote, style);
  let pages: HTMLElement[];
  try {
    pages = paginate(stage);
  } catch (e) {
    unmount();
    throw e;
  }

  const root = document.createElement("div");
  root.id = "print-root";
  pages.forEach((page, i) => {
    page.style.breakAfter = i < pages.length - 1 ? "page" : "auto";
    root.appendChild(page);
  });
  unmount();
  document.body.appendChild(root);
  document.body.classList.add("has-print-pages");

  return () => {
    root.remove();
    document.body.classList.remove("has-print-pages");
  };
}

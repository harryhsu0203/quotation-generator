/**
 * 匯出圖片時，字型必須以 data URL 嵌入（SVG foreignObject 無法使用頁面已載入的字型）。
 * Noto Sans TC 以 unicode-range 切成上百個檔案，這裡只下載「文字內容實際用到的字」所在的切片，
 * 避免把整套字型都嵌進去。
 */

const FAMILY = "Noto Sans TC";

interface Face {
  weight: number;
  ranges: [number, number][];
  rangeText: string;
  url: string;
}

const textCache = new Map<string, string>();
const dataCache = new Map<string, string>();

async function fetchText(url: string): Promise<string> {
  const hit = textCache.get(url);
  if (hit) return hit;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`字型樣式載入失敗：${res.status}`);
  const text = await res.text();
  textCache.set(url, text);
  return text;
}

async function fetchDataUrl(url: string): Promise<string> {
  const hit = dataCache.get(url);
  if (hit) return hit;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`字型檔案載入失敗：${res.status}`);
  const bytes = new Uint8Array(await res.arrayBuffer());
  let binary = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  const dataUrl = `data:font/woff2;base64,${btoa(binary)}`;
  dataCache.set(url, dataUrl);
  return dataUrl;
}

function parseRanges(text: string): [number, number][] {
  return text.split(",").flatMap((part) => {
    const m = /U\+([0-9a-fA-F?]+)(?:-([0-9a-fA-F]+))?/.exec(part.trim());
    if (!m) return [];
    if (m[1].includes("?")) {
      return [[parseInt(m[1].replace(/\?/g, "0"), 16), parseInt(m[1].replace(/\?/g, "f"), 16)] as [number, number]];
    }
    const lo = parseInt(m[1], 16);
    return [[lo, m[2] ? parseInt(m[2], 16) : lo] as [number, number]];
  });
}

function parseFaces(css: string): Face[] {
  const faces: Face[] = [];
  for (const block of css.match(/@font-face\s*\{[^}]*\}/g) ?? []) {
    const family = /font-family:\s*['"]?([^;'"]+)['"]?/.exec(block)?.[1]?.trim();
    const weight = Number(/font-weight:\s*(\d+)/.exec(block)?.[1] ?? 400);
    const url = /url\((['"]?)([^)'"]+)\1\)/.exec(block)?.[2];
    const rangeText = /unicode-range:\s*([^;]+);/.exec(block)?.[1]?.trim() ?? "";
    if (family !== FAMILY || !url) continue;
    faces.push({ weight, url, rangeText, ranges: parseRanges(rangeText) });
  }
  return faces;
}

function nearestWeight(w: number): number {
  return w < 450 ? 400 : w < 600 ? 500 : 700;
}

/** 收集內容中使用 Noto Sans TC 的文字，依字重分組。 */
function collectChars(root: HTMLElement): Map<number, Set<number>> {
  const byWeight = new Map<number, Set<number>>();
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    const text = node.nodeValue ?? "";
    if (!text.trim()) continue;
    const el = node.parentElement;
    if (!el) continue;
    const style = getComputedStyle(el);
    if (!style.fontFamily.includes(FAMILY)) continue;
    const weight = nearestWeight(Number(style.fontWeight) || 400);
    const set = byWeight.get(weight) ?? new Set<number>();
    for (const ch of text) set.add(ch.codePointAt(0)!);
    byWeight.set(weight, set);
  }
  return byWeight;
}

/** 回傳可傳給 modern-screenshot `font.cssText` 的 CSS；取不到時回傳 null（改用系統字型）。 */
export async function buildFontCss(root: HTMLElement): Promise<string | null> {
  try {
    const link = document.querySelector<HTMLLinkElement>('link[rel="stylesheet"][href*="fonts.googleapis.com"]');
    if (!link) return null;
    const faces = parseFaces(await fetchText(link.href));
    const used = collectChars(root);

    const needed = faces.filter((f) => {
      const chars = used.get(f.weight);
      return chars ? [...chars].some((c) => f.ranges.some(([lo, hi]) => c >= lo && c <= hi)) : false;
    });
    if (needed.length === 0) return null;

    const rules = await Promise.all(
      needed.map(async (f) => {
        const data = await fetchDataUrl(f.url);
        return `@font-face{font-family:'${FAMILY}';font-style:normal;font-weight:${f.weight};src:url(${data}) format('woff2');unicode-range:${f.rangeText};}`;
      }),
    );
    return rules.join("\n");
  } catch {
    return null;
  }
}

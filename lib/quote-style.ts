export type QuoteLayout = "classic" | "modern" | "minimal" | "formal";

export interface LayoutInfo {
  id: QuoteLayout;
  name: string;
  nameEn: string;
  description: string;
}

export const LAYOUTS: LayoutInfo[] = [
  { id: "classic", name: "經典", nameEn: "Classic", description: "清楚平衡的商務版面" },
  { id: "modern", name: "現代", nameEn: "Modern", description: "主題色色帶與卡片式資訊" },
  { id: "minimal", name: "極簡", nameEn: "Minimal", description: "黑白細線，適合設計與創意" },
  { id: "formal", name: "正式", nameEn: "Formal", description: "傳統全框線，適合工程與採購" },
];

export const ACCENT_PRESETS: { name: string; color: string }[] = [
  { name: "品牌藍", color: "#2F6BFF" },
  { name: "深海藍", color: "#1E3A8A" },
  { name: "墨綠", color: "#0F766E" },
  { name: "酒紅", color: "#9F1239" },
  { name: "琥珀橘", color: "#C2410C" },
  { name: "石墨", color: "#1F2937" },
];

export interface QuoteStyle {
  layout: QuoteLayout;
  accent: string;
}

export const DEFAULT_STYLE: QuoteStyle = { layout: "classic", accent: ACCENT_PRESETS[0].color };

export function isHexColor(value: unknown): value is string {
  return typeof value === "string" && /^#[0-9a-fA-F]{6}$/.test(value);
}

/** 讀取 localStorage 的內容時使用：不合法的值一律退回預設。 */
export function normalizeStyle(raw: unknown): QuoteStyle {
  const obj = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  const layout = LAYOUTS.some((l) => l.id === obj.layout) ? (obj.layout as QuoteLayout) : DEFAULT_STYLE.layout;
  const accent = isHexColor(obj.accent) ? obj.accent : DEFAULT_STYLE.accent;
  return { layout, accent };
}

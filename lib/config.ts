/**
 * 品牌與網站資訊集中管理。
 * 以 [方括號] 包起來的值是佔位文字，上線前請改成真實資料；
 * 佔位文字不會被渲染成連結。
 */

/** 品牌（總品牌）：序隆科技 Seqlon */
export const COMPANY_NAME_ZH = "序隆科技";
export const COMPANY_NAME_EN = "Seqlon";
/** 網站上顯示的品牌文字標誌 */
export const SITE_NAME = COMPANY_NAME_EN;
/** 完整品牌名稱，用於 title、版權宣告 */
export const SITE_FULL_NAME = `${COMPANY_NAME_EN} ${COMPANY_NAME_ZH}`;

/** 首頁 Hero 的品牌標語與補充說明（佔位文字，請自行修改） */
export const BRAND_SLOGAN = "[在此填寫品牌標語]";
export const BRAND_SUBSLOGAN = "[在此填寫一句補充說明]";

export const SITE_DESCRIPTION = `${SITE_FULL_NAME}：打造給台灣小型企業與個人工作者的實用線上工具，目前提供 Seqlon Quote 免費線上報價單。`;
/** 頁尾品牌簡介 */
export const COMPANY_BLURB = `${COMPANY_NAME_ZH}（${COMPANY_NAME_EN}）打造給台灣小型企業與個人工作者的實用線上工具。`;

/** 正式網址（sitemap、Open Graph 使用）。上線前請改成實際網域。 */
export const SITE_URL = "https://example.com";

export const BRAND_ASSETS = {
  /** 淺色背景用 */
  mark: "/brand/seqlon-mark.svg",
  /** 深色背景用 */
  markWhite: "/brand/seqlon-mark-white.svg",
  /** favicon、App 圖示、Open Graph */
  icon: "/brand/seqlon-icon.svg",
} as const;

export const CONTACT_EMAIL = "[Email]";
export const LINE_URL = "[LINE 官方帳號連結]";
export const SOCIAL_LINKS: { label: string; href: string }[] = [
  { label: "Facebook", href: "[Facebook 連結]" },
  { label: "Instagram", href: "[Instagram 連結]" },
];

export const DEFAULT_VALID_DAYS = 30;

export function isPlaceholder(value: string): boolean {
  return /^\[.*\]$/.test(value.trim());
}

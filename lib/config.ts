/**
 * 網站資訊集中管理。
 * 以 [方括號] 包起來的值是佔位文字，上線前請改成真實資料；
 * 佔位文字不會被渲染成連結。
 */

export const SITE_NAME = "報價單產生器";
export const SITE_TAGLINE = "給台灣小店家與接案者的免費線上報價單工具";
export const SITE_DESCRIPTION =
  "免費線上報價單產生器：自動計算營業稅、統編檢查、國字大寫金額，手機也能用，一鍵列印或存成 PDF。資料只存在你的瀏覽器。";

/** 正式網址（sitemap、Open Graph 使用）。上線前請改成實際網域。 */
export const SITE_URL = "https://example.com";

export const CONTACT_EMAIL = "[Email]";
export const LINE_URL = "[LINE 官方帳號連結]";
export const SOCIAL_LINKS: { label: string; href: string }[] = [
  { label: "Facebook", href: "[Facebook 連結]" },
  { label: "Instagram", href: "[Instagram 連結]" },
];

export const DEFAULT_VALID_DAYS = 30;

export const NAV_LINKS = [
  { href: "/", label: "首頁" },
  { href: "/features", label: "功能" },
  { href: "/templates", label: "範本" },
  { href: "/faq", label: "常見問題" },
  { href: "/about", label: "關於我們" },
] as const;

export function isPlaceholder(value: string): boolean {
  return /^\[.*\]$/.test(value.trim());
}

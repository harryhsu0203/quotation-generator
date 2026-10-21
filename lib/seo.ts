import type { Metadata } from "next";
import { BRAND_ASSETS, SITE_NAME } from "./config";

interface PageMetaInput {
  title: string;
  description: string;
  path: string;
  /** 為 true 時不再附加網站名稱（標題已含關鍵字） */
  absoluteTitle?: boolean;
}

/** 統一產生 title、description、canonical 與 Open Graph。 */
export function pageMeta({ title, description, path, absoluteTitle }: PageMetaInput): Metadata {
  const fullTitle = absoluteTitle ? title : `${title}｜${SITE_NAME}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: "zh_TW",
      type: "website",
      images: [{ url: BRAND_ASSETS.icon, width: 96, height: 96, alt: SITE_NAME }],
    },
    twitter: { card: "summary", title: fullTitle, description, images: [BRAND_ASSETS.icon] },
  };
}

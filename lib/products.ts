import { Boxes, FileText, Sparkles, type LucideIcon } from "lucide-react";

export type ProductStatus = "available" | "coming-soon";

export interface Product {
  slug: string;
  name: string;
  /** 中文名稱（可選） */
  nameZh?: string;
  description: string;
  icon: LucideIcon;
  /** 產品介紹頁網址 */
  href: string;
  /** 「開始使用」的網址（產品本體） */
  appHref?: string;
  status: ProductStatus;
}

/**
 * 產品清單：首頁產品區、導覽列下拉選單都從這裡讀取。
 * 之後新增產品，只要在這裡加一筆資料。
 */
export const PRODUCTS: Product[] = [
  {
    slug: "quote",
    name: "Seqlon Quote",
    nameZh: "報價單",
    description: "免費線上報價單：自動計算營業稅、統編檢查、國字大寫，一鍵列印或存成 PDF。",
    icon: FileText,
    href: "/quote",
    appHref: "/quote/app",
    status: "available",
  },
  {
    slug: "product-2",
    name: "[產品名稱]",
    description: "[在此填寫產品簡介]",
    icon: Sparkles,
    href: "#",
    status: "coming-soon",
  },
  {
    slug: "product-3",
    name: "[產品名稱]",
    description: "[在此填寫產品簡介]",
    icon: Boxes,
    href: "#",
    status: "coming-soon",
  },
];

export const QUOTE_PRODUCT = PRODUCTS[0];

/** 導覽列「開始使用」按鈕前往的網址：第一個可用產品的本體 */
export const PRIMARY_START_HREF =
  PRODUCTS.find((p) => p.status === "available")?.appHref ?? "/";

export function isAvailable(p: Product): boolean {
  return p.status === "available";
}

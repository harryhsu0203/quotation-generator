import { FileText, Receipt, type LucideIcon } from "lucide-react";

export type ProductStatus = "available" | "coming-soon";

export interface Product {
  slug: string;
  /** 顯示名稱，例如「報價助手」 */
  name: string;
  /** 英文品名 */
  nameEn: string;
  description: string;
  icon: LucideIcon;
  /** 產品介紹頁網址 */
  href: string;
  /** 「開始使用」的網址（工具本體） */
  appHref?: string;
  status: ProductStatus;
}

/**
 * 免費工具清單：首頁免費工具區、/tools、導覽列下拉選單、頁尾都從這裡讀取。
 * 之後新增工具，只要在這裡加一筆資料。
 */
export const PRODUCTS: Product[] = [
  {
    slug: "quote",
    name: "報價助手",
    nameEn: "Seqlon Quote",
    description: "免費線上報價單：自動計算營業稅、統編檢查、國字大寫，一鍵列印或存成 PDF。",
    icon: FileText,
    href: "/quote",
    appHref: "/quote/app",
    status: "available",
  },
  {
    slug: "invoice",
    name: "發票助手",
    nameEn: "Seqlon Invoice",
    description: "協助整理與製作發票相關文件的免費工具，開發中。",
    icon: Receipt,
    href: "/invoice",
    status: "coming-soon",
  },
];

export const QUOTE_PRODUCT = PRODUCTS[0];

export function isAvailable(p: Product): boolean {
  return p.status === "available";
}

import type { Metadata, Viewport } from "next";
import { SITE_NAME } from "@/lib/config";
import "./globals.css";

export const metadata: Metadata = {
  title: `${SITE_NAME}｜免費線上報價單`,
  description: "免費產生台灣報價單，支援未稅／含稅／免稅、國字大寫金額，可直接列印或存成 PDF。",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hant-TW" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

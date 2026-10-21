import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/config";
import { TEMPLATES } from "@/lib/templates";

// 工具頁
const STATIC_PATHS = [
  "/",
  "/services",
  "/solutions",
  "/process",
  "/tools",
  "/invoice",
  "/quote",
  "/quote/app",
  "/quote/features",
  "/quote/templates",
  "/faq",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
];

const HIGH = new Set(["/", "/services"]);

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [...STATIC_PATHS, ...TEMPLATES.map((t) => `/quote/templates/${t.slug}`)];
  return paths.map((p) => ({
    url: `${SITE_URL}${p === "/" ? "" : p}`,
    changeFrequency: p === "/" ? "weekly" : "monthly",
    priority: HIGH.has(p) ? 1 : p === "/contact" || p === "/solutions" ? 0.8 : 0.6,
  }));
}

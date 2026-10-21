import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/config";
import { TEMPLATES } from "@/lib/templates";

const STATIC_PATHS = [
  "/",
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

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [...STATIC_PATHS, ...TEMPLATES.map((t) => `/quote/templates/${t.slug}`)];
  return paths.map((p) => ({
    url: `${SITE_URL}${p === "/" ? "" : p}`,
    changeFrequency: p === "/" ? "weekly" : "monthly",
    priority: p === "/" ? 1 : p === "/quote" || p === "/quote/app" ? 0.9 : 0.7,
  }));
}

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  // 舊網址（報價單工具獨立成站時期）→ 新位置
  async redirects() {
    return [
      {
        source: "/quote",
        has: [{ type: "query", key: "template", value: "(?<slug>.+)" }],
        destination: "/quote/app?template=:slug",
        permanent: true,
      },
      { source: "/templates", destination: "/quote/templates", permanent: true },
      { source: "/templates/:slug", destination: "/quote/templates/:slug", permanent: true },
      { source: "/features", destination: "/quote/features", permanent: true },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;

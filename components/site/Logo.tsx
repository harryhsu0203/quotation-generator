import { BRAND_ASSETS, SITE_NAME } from "@/lib/config";

/** Logo 圖示 + 文字標誌（Sora 700，字距 -0.03em）。 */
export default function Logo({
  tone = "light",
  className = "",
}: {
  /** light：淺色背景用；dark：深色背景用 */
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={tone === "dark" ? BRAND_ASSETS.markWhite : BRAND_ASSETS.mark}
        alt=""
        aria-hidden
        width={28}
        height={28}
        className="size-7"
      />
      <span
        className={`font-display text-[20px] font-bold leading-none tracking-[-0.03em] ${
          tone === "dark" ? "text-white" : "text-ink"
        }`}
      >
        {SITE_NAME}
      </span>
    </span>
  );
}

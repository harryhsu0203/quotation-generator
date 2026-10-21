"use client";

import { useEffect, useRef, useState } from "react";

/** A4 寬度（210mm @ 96dpi） */
const PAPER_W = 794;

/** 以固定 A4 寬度排版，再依容器寬度等比縮放，手機也能完整看到整張紙。 */
export default function ScaledPaper({ children }: { children: React.ReactNode }) {
  const wrap = useRef<HTMLDivElement>(null);
  const sheet = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [height, setHeight] = useState<number>();

  useEffect(() => {
    const w = wrap.current;
    const s = sheet.current;
    if (!w || !s) return;
    const update = () => {
      if (w.clientWidth === 0) return; // 分頁隱藏時略過
      setScale(Math.min(1, w.clientWidth / PAPER_W));
      setHeight(s.offsetHeight);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(w);
    ro.observe(s);
    return () => ro.disconnect();
  }, []);

  // 外層裁掉縮放前的排版寬度（避免手機橫向捲動），並以 padding 保留陰影空間
  return (
    <div className="paper-clip -mx-4 -mb-10 overflow-hidden px-4 pb-10">
      <div
        ref={wrap}
        className="paper-wrap mx-auto w-full"
        style={{ maxWidth: PAPER_W, height: height === undefined ? undefined : height * scale }}
      >
        <div
          ref={sheet}
          className="paper-sheet overflow-hidden rounded-sm bg-white shadow-[var(--shadow-paper)]"
          style={{ width: PAPER_W, transform: `scale(${scale})`, transformOrigin: "top left" }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

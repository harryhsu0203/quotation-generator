"use client";

import { Check } from "lucide-react";
import { ACCENT_PRESETS, LAYOUTS, isHexColor, type QuoteLayout, type QuoteStyle } from "@/lib/quote-style";

interface Props {
  style: QuoteStyle;
  onChange: (style: QuoteStyle) => void;
}

/** 版面縮圖（純 CSS 繪製的迷你示意）。 */
function Thumb({ layout, accent }: { layout: QuoteLayout; accent: string }) {
  const bar = "rounded-[1px] bg-slate-300";
  const frame = "relative h-[88px] w-[62px] shrink-0 overflow-hidden rounded-[3px] border border-slate-200 bg-white shadow-sm";

  if (layout === "classic") {
    return (
      <div className={frame} aria-hidden>
        <div className="h-[4px]" style={{ background: accent }} />
        <div className="mx-[5px] mt-[5px] flex justify-between">
          <div className="space-y-[2px]">
            <div className={`${bar} h-[2px] w-[16px]`} />
            <div className={`${bar} h-[2px] w-[11px]`} />
          </div>
          <div className="h-[5px] w-[14px] rounded-[1px]" style={{ background: accent, opacity: 0.8 }} />
        </div>
        <div className="mx-[5px] mt-[5px] grid grid-cols-[1.3fr_1fr] gap-[3px]">
          <div className="h-[11px] rounded-[1px] border border-slate-200" />
          <div className="h-[11px] rounded-[1px]" style={{ background: accent, opacity: 0.12 }} />
        </div>
        <div className="mx-[5px] mt-[5px] h-[4px] rounded-[1px]" style={{ background: accent, opacity: 0.2 }} />
        <div className="mx-[5px] mt-[2px] space-y-[3px]">
          <div className={`${bar} h-[2px]`} />
          <div className={`${bar} h-[2px] opacity-60`} />
          <div className={`${bar} h-[2px]`} />
        </div>
        <div className="absolute bottom-[5px] right-[5px] h-[7px] w-[22px] rounded-[1px]" style={{ background: accent }} />
      </div>
    );
  }
  if (layout === "modern") {
    return (
      <div className={frame} aria-hidden>
        <div className="h-[24px]" style={{ background: accent }}>
          <div className="mx-[5px] flex justify-between pt-[5px]">
            <div className="h-[3px] w-[16px] rounded-[1px] bg-white/90" />
            <div className="h-[4px] w-[13px] rounded-[1px] bg-white/90" />
          </div>
        </div>
        <div className="relative z-10 mx-[5px] -mt-[7px] grid grid-cols-2 gap-[3px]">
          <div className="h-[13px] rounded-[2px] border border-slate-200 bg-white shadow-sm" />
          <div className="h-[13px] rounded-[2px] border border-slate-200 bg-white shadow-sm" />
        </div>
        <div className="mx-[5px] mt-[6px] space-y-[3px]">
          <div className="h-[2px] rounded-[1px]" style={{ background: accent }} />
          <div className="h-px bg-slate-300" />
          <div className="h-px bg-slate-300" />
        </div>
        <div className="absolute bottom-[5px] right-[5px] h-[8px] w-[22px] rounded-[2px] border-l-2 bg-slate-100" style={{ borderColor: accent }} />
      </div>
    );
  }
  if (layout === "minimal") {
    return (
      <div className={frame} aria-hidden>
        <div className="mx-[7px] mt-[8px] flex justify-between border-b border-slate-800 pb-[4px]">
          <div className="h-[2px] w-[14px] bg-slate-700" />
          <div className="h-[3px] w-[10px] bg-slate-300" />
        </div>
        <div className="mx-[7px] mt-[6px] grid grid-cols-3 gap-[3px]">
          <div className="h-[2px] bg-slate-300" />
          <div className="h-[2px] bg-slate-300" />
          <div className="h-[2px] bg-slate-300" />
        </div>
        <div className="mx-[7px] mt-[8px] space-y-[5px]">
          <div className="h-px bg-slate-800" />
          <div className="h-px bg-slate-300" />
          <div className="h-px bg-slate-300" />
        </div>
        <div className="absolute bottom-[8px] right-[7px] h-[3px] w-[18px] bg-slate-800" />
      </div>
    );
  }
  return (
    <div className={frame} aria-hidden>
      <div className="mx-[5px] mt-[5px] text-center">
        <div className="mx-auto h-[3px] w-[24px] bg-slate-700" />
        <div className="mx-auto mt-[2px] h-[3px] w-[14px] border-b border-slate-800" style={{ background: accent, opacity: 0.6 }} />
      </div>
      <div className="mx-[5px] mt-[5px] grid grid-cols-4 border-l border-t border-slate-700">
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i} className="h-[6px] border-b border-r border-slate-700" style={i % 2 === 0 ? { background: accent, opacity: 0.12 } : undefined} />
        ))}
      </div>
      <div className="mx-[5px] mt-[3px] grid grid-cols-5 border-l border-t border-slate-700">
        {Array.from({ length: 15 }, (_, i) => (
          <div key={i} className="h-[5px] border-b border-r border-slate-700" />
        ))}
      </div>
    </div>
  );
}

export default function LayoutPicker({ style, onChange }: Props) {
  const isPreset = ACCENT_PRESETS.some((p) => p.color.toLowerCase() === style.accent.toLowerCase());
  const minimal = style.layout === "minimal";

  return (
    <div className="space-y-5">
      <div>
        <div className="label">版面</div>
        <div role="radiogroup" aria-label="報價單版面" className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {LAYOUTS.map((l) => {
            const active = style.layout === l.id;
            return (
              <button
                key={l.id}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => onChange({ ...style, layout: l.id })}
                className={`relative flex flex-col items-center gap-2 rounded-ui border p-3 text-center transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-500/25 ${
                  active ? "border-brand-700 bg-brand-50" : "border-line bg-white hover:border-slate-300"
                }`}
              >
                {active && (
                  <span className="absolute right-1.5 top-1.5 grid size-5 place-items-center rounded-full bg-brand-700 text-white">
                    <Check className="size-3" aria-hidden />
                  </span>
                )}
                <Thumb layout={l.id} accent={l.id === "minimal" ? "#0f172a" : style.accent} />
                <span>
                  <span className="block text-sm font-bold">
                    {l.name} <span className="text-xs font-normal text-muted">{l.nameEn}</span>
                  </span>
                  <span className="mt-0.5 block text-[11px] leading-snug text-muted">{l.description}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <div className="label">主題色</div>
        <div className="mt-2 flex flex-wrap items-center gap-2" role="radiogroup" aria-label="主題色">
          {ACCENT_PRESETS.map((p) => {
            const active = style.accent.toLowerCase() === p.color.toLowerCase();
            return (
              <button
                key={p.color}
                type="button"
                role="radio"
                aria-checked={active}
                aria-label={p.name}
                title={p.name}
                onClick={() => onChange({ ...style, accent: p.color })}
                className={`grid size-11 place-items-center rounded-full border-2 transition-transform hover:scale-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-500/25 md:size-9 ${
                  active ? "border-ink" : "border-transparent"
                }`}
              >
                <span className="grid size-7 place-items-center rounded-full text-white md:size-6" style={{ background: p.color }}>
                  {active && <Check className="size-3.5" aria-hidden />}
                </span>
              </button>
            );
          })}
          <label
            className={`relative grid size-11 cursor-pointer place-items-center rounded-full border-2 focus-within:ring-4 focus-within:ring-brand-500/25 md:size-9 ${
              !isPreset ? "border-ink" : "border-transparent"
            }`}
            title="自訂顏色"
          >
            <span
              className="grid size-7 place-items-center rounded-full text-[10px] font-bold text-white md:size-6"
              style={{ background: isPreset ? "conic-gradient(#ef4444,#f59e0b,#22c55e,#3b82f6,#a855f7,#ef4444)" : style.accent }}
            >
              {!isPreset && <Check className="size-3.5" aria-hidden />}
            </span>
            <input
              type="color"
              aria-label="自訂主題色"
              value={isHexColor(style.accent) ? style.accent : "#2f6bff"}
              onChange={(e) => onChange({ ...style, accent: e.target.value.toUpperCase() })}
              className="absolute inset-0 cursor-pointer opacity-0"
            />
          </label>
          <span className="ml-1 text-xs tabular-nums text-muted">{style.accent.toUpperCase()}</span>
        </div>
        {minimal && <p className="mt-2 text-xs text-muted">極簡版面固定為黑白，不套用主題色。</p>}
      </div>
    </div>
  );
}

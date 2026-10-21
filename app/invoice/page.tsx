import type { Metadata } from "next";
import { Receipt } from "lucide-react";
import ButtonLink from "@/components/site/ButtonLink";
import { Reveal } from "@/components/site/Reveal";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMeta({
    title: "發票助手（即將推出）",
    description: "發票助手是序隆科技開發中的免費工具，敬請期待。",
    path: "/invoice",
  }),
  robots: { index: false },
};

export default function InvoicePage() {
  return (
    <section className="mx-auto flex w-full max-w-xl flex-1 items-center px-4 py-20">
      <Reveal className="w-full text-center">
        <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-slate-100 text-slate-500">
          <Receipt className="size-7" aria-hidden />
        </span>
        <span className="mt-5 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-muted">即將推出</span>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">發票助手</h1>
        <p className="mt-3 text-[15px] leading-relaxed text-muted">
          發票助手還在開發中，目前尚未提供使用。推出後會和報價助手一樣免費、免註冊，資料只存在你的瀏覽器。
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/quote/app" variant="primary">
            先試試報價助手
          </ButtonLink>
          <ButtonLink href="/tools">所有免費工具</ButtonLink>
        </div>
      </Reveal>
    </section>
  );
}

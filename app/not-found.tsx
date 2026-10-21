import type { Metadata } from "next";
import { Home } from "lucide-react";
import ButtonLink from "@/components/site/ButtonLink";
import { Reveal } from "@/components/site/Reveal";

export const metadata: Metadata = {
  title: "找不到頁面",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="mx-auto flex w-full max-w-xl flex-1 items-center px-4 py-20">
      <Reveal className="w-full text-center">
        <div className="text-7xl font-bold tracking-tight text-brand-600">404</div>
        <h1 className="mt-4 text-2xl font-bold">找不到這個頁面</h1>
        <p className="mt-2 text-sm text-muted">網址可能輸入錯誤，或頁面已被移除。</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <ButtonLink href="/" variant="primary">
            <Home className="size-4" aria-hidden />
            回到首頁
          </ButtonLink>
          <ButtonLink href="/quote">開始製作報價單</ButtonLink>
        </div>
      </Reveal>
    </section>
  );
}

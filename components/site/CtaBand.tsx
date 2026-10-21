import { ArrowRight } from "lucide-react";
import ButtonLink from "./ButtonLink";
import { Reveal } from "./Reveal";

export default function CtaBand({
  title = "現在就做一張報價單",
  description = "免費、免註冊，打開就能開始。資料只存在你的瀏覽器。",
  href = "/quote/app",
  label = "免費開始製作",
}: {
  title?: string;
  description?: string;
  href?: string;
  label?: string;
}) {
  return (
    <section className="container-x py-12">
      <Reveal>
        <div className="relative overflow-hidden rounded-[1.25rem] bg-brand-800 px-6 py-10 text-center text-white md:py-14">
          <div className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full bg-brand-500/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-10 size-64 rounded-full bg-brand-600/40 blur-3xl" />
          <h2 className="relative text-2xl font-bold tracking-tight md:text-3xl">{title}</h2>
          <p className="relative mx-auto mt-3 max-w-md text-sm text-brand-100">{description}</p>
          <div className="relative mt-6">
            <ButtonLink href={href} variant="secondary" className="px-6">
              {label}
              <ArrowRight className="size-4" aria-hidden />
            </ButtonLink>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

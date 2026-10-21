import { Reveal } from "./Reveal";

/** 內頁頂部標題區。 */
export default function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="container-x pb-6 pt-10 md:pt-14">
      <Reveal>
        {eyebrow && <div className="mb-2 text-xs font-bold tracking-widest text-brand-600">{eyebrow}</div>}
        <h1 className="text-3xl font-bold leading-tight tracking-tight text-ink md:text-4xl">{title}</h1>
        {description && <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted">{description}</p>}
        {children && <div className="mt-5">{children}</div>}
      </Reveal>
    </section>
  );
}

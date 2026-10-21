import { Reveal } from "./Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  center = true,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  center?: boolean;
}) {
  return (
    <Reveal className={`mb-8 max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && <div className="mb-2 text-xs font-bold tracking-widest text-brand-600">{eyebrow}</div>}
      <h2 className="text-2xl font-bold tracking-tight text-ink md:text-3xl">{title}</h2>
      {description && <p className="mt-3 text-[15px] leading-relaxed text-muted">{description}</p>}
    </Reveal>
  );
}

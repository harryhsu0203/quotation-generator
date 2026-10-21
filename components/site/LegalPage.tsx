import PageHero from "./PageHero";
import { Reveal } from "./Reveal";

export interface LegalSection {
  title: string;
  body: string[];
}

/** 隱私權政策、使用條款共用版型。 */
export default function LegalPage({
  title,
  intro,
  sections,
}: {
  title: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <PageHero title={title} description={intro} />
      <section className="mx-auto w-full max-w-3xl px-4 pb-12 pt-2">
        <Reveal className="card space-y-7 p-5 sm:p-8">
          {sections.map((s, i) => (
            <div key={s.title}>
              <h2 className="text-lg font-bold">
                {i + 1}. {s.title}
              </h2>
              <div className="mt-2 space-y-2 text-sm leading-relaxed text-slate-700">
                {s.body.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </div>
          ))}
          <p className="border-t border-line pt-4 text-xs text-muted">最後更新日期：[最後更新日期]</p>
        </Reveal>
      </section>
    </>
  );
}

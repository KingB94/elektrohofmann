import { timeline } from "@/data/business";
import Reveal from "@/components/variants/Reveal";

export default function ChronikC() {
  return (
    <section id="chronik" className="scroll-mt-28 bg-bone py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-copper" />
            <span className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-copper">
              Chronik
            </span>
          </div>
          <h2 className="mt-7 max-w-xl font-serif text-4xl font-semibold leading-[1.08] tracking-[-0.01em] text-soot sm:text-5xl">
            Fünf Stationen bis heute.
          </h2>
        </Reveal>

        {/* Waagrechte Zeitleiste auf großen Schirmen, senkrecht auf dem Telefon */}
        <ol className="mt-16 grid gap-10 border-t border-bone-line pt-10 md:grid-cols-5 md:gap-6">
          {timeline.map((t, i) => (
            <Reveal key={t.year} as="li" delay={i * 0.08}>
              <div className="relative flex h-full flex-col pt-6 md:pr-5">
                {/* Punkt sitzt genau auf der Trennlinie der Liste (pt-10 = 2.5rem
                    darüber, minus halbe Punkthöhe). */}
                <span className="absolute -top-[2.8rem] left-0 hidden h-2.5 w-2.5 rounded-full bg-copper md:block" />
                <span className="font-serif text-3xl font-semibold text-soot">{t.year}</span>
                <p className="mt-3 text-[0.9rem] leading-relaxed text-soot/60">{t.label}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

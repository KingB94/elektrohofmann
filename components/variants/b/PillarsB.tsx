import type { Zahlen } from "@/lib/inhalte";
import CountUp from "@/components/variants/CountUp";
import Reveal from "@/components/variants/Reveal";

export default function PillarsB({ zahlen }: { zahlen: Zahlen }) {
  return (
    <section className="relative overflow-hidden bg-frost-base py-24 md:py-32">
      <div className="grid-bg absolute inset-0 opacity-70" />

      <div className="relative mx-auto grid max-w-6xl gap-14 px-5 md:px-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-center lg:gap-20">
        <div>
          <Reveal>
            <span className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-blue">
              {zahlen.kicker}
            </span>
            <h2 className="mt-5 max-w-lg font-display text-3xl font-extrabold leading-tight tracking-[-0.025em] text-carbon sm:text-5xl">
              {zahlen.headline}
            </h2>
          </Reveal>

          <dl className="mt-14 grid gap-px overflow-hidden rounded-sm border border-frost-line bg-frost-line sm:grid-cols-3">
            {zahlen.eintraege.map((p, i) => (
              <Reveal key={p.label} delay={i * 0.1}>
                <div className="relative h-full bg-frost px-6 py-8">
                  <dd className="font-display text-5xl font-extrabold tracking-tight text-carbon sm:text-6xl">
                    <CountUp to={p.wert} />
                    <span className="text-blue">.</span>
                  </dd>
                  <div className="mt-5 h-px w-full overflow-hidden bg-frost-line">
                    <div className="sweep-line h-full w-1/2 bg-gradient-to-r from-transparent via-blue to-transparent" />
                  </div>
                  <dt className="mt-5 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-carbon/75">
                    {p.label}
                  </dt>
                  <p className="mt-2.5 text-[0.82rem] leading-relaxed text-carbon/50">{p.note}</p>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>

        {/* Die Chronik als senkrechte Zeitleiste — die Linie läuft hinter
            den Punkten durch und endet mit dem letzten Eintrag. */}
        <Reveal delay={0.15}>
          <div className="rounded-sm border border-frost-line bg-frost p-7 shadow-sm shadow-carbon/5">
            <ol className="relative">
              <span
                aria-hidden
                className="absolute left-[3px] top-2 bottom-2 w-px bg-frost-line"
              />
              {zahlen.chronik.map((t) => (
                <li key={t.year} className="relative flex gap-4 pb-6 last:pb-0">
                  <span className="relative z-10 mt-[7px] h-[7px] w-[7px] shrink-0 rounded-full bg-blue ring-4 ring-frost" />
                  <div>
                    <span className="font-mono text-[0.66rem] uppercase tracking-[0.12em] text-blue">
                      {t.year}
                    </span>
                    <p className="mt-1 text-[0.84rem] leading-snug text-carbon/60">{t.label}</p>
                  </div>
                </li>
              ))}
            </ol>

            <p className="mt-7 border-t border-frost-line pt-6 text-sm leading-relaxed text-carbon/60">
              {zahlen.hinweis}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

import { business, services, yearsInBusiness, yearsInTrade } from "@/data/business";
import CountUp from "@/components/variants/CountUp";
import CircuitSignature from "@/components/variants/CircuitSignature";
import Reveal from "@/components/variants/Reveal";

const pillars = [
  {
    to: yearsInTrade,
    label: "Jahre im Elektrohandwerk",
    note: "Ausbildungsbeginn 1991, Meisterprüfung 2004.",
  },
  {
    to: yearsInBusiness,
    label: "Jahre eigener Meisterbetrieb",
    note: `Gegründet am ${business.founded} in Wonneberg.`,
  },
  {
    to: services.length,
    label: "Leistungsbereiche",
    note: "Installation, Photovoltaik, Prüfung, Reparatur, Medientechnik, Licht.",
  },
];

export default function PillarsB() {
  return (
    <section className="relative overflow-hidden bg-frost-base py-24 md:py-32">
      <div className="grid-bg absolute inset-0 opacity-70" />

      <div className="relative mx-auto grid max-w-6xl gap-14 px-5 md:px-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-center lg:gap-20">
        <div>
          <Reveal>
            <span className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-blue">
              In Zahlen
            </span>
            <h2 className="mt-5 max-w-lg font-display text-3xl font-extrabold leading-tight tracking-[-0.025em] text-carbon sm:text-5xl">
              Erfahrung, die man nicht abkürzen kann.
            </h2>
          </Reveal>

          <dl className="mt-14 grid gap-px overflow-hidden rounded-sm border border-frost-line bg-frost-line sm:grid-cols-3">
            {pillars.map((p, i) => (
              <Reveal key={p.label} delay={i * 0.1}>
                <div className="relative h-full bg-frost px-6 py-8">
                  <dd className="font-display text-5xl font-extrabold tracking-tight text-carbon sm:text-6xl">
                    <CountUp to={p.to} />
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

        <Reveal delay={0.15}>
          <div className="rounded-sm border border-frost-line bg-frost p-5 shadow-sm shadow-carbon/5">
            <CircuitSignature tone="light" />
            <p className="mt-5 text-sm leading-relaxed text-carbon/60">
              Ob Störung im Haus oder geplante Erweiterung: Sie rufen an, wir
              schauen es uns an und bringen die Anlage wieder auf einen Stand,
              der den geltenden Normen entspricht.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

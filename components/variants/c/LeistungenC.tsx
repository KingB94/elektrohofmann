import { services } from "@/data/business";
import {
  InstallIcon,
  SolarIcon,
  CheckIcon,
  RepairIcon,
  MediaIcon,
  LedIcon,
} from "@/components/ServiceIcons";
import Reveal from "@/components/variants/Reveal";
import CircuitSignature from "@/components/variants/CircuitSignature";

const iconMap = {
  install: InstallIcon,
  solar: SolarIcon,
  check: CheckIcon,
  repair: RepairIcon,
  media: MediaIcon,
  led: LedIcon,
};

export default function LeistungenC() {
  return (
    <section id="leistungen" className="scroll-mt-28 bg-bone py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <div className="grid gap-10 border-b border-bone-line pb-12 lg:grid-cols-[1fr_0.8fr] lg:items-end lg:gap-20">
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-copper" />
              <span className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-copper">
                Leistungen
              </span>
            </div>
            <h2 className="mt-7 max-w-lg font-serif text-4xl font-semibold leading-[1.08] tracking-[-0.01em] text-soot sm:text-5xl">
              Sechs Bereiche, ein Ansprechpartner.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-[1rem] leading-[1.75] text-soot/65">
              Privat oder gewerblich, Neubau oder Sanierung: Was wir zusagen,
              führen wir mit den eigenen Leuten aus. Kein Auftrag ist uns zu
              klein — und für die großen haben wir das Gerät im Hof stehen.
            </p>
          </Reveal>
        </div>

        <ol className="divide-y divide-bone-line border-b border-bone-line">
          {services.map((s, i) => {
            const Icon = iconMap[s.icon];
            return (
              <Reveal key={s.title} as="li" delay={(i % 3) * 0.06}>
                <div className="group relative grid gap-4 py-9 transition-colors duration-300 hover:bg-bone-raised md:grid-cols-[4.5rem_1fr_1.1fr_auto] md:items-baseline md:gap-8 md:px-4">
                  <span className="font-mono text-sm text-copper/70 transition-colors group-hover:text-copper">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-serif text-2xl font-semibold leading-snug text-soot transition-transform duration-300 md:group-hover:translate-x-1.5">
                    {s.title}
                  </h3>
                  <p className="max-w-lg text-[0.95rem] leading-relaxed text-soot/60">
                    {s.description}
                  </p>
                  <Icon className="hidden h-9 w-9 self-center text-soot/25 transition-colors duration-300 group-hover:text-copper md:block" />
                </div>
              </Reveal>
            );
          })}
        </ol>

        <div className="mt-16 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
          <Reveal>
            <CircuitSignature tone="warm" />
          </Reveal>
          <Reveal delay={0.1}>
            <div>
              <h3 className="font-serif text-2xl font-semibold leading-snug text-soot sm:text-3xl">
                Eine Störung meldet sich selten zu einer passenden Uhrzeit.
              </h3>
              <p className="mt-5 max-w-lg text-[1rem] leading-[1.75] text-soot/65">
                Deshalb nimmt bei uns jemand ab, der die Anlage später auch
                sieht. Sie schildern, was passiert ist, wir sagen Ihnen ehrlich,
                ob es warten kann oder ob wir gleich kommen.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

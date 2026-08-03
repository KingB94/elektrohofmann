import { ArrowUpRight } from "lucide-react";
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

const iconMap = {
  install: InstallIcon,
  solar: SolarIcon,
  check: CheckIcon,
  repair: RepairIcon,
  media: MediaIcon,
  led: LedIcon,
};

export default function ServicesB() {
  return (
    <section id="leistungen" className="scroll-mt-24 relative bg-frost-sunk py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <Reveal>
            <span className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-blue">
              Leistungen
            </span>
            <h2 className="mt-5 max-w-lg font-display text-3xl font-extrabold leading-tight tracking-[-0.025em] text-carbon sm:text-5xl">
              Alles aus einer Hand.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-sm text-[0.98rem] leading-relaxed text-carbon/60">
              Privat oder gewerblich, Neubau oder Bestand: Kein Auftrag ist uns
              zu klein. Was wir zusagen, führen wir auch selbst aus.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-sm border border-frost-line bg-frost-line sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const Icon = iconMap[s.icon];
            return (
              <Reveal key={s.title} delay={(i % 3) * 0.08}>
                <article className="group relative flex h-full flex-col bg-frost p-8 transition-colors duration-300 hover:bg-frost-base md:p-10">
                  <span className="font-mono text-[0.62rem] tracking-[0.14em] text-carbon/25">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <Icon className="mt-7 h-10 w-10 text-blue transition-transform duration-300 group-hover:-translate-y-1" />
                  <h3 className="mt-7 font-display text-xl font-bold leading-snug text-carbon">
                    {s.title}
                  </h3>
                  <p className="mt-3.5 flex-1 text-[0.88rem] leading-relaxed text-carbon/60">
                    {s.description}
                  </p>
                  <ArrowUpRight
                    size={17}
                    className="mt-7 text-carbon/20 transition-all duration-300 group-hover:translate-x-1 group-hover:text-blue"
                  />
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

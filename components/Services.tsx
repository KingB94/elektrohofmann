import { services } from "@/data/business";
import {
  InstallIcon,
  SolarIcon,
  CheckIcon,
  RepairIcon,
  MediaIcon,
  LedIcon,
} from "@/components/ServiceIcons";

const iconMap = {
  install: InstallIcon,
  solar: SolarIcon,
  check: CheckIcon,
  repair: RepairIcon,
  media: MediaIcon,
  led: LedIcon,
};

export default function Services() {
  return (
    <section id="leistungen" className="bg-paper py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="max-w-xl">
          <span className="plate-badge text-blue-deep">Leistungen</span>
          <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Alles aus einer Hand.
          </h2>
          <p className="mt-4 text-[1.02rem] leading-relaxed text-ink/70">
            Vom Lichtschalter bis zur Photovoltaikanlage — wir übernehmen Ihr
            Projekt vollständig, ob privat oder gewerblich.
          </p>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-sm border border-paper-line bg-paper-line sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => {
            const Icon = iconMap[s.icon];
            return (
              <div key={s.title} className="group flex flex-col bg-paper p-8 transition-colors hover:bg-paper-raised">
                <Icon className="h-10 w-10 text-blue-deep" />
                <h3 className="mt-6 font-display text-xl font-bold leading-snug text-ink">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/65">
                  {s.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

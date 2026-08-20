import Image from "next/image";
import { Award, ShieldCheck, Truck } from "lucide-react";
import type { Betrieb, UeberUns } from "@/lib/inhalte";
import Reveal from "@/components/variants/Reveal";

// Symbole gehören zur Gestaltung und werden der Reihe nach vergeben.
const symbole = [Award, ShieldCheck, Truck];

export default function BetriebB({
  betrieb,
  ueberUns,
}: {
  betrieb: Betrieb;
  ueberUns: UeberUns;
}) {
  return (
    <section id="betrieb" className="scroll-mt-24 relative overflow-hidden bg-frost-base py-24 md:py-32">
      <div className="grid-bg absolute inset-0 opacity-30" />

      <div className="relative mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <Reveal>
              <span className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-blue">
                {ueberUns.kicker}
              </span>
              <h2 className="mt-5 font-display text-3xl font-extrabold leading-tight tracking-[-0.025em] text-carbon sm:text-5xl">
                {ueberUns.headline.split("\n").map((zeile) => (
                  <span key={zeile} className="block">
                    {zeile}
                  </span>
                ))}
              </h2>
              <p className="mt-7 text-[1.02rem] leading-relaxed text-carbon/65">
                {ueberUns.absatz1}
              </p>
              <p className="mt-4 text-[1.02rem] leading-relaxed text-carbon/65">
                {ueberUns.absatz2}
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-10 flex items-center gap-4 rounded-sm border border-frost-line bg-frost px-6 py-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue/10 font-display text-base font-bold text-blue">
                  FH
                </span>
                <div>
                  <p className="font-display text-lg font-bold text-carbon">{betrieb.owner}</p>
                  <p className="font-mono text-[0.66rem] uppercase tracking-[0.13em] text-blue-deep">
                    {betrieb.ownerRole}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="flex flex-col gap-6">
            <Reveal delay={0.05}>
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-sm border border-frost-line">
                <Image
                  src={ueberUns.bildGross}
                  alt="Elektroinstallation in einer Gewerbehalle"
                  fill
                  sizes="(max-width: 1024px) 92vw, 520px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-carbon/45 to-transparent" />
              </div>
            </Reveal>

            <div className="grid gap-6 sm:grid-cols-2">
              <Reveal delay={0.1} className="h-full">
                <div className="relative h-full min-h-[190px] w-full overflow-hidden rounded-sm border border-frost-line">
                  <Image
                    src={ueberUns.bildKlein}
                    alt="Teleskoplader von Elektro Hofmann im Einsatz vor dem Betriebsgebäude"
                    fill
                    sizes="(max-width: 640px) 92vw, 250px"
                    className="object-cover"
                  />
                </div>
              </Reveal>

              <Reveal delay={0.15} className="h-full">
                <ol className="flex h-full flex-col justify-between gap-3 rounded-sm border border-frost-line bg-frost p-6">
                  {ueberUns.chronik.map((t) => (
                    <li key={t.year} className="flex gap-4">
                      <span className="w-12 shrink-0 font-mono text-[0.66rem] uppercase tracking-[0.08em] text-blue">
                        {t.year}
                      </span>
                      <span className="text-[0.78rem] leading-snug text-carbon/60">{t.label}</span>
                    </li>
                  ))}
                </ol>
              </Reveal>
            </div>
          </div>
        </div>

        <div className="mt-20 grid gap-px overflow-hidden rounded-sm border border-frost-line bg-frost-line md:grid-cols-3">
          {ueberUns.vertrauen.map((t, i) => {
            const Icon = symbole[i % symbole.length];
            return (
              <Reveal key={t.title} delay={i * 0.1}>
                <div className="flex h-full flex-col bg-frost p-8">
                  <Icon size={22} className="text-blue" strokeWidth={1.8} />
                  <h3 className="mt-6 font-display text-lg font-bold text-carbon">{t.title}</h3>
                  <p className="mt-2.5 text-[0.86rem] leading-relaxed text-carbon/60">{t.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

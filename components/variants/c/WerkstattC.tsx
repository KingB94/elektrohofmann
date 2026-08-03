import Image from "next/image";
import { business } from "@/data/business";
import Reveal from "@/components/variants/Reveal";

export default function WerkstattC() {
  return (
    <section id="werkstatt" className="scroll-mt-28 border-y border-bone-line bg-bone-raised py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          {/* Bildcollage, leicht versetzt wie auf einem Werkstatttisch */}
          <div className="relative">
            <Reveal>
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src="/images/gewerbehalle.jpg"
                  alt="Elektroinstallation in einer Gewerbehalle"
                  fill
                  sizes="(max-width: 1024px) 92vw, 480px"
                  className="object-cover"
                />
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="relative -mt-16 ml-auto w-[62%] border-8 border-bone-raised">
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src="/images/teleskoplader.jpg"
                    alt="Teleskoplader von Elektro Hofmann im Einsatz vor dem Betriebsgebäude"
                    fill
                    sizes="(max-width: 1024px) 60vw, 300px"
                    className="object-cover"
                  />
                </div>
              </div>
            </Reveal>
            <p className="mt-5 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-soot/40">
              Aus dem Betriebsalltag
            </p>
          </div>

          <div className="flex flex-col justify-center">
            <Reveal>
              <div className="flex items-center gap-4">
                <span className="h-px w-10 bg-copper" />
                <span className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-copper">
                  Die Werkstatt
                </span>
              </div>
              <h2 className="mt-7 font-serif text-4xl font-semibold leading-[1.08] tracking-[-0.01em] text-soot sm:text-5xl">
                Handwerk mit
                <br />
                <span className="italic font-normal">Familientradition.</span>
              </h2>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="mt-8 text-[1.02rem] leading-[1.8] text-soot/70">
                {business.owner} gründete {business.name} am {business.founded} —
                nach Jahren als Elektroinstallateur und Baustellenleiter und der
                Meisterschule für Energie- und Gebäudetechnik. Aus dem
                Ein-Mann-Betrieb wurde ein eingespieltes Team, das 2012 in ein
                neues Betriebsgelände in Wonneberg-Greinachtal zog.
              </p>
            </Reveal>

            <Reveal delay={0.14}>
              <blockquote className="mt-10 border-l-2 border-copper pl-7">
                <p className="font-serif text-xl italic leading-relaxed text-soot sm:text-2xl">
                  „Pünktlichkeit, Sauberkeit und faire Preise stehen bei uns an
                  oberster Stelle. Kein Auftrag ist uns zu klein, keine
                  Herausforderung zu groß.“
                </p>
                <footer className="mt-5 flex items-baseline gap-3">
                  <cite className="font-serif text-base not-italic text-soot">
                    {business.owner}
                  </cite>
                  <span className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-soot/45">
                    {business.ownerRole}
                  </span>
                </footer>
              </blockquote>
            </Reveal>

            <Reveal delay={0.2}>
              <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-bone-line pt-8">
                <div>
                  <dt className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-soot/45">
                    Qualifikation
                  </dt>
                  <dd className="mt-2 text-[0.92rem] leading-relaxed text-soot/75">
                    {business.profession}
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-soot/45">
                    Eingetragen bei
                  </dt>
                  <dd className="mt-2 text-[0.92rem] leading-relaxed text-soot/75">
                    {business.chamber}
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

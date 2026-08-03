import Image from "next/image";
import { business, timeline } from "@/data/business";

export default function About() {
  return (
    <section id="ueber-uns" className="bg-paper-raised py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <span className="plate-badge text-blue-deep">Über uns</span>
            <h2 className="mt-5 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              Handwerk mit Familientradition.
            </h2>
            <p className="mt-5 text-[1.02rem] leading-relaxed text-ink/70">
              {business.owner} gründete {business.name} am {business.founded} —
              nach Jahren als Elektroinstallateur und Baustellenleiter sowie
              der Meisterschule zum Elektromeister für Energie- und
              Gebäudetechnik. Aus dem Ein-Mann-Betrieb wurde ein
              eingespieltes Team, das 2012 in ein neues Betriebsgelände in
              Wonneberg-Greinachtal zog.
            </p>
            <p className="mt-4 text-[1.02rem] leading-relaxed text-ink/70">
              Pünktlichkeit, Sauberkeit und faire Preise stehen bei uns an
              oberster Stelle — dazu Qualitätsprodukte, die allen geforderten
              Normen entsprechen. Kein Auftrag ist uns zu klein, keine
              Herausforderung zu groß.
            </p>

            <div className="mt-9 rounded-sm border border-paper-line bg-paper px-5 py-4">
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.1em] text-blue-deep">
                {business.ownerRole}
              </p>
              <p className="mt-1 font-display text-lg font-bold text-ink">
                {business.owner}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <ol className="space-y-4 border-l border-paper-line pl-6">
              {timeline.map((t) => (
                <li key={t.year} className="relative">
                  <span className="absolute -left-[27px] top-1 h-2.5 w-2.5 rounded-full bg-blue" />
                  <span className="font-mono text-xs uppercase tracking-[0.08em] text-blue-deep">
                    {t.year}
                  </span>
                  <p className="mt-0.5 text-sm leading-relaxed text-ink/75">{t.label}</p>
                </li>
              ))}
            </ol>

            <div className="grid grid-cols-2 gap-3">
              <div className="relative col-span-2 aspect-[16/10] overflow-hidden rounded-sm">
                <Image
                  src="/images/gewerbehalle.jpg"
                  alt="Elektroinstallation in einer Gewerbehalle"
                  fill
                  sizes="(max-width: 768px) 90vw, 400px"
                  className="object-cover"
                />
              </div>
              <div className="relative col-span-2 aspect-[16/9] overflow-hidden rounded-sm">
                <Image
                  src="/images/teleskoplader.jpg"
                  alt="Teleskoplader von Elektro Hofmann im Einsatz vor dem Betriebsgebäude"
                  fill
                  sizes="(max-width: 768px) 90vw, 400px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

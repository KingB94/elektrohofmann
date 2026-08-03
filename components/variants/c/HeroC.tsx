import Image from "next/image";
import { Phone, MapPin } from "lucide-react";
import { business, yearsInTrade } from "@/data/business";
import StarRating from "@/components/StarRating";

const facts = [
  { k: "Gegründet", v: "2005" },
  { k: "Handwerk seit", v: "1991" },
  { k: "Sitz", v: "Wonneberg" },
  { k: "Betrieb", v: "Meisterbetrieb" },
];

export default function HeroC() {
  return (
    <>
      <section className="relative border-b border-bone-line bg-bone">
        <div className="mx-auto grid max-w-6xl items-stretch gap-0 px-0 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="paper-grid flex flex-col justify-center px-6 py-16 lg:py-28 lg:pl-10 lg:pr-14">
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-copper" />
              <span className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-copper">
                Elektro Hofmann · Wonneberg
              </span>
            </div>

            <h1 className="mt-8 font-serif text-[2.9rem] font-semibold leading-[1.03] tracking-[-0.015em] text-soot sm:text-6xl lg:text-[4.2rem]">
              Elektrotechnik
              <br />
              mit <span className="italic font-normal text-copper">Energie</span>.
            </h1>

            <p className="mt-8 max-w-md text-[1.06rem] leading-[1.75] text-soot/70">
              Seit {yearsInTrade} Jahren im Elektrohandwerk, seit 2005 mit
              eigenem Meisterbetrieb im Chiemgau. Vom Lichtschalter im Altbau
              bis zur Photovoltaikanlage auf der Halle — geplant, ausgeführt und
              abgenommen von Leuten, die Sie beim Namen kennen.
            </p>

            <div className="mt-11 flex flex-wrap items-center gap-6">
              <a
                href={business.phoneHref}
                className="inline-flex items-center gap-2.5 rounded-sm bg-copper px-7 py-4 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-bone transition-colors hover:bg-soot"
              >
                <Phone size={14} strokeWidth={2.2} />
                {business.phoneDisplay}
              </a>
              <a
                href={business.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border-b border-soot/25 pb-1 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-soot transition-colors hover:border-copper hover:text-copper"
              >
                <MapPin size={14} strokeWidth={2} />
                Route planen
              </a>
            </div>

            <div className="mt-12 flex items-center gap-3 border-t border-bone-line pt-6">
              <StarRating value={business.rating.value} className="[&_svg]:text-copper" />
              <span className="font-mono text-[0.7rem] text-soot/60">
                {business.rating.value.toFixed(1)} auf Google
              </span>
            </div>
          </div>

          <div className="relative min-h-[46vh] lg:min-h-[80vh]">
            <Image
              src="/images/betriebsgelaende-luftbild.jpg"
              alt="Luftbild des Betriebsgeländes von Elektro Hofmann in Wonneberg-Greinachtal"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-soot/45 via-transparent to-transparent" />
            <span className="absolute bottom-5 left-5 bg-bone px-3.5 py-2 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-soot/70">
              Betriebsgelände Greinachtal
            </span>
          </div>
        </div>
      </section>

      {/* Kennzahlenband im Stil einer Impressumszeile */}
      <div className="border-b border-bone-line bg-bone-raised">
        <dl className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-bone-line px-0 md:grid-cols-4">
          {facts.map((f) => (
            <div key={f.k} className="border-b border-bone-line px-6 py-5 md:border-b-0 lg:px-8">
              <dt className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-soot/45">
                {f.k}
              </dt>
              <dd className="mt-1.5 font-serif text-lg text-soot">{f.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </>
  );
}

import Image from "next/image";
import { Phone, MapPin, ArrowDown } from "lucide-react";
import type { Betrieb, Hero } from "@/lib/inhalte";
import StarRating from "@/components/StarRating";

// Schwebende Punkte oben rechts — fest gesetzt statt zufällig, damit
// Server- und Client-Render übereinstimmen.
const motes = [
  { top: 14, right: 8, size: 9, delay: 0 },
  { top: 27, right: 22, size: 6, delay: 1.1 },
  { top: 41, right: 5, size: 7, delay: 2.2 },
  { top: 20, right: 33, size: 5, delay: 0.6 },
  { top: 53, right: 18, size: 6, delay: 1.7 },
];

export default function HeroB({ betrieb, hero }: { betrieb: Betrieb; hero: Hero }) {
  // Das letzte Wort der zweiten Zeile wird blau hervorgehoben — so ist
  // es im Editor beschrieben, damit die Auszeichnung nicht ausfällt,
  // wenn der Kunde die Überschrift ändert.
  const worte = hero.headlineZeile2.trim().split(/\s+/);
  const letztesWort = worte.pop() ?? "";
  const davor = worte.join(" ");

  return (
    <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-frost-base">
      <Image
        src={hero.bild}
        alt="Luftbild des Betriebsgeländes von Elektro Hofmann in Wonneberg-Greinachtal"
        fill
        sizes="100vw"
        priority
        className="object-cover object-center saturate-[1.2] contrast-[1.08]"
      />
      {/* Zwei Schleier: der untere trägt die Schrift, der linke nimmt der
          Bildkante die Unruhe. Nach oben rechts bleibt das Luftbild frei,
          damit es nicht milchig wirkt. */}
      <div className="absolute inset-0 bg-gradient-to-t from-frost-base from-20% via-frost-base/80 to-frost-base/5" />
      <div className="absolute inset-0 bg-gradient-to-r from-frost-base/80 via-frost-base/15 to-transparent" />
      <div className="grid-bg absolute inset-0 opacity-60" />

      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/3 md:block">
        {motes.map((m) => (
          <span
            key={`${m.top}-${m.right}`}
            className="float-slow absolute rounded-full bg-blue/45 blur-[1px]"
            style={{
              top: `${m.top}%`,
              right: `${m.right}%`,
              width: m.size,
              height: m.size,
              animationDelay: `${m.delay}s`,
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-5 pb-16 pt-36 md:px-8 md:pb-24">
        <span
          className="hero-in inline-flex items-center gap-2.5 rounded-full border border-blue/30 bg-white/70 px-4 py-1.5 font-mono text-[0.66rem] uppercase tracking-[0.18em] text-blue-deep backdrop-blur-sm"
          style={{ animationDelay: "0.05s" }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-blue" />
          {hero.badge}
        </span>

        <h1 className="mt-7 max-w-4xl font-display text-[3rem] font-extrabold leading-[0.94] tracking-[-0.035em] text-carbon sm:text-7xl lg:text-[5.6rem]">
          <span className="hero-in block" style={{ animationDelay: "0.14s" }}>
            {hero.headlineZeile1}
          </span>
          <span className="hero-in block" style={{ animationDelay: "0.24s" }}>
            {davor && `${davor} `}
            <span className="text-blue">{letztesWort}</span>
          </span>
        </h1>

        <p
          className="hero-in mt-8 max-w-lg text-[1.05rem] leading-relaxed text-carbon/75 sm:text-lg"
          style={{ animationDelay: "0.34s" }}
        >
          {hero.text}
        </p>

        <div
          className="hero-in mt-10 flex flex-wrap items-center gap-3"
          style={{ animationDelay: "0.42s" }}
        >
          <a
            href={betrieb.phoneHref}
            className="inline-flex items-center gap-2.5 rounded-full bg-blue px-7 py-4 font-mono text-[0.75rem] uppercase tracking-[0.12em] text-white shadow-lg shadow-blue/20 transition-transform duration-200 hover:scale-[1.03]"
          >
            <Phone size={15} strokeWidth={2.4} />
            {betrieb.phoneDisplay}
          </a>
          <a
            href={betrieb.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-full border border-carbon/20 bg-white/70 px-7 py-4 font-mono text-[0.75rem] uppercase tracking-[0.12em] text-carbon backdrop-blur transition-colors hover:border-blue hover:text-blue-deep"
          >
            <MapPin size={15} strokeWidth={2} />
            {hero.routenButton}
          </a>
        </div>

        <div
          className="hero-in mt-14 flex flex-wrap items-center gap-x-10 gap-y-5 border-t border-carbon/12 pt-7"
          style={{ animationDelay: "0.5s" }}
        >
          <div className="flex items-center gap-2.5">
            <StarRating value={betrieb.ratingValue ?? 5} />
            <span className="font-mono text-[0.7rem] text-carbon/65">
              {(betrieb.ratingValue ?? 5).toFixed(1)} auf Google
            </span>
          </div>
          <span className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-carbon/50">
            {betrieb.address.full}
          </span>
          <span className="ml-auto hidden items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-carbon/40 lg:flex">
            Weiterscrollen
            <ArrowDown size={13} className="float-slow" />
          </span>
        </div>
      </div>
    </section>
  );
}

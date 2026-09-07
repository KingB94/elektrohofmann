import { Quote, ArrowUpRight } from "lucide-react";
import type { Betrieb, Stimmen } from "@/lib/inhalte";
import StarRating from "@/components/StarRating";
import Reveal from "@/components/variants/Reveal";

// ---------------------------------------------------------------
// Kundenstimmen als endloses Laufband.
//
// Bewusst als eigener Inhalt gerendert und nicht über ein Widget von
// Google, Elfsight oder Trustindex: Jedes dieser Widgets lädt ein
// fremdes Script und schickt die IP-Adresse des Besuchers an einen
// Dritten, noch bevor jemand zustimmen konnte — die Seite bräuchte
// dann ein Zustimmungsbanner. Hier passiert im Browser nichts
// Fremdes; die Texte stehen im Redaktionssystem.
//
// Aus demselben Grund kein Google-Profilbild: Ein eingebundenes Bild
// von googleusercontent.com wäre wieder ein Aufruf bei Google. Statt
// dessen die Initialen.
//
// Die Bewegung läuft in CSS (.marquee in globals.css), nicht in
// JavaScript: Sie soll schon stehen, bevor Skripte geladen sind,
// und kostet so keine Rechenzeit im Browser.
// ---------------------------------------------------------------

/** „Simon K." → „SK" — nimmt den ersten Buchstaben je Wort, höchstens zwei. */
function initialen(name: string): string {
  return name
    .split(/\s+/)
    .map((wort) => wort.replace(/[^\p{L}]/gu, "").charAt(0))
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

type Eintrag = Stimmen["eintraege"][number];

function Karte({ eintrag, ariaHidden }: { eintrag: Eintrag; ariaHidden?: boolean }) {
  return (
    // Der Abstand steht als eigener Rand an der Karte, nicht als `gap`
    // der Reihe. Nur so ist die halbe Bandbreite exakt die Hälfte der
    // Karten: Bei `gap` fehlt in der Rechnung ein halber Zwischenraum,
    // und das Band ruckt bei jedem Durchlauf sichtbar.
    <figure
      aria-hidden={ariaHidden}
      className="relative mr-6 flex w-[19rem] shrink-0 flex-col rounded-sm border border-frost-line bg-frost p-7 sm:w-[21rem] md:p-8"
    >
      <Quote size={26} className="absolute right-6 top-6 text-blue/12" strokeWidth={2} aria-hidden />
      <StarRating value={eintrag.sterne ?? 5} starClassName="text-gold" />
      <blockquote className="mt-5 text-[0.92rem] leading-relaxed text-carbon/75">
        {eintrag.text}
      </blockquote>
      {/* mt-auto drückt die Zeile nach unten: Alle Karten sind gleich
          hoch (die Reihe streckt sie), und so stehen die Namen trotz
          unterschiedlich langer Zitate auf einer Linie. */}
      <figcaption className="mt-auto flex items-center gap-3 border-t border-frost-line pt-5">
        <span
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue/10 font-mono text-[0.68rem] font-medium text-blue-deep"
          aria-hidden
        >
          {initialen(eintrag.autor)}
        </span>
        <span className="min-w-0">
          <span className="block truncate text-[0.85rem] font-medium text-carbon">
            {eintrag.autor}
          </span>
          <span className="block font-mono text-[0.64rem] uppercase tracking-[0.12em] text-carbon/45">
            Google · {eintrag.jahr}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}

export default function StimmenB({
  betrieb,
  stimmen,
}: {
  betrieb: Betrieb;
  stimmen: Stimmen;
}) {
  const eintraege = stimmen.eintraege;
  if (eintraege.length === 0) return null;

  // Ungefähr acht Sekunden je Karte. Die Dauer hängt an der Anzahl,
  // damit das Band gleich schnell läuft, egal wie viele Stimmen der
  // Kunde später einpflegt.
  const dauer = `${eintraege.length * 8}s`;

  return (
    <section id="stimmen" className="scroll-mt-24 relative bg-frost-sunk py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-8">
          <Reveal>
            <span className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-blue">
              {stimmen.kicker}
            </span>
            <h2 className="mt-5 max-w-lg whitespace-pre-line font-display text-3xl font-extrabold leading-tight tracking-[-0.025em] text-carbon sm:text-5xl">
              {stimmen.headline}
            </h2>
          </Reveal>

          {/* Der Gesamtschnitt trägt hier mehr als jeder Einzeltext —
              deshalb steht er groß neben der Überschrift. Er erscheint
              nur, wenn unter „Betriebsdaten" wirklich Werte hinterlegt
              sind; sonst stünde dort eine erfundene Zahl. */}
          {betrieb.ratingValue != null && (
            <Reveal delay={0.1}>
              <div className="flex items-center gap-5 rounded-sm border border-frost-line bg-frost px-7 py-5">
                <span className="font-display text-5xl font-extrabold leading-none tracking-[-0.03em] text-carbon">
                  {betrieb.ratingValue.toFixed(1).replace(".", ",")}
                </span>
                <span>
                  <StarRating value={betrieb.ratingValue} starClassName="text-gold" size={18} />
                  <span className="mt-1.5 block font-mono text-[0.68rem] uppercase tracking-[0.12em] text-carbon/55">
                    {betrieb.ratingCount
                      ? `${betrieb.ratingCount} Bewertungen auf Google`
                      : "auf Google"}
                  </span>
                </span>
              </div>
            </Reveal>
          )}
        </div>

        <Reveal delay={0.15}>
          <p className="mt-8 max-w-xl text-[0.98rem] leading-relaxed text-carbon/60">
            {stimmen.intro}
          </p>
        </Reveal>
      </div>

      {/* Volle Fensterbreite statt im Raster: Das Band soll an den
          Rändern hinauslaufen, sonst wirkt es wie ein abgeschnittener
          Kasten mitten auf der Seite. */}
      <div className="marquee mt-16" style={{ "--marquee-dauer": dauer } as React.CSSProperties}>
        <div className="marquee-track">
          {eintraege.map((s, i) => (
            <Karte key={`a-${s.autor}-${i}`} eintrag={s} />
          ))}
          {/* Zweiter Durchgang nur fürs Auge — für Vorleseprogramme
              verborgen, damit die Zitate nicht doppelt vorkommen. */}
          {eintraege.map((s, i) => (
            <Karte key={`b-${s.autor}-${i}`} eintrag={s} ariaHidden />
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal delay={0.1}>
          <div className="mt-12 flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
            {/* Der Hinweis, dass es eine Auswahl ist, gehört sichtbar
                dazu: Eine Zusammenstellung, die als Gesamtbild auftritt,
                wäre irreführend. */}
            <span className="font-mono text-[0.66rem] uppercase tracking-[0.13em] text-carbon/45">
              Auswahl
              {betrieb.ratingCount ? ` aus ${betrieb.ratingCount} Bewertungen` : ""}
              {stimmen.stand ? ` · ${stimmen.stand}` : ""}
            </span>
            <a
              href={betrieb.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full border border-carbon/20 bg-frost px-7 py-4 font-mono text-[0.75rem] uppercase tracking-[0.12em] text-carbon transition-colors hover:border-blue hover:text-blue-deep"
            >
              {stimmen.linkText}
              <ArrowUpRight size={15} strokeWidth={2} />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

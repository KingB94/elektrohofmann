// ---------------------------------------------------------------
// Die Brücke zwischen Keystatic und der Website.
//
// Alles, was der Kunde im Editor unter /keystatic ändern kann,
// wird hier aus den JSON-Dateien unter /content gelesen. Die
// Seiten sind statisch — gelesen wird also beim Bauen, nicht bei
// jedem Aufruf. Speichert der Kunde etwas, entsteht ein Commit,
// der automatisch einen neuen Build auslöst.
// ---------------------------------------------------------------

import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "@/keystatic.config";

const reader = createReader(process.cwd(), keystaticConfig);

// Zwei Angaben stehen bewusst nicht im Editor: Die Koordinaten
// ändern sich nie und das Gründungsdatum ist die Grundlage für
// gerechnete Jahreszahlen — beides wäre im CMS nur eine Stolperfalle.
const GRUENDUNG = new Date("2005-08-15");
const AUSBILDUNGSBEGINN = 1991;

const geo = { lat: 47.8994536, lng: 12.7325377 };

/** „08681 478397" → „tel:+498681478397" */
function telHref(anzeige: string): string {
  const ziffern = anzeige.replace(/\D/g, "");
  return `tel:+49${ziffern.replace(/^0/, "")}`;
}

/** Volle Jahre seit einem Datum — zählt erst am Jahrestag hoch. */
function jahreSeit(start: Date): number {
  const jetzt = new Date();
  const jahrestagVorbei =
    jetzt.getMonth() > start.getMonth() ||
    (jetzt.getMonth() === start.getMonth() && jetzt.getDate() >= start.getDate());
  return jetzt.getFullYear() - start.getFullYear() - (jahrestagVorbei ? 0 : 1);
}

export const jahreImBetrieb = () => jahreSeit(GRUENDUNG);
export const jahreImHandwerk = () => new Date().getFullYear() - AUSBILDUNGSBEGINN;

// ---------------------------------------------------------------

export async function getBetrieb() {
  const b = await reader.singletons.betrieb.readOrThrow();
  const anschrift = `${b.strasse}, ${b.plz} ${b.ort}`;

  return {
    ...b,
    // Das Feld darf im Editor leer bleiben — dann wird ersatzweise
    // nach der Anschrift gesucht, damit der Knopf nie ins Leere führt.
    googleMapsUrl:
      b.googleMapsUrl ??
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(anschrift)}`,
    geo,
    founded: "15. August 2005",
    foundedISO: "2005-08-15",
    phoneHref: telHref(b.phoneDisplay),
    mobileHref: telHref(b.mobileDisplay),
    address: {
      street: b.strasse,
      zip: b.plz,
      city: b.ort,
      full: anschrift,
    },
  };
}

export const getHero = () => reader.singletons.hero.readOrThrow();
export const getLeistungen = () => reader.singletons.leistungen.readOrThrow();
export const getAblauf = () => reader.singletons.ablauf.readOrThrow();
export const getUeberUns = () => reader.singletons.ueberUns.readOrThrow();
export const getKontakt = () => reader.singletons.kontakt.readOrThrow();

/**
 * Kennzahlen. Wo im Editor „automatisch berechnen" gewählt ist,
 * wird der eingetragene Wert überschrieben — so veraltet die
 * Seite nicht beim Jahreswechsel.
 */
export async function getZahlen() {
  const z = await reader.singletons.zahlen.readOrThrow();
  const anzahlLeistungen = (await getLeistungen()).eintraege.length;

  const berechnet: Record<string, number> = {
    jahreHandwerk: jahreImHandwerk(),
    jahreBetrieb: jahreImBetrieb(),
    anzahlLeistungen,
  };

  return {
    ...z,
    eintraege: z.eintraege.map((e) => ({
      ...e,
      wert: berechnet[e.quelle] ?? e.wert ?? 0,
    })),
  };
}

// ---------------------------------------------------------------
// Typen für die Komponenten — abgeleitet, damit sie nicht
// auseinanderlaufen, wenn sich das Schema ändert.

export type Betrieb = Awaited<ReturnType<typeof getBetrieb>>;
export type Hero = Awaited<ReturnType<typeof getHero>>;
export type Leistungen = Awaited<ReturnType<typeof getLeistungen>>;
export type Ablauf = Awaited<ReturnType<typeof getAblauf>>;
export type UeberUns = Awaited<ReturnType<typeof getUeberUns>>;
export type Kontakt = Awaited<ReturnType<typeof getKontakt>>;
export type Zahlen = Awaited<ReturnType<typeof getZahlen>>;

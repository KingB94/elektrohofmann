// ---------------------------------------------------------------
// Die Brücke zwischen Keystatic und der Website.
//
// Alles, was der Kunde im Editor unter /keystatic ändern kann,
// steht in den JSON-Dateien unter /content und wird hier
// eingelesen. Speichert er etwas, entsteht ein Commit, der
// automatisch einen neuen Build auslöst.
//
// Warum import statt Keystatics createReader: Der Reader öffnet die
// Dateien zur Laufzeit über das Dateisystem. Im Cloudflare Worker
// gibt es keines — jede Seite, die nicht schon fertig vorgerendert
// ist, antwortete damit „fs.readFile is not implemented". Das traf
// den Editor unter /keystatic, weil er bei jedem Aufruf gerendert
// wird und dabei durch das Root-Layout läuft, das hier Daten holt.
//
// Als import landet der Inhalt beim Bauen fest im Bündel. Das ist
// kein Verlust: Die Dateien ändern sich ohnehin nur über einen
// Commit, und auf den folgt immer ein neuer Build.
//
// Die Typen kommen weiterhin aus dem Keystatic-Schema (Entry<…>),
// nicht aus der JSON-Datei — sonst würde ein leeres Feld den Typ
// verengen und die Angaben liefen mit dem Editor auseinander.
// ---------------------------------------------------------------

import type { Entry } from "@keystatic/core/reader";
import keystaticConfig from "@/keystatic.config";

import betriebDaten from "@/content/betrieb.json";
import heroDaten from "@/content/startseite/hero.json";
import zahlenDaten from "@/content/startseite/zahlen.json";
import leistungenDaten from "@/content/startseite/leistungen.json";
import ablaufDaten from "@/content/startseite/ablauf.json";
import ueberUnsDaten from "@/content/startseite/betrieb.json";
import kontaktDaten from "@/content/startseite/kontakt.json";

type Singletons = typeof keystaticConfig.singletons;
const inhalt = {
  betrieb: betriebDaten as Entry<Singletons["betrieb"]>,
  hero: heroDaten as Entry<Singletons["hero"]>,
  zahlen: zahlenDaten as Entry<Singletons["zahlen"]>,
  leistungen: leistungenDaten as Entry<Singletons["leistungen"]>,
  ablauf: ablaufDaten as Entry<Singletons["ablauf"]>,
  ueberUns: ueberUnsDaten as Entry<Singletons["ueberUns"]>,
  kontakt: kontaktDaten as Entry<Singletons["kontakt"]>,
};

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
  const b = inhalt.betrieb;
  const anschrift = `${b.strasse}, ${b.plz} ${b.ort}`;

  return {
    ...b,
    // Das Feld darf im Editor leer bleiben — dann wird ersatzweise
    // nach der Anschrift gesucht, damit der Knopf nie ins Leere führt.
    googleMapsUrl:
      b.googleMapsUrl ??
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(anschrift)}`,
    // Öffnet die Routenplanung mit der Anschrift als Ziel. Ein Link auf
    // einen Google-Maps-Ort taugt dafür nicht: Zeigt er auf einen Eintrag
    // ohne hinterlegte Adresse, öffnet sich der Routenplaner leer.
    routeUrl: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
      anschrift
    )}`,
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

export const getHero = async () => inhalt.hero;
export const getLeistungen = async () => inhalt.leistungen;
export const getAblauf = async () => inhalt.ablauf;
export const getUeberUns = async () => inhalt.ueberUns;
export const getKontakt = async () => inhalt.kontakt;

/**
 * Kennzahlen. Wo im Editor „automatisch berechnen" gewählt ist,
 * wird der eingetragene Wert überschrieben — so veraltet die
 * Seite nicht beim Jahreswechsel.
 */
export async function getZahlen() {
  const z = inhalt.zahlen;
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

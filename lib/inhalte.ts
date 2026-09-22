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
import stimmenDaten from "@/content/startseite/stimmen.json";
import ueberUnsDaten from "@/content/startseite/betrieb.json";
import kontaktDaten from "@/content/startseite/kontakt.json";

type Singletons = typeof keystaticConfig.singletons;

// ---------------------------------------------------------------
// Vorgaben für die vier Felder, die im Editor leer bleiben dürfen.
//
// Keystatic schreibt ein leer gelassenes Feld nicht als null in die
// JSON-Datei — es lässt den Schlüssel ganz weg. Fehlt er, scheitert der
// Cast weiter unten an der Typprüfung, der Build bricht ab, und der Kunde
// bekommt davon nichts mit: Der Editor meldet „gespeichert", die Seite
// bleibt aber auf dem alten Stand stehen. Genau daran hing sie vom
// 12.09.2026 bis zum 22.09.2026 fest, nachdem das Maps-Feld geleert wurde.
//
// Es sind genau diese vier. Alle übrigen Felder des Schemas sind Text-
// oder Auswahlfelder; die landen leer als "" in der Datei, der Schlüssel
// bleibt erhalten. Nachzählen lässt sich das mit
//   type Leer<T> = { [K in keyof T]-?: null extends T[K] ? K : never }[keyof T]
// über jedem Entry<…> — kommt dabei mehr heraus als diese vier, gehört
// die neue Stelle hier ergänzt.
//
// Die Vorgaben stehen bewusst als eigene Konstanten und nicht als Felder
// direkt neben dem Spread: dort meldete TypeScript sie als doppelt
// vergeben, sobald der Kunde den Wert wieder füllt — dieselbe Falle mit
// umgekehrtem Vorzeichen. Alle vier Stellen kommen mit null zurecht.
// ---------------------------------------------------------------
const betriebVorgaben = { googleMapsUrl: null, ratingValue: null };
const rezensionVorgabe = { sterne: null };

/**
 * Legt die Vorgaben unter die gelesenen Daten. Vorhandene Werte gewinnen.
 *
 * Als Funktion und nicht als Spread an Ort und Stelle: Löscht der Kunde
 * eine Liste vollständig, steht in der JSON-Datei nur noch `[]`, und
 * TypeScript leitet daraus `never` als Elementtyp ab. Ein Spread von
 * `never` ist ein Fehler — der leere Zustand, den der Editor ausdrücklich
 * erlaubt, hätte den Build also seinerseits gekippt. Innerhalb einer
 * generischen Funktion ist derselbe Spread erlaubt.
 */
function mitVorgaben<T, V extends object>(daten: T, vorgaben: V): T & V {
  return { ...vorgaben, ...daten } as T & V;
}

/**
 * Dasselbe für die Kennzahlen, eine Ebene tiefer.
 *
 * Steht die Zahl nicht fest, sondern wird gerechnet, gibt es im Editor
 * nichts einzutragen — dann fehlt „value" in der Datei. Keystatics
 * eigener Leser verträgt das, unsere Typprüfung nicht.
 *
 * Warum eine eigene Funktion statt map() an Ort und Stelle: Löscht der
 * Kunde alle Kennzahlen, steht in der Datei `[]`, und TypeScript leitet
 * daraus `never` als Elementtyp ab — auf `never` ist dann nicht einmal
 * mehr ein Feldzugriff erlaubt. Der ausgeschriebene Parametertyp hier
 * verhindert das, und ein leeres Array erfüllt ihn ohne Weiteres.
 */
function mitKennzahlVorgaben<
  T extends {
    readonly quelle: { readonly discriminant: string };
    readonly label: string;
    readonly note: string;
  },
>(eintraege: readonly T[]): Entry<Singletons["zahlen"]>["eintraege"] {
  return eintraege.map((e) => ({
    ...e,
    quelle: { value: null, ...e.quelle },
  })) as Entry<Singletons["zahlen"]>["eintraege"];
}

// ---------------------------------------------------------------
// Sicherheitsnetz gegen genau den Fehler, der die Seite im September
// 2026 zehn Tage lang stehen ließ.
//
// Bekommt das Schema später ein weiteres Feld, das leer bleiben darf,
// ohne dass es oben eine Vorgabe erhält, soll das sofort auffallen —
// beim Entwickeln, nicht Wochen danach beim Kunden.
//
// Die Prüfung liest ausschließlich das Schema aus keystatic.config.ts,
// nie die JSON-Dateien. Sie kann also nicht an einer Eingabe des Kunden
// scheitern, sondern nur an einer Änderung von uns. Schlägt sie an,
// nennt die Fehlermeldung das Feld beim Namen:
//
//   Type '"neuesFeld"' does not satisfy the constraint 'true'.
//
// Dann gehört oben eine Vorgabe dazu — und die Stelle, die das Feld
// anzeigt, muss mit null zurechtkommen.
// ---------------------------------------------------------------
type Leerbar<T> = { [K in keyof T]-?: null extends T[K] ? K : never }[keyof T];
type Element<T> = T extends readonly (infer U)[] ? U : never;
type Bereich<K extends keyof Singletons> = Entry<Singletons[K]>;

type OhneVorgabe =
  // Versorgt: die drei Stellen mit Vorgabe. Übrig bleibt, was fehlt.
  | Exclude<Leerbar<Bereich<"betrieb">>, keyof typeof betriebVorgaben>
  | Leerbar<Element<Bereich<"zahlen">["eintraege"]>>
  // Das „value" der Auswahl „Woher kommt die Zahl?" versorgt
  // mitKennzahlVorgaben, deshalb hier ausgenommen.
  | Exclude<Leerbar<Element<Bereich<"zahlen">["eintraege"]>["quelle"]>, "value">
  | Exclude<
      Leerbar<Element<Bereich<"stimmen">["eintraege"]>>,
      keyof typeof rezensionVorgabe
    >
  // Alles Weitere darf gar kein leerbares Feld haben.
  | Leerbar<Bereich<"hero">>
  | Leerbar<Bereich<"zahlen">>
  | Leerbar<Bereich<"leistungen">>
  | Leerbar<Bereich<"ablauf">>
  | Leerbar<Bereich<"stimmen">>
  | Leerbar<Bereich<"ueberUns">>
  | Leerbar<Bereich<"kontakt">>
  | Leerbar<Element<Bereich<"betrieb">["hours"]>>
  | Leerbar<Element<Bereich<"zahlen">["chronik"]>>
  | Leerbar<Element<Bereich<"leistungen">["eintraege"]>>
  | Leerbar<Element<Bereich<"ablauf">["schritte"]>>
  | Leerbar<Element<Bereich<"ueberUns">["galerie"]>>
  | Leerbar<Element<Bereich<"ueberUns">["vertrauen"]>>;

type MussStimmen<T extends true> = T;
export type JedesLeerbareFeldHatEineVorgabe = MussStimmen<
  // Die Klammern verhindern, dass TypeScript die Vereinigung einzeln
  // durchgeht — sonst wäre die Prüfung bei mehreren Feldern zahnlos.
  [OhneVorgabe] extends [never] ? true : OhneVorgabe
>;

const inhalt = {
  betrieb: mitVorgaben(betriebDaten, betriebVorgaben) as Entry<Singletons["betrieb"]>,
  hero: heroDaten as Entry<Singletons["hero"]>,
  zahlen: {
    ...zahlenDaten,
    eintraege: mitKennzahlVorgaben(zahlenDaten.eintraege),
  } as Entry<Singletons["zahlen"]>,
  leistungen: leistungenDaten as Entry<Singletons["leistungen"]>,
  ablauf: ablaufDaten as Entry<Singletons["ablauf"]>,
  stimmen: {
    ...stimmenDaten,
    eintraege: stimmenDaten.eintraege.map((e) => mitVorgaben(e, rezensionVorgabe)),
  } as Entry<Singletons["stimmen"]>,
  ueberUns: ueberUnsDaten as Entry<Singletons["ueberUns"]>,
  kontakt: kontaktDaten as Entry<Singletons["kontakt"]>,
};

// Zwei Angaben stehen bewusst nicht im Editor: Die Koordinaten
// ändern sich nie und das Gründungsdatum ist die Grundlage für
// gerechnete Jahreszahlen — beides wäre im CMS nur eine Stolperfalle.
//
// Die beiden springen bewusst zu verschiedenen Zeitpunkten weiter, das
// ist kein Fehler: Vom Betrieb ist der Tag der Gründung bekannt, also
// zählt er am 15. August hoch. Vom Handwerk ist nur das Jahr 1991
// überliefert — dort wird zum Jahreswechsel gerechnet, wie man es auch
// sagen würde („seit 1991 im Handwerk"). Jede Zahl rechnet mit der
// Genauigkeit, die sie hat. Wird der Ausbildungsbeginn einmal genau
// bekannt, gehört hier ein Datum hin und unten jahreSeit() davor.
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
export const getStimmen = async () => inhalt.stimmen;
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
      wert:
        e.quelle.discriminant === "fest"
          ? e.quelle.value ?? 0
          : berechnet[e.quelle.discriminant] ?? 0,
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
export type Stimmen = Awaited<ReturnType<typeof getStimmen>>;
export type UeberUns = Awaited<ReturnType<typeof getUeberUns>>;
export type Kontakt = Awaited<ReturnType<typeof getKontakt>>;
export type Zahlen = Awaited<ReturnType<typeof getZahlen>>;

// ---------------------------------------------------------------
// Öffnungszeiten aus dem Editor für Google übersetzen.
//
// Auf der Seite stehen die Zeiten als freier Text, damit der Kunde sie
// im Editor so schreiben kann, wie sie auf einem Schild stünden:
// „Montag – Donnerstag", „07:00 - 16:00", „geschlossen". Google dagegen
// erwartet englische Wochentage und Uhrzeiten in fester Schreibweise.
//
// Bis September 2026 standen die Zeiten deshalb ein zweites Mal fest im
// Code — und liefen prompt auseinander: Der Kunde stellte im Editor auf
// Mo–Do 07:00–16:00 um, an Google ging weiter Mo–Fr 08:00–18:00. Gemerkt
// hat es niemand, denn die zweite Stelle sieht man der Seite nicht an.
// Diese Übersetzung nimmt sie wieder heraus.
//
// Grundregel: im Zweifel lieber nichts melden als etwas Falsches. Eine
// Zeile, die sich nicht sicher lesen lässt („nach Vereinbarung"), wird
// übersprungen. Bleibt nichts übrig, entfällt die Angabe ganz — dann
// steht bei Google keine Öffnungszeit, was richtig ist, statt einer
// erfundenen, die den Kunden Anrufe zur falschen Zeit kostet.
// ---------------------------------------------------------------

/** Wochentage in der Reihenfolge, in der Bereiche durchgezählt werden. */
const REIHENFOLGE = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

// Abkürzungen mit, weil „Mo – Fr" genauso naheliegt wie der volle Name.
const WOCHENTAGE: Record<string, (typeof REIHENFOLGE)[number]> = {
  montag: "Monday", mo: "Monday", mon: "Monday",
  dienstag: "Tuesday", di: "Tuesday", die: "Tuesday",
  mittwoch: "Wednesday", mi: "Wednesday", mit: "Wednesday",
  donnerstag: "Thursday", do: "Thursday", don: "Thursday",
  freitag: "Friday", fr: "Friday", fre: "Friday",
  samstag: "Saturday", sonnabend: "Saturday", sa: "Saturday", sam: "Saturday",
  sonntag: "Sunday", so: "Sunday", son: "Sunday",
};

// „geschlossen", „zu", „Ruhetag" — alles, was einen freien Tag meint.
const GESCHLOSSEN = /^(geschlossen|zu|ruhetag|frei)\.?$/i;

// Trennt Aufzählungen: „Samstag / Sonntag", „Sa, So", „Sa und So".
const AUFZAEHLUNG = /\s*(?:\/|,|&|\bund\b)\s*/i;

// Trennt Bereiche: „Montag – Donnerstag", „Mo-Fr", „Montag bis Freitag".
// Alle drei Strichformen, weil der Editor den Gedankenstrich automatisch
// setzt, der Kunde aber oft den Bindestrick der Tastatur tippt.
const BEREICH = /\s*(?:–|—|-|\bbis\b)\s*/i;

// „07:00 - 16:00", „7.00-12.00", „08:00 – 18:00 Uhr". Global, damit auch
// geteilte Tage („08:00-12:00 und 13:00-17:00") vollständig ankommen.
const ZEITSPANNE = /(\d{1,2})[:.](\d{2})\s*(?:–|—|-|bis)\s*(\d{1,2})[:.](\d{2})/gi;

function wochentag(text: string): (typeof REIHENFOLGE)[number] | null {
  return WOCHENTAGE[text.trim().toLowerCase().replace(/\.$/, "")] ?? null;
}

/**
 * „Montag – Donnerstag" → alle vier Tage. Gibt null zurück, sobald ein
 * Teil unverständlich ist: lieber die ganze Zeile auslassen, als sie
 * halb zu melden.
 */
function wochentage(text: string): (typeof REIHENFOLGE)[number][] | null {
  const gefunden: (typeof REIHENFOLGE)[number][] = [];

  for (const teil of text.split(AUFZAEHLUNG).filter(Boolean)) {
    const enden = teil.split(BEREICH).filter(Boolean);

    if (enden.length === 1) {
      const einzeln = wochentag(enden[0]);
      if (!einzeln) return null;
      gefunden.push(einzeln);
      continue;
    }

    if (enden.length !== 2) return null;
    const von = wochentag(enden[0]);
    const bis = wochentag(enden[1]);
    if (!von || !bis) return null;

    // Zählt im Kreis, damit auch „Freitag – Montag" aufgeht.
    const ende = REIHENFOLGE.indexOf(bis);
    for (let i = REIHENFOLGE.indexOf(von); ; i = (i + 1) % REIHENFOLGE.length) {
      gefunden.push(REIHENFOLGE[i]);
      if (i === ende) break;
    }
  }

  return gefunden.length ? [...new Set(gefunden)] : null;
}

function uhrzeit(stunde: string, minute: string): string | null {
  const h = Number(stunde);
  const m = Number(minute);
  if (h > 23 || m > 59) return null;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

function zeitspannen(text: string): { opens: string; closes: string }[] {
  const spannen: { opens: string; closes: string }[] = [];

  for (const treffer of text.matchAll(ZEITSPANNE)) {
    const opens = uhrzeit(treffer[1], treffer[2]);
    const closes = uhrzeit(treffer[3], treffer[4]);
    if (opens && closes) spannen.push({ opens, closes });
  }

  return spannen;
}

export type OeffnungszeitenSpezifikation = {
  "@type": "OpeningHoursSpecification";
  dayOfWeek: string[];
  opens: string;
  closes: string;
};

/**
 * Die Zeilen aus dem Editor als openingHoursSpecification für Google.
 * Was sich nicht sicher lesen lässt, fällt weg.
 */
export function oeffnungszeitenFuerGoogle(
  zeilen: readonly { readonly days: string; readonly time: string }[]
): OeffnungszeitenSpezifikation[] {
  const spezifikationen: OeffnungszeitenSpezifikation[] = [];

  for (const zeile of zeilen) {
    const dayOfWeek = wochentage(zeile.days ?? "");
    if (!dayOfWeek) continue;

    const zeit = (zeile.time ?? "").trim();

    // Google liest 00:00 bis 00:00 als „an diesem Tag geschlossen". Das
    // ausdrücklich zu melden ist besser, als den Tag wegzulassen: sonst
    // steht dort gar nichts und der Suchende weiß nicht, ob offen ist.
    if (GESCHLOSSEN.test(zeit)) {
      spezifikationen.push({
        "@type": "OpeningHoursSpecification",
        dayOfWeek,
        opens: "00:00",
        closes: "00:00",
      });
      continue;
    }

    for (const spanne of zeitspannen(zeit)) {
      spezifikationen.push({
        "@type": "OpeningHoursSpecification",
        dayOfWeek,
        ...spanne,
      });
    }
  }

  return spezifikationen;
}

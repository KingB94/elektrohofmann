// ---------------------------------------------------------------
// Nimmt das Kontaktformular entgegen und schickt die Anfrage per
// E-Mail an den Betrieb. Ersetzt Netlify Forms.
//
// Versendet wird über Resend, angesprochen per schlichtem fetch —
// dadurch braucht es kein zusätzliches Paket, und der Code läuft
// unverändert lokal wie im Cloudflare Worker.
//
// Die Empfängeradresse kommt aus derselben Datei, die der Kunde im
// Editor pflegt. Ändert er sie dort, wird sie beim nächsten Build
// mit eingebaut — sie muss nirgends ein zweites Mal eingetragen
// werden. Der Import geschieht beim Bauen, nicht bei jedem Aufruf:
// im Worker gibt es keine Dateien zum Nachlesen.
// ---------------------------------------------------------------
import betrieb from "@/content/betrieb.json";

const RESEND_ENDPUNKT = "https://api.resend.com/emails";

// Muss eine bei Resend freigeschaltete Domain sein — sonst lehnt der
// Versand ab. Vorgesehen ist elektrohofmann.info.
const ABSENDER =
  process.env.ANFRAGE_ABSENDER ??
  "Website Elektro Hofmann <formular@elektrohofmann.info>";

// Grenzen gegen ausufernde Einsendungen. Großzügig genug, dass kein
// echtes Anliegen daran scheitert.
const GRENZEN = { name: 100, kontakt: 200, nachricht: 5000 };

function text(wert: unknown, grenze: number): string {
  return typeof wert === "string" ? wert.trim().slice(0, grenze) : "";
}

function antwort(daten: object, status: number) {
  return Response.json(daten, { status });
}

export async function POST(request: Request) {
  let eingabe: Record<string, unknown>;
  try {
    eingabe = await request.json();
  } catch {
    return antwort({ fehler: "Unlesbare Anfrage." }, 400);
  }

  // Honigtopf: Das Feld ist für Menschen unsichtbar. Ist es ausgefüllt,
  // war es ein Bot. Wir antworten trotzdem freundlich — wer nichts
  // erfährt, passt seinen Versuch auch nicht an.
  if (text(eingabe.firmenname, 100)) {
    return antwort({ ok: true }, 200);
  }

  const name = text(eingabe.name, GRENZEN.name);
  const kontakt = text(eingabe.kontakt, GRENZEN.kontakt);
  const nachricht = text(eingabe.nachricht, GRENZEN.nachricht);

  if (!name || !kontakt || !nachricht) {
    return antwort({ fehler: "Bitte füllen Sie alle Felder aus." }, 400);
  }

  const schluessel = process.env.RESEND_API_KEY;
  if (!schluessel) {
    // Gleiche Haltung wie beim Redaktionssystem: Die Website läuft
    // weiter, nur dieser eine Weg meldet sich verständlich ab.
    console.error(
      "[Anfrage] RESEND_API_KEY fehlt — das Kontaktformular kann nichts versenden."
    );
    return antwort({ fehler: "Der Versand ist gerade nicht eingerichtet." }, 503);
  }

  const versand = await fetch(RESEND_ENDPUNKT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${schluessel}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: ABSENDER,
      to: [betrieb.email],
      // Antwortet der Betrieb aus seinem Postfach heraus, geht die
      // Antwort direkt an den Anfragenden — sofern er eine E-Mail-
      // Adresse hinterlassen hat und keine Telefonnummer.
      ...(kontakt.includes("@") ? { reply_to: kontakt } : {}),
      subject: `Anfrage über die Website von ${name}`,
      text: [
        `Name:             ${name}`,
        `Telefon/E-Mail:   ${kontakt}`,
        "",
        "Anliegen:",
        nachricht,
        "",
        "—",
        "Gesendet über das Kontaktformular auf der Website.",
      ].join("\n"),
    }),
  });

  if (!versand.ok) {
    const grund = await versand.text().catch(() => "");
    console.error(`[Anfrage] Resend antwortete ${versand.status}: ${grund}`);
    return antwort({ fehler: "Der Versand hat nicht geklappt." }, 502);
  }

  return antwort({ ok: true }, 200);
}

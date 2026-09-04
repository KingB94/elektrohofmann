// ---------------------------------------------------------------
// Keystatic — das Redaktionssystem der Website.
//
// Gespeichert wird als JSON unter /content, Bilder landen in
// /public/images — beides ganz normal im Git-Repository.
//
// Lokal (npm run dev) schreibt der Editor direkt auf die Festplatte.
// In der Live-Umgebung läuft er über GitHub: Jede Änderung des Kunden
// wird zu einem Commit, der automatisch einen neuen Build auslöst.
// ---------------------------------------------------------------

import { config, fields, singleton, collection } from "@keystatic/core";

// Bilder liegen alle im selben Ordner wie die bereits vorhandenen —
// so vermischen sich Bestand und neue Uploads nicht.
const bildFeld = (label: string, description: string) =>
  fields.image({
    label,
    description,
    directory: "public/images",
    publicPath: "/images",
    validation: { isRequired: true },
  });

const iconAuswahl = (defaultValue: "install" | "solar" | "check" | "repair" | "media" | "led") =>
  fields.select({
    label: "Symbol",
    description: "Bestimmt das gezeichnete Icon über der Überschrift.",
    options: [
      { label: "Steckdose (Installation)", value: "install" },
      { label: "Sonne (Photovoltaik)", value: "solar" },
      { label: "Haken (Prüfung)", value: "check" },
      { label: "Werkzeug (Reparatur)", value: "repair" },
      { label: "Antenne (TV/SAT)", value: "media" },
      { label: "Leuchte (LED)", value: "led" },
    ],
    defaultValue,
  });

const kicker = fields.text({
  label: "Kleine Überschrift",
  description: "Das kurze blaue Wort über der großen Überschrift.",
});

// Lokal (npm run dev) schreibt der Editor direkt auf die Festplatte,
// live läuft er über GitHub.
//
// ⚠️ Diese Entscheidung MUSS an NODE_ENV hängen und darf NICHT an den
// GitHub-Zugangsdaten hängen. Die Editor-Oberfläche wird im Browser
// ausgeführt, und in den Browser gelangen ausschließlich Variablen mit
// dem Präfix NEXT_PUBLIC_. Eine Bedingung über CLIENT_ID/SECRET ist im
// Browser deshalb immer unwahr — der Editor liefe live im lokalen
// Modus, ohne Anmeldeknopf, während der Server GitHub erwartet.
// NODE_ENV dagegen wird beim Bauen fest in das Browser-Bündel
// eingesetzt und stimmt auf beiden Seiten überein.
//
// NEXT_PUBLIC_KEYSTATIC_MODE=github erzwingt den GitHub-Modus auch beim
// Entwickeln. Einmalig nötig zum Anlegen der GitHub-App: Keystatic zeigt
// den Einrichtungsassistenten nur im GitHub-Modus, und ohne Zugangsdaten
// läuft dieser Assistent ausschließlich in der Entwicklungsumgebung.
// Live wirft Keystatic in derselben Lage einen Fehler — auf der
// Netlify-Adresse ist der Assistent also nicht erreichbar.
const githubModus =
  process.env.NODE_ENV !== "development" ||
  process.env.NEXT_PUBLIC_KEYSTATIC_MODE === "github";

// Nur ein früher Hinweis beim Bauen. Fehlen die Werte tatsächlich,
// meldet sich Keystatic beim Anmelden ohnehin selbst mit einem Fehler.
//
// Die Prüfung läuft bewusst nur auf dem Server (typeof window):
// im Browser sind diese drei Variablen immer leer, dort wäre die
// Warnung ein Fehlalarm in der Konsole des Kunden.
if (
  typeof window === "undefined" &&
  githubModus &&
  !(
    process.env.KEYSTATIC_GITHUB_CLIENT_ID &&
    process.env.KEYSTATIC_GITHUB_CLIENT_SECRET &&
    process.env.KEYSTATIC_SECRET
  )
) {
  console.warn(
    "\n[Keystatic] Achtung: KEYSTATIC_GITHUB_CLIENT_ID, " +
      "KEYSTATIC_GITHUB_CLIENT_SECRET und KEYSTATIC_SECRET sind nicht " +
      "gesetzt. Die Anmeldung am Editor wird fehlschlagen.\n"
  );
}

export default config({
  storage: githubModus
    ? // ⚠️ Nach der Übertragung des Repositorys auf das Konto des Kunden
      // muss hier sein GitHub-Benutzername stehen. Bleibt der alte drin,
      // speichert der Editor gegen ein Repository, das ihm nicht gehört.
      { kind: "github", repo: { owner: "KingB94", name: "elektrohofmann" } }
    : { kind: "local" },

  ui: {
    brand: { name: "Elektro Hofmann" },
    // Gruppen in der linken Seitenleiste — hält die Oberfläche
    // übersichtlich, auch wenn später mehr dazukommt.
    navigation: {
      Stammdaten: ["betrieb"],
      Startseite: ["hero", "zahlen", "leistungen", "ablauf", "ueberUns", "kontakt"],
      "Weitere Inhalte": ["referenzen"],
    },
  },

  singletons: {
    // ----------------------------------------------------------------
    betrieb: singleton({
      label: "Betriebsdaten",
      path: "content/betrieb",
      format: { data: "json" },
      schema: {
        name: fields.text({ label: "Firmenname" }),
        legalSuffix: fields.text({ label: "Zusatz unter dem Namen" }),
        claim: fields.text({ label: "Slogan" }),

        phoneDisplay: fields.text({
          label: "Telefon",
          description: "So wie es auf der Seite steht, z. B. 08681 478397",
        }),
        mobileDisplay: fields.text({ label: "Mobil" }),
        faxDisplay: fields.text({ label: "Fax" }),
        email: fields.text({ label: "E-Mail-Adresse" }),

        strasse: fields.text({ label: "Straße und Hausnummer" }),
        plz: fields.text({ label: "Postleitzahl" }),
        ort: fields.text({ label: "Ort" }),

        owner: fields.text({ label: "Inhaber" }),
        ownerRole: fields.text({ label: "Funktion des Inhabers" }),

        hours: fields.array(
          fields.object({
            days: fields.text({ label: "Tage" }),
            time: fields.text({ label: "Zeit" }),
          }),
          {
            label: "Öffnungszeiten",
            description: "Zeilen lassen sich per Anfasser links neu sortieren.",
            itemLabel: (props) => props.fields.days.value || "Neue Zeile",
          }
        ),

        ratingValue: fields.number({
          label: "Google-Bewertung",
          description: "Zahl zwischen 1 und 5, z. B. 5",
          validation: { min: 1, max: 5 },
        }),
        ratingCount: fields.text({ label: "Anzahl der Bewertungen" }),
        googleMapsUrl: fields.url({ label: "Link zu Google Maps" }),

        // Diese vier Angaben stehen im Impressum und sind rechtlich
        // relevant — deshalb hier pflegbar statt fest im Code.
        legalForm: fields.text({ label: "Rechtsform" }),
        vatId: fields.text({ label: "Umsatzsteuer-Identifikationsnummer" }),
        profession: fields.text({
          label: "Berufsbezeichnung",
          description: "Gesetzlich geschützte Bezeichnung, wie im Impressum anzugeben.",
        }),
        chamber: fields.text({ label: "Zuständige Kammer" }),
      },
    }),

    // ----------------------------------------------------------------
    hero: singleton({
      label: "Kopfbereich",
      path: "content/startseite/hero",
      format: { data: "json" },
      schema: {
        badge: fields.text({ label: "Kleiner Hinweis im Rahmen" }),
        headlineZeile1: fields.text({ label: "Überschrift, Zeile 1" }),
        headlineZeile2: fields.text({
          label: "Überschrift, Zeile 2",
          description: "Das letzte Wort dieser Zeile wird blau hervorgehoben.",
        }),
        text: fields.text({
          label: "Einleitungstext",
          multiline: true,
        }),
        bild: bildFeld(
          "Hintergrundbild",
          "Querformat, mindestens 2000 Pixel breit. Der untere Teil wird vom Text überdeckt."
        ),
        routenButton: fields.text({ label: "Beschriftung zweiter Knopf" }),
      },
    }),

    // ----------------------------------------------------------------
    zahlen: singleton({
      label: "In Zahlen",
      path: "content/startseite/zahlen",
      format: { data: "json" },
      schema: {
        kicker,
        headline: fields.text({ label: "Überschrift" }),
        eintraege: fields.array(
          fields.object({
            // Jahreszahlen sollen nicht jedes Jahr von Hand nachgezogen
            // werden müssen — deshalb lässt sich hier auswählen, ob die
            // Zahl fest steht oder aus dem Datum berechnet wird.
            quelle: fields.select({
              label: "Woher kommt die Zahl?",
              description:
                "Automatisch berechnete Zahlen bleiben ohne Ihr Zutun aktuell.",
              options: [
                { label: "Fest eingetragen", value: "fest" },
                { label: "Jahre im Handwerk (seit 1991)", value: "jahreHandwerk" },
                { label: "Jahre eigener Betrieb (seit 2005)", value: "jahreBetrieb" },
                { label: "Anzahl der Leistungen", value: "anzahlLeistungen" },
              ],
              defaultValue: "fest",
            }),
            wert: fields.number({
              label: "Zahl",
              description: "Wird nur verwendet, wenn oben „Fest eingetragen\u201c gewählt ist.",
            }),
            label: fields.text({ label: "Bezeichnung" }),
            note: fields.text({ label: "Erläuterung darunter", multiline: true }),
          }),
          {
            label: "Kennzahlen",
            itemLabel: (props) => props.fields.label.value || "Neue Kennzahl",
          }
        ),
        chronik: fields.array(
          fields.object({
            year: fields.text({ label: "Jahr" }),
            label: fields.text({ label: "Was war", multiline: true }),
          }),
          {
            label: "Chronik",
            description: "Steht im Kasten rechts neben den Kennzahlen.",
            itemLabel: (props) => props.fields.year.value || "Neuer Eintrag",
          }
        ),
        hinweis: fields.text({
          label: "Text im Kasten rechts",
          description: "Steht unter der Chronik.",
          multiline: true,
        }),
      },
    }),

    // ----------------------------------------------------------------
    leistungen: singleton({
      label: "Leistungen",
      path: "content/startseite/leistungen",
      format: { data: "json" },
      schema: {
        kicker,
        headline: fields.text({ label: "Überschrift" }),
        intro: fields.text({ label: "Text rechts neben der Überschrift", multiline: true }),
        eintraege: fields.array(
          fields.object({
            title: fields.text({ label: "Titel" }),
            description: fields.text({ label: "Beschreibung", multiline: true }),
            icon: iconAuswahl("install"),
          }),
          {
            label: "Leistungen",
            description: "Reihenfolge per Anfasser änderbar, neue Kacheln unten hinzufügen.",
            itemLabel: (props) => props.fields.title.value || "Neue Leistung",
          }
        ),
      },
    }),

    // ----------------------------------------------------------------
    ablauf: singleton({
      label: "Ablauf",
      path: "content/startseite/ablauf",
      format: { data: "json" },
      schema: {
        kicker,
        headline: fields.text({ label: "Überschrift" }),
        schritte: fields.array(
          fields.object({
            title: fields.text({ label: "Titel" }),
            body: fields.text({ label: "Text", multiline: true }),
            aside: fields.text({ label: "Kurzhinweis rechts" }),
          }),
          {
            label: "Schritte",
            description: "Die Nummerierung (01, 02, 03) entsteht automatisch.",
            itemLabel: (props) => props.fields.title.value || "Neuer Schritt",
          }
        ),
      },
    }),

    // ----------------------------------------------------------------
    ueberUns: singleton({
      label: "Der Betrieb",
      path: "content/startseite/betrieb",
      format: { data: "json" },
      schema: {
        kicker,
        headline: fields.text({
          label: "Überschrift",
          description: "Zeilenumbruch mit Eingabetaste möglich.",
          multiline: true,
        }),
        absatz1: fields.text({ label: "Erster Absatz", multiline: true }),
        absatz2: fields.text({ label: "Zweiter Absatz", multiline: true }),
        bildGross: bildFeld("Großes Bild", "Querformat, wird oben rechts angezeigt."),
        bildKlein: bildFeld("Zweites Bild", "Querformat, steht unter dem großen Bild."),
        galerie: fields.array(
          fields.object({
            bild: bildFeld("Bild", "Querformat, mindestens 1200 Pixel breit."),
            alt: fields.text({
              label: "Bildbeschreibung",
              description:
                "Was ist zu sehen? Wird Blinden vorgelesen und steht da, wenn das Bild nicht lädt.",
            }),
          }),
          {
            label: "Weitere Bilder",
            description:
              "Eine Reihe zusätzlicher Fotos unter dem Werdegang. Drei Bilder ergeben eine volle Reihe. Ohne Einträge bleibt die Reihe aus.",
            itemLabel: (props) => props.fields.alt.value || "Neues Bild",
          }
        ),
        vertrauen: fields.array(
          fields.object({
            title: fields.text({ label: "Titel" }),
            body: fields.text({ label: "Text", multiline: true }),
          }),
          {
            label: "Drei Kästen ganz unten",
            itemLabel: (props) => props.fields.title.value || "Neuer Kasten",
          }
        ),
      },
    }),

    // ----------------------------------------------------------------
    kontakt: singleton({
      label: "Kontakt",
      path: "content/startseite/kontakt",
      format: { data: "json" },
      schema: {
        kicker,
        headline: fields.text({ label: "Überschrift" }),
        formTitel: fields.text({ label: "Überschrift über dem Formular" }),
        formText: fields.text({ label: "Text über dem Formular", multiline: true }),
      },
    }),
  },

  collections: {
    // ----------------------------------------------------------------
    // Beispiel für eine Sammlung: beliebig viele gleichartige Einträge,
    // die der Kunde selbst anlegen und löschen kann. Aktuell nicht auf
    // der Website eingebaut — dient zum Ausprobieren.
    referenzen: collection({
      label: "Referenzen",
      slugField: "titel",
      path: "content/referenzen/*",
      format: { data: "json" },
      columns: ["titel", "ort", "jahr"],
      schema: {
        titel: fields.slug({
          name: {
            label: "Titel",
            description: "Zum Beispiel: Photovoltaikanlage Gewerbehalle",
          },
        }),
        ort: fields.text({ label: "Ort" }),
        jahr: fields.text({ label: "Jahr" }),
        bild: fields.image({
          label: "Projektbild",
          directory: "public/images",
          publicPath: "/images",
        }),
        beschreibung: fields.text({ label: "Kurzbeschreibung", multiline: true }),
      },
    }),
  },
});

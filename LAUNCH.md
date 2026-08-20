# Live-Schaltung Elektro Hofmann — Plan & Checkliste

Stand: 20.08.2026 · Kunde hat die Website gebucht.

**Entscheidungen, die schon gefallen sind:**

- **Design:** Variante B („Hell & Premium") wird die Startseite. Varianten A und C
  bleiben auf ausdrücklichen Kundenwunsch als eigene Routen erhalten (weiter `noindex`).
- **CMS:** Keystatic, Umstellung von `local` auf **GitHub-Storage**. Der Kunde pflegt
  Texte und Bilder selbst unter `/keystatic`.
- **Hosting:** **Netlify Starter (kostenlos)**.
- **Domain:** bleibt bei Strato, nur die DNS-Einträge zeigen auf Netlify.

---

## 1. Warum Netlify

Strato-Webhosting kann kein Next.js (nur PHP/statisch) — die Seite kann dort nicht liegen.

Netlify erlaubt **kommerzielle Nutzung auf dem kostenlosen Plan ausdrücklich** (im
Gegensatz zu Vercel, dessen Hobby-Plan das verbietet). Netlify-Support wörtlich:

> „Yes, you can use the free plan for commercial projects. What ToS means is that you
> can't resell it […] but you can definitely charge your customers for your services in
> building and maintaining their websites."

Also: eigene Arbeit abrechnen ja, Hosting weiterverkaufen nein. Passt.

**Was der Free-Plan bietet:**

- Next.js 16 wird unterstützt (Netlify Runtime v5)
- 100 GB Bandbreite/Monat, 300 Build-Minuten/Monat — für diese Seite weit überdimensioniert.
  Jede Keystatic-Speicherung löst einen Rebuild von ~1–2 Min. aus.
- Eigene Domain + SSL kostenlos, Auto-Deploy bei jedem Commit
- **Netlify Forms** (100 Einsendungen/Monat gratis) → löst nebenbei das Kontaktformular

### Geprüfte, aber verworfene Alternativen

| Option | Kosten | Warum nicht |
| --- | --- | --- |
| Cloudflare Workers | 0 € | Geht (OpenNext-Adapter, Next 16 unterstützt), aber deutlich mehr Einrichtung: wrangler-Config, KV-Namespace. Lohnt erst bei viel Traffic. |
| Vercel Pro | ~20 $/Monat | Hobby-Plan verbietet gewerbliche Nutzung. Pro ist für diese Seite rausgeworfenes Geld. |
| Alles statisch auf Strato-Webspace | 0 € | **Geht nicht.** Keystatic braucht zwingend einen Server für den API-Handler (GitHub-OAuth-Login + Git-Schreiboperationen: `/api/keystatic/github/login`, `/oauth/callback`, `/branch/**`). Man müsste den Editor separat betreiben — zwei Deploy-Ziele, kein Vorteil. |

### Laufende Kosten für den Kunden

| Posten | Kosten |
| --- | --- |
| Domain bei Strato | zahlt er ohnehin schon |
| Hosting (Netlify) | 0 € |
| GitHub (privates Repo) | 0 € |
| CMS (Keystatic, Open Source) | 0 € |

→ **Einzige laufende Fremdkosten: die Domain.**

Kein Lock-in: Es ist nur ein Next.js-Repo auf GitHub. Umzug zu Cloudflare oder Vercel
wäre jederzeit in Minuten möglich.

---

## 2. Technischer Stand

### Erledigt

- [x] **Komponenten an Keystatic angeschlossen.** Alle Abschnitte der Live-Seite lesen
      ihre Inhalte über `lib/inhalte.ts` aus `content/`. Was der Kunde im Editor ändert,
      steht nach dem nächsten Build auf der Seite.
- [x] **Entwurf B ist die Startseite** (`/`). A und C liegen als Archiv unter
      `/variante-a` und `/variante-c`, beide `noindex`. Der Entwurfs-Umschalter
      erscheint nur dort, nicht auf der öffentlichen Seite.
- [x] **Impressum und Datenschutz** in die Live-Gestaltung übernommen (lagen vorher im
      Design von Entwurf A) und an die Betriebsdaten aus dem Editor angeschlossen.
      Rechtsform, USt-ID, Berufsbezeichnung und Kammer sind jetzt im Editor pflegbar.
- [x] **404-Seite** auf die Live-Gestaltung umgestellt.
- [x] **Keystatic-Speicherung**: schaltet automatisch auf GitHub, sobald die drei
      Zugangsdaten gesetzt sind — sonst lokaler Modus. Fehlen sie im Livebetrieb,
      warnt der Build in den Logs.
- [x] **Kontaktformular** auf Netlify Forms umgestellt (vorher nur ein `mailto:`-Link,
      der auf Handys ohne Mailprogramm ins Leere lief). Mit Honigtopf gegen Bots und
      verständlicher Fehlermeldung, falls der Versand scheitert.
- [x] **Kennzahlen** lassen sich im Editor wahlweise fest eintragen oder automatisch
      berechnen — die Seite veraltet nicht mehr beim Jahreswechsel.
- [x] **`netlify.toml`** angelegt (Build-Befehl, Node-Version, `noindex`-Kopfzeilen).
- [x] **Aufgeräumt**: Finder-Dubletten gelöscht, `robots.ts` und `sitemap.ts` ziehen die
      Adresse jetzt aus `NEXT_PUBLIC_SITE_URL`, README neu geschrieben.

Build und Linter laufen sauber durch.

### Offen — braucht Zugangsdaten oder eine Entscheidung

- [ ] **GitHub-App für Keystatic anlegen.** Der Assistent liegt nach dem ersten Deploy
      unter `/keystatic/setup`. Ergebnis sind vier Werte, die bei Netlify unter
      *Environment variables* eingetragen werden (Vorlage: `.env.example`):
      `KEYSTATIC_GITHUB_CLIENT_ID`, `KEYSTATIC_GITHUB_CLIENT_SECRET`,
      `KEYSTATIC_SECRET`, `NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG`
- [ ] **`NEXT_PUBLIC_SITE_URL`** bei Netlify auf die echte Domain setzen — hängt an der
      Domain-Frage unten.
- [ ] **Netlify-Projekt anlegen**, mit dem GitHub-Repo verbinden, Testdeploy prüfen.
- [ ] **Formular-Benachrichtigung** bei Netlify einschalten (Forms → Notifications), damit
      Anfragen per Mail beim Betrieb landen statt nur im Netlify-Dashboard.
- [ ] **Öffnungszeiten im strukturierten Datensatz**: In `app/layout.tsx` stehen Mo–Fr
      08:00–18:00 fest, weil Google ein maschinenlesbares Format braucht. Bestätigt der
      Kunde andere Zeiten, hier mitziehen.

## 3. Was beim Kundentermin gebraucht wird

### Zugänge

- [ ] **GitHub-Account des Kunden** (kostenlos, vorher anlegen lassen spart Zeit)
      → als Collaborator ins private Repo einladen. **Ohne das kein CMS-Login.**
- [ ] **Strato-Zugangsdaten** für die DNS-Umstellung

### DNS bei Strato umstellen

1. Strato-Kundenbereich → Domainverwaltung → DNS
2. A-/CNAME-Werte eintragen, **die Netlify im Projekt anzeigt**
3. ⚠️ **MX-Einträge nicht anfassen** — sonst sind die E-Mail-Postfächer tot
4. Vorher klären:
   - [ ] Liegt auf der Domain aktuell schon eine Seite? Die geht beim Umstellen offline.
   - [ ] Erlaubt der Strato-Tarif freie A-Einträge für die Root-Domain?
   - [ ] Kann der Kunde auf ein günstigeres reines Domain-Paket runterstufen?
         **Vorsicht:** E-Mail-Postfächer hängen bei Strato meist am Hostingpaket.
         Er nutzt aktuell `hofmanngreinach@t-online.de` — erst klären, ob überhaupt
         Strato-Postfächer im Einsatz sind, bevor da etwas gekündigt wird.

### Inhalte prüfen (⚠️ vor dem Live-Schalten)

Die Angaben stammen größtenteils von der alten, archivierten Website (~2014) und aus
Branchenverzeichnissen. Beim Termin gegenprüfen:

- [ ] **Impressum**: USt-ID (`DE244185087`), Berufsbezeichnung, Handwerkskammer, Rechtsform
- [ ] Öffnungszeiten
- [ ] Anzahl der Google-Bewertungen
- [ ] Telefon-, Mobil- und Faxnummer
- [ ] Zeigt `public/images/gewerbehalle.jpg` das eigene Gelände oder ein Referenzprojekt?
- [ ] Kontakt-E-Mail: bleibt es bei der t-online-Adresse oder eine neue unter eigener Domain?
- [ ] **Eigene Fotos einsammeln** — aktuell liegen nur vier Bilder im Projekt
      (`betriebsgelaende-luftbild.jpg`, `gewerbehalle.jpg`, `teleskoplader.jpg`, `logo.png`)

### Einweisung (15–20 Minuten)

`deinedomain.de/keystatic` → mit GitHub anmelden → Texte und Bilder ändern → speichern.
Änderung landet als Commit im Repo, Netlify baut automatisch neu, nach ~1 Minute live.
Der Editor ist bereits komplett auf Deutsch beschriftet.

---

## 4. Alte Website elektrohofmann.info

Läuft noch (Joomla), erreichbar **nur über HTTP** — kein gültiges Zertifikat, der
SSL-Handshake schlägt fehl. Das ist der „unsicher"-Hinweis, den der Kunde im Browser sieht.
Struktur: Startseite, Leistungen, Über Uns, Kontakt & Anfahrt, Impressum.

### Bereits übernommen (erledigt)

Texte aus der alten Seite in die bestehenden Slots eingearbeitet — **ohne Layout-Änderung**:

- **Leistungen**: alle sechs Beschreibungen mit den konkreten Angaben der alten Seite
  angereichert (Teleskoplader 10 m Hubhöhe · E-Check-Umfang · Werkstattreparatur zum
  normalen Stundenlohn statt Kundendiensttarif · Kathrein/Fuba/Hirschmann, bis 50 Teilnehmer ·
  LED-Beispiel 2 × 58 W → 57 W)
- **Der Betrieb**: Werdegang präzisiert (Elektro Rehrl in Lauter, Baustellenleiter im
  Wohnungsbau, Betriebselektriker im Hofbräuhaus Traunstein); Normen-Zusage aus dem
  alten Begrüßungstext ergänzt
- **Chronik**: Beschriftungen konkretisiert (Anzahl der Einträge bewusst bei 5 belassen —
  die Liste ist im Layout an die Bildhöhe daneben gekoppelt)
- **`BGV A3` → `DGUV Vorschrift 3`**: die alte Bezeichnung wurde 2014 abgelöst und stand
  noch an vier Stellen im Projekt. Korrigiert.

Geändert in `content/startseite/leistungen.json`, `content/startseite/betrieb.json`,
`data/business.ts`, `components/variants/b/BetriebB.tsx`.

### ⚠️ Bewusst NICHT übernommen

- **Keine Bilder von der alten Seite.** Das alte Impressum listet ~30 Fotolia-Stockfotos,
  lizenziert über die damalige Agentur (jkv-onliner.de). Diese Lizenzen gehen nicht auf
  uns über — Übernahme wäre eine Abmahnfalle. Stattdessen eigene Fotos beim Kunden holen.
- **Teamgröße**: „ein Obermonteur, ein Monteur, ein Meister sowie 3 Aushilfskräfte" —
  Stand ca. 2014, ungeprüft. Bleibt draußen, bis der Kunde die aktuelle Zahl nennt.

### Beim Kunden klären

- [ ] **Ist elektrohofmann.info die Strato-Domain**, auf die wir umstellen, oder kommt eine
      andere (z. B. `.de`)? Falls es dieselbe ist, geht die alte Seite mit der DNS-Umstellung
      automatisch offline — sonst muss die Joomla-Installation separat abgeschaltet werden.
      **Die unsichere Installation darf nicht online bleiben.**
- [ ] **301-Weiterleitungen** einrichten, falls die Domain gleich bleibt:
      `/leistungen`, `/ueber-uns`, `/kontakt-anfahrt`, `/impressum` → neue Startseite bzw.
      die passenden Abschnitte. Sonst laufen bestehende Google-Treffer ins Leere.
- [ ] **Link auf `elektro-demel.de`**: Im Begrüßungstext der alten Startseite ist das Wort
      „allen" mit einem anderen Elektrobetrieb verlinkt — für einen redaktionellen Link
      ungewöhnlich platziert. Entweder eine Partner-Verlinkung oder ein eingeschleuster
      SEO-Link (passt zum Bild einer nicht gepflegten Joomla-Installation). Nachfragen,
      ob das gewollt war. Auf der neuen Seite ist er nicht enthalten.
- [ ] **Berufsbezeichnung im Impressum**: Die alte Seite schreibt „Elektrotechniker für
      Energie- und Gebäudetechnik", unsere Seite „Elektrotechnikermeister …". Die
      Über-uns-Seite nennt den Meisterabschluss 2004/05. Welche Formulierung soll ins
      Impressum? (Rechtlich relevant, im Zweifel prüfen lassen.)
- [ ] **Zwei Leistungen haben aktuell keine eigene Kachel**, weil das Leistungsraster auf
      sechs Kacheln (3 × 2) ausgelegt ist und eine siebte eine Lücke reißen würde:
      1. **Elektrohandel** — Installationsmaterial ab Lager, angebrochene Verpackungen
         können zurückgegeben werden, Direktlieferung vom Großhändler zum Kunden.
         Ein echtes Unterscheidungsmerkmal gegenüber Baumarkt und Internet.
      2. **Teleskopladerarbeiten als eigene Dienstleistung** (seit 2011, Gabel/Schaufel/
         Hubarbeitsbühne, 10 m, 3 t — auch für Dachdecker und Sanierungen).
         Steht bisher nur als Detail bei Photovoltaik.
      Frage an den Kunden: wichtig genug für eigene Kacheln? Dann würde das Raster auf
      acht Kacheln gehen — das wäre eine Layout-Entscheidung, die er treffen muss.

---

## Quellen

- [Netlify: kommerzielle Nutzung im Free-Plan](https://answers.netlify.com/t/can-we-use-netlify-free-plan-for-commercial-purposes/41545)
- [Netlify Changelog: Next.js 16](https://www.netlify.com/changelog/next-js-16-deploy-on-netlify/)
- [Netlify Docs: Next.js](https://docs.netlify.com/build/frameworks/framework-setup-guides/nextjs/overview/)
- [OpenNext Cloudflare Adapter](https://opennext.js.org/cloudflare)
- Keystatic API-Handler-Routen: `_autodocs/api-reference/api-handler.md`

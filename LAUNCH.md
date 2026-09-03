# Live-Schaltung Elektro Hofmann — Plan & Checkliste

Stand: 20.08.2026 · Kunde hat die Website gebucht.

**Entscheidungen, die schon gefallen sind:**

- **Design:** Variante B („Hell & Premium") wird die Startseite. Varianten A und C
  bleiben auf ausdrücklichen Kundenwunsch als eigene Routen erhalten (weiter `noindex`).
- **CMS:** Keystatic, Umstellung von `local` auf **GitHub-Storage**. Der Kunde pflegt
  Texte und Bilder selbst unter `/keystatic`.
- **Hosting:** **Netlify Starter (kostenlos)**.
- **Domain:** bleibt bei Strato, nur die DNS-Einträge zeigen auf Netlify.
- **Ablauf:** **zwei Termine.** Am 04.09. wird das Setup fertiggestellt — die
  Seite läuft dann vollständig unter einer `*.netlify.app`-Adresse und der Kunde
  kann sie pflegen. Den Wechsel auf seine Domain (DNS + Abschaltung der alten
  Seite) terminiert er selbst; das ist ein eigener, kurzer Termin.
  Ablaufplan für beide: `TERMIN-04-09.md`.

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
| Alles statisch auf Strato-Webspace | 0 € | **Geht nicht — und keine Paketstufe ändert das.** Strato-Webhosting bietet über *alle* Tarife hinweg nur PHP 8.4, Perl, Python und Ruby, kein Node.js und keinen Root-Zugriff; auch Pro für 22 €/Mon. nicht. Ein größeres Paket kauft Speicherplatz und Domains, keine Laufzeitumgebung. Selbst als statischer Export scheitert es an Keystatic: der API-Handler braucht einen Server (GitHub-OAuth + Git-Schreiboperationen: `/api/keystatic/github/login`, `/oauth/callback`, `/branch/**`). Dazu käme `next/image` ohne Optimierung (13 Dateien nutzen es) und ein Ersatz fürs Kontaktformular. Man müsste den Editor separat betreiben — zwei Deploy-Ziele, kein Vorteil. Und zu sparen gäbe es nichts: Netlify kostet 0 €. |
| Strato vServer | 8 €/Mon. + 9 € Setup | Node.js liefe, aber nacktes Linux: Prozess, nginx, certbot, Updates, Backups, Deploy-Pipeline — alles selbst. Für sechs Leistungskacheln absurd. |
| Eigenes Hosting auf netcup | ~0 € marginal | **Später, nicht zum 04.09.** Siehe unten. |

#### Eigenes netcup-Hosting — vertagt, nicht verworfen

Wir hosten Kundenseiten selbst bei netcup. Für diese Seite ginge das — **aber nur auf
VPS/Root-Server**. netcup-Webhosting scheidet aus demselben Grund aus wie Strato: Node.js
ist über Plesk nominell da, hält aber keinen dauerhaften Prozess (Timeout killt ihn).

Auf einem eigenen Server zu bauen wäre: GitHub Actions → SSH-Deploy, systemd/PM2, nginx +
certbot, und **Ersatz für Netlify Forms** (`components/ContactForm.tsx` und
`public/__forms.html` hängen daran). Das ist ein lohnendes eigenes Projekt — einmal gebaut
trägt die Pipeline jede weitere Kundenseite. Nur nicht zwei Wochen vor diesem Termin.

Reihenfolge: am 04.09. auf Netlify live, Umzug später als reine DNS-Änderung plus Deploy.
Der Kunde merkt davon nichts. Für eine Wartungspauschale muss man ohnehin nicht selbst
hosten — abgerechnet wird die Arbeit, nicht der Webspace.

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

### Ausgangslage — per DNS gemessen am 20.08.2026

```
NS:  docks11.rzone.de, shades17.rzone.de     → Strato
A:   81.169.145.72                            → Strato
MX:  5 smtpin.rzone.de                        → Strato-Mail
```

`rzone.de` ist durchgehend Strato: **Domain, Webspace und Mail** liegen beim
selben Anbieter. Der MX-Eintrag ist der wichtige Teil — für die Domain *ist*
Strato-Mail eingerichtet. Ob die Postfächer genutzt werden oder nur
mitgeliefert wurden, sagt DNS nicht; die Frage an den Kunden lautet deshalb
nicht mehr „gibt es dort Postfächer", sondern „welche sind in Gebrauch".

### DNS bei Strato umstellen

1. Strato-Kundenbereich → Domainverwaltung → DNS
2. A-/CNAME-Werte eintragen, **die Netlify im Projekt anzeigt**
3. ⚠️ **MX-Einträge nicht anfassen** — sonst sind die E-Mail-Postfächer tot.
   Kein theoretisches Risiko: der MX zeigt nachweislich auf Strato.
4. Vorher klären:
   - [ ] Liegt auf der Domain aktuell schon eine Seite? Die geht beim Umstellen offline.
         (Ja — die alte Joomla-Seite, siehe Abschnitt 4.)
   - [ ] Erlaubt der Strato-Tarif freie A-Einträge für die Root-Domain?
   - [ ] Kann der Kunde auf ein günstigeres reines Domain-Paket runterstufen?
         **Erst nach Klärung der Postfächer.** Bei Strato hängen die meist am
         Hostingpaket — ein Downgrade kann sie mitnehmen. Regulär: Webhosting
         5 €/Mon. (Starter) bis 22 €/Mon. (Pro), reine Domain `.de` 1 €/Mon.,
         `.info` 2,75 €/Mon. Am Termin die Rechnung zeigen lassen, statt zu raten.

### Inhalte prüfen (⚠️ vor dem Live-Schalten)

Die Angaben stammen größtenteils von der alten, archivierten Website (~2014) und aus
Branchenverzeichnissen. Beim Termin gegenprüfen:

- [ ] **Impressum**: USt-ID (`DE244185087`), Berufsbezeichnung, Handwerkskammer, Rechtsform
- [ ] Öffnungszeiten
- [ ] Anzahl der Google-Bewertungen
- [ ] Telefon-, Mobil- und Faxnummer
- [ ] Zeigt `public/images/gewerbehalle.jpg` das eigene Gelände oder ein Referenzprojekt?
- [ ] Kontakt-E-Mail: bleibt es bei der t-online-Adresse oder eine neue unter eigener Domain?
- [ ] **Eigene Fotos einsammeln.** Stand 03.09.2026 liegen `bild.jpg`, `bildGross.jpg`,
      `bildKlein.jpg` und `logo.png` im Projekt — die alten Platzhalter wurden im Editor
      bereits ersetzt.

### Rechtstexte (⚠️ vor dem Switch, nicht vor dem Setup-Termin)

Am 03.09.2026 durchgesehen und korrigiert: Die Datenschutzerklärung nannte noch Vercel
als Hoster und beschrieb das Kontaktformular als `mailto`-Link, obwohl es längst an
Netlify Forms sendet. Beides steht jetzt richtig drin, ebenso sind drei sichtbare
Bearbeitungsnotizen in eckigen Klammern aus dem Fließtext entfernt.

Was noch eine Entscheidung des Betriebs braucht:

- [ ] **Auftragsverarbeitungsvertrag mit Netlify** annehmen und ablegen. Betrifft
      Hosting *und* Kontaktformular — in beiden Fällen verarbeitet Netlify Daten.
- [ ] **Datenschutzerklärung und Impressum anwaltlich prüfen lassen.** Beide Seiten sind
      Vorlagen und tragen den Hinweis im Dateikopf. Das ist keine Rechtsberatung.
- [ ] **Verbraucherschlichtung**: Die Aussage im Impressum, nicht an Streitbeilegungs-
      verfahren teilzunehmen, ist die übliche — bestätigen lassen.
- [ ] **Bewertungsangabe „5,0 auf Google"** im Kopfbereich: Es gibt kein
      Google-Unternehmensprofil (Stand 03.09.2026, Kartenabruf), also auch keine
      Bewertungen. Ohne Beleg muss die Angabe raus.

### Einweisung (15–20 Minuten)

`deinedomain.de/keystatic` → mit GitHub anmelden → Texte und Bilder ändern → speichern.
Änderung landet als Commit im Repo, Netlify baut automatisch neu, nach ~1 Minute live.
Der Editor ist bereits komplett auf Deutsch beschriftet.

---

## 4. Alte Website elektrohofmann.info

Läuft noch (Joomla), erreichbar **nur über HTTP**. Struktur: Startseite, Leistungen,
Über Uns, Kontakt & Anfahrt, Impressum.

### Was tatsächlich dort läuft — nachgemessen am 20.08.2026

Die Joomla-Angabe war zunächst eine Vermutung. Sie ist bestätigt, und zwar
deutlicher als erhofft — der Server gibt die Version selbst preis:

```
/administrator/manifests/files/joomla.xml
  <version>2.5.22</version>
  <creationDate>June 2014</creationDate>
```

Weitere Belege:

```
/administrator/                     → HTTP 200 (Joomla-Login, öffentlich erreichbar)
/index.php?option=com_content       → HTTP 200 (Joomla-Adressschema aktiv)
/media/com_uniterevolution/...      → com_* ist Joomla-Namenskonvention
P3P: CP="NOI ADM DEV PSAi COM ..."  → Joomlas Standard-Header, wörtlich
X-Powered-By: PHP/5.3.29            → PHP 5.3 ist seit August 2014 am Ende
```

**Joomla 2.5.22 (Juni 2014) auf PHP 5.3.29.** Joomla 2.5 hat sein Supportende am
31.12.2014 erreicht, PHP 5.3 im August 2014 — beide seit über elf Jahren ohne
Sicherheitsupdates. Aktuell ist Joomla 5.

Für Software nach dem Supportende werden gefundene Lücken weiter veröffentlicht,
nur ohne Fix. Für diese Version existieren also seit elf Jahren dokumentierte
Schwachstellen, und weil sie damals weit verbreitet war, suchen automatisierte
Scanner gezielt danach. Dass das Versions-Manifest frei abrufbar ist, macht es
zusätzlich leicht: Ein Scanner muss nicht raten, welche Lücken passen.

Was in solchen Fällen üblicherweise passiert, ist nicht Datendiebstahl — dort
liegt nichts. Sondern die Seite wird zum Werkzeug: Spamversand, versteckte
Weiterleitungen, oder eingeschleuste Links auf fremde Seiten. **Das passt zum
Link auf `elektro-demel.de`** weiter unten. Beweisbar ist es nicht, aber bei
einer elf Jahre ungepatchten Installation ist ein eingeschleuster SEO-Link die
naheliegende Erklärung.

### Kein Zertifikat

```
http://elektrohofmann.info   → 301 auf www, Apache/2.4.68, antwortet normal
https://elektrohofmann.info  → sslv3 alert handshake failure
```

Der Handshake bricht ab, **bevor** ein Zertifikat übertragen wird. Es ist also kein
abgelaufenes Zertifikat, sondern gar keins — für Port 443 ist nichts hinterlegt. Bei
Strato heißt das praktisch immer: Let's Encrypt wurde im Kundenbereich nie
eingeschaltet. Das ist der „unsicher"-Hinweis, den der Kunde im Browser sieht.

**Falls er es vorab abgestellt haben will** (Kundenbereich → Domains → Domain wählen →
SSL-Verwaltung → Let's Encrypt aktivieren; im Hosting-Paket enthalten, Ausstellung bis zu
einige Stunden): Danach ist HTTPS *erreichbar*, aber nicht *erzwungen* — dafür braucht es
`force_ssl` in der Joomla-`configuration.php` oder eine `.htaccess`-Regel. Und wenn das
Template Assets hart mit `http://` verlinkt, bleibt eine Mixed-Content-Warnung.

Da der Switch offen terminiert ist, läuft die alte Seite womöglich noch Monate. Damit ist
das Einschalten des Zertifikats nicht mehr bloß eine Geste vor dem Termin, sondern sinnvoll.
⚠️ Nur mit ausdrücklicher Zustimmung in seinem Konto klicken — fremdes Hosting-Konto,
an dem auch seine Mail hängt.

Die neue Seite braucht davon nichts: Netlify stellt das Zertifikat automatisch aus,
sobald die DNS-Umstellung greift.

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

- [x] **`elektrohofmann.info` ist die Domain** — vom Kunden am 03.09.2026 bestätigt,
      eine zweite gibt es nicht. (`elektrohofmann.de` ist vergeben und leitet auf
      `e-hofmann.de`, einen fremden Betrieb in Blaustein bei Ulm.) Weil die Domain
      dieselbe bleibt, ist die alte Seite mit der DNS-Umstellung unter dem Firmennamen
      nicht mehr erreichbar. Der Webspace bleibt davon unberührt — die Installation
      muss trotzdem gesichert und gelöscht werden, siehe `TERMIN-04-09.md`.
      **Die unsichere Installation darf nicht online bleiben.**
- [x] **301-Weiterleitungen** stehen in `netlify.toml`: `/leistungen` → `/#leistungen`,
      `/ueber-uns` → `/#betrieb`, `/kontakt-anfahrt` → `/#kontakt`. `/impressum` heißt
      auf der neuen Seite genauso und braucht keine Regel. Wirksam mit dem Switch,
      testbar schon auf der Netlify-Adresse.
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

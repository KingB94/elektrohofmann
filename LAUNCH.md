# Live-Schaltung Elektro Hofmann — Plan & Checkliste

Stand: 05.09.2026 · Setup-Termin beim Kunden am 04.09.2026 stattgefunden.
**Die Seite läuft auf Cloudflare**, das Redaktionssystem ist scharf geschaltet.
Offen ist nur noch die Domain (Etappe 2) und das Kontaktformular.

**Live-Adresse bis zum Domain-Umzug:**
`https://elektrohofmann.landingpage-next.workers.dev`

## Das Ziel

Drei Sätze, an denen sich alles messen lässt:

1. `elektrohofmann.info` liegt bei **unserem Cloudflare** — Registrierung, DNS
   und Hosting an einem Ort.
2. Die neue Website ist **unter dieser Domain** erreichbar, mit gültigem
   Zertifikat.
3. Der Kunde meldet sich unter **`elektrohofmann.info/keystatic` mit seinem
   GitHub-Konto** an und kann Texte und Bilder selbst ändern.

Alles andere in diesem Dokument dient nur dazu.

**Entscheidungen, die schon gefallen sind:**

- **Design:** Variante B („Hell & Premium") wird die Startseite. Varianten A und C
  bleiben auf ausdrücklichen Kundenwunsch als eigene Routen erhalten (weiter `noindex`).
- **CMS:** Keystatic, Umstellung von `local` auf **GitHub-Storage**. Der Kunde pflegt
  Texte und Bilder selbst unter `/keystatic`.
- **Hosting:** **Cloudflare Workers (kostenlos)**. Bis 04.09.2026 war Netlify
  vorgesehen; der Kunde hat dem Umzug der Domain zu uns zugestimmt, damit liegt
  Hosting, DNS und Domain an einem Ort. Begründung unten.
- **Domain:** `elektrohofmann.info` **zieht von Strato zu Cloudflare** (Registrar
  und DNS). Der Kunde hat uns dafür seine Strato-Zugangsdaten gegeben.
- **Ablauf:** **zwei Termine.** Am 04.09. wurde das Setup fertiggestellt. Den
  Wechsel auf die Domain (Transfer + Abschaltung der alten Seite) terminiert der
  Kunde selbst; das ist ein eigener, kurzer Termin. Ablaufplan: `TERMIN-04-09.md`.

---

## 1. Warum Cloudflare

Strato-Webhosting kann kein Next.js (nur PHP/statisch) — die Seite kann dort nicht liegen.

Ursprünglich war Netlify gesetzt, weil es kommerzielle Nutzung im Free-Plan
ausdrücklich erlaubt und die Domain bei Strato bleiben sollte. Beide Annahmen
sind hinfällig: Der Kunde hat dem Transfer der Domain zu uns zugestimmt. Damit
liegt alles bei einem Anbieter — Registrierung, DNS, Hosting —, und die
Netlify-Umwege entfallen.

**Was der Free-Plan bietet:**

- Next.js 16 läuft über den OpenNext-Adapter (`@opennextjs/cloudflare`)
- 100.000 Worker-Aufrufe pro Tag; statische Seiten zählen nicht mit, weil sie
  direkt vom CDN kommen. Für diese Seite weit überdimensioniert.
- Eigene Domain + SSL kostenlos, Auto-Deploy bei jedem Commit (Workers Builds)
- Kommerzielle Nutzung ohne Sonderregeln — anders als bei Vercels Hobby-Plan

**Was der Wechsel gekostet hat** (alles erledigt, siehe Git-Verlauf):

- Kontaktformular neu gebaut. Netlify Forms gibt es hier nicht; die Anfrage geht
  jetzt über eine eigene Route per Resend raus.
- `lib/inhalte.ts` liest die Inhalte beim Bauen statt zur Laufzeit — im Worker
  gibt es kein Dateisystem.
- Weiterleitungen und `noindex` aus `netlify.toml` nach `next.config.ts` bzw. in
  die Seiten-Metadaten.
- Next auf 16.3.4 angehoben, weil der Adapter 16.0–16.3.2 ausschließt.

### Geprüfte, aber verworfene Alternativen

| Option | Kosten | Warum nicht |
| --- | --- | --- |
| Netlify Starter | 0 € | War der Plan bis 04.09.2026. Funktioniert, aber sobald die Domain ohnehin zu uns zieht, ist ein zweiter Anbieter nur ein zweiter Ort zum Nachsehen. Netlify Forms wäre der einzige echte Vorteil gewesen. |
| Vercel Pro | ~20 $/Monat | Hobby-Plan verbietet gewerbliche Nutzung. Pro ist für diese Seite rausgeworfenes Geld. |
| Alles statisch auf Strato-Webspace | 0 € | **Geht nicht — und keine Paketstufe ändert das.** Strato-Webhosting bietet über *alle* Tarife hinweg nur PHP 8.4, Perl, Python und Ruby, kein Node.js und keinen Root-Zugriff; auch Pro für 22 €/Mon. nicht. Ein größeres Paket kauft Speicherplatz und Domains, keine Laufzeitumgebung. Selbst als statischer Export scheitert es an Keystatic: der API-Handler braucht einen Server (GitHub-OAuth + Git-Schreiboperationen). |
| Strato vServer | 8 €/Mon. + 9 € Setup | Node.js liefe, aber nacktes Linux: Prozess, nginx, certbot, Updates, Backups, Deploy-Pipeline — alles selbst. Für sechs Leistungskacheln absurd. |
| Eigenes Hosting auf netcup | ~0 € marginal | **Später, nicht jetzt.** Siehe unten. |

#### Eigenes netcup-Hosting — vertagt, nicht verworfen

Wir hosten Kundenseiten selbst bei netcup. Für diese Seite ginge das — **aber nur auf
VPS/Root-Server**. netcup-Webhosting scheidet aus demselben Grund aus wie Strato: Node.js
ist über Plesk nominell da, hält aber keinen dauerhaften Prozess (Timeout killt ihn).

Auf einem eigenen Server zu bauen wäre: GitHub Actions → SSH-Deploy, systemd/PM2, nginx +
certbot. Das ist ein lohnendes eigenes Projekt — einmal gebaut trägt die Pipeline jede
weitere Kundenseite. Der Umzug wäre danach eine reine DNS-Änderung, und die liegt jetzt
in unserer Hand. Der Kunde merkt davon nichts.

### Laufende Kosten für den Kunden

| Posten | Kosten |
| --- | --- |
| Domain bei Strato | zahlt er ohnehin schon |
| Hosting (Cloudflare) | 0 € |
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
- [x] **Kontaktformular** über eine eigene Route mit Resend (vorher nur ein
      `mailto:`-Link, der auf Handys ohne Mailprogramm ins Leere lief; dazwischen
      kurz Netlify Forms). Mit Honigtopf gegen Bots und verständlicher
      Fehlermeldung, falls der Versand scheitert. Die Empfängeradresse kommt aus
      den Betriebsdaten im Editor.
- [x] **Kennzahlen** lassen sich im Editor wahlweise fest eintragen oder automatisch
      berechnen — die Seite veraltet nicht mehr beim Jahreswechsel.
- [x] **Cloudflare-Aufbau**: `wrangler.jsonc` und `open-next.config.ts` angelegt,
      Weiterleitungen nach `next.config.ts`, `noindex` in die Seiten-Metadaten.
      `netlify.toml` und `public/__forms.html` sind entfallen.
- [x] **Auf workerd geprüft**, nicht nur gebaut: alle Seiten, die drei
      Weiterleitungen, `noindex`, der Editor unter `/keystatic` und der
      OAuth-Einstieg `/api/keystatic/github/login` antworten dort richtig.
- [x] **Aufgeräumt**: Finder-Dubletten gelöscht, `robots.ts` und `sitemap.ts` ziehen die
      Adresse jetzt aus `NEXT_PUBLIC_SITE_URL`, README neu geschrieben.

Build und Linter laufen sauber durch.

### Offen — braucht Zugangsdaten oder eine Entscheidung

- [x] **GitHub-App für Keystatic angelegt** — `kingb94-keystatic`, unter dem Konto
      `KingB94`, installiert **nur** auf `KingB94/elektrohofmann` (nicht auf allen
      Repositories: die App darf Code schreiben, das gehört eng gefasst).
      Die drei geheimen Werte liegen als Secrets beim Worker, der App-Slug als
      Repository-Variable.
- [x] **Ende zu Ende geprüft am 05.09.2026**: Im Editor gespeichert → Commit
      `508e089` im Repository → Workflow lief von allein → Änderung nach rund
      anderthalb Minuten auf der Seite. Der Weg, den der Kunde täglich geht,
      funktioniert nachweislich.
- [x] **Vierte Callback-URL eingetragen** (05.09.2026). Die GitHub-App
      `kingb94-keystatic` führt jetzt vier Redirect URIs: zweimal lokal, die
      Worker-Adresse und
      `https://www.elektrohofmann.info/api/keystatic/github/oauth/callback`.
      Geprüft durch Neuladen der Einstellungsseite — alle vier bleiben stehen.

      ℹ️ Von außen lässt sich das **nicht** verifizieren: GitHub prüft die
      `redirect_uri` erst nach der Anmeldung. Ruft man den Autorisierungs-Endpunkt
      ohne Sitzung auf, landet **jede** Adresse auf der Login-Seite — auch eine
      frei erfundene. Ein solcher Test sagt nichts aus. Die echte Probe ist der
      Login unter der Domain nach dem Umschalten.
- [ ] **`NEXT_PUBLIC_SITE_URL`** auf die echte Domain setzen, sobald sie steht —
      als Repository-Variable, und danach **neu bauen**. Der Wert wird beim Bauen
      fest eingebaut; ohne neuen Build stehen in Metadaten, `robots.txt` und
      `sitemap.xml` weiter die Worker-Adresse.
- [ ] **Resend einrichten**: Konto anlegen, `elektrohofmann.info` als Absenderdomain
      verifizieren (Resend nennt DNS-Einträge, die in die Cloudflare-Zone gehören),
      `RESEND_API_KEY` als Secret hinterlegen.
      ⚠️ **Danach einmal echt absenden.** Alles andere am Formular ist geprüft, der
      tatsächliche Versand naturgemäß nicht — dafür braucht es den echten Schlüssel.
- [x] **Auto-Deploy über GitHub Actions** eingerichtet
      (`.github/workflows/deploy.yml`) — statt das Repo im Cloudflare-Dashboard
      zu verbinden. Gleicher Effekt, aber im Repo nachvollziehbar und änderbar:
      Push auf `main` → bauen → veröffentlichen. Node 22 und der richtige
      Deploy-Befehl stehen darin fest.
      ⚠️ Nicht auf `wrangler deploy` umstellen: Nur der OpenNext-Befehl legt die
      vorgerenderten Seiten mit in die Assets. Fehlen sie, antwortet jede Seite
      mit 500.
- [x] **Im Repository hinterlegt**: Secrets `CLOUDFLARE_API_TOKEN` und
      `CLOUDFLARE_ACCOUNT_ID`, Variables `NEXT_PUBLIC_SITE_URL` und
      `NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG`. Der Token darf zusätzlich Zonen
      anlegen und DNS schreiben — damit ist er auch für Etappe 2 gerüstet.

      ℹ️ Beim Setzen: `gh secret set` fragt den Wert interaktiv ab. In einer
      Umgebung ohne Terminal speichert es kommentarlos einen **leeren** Wert,
      und der Workflow scheitert, obwohl das Secret zu existieren scheint.
      Sicherer Weg auf dem Mac: `pbpaste | tr -d '\n\r' | gh secret set NAME`.
- [ ] **Öffnungszeiten im strukturierten Datensatz**: In `app/layout.tsx` stehen Mo–Fr
      08:00–18:00 fest, weil Google ein maschinenlesbares Format braucht. Bestätigt der
      Kunde andere Zeiten, hier mitziehen.

## 3. Was beim Kundentermin gebraucht wird

### Zugänge

- [x] **GitHub-Konto des Kunden**: **`ElektroHofmann`** — am 04.09.2026 beim
      Termin gemeinsam angelegt und als **Collaborator** im privaten Repository
      `KingB94/elektrohofmann` eingetragen. Das ist die Voraussetzung für den CMS-Login.

      ⚠️ **Das Repository bleibt bei `KingB94`.** Ursprünglich war geplant, es
      auf sein Konto zu übertragen und uns dort als Collaborator einzutragen —
      es ist andersherum gekommen. Folge: Der Eintrag
      `owner: "KingB94"` in `keystatic.config.ts` ist **richtig und bleibt
      stehen**. Frühere Notizen, ihn auf seinen Benutzernamen zu ändern, sind
      hinfällig.
- [ ] **Verlängerung der Domain bestätigen.** Die Registry nennt als Ablauf
      **15.09.2026** (Registrar: Cronon GmbH, also Strato). Bei einem Kunden
      seit 2007 verlängert sich das erfahrungsgemäß automatisch, solange nicht
      gekündigt wurde — bestätigt ist es aber nicht. Nachzusehen unter
      *Mein Konto → Alle Pakete* bzw. in der letzten Rechnung.
      Objektive Gegenprobe ohne Login: Springt das Registry-Datum nach dem
      15.09. auf **2027-09-15**, hat die Verlängerung gegriffen.
      ⚠️ Den Registrar-Transfer nicht über diesen Termin laufen lassen.
- [ ] **Inhaberdaten prüfen** (Domainverwaltung → Tab *Inhaberdaten*): Geht die
      dort hinterlegte E-Mail-Adresse an jemanden, der sie liest? Dorthin
      gehen Transfer-Code und Bestätigung. Häufigster Grund für hängende
      Transfers.
- [x] **Strato-Zugangsdaten** liegen vor (vom Kunden übergeben). Werden für
      Nameserver-Wechsel, Auth-Code und die Sicherung des alten Webspace gebraucht.
      ⚠️ Fremdes Konto: nur für das Vereinbarte verwenden, nichts nebenbei ändern.
      Nach Abschluss des Umzugs den Kunden das Passwort ändern lassen.

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

### Domain von Strato zu Cloudflare umziehen

**Reihenfolge ist hier nicht beliebig:** Cloudflare Registrar nimmt eine Domain
erst an, wenn sie bereits auf Cloudflare-Nameservern liegt. Ein Auth-Code allein
reicht nicht.

1. [x] **Zone angelegt und vollständig bestückt** (05.09.2026).
   Zone-ID `d8b8eb74b1e8c8138a4e4320c9a95881`, Status `pending` — sie wird
   aktiv, sobald die Nameserver zeigen.

   | Eintrag | Inhalt |
   | --- | --- |
   | `elektrohofmann.info` | Worker `elektrohofmann` |
   | `www.elektrohofmann.info` | Worker `elektrohofmann` |
   | TXT `@` | `v=spf1 -all` |
   | TXT `_dmarc` | `v=DMARC1; p=reject; sp=reject; adkim=s; aspf=s;` |

   Die `AAAA`-Einträge auf `100::` sind kein Versehen: So bindet Cloudflare
   einen Worker an eine Domain. Der Worker greift, bevor die Adresse je
   verwendet wird. Kein MX — siehe Punkt 5.

   ⚠️ Cloudflare hat beim Anlegen **nichts** von Strato übernommen; die Zone
   war leer. Ein Nameserver-Wechsel vor dem Bestücken hätte die Domain ins
   Leere zeigen lassen.
2. [x] **DNSSEC ist kein Thema.** Bei Strato liefe es über das Zusatzprodukt
   *Domain Guard* — das ist **nicht gebucht** (am 05.09.2026 im Kundenbereich
   geprüft, die Seite dort ist ein Angebot, kein Status). Damit entfällt auch
   der Transfer-Schutz: Die Domain ist bereits entsperrt, was die
   Registry-Abfrage bestätigt (Status `active`, kein `clientTransferProhibited`).
   **Nicht nachbuchen** — es würde genau die zwei Dinge einschalten, die wir
   für den Umzug wieder abschalten müssten.
3. [ ] **Nameserver bei Strato umstellen** → Domainverwaltung → Tab *DNS*:

       laila.ns.cloudflare.com
       sterling.ns.cloudflare.com

   ⚠️ **Das ist der Umschaltmoment**, nicht der Transfer. Ab hier ist die neue
   Seite unter der Domain erreichbar und die alte Joomla-Seite verschwindet.
   Der Kunde wollte diesen Zeitpunkt selbst bestimmen.
4. [ ] **Auth-Code bei Strato anfordern, Transfer bei Cloudflare starten** (~5 Tage).
   Gestartet wird beim **aufnehmenden** Anbieter, also bei Cloudflare — Strato
   gibt nur den Code heraus und lässt los.
   ⚠️ Nicht über den Menüpunkt *Verträge → Domainumzug* bei Strato gehen: Der
   ist für Umzüge **innerhalb** von Strato und kostenpflichtig.
5. ✅ **MX-Einträge sind hier unkritisch** — anders als ursprünglich angenommen.
   Der Betrieb nutzt für E-Mail **ausschließlich `hofmann-wonneberg.de`**, vom
   Kunden bestätigt. Diese Domain liegt nicht bei Strato und wird **von dritter
   Seite verwaltet** (Microsoft 365 hinter Hornetsecurity, DNS bei Hetzner) —
   wir fassen sie nicht an. Unter `elektrohofmann.info` läuft keine E-Mail; der
   `MX 5 smtpin.rzone.de` ist Stratos Standardeintrag ohne Postfach dahinter
   und kann ersatzlos entfallen.
6. Stattdessen `v=spf1 -all` und DMARC `p=reject` setzen: Die Domain versendet
   keine Mail, also soll das auch niemand in ihrem Namen tun können.
   ⚠️ Ausnahme, sobald Resend läuft — dann gehören dessen SPF-/DKIM-Einträge
   für den Absender `formular@elektrohofmann.info` in die Zone.
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
- [x] Kontakt-E-Mail: `info@hofmann-wonneberg.de` (am 04.09.2026 vom Kunden
      bestätigt). Das ist die einzige Adresse, die der Betrieb noch nutzt; ihre
      Domain wird von dritter Seite verwaltet, nicht von uns. ⚠️ Das Postfach
      muss existieren, bevor die Seite live geht — dorthin schickt das
      Kontaktformular seine Anfragen.
- [ ] **Eigene Fotos einsammeln.** Stand 03.09.2026 liegen `bild.jpg`, `bildGross.jpg`,
      `bildKlein.jpg` und `logo.png` im Projekt — die alten Platzhalter wurden im Editor
      bereits ersetzt.

### Rechtstexte (⚠️ vor dem Switch, nicht vor dem Setup-Termin)

Am 03.09.2026 durchgesehen und korrigiert: Die Datenschutzerklärung nannte noch Vercel
als Hoster und beschrieb das Kontaktformular als `mailto`-Link, obwohl es längst an
Netlify Forms sendet. Beides steht jetzt richtig drin, ebenso sind drei sichtbare
Bearbeitungsnotizen in eckigen Klammern aus dem Fließtext entfernt.

Am 05.09.2026 mit dem Hosting-Wechsel nachgezogen: Hoster ist jetzt Cloudflare,
Versender des Kontaktformulars ist Resend. Beide stehen namentlich mit Anschrift
in der Erklärung, samt Hinweis auf die Drittlandsübermittlung.

Was noch eine Entscheidung des Betriebs braucht:

- [ ] **Zwei Auftragsverarbeitungsverträge** annehmen und ablegen:
      **Cloudflare** (Hosting) und **Resend** (Versand des Kontaktformulars).
- [ ] **Datenschutzerklärung und Impressum anwaltlich prüfen lassen.** Beide Seiten sind
      Vorlagen und tragen den Hinweis im Dateikopf. Das ist keine Rechtsberatung.
- [ ] **Verbraucherschlichtung**: Die Aussage im Impressum, nicht an Streitbeilegungs-
      verfahren teilzunehmen, ist die übliche — bestätigen lassen.
- [ ] **Bewertungsangabe „5,0 auf Google"** im Kopfbereich: Es gibt kein
      Google-Unternehmensprofil (Stand 03.09.2026, Kartenabruf), also auch keine
      Bewertungen. Ohne Beleg muss die Angabe raus.

### Einweisung (15–20 Minuten)

`deinedomain.de/keystatic` → mit GitHub anmelden → Texte und Bilder ändern → speichern.
Änderung landet als Commit im Repo, Cloudflare baut automatisch neu, nach ~1 Minute live.
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

Die neue Seite braucht davon nichts: Cloudflare stellt das Zertifikat automatisch
aus, sobald die Domain dort liegt.

### Bereits übernommen (erledigt)

Texte aus der alten Seite in die bestehenden Slots eingearbeitet — **ohne Layout-Änderung**:

- **Leistungen**: alle sechs Beschreibungen mit den konkreten Angaben der alten Seite
  angereichert (Teleskoplader 10 m Hubhöhe · E-Check-Umfang · Werkstattreparatur zum
  normalen Stundenlohn statt Kundendiensttarif · Kathrein/Fuba/Hirschmann, bis 50 Teilnehmer ·
  LED-Beispiel 2 × 58 W → 57 W)
- **Der Betrieb**: Werdegang präzisiert (Elektro Rehrl in Lauter, Baustellenleiter im
  Wohnungsbau, Betriebselektriker im Hofbräuhaus Traunstein); Normen-Zusage aus dem
  alten Begrüßungstext ergänzt
- **Chronik**: Beschriftungen konkretisiert. Seit 04.09.2026 steht die Liste im Abschnitt
  „In Zahlen“ (Kasten rechts) und wird auch dort gepflegt — die frühere Kopplung an die
  Bildhöhe im Abschnitt „Der Betrieb“ gibt es nicht mehr, die Länge ist jetzt frei.
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
- [x] **301-Weiterleitungen** stehen in `next.config.ts`: `/leistungen` → `/#leistungen`,
      `/ueber-uns` → `/#betrieb`, `/kontakt-anfahrt` → `/#kontakt`. `/impressum` heißt
      auf der neuen Seite genauso und braucht keine Regel. Wirksam mit dem Switch,
      testbar schon auf der Worker-Adresse.
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

- [OpenNext: Cloudflare-Adapter](https://opennext.js.org/cloudflare)
- [Cloudflare Registrar: Domain-Transfer](https://developers.cloudflare.com/registrar/get-started/transfer-domain-to-cloudflare/)
- [Cloudflare Workers: Node.js-Kompatibilität](https://developers.cloudflare.com/workers/runtime-apis/nodejs/)
- [Cloudflare Workers: node:fs](https://developers.cloudflare.com/workers/runtime-apis/nodejs/fs/)
- [OpenNext Cloudflare Adapter](https://opennext.js.org/cloudflare)
- Keystatic API-Handler-Routen: `_autodocs/api-reference/api-handler.md`

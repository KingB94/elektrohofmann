# Termin bei Elektro Hofmann — Freitag, 04.09.2026

> **Nachtrag 05.09.2026 — der Termin hat stattgefunden.**
>
> **Was am 04.09. erledigt wurde:**
>
> - **GitHub-Konto des Kunden angelegt** — Benutzername **`ElektroHofmann`** —
>   und als **Collaborator** im privaten Repository `KingB94/elektrohofmann`
>   eingetragen. Damit kann er sich später
>   unter `/keystatic` anmelden.
>   ⚠️ **Das Repository bleibt bei `KingB94`** — es wurde *nicht* auf sein Konto
>   übertragen. Damit ist `owner: "KingB94"` in `keystatic.config.ts` richtig
>   und bleibt stehen; Punkt 2 unten sagt noch das Gegenteil und ist überholt.
> - **Strato-Zugangsdaten erhalten.** Für Nameserver-Wechsel, Auth-Code und die
>   Sicherung des alten Webspace.
> - **Inhalte, Bilder und Impressumsangaben** durchgegangen (siehe Git-Verlauf
>   vom 04.09.).
>
> **Was sich seither geändert hat:** Der Kunde hat dem **Transfer der Domain zu
> uns zu Cloudflare** zugestimmt. Gehostet wird dort, nicht mehr bei Netlify und
> auch nicht bei Strato. Die unten genannten **Netlify-Schritte sind damit
> überholt**; der Setup-Teil bleibt als Protokoll stehen. Maßgeblich ist ab
> „Der Switch-Termin".

**Der Kunde will am 4.9. das Setup fertig haben, aber noch nicht umschalten.**
Die alte Seite bleibt vorerst online, den Wechsel terminiert er selbst.

Daraus werden **zwei Termine**:

| | Wann | Was |
| --- | --- | --- |
| **Setup-Termin** | Fr, 04.09.2026, vor Ort | Konten, Redaktionssystem, Einweisung, Fotos. Ergebnis: eine vollständig funktionierende Website unter einer `*.netlify.app`-Adresse, die er selbst pflegen kann. |
| **Switch-Termin** | später, auf sein Signal | DNS umstellen, alte Joomla-Seite abschalten. Rund 30 Min, geht per Telefon und Bildschirmfreigabe. |

**Leitgedanke bleibt: Der Setup-Termin ist eine Übergabe, kein Aufbau.**
Alles, was vorher erledigt werden kann, wird vorher erledigt. Am 4. September
bleiben nur die Dinge übrig, die den Kunden zwingend brauchen: seine Zugänge,
seine Fotos, seine Bestätigungen — und die Einweisung.

---

## Zeitplan bis zum Setup-Termin

### Do, 20.08. — heute

- [ ] **E-Mail an den Kunden raus** (Text in `FRAGEN-AN-KUNDEN.md`).
      Je früher, desto mehr Puffer für Rückfragen. Die Fotos aus Frage 8 sind
      der Punkt mit der längsten Vorlaufzeit — die sammelt niemand an einem Tag.
- [ ] **Netlify-Konto anlegen** (erst mal auf deinen Namen) und das Repo
      verbinden. Läuft dann unter einer `*.netlify.app`-Adresse, ohne dass die
      Domain feststehen muss.
      ⚠️ **Für die Generalprobe zwingend einen Wegwerfnamen nehmen**, z. B.
      `hofmann-probe`. Netlify-Namen sind global eindeutig über alle Kunden
      hinweg — testest du unter `websiteelektrohofmann`, ist der Name morgen
      für sein Konto blockiert und seine Seite landet auf
      `websiteelektrohofmann-2`. Am 03.09.2026 geprüft: der Name ist frei.

### Fr, 21.08. – Mo, 24.08. — Generalprobe

Einmal die komplette Kette selbst durchspielen, **bevor** du beim Kunden sitzt.
Das ist die wertvollste Vorbereitung überhaupt: Danach kennst du jeden
Klick, und am Termin dauert dasselbe fünfzehn Minuten statt einer Stunde.

- [ ] 🔴 **Die GitHub-App lokal anlegen, nicht auf der Netlify-Adresse.**
      Am 03.09.2026 im Quelltext von Keystatic nachgelesen und am
      laufenden Server bestätigt: Fehlen die Zugangsdaten, zeigt Keystatic
      den Einrichtungsassistenten **nur** in der Entwicklungsumgebung
      (`process.env.NODE_ENV !== 'development'` → `throw`). Live antwortet
      die Route stattdessen mit einem Fehler. Der ursprünglich geplante Weg
      „Assistent auf der Netlify-Adresse durchlaufen" funktioniert also nicht.

      So geht es:

          NEXT_PUBLIC_KEYSTATIC_MODE=github npm run dev

      Dann `http://localhost:3000/keystatic` → Weiterleitung auf
      `/keystatic/setup` → der Assistent legt die App über
      `github.com/settings/apps/new` an. Entscheidend ist, **welches
      GitHub-Konto in diesem Browser angemeldet ist** — für den Kunden also
      das zweite Browserprofil, in dem er eingeloggt ist.

      Die App bekommt dabei eine `localhost`-Callback-URL. Die Adressen für
      Netlify und die Domain kommen danach von Hand dazu (Punkt 2).
- [ ] Die vier Werte bei Netlify unter *Environment variables* eintragen,
      neu bauen lassen
- [ ] **Selbst einen Text ändern und speichern.** Prüfen: Kommt der Commit im
      Repository an? Baut Netlify automatisch? Steht die Änderung danach auf
      der Seite? Wie lange dauert es wirklich?
- [ ] Ein Bild austauschen — der Weg ist für den Kunden der wichtigere
- [ ] Kontaktformular abschicken und prüfen, ob die Anfrage ankommt.
      Bei Netlify unter *Forms → Notifications* die Benachrichtigung an eine
      E-Mail-Adresse einschalten, sonst landet alles nur im Dashboard.

### Sobald die Antworten des Kunden da sind

- [x] **Domain steht fest: `elektrohofmann.info`** — vom Kunden am
      03.09.2026 bestätigt, es kommt keine weitere dazu. `elektrohofmann.de`
      ist vergeben und leitet auf `e-hofmann.de` (Elektro Hofmann GmbH,
      Blaustein bei Ulm) — ein fremder Betrieb, die Adresse ist nicht zu haben.
      Daraus folgt dreierlei: die zweite Callback-URL steht fest (Setup-Termin,
      Punkt 2), die 301-Weiterleitungen in `netlify.toml` greifen wie geplant,
      und die alte Joomla-Seite ist mit dem Switch unter der Domain nicht mehr
      erreichbar. `NEXT_PUBLIC_SITE_URL` zeigt bis dahin auf die
      Netlify-Adresse, danach auf `https://www.elektrohofmann.info`.
- [ ] **Impressumsangaben bestätigt** → in `content/betrieb.json` einpflegen
- [ ] **Öffnungszeiten bestätigt** → ebenda, zusätzlich in `app/layout.tsx`
      (dort stehen sie fest, weil Google ein maschinenlesbares Format braucht)
- [ ] **Fotos da** → einbauen, zuschneiden, komprimieren
- [x] **GitHub-Konto** am Termin angelegt → als Collaborator ins Repository eingeladen

### Mi, 02.09. — zwei Tage vorher, Packliste

- [ ] Laptop, Ladegerät, **Handy als mobiler Hotspot** (verlass dich nicht auf
      das WLAN vor Ort)
- [ ] Kartenleser oder USB-Kabel für die Fotos
- [ ] Diese Datei und `LAUNCH.md` offen im Browser
- [x] Strato-Zugangsdaten — am Termin erhalten. Werden jetzt für den
      Nameserver-Wechsel, den Auth-Code und die Sicherung des alten Webspace
      gebraucht.

#### ⚠️ Den Netlify-Namen vorher festlegen und freiräumen

Netlify-Projektnamen sind **global eindeutig** — über alle Netlify-Kunden
hinweg. Heißt dein Testprojekt aus der Generalprobe schon
`websiteelektrohofmann`, ist der Name für sein Projekt blockiert, und seine
Seite landet auf `websiteelektrohofmann-2`.

- [x] Name festgelegt: **`websiteelektrohofmann`** → die Adresse lautet damit
      `https://websiteelektrohofmann.netlify.app`.
      (Netlify schreibt Projektnamen klein und ohne Leerzeichen — aus
      „WebsiteElektroHofmann" wird `websiteelektrohofmann`.)
- [ ] **Testprojekt der Generalprobe umbenennen oder löschen**, damit der
      Name frei ist — vor dem Termin, nicht während

#### Kurzanleitung ausdrucken

- [x] Adresse in `KURZANLEITUNG-KUNDE.md` eingetragen:
      `websiteelektrohofmann.netlify.app/keystatic`
- [x] Der GitHub-Benutzername steht inzwischen drin (`ElektroHofmann`).
- [ ] **Beim Switch neu ausdrucken** — vorher führt die genannte Adresse
      ins Leere. Offen bleibt nur noch der Rückfragen-Kontakt ganz unten.
- [ ] Beim Switch nochmal neu drucken, dann mit `www.elektrohofmann.info`.

#### Am Telefon vorab klären: kommt er vor Ort an seine E-Mail?

GitHub schickt eine Bestätigungsmail. Kommt er vor Ort nicht an sein Postfach
(`@hofmann-wonneberg.de`, fremdverwaltet) und ihr sitzt in der Werkstatt, steht
der ganze Termin.

- [ ] Fragen, ob er die Firmen-Mail auf dem Handy hat. Falls nein: Termin am
      Rechner mit Mailzugang einplanen.

> **Der TTL-Punkt ist umgezogen.** Das Absenken der DNS-Zwischenspeicherung
> gehört jetzt zur Vorbereitung des Switch-Termins, nicht des Setup-Termins.
> Siehe dort.

---

## Ablauf am Setup-Termin — rund zwei Stunden

Reihenfolge: erst die Technik, dann die Einweisung, Fotos zum Schluss, wenn
die Stimmung locker ist.

### 0. Auf deinem Laptop arbeiten — aber sauber getrennt

Die Konten auf dem eigenen Rechner anzulegen ist sinnvoll: Claude Code ist da,
der Editier-Schritt in Punkt 1 geht flüssig, und du kennst deine Umgebung.
Vier Dinge musst du dabei bewusst trennen — sonst lieferst du am Ende ein
Setup aus, das **nur auf deinem Laptop funktioniert**, und merkst es nicht.

- [ ] **Zwei Browser-Sitzungen vorbereiten.** Keine Kosmetik, sondern
      notwendig: Für die Repo-Übertragung musst du als `KingB94` eingeloggt
      sein (Absender) **und er als er selbst** (Empfänger, der bestätigt) —
      gleichzeitig. Dein normales Profil bleibt du, für ihn ein zweites
      Browserprofil oder ein privates Fenster. Ohne das loggt ihr euch
      gegenseitig aus und sucht den Fehler an der falschen Stelle.
- [ ] 🔴 **Die Zwei-Faktor-App gehört auf SEIN Handy.** Der wichtigste Punkt
      des Tages. Richtest du 2FA mit deinem Authenticator ein, weil es gerade
      schneller geht, kommt er **nie** ohne dich an sein Konto. Am Termin fällt
      das niemandem auf, in acht Monaten umso schmerzhafter.
- [ ] **Passwörter, die er behalten kann.** Erzeugst du sie in deinem
      Passwortmanager, hat er hinterher nichts. Für ihn ist Papier die richtige
      Lösung — zusammen mit den Wiederherstellungscodes in den Ordner oder den
      Tresor im Büro. Und **er tippt sie selbst ein**, nicht du.
- [ ] **Nach dem Termin**: seine Sitzungen abmelden, seine Passwörter aus
      deinem Browser löschen.

### 1. Konten anlegen — 25 Min

- [ ] **GitHub-Konto** des Kunden, falls noch nicht geschehen
- [ ] **Zwei-Faktor-Anmeldung einrichten**, mit der App auf **seinem** Handy
      (siehe Punkt 0). Das ist die größte Hürde des ganzen Tages.
      Wiederherstellungscodes **ausdrucken** und ihn wegheften lassen — ohne
      die kommt er bei einem neuen Handy nicht mehr an seine Website.
- [x] ~~Netlify-Konto auf seinen Namen~~ — hinfällig, gehostet wird auf unserem
      Cloudflare. Der Kunde braucht dort kein eigenes Konto.
- [x] **Kunde als Collaborator** im Repository `KingB94/elektrohofmann`.
      ⚠️ Nicht wie ursprünglich geplant andersherum: Das Repository wurde
      **nicht** auf sein Konto übertragen und bleibt bei uns.
- [x] ✅ **`keystatic.config.ts` bleibt unverändert.** Dort steht
      `owner: "KingB94"` — das war nur zu ändern, wenn das Repository auf sein
      Konto wandert. Da es bei uns bleibt und er als Collaborator arbeitet, ist
      der Eintrag richtig. Nichts zu tun.

### 2. Redaktionssystem scharf schalten — 20 Min

- [ ] ⚠️ **Korrigiert am 05.09.2026: Die GitHub-App gehört unter *unser*
      Konto (`KingB94`), nicht unter seines.** Der ursprüngliche Plan ging
      davon aus, dass das Repository auf ihn übergeht — das ist nicht
      passiert. Die App wird auf `KingB94/elektrohofmann` installiert, und
      dort haben nur wir Administrationsrechte. Läge sie unter seinem Konto,
      bräuchte es ihn für jede Änderung an den Callback-URLs.

      Anlegen lokal über `NEXT_PUBLIC_KEYSTATIC_MODE=github npm run dev` und
      `localhost:3000/keystatic`. **Nicht** auf der Live-Adresse: dort zeigt
      Keystatic den Assistenten ohne Zugangsdaten nicht an, sondern meldet
      einen Fehler. Maßgeblich ist das im Browser angemeldete GitHub-Konto —
      also unseres.
- [ ] ⚠️ **Beide Callback-URLs eintragen**, solange ihr zusammensitzt. Der
      Assistent trägt nur die Adresse ein, auf der er gerade läuft — ohne die
      zweite funktioniert der Login nach dem Switch nicht mehr, und er ruft dich
      an, weil „das Ding kaputt ist". GitHub-Apps erlauben mehrere:

      https://<projektname>.workers.dev/api/keystatic/github/oauth/callback
      https://www.elektrohofmann.info/api/keystatic/github/oauth/callback

      Die dritte, vom Assistenten eingetragene `http://localhost:3000/...`
      darf stehen bleiben oder weg — sie stört nicht.

      → GitHub → Settings → Developer settings → GitHub Apps → die App →
      *Callback URL*
- [ ] Die vier Werte bei Cloudflare unter *Settings → Variables* eintragen,
      neu bauen lassen. ⚠️ Die beiden `NEXT_PUBLIC_`-Werte müssen als
      **Build**-Variablen gesetzt sein — sie werden beim Bauen fest eingebaut.
- [ ] **Kontaktformular**: `RESEND_API_KEY` als Secret hinterlegen und einmal
      echt absenden. Es gibt kein Dashboard, in dem Anfragen sonst liegen —
      sie gehen direkt als E-Mail raus oder gar nicht.
- [ ] Gemeinsam einmal anmelden und eine Kleinigkeit ändern

### 3. Einweisung — 25 Min

Am Bildschirm, er bedient, du schaust zu. Nicht umgekehrt — sonst kann er es
hinterher nicht. **Ab hier fasst du die Tastatur nicht mehr an**, auch wenn es
schneller ginge.

- [ ] Anmelden
- [ ] Einen Text ändern und speichern, gemeinsam warten bis es online ist
- [ ] Ein Bild austauschen
- [ ] Eine Leistung umsortieren
- [ ] Zeigen, wo die Kurzanleitung liegt, und dass nichts kaputtgehen kann:
      jede Änderung ist gespeichert und lässt sich zurückholen
- [ ] **Erklären, warum die Adresse noch `netlify.app` heißt** und dass sich
      daran beim Switch nichts für ihn ändert — außer dem Namen in der
      Adresszeile. Er soll die Netlify-Adresse als Lesezeichen speichern.

### 4. Fotos — 30 Min

Am besten gegen Ende, wenn die Technik läuft und die Stimmung locker ist.
Betriebsgelände, Werkstatt, Teleskoplader, er selbst. Handyfotos genügen,
Hauptsache hell und viele. Lieber vor Ort selbst knipsen als hoffen, dass
später welche kommen — erfahrungsgemäß kommen sie sonst nie.

### 5. Abschluss — 20 Min

- [ ] 🔴 **Der Abnahmetest: Er meldet sich auf SEINEM eigenen Gerät an** —
      Handy oder Büro-PC, nicht dein Laptop — und ändert eine Kleinigkeit.
      Ohne deine Hilfe.

      Das ist der einzige Test, der beweist, dass die Übergabe wirklich
      stattgefunden hat. Alles davor prüft nur, dass es *bei dir* geht: dein
      gespeichertes Passwort, deine Sitzung, dein Browser. Läuft dieser Test
      durch, kannst du beruhigt fahren. Läuft er nicht, hast du es hier
      gemerkt statt in acht Monaten am Telefon.
- [ ] Seite auf seinem eigenen Handy über mobile Daten aufrufen (nicht im
      WLAN vor Ort), Schloss-Symbol kontrollieren
- [ ] Kontaktformular gemeinsam einmal abschicken, Ankunft der Mail prüfen
- [ ] Restliche offene Fragen aus der Mail durchgehen

**Und der wichtigste Punkt des Tages:**

- [ ] **Den Switch besprechen und schriftlich festhalten.** Was ihn erwartet:
      ein Anruf von ihm, danach rund 30 Minuten, in denen du die DNS-Einträge
      umstellst; die Seite ist innerhalb weniger Minuten bis weniger Stunden
      unter seiner Domain erreichbar; seine E-Mail bleibt davon unberührt.
- [ ] **Über die alte Seite reden — ehrlich.** Die läuft auf Joomla 2.5.22 von
      Juni 2014 und PHP 5.3.29; beide seit 2014 ohne Sicherheitsupdates, der
      Login-Bereich unter `/administrator/` ist öffentlich erreichbar. Solange
      sie online ist, bleibt das so. Nicht dramatisieren, aber klar sagen und
      ihn entscheiden lassen. Details in `LAUNCH.md`, Abschnitt 4.
- [ ] **Ein Datum oder wenigstens einen Anlass vereinbaren** („wenn die Fotos
      drin sind", „Anfang Oktober"). Ohne Termin versandet es, und die
      ungepatchte Installation bleibt auf unbestimmte Zeit unter seinem
      Firmennamen online.

---

## Der Switch-Termin — später, rund 30 Min

Geht per Telefon mit Bildschirmfreigabe, es muss niemand hinfahren.

> **Geändert am 05.09.2026.** Ursprünglich war geplant, die Domain bei Strato
> zu lassen und nur zwei DNS-Einträge auf Netlify umzubiegen. Der Kunde hat
> stattdessen dem **Transfer der Domain zu uns zu Cloudflare** zugestimmt. Damit
> ist der Switch kein Zwei-Klick-Termin mehr, sondern ein Vorgang über mehrere
> Tage — der eigentliche Umschaltmoment bleibt aber kurz.
>
> Alles unterhalb dieser Zeile ist entsprechend neu. Der Setup-Teil weiter oben
> beschreibt den Termin vom 04.09. so, wie er stattgefunden hat, und bleibt
> als Protokoll stehen — dort genannte Netlify-Schritte sind überholt.

### Warum das jetzt länger dauert

Cloudflare Registrar nimmt eine Domain **erst an, wenn sie schon auf
Cloudflare-Nameservern liegt**. Die Reihenfolge ist also festgelegt, und
zwischen Schritt 2 und 3 liegen rund fünf Tage:

1. Zone bei Cloudflare anlegen und die Website-Einträge setzen
2. Nameserver bei Strato auf Cloudflare umstellen → **ab hier ist die neue
   Seite live**, das ist der eigentliche Switch
3. Auth-Code ziehen, Transfer starten, ~5 Tage warten → Registrierung liegt
   danach bei uns

Der Kunde merkt von Schritt 3 nichts. Für ihn ist der Termin bei Schritt 2 zu
Ende.

### Vorbereitung

- [ ] **Cloudflare-Projekt läuft und ist geprüft** — die Seite muss unter ihrer
      `*.workers.dev`-Adresse vollständig funktionieren, bevor die Domain
      angefasst wird.
- [ ] **Resend eingerichtet** und einmal echt abgesendet.
- [ ] **Screenshot der kompletten Strato-DNS-Zone.** Billigste Versicherung, die
      es gibt: Wenn etwas verrutscht, weißt du, wie es vorher aussah.
- [ ] **DNSSEC bei Strato abschalten**, sonst scheitert der Nameserver-Wechsel.
- [ ] **TTL bei Strato absenken** (z. B. 300 Sekunden), damit die Umstellung
      schnell greift.
- [ ] Prüfen, ob die zweite Callback-URL in der GitHub-App eingetragen ist
      (siehe Setup-Termin, Punkt 2)

### Die Zone bei Cloudflare

Stand gemessen am 05.09.2026 gegen Zielzustand:

| Eintrag | Jetzt (Strato) | Nachher (Cloudflare) |
| --- | --- | --- |
| `elektrohofmann.info` | A `81.169.145.72` | Worker-Route auf das Projekt |
| `www` | A `81.169.145.72` | Worker-Route auf das Projekt |
| `MX` | `5 smtpin.rzone.de` | **entfällt** — siehe unten |
| SPF | — | `v=spf1 -all` (bzw. Resend-Eintrag) |
| DMARC | — | `v=DMARC1; p=reject;` |

✅ **Der MX kann weg — das ist geprüft, nicht angenommen.** Am 05.09.2026
nachgemessen: Der Betrieb nutzt für E-Mail ausschließlich
`hofmann-wonneberg.de` (Microsoft 365 hinter Hornetsecurity, DNS bei Hetzner —
nichts davon bei Strato, sondern von dritter Seite verwaltet). Unter
`elektrohofmann.info` läuft keine E-Mail — der MX ist Stratos Standardeintrag
ohne Postfach dahinter.

⚠️ Sobald Resend läuft, gehören dessen SPF- und DKIM-Einträge in die Zone —
sonst lehnt der Versand ab oder die Anfragen landen im Spam.

### Am Switch-Tag

- [ ] Zone bei Cloudflare vollständig anlegen (Tabelle oben)
- [ ] Strato-Kundenbereich → Domainverwaltung → Nameserver auf die beiden
      Cloudflare-Nameserver umstellen
- [ ] Warten, bis Cloudflare die Zone als aktiv meldet (meist Minuten)
- [ ] Domain im Worker-Projekt als Custom Domain hinterlegen — Zertifikat
      kommt automatisch
- [ ] `NEXT_PUBLIC_SITE_URL` auf `https://www.elektrohofmann.info` setzen und
      **neu bauen** (der Wert wird beim Bauen fest eingebaut, ein bloßer
      Neustart genügt nicht)

### Direkt danach

- [ ] Erreichbarkeit unter der echten Domain prüfen (Handy, mobile Daten)
- [ ] Schloss-Symbol kontrollieren
- [ ] Die drei alten Adressen testen: `/leistungen`, `/ueber-uns`,
      `/kontakt-anfahrt` müssen mit 301 auf die Startseite führen
- [ ] Kontaktformular unter der neuen Adresse einmal abschicken und prüfen,
      ob die Mail bei `info@hofmann-wonneberg.de` ankommt
- [ ] `robots.txt` und `sitemap.xml` aufrufen: Steht dort die echte Domain?
- [ ] `KURZANLEITUNG-KUNDE.md` mit der echten Adresse neu ausdrucken und
      hinschicken

### In den Tagen danach

- [ ] Auth-Code bei Strato anfordern, Domain entsperren, Transfer bei
      Cloudflare starten
- [ ] Nach Abschluss: Kunden das Strato-Passwort ändern lassen
- [ ] Prüfen, ob das Strato-Hostingpaket noch gebraucht wird — erst **nach**
      dem Sichern und Löschen der Joomla-Installation kündigen

### Alte Joomla-Seite abschalten

**Nicht vorher löschen** — solange die Nameserver auf Strato zeigen, ist Joomla
die Seite. Mit dem Nameserver-Wechsel ist sie unter der Domain nicht mehr erreichbar; das ist
der größte Teil des Problems. Die Installation liegt danach aber weiter auf dem
Webspace:

- [ ] **Erst sichern**: Dateien per FTP ziehen, Datenbank im Strato-Kundenbereich
      exportieren. Zehn Minuten, und die Rückfahrkarte, falls doch ein Text fehlt.
- [ ] **Dann löschen**: Dateien über Dateimanager oder FTP, danach die Datenbank.
      Ein Joomla-Admin-Zugang wird dafür nicht gebraucht — den hat nach zwölf
      Jahren vermutlich ohnehin niemand mehr.
- [ ] **Prüfen, ob eine zweite Domain oder Subdomain auf dasselbe Verzeichnis
      zeigt.** Sonst ist die Installation über einen anderen Namen weiter offen,
      und man hält sie für erledigt.

---

## Wenn etwas schiefgeht

| Problem | Reaktion |
| --- | --- |
| Er bekommt die Zwei-Faktor-Anmeldung nicht hin | Fallback: du legst alles an, er ändert das Passwort selbst und übernimmt später. Nicht am Termin verbeißen. **Aber:** dann steht der Abnahmetest aus, und das gehört schriftlich festgehalten samt Nachholtermin. |
| Er kommt vor Ort nicht an seine E-Mail | Bestätigungsmails von GitHub, Netlify und der Repo-Übertragung hängen daran. Notfalls ans Bürotelefon/den Büro-PC verlagern. Lässt sich nicht überspringen. |
| Der Abnahmetest scheitert auf seinem Gerät | Nicht wegdiskutieren — genau dafür ist er da. Meist ein fehlendes Passwort oder die 2FA-App am falschen Ort. Vor Ort lösen, nicht „schau ich mir daheim an". |
| Keine Fotos vorhanden | Selbst welche machen. Zur Not funktioniert die Seite auch mit den vier vorhandenen Bildern. |
| Impressumsangaben unklar | Kein Grund, irgendetwas zu verschieben — die Seite geht am 4.9. ohnehin nicht live. Schriftlich festhalten, dass es offen ist, und vor dem Switch nachziehen. |
| Keystatic-Login geht nicht | Fast immer die Callback-URL oder eine fehlende Umgebungsvariable. Die vier Werte bei Netlify gegen `.env.example` prüfen. |
| *(beim Switch)* DNS wirkt noch nicht | Normal. Über die `*.netlify.app`-Adresse zeigen, dass alles läuft. Nicht hektisch an den Einträgen herumstellen — das macht es schlimmer. |
| *(beim Switch)* Zertifikat noch nicht ausgestellt | Netlify holt es erst, wenn die DNS-Umstellung greift. Kommt von allein, meist innerhalb einer Stunde. |

---

## Vor dem Setup-Termin noch zu erledigen

- [x] ~~Vercel-Projekt löschen~~ — **bewusst stehen gelassen.** Es baut bei
      jedem Push auf `main` mit, und genau das wird gebraucht: Der Kunde
      schaut sich über diesen Link das Design an und gibt Rückmeldung.

      **Löschen, sobald die Cloudflare-Adresse steht** und er sie kennt. Bis
      dahin drei Dinge im Blick behalten:

      - Das **Kontaktformular funktioniert dort nicht**, solange
        `RESEND_API_KEY` in den Vercel-Variablen fehlt. Es zeigt dann seine
        Fehlermeldung. Entweder den Schlüssel dort ebenfalls hinterlegen oder
        dem Kunden sagen, dass er das Formular auf dieser Adresse nicht testen
        soll.
      - Die Startseite trägt **kein `noindex`** (nur die Entwurfsseiten). Die
        Vercel-Adresse ist damit grundsätzlich indexierbar — bei einer
        `*.vercel.app`-Adresse ohne eingehende Links ein kleines Risiko, aber
        ein Grund, sie nach der Freigabe zügig abzuschalten.
      - Vercels Hobby-Plan untersagt gewerbliche Nutzung. Als kurzlebiger
        Abstimmungslink vertretbar, als Dauerzustand nicht.
- [x] ~~301-Weiterleitungen in `netlify.toml`~~ — stehen in `next.config.ts`.

## Nach dem Switch

- [ ] Google-Unternehmensprofil auf die neue Adresse zeigen lassen
- [ ] Nach ein bis zwei Wochen nachfassen: Kommt er mit dem Editor zurecht?

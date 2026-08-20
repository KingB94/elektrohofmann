# Termin bei Elektro Hofmann — Freitag, 04.09.2026

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

### Fr, 21.08. – Mo, 24.08. — Generalprobe

Einmal die komplette Kette selbst durchspielen, **bevor** du beim Kunden sitzt.
Das ist die wertvollste Vorbereitung überhaupt: Danach kennst du jeden
Klick, und am Termin dauert dasselbe fünfzehn Minuten statt einer Stunde.

- [ ] Auf der `*.netlify.app`-Adresse `/keystatic` aufrufen → der
      Einrichtungsassistent führt durch das Anlegen der GitHub-App
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

- [ ] **Domain steht fest** → wird für den Switch gebraucht, und für die
      zweite Callback-URL (siehe Setup-Termin, Punkt 2). `NEXT_PUBLIC_SITE_URL`
      zeigt bis zum Switch auf die Netlify-Adresse.
- [ ] **Impressumsangaben bestätigt** → in `content/betrieb.json` einpflegen
- [ ] **Öffnungszeiten bestätigt** → ebenda, zusätzlich in `app/layout.tsx`
      (dort stehen sie fest, weil Google ein maschinenlesbares Format braucht)
- [ ] **Fotos da** → einbauen, zuschneiden, komprimieren
- [ ] **GitHub-Benutzername da** → Kunde ins Repository einladen

### Mi, 02.09. — zwei Tage vorher, Packliste

- [ ] Laptop, Ladegerät, **Handy als mobiler Hotspot** (verlass dich nicht auf
      das WLAN vor Ort)
- [ ] `KURZANLEITUNG-KUNDE.md` — **vorher die Netlify-Adresse eintragen**
      (Zeile 21, steht dort als `ihredomain.de/keystatic`), dann zweifach
      ausdrucken. Beim Switch neu ausdrucken mit der echten Domain.
- [ ] Kartenleser oder USB-Kabel für die Fotos
- [ ] Diese Datei und `LAUNCH.md` offen im Browser
- [ ] Strato-Zugangsdaten — am 4.9. **nicht** zwingend nötig, weil DNS nicht
      angefasst wird. Trotzdem erfragen: für das SSL-Zertifikat der alten Seite
      (siehe unten) und damit der Switch später nicht daran scheitert.

> **Der TTL-Punkt ist umgezogen.** Das Absenken der DNS-Zwischenspeicherung
> gehört jetzt zur Vorbereitung des Switch-Termins, nicht des Setup-Termins.
> Siehe dort.

---

## Ablauf am Setup-Termin — rund zwei Stunden

Reihenfolge: erst die Technik, dann die Einweisung, Fotos zum Schluss, wenn
die Stimmung locker ist.

### 1. Konten anlegen — 25 Min

- [ ] **GitHub-Konto** des Kunden, falls noch nicht geschehen
- [ ] **Zwei-Faktor-Anmeldung einrichten.** Das ist die größte Hürde des ganzen
      Tages. Wiederherstellungscodes **ausdrucken** und ihn wegheften lassen —
      ohne die kommt er bei einem neuen Handy nicht mehr an seine Website.
- [ ] **Netlify-Konto** auf seinen Namen
- [ ] Repository auf sein Konto übertragen, dich als Collaborator eintragen
- [ ] ⚠️ **In `keystatic.config.ts` den Besitzer anpassen** — dort steht
      `owner: "KingB94"` fest verdrahtet (Zeile 66). Wandert das Repository auf
      sein Konto, zeigt die Zeile ins Leere und der Editor speichert gegen ein
      Repo, das ihm nicht mehr gehört. Ändern, committen, pushen.

### 2. Redaktionssystem scharf schalten — 20 Min

- [ ] `/keystatic` auf der **Netlify-Adresse** aufrufen und den
      Einrichtungsassistenten durchlaufen
- [ ] GitHub-App unter **seinem** Konto anlegen lassen, nicht unter deinem
- [ ] ⚠️ **Beide Callback-URLs eintragen**, solange ihr zusammensitzt. Der
      Assistent trägt nur die Adresse ein, auf der er gerade läuft — ohne die
      zweite funktioniert der Login nach dem Switch nicht mehr, und er ruft dich
      an, weil „das Ding kaputt ist". GitHub-Apps erlauben mehrere:

      https://<projekt>.netlify.app/api/keystatic/github/oauth/callback
      https://www.<seine-domain>/api/keystatic/github/oauth/callback

      → GitHub → Settings → Developer settings → GitHub Apps → die App →
      *Callback URL*
- [ ] Die vier Werte bei Netlify unter *Environment variables* eintragen,
      neu bauen lassen
- [ ] **Formular-Benachrichtigung**: Netlify → Forms → Notifications auf seine
      E-Mail-Adresse. Sonst liegen Anfragen nur im Dashboard und niemand sieht sie.
- [ ] Gemeinsam einmal anmelden und eine Kleinigkeit ändern

### 3. Einweisung — 25 Min

Am Bildschirm, er bedient, du schaust zu. Nicht umgekehrt — sonst kann er es
hinterher nicht.

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

### Drei Tage vorher

- [ ] **TTL bei Strato absenken.** Prüfen, ob sich der Wert der DNS-Einträge
      einstellen lässt; falls ja, auf den kleinstmöglichen Wert (z. B. 300
      Sekunden). TTL bedeutet, wie lange andere Rechner die alte Antwort
      zwischenspeichern — steht dort der Standardwert von oft 24 Stunden, ist
      die Seite unter der Domain unter Umständen den ganzen Tag nicht
      erreichbar.
- [ ] Prüfen, ob die zweite Callback-URL in der GitHub-App wirklich eingetragen
      ist (siehe Setup-Termin, Punkt 2)

### Am Switch-Tag

- [ ] ⚠️ **Zuerst einen Screenshot der kompletten DNS-Zone machen.** Billigste
      Versicherung, die es gibt: Wenn etwas verrutscht, weißt du, wie es vorher
      aussah.

**Zwei bestehende Einträge ändern**, keine neuen anlegen. Stand gemessen am
20.08.2026 gegen Zielzustand:

| Eintrag | Jetzt | Nachher |
| --- | --- | --- |
| `elektrohofmann.info` (A) | `81.169.145.72` (Strato) | `75.2.60.5` (Netlify) |
| `www` (CNAME) | → `elektrohofmann.info` | → `<projekt>.netlify.app` |
| `MX` | `smtpin.rzone.de` | **unverändert** |

- [ ] Strato-Kundenbereich → Domainverwaltung → DNS
- [ ] A-Eintrag der Hauptdomain auf die Netlify-IP ändern
- [ ] `www`-CNAME auf die Netlify-Adresse des Projekts umbiegen
- [ ] ⚠️ **MX-Einträge nicht anfassen** — sonst ist die Firmen-E-Mail tot.
      Kein theoretisches Risiko: der MX zeigt nachweislich auf Strato.
- [ ] Domain bei Netlify hinterlegen, Zertifikat kommt automatisch

**Werte aus dem Netlify-Dashboard nehmen, nicht aus dieser Tabelle.** Die
`75.2.60.5` ist Netlifys dokumentierte Fallback-IP für Anbieter ohne
ALIAS/ANAME — sie stimmt heute, aber im Projekt steht, was gilt.

⚠️ **Die Falle: „Use Netlify DNS".** Netlify bietet im Dashboard an, die Domain
komplett zu übernehmen, indem man die Nameserver umstellt. Das ist der
bequemere Weg und hier der falsche: Damit zieht die **gesamte Zone inklusive
MX** zu Netlify um, und die Mail-Einträge müssten dort von Hand nachgebaut
werden. Bei einem Kunden mit Postfächern bei Strato ist das genau das Risiko,
das man nicht eingeht. **Nameserver bleiben bei Strato, nur die zwei Records
ändern.**

Netlify empfiehlt bei externem DNS, `www` als Hauptadresse zu setzen und die
nackte Domain dorthin umzuleiten — weil Apex-Domains über die feste IP nicht
so gut übers CDN routen. Für diese Seite spielt das kaum eine Rolle, ist aber
die sauberere Einstellung.

### Direkt nach dem Switch

- [ ] 🔴 **`X-Robots-Tag = "noindex"` für `/*` aus `netlify.toml` entfernen.**
      Der Eintrag hält die Netlify-Adresse aus dem Suchindex, solange die Seite
      noch nicht unter der echten Domain läuft. Bleibt er drin, ist die fertige
      Seite für Google unsichtbar. **Der mit Abstand teuerste Fehler auf dieser
      Liste.**
- [ ] `NEXT_PUBLIC_SITE_URL` bei Netlify auf die echte Domain, neu bauen
- [ ] Erreichbarkeit unter der echten Domain prüfen (Handy, mobile Daten)
- [ ] Schloss-Symbol kontrollieren
- [ ] Kontaktformular unter der neuen Adresse einmal abschicken
- [ ] **E-Mail testen**: sich selbst eine Nachricht an seine Firmenadresse
      schicken lassen und prüfen, ob sie ankommt
- [ ] `KURZANLEITUNG-KUNDE.md` mit der echten Adresse neu ausdrucken und
      hinschicken
- [ ] TTL bei Strato wieder auf den Normalwert hochsetzen

### Alte Joomla-Seite abschalten

**Nicht vorher löschen** — solange DNS auf Strato zeigt, ist Joomla die Seite.
Mit der DNS-Umstellung ist sie unter der Domain nicht mehr erreichbar; das ist
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
| Er bekommt die Zwei-Faktor-Anmeldung nicht hin | Fallback: du legst alles an, er ändert das Passwort selbst und übernimmt später. Nicht am Termin verbeißen. |
| Keine Fotos vorhanden | Selbst welche machen. Zur Not funktioniert die Seite auch mit den vier vorhandenen Bildern. |
| Impressumsangaben unklar | Kein Grund, irgendetwas zu verschieben — die Seite geht am 4.9. ohnehin nicht live. Schriftlich festhalten, dass es offen ist, und vor dem Switch nachziehen. |
| Keystatic-Login geht nicht | Fast immer die Callback-URL oder eine fehlende Umgebungsvariable. Die vier Werte bei Netlify gegen `.env.example` prüfen. |
| *(beim Switch)* DNS wirkt noch nicht | Normal. Über die `*.netlify.app`-Adresse zeigen, dass alles läuft. Nicht hektisch an den Einträgen herumstellen — das macht es schlimmer. |
| *(beim Switch)* Zertifikat noch nicht ausgestellt | Netlify holt es erst, wenn die DNS-Umstellung greift. Kommt von allein, meist innerhalb einer Stunde. |

---

## Vor dem Setup-Termin noch zu erledigen

- [ ] **Vercel-Projekt löschen** — dort liegt noch dieselbe Seite. Solange sie
      dort erreichbar ist, steht sie unter zwei Adressen im Netz.
- [ ] 301-Weiterleitungen in `netlify.toml` eintragen (greifen erst mit dem
      Switch, lassen sich aber auf der Netlify-Adresse schon testen)

## Nach dem Switch

- [ ] Google-Unternehmensprofil auf die neue Adresse zeigen lassen
- [ ] Nach ein bis zwei Wochen nachfassen: Kommt er mit dem Editor zurecht?

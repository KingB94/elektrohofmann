# Termin bei Elektro Hofmann — Freitag, 04.09.2026

**Leitgedanke: Der Termin soll eine Übergabe sein, kein Aufbau.**

Alles, was vorher erledigt werden kann, wird vorher erledigt. Am 4. September
bleiben dann nur die Dinge übrig, die den Kunden zwingend brauchen: seine
Zugänge, seine Fotos, seine Bestätigungen — und die Einweisung.

---

## Zeitplan bis zum Termin

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

- [ ] **Domain steht fest** → `NEXT_PUBLIC_SITE_URL` bei Netlify setzen,
      Domain in Netlify hinterlegen
- [ ] **Impressumsangaben bestätigt** → in `content/betrieb.json` einpflegen
- [ ] **Öffnungszeiten bestätigt** → ebenda, zusätzlich in `app/layout.tsx`
      (dort stehen sie fest, weil Google ein maschinenlesbares Format braucht)
- [ ] **Fotos da** → einbauen, zuschneiden, komprimieren
- [ ] **GitHub-Benutzername da** → Kunde ins Repository einladen

### Di, 01.09. — drei Tage vorher

- [ ] **Bei Strato prüfen, ob sich der TTL-Wert der DNS-Einträge einstellen
      lässt.** Falls ja: auf den kleinstmöglichen Wert setzen (z. B. 300
      Sekunden). Das ist der Trick, damit die Umstellung am Termin in Minuten
      wirkt statt in Stunden. TTL bedeutet, wie lange andere Rechner die alte
      Antwort zwischenspeichern — steht dort noch der Standardwert von oft 24
      Stunden, ist die Seite unter der Domain am Termin unter Umständen den
      ganzen Tag nicht erreichbar, und du stehst blöd da.
- [ ] Alle offenen Antworten nochmal anmahnen, freundlich
- [ ] Die Seite ein letztes Mal auf einem echten Handy durchsehen

### Mi, 02.09. — zwei Tage vorher, Packliste

- [ ] Laptop, Ladegerät, **Handy als mobiler Hotspot** (verlass dich nicht auf
      das WLAN vor Ort)
- [ ] `KURZANLEITUNG-KUNDE.md` ausgedruckt, zweifach
- [ ] Kartenleser oder USB-Kabel für die Fotos
- [ ] Diese Datei und `LAUNCH.md` offen im Browser
- [ ] Strato-Zugangsdaten des Kunden — vorher erfragen, nicht erst vor Ort suchen

---

## Ablauf am Termin — rund zwei Stunden

Reihenfolge bewusst so: Erst das, was ohne Internet-Wartezeit geht, dann die
Umstellung, und während die DNS-Änderung durchläuft, machst du die Einweisung.
So wartet niemand vor einem Bildschirm.

### 1. Konten anlegen — 20 Min

- [ ] **GitHub-Konto** des Kunden, falls noch nicht geschehen
- [ ] **Zwei-Faktor-Anmeldung einrichten.** Das ist die größte Hürde des ganzen
      Tages. Wiederherstellungscodes **ausdrucken** und ihn wegheften lassen —
      ohne die kommt er bei einem neuen Handy nicht mehr an seine Website.
- [ ] **Netlify-Konto** auf seinen Namen
- [ ] Repository auf sein Konto übertragen, dich als Collaborator eintragen
- [ ] In `keystatic.config.ts` den Besitzer anpassen (steht dort fest als
      `owner: "KingB94"`), committen, pushen

### 2. Redaktionssystem scharf schalten — 15 Min

- [ ] `/keystatic` auf der **echten Domain** aufrufen und den
      Einrichtungsassistenten durchlaufen. Wichtig: Der Assistent trägt die
      Adresse ein, unter der du ihn gerade aufrufst — also nicht von einer
      Test-Adresse aus starten.
- [ ] GitHub-App unter **seinem** Konto anlegen lassen, nicht unter deinem
- [ ] Die vier Werte bei Netlify eintragen, neu bauen lassen
- [ ] Gemeinsam einmal anmelden und eine Kleinigkeit ändern

### 3. DNS umstellen — 10 Min Arbeit, dann Wartezeit

- [ ] Bei Strato die A-/CNAME-Werte eintragen, die Netlify anzeigt
- [ ] ⚠️ **MX-Einträge nicht anfassen** — sonst ist die Firmen-E-Mail tot
- [ ] Ab hier läuft die Umstellung im Hintergrund → weiter mit Punkt 4

### 4. Einweisung — 20 Min (während DNS durchläuft)

Am Bildschirm, er bedient, du schaust zu. Nicht umgekehrt — sonst kann er es
hinterher nicht.

- [ ] Anmelden
- [ ] Einen Text ändern und speichern, gemeinsam warten bis es online ist
- [ ] Ein Bild austauschen
- [ ] Eine Leistung umsortieren
- [ ] Zeigen, wo die Kurzanleitung liegt, und dass nichts kaputtgehen kann:
      jede Änderung ist gespeichert und lässt sich zurückholen

### 5. Fotos — 30 Min

Am besten gegen Ende, wenn die Technik läuft und die Stimmung locker ist.
Betriebsgelände, Werkstatt, Teleskoplader, er selbst. Handyfotos genügen,
Hauptsache hell und viele. Lieber vor Ort selbst knipsen als hoffen, dass
später welche kommen — Erfahrungsgemäß kommen sie sonst nie.

### 6. Abschluss — 10 Min

- [ ] Erreichbarkeit unter der echten Domain prüfen (Handy, mobile Daten,
      nicht das WLAN vor Ort)
- [ ] Schloss-Symbol im Browser kontrollieren
- [ ] Kontaktformular gemeinsam einmal abschicken
- [ ] Klären, wer die alte Joomla-Seite abschaltet und wann
- [ ] Restliche offene Fragen aus der Mail durchgehen

---

## Wenn etwas schiefgeht

| Problem | Reaktion |
| --- | --- |
| DNS wirkt noch nicht | Normal. Über die `*.netlify.app`-Adresse zeigen, dass alles läuft. Nicht hektisch an den Einträgen herumstellen — das macht es schlimmer. |
| Zertifikat noch nicht ausgestellt | Netlify holt es erst, wenn die DNS-Umstellung greift. Kommt von allein, meist innerhalb einer Stunde. |
| Er bekommt die Zwei-Faktor-Anmeldung nicht hin | Fallback: du legst alles an, er ändert das Passwort selbst und übernimmt später. Nicht am Termin verbeißen. |
| Keine Fotos vorhanden | Selbst welche machen. Zur Not geht die Seite auch mit den vier vorhandenen Bildern live. |
| Impressumsangaben unklar | Live gehen, Impressum nachziehen. Kein Grund, den Start zu verschieben — aber schriftlich festhalten, dass es offen ist. |

---

## Was nach dem Termin noch zu tun ist

- [ ] Alte Joomla-Seite abschalten
- [ ] 301-Weiterleitungen einrichten, falls die Domain gleich bleibt
      (`/leistungen`, `/ueber-uns`, `/kontakt-anfahrt`, `/impressum`)
- [ ] **Vercel-Projekt löschen** — sonst steht dieselbe Seite unter zwei
      Adressen im Suchindex
- [ ] TTL bei Strato wieder auf den Normalwert hochsetzen
- [ ] Google-Unternehmensprofil auf die neue Adresse zeigen lassen
- [ ] Nach ein bis zwei Wochen nachfassen: Kommt er mit dem Editor zurecht?

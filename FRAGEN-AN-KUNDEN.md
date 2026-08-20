# E-Mail an Elektro Hofmann

Stand: 20.08.2026. Unten ein fertiger Text zum Kopieren — erst eine kurze
Erklärung des Aufbaus in Alltagssprache, dann alle offenen Fragen.
Davor die Priorisierung, nur für dich.

---

## Welche Frage wie dringend ist — nur für dich

| # | Frage | Warum sie wichtig ist | Vor dem Termin? |
| --- | --- | --- | --- |
| 1 | Welche Domain? | Bestimmt DNS-Umstellung, `NEXT_PUBLIC_SITE_URL`, OAuth-Callback und ob die alte Seite automatisch verschwindet | **ja** |
| 2 | Alte Seite abschalten | Joomla 2.5.22 (2014) auf PHP 5.3.29, beide seit 2014 ohne Sicherheitsupdates, `/administrator/` öffentlich erreichbar — nachgemessen, siehe `LAUNCH.md` | **ja** |
| 3 | Welche E-Mail-Postfächer bei Strato? | Der MX-Eintrag zeigt auf Strato — es *gibt* dort Mail. Falsch angefasst liegt die Firmen-Mail lahm | **ja** |
| 4 | GitHub-Account | Ohne ihn kein Login ins Redaktionssystem | **ja** |
| 5 | Impressumsangaben | Rechtlich relevant, Quelle ist von ~2014 | **ja** |
| 6 | Öffnungszeiten | Stehen auf der Seite und im strukturierten Datensatz für Google | ja |
| 7 | Kontakt-Adresse | Formular und alle Mail-Links hängen daran | ja |
| 8 | Fotos | Alte Bilder sind lizenzrechtlich nicht übernehmbar | ja |
| 9 | Teamgröße | Zahl von ~2014, aktuell bewusst weggelassen | nein |
| 10 | Elektrohandel + Teleskoplader als eigene Kacheln | Layout-Entscheidung, würde das Raster auf acht Kacheln erweitern | nein |
| 11 | Link auf elektro-demel.de | Möglicherweise eingeschleuster SEO-Link | nein |
| 12 | Google-Bewertungen | Zahl auf der Seite stammt aus einer Schätzung | nein |

Ohne Antwort auf 1–5 kommst du beim Termin nicht durch.

### Was die DNS-Abfrage schon beantwortet — Stand 20.08.2026

```
NS:  docks11.rzone.de, shades17.rzone.de     → Strato
A:   81.169.145.72                            → Strato
MX:  5 smtpin.rzone.de                        → Strato-Mail
```

`rzone.de` ist durchgehend Strato. Damit liegen **Domain, Webspace und Mail**
beim selben Anbieter — das war vorher nur vermutet.

Wichtig für Frage 3: Für die Domain **ist** Strato-Mail eingerichtet. Ob die
Postfächer tatsächlich genutzt werden oder nur mitgeliefert wurden, sagt DNS
nicht. Die Frage lautet also nicht mehr „gibt es dort Postfächer", sondern
„welche davon sind in Gebrauch". Konsequenz: MX beim Umstellen nicht anfassen,
und **kein Downgrade des Strato-Pakets**, bevor das geklärt ist — bei Strato
hängen Postfächer üblicherweise am Hostingpaket.

Ebenfalls gemessen — die alte Seite läuft auf **Joomla 2.5.22 vom Juni 2014**
(die Datei `/administrator/manifests/files/joomla.xml` gibt die Version frei
heraus) auf **PHP 5.3.29**. Beides seit 2014 ohne Sicherheitsupdates, der
Login-Bereich unter `/administrator/` antwortet mit HTTP 200. Vollständige
Belege in `LAUNCH.md`, Abschnitt 4.

Und: `http://elektrohofmann.info` antwortet normal (Apache,
301 auf `www`), `https://` bricht schon beim Handshake ab. Es ist also kein
abgelaufenes Zertifikat, sondern gar keins — bei Strato heißt das fast immer,
dass Let's Encrypt im Kundenbereich nie eingeschaltet wurde. Das ließe sich
sofort abstellen (Kundenbereich → Domains → SSL-Verwaltung), ist im
Hosting-Paket enthalten und in Frage 2 unten als Angebot formuliert.
**Nicht ohne seine ausdrückliche Zustimmung in seinem Konto klicken.**

---

## Der E-Mail-Text

**Betreff:** Ihre neue Website — so läuft es, und was ich noch von Ihnen brauche

Sehr geehrter Herr Hofmann,

die neue Website steht so weit. Bevor wir sie aufschalten, möchte ich Ihnen
kurz erklären, wie das Ganze künftig funktioniert — und ein paar Dinge von
Ihnen wissen.

---

### So wird es aufgebaut sein

**Ihre Internetadresse bleibt, wo sie ist.**
Die Adresse liegt weiter bei Strato, dort ändert sich für Sie nichts. Nur der
Ort, an dem die Seite selbst gespeichert ist, wechselt. Das funktioniert
ungefähr wie eine Rufumleitung: Die Nummer bleibt dieselbe, es klingelt nur an
einem anderen Apparat.

**Die Seite selbst liegt künftig bei einem Anbieter namens Netlify.**
Für eine Website Ihrer Größe ist das kostenlos. Das Sicherheitszertifikat —
also das, was aktuell bei Ihrer alten Seite fehlt und die Warnung im Browser
auslöst — wird dort automatisch erstellt und von selbst erneuert. Darum müssen
Sie sich nie kümmern.

**Sie können Ihre Website selbst bearbeiten.**
Sie rufen dafür eine eigene Adresse auf, melden sich an und sehen dann eine
Übersicht: Kopfbereich, Leistungen, Der Betrieb, Kontakt und so weiter. Text
anklicken, ändern, speichern — nach etwa einer Minute steht es auf der Seite.
Bilder tauschen Sie genauso aus. Sie müssen dafür nichts installieren, es
läuft im Browser und funktioniert auch am Tablet.

**Die Anmeldung läuft über einen Dienst namens GitHub.**
Dort wird der „Bauplan" Ihrer Website gespeichert. Sie brauchen dafür ein
kostenloses Benutzerkonto — das ist sozusagen Ihr Schlüssel zum Bearbeiten.
Der angenehme Nebeneffekt: Jede Änderung wird mitgeschrieben. Wenn Sie einmal
versehentlich etwas löschen, lässt sich das zurückholen.

**Anfragen über das Kontaktformular** kommen künftig als E-Mail bei Ihnen an,
statt wie bisher das Mailprogramm des Besuchers zu öffnen. Das ist besonders
am Handy zuverlässiger.

**Der Umstieg passiert in zwei Schritten.**
Bei unserem Termin richten wir alles fertig ein. Die neue Seite läuft danach
schon vollständig — Sie können sie bearbeiten, das Formular funktioniert, alles
ist da. Sie erreichen sie zunächst nur unter einer vorläufigen Adresse, die ich
Ihnen aufschreibe. Ihre gewohnte Internetadresse zeigt so lange weiter auf die
alte Seite. Den Zeitpunkt, an dem umgeschaltet wird, bestimmen Sie: Sie rufen
mich an, und rund eine halbe Stunde später ist die neue Seite unter Ihrer
Adresse erreichbar. Hinfahren muss dafür niemand.

**Was das laufend kostet:** nur Ihre Internetadresse bei Strato, also das, was
Sie ohnehin schon zahlen. Der Speicherplatz für die Seite, das
Bearbeitungssystem und das Sicherheitszertifikat kosten nichts.

---

### Was ich noch von Ihnen brauche

Am wichtigsten sind die ersten fünf Punkte — die brauche ich möglichst vor
unserem Termin. Den Rest können wir auch gerne gemeinsam durchgehen.

**1. Ihre Internetadresse**
Unter welcher Adresse soll die neue Seite laufen — weiterhin unter
elektrohofmann.info, oder haben Sie noch eine weitere (zum Beispiel eine mit
`.de` am Ende)? Falls es mehrere gibt, nennen Sie mir bitte alle. Ich leite die
übrigen dann auf die Hauptadresse weiter, damit niemand ins Leere läuft.

**2. Ihre bisherige Seite**
Ich habe mir angesehen, worauf sie läuft: ein Redaktionssystem namens Joomla,
Stand Juni 2014, auf einer ebenso alten Version der zugrundeliegenden Technik.
Für beide gibt es seit Ende 2014 keine Sicherheitsupdates mehr. Das ist kein
Vorwurf — so etwas läuft jahrelang unauffällig weiter, und niemand sagt einem
Bescheid. Es heißt aber, dass die Lücken, die in dieser Zeit gefunden wurden,
offen bleiben, und dass automatisierte Programme das Internet gezielt nach
solchen Installationen absuchen. Meist geht es dabei nicht um Daten, sondern
darum, die Seite für Werbung oder Spam zu missbrauchen.

Die Seite sollte deshalb abgeschaltet werden, sobald wir umgeschaltet haben.
Wissen Sie, wer sie damals eingerichtet hat? Im Impressum steht die Firma
jkv-onliner.de. Und liegt sie in Ihrem eigenen Strato-Paket, oder hat das
seinerzeit die Agentur bei sich gehostet?

Nebenbei: Die Warnung „nicht sicher", die Ihr Browser bei der alten Seite
anzeigt, hat eine andere, harmlosere Ursache — das Sicherheitszertifikat wurde
bei Strato schlicht nie eingeschaltet. Es ist in Ihrem Paket enthalten und wäre
eine Sache von wenigen Klicks. Wenn Sie mögen, machen wir das vorab gemeinsam
am Telefon. Zwingend nötig ist es nicht, da die Seite ohnehin abgelöst wird.

**3. Ihre E-Mail-Postfächer**
Zu Ihrer Internetadresse gehört bei Strato auch ein Postfach-Bereich. Welche
Adressen nutzen Sie dort tatsächlich — und gibt es außer
hofmanngreinach@t-online.de noch weitere, an die Post geht? Ich frage so
genau, weil ich bei der Umstellung die Einstellungen für Ihre E-Mails
unangetastet lassen muss. Und falls sich später herausstellt, dass sich Ihr
Strato-Vertrag verkleinern lässt: Postfächer hängen dort meistens am
Hosting-Paket mit dran, deshalb schauen wir uns das vorher gemeinsam an,
bevor irgendetwas gekündigt wird.

**4. Zugang zum Bearbeitungssystem**
Bitte legen Sie sich ein kostenloses Konto unter github.com an — das dauert
etwa fünf Minuten. Schicken Sie mir anschließend den gewählten Benutzernamen,
dann schalte ich Sie frei. Falls Ihnen das lieber ist, machen wir das auch
gemeinsam beim Termin.

**5. Angaben fürs Impressum**
Diese habe ich aus Ihrem alten Impressum übernommen. Bitte prüfen Sie, ob noch
alles stimmt:

- Rechtsform: Einzelunternehmen
- Umsatzsteuer-ID: DE244185087
- Zuständige Kammer: Handwerkskammer für München und Oberbayern
- Berufsbezeichnung: Hier steht auf Ihrer alten Seite „Elektrotechniker für
  Energie- und Gebäudetechnik", an anderer Stelle ist vom Meisterabschluss die
  Rede. Welche Bezeichnung ist die richtige?

**6. Öffnungszeiten**
Auf der neuen Seite steht derzeit Montag bis Freitag, 8 bis 18 Uhr. Stimmt das,
oder soll ich etwas anderes eintragen? Diese Zeiten werden auch bei Google
angezeigt.

**7. E-Mail-Adresse für Anfragen**
Anfragen über das Kontaktformular gehen aktuell an hofmanngreinach@t-online.de.
Soll das so bleiben, oder hätten Sie lieber eine Adresse unter Ihrer eigenen
Internetadresse, also zum Beispiel info@ihredomain.de?

**8. Fotos**
Das ist der Punkt, der optisch am meisten bringt. Die Bilder Ihrer alten Seite
kann ich leider nicht übernehmen — das sind gekaufte Archivfotos, deren Lizenz
bei der damaligen Agentur liegt. Ich brauche daher eigene Aufnahmen. Am besten
wirken:

- Sie und Ihr Team bei der Arbeit
- Fertige Anlagen, auf die Sie stolz sind (Photovoltaik, Verteiler, Beleuchtung)
- Der Teleskoplader im Einsatz
- Ihre Werkstatt und das Betriebsgebäude

Handyfotos genügen völlig, solange es hell ist. Lieber zu viele als zu wenige —
ich suche die passenden dann aus.

**9. Größe des Betriebs**
Auf Ihrer alten Seite stand: ein Obermonteur, ein Monteur, ein Meister und drei
Aushilfskräfte. Da die Angabe schon älter ist, habe ich sie vorerst
weggelassen. Wie sieht es heute aus — und möchten Sie das überhaupt auf der
Seite stehen haben?

**10. Zwei Leistungen, die Sie zu bescheiden darstellen**
Beim Lesen Ihrer alten Seite sind mir zwei Dinge aufgefallen:

- Ihr **Elektrohandel** — dass man bei Ihnen angebrochene Verpackungen
  zurückgeben kann und der Großhändler direkt zum Kunden liefert, bietet weder
  der Baumarkt noch ein Internetshop.
- Ihre **Teleskopladerarbeiten** als eigenständige Dienstleistung, auch für
  Dachdecker und Sanierungen.

Beides steht momentan nur nebenbei. Sollen die beiden einen eigenen Platz auf
der Seite bekommen?

**11. Eine Verlinkung auf Ihrer alten Seite**
Im Begrüßungstext Ihrer bisherigen Startseite ist ein Wort mit der Website
eines anderen Elektrobetriebs verlinkt (elektro-demel.de). Ist das eine
gewollte Partnerschaft, oder war Ihnen das nicht bekannt? Falls Letzteres,
wäre das ein weiteres Anzeichen dafür, dass an der alten Seite von außen etwas
verändert wurde.

**12. Google-Bewertungen**
Auf der Seite wird Ihre Google-Bewertung angezeigt. Ich habe dort einen
Schätzwert stehen — schauen Sie bitte kurz in Ihrem Google-Unternehmensprofil
nach, wie viele Bewertungen Sie inzwischen haben.

---

Wenn etwas unklar ist, rufen Sie mich einfach an — das meiste erklärt sich in
zwei Minuten am Telefon leichter als per E-Mail.

Viele Grüße

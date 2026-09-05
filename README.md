# Elektro Hofmann — Website

Website für Elektro Hofmann (Florian Hofmann Elektrotechnik) in
Wonneberg-Greinachtal.

Next.js 16 (App Router), TypeScript, Tailwind CSS 4, Keystatic als
Redaktionssystem. Schriften sind selbst gehostet (kein Nachladen von
Google Fonts), CI-Farben stammen aus dem Firmenlogo.

## Aufbau

| Route | Was |
| --- | --- |
| `/` | **Die Website.** Gestaltungsentwurf B, Inhalte aus dem Redaktionssystem. |
| `/impressum`, `/datenschutz` | Rechtsseiten, ebenfalls im Live-Design |
| `/keystatic` | Redaktionssystem — hier pflegt der Kunde Texte und Bilder |
| `/variante-a`, `/variante-c` | Archivierte Entwürfe, `noindex` |
| `/designs` | Vergleichsseite der drei Entwürfe, `noindex` |

Die Entwürfe A und C bleiben auf Kundenwunsch erhalten. Sie beziehen ihre
Inhalte weiterhin aus `data/business.ts` und sind vom Redaktionssystem
abgekoppelt — Änderungen im Editor wirken sich nur auf die Live-Seite aus.

## Inhalte pflegen

Alles unter `/keystatic`. Gespeichert wird als JSON unter `content/`,
Bilder landen in `public/images/`.

- **Lokal** (`npm run dev`): Der Editor schreibt direkt auf die Festplatte.
- **Live**: Der Editor läuft über GitHub. Jede Änderung wird zu einem
  Commit, der automatisch einen neuen Build auslöst — nach rund einer
  Minute ist sie online.

Die Umschaltung passiert automatisch, sobald die drei GitHub-Zugangsdaten
als Umgebungsvariablen gesetzt sind (siehe `.env.example`). Fehlen sie in
der Live-Umgebung, weist der Build in den Logs darauf hin.

### Wo welcher Inhalt liegt

| Editor | Datei |
| --- | --- |
| Betriebsdaten | `content/betrieb.json` |
| Kopfbereich, In Zahlen, Leistungen, Ablauf, Der Betrieb, Kontakt | `content/startseite/*.json` |
| Referenzen (angelegt, noch nicht eingebaut) | `content/referenzen/*` |

Die Kennzahlen unter „In Zahlen" lassen sich im Editor wahlweise fest
eintragen oder automatisch berechnen (Jahre seit 1991 bzw. 2005, Anzahl
der Leistungen) — so veraltet die Seite nicht beim Jahreswechsel.

## Lokal starten

```bash
npm install
npm run dev
```

Website: http://localhost:3000 · Editor: http://localhost:3000/keystatic

## Betrieb

Gehostet bei **Cloudflare Workers**, gebaut über
[`@opennextjs/cloudflare`](https://opennext.js.org/cloudflare). Die Domain
zieht von Strato zu Cloudflare, DNS und Registrierung liegen dann am selben
Ort.

```bash
npm run preview   # baut den Worker und startet ihn lokal (workerd)
npm run deploy    # baut und veröffentlicht von Hand
```

Im Normalbetrieb wird nichts von Hand veröffentlicht: `.github/workflows/deploy.yml`
baut bei jedem Push auf `main` und lädt hoch. Das schließt die Änderungen des
Kunden ein — sein „Save" im Editor ist ein Commit, und der löst den Workflow aus.
Nötig sind dafür zwei Repository-Secrets (`CLOUDFLARE_API_TOKEN`,
`CLOUDFLARE_ACCOUNT_ID`) und zwei Variables (`NEXT_PUBLIC_SITE_URL`,
`NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG`); die Datei nennt sie im Kopf.

⚠️ `npm run build` allein erzeugt **keinen** Worker, und
`opennextjs-cloudflare preview` baut **nicht** — es startet nur das zuletzt
Gebaute. Beides gehört zusammen; die Skripte oben tun das bereits.

Das Kontaktformular läuft über eine eigene Route (`app/api/anfrage/route.ts`),
die per **Resend** an die Adresse aus den Betriebsdaten schickt. Nötig dafür:
`RESEND_API_KEY` in den Umgebungsvariablen und die Absenderdomain bei Resend
verifiziert. Siehe `.env.example`.

Das Redaktionssystem läuft über **GitHub-Storage**: Das Repository bleibt bei
`KingB94`, der Kunde ist seit dem 04.09.2026 als **Collaborator** eingetragen
und meldet sich unter `/keystatic` mit seinem GitHub-Konto an. Sein Speichern
wird zu einem Commit, Cloudflare baut daraufhin neu. Deshalb steht in
`keystatic.config.ts` unser Konto als `owner` — das ist so gewollt.

Vor dem Live-Schalten: **`LAUNCH.md` durchgehen.** Dort stehen die offenen
Punkte, die Zugangsdaten und die inhaltlichen Angaben, die der Kunde noch
bestätigen muss.

## Tech-Stack

- [Next.js 16](https://nextjs.org) (App Router, React 19)
- [Keystatic](https://keystatic.com) (Redaktionssystem, Git-basiert)
- [Tailwind CSS 4](https://tailwindcss.com)
- [Archivo](https://fonts.google.com/specimen/Archivo),
  [Source Sans 3](https://fonts.google.com/specimen/Source+Sans+3),
  [Roboto Mono](https://fonts.google.com/specimen/Roboto+Mono),
  [Fraunces](https://fonts.google.com/specimen/Fraunces) (nur Entwurf C)
  via [Fontsource](https://fontsource.org) — selbst gehostet, DSGVO-freundlich
- [lucide-react](https://lucide.dev) für Symbole
- [GSAP](https://gsap.com) + ScrollTrigger für den gestapelten Ablauf-Abschnitt

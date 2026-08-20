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

Gehostet bei **Netlify** (kostenloser Starter-Plan, kommerzielle Nutzung
erlaubt). Die Domain liegt bei Strato und zeigt per DNS auf Netlify.

Das Kontaktformular läuft über **Netlify Forms**. Damit Netlify die Felder
erkennt, liegt in `public/__forms.html` eine schlichte Kopie des Formulars
— Feldnamen dort und in `components/variants/VariantContactForm.tsx`
müssen übereinstimmen.

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

# Elektro Hofmann — Landingpage

Moderne Next.js-Landingpage für Elektro Hofmann (Florian Hofmann
Elektrotechnik) in Wonneberg-Greinachtal.

Gebaut mit Next.js 16 (App Router), TypeScript, Tailwind CSS 4 und
selbst gehosteten Schriftarten (kein Nachladen von Google Fonts o. ä.).
CI-Farben (Blau/Grau/Schwarz) direkt aus dem bestehenden Firmenlogo
übernommen.

## ⚠️ Vor dem Live-Schalten unbedingt prüfen

Die Inhalte dieser Seite stammen größtenteils direkt von der alten,
archivierten Firmenwebsite (elektrohofmann.info) sowie aus
Branchenverzeichnissen — das ist deutlich zuverlässiger als reine
Verzeichnis-Daten, aber die alte Seite ist von ca. 2014 und einiges
kann sich seither geändert haben:

- **`data/business.ts`**:
  - Öffnungszeiten (aus einem Branchenverzeichnis, bitte bestätigen)
  - Anzahl Google-Bewertungen (aktuell „4" — bitte prüfen)
  - Team-/Betriebsgröße wird in der Über-uns-Sektion bewusst nicht mit
    exakten Zahlen genannt, da die alte Quelle von ca. 2014 stammt
- **`app/impressum/page.tsx`**: USt-ID, Berufsbezeichnung und
  Handwerkskammer stammen aus dem alten Impressum — bitte gegenprüfen,
  da sich Rechtsform oder Angaben seither geändert haben könnten. Dies
  ist keine Rechtsberatung — im Zweifel bitte von einem Steuerberater
  oder Anwalt prüfen lassen.
- Das Bild `public/images/gewerbehalle.jpg` zeigt vermutlich ein
  Referenzprojekt (nicht das eigene Betriebsgelände) — Bildunterschrift
  in `components/About.tsx` bei Bedarf anpassen.

## Lokal starten

```bash
npm install
npm run dev
```

Seite öffnet sich unter http://localhost:3000

## Inhalte bearbeiten

Fast alle Texte, Zahlen und Links liegen zentral in **`data/business.ts`** —
Adresse, Telefonnummern, Öffnungszeiten, Leistungen, Firmen-Zeitleiste.
Änderungen dort wirken sich automatisch auf die ganze Seite aus.

Bilder liegen in **`public/images/`** — einfach eine Datei ersetzen (gleicher
Dateiname) oder in den Komponenten auf einen neuen Dateinamen verweisen.

## Deployment (GitHub + Vercel)

1. Neues Repository auf GitHub anlegen und dieses Projekt hochladen (`git push`)
2. Auf [vercel.com](https://vercel.com) mit GitHub einloggen → „Add New Project" →
   das Repository auswählen → „Deploy" (keine Konfiguration nötig, Vercel
   erkennt Next.js automatisch)
3. Nach dem Deploy erhalten Sie einen Link wie
   `https://elektro-hofmann.vercel.app`, den Sie z. B. an Kundschaft
   weitergeben können

## Tech-Stack

- [Next.js 16](https://nextjs.org) (App Router, React 19)
- [Tailwind CSS 4](https://tailwindcss.com)
- [Archivo](https://fonts.google.com/specimen/Archivo),
  [Source Sans 3](https://fonts.google.com/specimen/Source+Sans+3),
  [Roboto Mono](https://fonts.google.com/specimen/Roboto+Mono) via
  [Fontsource](https://fontsource.org) (self-hosted, DSGVO-freundlich)
- [lucide-react](https://lucide.dev) für UI-Icons

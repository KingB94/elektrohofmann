import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { business } from "@/data/business";

export const metadata: Metadata = {
  title: "Entwürfe zur Auswahl",
  robots: { index: false, follow: false },
};

const variants = [
  {
    href: "/",
    label: "A",
    name: "Hell & Sachlich",
    tagline: "Die aktuelle Fassung",
    body: "Heller Hintergrund, Firmenblau aus dem Logo, klares Raster. Ruhig, gut lesbar und schnell erfassbar — die Version, die schon steht.",
    points: ["Blau/Grau aus dem Logo", "Leistungen als Kachelraster", "Kompakte Startseite"],
    swatches: ["#faf9f7", "#066eb5", "#0b1d2c"],
    frame: "border-paper-line bg-paper",
    text: "text-ink",
    muted: "text-ink/60",
    accent: "text-blue-deep",
  },
  {
    href: "/variante-b",
    label: "B",
    name: "Hell & Premium",
    tagline: "Neuer Entwurf",
    body: "Hell und luftig, das Luftbild bildschirmfüllend, große Typografie und Bewegung beim Scrollen. Ausschließlich die Logofarben Blau, Grau und Schwarz auf Weiß — wirkt hochwertig, ohne technisch-kühl zu werden.",
    points: [
      "Vollbild-Hero mit Luftbild",
      "Kennzahlen zählen beim Scrollen hoch",
      "Ablauf in drei gestapelten Karten",
    ],
    swatches: ["#ffffff", "#066eb5", "#21201c"],
    frame: "border-frost-line bg-frost",
    text: "text-carbon",
    muted: "text-carbon/60",
    accent: "text-blue",
  },
  {
    href: "/variante-c",
    label: "C",
    name: "Warm & Handwerklich",
    tagline: "Neuer Entwurf",
    body: "Warmes Papierweiß, Serifenschrift, Kupfer als Akzent. Erinnert eher an einen gedruckten Firmenprospekt als an eine Technikseite — bodenständig, persönlich, regional.",
    points: [
      "Zweigeteilter Einstieg mit Bild",
      "Leistungen als nummerierte Liste",
      "Chronik als waagrechte Zeitleiste",
    ],
    swatches: ["#f7f3ea", "#b0631b", "#1a1712"],
    frame: "border-bone-line bg-bone",
    text: "text-soot",
    muted: "text-soot/60",
    accent: "text-copper",
  },
];

export default function DesignsPage() {
  return (
    <div className="min-h-full bg-paper-raised">
      <div className="mx-auto max-w-6xl px-6 py-16 lg:px-10 lg:py-24">
        <header className="max-w-2xl">
          <span className="plate-badge text-blue-deep">Zur Auswahl</span>
          <h1 className="mt-6 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-5xl">
            Drei Entwürfe für {business.name}.
          </h1>
          <p className="mt-5 text-[1.05rem] leading-relaxed text-ink/70">
            Alle drei zeigen dieselben Inhalte, dieselben Bilder und dieselben
            Kontaktdaten — sie unterscheiden sich nur in Gestaltung, Aufbau und
            Wirkung. Schauen Sie sich in Ruhe alle drei an; unten auf jeder
            Seite können Sie direkt umschalten.
          </p>
        </header>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {variants.map((v) => (
            <Link
              key={v.href}
              href={v.href}
              className={`group flex flex-col overflow-hidden rounded-sm border transition-transform duration-300 hover:-translate-y-1.5 ${v.frame}`}
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src="/images/betriebsgelaende-luftbild.jpg"
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 92vw, 360px"
                  className="object-cover opacity-45 transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span
                    className={`font-display text-7xl font-extrabold tracking-tight ${v.text}`}
                  >
                    {v.label}
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 flex gap-1.5">
                  {v.swatches.map((s) => (
                    <span
                      key={s}
                      className="h-4 w-4 rounded-full border border-white/25"
                      style={{ background: s }}
                    />
                  ))}
                </div>
              </div>

              <div className="flex flex-1 flex-col p-7">
                <span
                  className={`font-mono text-[0.62rem] uppercase tracking-[0.16em] ${v.accent}`}
                >
                  {v.tagline}
                </span>
                <h2 className={`mt-3 font-display text-2xl font-bold ${v.text}`}>{v.name}</h2>
                <p className={`mt-4 flex-1 text-[0.92rem] leading-relaxed ${v.muted}`}>{v.body}</p>

                <ul className={`mt-6 space-y-2 text-[0.84rem] ${v.muted}`}>
                  {v.points.map((p) => (
                    <li key={p} className="flex gap-2.5">
                      <span className={`mt-2 h-1 w-1 shrink-0 rounded-full ${v.accent} bg-current`} />
                      {p}
                    </li>
                  ))}
                </ul>

                <span
                  className={`mt-8 inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.12em] ${v.accent}`}
                >
                  Ansehen
                  <ArrowUpRight
                    size={14}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <p className="mt-14 max-w-2xl text-sm leading-relaxed text-ink/55">
          Rückmeldungen gerne ganz konkret: Welche der drei kommt Ihnen am
          nächsten, und was daran würden Sie anders wollen? Einzelne Teile
          lassen sich auch mischen — etwa der Einstieg aus B mit der
          Leistungsliste aus C.
        </p>
      </div>
    </div>
  );
}

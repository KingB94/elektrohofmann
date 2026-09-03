"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";

const tones = {
  light: {
    shell: "bg-frost-sunk text-carbon hover:bg-frost-line",
    icon: "text-blue",
    note: "text-carbon/55",
  },
  warm: {
    shell: "bg-bone-raised text-soot hover:bg-bone",
    icon: "text-copper",
    note: "text-soot/55",
  },
} as const;

// Karte wird erst auf Klick geladen, damit ohne Zutun der Besucherinnen
// und Besucher keine Verbindung zu Google aufgebaut wird.
export default function VariantMap({
  lat,
  lng,
  title,
  query,
  tone = "light",
}: {
  lat: number;
  lng: number;
  title: string;
  /**
   * Firmenname und Anschrift. Google beschriftet den Pin damit und zeigt
   * den Kasten mit der Adresse. Fehlt die Angabe, bleibt es bei den
   * Koordinaten — dann setzt Google nur eine namenlose Nadel.
   */
  query?: string;
  tone?: keyof typeof tones;
}) {
  const t = tones[tone];
  const [loaded, setLoaded] = useState(false);
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    query ?? `${lat},${lng}`
  )}&z=15&output=embed`;

  if (loaded) {
    return (
      <iframe
        src={mapSrc}
        title={title}
        className="absolute inset-0 h-full w-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setLoaded(true)}
      className={`absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center transition-colors ${t.shell}`}
    >
      <MapPin className={`h-6 w-6 ${t.icon}`} strokeWidth={1.5} />
      <span className="font-mono text-[0.68rem] uppercase tracking-[0.12em]">Karte laden</span>
      <span className={`max-w-xs text-xs leading-relaxed ${t.note}`}>
        Beim Laden wird eine Verbindung zu Google Maps hergestellt. Es gelten
        die Datenschutzbestimmungen von Google.
      </span>
    </button>
  );
}

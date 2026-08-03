"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";

export default function MapEmbed({ lat, lng, title }: { lat: number; lng: number; title: string }) {
  const [loaded, setLoaded] = useState(false);
  const mapSrc = `https://www.google.com/maps?q=${lat},${lng}&z=15&output=embed`;

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
      className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-night-raised px-6 text-center text-paper transition-colors hover:bg-night"
    >
      <MapPin className="h-6 w-6 text-blue" strokeWidth={1.5} />
      <span className="font-mono text-xs uppercase tracking-[0.08em]">Karte laden</span>
      <span className="max-w-xs text-xs leading-relaxed text-paper/55">
        Beim Laden wird eine Verbindung zu Google Maps hergestellt. Es gelten die
        Datenschutzbestimmungen von Google.
      </span>
    </button>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";

// Kleine Leiste zum Umschalten zwischen den drei Entwürfen. Liegt nur
// auf den archivierten Entwürfen A und C, nicht auf der öffentlichen
// Seite — Entwurf B ist inzwischen die Startseite.
const versions = [
  { href: "/variante-a", key: "a", label: "A", name: "Hell & Sachlich" },
  { href: "/", key: "b", label: "B", name: "Hell & Premium" },
  { href: "/variante-c", key: "c", label: "C", name: "Warm & Handwerklich" },
];

export default function VariantSwitcher({ current }: { current: "a" | "b" | "c" }) {
  const [hidden, setHidden] = useState(false);
  if (hidden) return null;

  return (
    <div className="fixed inset-x-0 bottom-4 z-[60] flex justify-center px-4 print:hidden">
      <div className="flex items-center gap-1 rounded-full border border-white/15 bg-black/85 p-1.5 shadow-2xl shadow-black/50 backdrop-blur-xl">
        <span className="hidden pl-3 pr-1 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-white/45 sm:inline">
          Entwurf
        </span>
        {versions.map((v) => {
          const active = v.key === current;
          return (
            <Link
              key={v.key}
              href={v.href}
              title={v.name}
              aria-current={active ? "page" : undefined}
              className={`flex items-center gap-2 rounded-full px-3.5 py-2 font-mono text-[0.66rem] uppercase tracking-[0.1em] transition-colors ${
                active ? "bg-white text-black" : "text-white/65 hover:bg-white/10 hover:text-white"
              }`}
            >
              <span className="font-bold">{v.label}</span>
              <span className="hidden sm:inline">{v.name}</span>
            </Link>
          );
        })}
        <button
          type="button"
          onClick={() => setHidden(true)}
          aria-label="Umschalter ausblenden"
          className="ml-0.5 rounded-full p-2 text-white/40 transition-colors hover:bg-white/10 hover:text-white"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}

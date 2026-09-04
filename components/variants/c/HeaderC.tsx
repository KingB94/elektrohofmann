"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone, Menu, X } from "lucide-react";
import { business } from "@/data/business";

const navLinks = [
  { href: "#leistungen", label: "Leistungen" },
  { href: "#werkstatt", label: "Werkstatt" },
  { href: "#chronik", label: "Chronik" },
  { href: "#kontakt", label: "Kontakt" },
];

export default function HeaderC() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-bone-line bg-bone/95 backdrop-blur">
      {/* Schmale Kopfzeile im Stil eines Briefkopfs */}
      <div className="hidden border-b border-bone-line bg-bone-raised md:block">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-2 lg:px-10">
          <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-soot/50">
            {business.address.full} · Chiemgau
          </span>
          <span className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-soot/50">
            {business.hours[0].days} · {business.hours[0].time}
          </span>
        </div>
      </div>

      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4 lg:px-10">
        <Link href="/variante-c" className="flex items-center gap-4" onClick={() => setOpen(false)}>
          <Image
            src="/images/logo.png"
            alt={business.name}
            width={260}
            height={80}
            className="h-11 w-auto object-contain"
            priority
          />
          <span className="hidden border-l border-bone-line pl-4 font-serif text-sm italic text-soot/60 lg:block">
            seit 2005
          </span>
        </Link>

        <nav className="hidden items-center gap-9 md:flex">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="border-b border-transparent pb-0.5 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-soot/70 transition-colors hover:border-copper hover:text-copper"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={business.phoneHref}
            className="hidden items-center gap-2 rounded-sm bg-soot px-5 py-3 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-bone transition-colors hover:bg-copper md:inline-flex"
          >
            <Phone size={13} strokeWidth={2.2} />
            {business.phoneDisplay}
          </a>
          <button
            className="text-soot md:hidden"
            aria-label={open ? "Menü schließen" : "Menü öffnen"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-bone-line bg-bone px-6 pb-8 pt-2 md:hidden">
          <nav className="flex flex-col divide-y divide-bone-line">
            {navLinks.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex items-baseline gap-4 py-4"
              >
                <span className="font-mono text-[0.62rem] text-copper">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-serif text-2xl text-soot">{l.label}</span>
              </a>
            ))}
          </nav>
          <a
            href={business.phoneHref}
            className="mt-6 flex items-center justify-center gap-2 rounded-sm bg-soot px-5 py-4 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-bone"
          >
            <Phone size={14} strokeWidth={2.2} />
            {business.phoneDisplay}
          </a>
        </div>
      )}
    </header>
  );
}

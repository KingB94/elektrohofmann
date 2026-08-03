"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone, Menu, X } from "lucide-react";
import { business } from "@/data/business";

const navLinks = [
  { href: "/#leistungen", label: "Leistungen" },
  { href: "/#ueber-uns", label: "Über uns" },
  { href: "/#kontakt", label: "Kontakt" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-night/95 backdrop-blur border-b border-night-line" : "bg-night"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 md:px-8">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <div className="flex h-10 items-center rounded-sm bg-white px-2 md:h-11">
            <Image
              src="/images/logo.png"
              alt={business.name}
              width={140}
              height={87}
              className="h-7 w-auto object-contain md:h-8"
              priority
            />
          </div>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-mono text-xs uppercase tracking-[0.12em] text-paper/80 transition-colors hover:text-blue"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <a
            href={business.phoneHref}
            className="inline-flex items-center gap-2 rounded-sm bg-blue px-5 py-2.5 font-mono text-xs uppercase tracking-[0.1em] text-white transition-colors hover:bg-blue-deep"
          >
            <Phone size={14} strokeWidth={2} />
            {business.phoneDisplay}
          </a>
        </div>

        <button
          className="text-paper md:hidden"
          aria-label={open ? "Menü schließen" : "Menü öffnen"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {open && (
        <div className="border-t border-night-line bg-night px-5 pb-6 pt-2 md:hidden">
          <nav className="flex flex-col gap-4 pt-4">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-mono text-sm uppercase tracking-[0.1em] text-paper/85"
              >
                {l.label}
              </a>
            ))}
            <a
              href={business.phoneHref}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-sm bg-blue px-5 py-3 font-mono text-xs uppercase tracking-[0.1em] text-white"
            >
              <Phone size={14} strokeWidth={2} />
              {business.phoneDisplay}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

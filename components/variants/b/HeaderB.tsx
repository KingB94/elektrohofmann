"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone, Menu, X, ArrowUpRight } from "lucide-react";
import type { Betrieb } from "@/lib/inhalte";

const navLinks = [
  { href: "#leistungen", label: "Leistungen" },
  { href: "#ablauf", label: "Ablauf" },
  { href: "#betrieb", label: "Betrieb" },
  { href: "#kontakt", label: "Kontakt" },
];

export default function HeaderB({ betrieb }: { betrieb: Betrieb }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-8 md:pt-6">
        <div
          className={`mx-auto flex max-w-6xl items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500 md:px-5 ${
            scrolled
              ? "border border-frost-line bg-white/85 shadow-xl shadow-carbon/5 backdrop-blur-xl"
              : "border border-transparent bg-white/55 backdrop-blur-sm"
          }`}
        >
          <Link href="/variante-b" className="flex items-center" onClick={() => setOpen(false)}>
            <Image
              src="/images/logo.png"
              alt={betrieb.name}
              width={140}
              height={87}
              className="h-6 w-auto object-contain md:h-7"
              priority
            />
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-carbon/65 transition-colors hover:text-blue"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={betrieb.phoneHref}
              className="hidden items-center gap-2 rounded-full bg-blue px-5 py-2.5 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-white transition-transform duration-200 hover:scale-[1.04] md:inline-flex"
            >
              <Phone size={13} strokeWidth={2.4} />
              {betrieb.phoneDisplay}
            </a>
            <button
              className="rounded-full border border-frost-line bg-white/80 p-2 text-carbon backdrop-blur md:hidden"
              aria-label={open ? "Menü schließen" : "Menü öffnen"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-40 bg-frost-base/97 px-6 pb-10 pt-28 backdrop-blur-xl md:hidden">
          <nav className="flex flex-col divide-y divide-frost-line border-y border-frost-line">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between py-5 font-display text-2xl font-bold text-carbon"
              >
                {l.label}
                <ArrowUpRight size={20} className="text-blue" />
              </a>
            ))}
          </nav>
          <a
            href={betrieb.phoneHref}
            className="mt-8 flex items-center justify-center gap-2 rounded-full bg-blue px-6 py-4 font-mono text-xs uppercase tracking-[0.12em] text-white"
          >
            <Phone size={15} strokeWidth={2.4} />
            {betrieb.phoneDisplay}
          </a>
        </div>
      )}
    </>
  );
}

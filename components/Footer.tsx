import Image from "next/image";
import Link from "next/link";
import { business } from "@/data/business";
import EnergyArrow from "@/components/EnergyArrow";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden border-t border-night-line bg-night text-paper">
      <EnergyArrow className="pointer-events-none absolute -bottom-10 -left-10 w-[300px] opacity-[0.08]" />
      <div className="relative mx-auto max-w-6xl px-5 py-14 md:px-8">
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <div className="inline-flex items-center rounded-sm bg-white px-2 py-1.5">
              <Image src="/images/logo.png" alt={business.name} width={260} height={80} className="h-10 w-auto object-contain" />
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-paper/60">
              {business.legalSuffix} in {business.address.city} — Elektroinstallation,
              Photovoltaik und Gerätereparatur seit {business.founded.split(" ").pop()}.
            </p>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-[0.1em] text-paper/45">Navigation</p>
            <nav className="mt-4 flex flex-col gap-2.5 text-sm">
              <Link href="/#leistungen" className="text-paper/75 hover:text-blue">Leistungen</Link>
              <Link href="/#ueber-uns" className="text-paper/75 hover:text-blue">Über uns</Link>
              <Link href="/#kontakt" className="text-paper/75 hover:text-blue">Kontakt</Link>
            </nav>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-[0.1em] text-paper/45">Kontakt</p>
            <div className="mt-4 flex flex-col gap-2.5 text-sm text-paper/75">
              <span>{business.address.full}</span>
              <a href={business.phoneHref} className="hover:text-blue">{business.phoneDisplay}</a>
              <a href={`mailto:${business.email}`} className="hover:text-blue">{business.email}</a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-night-line pt-6 text-xs text-paper/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {business.name}. Alle Rechte vorbehalten.</p>
          <div className="flex gap-5">
            <Link href="/impressum" className="hover:text-blue">Impressum</Link>
            <Link href="/datenschutz" className="hover:text-blue">Datenschutz</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

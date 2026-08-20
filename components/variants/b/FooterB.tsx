import Image from "next/image";
import Link from "next/link";
import type { Betrieb } from "@/lib/inhalte";

const links = [
  { href: "#leistungen", label: "Leistungen" },
  { href: "#ablauf", label: "Ablauf" },
  { href: "#betrieb", label: "Betrieb" },
  { href: "#kontakt", label: "Kontakt" },
];

export default function FooterB({ betrieb }: { betrieb: Betrieb }) {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-frost-line bg-frost-base">
      <div className="grid-bg absolute inset-0 opacity-30" />

      <div className="relative mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20">
        {/* Großer Namenszug als Abschluss */}
        <p className="font-display text-[15vw] font-extrabold leading-[0.82] tracking-[-0.045em] text-carbon/[0.055] md:text-[10rem]">
          Elektro Hofmann
        </p>

        <div className="mt-14 grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Image
              src="/images/logo.png"
              alt={betrieb.name}
              width={130}
              height={80}
              className="h-7 w-auto object-contain"
            />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-carbon/55">
              {betrieb.legalSuffix} in {betrieb.address.city}. Elektroinstallation,
              Photovoltaik und Gerätereparatur im Chiemgau seit 2005.
            </p>
            <div className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-frost-line px-4 py-2">
              <span className="h-1.5 w-1.5 rounded-full bg-blue text-blue ring-pulse" />
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-carbon/60">
                Mo – Fr erreichbar
              </span>
            </div>
          </div>

          <div>
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-carbon/40">
              Seite
            </p>
            <nav className="mt-5 flex flex-col gap-3 text-sm">
              {links.map((l) => (
                <a key={l.href} href={l.href} className="text-carbon/65 transition-colors hover:text-blue">
                  {l.label}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-carbon/40">
              Kontakt
            </p>
            <div className="mt-5 flex flex-col gap-3 text-sm text-carbon/65">
              <span>{betrieb.address.full}</span>
              <a href={betrieb.phoneHref} className="transition-colors hover:text-blue">
                {betrieb.phoneDisplay}
              </a>
              <a href={betrieb.mobileHref} className="transition-colors hover:text-blue">
                {betrieb.mobileDisplay}
              </a>
              <a
                href={`mailto:${betrieb.email}`}
                className="break-all transition-colors hover:text-blue"
              >
                {betrieb.email}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-frost-line pt-7 text-xs text-carbon/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {betrieb.name}. Alle Rechte vorbehalten.
          </p>
          <div className="flex gap-6">
            <Link href="/impressum" className="hover:text-blue">
              Impressum
            </Link>
            <Link href="/datenschutz" className="hover:text-blue">
              Datenschutz
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

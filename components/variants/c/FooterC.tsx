import Image from "next/image";
import Link from "next/link";
import { business } from "@/data/business";

const links = [
  { href: "#leistungen", label: "Leistungen" },
  { href: "#werkstatt", label: "Werkstatt" },
  { href: "#chronik", label: "Chronik" },
  { href: "#kontakt", label: "Kontakt" },
];

export default function FooterC() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-bone-line bg-bone">
      <div className="mx-auto max-w-6xl px-6 py-16 lg:px-10">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Image
              src="/images/logo.png"
              alt={business.name}
              width={150}
              height={93}
              className="h-9 w-auto object-contain"
            />
            <p className="mt-6 max-w-xs font-serif text-lg italic leading-relaxed text-soot/70">
              {business.claim}
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-soot/55">
              {business.legalSuffix} in {business.address.city}, im Chiemgau
              zwischen Traunstein und Waginger See.
            </p>
          </div>

          <div>
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-soot/40">
              Seite
            </p>
            <nav className="mt-5 flex flex-col gap-3 text-sm">
              {links.map((l) => (
                <a key={l.href} href={l.href} className="text-soot/70 transition-colors hover:text-copper">
                  {l.label}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.16em] text-soot/40">
              Kontakt
            </p>
            <div className="mt-5 flex flex-col gap-3 text-sm text-soot/70">
              <span>{business.address.full}</span>
              <a href={business.phoneHref} className="transition-colors hover:text-copper">
                {business.phoneDisplay}
              </a>
              <a href={business.mobileHref} className="transition-colors hover:text-copper">
                {business.mobileDisplay}
              </a>
              <a
                href={`mailto:${business.email}`}
                className="break-all transition-colors hover:text-copper"
              >
                {business.email}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-bone-line pt-7 text-xs text-soot/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {business.name}. Alle Rechte vorbehalten.
          </p>
          <div className="flex gap-6">
            <Link href="/impressum" className="hover:text-copper">
              Impressum
            </Link>
            <Link href="/datenschutz" className="hover:text-copper">
              Datenschutz
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

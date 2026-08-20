import Link from "next/link";
import { Phone } from "lucide-react";
import HeaderB from "@/components/variants/b/HeaderB";
import FooterB from "@/components/variants/b/FooterB";
import EnergyArrow from "@/components/EnergyArrow";
import { getBetrieb } from "@/lib/inhalte";

// Die 404-Seite liegt außerhalb der Routengruppen und bringt den
// Rahmen der Live-Seite deshalb selbst mit.
export default async function NotFound() {
  const betrieb = await getBetrieb();

  return (
    <div className="flex min-h-full flex-col bg-frost text-carbon">
      <HeaderB betrieb={betrieb} />

      <main className="relative flex flex-1 flex-col items-center justify-center overflow-hidden bg-frost-base px-5 pb-24 pt-40 text-center">
        <div className="grid-bg absolute inset-0 opacity-40" />
        <EnergyArrow className="pointer-events-none absolute left-1/2 top-1/2 w-[60%] max-w-[420px] -translate-x-1/2 -translate-y-1/2 opacity-[0.06]" />

        <div className="relative">
          <span className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-blue">
            404
          </span>
          <h1 className="mt-5 font-display text-4xl font-extrabold tracking-[-0.03em] text-carbon sm:text-6xl">
            Hier ist die Leitung unterbrochen.
          </h1>
          <p className="mx-auto mt-5 max-w-md text-[1.02rem] leading-relaxed text-carbon/65">
            Die gesuchte Seite gibt es nicht (mehr). Zurück zur Startseite von{" "}
            {betrieb.name} — oder rufen Sie uns direkt an.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 rounded-full bg-blue px-7 py-4 font-mono text-[0.75rem] uppercase tracking-[0.12em] text-white shadow-lg shadow-blue/20 transition-transform duration-200 hover:scale-[1.03]"
            >
              Zur Startseite
            </Link>
            <a
              href={betrieb.phoneHref}
              className="inline-flex items-center gap-2.5 rounded-full border border-carbon/20 bg-white/70 px-7 py-4 font-mono text-[0.75rem] uppercase tracking-[0.12em] text-carbon backdrop-blur transition-colors hover:border-blue hover:text-blue-deep"
            >
              <Phone size={15} strokeWidth={2.4} />
              {betrieb.phoneDisplay}
            </a>
          </div>
        </div>
      </main>

      <FooterB betrieb={betrieb} />
    </div>
  );
}

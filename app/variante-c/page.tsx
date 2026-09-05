import type { Metadata } from "next";

// Archivierter Entwurf: bleibt für den Kunden erreichbar, gehört
// aber nicht in den Suchindex. Stand bis zum Umzug als
// X-Robots-Tag-Kopfzeile in netlify.toml.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

import HeroC from "@/components/variants/c/HeroC";
import LeistungenC from "@/components/variants/c/LeistungenC";
import WerkstattC from "@/components/variants/c/WerkstattC";
import ChronikC from "@/components/variants/c/ChronikC";
import KontaktC from "@/components/variants/c/KontaktC";

export default function VarianteC() {
  return (
    <>
      <HeroC />
      <LeistungenC />
      <WerkstattC />
      <ChronikC />
      <KontaktC />
    </>
  );
}

import type { Metadata } from "next";

// Archivierter Entwurf: bleibt für den Kunden erreichbar, gehört
// aber nicht in den Suchindex. Stand bis zum Umzug als
// X-Robots-Tag-Kopfzeile in netlify.toml.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <About />
      <Contact />
    </>
  );
}

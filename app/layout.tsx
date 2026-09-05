import type { Metadata } from "next";
import "./globals.css";
import { getBetrieb, getHero } from "@/lib/inhalte";
import { siteUrl } from "@/lib/site";
import SmoothAnchors from "@/components/SmoothAnchors";

export async function generateMetadata(): Promise<Metadata> {
  const betrieb = await getBetrieb();
  const beschreibung =
    "Elektro Hofmann: Elektroinstallation, Photovoltaik, VDE-Prüfungen und Gerätereparatur aus Wonneberg im Chiemgau — Meisterbetrieb seit 2005.";

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: `${betrieb.name} – ${betrieb.legalSuffix}`,
      template: `%s – ${betrieb.name}`,
    },
    description: beschreibung,
    // Sagt Suchmaschinen, welche Adresse die maßgebliche ist. "./" löst
    // je Seite gegen metadataBase auf, ergibt also die www-Adresse mit
    // dem jeweiligen Pfad.
    alternates: { canonical: "./" },
    keywords: [
      "Elektriker Wonneberg",
      "Elektroinstallation Chiemgau",
      "Photovoltaik Traunstein",
      "Elektromeister Wonneberg",
      "VDE Prüfung Traunstein",
      "Elektro Hofmann",
    ],
    openGraph: {
      title: `${betrieb.name} – ${betrieb.legalSuffix}`,
      description: beschreibung,
      url: siteUrl,
      siteName: betrieb.name,
      locale: "de_DE",
      type: "website",
    },
    robots: { index: true, follow: true },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const betrieb = await getBetrieb();
  const hero = await getHero();

  // Strukturierte Daten für Google — sorgen dafür, dass Adresse,
  // Telefonnummer und Öffnungszeiten direkt in der Suche erscheinen.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Electrician",
    name: betrieb.name,
    // Das Titelbild aus dem Redaktionssystem, nicht fest verdrahtet:
    // Tauscht der Kunde es im Editor, wird die alte Datei dabei gelöscht.
    // Stünde der Dateiname hier fest, zeigte Google danach still ins Leere.
    image: `${siteUrl}${hero.bild}`,
    telephone: betrieb.phoneDisplay,
    email: betrieb.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: betrieb.address.street,
      postalCode: betrieb.address.zip,
      addressLocality: betrieb.address.city,
      addressCountry: "DE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: betrieb.geo.lat,
      longitude: betrieb.geo.lng,
    },
    foundingDate: betrieb.foundedISO,
    // Feste Zeiten, weil Google hier ein maschinenlesbares Format
    // erwartet. Ändern sich die Öffnungszeiten, bitte hier mitziehen.
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
    ],
  };

  return (
    <html lang="de" className="h-full">
      <body className="min-h-full bg-paper text-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <SmoothAnchors />
      </body>
    </html>
  );
}

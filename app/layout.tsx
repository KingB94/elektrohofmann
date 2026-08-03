import type { Metadata } from "next";
import "./globals.css";
import { business } from "@/data/business";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://elektro-hofmann.vercel.app"),
  title: {
    default: `${business.name} – ${business.legalSuffix}`,
    template: `%s – ${business.name}`,
  },
  description:
    "Elektro Hofmann: Elektroinstallation, Photovoltaik, VDE-Prüfungen und Gerätereparatur aus Wonneberg im Chiemgau — Meisterbetrieb seit 2005.",
  keywords: [
    "Elektriker Wonneberg",
    "Elektroinstallation Chiemgau",
    "Photovoltaik Traunstein",
    "Elektromeister Wonneberg",
    "VDE Prüfung Traunstein",
    "Elektro Hofmann",
  ],
  openGraph: {
    title: `${business.name} – ${business.legalSuffix}`,
    description:
      "Elektroinstallation, Photovoltaik, VDE-Prüfungen und Gerätereparatur — Meisterbetrieb seit 2005 in Wonneberg.",
    url: "https://elektro-hofmann.vercel.app",
    siteName: business.name,
    locale: "de_DE",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Electrician",
    name: business.name,
    image: "https://elektro-hofmann.vercel.app/images/betriebsgelaende-luftbild.jpg",
    telephone: business.phoneDisplay,
    email: business.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.street,
      postalCode: business.address.zip,
      addressLocality: business.address.city,
      addressCountry: "DE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: business.geo.lat,
      longitude: business.geo.lng,
    },
    foundingDate: "2005-08-15",
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
      <body className="min-h-full flex flex-col bg-paper text-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

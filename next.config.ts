import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Die alte Joomla-Seite hatte eigene Unterseiten. Deren Adressen sind
  // seit Jahren in Suchmaschinen und womöglich auf Drucksachen — sie
  // führen jetzt auf den passenden Abschnitt der einen Startseite.
  // Standen bis zum Umzug in netlify.toml.
  //
  // statusCode: 301 statt permanent: true — letzteres ergäbe einen 308.
  // Beide sind dauerhafte Weiterleitungen, aber in netlify.toml stand
  // 301, und 301 versteht jeder alte Client. Kein Grund, das beim
  // Umzug still zu ändern.
  async redirects() {
    return [
      { source: "/leistungen", destination: "/#leistungen", statusCode: 301 },
      { source: "/ueber-uns", destination: "/#betrieb", statusCode: 301 },
      { source: "/kontakt-anfahrt", destination: "/#kontakt", statusCode: 301 },
    ];
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Nur für die Entwicklung: Next liefert seine Dev-Ressourcen (HMR)
  // sonst ausschließlich an die Adresse aus, unter der der Server
  // gestartet wurde. Ruft man ihn stattdessen über 127.0.0.1 oder die
  // Adresse im Heimnetz auf, blockiert er sie — die Seite bleibt weiß,
  // ohne dass im Browser ein Fehler zu sehen wäre.
  // Die Angabe hat auf den fertigen Build keinen Einfluss.
  allowedDevOrigins: ["localhost", "127.0.0.1", "192.168.2.201"],

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
      // Die Seite hat genau eine richtige Adresse: die mit www. Ohne diese
      // Regel liefert auch die nackte Domain dieselben Seiten aus — für
      // Suchmaschinen wäre das derselbe Inhalt unter zwei Adressen.
      {
        source: "/:pfad*",
        has: [{ type: "host", value: "elektrohofmann.info" }],
        destination: "https://www.elektrohofmann.info/:pfad*",
        statusCode: 301,
      },
      { source: "/leistungen", destination: "/#leistungen", statusCode: 301 },
      { source: "/ueber-uns", destination: "/#betrieb", statusCode: 301 },
      { source: "/kontakt-anfahrt", destination: "/#kontakt", statusCode: 301 },
    ];
  },
};

export default nextConfig;

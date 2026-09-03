// ---------------------------------------------------------------
// Adresse der Website. Wird für Metadaten, sitemap.xml und
// robots.txt gebraucht.
//
// Vor dem Live-Schalten NEXT_PUBLIC_SITE_URL in den
// Umgebungsvariablen bei Netlify auf die echte Domain setzen.
// Sie lautet https://www.elektrohofmann.info (vom Kunden am
// 03.09.2026 bestätigt) — ohne Schrägstrich am Ende.
// ---------------------------------------------------------------
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://websiteelektrohofmann.netlify.app"
).replace(/\/$/, "");

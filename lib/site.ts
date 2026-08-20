// ---------------------------------------------------------------
// Adresse der Website. Wird für Metadaten, sitemap.xml und
// robots.txt gebraucht.
//
// Vor dem Live-Schalten NEXT_PUBLIC_SITE_URL in den
// Umgebungsvariablen bei Netlify auf die echte Domain setzen,
// z. B. https://www.elektrohofmann.de — ohne Schrägstrich am Ende.
// ---------------------------------------------------------------
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://elektro-hofmann.netlify.app"
).replace(/\/$/, "");

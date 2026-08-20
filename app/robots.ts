import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Die archivierten Entwürfe bleiben für den Kunden erreichbar,
      // sollen aber nicht in Suchmaschinen auftauchen. Ebenso wenig
      // das Redaktionssystem.
      disallow: ["/variante-a", "/variante-c", "/designs", "/keystatic"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}

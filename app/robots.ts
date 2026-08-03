import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Die Entwurfsseiten dienen nur der Abstimmung mit dem Kunden und
      // sollen nicht in Suchmaschinen auftauchen.
      disallow: ["/variante-b", "/variante-c", "/designs"],
    },
    sitemap: "https://elektro-hofmann.vercel.app/sitemap.xml",
  };
}

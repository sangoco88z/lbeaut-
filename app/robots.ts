import type { MetadataRoute } from "next";
import { absolute } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    // Laisser le robot consulter les pages pour qu’il puisse lire noindex en préproduction.
    rules: { userAgent: "*", allow: "/" },
    sitemap: absolute("/sitemap.xml"),
  };
}


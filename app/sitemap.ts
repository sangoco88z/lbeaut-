import type { MetadataRoute } from "next";
import { absolute } from "@/lib/site";
import { categories, informations } from "@/lib/content";
import { advicePaths } from "@/lib/beauty-advice";
import { serviceDetailPaths } from "@/src/data/service-details";

const paths = [
  "/",
  ...[...informations, ...categories].map(({ slug }) => "/" + slug),
  ...serviceDetailPaths,
  "/conseiller-beaute",
  ...advicePaths,
];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.flatMap((path) => {
    const url = absolute(path);
    return url ? [{ url }] : [];
  });
}

const configuredOrigin = process.env.NEXT_PUBLIC_SITE_URL?.trim();
const indexRequested = process.env.SITE_INDEXING_ENABLED === "true";

function readOrigin(value: string) {
  const url = new URL(value);
  if (url.protocol !== "https:" || url.username || url.password || url.port ||
      url.pathname !== "/" || url.search || url.hash) {
    throw new Error("NEXT_PUBLIC_SITE_URL doit contenir uniquement une origine HTTPS.");
  }
  return url;
}

const origin = configuredOrigin ? readOrigin(configuredOrigin) : undefined;
if (indexRequested && !origin) {
  throw new Error("SITE_INDEXING_ENABLED nécessite NEXT_PUBLIC_SITE_URL.");
}

export const publicOrigin = indexRequested ? origin : undefined;
export const noIndex = "noindex, nofollow";


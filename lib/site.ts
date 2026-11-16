import type { Metadata } from "next";
import { publicOrigin } from "./indexing";

function httpsUrl(value: string | undefined) {
  if (!value) return undefined;
  const url = new URL(value);
  if (url.protocol !== "https:" || url.username || url.password) {
    throw new Error("Une URL HTTPS sans identifiants est requise.");
  }
  return url;
}

function phone(value: string | undefined) {
  const normalized = value?.trim();
  if (normalized && !/^\+[1-9]\d{6,14}$/.test(normalized)) {
    throw new Error("Les numéros doivent être au format international E.164.");
  }
  return normalized || undefined;
}

const sms = phone(process.env.SALON_SMS);

export const site = {
  name: "L. Beauté",
  locality: "Nampty",
  postalCode: "80160",
  department: "Somme",
  street: process.env.SALON_STREET_ADDRESS?.trim() || "17 route d’Amiens",
  origin: publicOrigin,
  phone: phone(process.env.SALON_PHONE) ?? "+33788856691",
  sms,
  bookingChannels: sms ? "par téléphone, SMS ou Facebook" : "par téléphone ou via Facebook",
  facebook: httpsUrl(process.env.SALON_FACEBOOK_URL?.trim())?.href ?? "https://www.facebook.com/profile.php?id=100093795217755",
  googleVerification: publicOrigin ? process.env.GOOGLE_SITE_VERIFICATION?.trim() || undefined : undefined,
};

export function absolute(path: string) {
  if (!site.origin) return undefined;
  return path === "/" ? site.origin.origin : new URL(path, site.origin).href;
}

export function pageMetadata(title: string, description: string, path: string): Metadata {
  const url = absolute(path);
  const brandedTitle = title + " | " + site.name;
  return {
    title: { absolute: brandedTitle },
    description,
    alternates: url ? { canonical: url } : undefined,
    openGraph: {
      title: brandedTitle,
      description,
      url,
      siteName: site.name,
      locale: "fr_FR",
      type: "website",
    },
  };
}

export const salonSchema = {
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  "@id": absolute("/#institut"),
  name: site.name,
  url: absolute("/"),
  telephone: site.phone,
  sameAs: [site.facebook],
  address: {
    "@type": "PostalAddress",
    streetAddress: site.street,
    addressLocality: site.locality,
    postalCode: site.postalCode,
    addressRegion: "Hauts-de-France",
    addressCountry: "FR",
  },
};


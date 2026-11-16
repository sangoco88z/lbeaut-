import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { request } from "node:http";
import { createRequire } from "node:module";
import { setTimeout as pause } from "node:timers/promises";

const require = createRequire(import.meta.url);
// Read the same production env files as Next.js, including .env.local.
const { loadEnvConfig } = require("@next/env");
loadEnvConfig(process.cwd(), false);

const loopback = "127.0.0.1";
const port = Number(process.env.SEO_CHECK_PORT || 4319);
const origin = process.env.SITE_INDEXING_ENABLED === "true"
  ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
  : undefined;
const verification = origin && (process.env.GOOGLE_SITE_VERIFICATION?.trim() || undefined);
const street = process.env.SALON_STREET_ADDRESS?.trim() || "17 route d’Amiens";
const phone = process.env.SALON_PHONE?.trim() || "+33788856691";
const sms = process.env.SALON_SMS?.trim();
const facebook = new URL(process.env.SALON_FACEBOOK_URL?.trim() ||
  "https://www.facebook.com/profile.php?id=100093795217755").href;
const reviewsUrl = "https://www.google.com/maps/place//data=!4m4!3m3!1s0x47e79d1e66ced2d3:0xc51e03a891819b5!9m1!1b1";
const servicePaths = new Set([
  "/prestations", "/epilations", "/beaute-du-regard", "/mains-et-pieds", "/soins-du-visage", "/soins-du-corps",
]);
const detailPages = {
  "/prestations/epilation-sourcils": ["/epilations", "Sourcils", 9],
  "/prestations/epilation-jambes-entieres": ["/epilations", "Jambes entières", 26],
  "/prestations/rehaussement-cils": ["/beaute-du-regard", "Rehaussement cils", 40],
  "/prestations/manucure-express": ["/mains-et-pieds", "Manucure express", 20],
  "/prestations/vernis-semi-permanent": ["/mains-et-pieds", "Pose de vernis semi-permanent", 30],
  "/prestations/soin-visage-prestige": ["/soins-du-visage", "Soin Prestige", 55],
  "/prestations/modelage-huiles-chaudes": ["/soins-du-corps", "Parenthèse cocooning", 65],
  "/prestations/parenthese-bien-etre": ["/soins-du-corps", "Parenthèse Bien-être", 80],
};
const articlePages = new Set(["/conseils/choisir-son-soin", "/conseils/premiere-epilation", "/conseils/preparer-une-manucure"]);
const pages = ["/", ...servicePaths, "/institut", "/cartes-cadeaux", "/contact",
  ...Object.keys(detailPages), "/conseiller-beaute", "/conseils", ...articlePages];
const anchorsByPath = new Map();
const crossPageAnchors = [];
const canonicalUrl = (path) => origin && (path === "/" ? origin.origin : new URL(path, origin).href);
const noIndex = "noindex,nofollow";

const server = spawn(process.execPath, [
  require.resolve("next/dist/bin/next"), "start", "-H", loopback, "-p", String(port),
], { stdio: ["ignore", "pipe", "pipe"] });

let serverOutput = "";
server.stdout.on("data", (chunk) => { serverOutput += chunk; });
server.stderr.on("data", (chunk) => { serverOutput += chunk; });

function read(path, { host = origin?.hostname, status = 200, accept = "*/*" } = {}) {
  return new Promise((resolve, reject) => {
    const req = request({
      hostname: loopback,
      port,
      path,
      headers: { host: host || loopback + ":" + port, accept },
      signal: AbortSignal.timeout(5000),
    }, async (res) => {
      try {
        const chunks = [];
        for await (const chunk of res) chunks.push(chunk);
        assert.equal(res.statusCode, status, path);
        resolve({ headers: res.headers, body: Buffer.concat(chunks).toString("utf8") });
      } catch (error) {
        reject(error);
      }
    });
    req.on("error", reject);
    req.end();
  });
}

function attr(tag, name) {
  return tag.match(new RegExp('(?:^|\\s)' + name + '="([^"]*)"'))?.[1];
}

function values(html, tag, attribute, value, output) {
  return [...html.matchAll(new RegExp("<" + tag + "\\b[^>]*>", "gi"))]
    .filter(([markup]) => attr(markup, attribute) === value)
    .map(([markup]) => attr(markup, output));
}

function meta(head, name) {
  return values(head, "meta", "name", name, "content");
}

function links(html) {
  return [...html.matchAll(/<a\b[^>]*>/gi)]
    .map(([tag]) => attr(tag, "href")?.replaceAll("&amp;", "&"))
    .filter(Boolean);
}

function checkContactLinks(hrefs, label) {
  assert.ok(hrefs.includes("tel:" + phone), label + " lien téléphone");
  assert.ok(hrefs.includes(facebook), label + " lien Facebook");
  const smsLinks = hrefs.filter((href) => href.startsWith("sms:"));
  assert.ok(sms ? smsLinks.length === 1 && smsLinks[0] === "sms:" + sms : !smsLinks.length,
    label + " lien SMS conforme à la configuration");
}

function checkLocalLinks(body, hrefs, path) {
  const anchors = new Set([...body.matchAll(/<[a-z][^>]*>/gi)].map(([tag]) => attr(tag, "id")).filter(Boolean));
  anchorsByPath.set(path, anchors);
  for (const href of hrefs) {
    if (href.startsWith("//")) continue;
    if (href.startsWith("#")) {
      assert.ok(anchors.has(decodeURIComponent(href.slice(1))), path + " cible d’ancre absente");
    } else if (href.startsWith("/")) {
      const url = new URL(href, "https://test.example");
      assert.ok(pages.includes(url.pathname), path + " lien interne inconnu");
      if (url.hash) crossPageAnchors.push([url.pathname, decodeURIComponent(url.hash.slice(1))]);
    }
  }
}

function checkRequestLinks(hrefs, path, service) {
  assert.ok(hrefs.includes("tel:" + phone), path + " téléphone");
  if (path === "/cartes-cadeaux") {
    assert.ok(!hrefs.includes(facebook), path + " demande par téléphone ou SMS");
  }
  const smsLinks = hrefs.filter((href) => href.startsWith("sms:"));
  if (!sms) {
    assert.equal(smsLinks.length, 0, path + " SMS masqué");
    return;
  }
  const simple = "sms:" + sms;
  assert.ok(smsLinks.includes(simple), path + " SMS sans préremplissage");
  const prefill = smsLinks.find((href) => href.startsWith(simple + "?"));
  const body = prefill && new URLSearchParams(prefill.split("?")[1]).get("body");
  assert.ok(body?.includes(service), path + " SMS prérempli");
}

function normalRobots(value) {
  return String(value || "").replace(/\s+/g, "").toLowerCase();
}

function checkRobotsHeader(headers, indexable, path) {
  assert.equal(normalRobots(headers["x-robots-tag"]), indexable ? "" : noIndex, path);
}

function checkBreadcrumbs(schema, path) {
  let expected = [];
  if (origin) {
    if (path === "/prestations" || path === "/conseils") expected = ["/", path];
    else if (servicePaths.has(path)) expected = ["/", "/prestations", path];
    else if (detailPages[path]) expected = ["/", "/prestations", detailPages[path][0], path];
    else if (articlePages.has(path)) expected = ["/", "/conseils", path];
  }
  if (!expected.length) {
    assert.equal(schema, undefined, path + " BreadcrumbList inattendu");
    return;
  }
  assert.equal(schema?.["@context"], "https://schema.org", path);
  const items = schema.itemListElement;
  assert.deepEqual(items.map(({ item }) => item), expected.map(canonicalUrl), path);
  assert.deepEqual(items.map(({ position }) => position), expected.map((_, index) => index + 1), path);
  for (const item of items) {
    assert.equal(item["@type"], "ListItem", path);
    assert.ok(item.name?.trim(), path);
  }
}

const titles = new Set();
const descriptions = new Set();

async function checkPage(path) {
  const { headers, body } = await read(path);
  const head = body.match(/<head>([\s\S]*?)<\/head>/i)?.[1];
  const main = body.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1];
  assert.ok(head && main, path + " structure HTML");
  assert.match(body, /<html\b[^>]*\blang="fr"/, path);
  checkRobotsHeader(headers, Boolean(origin), path);
  assert.deepEqual(meta(head, "robots").map(normalRobots), [origin ? "index,follow" : noIndex], path);

  const title = head.match(/<title>([^<]+)<\/title>/i)?.[1];
  const descriptionTags = meta(head, "description");
  const [description] = descriptionTags;
  assert.ok(title?.trim(), path + " title");
  assert.ok(description?.trim(), path + " description");
  assert.notEqual(description?.trim(), title?.trim(), path);
  assert.equal(descriptionTags.length, 1, path);
  titles.add(title);
  descriptions.add(description);

  assert.deepEqual(values(head, "meta", "property", "og:title", "content"), [title], path);
  assert.deepEqual(values(head, "meta", "property", "og:description", "content"), [description], path);
  const expectedUrls = origin ? [canonicalUrl(path)] : [];
  assert.deepEqual(values(head, "link", "rel", "canonical", "href"), expectedUrls, path);
  assert.deepEqual(values(head, "meta", "property", "og:url", "content"), expectedUrls, path);
  const verificationTags = meta(head, "google-site-verification");
  assert.ok(path === "/" && verification
    ? verificationTags.length === 1 && verificationTags[0] === verification
    : verificationTags.length === 0, path + " configuration de vérification Google");
  assert.ok(values(head, "link", "rel", "icon", "href")
    .some((href) => href?.split("?")[0] === "/icon.svg"), path + " lien de favicon");

  const headings = [...main.matchAll(/<h([1-6])\b[^>]*>/gi)].map(([, level]) => Number(level));
  assert.equal(headings[0], 1, path + " premier titre");
  assert.equal(headings.filter((level) => level === 1).length, 1, path + " H1");
  assert.ok(headings.includes(2), path + " H2");
  assert.ok(headings.every((level, index) => index === 0 || level <= headings[index - 1] + 1), path + " ordre des titres");
  for (const [tag] of body.matchAll(/<img\b[^>]*>/gi)) {
    assert.ok(attr(tag, "alt")?.trim(), path + " alt d’image");
  }
  checkLocalLinks(body, links(body), path);
  const mobileContact = body.match(/<nav\b[^>]*\bclass="mobile-contact"[^>]*>([\s\S]*?)<\/nav>/i)?.[1];
  assert.ok(mobileContact, path + " barre mobile");
  checkContactLinks(links(mobileContact), path + " barre mobile");

  const mainLinks = links(main);
  if (path === "/" || path === "/contact") checkContactLinks(mainLinks, path);
  const detail = detailPages[path];
  if (detail) checkRequestLinks(mainLinks, path, detail[1]);
  if (path === "/cartes-cadeaux") checkRequestLinks(mainLinks, path, "carte cadeau");
  if (detail || path === "/cartes-cadeaux") {
    assert.equal(main.includes("Message à copier"), Boolean(sms), path + " repli de copie");
  }
  if (path === "/") {
    const reviews = main.match(/<section\b[^>]*\baria-labelledby="avis-google"[^>]*>([\s\S]*?)<\/section>/)?.[1];
    assert.ok(reviews && links(reviews).includes(reviewsUrl), path + " lien de la fiche Google Maps");
    assert.equal([...reviews.matchAll(/<blockquote\b[^>]*>/g)].length, 3, path + " cartes d’avis");
  }

  const internalLinks = mainLinks
    .filter((href) => href.startsWith("/") && !href.startsWith("//"))
    .map((href) => href.split(/[?#]/)[0]);
  if (servicePaths.has(path)) {
    assert.ok(internalLinks.includes("/contact") && internalLinks.includes("/institut"), path + " liens vers contact et institut");
  } else {
    assert.ok(internalLinks.includes("/prestations"), path + " lien vers les prestations");
  }

  const schemas = [...body.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)]
    .filter(([, attributes]) => attr(attributes, "type") === "application/ld+json")
    .map(([, , payload]) => JSON.parse(payload));
  const salons = schemas.filter((schema) => schema["@type"] === "BeautySalon");
  assert.equal(salons.length, path === "/" ? 1 : 0, path);
  if (path === "/") {
    const [salon] = salons;
    assert.equal(salon["@context"], "https://schema.org");
    assert.equal(salon.name, "L. Beauté");
    assert.equal(salon.address?.["@type"], "PostalAddress");
    assert.equal(salon.address?.streetAddress, street);
    assert.equal(salon.address?.addressLocality, "Nampty");
    assert.equal(salon.address?.postalCode, "80160");
    assert.equal(salon.address?.addressCountry, "FR");
    assert.equal(salon.url, canonicalUrl("/"));
    assert.ok(salon.telephone === phone && salon.sameAs?.includes(facebook), "Téléphone et profil du BeautySalon");
  }

  const services = schemas.filter((schema) => schema["@type"] === "Service");
  const articles = schemas.filter((schema) => schema["@type"] === "Article");
  assert.equal(services.length, origin && detail ? 1 : 0, path + " balisage Service");
  assert.equal(articles.length, origin && articlePages.has(path) ? 1 : 0, path + " balisage Article");
  if (services.length) {
    const [service] = services;
    assert.equal(service.name, detail[1], path);
    assert.equal(service.offers?.price, detail[2], path);
    assert.equal(service.offers?.priceCurrency, "EUR", path);
    assert.equal(service.url, canonicalUrl(path), path);
  }
  if (articles.length) assert.equal(articles[0].mainEntityOfPage, canonicalUrl(path), path);
  const breadcrumbs = schemas.filter((schema) => schema["@type"] === "BreadcrumbList");
  assert.ok(breadcrumbs.length <= 1, path);
  checkBreadcrumbs(breadcrumbs[0], path);
  assert.ok(!schemas.some((schema) => schema["@type"] === "FAQPage"), path);
  if (path === "/contact") {
    const faq = main.match(/<section\b[^>]*\baria-labelledby="questions"[^>]*>([\s\S]*?)<\/section>/)?.[1];
    assert.ok(faq, path + " FAQ visible");
    assert.match(faq, /<h2\b[^>]*>/i, path);
    assert.match(faq, /<h3\b[^>]*>/i, path);
  }
  if (path === "/" || path === "/contact" || path === "/institut") {
    const address = main.match(/<address\b[^>]*>([\s\S]*?)<\/address>/)?.[1];
    assert.ok(address, path + " adresse visible");
    const addressText = address.replace(/<!--[\s\S]*?-->/g, "").replace(/<[^>]*>/g, " ")
      .replaceAll("&#x27;", "'").replaceAll("&amp;", "&").replace(/\s+/g, " ");
    assert.ok(addressText.includes(street), path + " adresse de rue");
    assert.ok(addressText.includes("80160 Nampty"), path + " code postal et commune");
    const directions = mainLinks
      .filter((href) => href.startsWith("https://www.google.com/maps/dir/"))
      .map((href) => new URL(href));
    assert.ok(directions.some(({ searchParams }) => searchParams.get("api") === "1" &&
      searchParams.get("destination")?.includes(street) &&
      searchParams.get("destination")?.includes("80160 Nampty")), path + " itinéraire");
  }
}

try {
  for (let attempt = 0; !serverOutput.includes("Ready"); attempt++) {
    if (server.exitCode !== null || attempt === 40) throw new Error("Impossible de démarrer Next.js.\n" + serverOutput);
    await pause(250);
  }

  for (const path of pages) await checkPage(path);
  for (const [path, fragment] of crossPageAnchors) {
    assert.ok(anchorsByPath.get(path)?.has(fragment), path + " ancre interpage absente");
  }
  assert.equal(titles.size, pages.length, "Titles uniques");
  assert.equal(descriptions.size, pages.length, "Descriptions uniques");

  const robots = await read("/robots.txt");
  assert.match(robots.body, /^User-Agent:\s*\*/mi);
  assert.match(robots.body, /^Allow:\s*\/\s*$/mi);
  assert.doesNotMatch(robots.body, /^Disallow:/mi);
  assert.equal(robots.body.match(/^Sitemap:\s*(\S+)/mi)?.[1], canonicalUrl("/sitemap.xml"));

  const sitemap = await read("/sitemap.xml");
  assert.match(sitemap.headers["content-type"], /xml/);
  const locations = [...sitemap.body.matchAll(/<loc>([^<]+)<\/loc>/gi)].map(([, location]) => location).sort();
  assert.deepEqual(locations, origin ? pages.map(canonicalUrl).sort() : []);
  if (origin) {
    for (const path of ["/", "/epilations", "/sitemap.xml", "/robots.txt"]) {
      checkRobotsHeader((await read(path, { host: "preview.invalid" })).headers, false, path);
    }
  }

  for (const path of ["/page-inconnue", "/prestations/inconnue", "/conseils/inconnu"]) {
    await read(path, { status: 404 });
  }
  const icon = await read("/icon.svg");
  assert.match(icon.headers["content-type"], /^image\/svg\+xml/);
  const optimized = await read("/_next/image?url=%2Faccueil-ambiance.webp&w=640&q=75", { accept: "image/webp" });
  assert.match(optimized.headers["content-type"], /^image\/webp/);
  console.log("Vérifications SEO réussies pour les " + pages.length + " pages. Mode " + (origin ? "public." : "non indexable."));
} catch (error) {
  console.error(error);
  process.exitCode = 1;
} finally {
  server.kill();
}

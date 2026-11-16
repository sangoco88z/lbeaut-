import Link from "next/link";
import { notFound } from "next/navigation";
import { Arrow, ServiceMark } from "@/components/brand-art";
import { BookingActions } from "@/components/contact";
import { JsonLd } from "@/components/json-ld";
import { Breadcrumb } from "@/components/sections";
import { categories } from "@/lib/content";
import { formatPrice } from "@/lib/format-price";
import { absolute, pageMetadata } from "@/lib/site";
import { serviceDetails } from "@/src/data/service-details";
import "../../interior.css";
import "./service-detail.css";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return serviceDetails.map(({ slug }) => ({ slug }));
}

function getServicePage(slug: string) {
  const detail = serviceDetails.find((item) => item.slug === slug);
  if (!detail) notFound();

  const category = categories.find((item) => item.slug === detail.category);
  if (!category) notFound();

  return { detail, category };
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const { detail } = getServicePage(slug);
  return pageMetadata(detail.title + " à Nampty", detail.summary, detail.path);
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const { detail, category } = getServicePage(slug);
  const { name, priceEuros, durationMinutes, description } = detail.service;
  const categoryPath = "/" + category.slug;
  const related = serviceDetails.filter((item) => item.category === category.slug && item.slug !== slug);
  const publishedUrl = absolute(detail.path);

  return (
    <article className="interior service-detail">
      {publishedUrl && (
        <JsonLd data={{
          "@context": "https://schema.org",
          "@type": "Service",
          "@id": publishedUrl + "#prestation",
          name,
          description: detail.summary,
          url: publishedUrl,
          provider: { "@id": absolute("/#institut") },
          offers: { "@type": "Offer", price: priceEuros, priceCurrency: "EUR", url: publishedUrl },
        }} />
      )}
      <header className="service-detail-hero">
        <div className="interior-shell">
          <Breadcrumb title={detail.title} path={detail.path} parent={{ name: category.title, path: categoryPath }} />
          <div className="service-detail-heading">
            <div>
              <p className="eyebrow">{category.title} · Nampty</p>
              <h1>{detail.title}</h1>
              <p className="service-detail-intro">{detail.summary}</p>
            </div>
            <span className="service-detail-mark"><ServiceMark slug={category.slug} /></span>
          </div>
        </div>
      </header>
      <div className="interior-shell service-detail-layout">
        <section className="service-detail-copy" aria-labelledby="a-propos">
          <h2 id="a-propos">À propos de la prestation</h2>
          <p>{detail.description}</p>
          {description && <p className="service-detail-catalogue-description">{description}</p>}
          <Link className="quiet-link" href={categoryPath}>Voir toute la rubrique <Arrow diagonal /></Link>
        </section>
        <section className="service-detail-booking" aria-labelledby="rendez-vous">
          <h2 id="rendez-vous">Prendre rendez-vous</h2>
          <dl>
            <div>
              <dt>Tarif</dt>
              <dd>{formatPrice(priceEuros)}</dd>
            </div>
            {durationMinutes !== undefined && (
              <div>
                <dt>Durée</dt>
                <dd>{durationMinutes} min</dd>
              </div>
            )}
          </dl>
          {detail.offer && <p className="service-detail-offer">{detail.offer}</p>}
          <BookingActions service={name} />
          <Link className="quiet-link" href="/contact">Adresse et coordonnées de l’institut <Arrow diagonal /></Link>
        </section>
        <section className="service-detail-faq" aria-labelledby="questions-prestation">
          <h2 id="questions-prestation">Questions fréquentes</h2>
          {detail.faq.map(({ question, answer }) => (
            <details key={question}>
              <summary>{question}</summary>
              <p>{answer}</p>
            </details>
          ))}
        </section>
      </div>
      <section className="service-detail-related" aria-labelledby="aller-plus-loin">
        <div className="interior-shell">
          <h2 id="aller-plus-loin">Découvrez aussi</h2>
          <ul>
            {related.map((item) => (
              <li key={item.slug}><Link className="quiet-link" href={item.path}>{item.title} <Arrow diagonal /></Link></li>
            ))}
            <li><Link className="quiet-link" href="/prestations">Toutes les prestations <Arrow diagonal /></Link></li>
            <li><Link className="quiet-link" href="/institut">L’institut à Nampty <Arrow diagonal /></Link></li>
          </ul>
        </div>
      </section>
    </article>
  );
}

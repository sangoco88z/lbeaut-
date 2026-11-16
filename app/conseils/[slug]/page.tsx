import Link from "next/link";
import { notFound } from "next/navigation";
import { Arrow } from "@/components/brand-art";
import { JsonLd } from "@/components/json-ld";
import { adviceArticles } from "@/lib/beauty-advice";
import { categories } from "@/lib/content";
import { absolute, pageMetadata, site } from "@/lib/site";
import { AdviceMasthead } from "../advice-masthead";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return adviceArticles.map(({ slug }) => ({ slug }));
}

function getArticle(slug: string) {
  const article = adviceArticles.find((item) => item.slug === slug);
  if (!article) notFound();
  return article;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);
  return pageMetadata(article.title, article.description, "/conseils/" + slug);
}

export default async function AdviceArticle({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);
  const path = "/conseils/" + slug;
  const canonical = absolute(path);
  const services = categories.filter(({ slug: serviceSlug }) => article.serviceSlugs.includes(serviceSlug));
  return (
    <article>
      <AdviceMasthead title={article.title} introduction={article.introduction} path={path} />
      {canonical && (
        <JsonLd data={{
          "@context": "https://schema.org",
          "@type": "Article",
          mainEntityOfPage: canonical,
          headline: article.title,
          description: article.description,
          inLanguage: "fr-FR",
          author: { "@type": "Organization", name: site.name, url: absolute("/") },
        }} />
      )}
      <div className="wrap section">
        <div className="advice-reading">
          <div className="advice-article-sections">
            {article.sections.map(({ heading, text }) => (
              <section key={heading}>
                <h2>{heading}</h2>
                <p>{text}</p>
              </section>
            ))}
          </div>
          <aside className="advice-next">
            <h2>Les prestations de l’institut</h2>
            <ul>
              {services.map((service) => (
                <li key={service.slug}>
                  <Link className="quiet-link" href={"/" + service.slug}>{service.title} <Arrow diagonal /></Link>
                </li>
              ))}
            </ul>
            <div className="advice-index-links">
              <Link className="button" href="/conseiller-beaute">M’aider à choisir <Arrow diagonal /></Link>
              <Link className="quiet-link" href="/prestations">Voir toute la carte <Arrow diagonal /></Link>
            </div>
          </aside>
          <Link className="quiet-link advice-back" href="/conseils">Tous les conseils beauté <Arrow diagonal /></Link>
        </div>
      </div>
    </article>
  );
}

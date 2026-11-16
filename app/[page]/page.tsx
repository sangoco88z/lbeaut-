import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GiftExperience } from "@/components/gift-experience";
import { InstituteGallery } from "@/components/gallery";
import { Sprig } from "@/components/brand-art";
import { ContactDetails } from "@/components/contact";
import { LocationDetails, VerifiedFAQ } from "@/components/location";
import { Breadcrumb, CategoryLinks } from "@/components/sections";
import { ServiceMenu } from "@/components/service-menu";
import { categories, informations } from "@/lib/content";
import { pageMetadata, site } from "@/lib/site";
import "../interior.css";

type Props = { params: Promise<{ page: string }> };
const slugs = [...categories, ...informations].map(({ slug }) => slug);
export const dynamicParams = false;

export function generateStaticParams() {
  return slugs.map((page) => ({ page }));
}

function getPage(slug: string) {
  const category = categories.find((item) => item.slug === slug);
  const entry = category ?? informations.find((item) => item.slug === slug);
  if (!entry) notFound();
  return { category, entry };
}

export async function generateMetadata({ params }: Props) {
  const { page } = await params;
  const { entry } = getPage(page);
  return pageMetadata(entry.seoTitle, entry.seoDescription, "/" + page);
}

export default async function Page({ params }: Props) {
  const { page } = await params;
  const { category, entry } = getPage(page);
  const isGiftPage = page === "cartes-cadeaux";

  return (
    <div className="interior">
      <section className="interior-hero" aria-labelledby="interior-title">
        <div className="interior-shell interior-hero-layout">
          <div className="interior-hero-copy">
            <Breadcrumb title={entry.title} category={Boolean(category)} path={"/" + page} />
            <h1 id="interior-title">{entry.heading}</h1>
            <p>{entry.intro}</p>
          </div>
          <figure className="interior-figure">
            <div className="interior-figure-image">
              <Image
                src={isGiftPage ? "/carte-ambiance.webp" : "/rituel.webp"}
                alt={isGiftPage ? "Carte vert forêt nouée d’un ruban doré, posée sur une enveloppe ivoire" : "Flacon ambré, serviette claire et feuilles d’eucalyptus"}
                fill
                sizes="(max-width: 680px) 86vw, (max-width: 1130px) 36vw, 420px"
                fetchPriority="high"
                loading="eager"
              />
            </div>
            <figcaption>Visuel d’ambiance provisoire</figcaption>
          </figure>
        </div>
      </section>

      {page === "prestations" && (
        <section className="interior-shell interior-space interior-index interior-index-main" aria-labelledby="service-categories">
          <h2 id="service-categories">Choisir une prestation</h2>
        <p className="interior-catalogue-note">Une envie, mais pas encore de soin en tête ? <Link className="quiet-link" href="/conseiller-beaute">Ouvrir le conseiller beauté</Link>.</p>
          <CategoryLinks />
          <p className="interior-catalogue-note">Pour préparer votre rendez-vous, retrouvez <Link className="quiet-link" href="/institut">l’institut à Nampty</Link> et les <Link className="quiet-link" href="/contact">coordonnées de L. Beauté</Link>.</p>
        </section>
      )}

      {category && (
        <>
          <div className="interior-shell interior-space interior-catalogue">
            <div>
              <ServiceMenu category={page} />
              <section className="interior-guide" aria-labelledby="guide-service">
                <h2 id="guide-service">{category.guide.heading}</h2>
                <p>{category.guide.text}</p>
              </section>
            </div>
            <aside className="interior-reservation" aria-label="Prendre rendez-vous">
              <h2>Prendre rendez-vous</h2>
              <p>Contactez L. Beauté {site.bookingChannels}.</p>
              <Link className="interior-link interior-link-gold" href="/contact">Voir les coordonnées <span aria-hidden="true">↗</span></Link>
              <p className="interior-reservation-access"><Link href="/institut">Trouver l’institut à Nampty</Link></p>
            </aside>
          </div>
          <section className="interior-related" aria-labelledby="other-services">
            <div className="interior-shell interior-space interior-index">
              <h2 id="other-services">Les autres prestations</h2>
              <CategoryLinks current={page} />
            </div>
          </section>
        </>
      )}

      {page === "institut" && (
        <section className="interior-shell interior-space interior-feature" aria-labelledby="visit">
          <div className="interior-feature-copy">
            <h2 id="visit">Venir à Nampty</h2>
            <p>L’institut se trouve dans la vallée de la Selle, à proximité de Conty, d’Ô-de-Selle, de Plachy-Buyon et de Prouzel, au sud d’Amiens.</p>
            <LocationDetails />
            <div className="interior-feature-links">
              <Link className="interior-link" href="/contact">Prendre rendez-vous <span aria-hidden="true">↗</span></Link>
              <Link className="quiet-link" href="/prestations">Voir les soins et tarifs</Link>
            </div>
          </div>
          <div className="interior-institute-photo">
            <Sprig />
            <a className="quiet-link" href="#galerie">Voir la galerie de l’institut</a>
          </div>
        </section>
      )}

      {page === "institut" && <InstituteGallery />}

      {isGiftPage && <GiftExperience />}

      {page === "contact" && (
        <>
          <section className="interior-shell interior-space interior-feature" aria-labelledby="contact-details">
            <div className="interior-feature-copy">
              <h2 id="contact-details">Où trouver L. Beauté ?</h2>
              <LocationDetails />
              <div className="interior-feature-links">
                <Link href="/institut" className="quiet-link">Découvrir l’institut</Link>
                <Link href="/prestations" className="quiet-link">Voir les soins et tarifs</Link>
              </div>
            </div>
            <div className="interior-contact-card">
              <h2>Prendre rendez-vous</h2>
              <ContactDetails showAddress={false} />
            </div>
          </section>
          <VerifiedFAQ />
        </>
      )}
    </div>
  );
}

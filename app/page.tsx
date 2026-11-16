import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Arrow, ServiceMark, Sprig } from "@/components/brand-art";
import { ContactDetails } from "@/components/contact";
import { SeasonalOffer } from "@/components/seasonal-offer";
import { GoogleReviews } from "@/components/google-reviews";
import { categories } from "@/lib/content";
import { JsonLd } from "@/components/json-ld";
import { pageMetadata, salonSchema, site } from "@/lib/site";
import "./home.css";

export const metadata: Metadata = {
  ...pageMetadata(
    "Institut de beauté à Nampty (80160)",
    "L. Beauté, institut à Nampty près de Conty et d’Ô-de-Selle. Découvrez les tarifs des épilations, soins du visage et du corps, beauté du regard, mains et pieds.",
    "/",
  ),
  verification: site.googleVerification ? { google: site.googleVerification } : undefined,
};

export default function Home() {
  return (
    <>
      <JsonLd data={salonSchema} />
      <section className="home-hero" aria-labelledby="accueil">
        <div className="home-hero-copy">
          <Sprig className="hero-sprig" />
          <p className="eyebrow home-kicker">Soins esthétiques · Somme</p>
          <h1 id="accueil">Institut de beauté <em>à Nampty.</em></h1>
          <p className="home-hero-intro">Laëtitia vous accueille chez L. Beauté pour vos épilations, vos soins esthétiques et vos moments de détente.</p>
          <div className="home-actions">
            <Link className="button" href="/contact">Prendre rendez-vous <Arrow diagonal /></Link>
            <Link className="quiet-link" href="#prestations">Explorer les soins</Link>
          </div>
        </div>
        <figure className="home-hero-media">
          <Image
            src="/accueil-ambiance.webp"
            alt="Bol de soin, serviettes ivoire et branches d’eucalyptus sur une pierre claire"
            fill
            preload
            sizes="(max-width: 767px) 100vw, 55vw"
          />
          <figcaption className="image-note">Visuel d’ambiance provisoire</figcaption>
        </figure>
      </section>

      <section className="wrap section home-menu" aria-labelledby="prestations">
        <div className="home-section-head">
          <div>
            <p className="eyebrow home-kicker">La carte de soins</p>
            <h2 id="prestations">Les prestations</h2>
          </div>
          <Link href="/prestations" className="quiet-link">Voir toute la carte <Arrow diagonal /></Link>
        </div>
        <ul className="home-service-grid">
          {categories.map(({ slug, title, summary }) => (
            <li key={slug}>
              <Link href={"/" + slug} className="home-service-card">
                <span className="service-mark"><ServiceMark slug={slug} /></span>
                <span className="service-card-name">{title}</span>
                <span className="service-card-note">{summary}</span>
                <span className="service-card-arrow"><Arrow diagonal /></span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <SeasonalOffer />

      <section className="wrap home-explore" aria-labelledby="choisir-soin">
        <div className="home-explore-primary">
          <Sprig />
          <h2 id="choisir-soin">Un soin selon vos envies</h2>
          <p>Une pause détente, un soin du visage ou une manucure ? Retrouvez les prestations qui correspondent à votre envie et au temps dont vous disposez.</p>
          <Link className="button" href="/conseiller-beaute">Trouver mon soin <Arrow diagonal /></Link>
        </div>
        <div className="home-explore-secondary">
          <h2>Les conseils de L. Beauté</h2>
          <p>Préparez votre premier rendez-vous ou comparez les formats de soin avant de choisir.</p>
          <Link className="quiet-link" href="/conseils">Lire les conseils <Arrow diagonal /></Link>
        </div>
      </section>

      <section className="home-story" aria-labelledby="institut">
        <div className="wrap section home-story-grid">
          <figure className="story-media">
            <Image
              src="/rituel.webp"
              alt="Flacon ambré, serviette claire et feuilles d’eucalyptus"
              fill
              loading="lazy"
              sizes="(max-width: 630px) 91vw, (max-width: 767px) 576px, (max-width: 1370px) 44vw, 576px"
            />
            <figcaption className="image-note">Visuel provisoire · Photo de l’institut à venir</figcaption>
          </figure>
          <div className="story-copy">
            <Sprig className="story-sprig" />
            <p className="eyebrow home-kicker">Dans la vallée de la Selle</p>
            <h2 id="institut">L’institut<br /><em>à Nampty.</em></h2>
            <p>L. Beauté vous accueille sur rendez-vous à Nampty (80160), près de Conty et d’Ô-de-Selle, dans la Somme.</p>
            <Link className="quiet-link" href="/institut">Découvrir l’institut <Arrow diagonal /></Link>
            <Link className="quiet-link" href="/institut#galerie">Voir la galerie <Arrow diagonal /></Link>
          </div>
        </div>
      </section>

      <section className="wrap section home-gift" aria-labelledby="cadeaux">
        <div className="gift-panel">
          <div className="gift-copy">
            <p className="eyebrow home-kicker">Cartes cadeaux</p>
            <h2 id="cadeaux">Offrir un moment<br /><em>pour soi.</em></h2>
            <p>Renseignez-vous auprès de l’institut sur les soins à offrir et les modalités de retrait.</p>
            <Link className="button" href="/cartes-cadeaux">Découvrir les cartes cadeaux <Arrow diagonal /></Link>
          </div>
          <figure className="gift-media">
            <Image
              src="/carte-ambiance.webp"
              alt="Carte vert forêt nouée d’un ruban doré, posée sur une enveloppe ivoire"
              fill
              loading="lazy"
              sizes="(max-width: 767px) 91vw, (max-width: 1320px) 48vw, 630px"
            />
            <figcaption className="image-note">Visuel d’ambiance provisoire</figcaption>
          </figure>
        </div>
      </section>

      <section className="wrap home-team" aria-labelledby="laetitia">
        <figure className="portrait-reserve">
          <Sprig />
          <figcaption>Portrait de Laëtitia à venir</figcaption>
        </figure>
        <div className="story-copy">
          <h2 id="laetitia">Rencontrez <em>Laëtitia.</em></h2>
          <p>Votre interlocutrice chez L. Beauté, pour échanger sur vos envies et choisir votre prochain soin.</p>
          <Link className="quiet-link" href="/contact">Contacter Laëtitia <Arrow diagonal /></Link>
        </div>
      </section>

      <GoogleReviews />

      <section className="home-visit" aria-labelledby="coordonnees">
        <div className="wrap section home-visit-grid">
          <div className="story-copy">
            <p className="eyebrow home-kicker">Sur rendez-vous</p>
            <h2 id="coordonnees">Venir chez L. Beauté</h2>
            <p>Réservez {site.bookingChannels}.</p>
          </div>
          <ContactDetails />
        </div>
      </section>
    </>
  );
}

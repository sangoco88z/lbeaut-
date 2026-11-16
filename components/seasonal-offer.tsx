import Link from "next/link";
import { seasonalOffer } from "@/src/data/seasonal-offer";
import { Arrow } from "./brand-art";

export function SeasonalOffer() {
  const offer = seasonalOffer;
  if (!offer?.approved) return null;

  return (
    <section className="wrap home-seasonal" aria-labelledby="offre-saison">
      <div className="flow">
        <h2 id="offre-saison">{offer.title}</h2>
        <p>{offer.description}</p>
        <small>{offer.terms}</small>
      </div>
      <Link className="quiet-link" href={offer.href}>Découvrir l’offre <Arrow diagonal /></Link>
    </section>
  );
}

import Link from "next/link";
import { BookingActions } from "./contact";
import { site } from "@/lib/site";

export function GiftExperience() {
  return (
    <>
      <section className="interior-shell interior-space interior-feature" aria-labelledby="gift-details">
        <div className="interior-feature-copy gift-request-copy">
          <h2 id="gift-details">Offrir un soin à Nampty</h2>
          <p>Parcourez la carte, puis contactez Laëtitia pour vérifier les soins disponibles en carte cadeau et convenir du retrait.</p>
          <Link className="quiet-link" href="/prestations">Choisir un soin dans la carte</Link>
          <div className="gift-request">
            <h3>Demander une carte cadeau</h3>
            <BookingActions gift facebook={false} />
          </div>
        </div>
        <div className="interior-gift-illustration" aria-hidden="true">
          <div className="interior-gift-envelope" />
          <div className="interior-gift-card">
            <span>L. Beauté</span>
            <small>Carte cadeau</small>
          </div>
        </div>
      </section>
      <section className="interior-shell gift-questions contact-faq" aria-labelledby="gift-questions">
        <h2 id="gift-questions">Préparer votre cadeau</h2>
        <div>
          <h3>Que préciser dans ma demande ?</h3>
          <p>Si vous avez déjà choisi un soin, indiquez son nom. Vous pouvez aussi demander conseil et préciser votre budget.</p>
        </div>
        <div>
          <h3>Comment connaître les modalités de retrait et la durée de validité ?</h3>
          <p>Demandez les conditions à l’institut {site.sms ? "par téléphone ou SMS" : "par téléphone"} avant de confirmer votre demande.</p>
        </div>
      </section>
    </>
  );
}

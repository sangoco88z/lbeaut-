import Link from "next/link";
import { site } from "@/lib/site";

export function LocationDetails() {
  const destination = [site.street, site.postalCode + " " + site.locality, "France"].join(", ");
  const mapUrl = "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(destination);
  return (
    <div className="flow">
      <address>
        {site.street}<br />
        {site.postalCode} {site.locality}, {site.department}
      </address>
      <a className="quiet-link" href={mapUrl}>Obtenir un itinéraire <span aria-hidden="true">↗</span></a>
    </div>
  );
}

export function VerifiedFAQ() {
  return (
    <section className="interior-shell interior-space contact-faq" aria-labelledby="questions">
      <h2 id="questions">Questions fréquentes</h2>
      <div>
        <h3>Comment prendre rendez-vous chez L. Beauté ?</h3>
        <p>Les rendez-vous se prennent {site.bookingChannels}.</p>
      </div>
      <div>
        <h3>Où consulter les tarifs des soins ?</h3>
        <p>Retrouvez la liste des soins, leurs prix et les durées renseignées sur la page <Link href="/prestations">Prestations</Link> et dans ses cinq rubriques.</p>
      </div>
    </section>
  );
}


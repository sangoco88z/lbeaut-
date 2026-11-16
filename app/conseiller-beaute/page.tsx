import Link from "next/link";
import { Sprig } from "@/components/brand-art";
import { pageMetadata, site } from "@/lib/site";
import { advisorOptions } from "@/src/data/advisor";
import { BeautyAdvisor } from "./beauty-advisor";
import "./advisor.css";

export const metadata = pageMetadata(
  "Conseiller beauté à Nampty",
  "Choisissez une envie et trouvez des idées de prestations proposées par L. Beauté à Nampty, avec leurs tarifs et leurs durées disponibles.",
  "/conseiller-beaute",
);

export default function BeautyAdvisorPage() {
  return (
    <>
      <section className="advisor-hero">
        <div className="wrap advisor-hero-inner">
          <Sprig className="advisor-sprig" />
          <p className="eyebrow">Institut L. Beauté · Nampty</p>
          <h1>Conseiller beauté</h1>
          <p>Partez de votre envie du moment pour découvrir des prestations à explorer avec Laëtitia.</p>
        </div>
      </section>
      <BeautyAdvisor options={advisorOptions} sms={site.sms} />
      <section className="advisor-help">
        <div className="wrap advisor-help-inner">
          <div>
            <h2>Vous hésitez encore ?</h2>
            <p>Laëtitia peut vous aider à choisir votre prestation avant votre rendez-vous.</p>
          </div>
          <Link className="button" href="/contact">Contacter l’institut</Link>
        </div>
      </section>
    </>
  );
}

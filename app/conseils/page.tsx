import Link from "next/link";
import { Arrow } from "@/components/brand-art";
import { adviceArticles } from "@/lib/beauty-advice";
import { pageMetadata } from "@/lib/site";
import { AdviceMasthead } from "./advice-masthead";

export const metadata = pageMetadata(
  "Conseils beauté et préparation des soins",
  "Des conseils pratiques de L. Beauté à Nampty pour choisir un soin et préparer un rendez-vous épilation ou manucure.",
  "/conseils",
);

export default function AdviceIndex() {
  return (
    <>
      <AdviceMasthead
        path="/conseils"
        title="Conseils beauté"
        introduction="Des repères pour choisir votre soin et préparer votre rendez-vous chez L. Beauté."
      />
      <div className="wrap section">
        <ul className="advice-main-grid">
          {adviceArticles.map((article) => (
            <li key={article.slug}>
              <Link className="advice-card" href={"/conseils/" + article.slug}>
                <h2>{article.title}</h2>
                <p>{article.description}</p>
                <span aria-hidden="true" className="advice-card-arrow"><Arrow diagonal /></span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="advice-index-links">
          <Link className="button" href="/conseiller-beaute">M’aider à choisir un soin <Arrow diagonal /></Link>
          <Link className="quiet-link" href="/prestations">Voir les prestations <Arrow diagonal /></Link>
        </div>
      </div>
    </>
  );
}

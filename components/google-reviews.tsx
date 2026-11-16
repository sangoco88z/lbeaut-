import { Arrow } from "./brand-art";

const googleReviewsUrl = "https://www.google.com/maps/place//data=!4m4!3m3!1s0x47e79d1e66ced2d3:0xc51e03a891819b5!9m1!1b1";

const reviews = [
  {
    author: "Lucie C.",
    excerpt: "Je vous conseille son soin aux huiles chaudes, un grand moment de détente assuré!",
    rating: 5,
    experience: "Soin aux huiles chaudes",
  },
  {
    author: "Aurélie D.",
    excerpt: "… cela c'est très bien passé, elle a adoré.",
    rating: 5,
    experience: "Première épilation des sourcils de sa fille",
  },
  {
    author: "Juliette D.",
    excerpt: "Laëtitia est une personne agréable et qui est à l'écoute.",
    rating: 5,
    experience: "Accueil à l’institut",
  },
] as const;

export function GoogleReviews() {
  return (
    <section className="home-reviews" aria-labelledby="avis-google">
      <div className="wrap home-reviews-inner">
        <header className="home-reviews-copy">
          <h2 id="avis-google">Les avis sur L. Beauté</h2>
          <p>Sélection d’extraits publiés sur Google Maps</p>
        </header>
        <ul className="home-reviews-grid">
          {reviews.map(({ author, excerpt, rating, experience }) => (
            <li key={author}>
              <figure className="home-review">
                <div className="home-review-stars">
                  <span className="sr-only">{rating} étoiles sur 5</span>
                  <span aria-hidden="true">{"★".repeat(rating)}</span>
                </div>
                <blockquote cite={googleReviewsUrl}>« {excerpt} »</blockquote>
                <figcaption>
                  <strong>{author}</strong>
                  <span>{experience}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
        <div className="home-reviews-action">
          <a className="quiet-link" href={googleReviewsUrl}>Voir tous les avis sur Google <Arrow diagonal /></a>
        </div>
      </div>
    </section>
  );
}

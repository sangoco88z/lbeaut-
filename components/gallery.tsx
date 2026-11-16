import Image from "next/image";
import { Sprig } from "./brand-art";

type GallerySlot = {
  title: string;
  photo?: { src: string; alt: string };
};

// Ajouter les fichiers dans public/ et renseigner photo lorsque les visuels sont validés.
const slots: readonly GallerySlot[] = [
  { title: "L’entrée de l’institut" },
  { title: "L’espace de soin" },
  { title: "Laëtitia" },
];

export function InstituteGallery() {
  return (
    <section className="institute-gallery" aria-labelledby="galerie">
      <div className="interior-shell interior-space">
        <h2 id="galerie">L’institut en images</h2>
        <ul className="gallery-grid">
          {slots.map(({ title, photo }) => (
            <li key={title}>
              <figure>
                <div className="gallery-media">
                  {photo ? (
                    <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 680px) 90vw, 31vw" />
                  ) : (
                    <div className="gallery-pending"><Sprig /><span>Photo à venir</span></div>
                  )}
                </div>
                <figcaption>{title}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

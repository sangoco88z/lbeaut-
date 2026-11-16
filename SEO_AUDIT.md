# Audit SEO · L. Beauté, Nampty

**16 novembre 2026 · contrôle du site enrichi**  
Périmètre de 23 pages HTML, les routes d’exploration, le catalogue de 43 prestations et le fonctionnement des liens de réservation. Contrôles effectués sur un serveur de production local.

## Structure et contenu

| Contrôle | Résultat |
| --- | --- |
| Routes, titres et descriptions | 23 routes prérendues avec URL descriptives, métadonnées éditoriales uniques, un H1 et une hiérarchie H2/H3 cohérente. Titres et descriptions Open Graph vérifiés. Les dix URL initiales sont conservées. |
| Nouveaux contenus | Huit fiches de prestation sous `/prestations/`, un conseiller sous `/conseiller-beaute`, une rubrique de conseils et trois articles sous `/conseils/`. Les informations sur les services et les prix proviennent de la carte de l’institut. |
| Maillage | Accueil, index, catégories, fiches, conseiller, articles, Institut et Contact sont reliés. Les liens de navigation, les ancres et leurs cibles ont été contrôlés. Les coordonnées et les accès à la fiche Google restent visibles depuis l’accueil. |
| Référencement local | Adresse à Nampty sur Accueil, Institut et Contact. Conty, Ô-de-Selle, Plachy-Buyon, Prouzel et le sud d’Amiens sont cités sur la page Institut comme repères de proximité. Aucune page dupliquée par commune. |
| FAQ et avis | FAQ visibles sur les fiches de soins, les cartes cadeaux et le contact. Leurs réponses viennent de la carte ou des modalités connues. Trois avis Google figurent sous forme d’extraits attribués et vérifiés sur la fiche. Aucun balisage `FAQPage`, `Review` ou `AggregateRating`. |
| Médias | Images WebP avec textes alternatifs et tailles adaptées. Visuel d’accueil préchargé et autres images de l’accueil chargées à la demande. Dimensions réservées, dont celles de la galerie. Visuels provisoires clairement identifiés. Favicon L. Beauté renvoyé par `/icon.svg`. |

L’organisation par envies, la lisibilité de la carte et la présentation des cadeaux ont été étudiées à partir des parcours publics des grandes enseignes. L’interface et les textes ont été écrits pour le catalogue de L. Beauté. [Sephora](https://www.sephora.fr/diagnostic-peau.html) · [Nocibé](https://www.nocibe.fr/fr/c/institut/idees-cadeaux/cartes-cadeaux/160602) · [Clarins](https://www.clarins.fr/services-et-spa/)

### Cohérence des informations locales

L’adresse **17 route d’Amiens, 80160 Nampty** reprend la graphie utilisée par le partenaire Beauté Simple et l’annonce d’immatriculation. Google Maps affiche « rue d’Amiens » pour le même établissement et confirme le téléphone public et le profil Facebook intégrés. L’adresse visible, le JSON-LD et le lien d’itinéraire partagent la même configuration. Vérifier la graphie et le point d’arrivée avec l’institut avant publication. [Beauté Simple](https://beautesimple.fr/instituts-partenaires/) · [Annonce d’immatriculation](https://entreprises.lefigaro.fr/madame-laetitia-bachelet-80/entreprise-951940212) · [Fiche Google Maps](https://www.google.com/maps/place//data=!4m4!3m3!1s0x47e79d1e66ced2d3:0xc51e03a891819b5!9m1!1b1)

## Indexation et balisage

- En mode public, `NEXT_PUBLIC_SITE_URL` fournit les 23 canoniques et les 23 entrées de `/sitemap.xml`. Le sitemap reprend les chemins déclarés par les catégories, les fiches et les articles.
- `SITE_INDEXING_ENABLED=true` est réservé à la compilation publique. En local, les pages émettent `noindex, nofollow` dans le HTML et les en-têtes, le sitemap est vide et Googlebot peut lire la directive. Un hôte différent du domaine public reçoit aussi l’en-tête de protection. [Google Search Central sur noindex](https://developers.google.com/search/docs/crawling-indexing/block-indexing)
- L’accueil comporte un `BeautySalon` avec adresse, téléphone et profil officiel. En mode public, **18** pages émettent un `BreadcrumbList`, les huit fiches un `Service` avec le prix visible en euros et les trois articles un `Article`. [Google LocalBusiness](https://developers.google.com/search/docs/appearance/structured-data/local-business) · [Google BreadcrumbList](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb)
- `GOOGLE_SITE_VERIFICATION` gère la vérification HTML facultative de l’accueil pour une propriété avec préfixe d’URL. Une propriété Domaine se valide par DNS TXT. [Aide Search Console](https://support.google.com/webmasters/answer/9008080)

## Tests effectués

| Contrôle | Résultat |
| --- | --- |
| Compilation et types | Build Next.js 16.4.6 réussi en local et avec un domaine public simulé `.example`. Le contrôle TypeScript autonome réussit. |
| Tests SEO | `npm run check:seo` validé sur les 23 pages dans les deux configurations. Contrôles du HTML, des canoniques, des ancres, du sitemap, de robots.txt, de l’hôte alternatif, des trois schémas de contenu, du favicon, de l’image optimisée et des URL inconnues. |
| Catalogue | `npm run check:services` réussi avec comparaison des 43 couples nom/prix, des 13 durées, des 6 descriptions et du seuil de la remise. |
| Contact et conversion | Téléphone, Facebook, itinéraire et avis pointent vers les destinations attendues. SMS optionnel testé avec un numéro fictif. Le nom du soin est prérempli, le texte peut être copié et l’application SMS dispose d’un lien simple de repli. Les cartes cadeaux utilisent le téléphone et, si configuré, le SMS. [RFC 5724](https://www.rfc-editor.org/rfc/rfc5724.html) · [Lien SMS dans Safari iOS](https://developer.apple.com/library/archive/featuredarticles/iPhoneURLScheme_Reference/SMSLinks/SMSLinks.html) |
| Rendu | 69 contrôles de largeur sur les 23 pages à 320, 390 et 1 440 px. Après correction de deux blocs illustrés trop larges, aucun débordement horizontal détecté. Présence de la barre mobile et activation du conseiller au clavier vérifiées. |
| Transfert | HTML gzip de **4 305 à 8 763 octets**. TTFB exploratoire en boucle locale, une requête par page, **1 à 9 ms**. Variantes WebP à 640 px de **38 378 octets** pour l’accueil, **47 086** pour le visuel de l’institut et **19 660** pour les cartes cadeaux. |

Les contrôles de transfert et de mise en page sont locaux. Les Core Web Vitals terrain restent à mesurer sur le domaine public. Les seuils cibles au 75e centile sont LCP ≤ 2,5 s, INP ≤ 200 ms et CLS ≤ 0,1. [Web Vitals](https://web.dev/articles/vitals)

## Avant d’activer l’indexation

1. Confirmer le numéro SMS, les horaires, les conditions des cartes cadeaux et la graphie de l’adresse. Renseigner les photos autorisées et leurs textes alternatifs.
2. Définir l’origine HTTPS finale, garder les aperçus non indexables et vérifier les redirections d’hôte et HTTP vers HTTPS chez l’hébergeur. [Guide des canoniques](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)
3. Valider Search Console, soumettre le sitemap et inspecter l’accueil, une catégorie, une fiche, un article et le contact. Vérifier les données structurées avec le test des résultats enrichis. [Guide du sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
4. Vérifier les liens de contact sur de vrais appareils iPhone et Android. Mesurer les performances sur le domaine final avec PageSpeed Insights et suivre le rapport Core Web Vitals lorsqu’il dispose de données.


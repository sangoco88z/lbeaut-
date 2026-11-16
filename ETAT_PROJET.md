# État du projet · L. Beauté

**16 novembre 2026 · version locale**  
Institut de beauté à Nampty (80160). Projet Next.js App Router, TypeScript et Tailwind CSS. L’aperçu utilise la compilation finale en mode non indexable.

## Fonctionnalités terminées

| Parcours | État livré |
| --- | --- |
| Accueil | Univers vert forêt, eucalyptus, ivoire et doré. Visuel éditorial optimisé, accès aux soins, au conseiller, aux conseils, aux cartes cadeaux et à l’institut. |
| Carte des soins | Les cinq familles affichent les 43 prestations de la carte officielle. Les 43 noms et prix, 13 durées et 6 descriptions renseignées ont été contrôlés. La remise de 10 % reste limitée à trois épilations corps ou plus. |
| Fiches de soins | Huit fiches accessibles depuis le catalogue. Prix et durées issus de la carte, FAQ propres au soin, accès à la réservation et liens connexes. |
| Conseiller beauté | Cinq envies et deux suggestions par choix, avec lien vers la fiche ou la rubrique de la carte. Les prix et durées viennent du catalogue. Sélection au clavier et retour de focus testés. Aucune demande de données de santé ou de coordonnées. |
| Institut et localisation | Adresse à Nampty, itinéraire Google Maps, repères depuis les communes voisines et trois emplacements de galerie pour l’entrée, l’espace de soin et le portrait de Laëtitia. |
| Cartes cadeaux | Page dédiée. Demande par téléphone ou SMS une fois activé. Les conditions restent à préciser directement avec Laëtitia. |
| Réservation | Boutons de téléphone et Facebook pointant vers les coordonnées publiques de l’institut. Si `SALON_SMS` est renseigné, affichage du SMS et préremplissage sur les fiches, dans le conseiller et pour les cartes cadeaux. Repli avec texte copiable et ouverture de Messages sans préremplissage. Le visiteur reste à l’origine de tout envoi. |
| Avis | Trois extraits authentiques revérifiés sur Google Maps, affichés après la présentation de Laëtitia, et lien direct vers l’onglet Avis. La sélection est fixe. |
| Conseils | Trois articles originaux reliés aux prestations et au conseiller beauté. |
| Offres saisonnières | Emplacement et données prêts. Aucun encart affiché tant que `src/data/seasonal-offer.ts` ne contient pas d’offre approuvée. La remise du catalogue reste indépendante. |

Les parcours concernés se terminent par une demande de contact. Le périmètre exclut les transactions, la réservation par calendrier et les comptes clients.

## Vérification complète

- Compilation de production, TypeScript, `npm run check:services` et `npm run check:seo` réussis.
- **23 pages** contrôlées par HTTP et dans le navigateur à **320, 390 et 1 440 px**. Après correction des deux débordements, aucun débordement horizontal détecté sur les 69 contrôles. La barre mobile présentait deux actions avec une hauteur d’environ 58 px. Trois actions ont également été vérifiées à 320 px en activant le SMS avec une valeur fictive.
- À 320 px, largeur des illustrations Institut et Cartes cadeaux limitée à leur colonne. Ponctuation française rendue insécable dans les questions révisées et navigation répartie sur deux lignes sur les écrans les plus étroits.
- Cinq choix du conseiller activés et dix suggestions contrôlées avec leurs prix et liens. Le test avec un numéro fictif a vérifié la présence du nom de chaque prestation dans le message et la confirmation de copie. Le parcours carte cadeau a été contrôlé avec et sans SMS. Aucun appel ni message envoyé.
- Pages 404, liens internes et ancres, numéro public, page Facebook, itinéraire, onglet Avis, favicon, métadonnées, sitemap et données structurées contrôlés. Détails dans `SEO_AUDIT.md`.
- HTML compressé entre **4,3 et 8,8 ko** selon la page et variantes WebP servies par Next Image. Ces mesures locales ne représentent pas les Core Web Vitals en production.
- Recherche de motifs de clés privées, jetons et identifiants intégrés aux URL dans l’arborescence source. Aucun résultat. Le seul fichier d’environnement présent est le modèle `.env.example`, sans valeur secrète.
- Le dépôt Git local utilise la branche main et le distant GitHub sangoco88z/lbeaut-. À la préparation du premier commit, le distant est vide et public. Le premier envoi dépend de la confirmation du propriétaire.

## À confirmer avant publication

1. Confirmer le **numéro qui reçoit les SMS** et tester les liens sur iPhone et Android avec ce numéro. Le téléphone public et Facebook sont déjà actifs.
2. Fournir les photos réelles autorisées. Harmoniser les horaires et la graphie de l’adresse avec la fiche Google Business Profile, puis contrôler l’itinéraire depuis un smartphone.
3. Préciser les prestations éligibles aux cartes cadeaux, les conditions de retrait et la durée de validité. Renseigner les offres saisonnières seulement après validation.
4. Choisir l’origine HTTPS définitive. Configurer l’indexation, vérifier l’hôte et les redirections, valider Search Console et soumettre le sitemap. Mesurer les Core Web Vitals après mise en ligne.

## Lancement

Avec Node.js 24 et npm, lancer `npm ci`, puis `npm run dev`. Les variables de configuration sont documentées dans `.env.example`. La compilation finale a été testée avec Node.js 24.22.1 et Next.js 16.4.6.


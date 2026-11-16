import { serviceGroups } from "./services";

type Detail = {
  slug: string;
  group: string;
  name: string;
  title: string;
  summary: string;
  description: string;
  faq: readonly { question: string; answer: string }[];
};

const details: readonly Detail[] = [
  {
    slug: "epilation-sourcils",
    group: "visage",
    name: "Sourcils",
    title: "Épilation des sourcils",
    summary: "Entretenez la ligne de vos sourcils chez L. Beauté à Nampty. Retrouvez la prestation seule et les formules associées.",
    description: "L’épilation des sourcils fait partie des épilations du visage. Vous pouvez la réserver seule ou l’associer aux lèvres si vous souhaitez traiter les deux zones au même rendez-vous.",
    faq: [
      { question: "Peut-on associer les sourcils et les lèvres ?", answer: "Oui. La carte des épilations du visage propose une prestation « Sourcils et lèvres »." },
      { question: "Peut-on ajouter une teinture des sourcils ?", answer: "Oui. La formule « Teinture sourcils + épilation » figure dans la rubrique Beauté du regard." },
    ],
  },
  {
    slug: "epilation-jambes-entieres",
    group: "corps",
    name: "Jambes entières",
    title: "Épilation des jambes entières",
    summary: "Retrouvez le tarif de l’épilation des jambes entières à Nampty et les autres zones disponibles chez L. Beauté.",
    description: "La carte des épilations du corps distingue les demi-jambes, les cuisses, les trois quarts des jambes et les jambes entières. Comparez les zones pour choisir la prestation qui correspond à votre rendez-vous.",
    faq: [
      { question: "Puis-je réserver une zone plus petite ?", answer: "Oui. Les demi-jambes, les cuisses et les trois quarts des jambes sont proposés séparément sur la carte des épilations." },
      { question: "Y a-t-il une remise pour plusieurs zones ?", answer: "La carte prévoit une remise à partir de trois épilations corps. Elle s’applique à cette rubrique uniquement." },
    ],
  },
  {
    slug: "rehaussement-cils",
    group: "regard",
    name: "Rehaussement cils",
    title: "Rehaussement de cils",
    summary: "Découvrez le rehaussement de cils chez L. Beauté à Nampty. Choisissez le rehaussement seul ou la formule avec teinture et soin à la kératine.",
    description: "Le rehaussement travaille la courbure de vos cils naturels. La carte Beauté du regard propose le rehaussement seul et une formule associant le rehaussement, la teinture et un soin à la kératine.",
    faq: [
      { question: "La teinture est-elle comprise ?", answer: "La teinture fait partie de la formule « Rehaussement cils + teinture + soin kératine ». Le rehaussement est aussi proposé seul." },
      { question: "Puis-je réserver une teinture seule ?", answer: "Oui. Vous pouvez choisir une teinture des cils ou des sourcils dans la rubrique Beauté du regard." },
    ],
  },
  {
    slug: "manucure-express",
    group: "mains-pieds",
    name: "Manucure express",
    title: "Manucure express",
    summary: "La manucure express est un format court proposé par L. Beauté à Nampty. Consultez son tarif et les autres prestations pour les mains.",
    description: "La manucure express convient à un rendez-vous court. Pour un soin des mains ou une pose de vernis semi-permanent, retrouvez les prestations dédiées dans la même rubrique.",
    faq: [
      { question: "La manucure express comprend-elle une pose de semi-permanent ?", answer: "La pose de vernis semi-permanent est une prestation distincte sur la carte." },
      { question: "Quel rendez-vous choisir pour un soin des mains ?", answer: "La carte propose aussi un soin des mains ou des pieds. Vous pouvez comparer les deux formats dans la rubrique Mains et pieds." },
    ],
  },
  {
    slug: "vernis-semi-permanent",
    group: "mains-pieds",
    name: "Pose de vernis semi-permanent",
    title: "Pose de vernis semi-permanent",
    summary: "Prenez rendez-vous pour une pose de vernis semi-permanent chez L. Beauté à Nampty. Comparez la pose, la french et la dépose.",
    description: "Cette fiche présente la pose de vernis semi-permanent. La carte Mains et pieds distingue aussi la pose french et la dépose du vernis semi-permanent.",
    faq: [
      { question: "Existe-t-il une option french ?", answer: "Oui. La pose de vernis semi-permanent french figure séparément dans la rubrique Mains et pieds." },
      { question: "Puis-je réserver une dépose seule ?", answer: "Oui. La dépose de semi-permanent est une prestation à part sur la carte." },
    ],
  },
  {
    slug: "soin-visage-prestige",
    group: "soins-visage",
    name: "Soin Prestige",
    title: "Soin du visage Prestige",
    summary: "Le Soin Prestige est le soin du visage personnalisé de L. Beauté à Nampty. Découvrez son format et préparez votre rendez-vous.",
    description: "Le Soin Prestige est le rendez-vous personnalisé de la carte des soins du visage. Indiquez vos attentes à l’institut lors de la réservation pour faciliter le choix du soin.",
    faq: [
      { question: "Le soin suit-il un protocole identique pour tout le monde ?", answer: "La carte présente le Soin Prestige comme un soin personnalisé. Contactez l’institut pour échanger sur son contenu." },
      { question: "Existe-t-il un soin du visage plus court ?", answer: "Oui. La Parenthèse Douceur et le Soin Purifiant sont les deux formats plus courts de la rubrique Soins du visage." },
    ],
  },
  {
    slug: "modelage-huiles-chaudes",
    group: "soins-corps",
    name: "Parenthèse cocooning",
    title: "Modelage aux huiles chaudes",
    summary: "Découvrez la Parenthèse cocooning, le modelage aux huiles chaudes proposé par L. Beauté à Nampty.",
    description: "Sur la carte des soins du corps, le modelage aux huiles chaudes porte le nom de « Parenthèse cocooning ». La Parenthèse Bien-être est le format qui réunit un gommage et un modelage.",
    faq: [
      { question: "Quel nom indiquer pour réserver ?", answer: "Demandez la « Parenthèse cocooning », le nom du modelage aux huiles chaudes sur la carte." },
      { question: "Quel soin comprend aussi un gommage ?", answer: "La Parenthèse Bien-être associe un gommage aux agrumes et un modelage au baume fondant aux huiles essentielles." },
    ],
  },
  {
    slug: "parenthese-bien-etre",
    group: "soins-corps",
    name: "Parenthèse Bien-être",
    title: "Parenthèse Bien-être",
    summary: "La Parenthèse Bien-être réunit un gommage aux agrumes, un modelage du corps et un thé beauté bio chez L. Beauté à Nampty.",
    description: "Cette parenthèse réunit trois moments. Le gommage est aux agrumes, le modelage se fait au baume fondant aux huiles essentielles et le soin s’accompagne d’un thé beauté bio.",
    faq: [
      { question: "Quel type de modelage est prévu ?", answer: "La carte prévoit un modelage au baume fondant aux huiles essentielles dans la Parenthèse Bien-être." },
      { question: "Peut-on réserver uniquement un gommage ?", answer: "Oui. Le soin « Douceur éclat » est consacré au gommage du corps aux agrumes." },
    ],
  },
];

export const serviceDetails = details.map((detail) => {
  const group = serviceGroups.find(({ id }) => id === detail.group);
  const service = group?.services.find(({ name }) => name === detail.name);
  if (!group || !service) {
    throw new Error(`Prestation introuvable dans le catalogue : ${detail.name}`);
  }
  return {
    ...detail,
    path: "/prestations/" + detail.slug,
    category: group.category,
    offer: group.offer,
    service,
  };
});

export const serviceDetailPaths = serviceDetails.map(({ path }) => path);

export function serviceDetailPath(group: string, name: string) {
  return serviceDetails.find((entry) => entry.group === group && entry.name === name)?.path;
}

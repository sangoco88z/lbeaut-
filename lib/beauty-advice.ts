import type { categories } from "./content";

type ServiceSlug = (typeof categories)[number]["slug"];

type Advice = {
  slug: string;
  title: string;
  description: string;
  introduction: string;
  sections: readonly { heading: string; text: string }[];
  serviceSlugs: readonly ServiceSlug[];
};

export const adviceArticles: readonly Advice[] = [
  {
    slug: "choisir-son-soin",
    title: "Visage ou corps, comment choisir son soin ?",
    description: "Hésitez-vous entre soin du visage, modelage du dos et gommage ? Choisissez selon votre envie et le temps dont vous disposez chez L. Beauté à Nampty.",
    introduction: "Commencez par ce que vous attendez du rendez-vous. Avez-vous envie d’un soin centré sur le visage, d’un gommage du corps ou d’un modelage ? Le temps dont vous disposez aide ensuite à choisir.",
    sections: [
      {
        heading: "Pour une demi-heure",
        text: "La Parenthèse Douceur fait partie des soins du visage. Pour le corps, comparez Douceur éclat, consacrée au gommage aux agrumes, et Douceur relaxante, qui laisse le choix entre un modelage du dos et du corps.",
      },
      {
        heading: "Pour une heure ou davantage",
        text: "Si vous souhaitez consacrer une heure au visage, le Soin Prestige est personnalisé. Pour le corps, la Parenthèse cocooning propose un modelage aux huiles chaudes. Avec une heure et demie, la Parenthèse Bien-être associe un gommage et un modelage.",
      },
      {
        heading: "Avant de choisir le créneau",
        text: "Si vous hésitez entre deux soins, donnez à l’institut votre préférence et votre temps disponible. Par exemple, précisez que vous disposez d’une heure et préférez un modelage à un gommage.",
      },
    ],
    serviceSlugs: ["soins-du-visage", "soins-du-corps"],
  },
  {
    slug: "premiere-epilation",
    title: "Préparer une première épilation à l’institut",
    description: "Préparez votre première épilation chez L. Beauté à Nampty. Repérez les zones sur la carte et sachez quoi préciser lors de la prise de rendez-vous.",
    introduction: "Vous pouvez réserver pour une seule zone. Repérez son intitulé sur la carte avant de contacter l’institut et indiquez qu’il s’agit d’une première épilation si vous souhaitez savoir comment le rendez-vous se déroule.",
    sections: [
      {
        heading: "Repérer les zones qui vous intéressent",
        text: "Sur le visage, « Sourcils et lèvres » réunit deux zones. Pour les jambes, la carte distingue demi-jambes, cuisses, trois quarts et jambes entières. Si vous hésitez entre deux intitulés, décrivez la partie que vous souhaitez épiler.",
      },
      {
        heading: "Préciser les prestations avant le rendez-vous",
        text: "Si vous souhaitez combiner plusieurs zones, donnez leur liste au moment de réserver. Les maillots et les épilations homme ont leur propre rubrique. Les conditions de la remise sur les épilations corps figurent dans la rubrique correspondante.",
      },
      {
        heading: "Poser vos questions en amont",
        text: "Demandez à l’institut s’il y a une préparation particulière pour la zone choisie et combien de temps prévoir. Si vous organisez le rendez-vous avant un événement, communiquez également sa date.",
      },
    ],
    serviceSlugs: ["epilations"],
  },
  {
    slug: "preparer-une-manucure",
    title: "Préparer son rendez-vous manucure",
    description: "Manucure express, pose de semi-permanent ou dépose. Les bons repères pour choisir votre prestation chez L. Beauté à Nampty et préparer votre rendez-vous.",
    introduction: "Pour préparer votre rendez-vous, partez du résultat que vous souhaitez et indiquez si vous portez déjà du semi-permanent. Cette information aide l’institut à vous orienter entre la manucure, la pose et la dépose.",
    sections: [
      {
        heading: "Choisir entre soin et pose de vernis",
        text: "Si vous cherchez un rendez-vous court, la manucure express dure 20 minutes. La carte propose également un soin des mains ou des pieds de 45 minutes. Si votre priorité est le vernis, vous pouvez demander une pose de semi-permanent ou une pose french.",
      },
      {
        heading: "Signaler une pose déjà en place",
        text: "La dépose du semi-permanent est indiquée séparément sur la carte. Signalez-la dès la réservation si vous souhaitez retirer votre vernis, avec ou sans nouvelle pose. L’institut pourra vous confirmer les prestations à prévoir.",
      },
      {
        heading: "Préciser le rendu souhaité",
        text: "Pour une occasion, une photo de la couleur ou de la finition qui vous plaît peut aider à décrire vos attentes. Si vous hésitez entre deux options, indiquez ce qui compte le plus pour vous, comme la couleur ou la finition french.",
      },
    ],
    serviceSlugs: ["mains-et-pieds"],
  },
];

export const advicePaths = ["/conseils", ...adviceArticles.map(({ slug }) => "/conseils/" + slug)];

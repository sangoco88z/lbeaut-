type Service = {
  name: string;
  priceEuros: number;
  durationMinutes?: number;
  description?: string;
};

type ServiceGroup = {
  id: string;
  category: string;
  title?: string;
  offer?: string;
  services: readonly Service[];
};

export const serviceGroups: readonly ServiceGroup[] = [
  {
    id: "visage",
    category: "epilations",
    title: "Épilations visage",
    services: [
      { name: "Sourcils", priceEuros: 9 },
      { name: "Lèvres", priceEuros: 8 },
      { name: "Menton", priceEuros: 8 },
      { name: "Sourcils et lèvres", priceEuros: 16 },
      { name: "Visage", priceEuros: 21 },
    ],
  },
  {
    id: "maillots",
    category: "epilations",
    title: "Maillots",
    services: [
      { name: "Classique", priceEuros: 14 },
      { name: "Échancré", priceEuros: 16 },
      { name: "Brésilien", priceEuros: 24 },
      { name: "Intégral", priceEuros: 27 },
      { name: "Inter-fessier", priceEuros: 7 },
    ],
  },
  {
    id: "corps",
    category: "epilations",
    title: "Épilations corps",
    offer: "10 % de remise à partir de trois épilations corps.",
    services: [
      { name: "Aisselles", priceEuros: 12 },
      { name: "1/2 bras", priceEuros: 14 },
      { name: "Bras", priceEuros: 18 },
      { name: "1/2 jambes", priceEuros: 19 },
      { name: "Cuisses", priceEuros: 20 },
      { name: "3/4 jambes", priceEuros: 22 },
      { name: "Jambes entières", priceEuros: 26 },
    ],
  },
  {
    id: "homme",
    category: "epilations",
    title: "Épilations homme",
    services: [
      { name: "1/2 dos", priceEuros: 15 },
      { name: "Dos", priceEuros: 22 },
      { name: "1/2 torse", priceEuros: 15 },
      { name: "Torse", priceEuros: 22 },
      { name: "Épaules", priceEuros: 10 },
    ],
  },
  {
    id: "regard",
    category: "beaute-du-regard",
    services: [
      { name: "Teinture sourcils ou cils", priceEuros: 15 },
      { name: "Teinture sourcils + cils", priceEuros: 25 },
      { name: "Teinture sourcils + épilation", priceEuros: 20 },
      { name: "Rehaussement cils", priceEuros: 40 },
      { name: "Rehaussement cils + teinture + soin kératine", priceEuros: 50 },
    ],
  },
  {
    id: "mains-pieds",
    category: "mains-et-pieds",
    services: [
      { name: "Soin des mains ou des pieds", priceEuros: 40, durationMinutes: 45 },
      { name: "Soin anti-callosité YUMI", priceEuros: 40, durationMinutes: 40 },
      { name: "Manucure express", priceEuros: 20, durationMinutes: 20 },
      { name: "Pose de vernis semi-permanent", priceEuros: 30 },
      { name: "Pose de vernis semi-permanent french", priceEuros: 32 },
      { name: "Dépose de semi-permanent", priceEuros: 15 },
    ],
  },
  {
    id: "soins-visage",
    category: "soins-du-visage",
    services: [
      { name: "Parenthèse Douceur", priceEuros: 35, durationMinutes: 30 },
      { name: "Soin Purifiant", priceEuros: 45, durationMinutes: 40 },
      { name: "Soin Prestige", priceEuros: 55, durationMinutes: 60, description: "soin 100 % personnalisé pour 60 minutes de bonheur." },
      { name: "Soin Anti-Âge", priceEuros: 60, durationMinutes: 60 },
    ],
  },
  {
    id: "soins-corps",
    category: "soins-du-corps",
    services: [
      { name: "Douceur éclat", priceEuros: 35, durationMinutes: 30, description: "Gommage corps fondant aux agrumes." },
      { name: "Douceur relaxante", priceEuros: 35, durationMinutes: 30, description: "Modelage corps ou dos à la crème réconfortante à l'orange." },
      { name: "Soin Purifiant et relaxant du dos", priceEuros: 45, durationMinutes: 45 },
      { name: "Parenthèse plaisir", priceEuros: 60, durationMinutes: 60, description: "Modelage au baume fondant multi-actions aux huiles essentielles." },
      { name: "Parenthèse cocooning", priceEuros: 65, durationMinutes: 60, description: "Modelage aux huiles chaudes." },
      { name: "Parenthèse Bien-être", priceEuros: 80, durationMinutes: 90, description: "Gommage aux agrumes, modelage au baume fondant aux huiles essentielles et thé beauté Bio." },
    ],
  },
];

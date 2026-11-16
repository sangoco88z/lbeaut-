import type { categories } from "@/lib/content";
import { serviceDetailPath } from "./service-details";
import { serviceGroups } from "./services";

type Category = (typeof categories)[number]["slug"];

type AdvisorChoice = {
  id: string;
  category: Category;
  label: string;
  detail: string;
  suggestions: readonly { groupId: string; serviceName: string; note: string }[];
};

const choices: readonly AdvisorChoice[] = [
  {
    id: "detente",
    category: "soins-du-corps",
    label: "M’accorder une pause",
    detail: "Modelages du corps ou du dos",
    suggestions: [
      {
        groupId: "soins-corps",
        serviceName: "Douceur relaxante",
        note: "Un modelage avec le choix entre le corps et le dos.",
      },
      {
        groupId: "soins-corps",
        serviceName: "Parenthèse cocooning",
        note: "La parenthèse aux huiles chaudes proposée par l’institut.",
      },
    ],
  },
  {
    id: "visage",
    category: "soins-du-visage",
    label: "Prendre soin de mon visage",
    detail: "Soin découverte ou personnalisé",
    suggestions: [
      {
        groupId: "soins-visage",
        serviceName: "Parenthèse Douceur",
        note: "Un format court pour découvrir les soins du visage.",
      },
      {
        groupId: "soins-visage",
        serviceName: "Soin Prestige",
        note: "Un soin dont le contenu se définit avec l’institut.",
      },
    ],
  },
  {
    id: "regard",
    category: "beaute-du-regard",
    label: "Mettre mon regard en valeur",
    detail: "Teinture ou rehaussement",
    suggestions: [
      {
        groupId: "regard",
        serviceName: "Teinture sourcils ou cils",
        note: "Pour apporter de la couleur aux sourcils ou aux cils, selon votre choix.",
      },
      {
        groupId: "regard",
        serviceName: "Rehaussement cils",
        note: "Pour mettre en valeur la courbure des cils.",
      },
    ],
  },
  {
    id: "ongles",
    category: "mains-et-pieds",
    label: "Soigner mes mains ou mes pieds",
    detail: "Soin ou manucure",
    suggestions: [
      {
        groupId: "mains-pieds",
        serviceName: "Manucure express",
        note: "Un format court pour la mise en beauté des mains.",
      },
      {
        groupId: "mains-pieds",
        serviceName: "Soin des mains ou des pieds",
        note: "Un rendez-vous à consacrer aux mains ou aux pieds.",
      },
    ],
  },
  {
    id: "epilation",
    category: "epilations",
    label: "Choisir une épilation",
    detail: "Visage et corps",
    suggestions: [
      {
        groupId: "visage",
        serviceName: "Sourcils et lèvres",
        note: "Les deux zones du visage réunies dans une même prestation.",
      },
      {
        groupId: "corps",
        serviceName: "1/2 jambes",
        note: "Une des options du corps, à comparer avec les cuisses ou les jambes entières.",
      },
    ],
  },
];

export const advisorOptions = choices.map(({ suggestions, ...choice }) => ({
  ...choice,
  recommendations: suggestions.flatMap(({ groupId, serviceName, note }) => {
    const group = serviceGroups.find(({ id, category }) => id === groupId && category === choice.category);
    const service = group?.services.find(({ name }) => name === serviceName);
    if (!group || !service) return [];

    const detail = serviceDetailPath(group.id, service.name);
    return [{ ...service, note, isDetail: Boolean(detail), href: detail ?? `/${group.category}#tarifs-${group.id}` }];
  }),
}));

export type AdvisorOption = (typeof advisorOptions)[number];

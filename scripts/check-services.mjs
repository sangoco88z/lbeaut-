import assert from "node:assert/strict";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { serviceGroups } = require("../src/data/services.ts");

const expected = {
  visage: {
    category: "epilations",
    services: [
      ["Sourcils", 9],
      ["Lèvres", 8],
      ["Menton", 8],
      ["Sourcils et lèvres", 16],
      ["Visage", 21],
    ],
  },
  maillots: {
    category: "epilations",
    services: [
      ["Classique", 14],
      ["Échancré", 16],
      ["Brésilien", 24],
      ["Intégral", 27],
      ["Inter-fessier", 7],
    ],
  },
  corps: {
    category: "epilations",
    services: [
      ["Aisselles", 12],
      ["1/2 bras", 14],
      ["Bras", 18],
      ["1/2 jambes", 19],
      ["Cuisses", 20],
      ["3/4 jambes", 22],
      ["Jambes entières", 26],
    ],
  },
  homme: {
    category: "epilations",
    services: [
      ["1/2 dos", 15],
      ["Dos", 22],
      ["1/2 torse", 15],
      ["Torse", 22],
      ["Épaules", 10],
    ],
  },
  regard: {
    category: "beaute-du-regard",
    services: [
      ["Teinture sourcils ou cils", 15],
      ["Teinture sourcils + cils", 25],
      ["Teinture sourcils + épilation", 20],
      ["Rehaussement cils", 40],
      ["Rehaussement cils + teinture + soin kératine", 50],
    ],
  },
  "mains-pieds": {
    category: "mains-et-pieds",
    services: [
      ["Soin des mains ou des pieds", 40, 45],
      ["Soin anti-callosité YUMI", 40, 40],
      ["Manucure express", 20, 20],
      ["Pose de vernis semi-permanent", 30],
      ["Pose de vernis semi-permanent french", 32],
      ["Dépose de semi-permanent", 15],
    ],
  },
  "soins-visage": {
    category: "soins-du-visage",
    services: [
      ["Parenthèse Douceur", 35, 30],
      ["Soin Purifiant", 45, 40],
      ["Soin Prestige", 55, 60, "soin 100 % personnalisé pour 60 minutes de bonheur."],
      ["Soin Anti-Âge", 60, 60],
    ],
  },
  "soins-corps": {
    category: "soins-du-corps",
    services: [
      ["Douceur éclat", 35, 30, "Gommage corps fondant aux agrumes."],
      ["Douceur relaxante", 35, 30, "Modelage corps ou dos à la crème réconfortante à l'orange."],
      ["Soin Purifiant et relaxant du dos", 45, 45],
      ["Parenthèse plaisir", 60, 60, "Modelage au baume fondant multi-actions aux huiles essentielles."],
      ["Parenthèse cocooning", 65, 60, "Modelage aux huiles chaudes."],
      ["Parenthèse Bien-être", 80, 90, "Gommage aux agrumes, modelage au baume fondant aux huiles essentielles et thé beauté Bio."],
    ],
  },
};

assert.equal(serviceGroups.flatMap(group => group.services).length, 43);
assert.deepEqual(serviceGroups.map(group => group.id), Object.keys(expected), "Groupes du catalogue");

for (const group of serviceGroups) {
  const reference = expected[group.id];
  assert.equal(group.category, reference.category, "Catégorie du groupe " + group.id);
  assert.deepEqual(
    group.services.map(({ name, priceEuros, durationMinutes, description }) => [name, priceEuros, durationMinutes, description]),
    reference.services.map(([name, priceEuros, durationMinutes, description]) => [name, priceEuros, durationMinutes, description]),
    "Prestations du groupe " + group.id,
  );
}

assert.deepEqual(
  serviceGroups.filter(group => group.offer).map(({ id, offer }) => [id, offer]),
  [["corps", "10 % de remise à partir de trois épilations corps."]],
  "Taux, seuil et portée de la remise",
);
console.log("43 noms et prix, 13 durées, 6 descriptions et remise vérifiés.");


import type { ScaleGuideContent } from "./types";

/** Sources internes : docs/scales/edi/edi.md (thèse de S.-N. Yao, Lyon 2, 1999). */
export const edi: ScaleGuideContent = {
  scaleId: "edi",

  seoTitle: "Échelle d'infériorité (EDI) : cotation et repères | Melya",
  seoDescription:
    "Coter et interpréter l'Échelle d'infériorité (EDI) de Yao et Cottraux : 34 pensées, score de 34 à 170, sous-scores EDI-soi et EDI-autres, repères cliniques.",
  heading:
    "Échelle d'infériorité (EDI) : le guide pratique pour les psychologues",

  essentials: [
    "L'Échelle d'infériorité (EDI) évalue en 34 pensées le **sentiment d'infériorité**, à ses propres yeux et aux yeux des autres. Elle a été construite en français par Yao, Cottraux et collaborateurs, notamment pour les patients anxieux (TOC, phobie sociale).",
    "Le score va de 34 à 170, avec deux sous-scores : **EDI-soi** et **EDI-autres**.",
    "Il n'y a pas de seuil validé, mais des repères : environ 59 en moyenne chez des personnes non cliniques, plus de 100 chez des patients phobiques sociaux ou souffrant de TOC.",
  ],
  audience: "Adultes",
  administrationMode: "Auto-questionnaire",

  administration: {
    title: "Comment administrer l'EDI ?",
    body: [
      "La personne indique à quel point chaque pensée correspond à sa façon de penser, de 1 (ne correspond pas du tout) à 5 (correspond exactement). Comptez une dizaine de minutes.",
      "À ne pas confondre avec l'EDI-2 (Eating Disorder Inventory), qui porte sur les troubles du comportement alimentaire.",
    ],
  },

  scoring: {
    title: "Comment coter l'EDI ?",
    body: [
      "Le score total (EDI-T) est la somme des 34 items, de 34 à 170. Aucun item n'est inversé. Deux sous-scores :",
      {
        list: [
          "**EDI-soi** (infériorité à ses propres yeux) : items 1, 4, 6, 7, 9, 10, 13, 15, 18, 20, 23, 24, 26, 27, 29, 32, 33.",
          "**EDI-autres** (infériorité aux yeux des autres) : items 2, 3, 5, 8, 11, 12, 14, 16, 17, 19, 21, 22, 25, 28, 30, 31, 34.",
        ],
      },
    ],
  },

  interpretation: {
    title: "Comment interpréter le score de l'EDI ?",
    body: [
      "**Il n'y a pas de seuil validé.** Les repères de l'étude de validation permettent de situer le score :",
      {
        list: [
          "**Personnes non cliniques** : moyenne de 58,8 (écart-type 12,6) ; les auteurs situent la limite « environ » vers 70.",
          "**Patients phobiques sociaux** : moyenne de 109,3 (écart-type 22).",
          "**Patients souffrant de TOC** : moyenne de 105,8 (écart-type 35,8).",
        ],
      },
      "Comparez les deux sous-scores : un sentiment d'infériorité centré sur le regard des autres (EDI-autres) évoque davantage l'anxiété sociale, un sentiment centré sur soi (EDI-soi) une dévalorisation plus globale.",
    ],
  },

  vigilance: {
    title: "Points de vigilance et limites",
    body: [
      {
        list: [
          "**Pas de seuil validé** : la limite de 70 est un ordre de grandeur donné par les auteurs, pas un seuil diagnostique.",
          "**Une seule source accessible** : le formulaire et sa cotation proviennent de la thèse de l'auteur ; la publication de validation reste à consulter.",
          "**Elle mesure une perception de soi**, pas un trouble : associez-la à une échelle de symptômes (anxiété sociale, dépression).",
        ],
      },
    ],
  },

  followUp: {
    title: "Suivre l'évolution avec l'EDI",
    body: [
      "L'EDI peut être repassée en début et en fin de prise en charge, par exemple d'une TCC de l'anxiété sociale, pour voir si le sentiment d'infériorité diminue et sur quel versant (soi ou autres).",
      "Avec Melya, l'EDI est envoyée par email ; le total et les deux sous-scores sont calculés automatiquement, et chaque passation est conservée dans l'historique du patient.",
    ],
  },

  faq: [
    {
      question: "Comment interpréter l'Échelle d'infériorité ?",
      answer:
        "Le score va de 34 à 170, sans seuil validé. Repères : environ 59 en moyenne chez des personnes non cliniques (limite « environ » vers 70), plus de 100 chez des patients phobiques sociaux ou souffrant de TOC.",
    },
    {
      question: "Quelle différence entre l'EDI et l'EDI-2 ?",
      answer:
        "Ce sont deux échelles sans rapport. L'EDI (Échelle d'infériorité) mesure le sentiment d'infériorité ; l'EDI-2 (Eating Disorder Inventory) évalue les troubles du comportement alimentaire.",
    },
    {
      question:
        "L'Échelle d'infériorité est-elle un test du complexe d'infériorité ?",
      answer:
        "Elle mesure le sentiment d'infériorité, ce que l'on appelle couramment « complexe d'infériorité ». Ce n'est pas un diagnostic : l'EDI en donne une mesure chiffrée, utile pour repérer les pensées de dévalorisation et suivre leur évolution en thérapie.",
    },
    {
      question: "Peut-on faire passer l'EDI en ligne ?",
      answer:
        "Oui. Avec Melya, vous envoyez l'EDI à votre patient par email : il y répond en ligne, le score est calculé automatiquement et chaque passation est conservée dans son historique.",
    },
    {
      question: "Comment citer l'EDI ?",
      answer:
        "Citez Yao et al. (1998) pour la validation, et la thèse de S.-N. Yao (Université Lumière Lyon 2, 1999), qui reproduit le formulaire et sa cotation.",
    },
  ],

  questionnaire: {
    kind: "none",
    reason:
      "Aucun formulaire officiel n'est diffusé en PDF : le questionnaire et sa cotation sont reproduits dans la thèse de doctorat de S.-N. Yao (Université Lumière Lyon 2, 1999), consultable en ligne sur le site des thèses de l'université.",
  },
  frenchVersion: {
    summary:
      "L'EDI a été construite directement en français par Yao, Cottraux et collaborateurs : il n'y a pas de traduction. Melya reprend le formulaire et le codage de la thèse de l'auteur.",
    validated: true,
  },
  sources: [
    {
      citation:
        "Yao, S.-N., et al. (1998). Validation de l'Échelle d'infériorité (EDI). Référence complète à confirmer.",
    },
    {
      citation:
        "Yao, S.-N. (1999). Thèse de doctorat, Université Lumière Lyon 2 (formulaire de l'EDI en annexe).",
    },
  ],
  apaCitation:
    "Yao, S.-N. (1999). Thèse de doctorat, Université Lumière Lyon 2.",

  related: [
    "rses",
    "echelle-d-anxiete-sociale-de-liebowitz",
    "index-symptomes-ybocs",
    "atq",
  ],

  updatedAt: "2026-10-23",
};

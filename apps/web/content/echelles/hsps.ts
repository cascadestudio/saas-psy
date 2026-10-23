import type { ScaleGuideContent } from "./types";

/** Sources internes : docs/scales/hsps/hsps.md. Aron & Aron 1997 vérifié sur PubMed le 23/10/2026. */
export const hsps: ScaleGuideContent = {
  scaleId: "hsps",

  seoTitle: "Test d'hypersensibilité d'Elaine Aron : cotation | Melya",
  seoDescription:
    "Coter et interpréter le questionnaire d'hypersensibilité d'Elaine Aron : 23 questions oui/non, seuil de 12, différence avec l'échelle de recherche HSPS.",
  heading:
    "Questionnaire d'hypersensibilité d'Elaine Aron : le guide pratique pour les psychologues",

  essentials: [
    "Le questionnaire d'hypersensibilité d'Elaine Aron est un **auto-test de 23 questions oui/non** sur la haute sensibilité : réactivité aux stimulations, aux émotions des autres, besoin de se retirer, sensibilité aux détails…",
    "Chaque « oui » vaut 1 point. **À partir de 12 « oui », une hypersensibilité est probable** selon l'auteure.",
    "C'est un outil d'auto-repérage grand public, pas un instrument diagnostique : l'hypersensibilité est un trait de tempérament, pas un trouble.",
  ],
  audience: "Adultes",
  administrationMode: "Auto-questionnaire (oui/non)",

  administration: {
    title: "Comment administrer le questionnaire d'hypersensibilité ?",
    body: [
      "La personne répond « oui » si l'énoncé s'applique le plus souvent à elle, « non » s'il ne s'applique pas vraiment ou pas du tout. Comptez 3 à 5 minutes.",
      "Ce questionnaire est l'auto-test publié par Elaine Aron dans son livre (1996). Il est distinct de l'échelle de recherche HSPS, en 27 items cotés sur une échelle graduée.",
    ],
  },

  scoring: {
    title: "Comment coter le questionnaire d'hypersensibilité ?",
    body: ["Le score est le nombre de réponses « oui », de 0 à 23."],
  },

  interpretation: {
    title: "Comment interpréter le score ?",
    body: [
      {
        list: [
          "**De 0 à 11 « oui »** : hypersensibilité peu probable.",
          "**12 « oui » ou plus** : hypersensibilité probable.",
        ],
      },
      "L'auteure le précise elle-même : aucun test psychologique n'est d'une exactitude absolue. Si seulement une ou deux affirmations correspondent très fortement à la personne, elle peut être hypersensible même sous le seuil.",
      "Le résultat sert surtout à mettre des mots sur le vécu de la personne et à ouvrir la discussion : comment elle gère les stimulations, la fatigue sociale, les émotions intenses.",
    ],
  },

  vigilance: {
    title: "Points de vigilance et limites",
    body: [
      {
        list: [
          "**Ce n'est pas un diagnostic** : l'hypersensibilité (sensibilité de traitement sensoriel) est un trait de tempérament étudié en recherche, pas un trouble reconnu.",
          "**Des recoupements à garder en tête** : une forte sensibilité aux stimulations peut aussi relever d'un trouble anxieux, d'un trouble du spectre de l'autisme, d'un TDAH ou d'un épuisement. Le test ne fait pas la différence.",
          "**Version grand public** : l'échelle de recherche (HSPS en 27 items) et sa validation française ne sont pas celles utilisées ici.",
        ],
      },
    ],
  },

  followUp: {
    title: "Le questionnaire dans la prise en charge",
    body: [
      "Comme il décrit un trait de tempérament, ce questionnaire ne sert pas à mesurer une évolution : il se passe une fois, comme support de discussion.",
      "Avec Melya, il est envoyé par email, coté automatiquement, et conservé dans l'historique du patient.",
    ],
  },

  faq: [
    {
      question:
        "Comment interpréter le test d'hypersensibilité d'Elaine Aron ?",
      answer:
        "À partir de 12 réponses « oui » sur 23, la personne est probablement hypersensible. Sous ce seuil, une hypersensibilité reste possible si quelques affirmations correspondent très fortement.",
    },
    {
      question: "L'hypersensibilité est-elle un trouble ?",
      answer:
        "Non. C'est un trait de tempérament (sensibilité de traitement sensoriel) décrit par Elaine Aron et étudié en recherche, qui concerne une partie importante de la population. Ce n'est pas un diagnostic psychiatrique.",
    },
    {
      question: "Quelle différence entre ce test et l'échelle HSPS ?",
      answer:
        "Le test grand public compte 23 questions oui/non. L'échelle de recherche HSPS (Aron et Aron, 1997) compte 27 items cotés sur une échelle graduée et a fait l'objet de validations, dont une en français.",
    },
    {
      question: "Comment citer ce questionnaire ?",
      answer:
        "Aron, E. N. (1996). The Highly Sensitive Person. Broadway Books. Pour l'échelle de recherche : Aron, E. N., & Aron, A. (1997), Journal of Personality and Social Psychology, 73(2), 345–368.",
    },
  ],

  questionnaire: {
    kind: "none",
    reason:
      "La traduction française du test est extraite d'un livre publié par les Éditions de l'Homme : Melya ne diffuse pas le questionnaire.",
  },
  frenchVersion: {
    summary:
      "Melya utilise la traduction française du test publiée dans le livre d'Elaine Aron (Éditions de l'Homme). Il s'agit d'un auto-test grand public, sans validation psychométrique propre ; l'échelle de recherche à 27 items, elle, a une validation française distincte.",
    validated: false,
    warning:
      "Auto-test grand public issu d'un livre : il n'a pas fait l'objet d'une validation psychométrique.",
  },
  sources: [
    {
      citation:
        "Aron, E. N. (1996). The highly sensitive person. Broadway Books.",
    },
    {
      citation:
        "Aron, E. N., & Aron, A. (1997). Sensory-processing sensitivity and its relation to introversion and emotionality. Journal of Personality and Social Psychology, 73(2), 345–368.",
      url: "https://doi.org/10.1037/0022-3514.73.2.345",
    },
  ],
  apaCitation:
    "Aron, E. N. (1996). The highly sensitive person. Broadway Books.",

  related: ["cat-q", "asrs", "gad-7", "rses"],

  updatedAt: "2026-10-23",
};

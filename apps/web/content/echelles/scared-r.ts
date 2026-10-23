import type { ScaleGuideContent } from "./types";

/** Sources internes : docs/scales/scared-r/scared-r.md. Muris 1998 vérifié sur CrossRef le 23/10/2026. */
export const scaredR: ScaleGuideContent = {
  scaleId: "scared-r",

  seoTitle: "SCARED-R (51 items) : cotation et sous-échelles | Melya",
  seoDescription:
    "Coter et interpréter le SCARED-R-51 : peurs et troubles anxieux de l'enfant sur 3 mois, 51 items, 10 sous-échelles (panique, TOC, TSPT, phobies…).",
  heading:
    "SCARED-R-51 : le guide pratique de la grille d'évaluation des troubles anxieux de l'enfant",

  essentials: [
    "Le SCARED-R-51 évalue en 51 items **dix types de peurs et de troubles anxieux chez l'enfant**, sur les 3 derniers mois : panique, anxiété généralisée, séparation, phobie sociale, TOC, stress post-traumatique, phobie scolaire et phobies spécifiques.",
    "C'est l'enfant qui répond. Le score total va de 0 à 102 et les 10 sous-scores dessinent son profil d'anxiété.",
    "Les auteurs ne fournissent pas de seuil clinique : l'échelle sert surtout à décrire le profil et à suivre son évolution.",
  ],
  audience: "Enfants",
  administrationMode: "Auto-questionnaire (l'enfant répond)",

  administration: {
    title: "Comment administrer le SCARED-R-51 ?",
    body: [
      "L'enfant indique à quel point il a vécu chaque peur **durant les 3 derniers mois** : jamais ou presque jamais (0), quelques fois (1), souvent (2). La consigne rappelle qu'il n'y a pas de bonne ou de mauvaise réponse. Comptez 10 à 15 minutes.",
      "Pour les plus jeunes, un adulte peut lire les questions avec l'enfant, sans orienter ses réponses.",
    ],
  },

  scoring: {
    title: "Comment coter le SCARED-R-51 ?",
    body: [
      "Le score total est la somme des 51 items, de 0 à 102. Les 10 sous-échelles du formulaire décrivent les symptômes de :",
      {
        list: [
          "trouble panique ;",
          "anxiété généralisée ;",
          "anxiété de séparation ;",
          "phobie sociale ;",
          "trouble obsessionnel-compulsif ;",
          "stress post-traumatique ;",
          "phobie scolaire ;",
          "phobie des animaux ;",
          "phobie de type situationnel ;",
          "phobie des soins médicaux.",
        ],
      },
    ],
  },

  interpretation: {
    title: "Comment interpréter le SCARED-R-51 ?",
    body: [
      "**Il n'y a pas de seuil clinique** fourni par les auteurs de cette version. Plus un score est élevé, plus les peurs correspondantes sont présentes.",
      "Le profil des sous-échelles est le plus utile : il montre sur quelles peurs porter l'évaluation clinique (par exemple une sous-échelle « anxiété de séparation » nettement plus élevée que les autres).",
      "Pour un dépistage avec seuils, le SCARED (41 items) est plus adapté.",
    ],
  },

  vigilance: {
    title: "Points de vigilance et limites",
    body: [
      {
        list: [
          "**Pas de seuil** : comparez l'enfant à lui-même et confirmez en entretien.",
          "**Version québécoise** : le SCARED-R-51 est une version française de Martin et Gosselin (2011). Une autre version française, à 66 items, existe (Bouvard et al., 2013) ; les scores ne sont pas comparables.",
          "**Elle ne pose pas de diagnostic** : elle décrit des peurs, à explorer avec l'enfant et sa famille.",
        ],
      },
    ],
  },

  followUp: {
    title: "Suivre l'évolution avec le SCARED-R-51",
    body: [
      "La consigne porte sur les 3 derniers mois : repassez le questionnaire à quelques mois d'intervalle pour voir si le profil évolue, en particulier sur les sous-échelles travaillées en séance.",
      "Avec Melya, le SCARED-R-51 est envoyé par email ; le score total et les 10 sous-scores sont calculés automatiquement, et chaque passation est conservée dans l'historique du patient.",
    ],
  },

  faq: [
    {
      question: "Le SCARED-R-51 a-t-il un seuil ?",
      answer:
        "Non, les auteurs ne fournissent pas de seuil clinique. On l'interprète par le profil des 10 sous-échelles et dans le temps.",
    },
    {
      question: "Quelle différence entre le SCARED et le SCARED-R ?",
      answer:
        "Le SCARED (41 items) dépiste 5 dimensions de l'anxiété avec des seuils. Le SCARED-R, version révisée de Muris, ajoute le TOC, le stress post-traumatique et des phobies spécifiques ; la version française de Martin et Gosselin compte 51 items.",
    },
    {
      question: "Comment citer le SCARED-R ?",
      answer:
        "Citez Muris et al. (1998) pour l'instrument révisé, et Martin et Gosselin (2011) pour la version française en 51 items.",
    },
  ],

  questionnaire: {
    kind: "link",
    url: "https://pre.pediatricbipolar.pitt.edu/sites/default/files/assets/AH/French%20Screen%20for%20Child%20Anxiety%20Related%20Disorders%20(SCARED).pdf",
    publisher:
      "l'Université de Pittsburgh (formulaire © Martin et Gosselin, 2011)",
  },
  frenchVersion: {
    summary:
      "Melya utilise la version française en 51 items de Martin et Gosselin (2011), diffusée par l'Université de Pittsburgh. Aucune étude de validation de cette version n'a été trouvée.",
    validated: false,
  },
  sources: [
    {
      citation:
        "Muris, P., Merckelbach, H., Schmidt, H., & Mayer, B. (1998). The revised version of the Screen for Child Anxiety Related Emotional Disorders (SCARED-R): Factor structure in normal children. Personality and Individual Differences, 26(1), 99–112.",
      url: "https://doi.org/10.1016/s0191-8869(98)00130-5",
    },
    {
      citation:
        "Martin, A., & Gosselin, P. (2011). SCARED-R-51 [formulaire, version française].",
    },
  ],
  apaCitation:
    "Muris, P., Merckelbach, H., Schmidt, H., & Mayer, B. (1998). The revised version of the Screen for Child Anxiety Related Emotional Disorders (SCARED-R): Factor structure in normal children. Personality and Individual Differences, 26(1), 99–112. https://doi.org/10.1016/s0191-8869(98)00130-5",

  related: ["scared", "cries-13", "adrs", "gad-7"],

  updatedAt: "2026-10-23",
};

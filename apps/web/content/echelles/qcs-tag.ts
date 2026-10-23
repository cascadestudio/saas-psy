import type { ScaleGuideContent } from "./types";

/** Sources internes : docs/scales/qcs-tag/qcs-tag.md. */
export const qcsTag: ScaleGuideContent = {
  scaleId: "qcs-tag",

  seoTitle: "QCS-TAG (comportements sécurisants) : cotation | Melya",
  seoDescription:
    "Coter et interpréter le QCS-TAG (GAD-SBQ) : 10 comportements sécurisants du trouble d'anxiété généralisée, score de 10 à 50, usage en TCC du TAG.",
  heading:
    "QCS-TAG : le guide pratique du questionnaire sur les comportements sécurisants du TAG",

  essentials: [
    "Le QCS-TAG évalue en 10 items les **comportements sécurisants** associés au trouble d'anxiété généralisée sur le dernier mois : chercher à être rassuré, tout vérifier, surpréparer, éviter l'incertitude, demander l'avis des autres…",
    "Ces comportements soulagent sur le moment mais entretiennent les inquiétudes : les repérer permet de les cibler en thérapie.",
    "Le score va de 10 à 50 ; les auteurs ne fournissent pas de seuil clinique.",
  ],
  audience: "Adultes",
  administrationMode: "Auto-questionnaire",

  administration: {
    title: "Comment administrer le QCS-TAG ?",
    body: [
      "Le patient indique jusqu'à quel point chaque comportement est typique de lui **au cours du dernier mois**, de 1 (pas du tout typique de moi) à 5 (extrêmement typique de moi). Chaque item est suivi d'un exemple concret qui aide à le comprendre. Comptez 3 à 5 minutes.",
      "La consigne rappelle qu'il n'y a pas de bonne ou de mauvaise réponse : utile pour des patients qui craignent d'être jugés sur leurs comportements de réassurance.",
    ],
  },

  scoring: {
    title: "Comment coter le QCS-TAG ?",
    body: [
      "Le score total est la somme des 10 items, de 10 à 50. Aucun item n'est inversé et il n'y a pas de sous-score.",
    ],
  },

  interpretation: {
    title: "Comment interpréter le QCS-TAG ?",
    body: [
      "**Il n'y a pas de seuil clinique** fourni par les auteurs. Plus le score est élevé, plus les comportements sécurisants sont présents.",
      "Le plus utile est la lecture item par item : elle donne la liste des comportements à travailler (réassurance, vérification, surpréparation, évitement…), qui peut servir de base à un plan d'exposition et de prévention de la réponse.",
    ],
  },

  vigilance: {
    title: "Points de vigilance et limites",
    body: [
      {
        list: [
          "**Pas de seuil** : comparez le patient à lui-même.",
          "**Les patients minimisent parfois** des comportements devenus automatiques ou socialement valorisés (être prévoyant, bien préparé).",
        ],
      },
    ],
  },

  followUp: {
    title: "Suivre l'évolution avec le QCS-TAG",
    body: [
      "La consigne porte sur le dernier mois : une passation mensuelle permet de suivre la diminution des comportements sécurisants au cours de la thérapie.",
      "Avec Melya, le QCS-TAG est envoyé par email, coté automatiquement, et chaque passation est conservée dans l'historique du patient.",
    ],
  },

  faq: [
    {
      question: "Qu'est-ce qu'un comportement sécurisant dans le TAG ?",
      answer:
        "Un comportement destiné à réduire l'anxiété ou l'incertitude sur le moment : chercher à être rassuré, vérifier, surpréparer, éviter de décider. Il soulage à court terme mais entretient les inquiétudes.",
    },
    {
      question: "Le QCS-TAG a-t-il un seuil ?",
      answer:
        "Non, les auteurs ne fournissent pas de seuil clinique. Le score se lit de façon continue et dans le temps.",
    },
    {
      question: "Quelle différence entre le QCS-TAG et le GAD-SBQ ?",
      answer:
        "Le GAD-SBQ (Generalized Anxiety Disorder-Safety Behaviors Questionnaire) est la version anglaise ; le QCS-TAG en est la version française abrégée à 10 items, validée en échantillon clinique.",
    },
    {
      question: "Comment citer le QCS-TAG ?",
      answer:
        "Marcotte-Beaumier, G., Hébert, E. A., & Dugas, M. J. (2020). Le Questionnaire sur les comportements sécurisants du trouble d'anxiété généralisée (QCS-TAG) : validation auprès d'un échantillon clinique. Revue canadienne des sciences du comportement, 52, 324–330.",
    },
  ],

  questionnaire: {
    kind: "link",
    url: "https://uqo.ca/anxiete/outils",
    publisher:
      "le Laboratoire des troubles d'anxiété de l'Université du Québec en Outaouais, qui le met à disposition gratuitement",
  },
  frenchVersion: {
    summary:
      "Melya utilise la version française abrégée diffusée par le laboratoire des auteurs, validée en échantillon clinique par Marcotte-Beaumier, Hébert et Dugas (2020).",
    validated: true,
  },
  sources: [
    {
      citation:
        "Marcotte-Beaumier, G., Hébert, E. A., & Dugas, M. J. (2020). Le Questionnaire sur les comportements sécurisants du trouble d'anxiété généralisée (QCS-TAG) : validation auprès d'un échantillon clinique. Revue canadienne des sciences du comportement, 52, 324–330.",
    },
  ],
  apaCitation:
    "Marcotte-Beaumier, G., Hébert, E. A., & Dugas, M. J. (2020). Le Questionnaire sur les comportements sécurisants du trouble d'anxiété généralisée (QCS-TAG) : validation auprès d'un échantillon clinique. Revue canadienne des sciences du comportement, 52, 324–330.",

  related: ["eii", "qec", "qia", "gad-7"],

  updatedAt: "2026-10-23",
};

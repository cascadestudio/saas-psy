import type { ScaleGuideContent } from "./types";

/** Sources internes : docs/scales/cries-13/cries-13.md. Perrin 2005 vérifié sur CrossRef le 23/10/2026. */
export const cries13: ScaleGuideContent = {
  scaleId: "cries-13",

  seoTitle: "CRIES-13 (trauma de l'enfant) : cotation et seuil | Melya",
  seoDescription:
    "Coter et interpréter la CRIES-13 : impact d'un événement traumatique chez l'enfant dès 8 ans, cotation 0-1-3-5, seuil de 30, sous-scores. Le guide pratique.",
  heading:
    "CRIES-13 : le guide pratique de l'échelle d'impact des événements chez l'enfant",

  essentials: [
    "La CRIES-13 mesure l'**impact d'un événement traumatique chez l'enfant, à partir de 8 ans** : reviviscences, évitement et hyperréactivité au cours des 7 derniers jours. 13 questions, 5 à 10 minutes.",
    "Les réponses valent 0, 1, 3 ou 5 points ; le score va de 0 à 65. **Un score ≥ 30 permet le dépistage d'un trouble de stress post-traumatique (TSPT).**",
    "Elle est diffusée gratuitement par la Children and War Foundation et utilisée en France par le Centre national de ressources et de résilience (Cn2r).",
  ],
  audience: "Enfants dès 8 ans",
  administrationMode: "Auto-questionnaire (l'enfant répond)",

  administration: {
    title: "Comment administrer la CRIES-13 ?",
    body: [
      "C'est **l'enfant qui répond**, en pensant à un événement stressant précis. Présentez-lui la consigne et assurez-vous qu'il a identifié l'événement. Pour les plus jeunes, vous pouvez lire les questions avec lui, sans suggérer de réponse.",
      "Pour chaque réaction, l'enfant indique sa fréquence au cours des **7 derniers jours** : pas du tout, rarement, quelques fois ou souvent.",
    ],
  },

  scoring: {
    title: "Comment coter la CRIES-13 ?",
    body: [
      "La cotation n'est pas linéaire, c'est la principale source d'erreur :",
      {
        list: [
          "Pas du tout = **0**",
          "Rarement = **1**",
          "Quelques fois = **3**",
          "Souvent = **5**",
        ],
      },
      "Le score total est la somme des 13 items, de 0 à 65. Trois sous-scores (fiche du Cn2r) :",
      {
        list: [
          "**Intrusion** : items 1, 4, 8 et 9 (0 à 20).",
          "**Évitement** : items 2, 6, 7 et 10 (0 à 20).",
          "**Hyperréactivité** : items 3, 5, 11, 12 et 13 (0 à 25).",
        ],
      },
    ],
  },

  interpretation: {
    title: "Comment interpréter le score de la CRIES-13 ?",
    body: [
      "Le seuil de **30** est celui de la fiche descriptive du Cn2r, issu de l'étude de validation de la CRIES comme outil de dépistage (Perrin et al., 2005) :",
      {
        list: [
          "**Score de 0 à 29** : sous le seuil de dépistage du TSPT.",
          "**Score de 30 à 65** : dépistage positif, un TSPT est probable et doit être évalué cliniquement.",
        ],
      },
      "Regardez la répartition entre les sous-scores : un enfant qui évite beaucoup peut obtenir un total modéré malgré une souffrance importante.",
    ],
  },

  vigilance: {
    title: "Points de vigilance et limites de la CRIES-13",
    body: [
      {
        list: [
          "**La traduction française n'est pas entièrement validée** : le seuil vient des études anglophones. Interprétez avec prudence et en lien avec l'entretien.",
          "**Un événement précis** doit être identifié ; chez l'enfant exposé à plusieurs événements, précisez lequel est évalué.",
          "**Les enfants minimisent parfois** pour ne pas inquiéter leurs parents, ou évitent de parler de l'événement : complétez par l'observation et l'entretien avec les parents.",
          "**Elle dépiste, elle ne diagnostique pas.**",
        ],
      },
    ],
  },

  followUp: {
    title: "Suivre l'évolution avec la CRIES-13",
    body: [
      "La consigne porte sur les 7 derniers jours : la CRIES-13 peut être repassée à intervalles rapprochés (toutes les 2 à 4 semaines) pour suivre l'évolution après l'événement ou au cours d'une prise en charge. Suivez le total et les sous-scores.",
      "Avec Melya, la CRIES-13 est envoyée par email, cotée automatiquement (y compris la cotation 0-1-3-5) et chaque passation est conservée dans l'historique du patient.",
    ],
  },

  faq: [
    {
      question: "Quel est le seuil de la CRIES-13 ?",
      answer:
        "Un score total ≥ 30 permet le dépistage d'un TSPT chez l'enfant (fiche descriptive du Cn2r).",
    },
    {
      question: "Comment coter la CRIES-13 ?",
      answer:
        "Pas du tout = 0, rarement = 1, quelques fois = 3, souvent = 5. Le score total est la somme des 13 items (0 à 65).",
    },
    {
      question: "À partir de quel âge utiliser la CRIES-13 ?",
      answer:
        "À partir de 8 ans. Pour les plus jeunes, l'évaluation passe par l'observation et l'entretien avec les parents.",
    },
    {
      question: "La CRIES-13 est-elle gratuite ?",
      answer:
        "Oui. La Children and War Foundation diffuse gratuitement ses questionnaires, dont la version française, sur son site.",
    },
    {
      question: "Comment citer la CRIES-13 ?",
      answer:
        "Perrin, S., Meiser-Stedman, R., & Smith, P. (2005). The Children's Revised Impact of Event Scale (CRIES): Validity as a screening instrument for PTSD. Behavioural and Cognitive Psychotherapy, 33(4), 487–498.",
    },
  ],

  questionnaire: {
    kind: "link",
    url: "https://cn2r.fr/wp-content/uploads/2025/04/CRIES_13_Cn2r.pdf",
    publisher:
      "le Centre national de ressources et de résilience (Cn2r) ; la Children and War Foundation diffuse aussi la version française sur son site",
  },
  frenchVersion: {
    summary:
      "Melya utilise la traduction de la Children and War Foundation, telle que mise en page par le Cn2r. Selon le Cn2r, cette traduction n'a pas été entièrement validée.",
    validated: false,
    warning:
      "La traduction française n'a pas été entièrement validée : le seuil de 30 provient des études anglophones.",
  },
  sources: [
    {
      citation:
        "Perrin, S., Meiser-Stedman, R., & Smith, P. (2005). The Children's Revised Impact of Event Scale (CRIES): Validity as a screening instrument for PTSD. Behavioural and Cognitive Psychotherapy, 33(4), 487–498.",
      url: "https://doi.org/10.1017/s1352465805002419",
    },
    {
      citation:
        "Smith, P., Perrin, S., Dyregrov, A., & Yule, W. (2003). Principal components analysis of the Impact of Event Scale with children in war. Personality and Individual Differences, 34(2), 315–322.",
      url: "https://doi.org/10.1016/s0191-8869(02)00047-8",
    },
    {
      citation:
        "Children and War Foundation. (1998). Children's Revised Impact of Event Scale (CRIES-13), version française.",
      url: "https://www.childrenandwar.org/s/cries_13_French.pdf",
    },
  ],
  apaCitation:
    "Perrin, S., Meiser-Stedman, R., & Smith, P. (2005). The Children's Revised Impact of Event Scale (CRIES): Validity as a screening instrument for PTSD. Behavioural and Cognitive Psychotherapy, 33(4), 487–498. https://doi.org/10.1017/s1352465805002419",

  related: ["traumatismes-pcl5", "scared", "pdi", "pdeq"],

  updatedAt: "2026-10-23",
};

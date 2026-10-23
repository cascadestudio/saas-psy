import type { ScaleGuideContent } from "./types";

/** Sources internes : docs/scales/ecab/ecab.md (fiche et argumentaire HAS 2007). */
export const ecab: ScaleGuideContent = {
  scaleId: "ecab",

  seoTitle: "ECAB (benzodiazépines) : cotation et interprétation | Melya",
  seoDescription:
    "Coter et interpréter l'ECAB, échelle cognitive d'attachement aux benzodiazépines : 10 items vrai/faux, item 10 inversé, seuil de 6 (HAS). Le guide pratique.",
  heading:
    "ECAB : le guide pratique de l'échelle cognitive d'attachement aux benzodiazépines",

  essentials: [
    "L'ECAB évalue en 10 affirmations vrai/faux l'**attachement du patient à son traitement par benzodiazépine** (tranquillisant ou somnifère) ou médicament apparenté.",
    "Le score va de 0 à 10. **Un score ≥ 6 est en faveur d'une dépendance** (sensibilité 94 %, spécificité 81 %).",
    "La HAS la propose pour préparer l'arrêt des benzodiazépines : elle aide à repérer les patients pour qui le sevrage demandera un accompagnement renforcé.",
  ],
  audience: "Adultes traités par benzodiazépines",
  administrationMode: "Auto-questionnaire (vrai/faux)",

  administration: {
    title: "Comment administrer l'ECAB ?",
    body: [
      "Le patient indique si chaque affirmation sur son médicament tranquillisant ou somnifère est vraie ou fausse pour lui. Il doit répondre à toutes les propositions, même s'il n'est pas très sûr de sa réponse. Comptez 2 minutes.",
      "Les items parlent de « ce médicament » : précisez avec le patient de quel traitement il s'agit avant la passation, surtout s'il en prend plusieurs.",
    ],
  },

  scoring: {
    title: "Comment coter l'ECAB ?",
    body: [
      {
        list: [
          "**Items 1 à 9** : 1 point par réponse « vrai ».",
          "**Item 10** : 1 point par réponse « faux » (item inversé).",
        ],
      },
      "Le score total va de 0 à 10. L'inversion de l'item 10 est la principale source d'erreur de cotation manuelle.",
    ],
  },

  interpretation: {
    title: "Comment interpréter le score de l'ECAB ?",
    body: [
      "Le seuil de **6** vient de la fiche de la HAS (2007), d'après l'étude de validation de Pélissolo et Naja :",
      {
        list: [
          "**Score de 0 à 5** : sous le seuil de dépendance.",
          "**Score de 6 à 10** : en faveur d'une dépendance aux benzodiazépines.",
        ],
      },
      "L'ECAB mesure une dépendance **cognitive** : les croyances et l'attachement au médicament. Un score élevé signale que l'arrêt devra être préparé avec le patient (information, diminution progressive, accompagnement), pas qu'il est impossible.",
    ],
  },

  vigilance: {
    title: "Points de vigilance et limites de l'ECAB",
    body: [
      {
        list: [
          "**Elle ne mesure pas la dépendance physique** ni le risque de syndrome de sevrage : l'arrêt des benzodiazépines se fait toujours progressivement, en lien avec le prescripteur.",
          "**L'étude de validation est ancienne et de petite taille** (52 patients) : le seuil reste un repère.",
          "**Le médicament doit être identifié** : un patient qui prend plusieurs traitements peut répondre pour l'un ou pour l'autre.",
        ],
      },
    ],
  },

  followUp: {
    title: "L'ECAB dans le suivi",
    body: [
      "L'ECAB se passe avant d'engager un arrêt, pour adapter l'accompagnement. La repasser en cours de diminution permet de voir si l'attachement au médicament évolue.",
      "Avec Melya, l'ECAB est envoyée par email, cotée automatiquement (inversion de l'item 10 comprise) et chaque passation est conservée dans l'historique du patient.",
    ],
  },

  faq: [
    {
      question: "Quel est le seuil de l'ECAB ?",
      answer:
        "Un score ≥ 6 permet de différencier les patients dépendants des non dépendants (sensibilité 94 %, spécificité 81 %), selon la fiche de la HAS.",
    },
    {
      question: "Quel item de l'ECAB est inversé ?",
      answer:
        "L'item 10 : c'est la réponse « faux » qui vaut 1 point. Pour les items 1 à 9, c'est la réponse « vrai ».",
    },
    {
      question: "L'ECAB est-elle réservée aux personnes âgées ?",
      answer:
        "Non. La fiche de la HAS de 2007 porte sur le patient âgé, mais l'échelle a été validée en psychiatrie générale et s'utilise chez l'adulte.",
    },
    {
      question: "Comment citer l'ECAB ?",
      answer:
        "Pélissolo, A., & Naja, W. J. (1996). Évaluation de la dépendance aux benzodiazépines à l'aide d'une échelle cognitive. Synapse, 131, 37–40.",
    },
  ],

  questionnaire: {
    kind: "link",
    url: "https://www.omedit-grand-est.ars.sante.fr/media/16968/download",
    publisher:
      "l'OMéDIT Grand Est, qui reproduit la fiche de la HAS (« Modalités d'arrêt des benzodiazépines et médicaments apparentés chez le patient âgé », 2007)",
  },
  frenchVersion: {
    summary:
      "L'ECAB a été construite directement en français par Pélissolo et Naja (1996) : il n'y a pas de traduction. Melya reprend la fiche de la HAS (2007), qui en rapporte le seuil et les qualités de dépistage.",
    validated: true,
  },
  sources: [
    {
      citation:
        "Pélissolo, A., & Naja, W. J. (1996). Évaluation de la dépendance aux benzodiazépines à l'aide d'une échelle cognitive. Synapse, 131, 37–40.",
    },
    {
      citation:
        "Haute Autorité de santé. (2007). Modalités d'arrêt des benzodiazépines et médicaments apparentés chez le patient âgé : recommandations et argumentaire.",
      url: "https://www.has-sante.fr/jcms/c_601509/fr/modalites-d-arret-des-benzodiazepines-et-medicaments-apparentes-chez-le-patient-age",
    },
  ],
  apaCitation:
    "Pélissolo, A., & Naja, W. J. (1996). Évaluation de la dépendance aux benzodiazépines à l'aide d'une échelle cognitive. Synapse, 131, 37–40.",

  related: ["audit", "cudit-r", "ftnd", "phq-9"],

  updatedAt: "2026-10-23",
};

import type { ScaleGuideContent } from "./types";

/** Sources internes : docs/scales/adrs/adrs.md. Revah-Lévy 2007 vérifié sur CrossRef le 23/10/2026. */
export const adrs: ScaleGuideContent = {
  scaleId: "adrs",

  seoTitle: "ADRS (dépression de l'adolescent) : cotation | Melya",
  seoDescription:
    "Coter et interpréter l'ADRS, auto-questionnaire de repérage de la dépression de l'adolescent : 10 items vrai/faux, seuils 4 et 7, item 6 sur l'envie de mourir.",
  heading:
    "ADRS : le guide pratique de l'échelle de repérage de la dépression de l'adolescent",

  essentials: [
    "L'ADRS est un auto-questionnaire de 10 phrases vrai/faux pour **repérer un risque de dépression chez l'adolescent**. Il a été construit en français et validé auprès de 402 adolescents francophones.",
    "Le score va de 0 à 10. Les enquêtes nationales françaises distinguent un **risque faible (0-3), modéré (4-6) et important (7-10)**.",
    "Une réponse « vrai » à l'item 6 (envie de mourir) appelle une évaluation du risque suicidaire, quel que soit le score total.",
  ],
  audience: "Adolescents",
  administrationMode: "Auto-questionnaire (vrai/faux)",

  administration: {
    title: "Comment administrer l'ADRS ?",
    body: [
      "L'adolescent répond « vrai » ou « faux » à 10 phrases courtes, écrites dans sa langue (« À l'école, au boulot, j'y arrive pas »). Comptez environ 5 minutes.",
      "Présentez le questionnaire comme une façon de mieux comprendre ce qu'il vit en ce moment, et prévoyez d'en reparler avec lui : c'est souvent une porte d'entrée pour aborder l'humeur.",
      "Une version pour le clinicien existe aussi ; Melya propose la version auto-questionnaire.",
    ],
  },

  scoring: {
    title: "Comment coter l'ADRS ?",
    body: [
      "Chaque réponse « vrai » vaut 1 point. Le score total est le nombre de « vrai », de 0 à 10. Aucun item n'est inversé.",
    ],
  },

  interpretation: {
    title: "Comment interpréter le score de l'ADRS ?",
    body: [
      "Melya utilise les tranches des enquêtes nationales sur la santé des collégiens et lycéens (OFDT, Santé publique France) :",
      {
        list: [
          "**Score de 0 à 3** : niveau de risque faible.",
          "**Score de 4 à 6** : niveau de risque modéré.",
          "**Score de 7 à 10** : risque important de dépression.",
        ],
      },
      "L'étude de validation propose deux seuils : **3** pour repérer une dépression selon le jugement clinique, **4** pour une dépression selon les critères du DSM-IV. Dès 4, une évaluation clinique est donc indiquée.",
      "Quel que soit le score, regardez l'item 6 séparément.",
    ],
  },

  vigilance: {
    title: "Points de vigilance : l'item 6 et les limites de l'ADRS",
    body: [
      "**L'item 6 (« Au fond, quand c'est comme ça, j'ai envie de mourir »)** : toute réponse « vrai » doit conduire à évaluer le risque suicidaire, même si le score total est bas. Melya le signale par une alerte côté praticien.",
      {
        list: [
          "**C'est un outil de repérage**, pas de diagnostic : la dépression de l'adolescent se confirme en entretien, en tenant compte du contexte familial et scolaire.",
          "**Les adolescents peuvent minimiser** ou au contraire répondre sous le coup d'une émotion passagère : croisez avec l'entretien et, si possible, l'avis des parents.",
          "**Certaines sources** proposent d'autres tranches ou reformulent les items : vérifiez la version utilisée avant de comparer des scores.",
        ],
      },
    ],
  },

  followUp: {
    title: "Suivre l'évolution avec l'ADRS",
    body: [
      "L'ADRS est court et adapté à l'adolescent : il peut être repassé au cours du suivi pour objectiver l'évolution, par exemple toutes les 4 à 6 séances.",
      "Avec Melya, l'ADRS est envoyé par email, coté automatiquement avec l'alerte sur l'item 6, et chaque passation est conservée dans l'historique du patient.",
    ],
  },

  faq: [
    {
      question: "Quel est le seuil de l'ADRS ?",
      answer:
        "L'étude de validation propose 3 (dépression selon le jugement clinique) et 4 (dépression selon le DSM-IV). Les enquêtes nationales utilisent les tranches 0-3 (risque faible), 4-6 (modéré) et 7-10 (risque important de dépression).",
    },
    {
      question: "Que faire si l'adolescent répond « vrai » à l'item 6 ?",
      answer:
        "Évaluer le risque suicidaire sans attendre, quel que soit le score total : nature des idées, existence d'un projet, accès aux moyens, entourage et facteurs de protection.",
    },
    {
      question: "L'ADRS est-elle gratuite ?",
      answer:
        "Oui. L'article de validation est publié en accès libre sous licence CC BY : l'échelle peut être utilisée en citant la source. Vous pouvez télécharger l'article depuis cette page.",
    },
    {
      question: "Peut-on faire passer l'ADRS en ligne ?",
      answer:
        "Oui. Avec Melya, vous envoyez l'ADRS à votre patient par email : il y répond en ligne, le score est calculé automatiquement et chaque passation est conservée dans son historique.",
    },
    {
      question: "Comment citer l'ADRS ?",
      answer:
        "Revah-Lévy, A., Birmaher, B., Gasquet, I., & Falissard, B. (2007). The Adolescent Depression Rating Scale (ADRS): A validation study. BMC Psychiatry, 7, 2.",
    },
  ],

  questionnaire: {
    kind: "download",
    file: "/questionnaires/adrs-article-validation.pdf",
    publisher:
      "BMC Psychiatry (article de validation en accès libre, licence CC BY 2.0, items au tableau 2)",
  },
  frenchVersion: {
    summary:
      "L'ADRS a été construite directement en français (Revah-Lévy et al., 2007) et validée dans une étude multicentrique en France, en Belgique et en Suisse : il n'y a pas de traduction. Melya reprend le texte de la publication.",
    validated: true,
  },
  sources: [
    {
      citation:
        "Revah-Lévy, A., Birmaher, B., Gasquet, I., & Falissard, B. (2007). The Adolescent Depression Rating Scale (ADRS): A validation study. BMC Psychiatry, 7, 2.",
      url: "https://doi.org/10.1186/1471-244X-7-2",
    },
    {
      citation:
        "Santé publique France. (2026). La santé mentale et le bien-être des collégiens et lycéens en France hexagonale : enquête EnCLASS 2024.",
      url: "https://www.santepubliquefrance.fr/sites/default/files/cadic_files/documents/spf00006678.pdf",
    },
  ],
  apaCitation:
    "Revah-Lévy, A., Birmaher, B., Gasquet, I., & Falissard, B. (2007). The Adolescent Depression Rating Scale (ADRS): A validation study. BMC Psychiatry, 7, 2. https://doi.org/10.1186/1471-244X-7-2",

  related: ["phq-9", "scared", "cries-13", "rses"],

  updatedAt: "2026-10-23",
};

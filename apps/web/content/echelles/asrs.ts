import type { ScaleGuideContent } from "./types";

/** Sources internes : docs/scales/asrs/asrs.md. Références vérifiées sur PubMed le 23/10/2026. */
export const asrs: ScaleGuideContent = {
  scaleId: "asrs",

  seoTitle: "ASRS v1.1 (TDAH adulte) : cotation et PDF | Melya",
  seoDescription:
    "Coter et interpréter le test de dépistage ASRS v1.1 du TDAH de l'adulte (OMS) : 6 questions, zone grisée, seuil de 4, questionnaire officiel français en PDF.",
  heading: "ASRS v1.1 : le guide pratique du dépistage du TDAH de l'adulte",

  essentials: [
    "L'ASRS v1.1 est le test de dépistage du **trouble déficitaire de l'attention avec ou sans hyperactivité (TDAH) chez l'adulte**, conçu avec l'Organisation mondiale de la santé. Sa version de dépistage compte 6 questions et porte sur les 6 derniers mois.",
    "La cotation est particulière : on compte les réponses dans la **zone grisée** du formulaire. **4 réponses ou plus** indiquent que les symptômes peuvent correspondre à un TDAH et justifient une évaluation clinique.",
    "Le test est gratuit, y compris pour un usage commercial, avec mention de la source.",
  ],
  audience: "Adultes (18 ans et plus)",
  administrationMode: "Auto-questionnaire",

  administration: {
    title: "Comment administrer l'ASRS v1.1 ?",
    body: [
      "Le patient choisit, pour chaque question, la réponse qui décrit le mieux ce qu'il a ressenti et comment il s'est comporté **au cours des 6 derniers mois** : jamais, rarement, quelquefois, souvent ou très souvent. Comptez 2 minutes.",
      "Les 6 questions portent sur la difficulté à finaliser les détails d'un projet, à s'organiser, à se souvenir de ses rendez-vous, la tendance à repousser les tâches exigeantes, à remuer et à se sentir « entraîné par un moteur ».",
      "C'est la partie A d'une échelle en 18 questions. Seule la version de dépistage en 6 questions est en libre accès ; c'est celle que propose Melya.",
    ],
  },

  scoring: {
    title: "Comment coter l'ASRS v1.1 ?",
    body: [
      "On ne fait pas la somme des réponses : on **compte les réponses qui tombent dans la zone grisée** du formulaire.",
      {
        list: [
          "**Questions 1 à 3** : la réponse compte à partir de « quelquefois ».",
          "**Questions 4 à 6** : la réponse compte à partir de « souvent ».",
        ],
      },
      "Le score va donc de 0 à 6. Certaines études utilisent une somme des réponses de 0 à 24 avec d'autres seuils : c'est une variante de recherche, absente du formulaire officiel.",
    ],
  },

  interpretation: {
    title: "Comment interpréter le score de l'ASRS v1.1 ?",
    body: [
      "Selon la règle du formulaire officiel :",
      {
        list: [
          "**Score de 0 à 3** : dépistage négatif.",
          "**Score de 4 à 6** : les symptômes peuvent correspondre à ceux d'un TDAH de l'adulte ; une évaluation clinique est recommandée.",
        ],
      },
      "Les auteurs le rappellent : un diagnostic ne doit jamais reposer sur ce seul score. Le TDAH de l'adulte se diagnostique en entretien, en retrouvant notamment des symptômes présents depuis l'enfance et leur retentissement dans plusieurs domaines de vie.",
    ],
  },

  vigilance: {
    title: "Points de vigilance et limites de l'ASRS",
    body: [
      {
        list: [
          "**Ce n'est pas un outil diagnostique** : il repère des symptômes compatibles, qui peuvent aussi relever d'un trouble anxieux, d'une dépression, d'un trouble du sommeil ou d'une consommation de substances.",
          "**Il porte sur les 6 derniers mois** et ne vérifie pas l'apparition des symptômes dans l'enfance, nécessaire au diagnostic.",
          "**Plusieurs traductions circulent** : seule la version française diffusée par NYU et Harvard est officielle, et sa licence interdit d'en modifier le texte.",
        ],
      },
    ],
  },

  followUp: {
    title: "L'ASRS dans le suivi",
    body: [
      "L'ASRS v1.1 est un outil de dépistage : il se passe en début de prise en charge pour décider d'une évaluation approfondie. Il n'est pas conçu pour mesurer l'évolution des symptômes sous traitement.",
      "Avec Melya, il est envoyé par email, coté automatiquement selon la règle de la zone grisée, et conservé dans l'historique du patient.",
    ],
  },

  faq: [
    {
      question: "Comment interpréter le test ASRS ?",
      answer:
        "Comptez les réponses dans la zone grisée (à partir de « quelquefois » aux questions 1 à 3, de « souvent » aux questions 4 à 6). Quatre réponses ou plus indiquent que les symptômes peuvent correspondre à un TDAH de l'adulte et justifient une évaluation clinique.",
    },
    {
      question: "Que signifie un score de 4 à l'ASRS ?",
      answer:
        "C'est le seuil du dépistage positif : les symptômes peuvent correspondre à un TDAH de l'adulte. Ce n'est pas un diagnostic ; une évaluation clinique est recommandée.",
    },
    {
      question: "Le test ASRS est-il gratuit ?",
      answer:
        "Oui. La version de dépistage en 6 questions est libre d'utilisation, y compris commerciale, avec mention de la source. Vous pouvez télécharger la version française officielle depuis cette page. L'échelle complète en 18 questions est soumise à licence.",
    },
    {
      question: "Quelle différence entre l'ASRS en 6 questions et l'ASRS-18 ?",
      answer:
        "Les 6 questions de dépistage forment la partie A de l'échelle en 18 questions ; ce sont celles qui prédisent le mieux un TDAH. La partie B (12 questions) apporte des informations complémentaires mais n'entre pas dans la règle de dépistage.",
    },
    {
      question: "L'ASRS peut-elle être utilisée chez l'enfant ?",
      answer:
        "Non. L'ASRS v1.1 a été conçue et validée pour les adultes (18 ans et plus). Chez l'enfant et l'adolescent, le TDAH s'évalue avec d'autres outils, en recueillant aussi le point de vue des parents et des enseignants.",
    },
    {
      question: "Peut-on faire passer l'ASRS v1.1 en ligne ?",
      answer:
        "Oui. Avec Melya, vous envoyez l'ASRS v1.1 à votre patient par email : il y répond en ligne, le score est calculé automatiquement et chaque passation est conservée dans son historique.",
    },
    {
      question: "Comment citer l'ASRS ?",
      answer:
        "Kessler, R. C., Adler, L., Ames, M., et al. (2005). The World Health Organization Adult ADHD Self-Report Scale (ASRS): A short screening scale for use in the general population. Psychological Medicine, 35(2), 245–256.",
    },
  ],

  questionnaire: {
    kind: "download",
    file: "/questionnaires/asrs-questionnaire-francais.pdf",
    publisher:
      "New York University et Harvard (version française officielle, © New York University and the President and Fellows of Harvard College)",
  },
  frenchVersion: {
    summary:
      "Melya utilise la version française officielle du test de dépistage, diffusée par le détenteur des droits (NYU), reprise mot pour mot comme l'exige la licence. Ses propriétés ont été étudiées en population française (Caci et al., 2014).",
    validated: true,
  },
  sources: [
    {
      citation:
        "Kessler, R. C., Adler, L., Ames, M., Demler, O., Faraone, S., Hiripi, E., Howes, M. J., Jin, R., Secnik, K., Spencer, T., Ustun, T. B., & Walters, E. E. (2005). The World Health Organization Adult ADHD Self-Report Scale (ASRS): A short screening scale for use in the general population. Psychological Medicine, 35(2), 245–256.",
      url: "https://doi.org/10.1017/s0033291704002892",
    },
    {
      citation:
        "Caci, H. M., Morin, A. J. S., & Tran, A. (2014). Prevalence and correlates of attention deficit hyperactivity disorder in adults from a French community sample. Journal of Nervous and Mental Disease, 202(4), 324–332.",
      url: "https://doi.org/10.1097/NMD.0000000000000126",
    },
    {
      citation:
        "New York University. ASRS v1.1 6-Question Screener, French translation.",
      url: "https://license.tov.med.nyu.edu/product/asrs6Qscreener",
    },
  ],
  apaCitation:
    "Kessler, R. C., Adler, L., Ames, M., Demler, O., Faraone, S., Hiripi, E., Howes, M. J., Jin, R., Secnik, K., Spencer, T., Ustun, T. B., & Walters, E. E. (2005). The World Health Organization Adult ADHD Self-Report Scale (ASRS): A short screening scale for use in the general population. Psychological Medicine, 35(2), 245–256. https://doi.org/10.1017/s0033291704002892",

  related: ["cat-q", "phq-9", "gad-7", "ders"],

  updatedAt: "2026-10-23",
};

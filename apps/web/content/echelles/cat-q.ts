import type { ScaleGuideContent } from "./types";

/** Sources internes : docs/scales/cat-q/cat-q.md. Références vérifiées sur PubMed/CrossRef le 23/10/2026. */
export const catQ: ScaleGuideContent = {
  scaleId: "cat-q",

  seoTitle: "CAT-Q (camouflage autistique) : cotation | Melya",
  seoDescription:
    "Coter et interpréter le CAT-Q, questionnaire de camouflage des traits autistiques : 25 items, items inversés, 3 sous-échelles, pourquoi il n'a pas de seuil.",
  heading:
    "CAT-Q : le guide pratique du questionnaire sur le camouflage des traits autistiques",

  essentials: [
    "Le CAT-Q mesure en 25 items le **recours aux stratégies de camouflage social** chez l'adulte : compenser ses difficultés sociales, masquer ses traits autistiques, s'efforcer de se fondre dans le groupe.",
    "Le score va de 25 à 175, avec 3 sous-échelles. **Plus il est élevé, plus la personne camoufle.**",
    "Les auteurs sont clairs : **il n'existe pas de seuil**, et le CAT-Q n'est pas un outil de dépistage de l'autisme.",
  ],
  audience: "Adultes (16 ans et plus)",
  administrationMode: "Auto-questionnaire",

  administration: {
    title: "Comment administrer le CAT-Q ?",
    body: [
      "La personne indique son degré d'accord avec chaque énoncé en pensant à ses expériences lors d'interactions sociales, de 1 (totalement en désaccord) à 7 (tout à fait d'accord). Comptez 5 à 10 minutes.",
      "Le questionnaire peut être utilisé auprès de personnes autistes ou non : le camouflage social existe aussi en dehors de l'autisme.",
    ],
  },

  scoring: {
    title: "Comment coter le CAT-Q ?",
    body: [
      {
        list: [
          "**Items inversés** : 3, 12, 19, 22 et 24. Recodez-les en 8 − la réponse (1↔7, 2↔6, 3↔5).",
          "**Score total** : somme des 25 items après inversion, de 25 à 175.",
        ],
      },
      "Les 3 sous-échelles :",
      {
        list: [
          "**Compensation** (stratégies pour pallier les difficultés sociales) : items 1, 4, 5, 8, 11, 14, 17, 20, 23.",
          "**Masquage** (cacher ses caractéristiques autistiques) : items 2, 6, 9, 12, 15, 18, 21, 24.",
          "**Assimilation** (s'efforcer de se fondre dans le groupe) : items 3, 7, 10, 13, 16, 19, 22, 25.",
        ],
      },
    ],
  },

  interpretation: {
    title: "Comment interpréter le score du CAT-Q ?",
    body: [
      "**Il n'y a pas de seuil.** Les auteurs de l'échelle précisent qu'il n'existe pas de score seuil et qu'il ne faut pas en appliquer pour classer les personnes en « fort » ou « faible » camouflage (Hannon et al., 2026). Le seuil de 100 qui circule en ligne ne vient pas d'eux.",
      "Le score se lit de façon continue et par sous-échelle : un profil dominé par le masquage n'a pas le même sens clinique qu'un profil dominé par la compensation.",
      "Le CAT-Q aide à **parler du camouflage** avec la personne, de son coût (fatigue, épuisement) et de ses situations ; il ne dit pas si la personne est autiste.",
    ],
  },

  vigilance: {
    title: "Points de vigilance et limites du CAT-Q",
    body: [
      {
        list: [
          "**Ce n'est pas un outil de dépistage de l'autisme** : un score élevé ne signifie pas que la personne est autiste, un score bas ne l'exclut pas.",
          "**Les auteurs déconseillent aussi de l'utiliser pour suivre une intervention**, faute de données sur sa sensibilité au changement.",
          "**Les inversions** sont une source fréquente d'erreur de cotation.",
          "**La traduction utilisée** (Embrace Autism) n'est pas la version validée en français (Bureau et al., 2024).",
        ],
      },
    ],
  },

  followUp: {
    title: "Le CAT-Q dans la prise en charge",
    body: [
      "Le CAT-Q s'utilise surtout comme support d'exploration : il ouvre la discussion sur les situations où la personne camoufle, ce que cela lui coûte et ce qu'elle souhaite changer. Les auteurs ne recommandent pas d'en faire un indicateur de suivi.",
      "Avec Melya, le CAT-Q est envoyé par email ; le score total et les 3 sous-scores sont calculés automatiquement (inversions comprises) et conservés dans l'historique du patient.",
    ],
  },

  faq: [
    {
      question: "Quel est le seuil du CAT-Q ?",
      answer:
        "Il n'y en a pas. Les auteurs précisent qu'il n'existe pas de score seuil et qu'il ne faut pas en appliquer. Le seuil de 100 qui circule en ligne n'est pas publié par eux.",
    },
    {
      question: "Le CAT-Q permet-il de dépister l'autisme ?",
      answer:
        "Non. Il mesure le camouflage social, qui existe chez des personnes autistes et non autistes. Ce n'est pas un outil de dépistage ni de diagnostic.",
    },
    {
      question: "Quels sont les items inversés du CAT-Q ?",
      answer:
        "Les items 3, 12, 19, 22 et 24, qui se recodent en 8 − la réponse avant d'additionner les 25 items.",
    },
    {
      question: "Le CAT-Q existe-t-il en français ?",
      answer:
        "Oui. Une validation française a été publiée (Bureau et al., 2024). Une traduction de Marika B. Bessette est aussi diffusée en accès libre par Embrace Autism.",
    },
    {
      question: "Peut-on faire passer le CAT-Q en ligne ?",
      answer:
        "Oui. Avec Melya, vous envoyez le CAT-Q à votre patient par email : il y répond en ligne, le score est calculé automatiquement et chaque passation est conservée dans son historique.",
    },
    {
      question: "Comment citer le CAT-Q ?",
      answer:
        "Hull, L., Mandy, W., Lai, M.-C., Baron-Cohen, S., Allison, C., Smith, P., & Petrides, K. V. (2019). Development and validation of the Camouflaging Autistic Traits Questionnaire (CAT-Q). Journal of Autism and Developmental Disorders, 49(3), 819–833.",
    },
  ],

  questionnaire: {
    kind: "link",
    url: "https://embrace-autism.com/cat-q-fr/",
    publisher: "Embrace Autism (traduction française de Marika B. Bessette)",
  },
  frenchVersion: {
    summary:
      "Melya utilise la traduction française de Marika B. Bessette, diffusée en accès libre par Embrace Autism. Une version française validée existe (Bureau et al., 2024), mais son texte n'est pas en accès libre ; les deux n'ont pas encore été comparées.",
    validated: false,
    warning:
      "La traduction utilisée n'est pas la version française validée par Bureau et al. (2024).",
  },
  sources: [
    {
      citation:
        "Hull, L., Mandy, W., Lai, M.-C., Baron-Cohen, S., Allison, C., Smith, P., & Petrides, K. V. (2019). Development and validation of the Camouflaging Autistic Traits Questionnaire (CAT-Q). Journal of Autism and Developmental Disorders, 49(3), 819–833.",
      url: "https://doi.org/10.1007/s10803-018-3792-6",
    },
    {
      citation:
        "Bureau, R., Riebel, M., Weiner, L., Coutelle, R., Dachez, J., & Clément, C. (2024). French validation of the Camouflaging Autistic Traits Questionnaire (CAT-Q). Journal of Autism and Developmental Disorders, 54(9), 3549–3558.",
      url: "https://doi.org/10.1007/s10803-023-06048-w",
    },
    {
      citation:
        "Hannon, B., Hull, L., Lai, M.-C., Magiati, I., & Mandy, W. (2026). The use and misuse of the Camouflaging Autistic Traits Questionnaire in autism research and clinical practice: Issues, considerations, and suggestions. Autism in Adulthood.",
      url: "https://doi.org/10.1177/25739581261435868",
    },
  ],
  apaCitation:
    "Hull, L., Mandy, W., Lai, M.-C., Baron-Cohen, S., Allison, C., Smith, P., & Petrides, K. V. (2019). Development and validation of the Camouflaging Autistic Traits Questionnaire (CAT-Q). Journal of Autism and Developmental Disorders, 49(3), 819–833. https://doi.org/10.1007/s10803-018-3792-6",

  related: ["asrs", "hsps", "rses", "gad-7"],

  updatedAt: "2026-10-23",
};

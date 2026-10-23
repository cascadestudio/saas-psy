import type { ScaleGuideContent } from "./types";

/** Sources internes : docs/scales/atq/atq.md. Hollon & Kendall 1980 vérifié sur CrossRef le 23/10/2026. */
export const atq: ScaleGuideContent = {
  scaleId: "atq",

  seoTitle: "QPA (pensées automatiques, ATQ) : cotation | Melya",
  seoDescription:
    "Coter et interpréter le Questionnaire des pensées automatiques (QPA, ATQ-30) : 30 pensées négatives, score de 30 à 150, repères de la version française.",
  heading: "QPA : le guide pratique du questionnaire des pensées automatiques",

  essentials: [
    "Le QPA (Questionnaire des pensées automatiques, ATQ en anglais) évalue la **fréquence de 30 pensées automatiques négatives** typiques de la dépression (« Je ne vaux rien », « Ma vie est un gâchis »…) au cours de la dernière semaine.",
    "Le score va de 30 à 150. Il n'y a pas de seuil, mais la version française publie des repères : **moyenne autour de 96 chez des personnes déprimées, autour de 46 chez des témoins**.",
    "C'est un outil de thérapie cognitive : il objective le discours intérieur négatif et son évolution.",
  ],
  audience: "Adultes",
  administrationMode: "Auto-questionnaire",

  administration: {
    title: "Comment administrer le QPA ?",
    body: [
      "La personne lit chaque pensée et indique avec quelle fréquence elle lui est venue à l'esprit **durant la dernière semaine** : pas du tout (1), parfois (2), assez souvent (3), souvent (4), tout le temps (5). Comptez une quinzaine de minutes.",
    ],
  },

  scoring: {
    title: "Comment coter le QPA ?",
    body: [
      "Le score total est la somme des 30 items, de 30 à 150. Aucun item n'est inversé et il n'y a pas de sous-score.",
    ],
  },

  interpretation: {
    title: "Comment interpréter le score du QPA ?",
    body: [
      "**Il n'y a pas de seuil clinique.** Plus le score est élevé, plus les pensées automatiques négatives sont fréquentes. Les repères de la version française permettent de situer le score :",
      {
        list: [
          "**Personnes déprimées** : moyenne de 95,7 (écart-type 23).",
          "**Personnes témoins** : moyenne de 46,24 (écart-type 12).",
        ],
      },
      "Les réponses item par item sont précieuses en séance : elles donnent les pensées à travailler en restructuration cognitive, avec les mots que le patient reconnaît comme les siens.",
    ],
  },

  vigilance: {
    title: "Points de vigilance et limites du QPA",
    body: [
      {
        list: [
          "**L'item 19 (« Je souhaite disparaître »)** ne déclenche pas d'alerte dans la source, mais une réponse fréquente doit conduire à explorer les idées de mort et le risque suicidaire.",
          "**Il mesure des pensées, pas la sévérité d'une dépression** : associez-le à une échelle de symptômes comme le PHQ-9.",
          "**Les sources en ligne** sont des documents de praticiens reprenant la traduction de Cottraux ; le texte reste à confronter à l'ouvrage de référence.",
        ],
      },
    ],
  },

  followUp: {
    title: "Suivre l'évolution avec le QPA",
    body: [
      "La consigne porte sur la dernière semaine : le QPA peut être repassé au fil de la thérapie cognitive pour voir si les pensées automatiques négatives deviennent moins fréquentes, et lesquelles persistent.",
      "Avec Melya, le QPA est envoyé par email, coté automatiquement, et chaque passation est conservée dans l'historique du patient.",
    ],
  },

  faq: [
    {
      question: "Comment interpréter le score du QPA ?",
      answer:
        "Le score va de 30 à 150, sans seuil clinique. Repères de la version française : 95,7 en moyenne chez des personnes déprimées, 46,24 chez des témoins.",
    },
    {
      question: "Quelle différence entre le QPA et l'ATQ ?",
      answer:
        "C'est le même questionnaire : l'ATQ (Automatic Thoughts Questionnaire) de Hollon et Kendall (1980), traduit en français par Jean Cottraux sous le nom de QPA.",
    },
    {
      question: "Peut-on faire passer le QPA en ligne ?",
      answer:
        "Oui. Avec Melya, vous envoyez le QPA à votre patient par email : il y répond en ligne, le score est calculé automatiquement et chaque passation est conservée dans son historique.",
    },
    {
      question: "Comment citer le QPA ?",
      answer:
        "Hollon, S. D., & Kendall, P. C. (1980). Cognitive self-statements in depression: Development of an automatic thoughts questionnaire. Cognitive Therapy and Research, 4(4), 383–395.",
    },
  ],

  questionnaire: {
    kind: "none",
    reason:
      "Aucune version officielle n'est diffusée publiquement : la traduction de Jean Cottraux est publiée dans ses ouvrages. Melya ne diffuse pas le questionnaire.",
  },
  frenchVersion: {
    summary:
      "Melya utilise la traduction de Jean Cottraux, reprise de deux documents de psychologues concordants. Une validation française a été publiée (Bouvard et al., 1992), dont proviennent probablement les repères ci-dessus ; le texte reste à confronter à l'ouvrage de référence.",
    validated: true,
  },
  sources: [
    {
      citation:
        "Hollon, S. D., & Kendall, P. C. (1980). Cognitive self-statements in depression: Development of an automatic thoughts questionnaire. Cognitive Therapy and Research, 4(4), 383–395.",
      url: "https://doi.org/10.1007/bf01178214",
    },
    {
      citation:
        "Bouvard, M., et al. (1992). Validation française du Questionnaire des pensées automatiques. Journal de thérapie comportementale et cognitive, 2(2), 25–28.",
    },
  ],
  apaCitation:
    "Hollon, S. D., & Kendall, P. C. (1980). Cognitive self-statements in depression: Development of an automatic thoughts questionnaire. Cognitive Therapy and Research, 4(4), 383–395. https://doi.org/10.1007/bf01178214",

  related: ["phq-9", "rses", "ders", "adrs"],

  updatedAt: "2026-10-23",
};

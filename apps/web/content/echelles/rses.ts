import type { ScaleGuideContent } from "./types";

/** Sources internes : docs/scales/rses/rses.md. Références vérifiées sur CrossRef le 23/10/2026. */
export const rses: ScaleGuideContent = {
  scaleId: "rses",

  seoTitle: "Échelle d'estime de soi de Rosenberg : cotation | Melya",
  seoDescription:
    "Coter et interpréter l'échelle d'estime de soi de Rosenberg (RSES) : items inversés, score de 10 à 40, pourquoi il n'y a pas de seuil officiel, suivi.",
  heading:
    "Échelle d'estime de soi de Rosenberg (RSES) : le guide pratique pour les psychologues",

  essentials: [
    "L'échelle de Rosenberg mesure en 10 items l'**estime de soi globale** : la valeur que la personne s'accorde dans son ensemble. C'est l'échelle d'estime de soi la plus utilisée au monde.",
    "Le score va de 10 à 40, après inversion de 5 items. **Plus il est élevé, plus l'estime de soi est élevée.**",
    "Il n'existe pas de seuil validé (« estime de soi faible, moyenne, forte ») : le score se lit de façon continue, et surtout dans le temps.",
  ],
  audience: "Adolescents et adultes",
  administrationMode: "Auto-questionnaire",

  administration: {
    title: "Comment administrer l'échelle de Rosenberg ?",
    body: [
      "Le patient indique à quel point chaque énoncé est vrai pour lui, sur 4 niveaux : tout à fait en désaccord (1), plutôt en désaccord (2), plutôt en accord (3), tout à fait en accord (4). Comptez 2 à 5 minutes.",
      "L'échelle ne porte pas sur une période précise : elle évalue la manière dont la personne se perçoit en général. Elle se passe sur papier ou en ligne.",
    ],
  },

  scoring: {
    title: "Comment coter l'échelle de Rosenberg ?",
    body: [
      "Cinq énoncés sont formulés positivement et cinq négativement (« Parfois je me sens vraiment inutile »). Il faut inverser les négatifs avant d'additionner :",
      {
        list: [
          "**Items inversés** : 3, 5, 8, 9 et 10. Recodez-les en 5 − la réponse (1↔4, 2↔3).",
          "**Score total** : somme des 10 items après inversion, de 10 à 40.",
        ],
      },
      "L'échelle est unidimensionnelle : il n'y a pas de sous-score. La répartition en 5 items positifs et 5 négatifs sert à limiter les biais de réponse, pas à calculer deux scores séparés.",
    ],
  },

  interpretation: {
    title: "Comment interpréter le score de l'échelle de Rosenberg ?",
    body: [
      "**La validation française ne propose aucun seuil**, et une étude menée dans 53 pays confirme qu'il n'existe pas de seuil universel. Melya affiche donc le score brut, sans catégorie.",
      "Vous trouverez en ligne des grilles du type « moins de 25 : estime de soi très faible… plus de 39 : très forte ». Elles circulent sur des sites grand public, mais aucune source scientifique ne les fonde : évitez de les présenter au patient comme un résultat.",
      "Pour interpréter un score :",
      {
        list: [
          "**Situez-le sur l'étendue de 10 à 40** : un score proche de 10 traduit une estime de soi très basse, un score proche de 40 une estime de soi très haute.",
          "**Regardez les réponses item par item** : elles montrent sur quoi porte la dévalorisation (sentiment d'inutilité, d'échec, manque de respect pour soi…).",
          "**Comparez le patient à lui-même** : c'est l'évolution du score au fil du suivi qui est la plus informative.",
        ],
      },
    ],
  },

  vigilance: {
    title: "Points de vigilance et limites",
    body: [
      {
        list: [
          "**Oublier les inversions** est l'erreur la plus fréquente : un score calculé sans inversion n'a aucun sens.",
          "**Elle mesure une estime de soi globale**, pas l'estime de soi dans un domaine précis (travail, apparence, relations).",
          "**L'estime de soi varie selon les cultures** : les moyennes diffèrent nettement d'un pays à l'autre.",
          "Une estime de soi très basse peut accompagner une dépression : si le tableau le suggère, complétez par une échelle de dépression comme le PHQ-9.",
        ],
      },
    ],
  },

  followUp: {
    title: "Suivre l'évolution avec l'échelle de Rosenberg",
    body: [
      "Faute de seuils, le suivi est le meilleur usage clinique de l'échelle : la validation française a montré une bonne stabilité dans le temps, ce qui rend les changements interprétables.",
      {
        list: [
          "**À quelle fréquence ?** Comme elle évalue une perception générale de soi, des passations espacées (début, milieu et fin de prise en charge) suffisent.",
          "**Regardez quels items bougent** : la progression porte souvent d'abord sur certains énoncés avant de se refléter dans le total.",
        ],
      },
      "Avec Melya, l'échelle est envoyée par email, les inversions sont appliquées automatiquement et chaque passation est conservée dans l'historique du patient.",
    ],
  },

  faq: [
    {
      question: "Qu'est-ce que l'estime de soi selon Rosenberg ?",
      answer:
        "Rosenberg (1965) définit l'estime de soi comme une attitude, positive ou négative, envers soi-même : la valeur globale que la personne s'accorde. C'est cette estime de soi globale que mesure son échelle, et non l'estime de soi dans un domaine précis.",
    },
    {
      question: "Comment interpréter le score de l'échelle de Rosenberg ?",
      answer:
        "Le score va de 10 à 40 : plus il est élevé, plus l'estime de soi est élevée. Il n'existe pas de seuil validé, ni dans la validation française ni au niveau international. Interprétez-le de façon continue et suivez son évolution.",
    },
    {
      question: "Quels sont les items inversés de l'échelle de Rosenberg ?",
      answer:
        "Les items 3, 5, 8, 9 et 10, formulés négativement. Ils se recodent en 5 − la réponse avant d'additionner les 10 items.",
    },
    {
      question:
        "Les grilles « estime de soi faible, moyenne, forte » sont-elles fiables ?",
      answer:
        "Non. Les grilles qui circulent en ligne (moins de 25, 25 à 31, etc.) ne reposent sur aucune étude publiée. La validation française de Vallières et Vallerand (1990) ne propose aucun seuil.",
    },
    {
      question:
        "Peut-on utiliser l'échelle de Rosenberg avec des adolescents ?",
      answer:
        "Oui, elle est utilisée chez l'adolescent comme chez l'adulte. Les mêmes précautions s'appliquent : pas de seuil, lecture continue et suivi dans le temps.",
    },
    {
      question: "Où trouver l'échelle de Rosenberg en français ?",
      answer:
        "La version française validée de Vallières et Vallerand (1990) est diffusée par le laboratoire des auteurs (UQAM) : le lien figure dans la section des sources, en bas de page.",
    },
    {
      question: "Peut-on utiliser l'échelle de Rosenberg avec des enfants ?",
      answer:
        "Elle a été construite auprès de lycéens et s'utilise chez l'adolescent et l'adulte. Chez l'enfant plus jeune, la compréhension de certains énoncés n'est pas garantie et elle n'a pas de validation française pour cet âge : préférez un outil conçu pour l'enfant.",
    },
    {
      question: "Peut-on faire passer l'échelle de Rosenberg en ligne ?",
      answer:
        "Oui. Avec Melya, vous envoyez l'échelle de Rosenberg à votre patient par email : il y répond en ligne, le score est calculé automatiquement et chaque passation est conservée dans son historique.",
    },
    {
      question: "Comment citer l'échelle de Rosenberg ?",
      answer:
        "Citez Rosenberg (1965) pour l'échelle originale et Vallières et Vallerand (1990) pour la version française.",
    },
  ],

  questionnaire: {
    kind: "link",
    url: "https://www.lrcs.uqam.ca/wp-content/uploads/2017/08/ees_en.pdf",
    publisher:
      "le Laboratoire de recherche sur le comportement social de l'UQAM, laboratoire des auteurs de la version française",
  },
  frenchVersion: {
    summary:
      "Melya utilise la traduction de Vallières et Vallerand (1990), seule version française avec une validation psychométrique publiée (quatre études : cohérence interne, structure factorielle, stabilité dans le temps). C'est une version canadienne-française ; la traduction de Chambon (1992), aux libellés quasi identiques, n'a pas de validation publiée.",
    validated: true,
  },
  sources: [
    {
      citation:
        "Rosenberg, M. (1965). Society and the adolescent self-image. Princeton University Press.",
    },
    {
      citation:
        "Vallières, É. F., & Vallerand, R. J. (1990). Traduction et validation canadienne-française de l'Échelle de l'Estime de Soi de Rosenberg. International Journal of Psychology, 25(2), 305–316.",
      url: "https://doi.org/10.1080/00207599008247865",
    },
    {
      citation:
        "Schmitt, D. P., & Allik, J. (2005). Simultaneous administration of the Rosenberg Self-Esteem Scale in 53 nations: Exploring the universal and culture-specific features of global self-esteem. Journal of Personality and Social Psychology, 89(4), 623–642.",
      url: "https://doi.org/10.1037/0022-3514.89.4.623",
    },
  ],
  apaCitation:
    "Vallières, É. F., & Vallerand, R. J. (1990). Traduction et validation canadienne-française de l'Échelle de l'Estime de Soi de Rosenberg. International Journal of Psychology, 25(2), 305–316. https://doi.org/10.1080/00207599008247865",

  related: ["edi", "phq-9", "atq"],

  updatedAt: "2026-10-23",
};

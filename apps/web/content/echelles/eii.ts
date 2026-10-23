import type { ScaleGuideContent } from "./types";

/** Sources internes : docs/scales/ius/eii.md. Références vérifiées sur PubMed/CrossRef le 23/10/2026. */
export const eii: ScaleGuideContent = {
  scaleId: "eii",

  seoTitle: "Échelle d'intolérance à l'incertitude (ÉII) | Melya",
  seoDescription:
    "Coter et interpréter l'échelle d'intolérance à l'incertitude (ÉII / IUS) de Freeston et Dugas : 27 items, score de 27 à 135, deux facteurs, usage dans le TAG.",
  heading:
    "Échelle d'intolérance à l'incertitude (ÉII) : le guide pratique pour les psychologues",

  essentials: [
    "L'ÉII mesure en 27 items les **réactions face à l'incertitude** : ce que la personne ressent, pense et fait devant les situations ambiguës et l'avenir imprévisible.",
    "L'intolérance à l'incertitude est un mécanisme central du **trouble anxieux généralisé (TAG)** dans le modèle de Dugas, ce qui en fait une cible de la TCC du TAG.",
    "Le score va de 27 à 135 ; il n'existe pas de seuil clinique établi. C'est l'instrument original, conçu en français ; la version anglaise (IUS) en est dérivée.",
  ],
  audience: "Adultes",
  administrationMode: "Auto-questionnaire",

  administration: {
    title: "Comment administrer l'ÉII ?",
    body: [
      "Le patient indique jusqu'à quel point chaque énoncé lui correspond, de 1 (pas du tout correspondant) à 5 (tout à fait correspondant). Comptez 5 à 10 minutes.",
      "L'échelle ne porte pas sur une période précise : elle évalue une manière habituelle de réagir à l'incertitude. Certaines formulations sont québécoises (« Lorsque c'est le temps d'agir ») : elles appartiennent à la version validée et sont conservées.",
    ],
  },

  scoring: {
    title: "Comment coter l'ÉII ?",
    body: [
      "Le score total est la somme des 27 items, de 27 à 135. Aucun item n'est inversé.",
      "L'échelle peut aussi se coter en deux facteurs (Sexton et Dugas, 2009) :",
      {
        list: [
          "**Facteur 1 — l'incertitude a des implications négatives sur la perception de soi et les comportements** : 15 items (1, 2, 3, 9, 12, 13, 14, 15, 16, 17, 20, 22, 23, 24, 25), de 15 à 75.",
          "**Facteur 2 — l'incertitude est injuste et gâche tout** : 12 items (4, 5, 6, 7, 8, 10, 11, 18, 19, 21, 26, 27), de 12 à 60.",
        ],
      },
    ],
  },

  interpretation: {
    title: "Comment interpréter le score de l'ÉII ?",
    body: [
      "**Il n'existe pas de seuil clinique établi** pour l'ÉII à 27 items : la fiche de cotation des auteurs n'en propose pas. Melya affiche donc le score brut : plus il est élevé, plus l'intolérance à l'incertitude est marquée.",
      "Pour l'interpréter :",
      {
        list: [
          "**Situez-le sur l'étendue de 27 à 135** et comparez-le au tableau clinique (inquiétudes, recherche de réassurance, évitement des situations incertaines).",
          "**Regardez les deux facteurs** : un facteur 1 élevé oriente vers le doute de soi et l'inhibition face à l'incertitude, un facteur 2 élevé vers le sentiment que l'incertitude est injuste et insupportable.",
          "**Comparez le patient à lui-même** au fil de la prise en charge : c'est l'usage le plus informatif.",
        ],
      },
    ],
  },

  vigilance: {
    title: "Points de vigilance et limites",
    body: [
      {
        list: [
          "**Pas de seuil** : évitez de qualifier un score de « normal » ou « pathologique » sans référence publiée.",
          "**Elle mesure un processus, pas un trouble** : une intolérance élevée à l'incertitude se retrouve dans le TAG, mais aussi dans d'autres troubles anxieux, le TOC et la dépression.",
          "**Version courte** : une version anglaise à 12 items (IUS-12) est très utilisée en recherche ; ses scores ne sont pas comparables à ceux de l'ÉII-27.",
        ],
      },
    ],
  },

  followUp: {
    title: "Suivre l'évolution avec l'ÉII",
    body: [
      "Dans la TCC du TAG selon le modèle de Dugas, l'intolérance à l'incertitude est une cible directe de l'intervention : suivre l'ÉII permet de vérifier que le travail porte sur ce mécanisme.",
      "Des passations espacées (début, mi-parcours, fin de prise en charge) suffisent. Avec Melya, l'ÉII est envoyée par email ; vous recevez le score total et les deux facteurs, et chaque passation est conservée dans l'historique du patient.",
    ],
  },

  extraSections: [
    {
      title: "ÉII, IUS ou IUS-12 ?",
      body: [
        "L'ÉII (Freeston et al., 1994) est l'original francophone à 27 items. L'IUS est sa traduction anglaise (Buhr et Dugas, 2002). L'IUS-12 est une version courte anglaise (Carleton et al., 2007), avec une structure en deux facteurs différente. Melya propose l'ÉII originale.",
      ],
    },
  ],

  faq: [
    {
      question:
        "Comment interpréter le score de l'échelle d'intolérance à l'incertitude ?",
      answer:
        "Le score va de 27 à 135 : plus il est élevé, plus l'intolérance à l'incertitude est marquée. Il n'existe pas de seuil clinique établi pour l'ÉII-27 ; on l'interprète en lien avec le tableau clinique et dans le temps.",
    },
    {
      question: "Quelle différence entre l'ÉII et l'IUS ?",
      answer:
        "C'est le même instrument : l'ÉII est l'original en français (Freeston et al., 1994), l'IUS sa version anglaise. L'IUS-12 est une version courte en anglais.",
    },
    {
      question: "Quel lien entre intolérance à l'incertitude et TAG ?",
      answer:
        "Dans le modèle de Dugas, l'intolérance à l'incertitude alimente les inquiétudes excessives du trouble anxieux généralisé. Elle est une cible directe de la thérapie cognitive et comportementale du TAG.",
    },
    {
      question: "Comment citer l'ÉII ?",
      answer:
        "Freeston, M. H., Rhéaume, J., Letarte, H., Dugas, M. J., & Ladouceur, R. (1994). Why do people worry? Personality and Individual Differences, 17(6), 791–802.",
    },
  ],

  questionnaire: {
    kind: "link",
    url: "https://uqo.ca/sites/default/files/fichiers-uqo/anxiete/eii.pdf",
    publisher:
      "le laboratoire des auteurs (Université du Québec en Outaouais), avec la fiche de cotation",
  },
  frenchVersion: {
    summary:
      "L'ÉII a été construite directement en français (Freeston et al., 1994) : il n'y a pas de traduction. Melya reprend mot pour mot le formulaire du laboratoire des auteurs, formulations québécoises comprises.",
    validated: true,
  },
  sources: [
    {
      citation:
        "Freeston, M. H., Rhéaume, J., Letarte, H., Dugas, M. J., & Ladouceur, R. (1994). Why do people worry? Personality and Individual Differences, 17(6), 791–802.",
      url: "https://doi.org/10.1016/0191-8869(94)90048-5",
    },
    {
      citation:
        "Sexton, K. A., & Dugas, M. J. (2009). Defining distinct negative beliefs about uncertainty: Validating the factor structure of the Intolerance of Uncertainty Scale. Psychological Assessment, 21(2), 176–186.",
      url: "https://doi.org/10.1037/a0015827",
    },
    {
      citation:
        "Buhr, K., & Dugas, M. J. (2002). The Intolerance of Uncertainty Scale: Psychometric properties of the English version. Behaviour Research and Therapy, 40(8), 931–945.",
      url: "https://doi.org/10.1016/s0005-7967(01)00092-4",
    },
    {
      citation:
        "Carleton, R. N., Norton, M. A., & Asmundson, G. J. G. (2007). Fearing the unknown: A short version of the Intolerance of Uncertainty Scale. Journal of Anxiety Disorders, 21(1), 105–117.",
      url: "https://doi.org/10.1016/j.janxdis.2006.03.014",
    },
  ],
  apaCitation:
    "Freeston, M. H., Rhéaume, J., Letarte, H., Dugas, M. J., & Ladouceur, R. (1994). Why do people worry? Personality and Individual Differences, 17(6), 791–802. https://doi.org/10.1016/0191-8869(94)90048-5",

  related: ["qips", "gad-7", "qia", "qap"],

  updatedAt: "2026-10-23",
};

import type { ScaleGuideContent } from "./types";

/** Sources internes : docs/scales/ders/ders.md. Références vérifiées sur CrossRef le 23/10/2026. */
export const ders: ScaleGuideContent = {
  scaleId: "ders",

  seoTitle: "DERS (régulation émotionnelle) : cotation | Melya",
  seoDescription:
    "Coter et interpréter la DERS-F, échelle des difficultés de régulation émotionnelle : 36 items, 11 items inversés, 6 sous-échelles, version française validée.",
  heading:
    "DERS : le guide pratique de l'échelle des difficultés de régulation émotionnelle",

  essentials: [
    "La DERS évalue en 36 items les **difficultés de régulation émotionnelle**, selon six dimensions : non-acceptation des émotions, difficulté à poursuivre ses buts, contrôle des impulsions, conscience et clarté émotionnelles, accès aux stratégies de régulation.",
    "Le score total va de 36 à 180 après inversion de 11 items : **plus il est élevé, plus les difficultés sont importantes**.",
    "C'est un outil transdiagnostique, très utilisé en TCC et en thérapie comportementale dialectique ; il n'a pas de seuil clinique publié.",
  ],
  audience: "Adultes",
  administrationMode: "Auto-questionnaire",

  administration: {
    title: "Comment administrer la DERS ?",
    body: [
      "La personne indique à quelle fréquence chaque énoncé s'applique à elle : presque jamais (1), quelques fois (2), la moitié du temps (3), la plupart du temps (4), presque toujours (5). Comptez environ 10 minutes.",
      "Melya utilise la version française validée à Genève (DERS-F, Dan-Glauser et Scherer, 2013).",
    ],
  },

  scoring: {
    title: "Comment coter la DERS ?",
    body: [
      {
        list: [
          "**Items inversés** : 1, 2, 6, 7, 8, 10, 17, 20, 22, 24 et 34. Recodez-les en 6 − la réponse (1↔5, 2↔4).",
          "**Score total** : somme des 36 items après inversion, de 36 à 180.",
        ],
      },
      "Les 6 sous-échelles (Gratz et Roemer, 2004) :",
      {
        list: [
          "**Non-acceptation** des réactions émotionnelles : items 11, 12, 21, 23, 25, 29.",
          "**Buts** (difficulté à adopter des comportements orientés vers un but) : items 13, 18, 20, 26, 33.",
          "**Impulsions** (difficulté à contrôler ses impulsions) : items 3, 14, 19, 24, 27, 32.",
          "**Conscience** émotionnelle (manque de) : items 2, 6, 8, 10, 17, 34.",
          "**Stratégies** (accès limité aux stratégies de régulation) : items 15, 16, 22, 28, 30, 31, 35, 36.",
          "**Clarté** émotionnelle (manque de) : items 1, 4, 5, 7, 9.",
        ],
      },
      "La fiche française ne donne pas de clé de cotation ; Melya applique celle de la version originale, dont l'ordre des items et la structure en 6 facteurs sont confirmés par la validation française.",
    ],
  },

  interpretation: {
    title: "Comment interpréter le score de la DERS ?",
    body: [
      "**Il n'y a pas de seuil clinique** publié par les auteurs. Le score total se lit de façon continue : plus il est élevé, plus les difficultés de régulation sont importantes.",
      "Le profil des sous-échelles est le plus utile en clinique : il montre si la difficulté porte plutôt sur la compréhension des émotions (conscience, clarté), leur acceptation, ou leur gestion (impulsions, stratégies, buts). Chacun de ces profils appelle un travail différent.",
    ],
  },

  vigilance: {
    title: "Points de vigilance et limites de la DERS",
    body: [
      {
        list: [
          "**Les 11 items inversés** sont une source fréquente d'erreur de cotation manuelle, en particulier dans la sous-échelle « conscience », dont presque tous les items sont inversés.",
          "**Pas de seuil** : comparez la personne à elle-même plutôt qu'à une norme.",
          "**Plusieurs versions courtes** existent (DERS-16, DERS-18) : leurs scores ne sont pas comparables à la DERS en 36 items.",
        ],
      },
    ],
  },

  followUp: {
    title: "Suivre l'évolution avec la DERS",
    body: [
      "La DERS est utilisée pour suivre les prises en charge centrées sur la régulation émotionnelle. Des passations en début, milieu et fin de prise en charge suffisent, en suivant les sous-échelles ciblées par le travail thérapeutique.",
      "Avec Melya, la DERS est envoyée par email ; le score total et les 6 sous-scores sont calculés automatiquement (inversions comprises), et chaque passation est conservée dans l'historique du patient.",
    ],
  },

  faq: [
    {
      question: "Comment coter la DERS ?",
      answer:
        "Inversez les items 1, 2, 6, 7, 8, 10, 17, 20, 22, 24 et 34, puis additionnez les 36 items (score de 36 à 180). Les 6 sous-échelles se calculent sur leurs items respectifs.",
    },
    {
      question: "La DERS a-t-elle un seuil ?",
      answer:
        "Non, aucun seuil clinique n'est publié par les auteurs. On l'interprète de façon continue et par le profil des sous-échelles.",
    },
    {
      question: "Quelle différence entre la DERS et la DERS-F ?",
      answer:
        "La DERS-F est la version française validée de la DERS (Dan-Glauser et Scherer, 2013, Université de Genève), avec les mêmes 36 items et la même structure en 6 facteurs.",
    },
    {
      question: "Comment citer la DERS ?",
      answer:
        "Citez Gratz et Roemer (2004) pour l'échelle et Dan-Glauser et Scherer (2013) pour la version française.",
    },
  ],

  questionnaire: {
    kind: "link",
    url: "https://www.unige.ch/cisa/application/files/1614/6719/2002/DERS-FSept2012_0.pdf",
    publisher: "l'Université de Genève (version française validée, DERS-F)",
  },
  frenchVersion: {
    summary:
      "Melya utilise la DERS-F, version française validée par Dan-Glauser et Scherer (2013) et diffusée par l'Université de Genève. Deux coquilles du document source sont corrigées. Une autre traduction, québécoise, existe (Côté et al., 2013).",
    validated: true,
  },
  sources: [
    {
      citation:
        "Gratz, K. L., & Roemer, L. (2004). Multidimensional assessment of emotion regulation and dysregulation: Development, factor structure, and initial validation of the Difficulties in Emotion Regulation Scale. Journal of Psychopathology and Behavioral Assessment, 26(1), 41–54.",
      url: "https://doi.org/10.1023/b:joba.0000007455.08539.94",
    },
    {
      citation:
        "Dan-Glauser, E. S., & Scherer, K. R. (2013). The Difficulties in Emotion Regulation Scale (DERS): Factor structure and consistency of a French translation. Swiss Journal of Psychology, 72(1), 5–11.",
      url: "https://doi.org/10.1024/1421-0185/a000093",
    },
  ],
  apaCitation:
    "Gratz, K. L., & Roemer, L. (2004). Multidimensional assessment of emotion regulation and dysregulation: Development, factor structure, and initial validation of the Difficulties in Emotion Regulation Scale. Journal of Psychopathology and Behavioral Assessment, 26(1), 41–54. https://doi.org/10.1023/b:joba.0000007455.08539.94",

  related: ["ffmq", "phq-9", "gad-7", "atq"],

  updatedAt: "2026-10-23",
};

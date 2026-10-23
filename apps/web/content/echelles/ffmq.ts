import type { ScaleGuideContent } from "./types";

/** Sources internes : docs/scales/ffmq/ffmq.md. Références vérifiées sur PubMed/CrossRef le 23/10/2026. */
export const ffmq: ScaleGuideContent = {
  scaleId: "ffmq",

  seoTitle: "FFMQ (pleine conscience) : cotation et facettes | Melya",
  seoDescription:
    "Coter et interpréter le FFMQ, questionnaire des cinq facettes de la pleine conscience : 39 items, 19 inversés, 5 facettes et score global, version française.",
  heading:
    "FFMQ : le guide pratique du questionnaire des cinq facettes de la pleine conscience",

  essentials: [
    "Le FFMQ mesure en 39 items la **pleine conscience au quotidien**, selon cinq facettes : observer, décrire son expérience, agir en conscience, ne pas juger ses expériences intérieures et ne pas y réagir automatiquement.",
    "Chaque facette a son score, et le score global va de 39 à 195. Ici, **plus le score est élevé, mieux c'est** : il traduit une pleine conscience plus marquée.",
    "Sa version française a été validée par Heeren et al. (2011) ; il n'a pas de seuil clinique.",
  ],
  audience: "Adultes",
  administrationMode: "Auto-questionnaire",

  administration: {
    title: "Comment administrer le FFMQ ?",
    body: [
      "La personne évalue à quel point chaque énoncé est vrai pour elle en général, de 1 (jamais ou très rarement vrai) à 5 (très souvent ou toujours vrai). Comptez une dizaine de minutes.",
    ],
  },

  scoring: {
    title: "Comment coter le FFMQ ?",
    body: [
      "**19 items sont inversés** : 3, 5, 8, 10, 12, 13, 14, 16, 17, 18, 22, 23, 25, 28, 30, 34, 35, 38 et 39. Recodez-les en 6 − la réponse (1↔5, 2↔4).",
      "Chaque facette est la somme de ses items :",
      {
        list: [
          "**Observation** : items 1, 6, 11, 15, 20, 26, 31, 36.",
          "**Description de l'expérience** : items 2, 7, 12, 16, 22, 27, 32, 37.",
          "**Action en pleine conscience** : items 5, 8, 13, 18, 23, 28, 34, 38.",
          "**Non-réactivité aux événements intérieurs** : items 4, 9, 19, 21, 24, 29, 33.",
          "**Non-jugement** : items 3, 10, 14, 17, 25, 30, 35, 39.",
        ],
      },
      "Le score global additionne les cinq facettes (39 à 195).",
    ],
  },

  interpretation: {
    title: "Comment interpréter le FFMQ ?",
    body: [
      "**Il n'y a pas de seuil clinique** publié. Plus un score est élevé, plus la facette correspondante est développée.",
      "Le profil des facettes est plus parlant que le score global : un patient peut bien observer ses expériences intérieures mais les juger durement, ou agir en pilote automatique tout en étant peu réactif. Le profil oriente le travail (par exemple vers l'acceptation plutôt que l'observation).",
      "La facette « observation » se comporte différemment chez les personnes qui méditent et chez celles qui ne méditent pas : interprétez-la avec prudence chez un patient sans pratique.",
    ],
  },

  vigilance: {
    title: "Points de vigilance et limites du FFMQ",
    body: [
      {
        list: [
          "**19 items inversés** : c'est près de la moitié de l'échelle, et la première source d'erreur de cotation manuelle.",
          "**Un score élevé est favorable** : attention à ne pas l'interpréter à l'envers par habitude des échelles de symptômes.",
          "**Version courte** : un FFMQ en 15 items existe ; ses scores ne se comparent pas à la version en 39 items.",
        ],
      },
    ],
  },

  followUp: {
    title: "Suivre l'évolution avec le FFMQ",
    body: [
      "Le FFMQ est souvent utilisé avant et après un programme fondé sur la pleine conscience (MBCT, MBSR, ACT) pour objectiver l'évolution de chaque facette.",
      "Avec Melya, il est envoyé par email ; les 5 facettes et le score global sont calculés automatiquement (inversions comprises), et chaque passation est conservée dans l'historique du patient.",
    ],
  },

  faq: [
    {
      question: "Comment coter le FFMQ ?",
      answer:
        "Inversez les 19 items formulés négativement (6 − la réponse), puis additionnez les items de chaque facette. Le score global est la somme des 5 facettes, de 39 à 195.",
    },
    {
      question: "Le FFMQ a-t-il un seuil ?",
      answer:
        "Non, aucun seuil clinique n'est publié. On l'interprète par le profil des facettes et dans le temps.",
    },
    {
      question: "Le FFMQ existe-t-il en français ?",
      answer:
        "Oui, il a été adapté et validé en français par Heeren et al. (2011) ; le questionnaire est diffusé par le laboratoire de l'Université catholique de Louvain.",
    },
    {
      question: "Existe-t-il une version courte du FFMQ ?",
      answer:
        "Oui : le FFMQ-SF en 24 items (Bohlmeijer et al., 2011) et le FFMQ-15 (Gu et al., 2016). Leurs scores ne se comparent pas à ceux de la version en 39 items, que propose Melya.",
    },
    {
      question: "Peut-on faire passer le FFMQ en ligne ?",
      answer:
        "Oui. Avec Melya, vous envoyez le FFMQ à votre patient par email : il y répond en ligne, le score est calculé automatiquement et chaque passation est conservée dans son historique.",
    },
    {
      question: "Comment citer le FFMQ ?",
      answer:
        "Citez Baer et al. (2006, 2008) pour l'échelle et Heeren et al. (2011) pour la version française.",
    },
  ],

  questionnaire: {
    kind: "link",
    url: "https://www.uclep.be/pdf/FFMQ_scale.pdf",
    publisher:
      "le laboratoire de psychopathologie expérimentale de l'Université catholique de Louvain, avec la clé de cotation",
  },
  frenchVersion: {
    summary:
      "Melya utilise l'adaptation française validée par Heeren et al. (2011), diffusée par le laboratoire des auteurs à l'Université catholique de Louvain.",
    validated: true,
  },
  sources: [
    {
      citation:
        "Baer, R. A., Smith, G. T., Hopkins, J., Krietemeyer, J., & Toney, L. (2006). Using self-report assessment methods to explore facets of mindfulness. Assessment, 13(1), 27–45.",
      url: "https://doi.org/10.1177/1073191105283504",
    },
    {
      citation:
        "Baer, R. A., Smith, G. T., Lykins, E., Button, D., Krietemeyer, J., Sauer, S., Walsh, E., Duggan, D., & Williams, J. M. G. (2008). Construct validity of the Five Facet Mindfulness Questionnaire in meditating and nonmeditating samples. Assessment, 15(3), 329–342.",
      url: "https://doi.org/10.1177/1073191107313003",
    },
    {
      citation:
        "Heeren, A., Douilliez, C., Peschard, V., Debrauwere, L., & Philippot, P. (2011). Cross-cultural validity of the Five Facets Mindfulness Questionnaire: Adaptation and validation in a French-speaking sample. European Review of Applied Psychology, 61(3), 147–151.",
      url: "https://doi.org/10.1016/j.erap.2011.02.001",
    },
    {
      citation:
        "Bohlmeijer, E., ten Klooster, P. M., Fledderus, M., Veehof, M., & Baer, R. (2011). Psychometric properties of the Five Facet Mindfulness Questionnaire in depressed adults and development of a short form. Assessment, 18(3), 308–320.",
      url: "https://doi.org/10.1177/1073191111408231",
    },
    {
      citation:
        "Gu, J., Strauss, C., Crane, C., Barnhofer, T., Karl, A., Cavanagh, K., & Kuyken, W. (2016). Examining the factor structure of the 39-item and 15-item versions of the Five Facet Mindfulness Questionnaire before and after mindfulness-based cognitive therapy for people with recurrent depression. Psychological Assessment, 28(7), 791–802.",
      url: "https://doi.org/10.1037/pas0000263",
    },
  ],
  apaCitation:
    "Heeren, A., Douilliez, C., Peschard, V., Debrauwere, L., & Philippot, P. (2011). Cross-cultural validity of the Five Facets Mindfulness Questionnaire: Adaptation and validation in a French-speaking sample. European Review of Applied Psychology, 61(3), 147–151. https://doi.org/10.1016/j.erap.2011.02.001",

  related: ["ders", "eii", "gad-7", "phq-9"],

  updatedAt: "2026-10-23",
};

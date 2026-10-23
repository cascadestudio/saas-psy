import type { ScaleGuideContent } from "./types";

/** Sources internes : docs/scales/waq-qia/qia.md (formulaire et fiche de cotation UQO). */
export const qia: ScaleGuideContent = {
  scaleId: "qia",

  seoTitle: "QIA (inquiétude et anxiété, WAQ) : cotation | Melya",
  seoDescription:
    "Coter et interpréter le QIA (WAQ) de Dugas : thèmes d'inquiétude, items cotés de 0 à 8, score sur 80 et cotation par critères du trouble anxieux généralisé.",
  heading:
    "QIA : le guide pratique du questionnaire sur l'inquiétude et l'anxiété",

  essentials: [
    "Le QIA (Questionnaire sur l'inquiétude et l'anxiété, WAQ en anglais) évalue la **présence et la sévérité des symptômes du trouble anxieux généralisé (TAG)** sur les 6 derniers mois, en suivant ses critères diagnostiques.",
    "Le patient liste d'abord ses thèmes d'inquiétude, puis cote de 0 à 8 le caractère excessif, la fréquence et le contrôle des inquiétudes, 6 sensations physiques et l'interférence avec sa vie. Le score va de 0 à 80.",
    "Son interprétation repose surtout sur une **cotation par critères** qui repère un profil compatible avec le TAG.",
  ],
  audience: "Adultes",
  administrationMode: "Auto-questionnaire",

  administration: {
    title: "Comment administrer le QIA ?",
    body: [
      "La période de référence est de **6 derniers mois**, celle du critère de durée du TAG. Le patient commence par lister les sujets qui l'inquiètent le plus souvent (question ouverte, non cotée), puis répond aux autres questions sur une échelle de 0 à 8, ancrée aux points 0, 4 et 8. Comptez environ 5 minutes.",
      "Les thèmes listés sont précieux pour l'entretien : ils montrent si les inquiétudes portent sur des sujets variés, ce qui est caractéristique du TAG.",
    ],
  },

  scoring: {
    title: "Comment coter le QIA ?",
    body: [
      "**Score total** : somme des items cotés de 0 à 8, de 0 à 80. La question 1 (thèmes d'inquiétude) n'est pas cotée.",
      "**Cotation par critères** (fiche de cotation des auteurs). Une réponse compte quand elle est cotée **4 ou plus** :",
      {
        list: [
          "**Thèmes** : au moins un thème d'inquiétude rapporté.",
          "**Critère cognitif** : les questions 2, 3 et 4 (caractère excessif, fréquence, difficulté à contrôler) cotées 4 ou plus.",
          "**Critère somatique** : au moins 3 des 6 sensations physiques cotées 4 ou plus.",
          "**Interférence** : la question 6 cotée 4 ou plus.",
        ],
      },
      "Quand les quatre conditions sont réunies, le profil est compatible avec un TAG.",
    ],
  },

  interpretation: {
    title: "Comment interpréter les résultats du QIA ?",
    body: [
      "La fiche des auteurs ne donne **pas de seuil sur le score total** : Melya l'affiche sans catégorie (plus il est élevé, plus la symptomatologie est marquée). L'interprétation clinique passe par les critères :",
      {
        list: [
          "**Les quatre critères remplis** : profil compatible avec un TAG, à confirmer en entretien.",
          "**Critère cognitif seul** : inquiétudes excessives et difficiles à contrôler, sans retentissement somatique suffisant.",
          "**Critère somatique seul** : tension physique marquée, sans le versant cognitif typique du TAG.",
        ],
      },
      "Le score total est surtout utile pour suivre l'évolution d'un même patient.",
    ],
  },

  vigilance: {
    title: "Points de vigilance et limites du QIA",
    body: [
      {
        list: [
          "**Il ne pose pas de diagnostic** : un profil compatible avec le TAG se confirme en entretien, en éliminant notamment les autres troubles anxieux et une cause médicale.",
          "**La période de 6 mois** le rend peu sensible aux changements rapides.",
          "**Les sensations physiques** (agitation, fatigue, tension musculaire…) peuvent avoir une cause somatique.",
        ],
      },
    ],
  },

  followUp: {
    title: "Suivre l'évolution avec le QIA",
    body: [
      "Le QIA se passe en début de prise en charge pour objectiver le profil TAG, puis à intervalles espacés pour suivre l'évolution du score total et des critères.",
      "Avec Melya, le QIA est envoyé par email ; le score total et la grille de critères sont calculés automatiquement, et chaque passation est conservée dans l'historique du patient.",
    ],
  },

  faq: [
    {
      question: "Comment coter le QIA ?",
      answer:
        "Le score total additionne les items cotés de 0 à 8 (la question 1 n'est pas cotée), de 0 à 80. La cotation par critères vérifie au moins un thème d'inquiétude, les questions 2, 3, 4 et 6 cotées 4 ou plus, et au moins 3 sensations physiques sur 6 cotées 4 ou plus.",
    },
    {
      question: "Le QIA a-t-il un seuil ?",
      answer:
        "Pas sur le score total. L'interprétation repose sur la cotation par critères, qui repère un profil compatible avec un trouble anxieux généralisé.",
    },
    {
      question: "Quelle différence entre le QIA et le WAQ ?",
      answer:
        "C'est le même questionnaire : le QIA est l'original en français (Dugas et al., 2001), le WAQ (Worry and Anxiety Questionnaire) sa version anglaise.",
    },
    {
      question: "Peut-on faire passer le QIA en ligne ?",
      answer:
        "Oui. Avec Melya, vous envoyez le QIA à votre patient par email : il y répond en ligne, le score est calculé automatiquement et chaque passation est conservée dans son historique.",
    },
    {
      question: "Comment citer le QIA ?",
      answer:
        "Dugas, M. J., Freeston, M. H., Provencher, M. D., Lachance, S., Ladouceur, R., & Gosselin, P. (2001). Le Questionnaire sur l'Inquiétude et l'Anxiété : validation dans des échantillons non cliniques et cliniques. Journal de Thérapie Comportementale et Cognitive, 11(1), 31–36.",
    },
  ],

  questionnaire: {
    kind: "link",
    url: "https://uqo.ca/sites/default/files/fichiers-uqo/anxiete/qia.pdf",
    publisher:
      "le laboratoire des auteurs (Université du Québec en Outaouais), avec la fiche de cotation",
  },
  frenchVersion: {
    summary:
      "Le QIA a été construit directement en français par Dugas et al. (2001), puis validé dans des échantillons non cliniques et cliniques : il n'y a pas de traduction. Melya reprend le formulaire du laboratoire des auteurs, adapté à la passation en ligne (un seul champ pour les thèmes d'inquiétude).",
    validated: true,
  },
  sources: [
    {
      citation:
        "Dugas, M. J., Freeston, M. H., Provencher, M. D., Lachance, S., Ladouceur, R., & Gosselin, P. (2001). Le Questionnaire sur l'Inquiétude et l'Anxiété : validation dans des échantillons non cliniques et cliniques. Journal de Thérapie Comportementale et Cognitive, 11(1), 31–36.",
    },
  ],
  apaCitation:
    "Dugas, M. J., Freeston, M. H., Provencher, M. D., Lachance, S., Ladouceur, R., & Gosselin, P. (2001). Le Questionnaire sur l'Inquiétude et l'Anxiété : validation dans des échantillons non cliniques et cliniques. Journal de Thérapie Comportementale et Cognitive, 11(1), 31–36.",

  related: ["gad-7", "qips", "eii", "qcs-tag"],

  updatedAt: "2026-10-23",
};

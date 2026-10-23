import type { ScaleGuideContent } from "./types";

/** Sources internes : docs/scales/qap/qap.md. Dugas 2007 vérifié sur PubMed le 23/10/2026. */
export const qap: ScaleGuideContent = {
  scaleId: "qap",

  seoTitle: "QAP (attitude face aux problèmes) : cotation | Melya",
  seoDescription:
    "Coter et interpréter le Questionnaire d'attitude face aux problèmes (QAP) : 12 items, score de 12 à 60, orientation négative aux problèmes dans le TAG.",
  heading:
    "QAP : le guide pratique du questionnaire d'attitude face aux problèmes",

  essentials: [
    "Le QAP évalue en 12 items l'**orientation négative face aux problèmes** de la vie quotidienne : percevoir les problèmes comme des menaces, douter de sa capacité à les résoudre, se sentir vite frustré.",
    "Cette attitude est l'un des mécanismes qui entretiennent le **trouble anxieux généralisé (TAG)** dans le modèle de Dugas.",
    "Le score va de 12 à 60 ; les auteurs ne fournissent pas de seuil clinique.",
  ],
  audience: "Adultes",
  administrationMode: "Auto-questionnaire",

  administration: {
    title: "Comment administrer le QAP ?",
    body: [
      "Le patient indique jusqu'à quel point chaque énoncé correspond à sa façon de réagir ou de penser quand il est confronté à un problème (santé, disputes, manque de temps…), de 1 (pas du tout correspondant) à 5 (extrêmement correspondant). Comptez 3 à 5 minutes.",
    ],
  },

  scoring: {
    title: "Comment coter le QAP ?",
    body: [
      "Selon la fiche des auteurs, le QAP est une **mesure unifactorielle sans item inversé** : le score total est la somme des 12 items, de 12 à 60. Il n'y a pas de sous-score.",
    ],
  },

  interpretation: {
    title: "Comment interpréter le score du QAP ?",
    body: [
      "**Il n'y a pas de seuil clinique** fourni par les auteurs. Plus le score est élevé, plus l'orientation face aux problèmes est négative.",
      "Le QAP mesure une **attitude**, pas une compétence : un patient peut savoir résoudre ses problèmes et pourtant les vivre comme menaçants et douter de lui. C'est cette attitude que cible la TCC du TAG, avant l'entraînement à la résolution de problèmes.",
    ],
  },

  vigilance: {
    title: "Points de vigilance et limites",
    body: [
      {
        list: [
          "**Pas de seuil** : comparez le patient à lui-même plutôt qu'à une norme.",
          "**Il ne mesure pas l'anxiété** : associez-le à une mesure des inquiétudes (PSWQ) ou de l'anxiété (GAD-7).",
        ],
      },
    ],
  },

  followUp: {
    title: "Suivre l'évolution avec le QAP",
    body: [
      "Repasser le QAP avant et après le travail sur l'orientation aux problèmes permet de vérifier que l'attitude du patient a évolué.",
      "Avec Melya, le QAP est envoyé par email, coté automatiquement, et chaque passation est conservée dans l'historique du patient.",
    ],
  },

  faq: [
    {
      question: "Que mesure le Questionnaire d'attitude face aux problèmes ?",
      answer:
        "L'orientation négative face aux problèmes : la tendance à les percevoir comme des menaces, à douter de sa capacité à les résoudre et à se sentir frustré quand ils surviennent.",
    },
    {
      question: "Le QAP a-t-il un seuil ?",
      answer:
        "Non, les auteurs ne fournissent pas de seuil clinique. Le score se lit de façon continue et dans le temps.",
    },
    {
      question: "Peut-on faire passer le QAP en ligne ?",
      answer:
        "Oui. Avec Melya, vous envoyez le QAP à votre patient par email : il y répond en ligne, le score est calculé automatiquement et chaque passation est conservée dans son historique.",
    },
    {
      question: "Comment citer le QAP ?",
      answer:
        "Gosselin, P., Ladouceur, R., & Pelletier, O. (2005). Évaluation de l'attitude d'un individu face aux différents problèmes de vie : le Questionnaire d'attitude face aux problèmes (QAP). Journal de thérapie comportementale et cognitive, 15(4), 141–153.",
    },
  ],

  questionnaire: {
    kind: "link",
    url: "https://uqo.ca/sites/default/files/fichiers-uqo/anxiete/qap.pdf",
    publisher:
      "le laboratoire de Michel Dugas (Université du Québec en Outaouais), avec la fiche de cotation",
  },
  frenchVersion: {
    summary:
      "Le QAP a été construit directement en français (Gosselin, Ladouceur et Pelletier, 2005) : il n'y a pas de traduction. Melya reprend le formulaire du laboratoire des auteurs, en corrigeant deux coquilles typographiques.",
    validated: true,
  },
  sources: [
    {
      citation:
        "Gosselin, P., Ladouceur, R., & Pelletier, O. (2005). Évaluation de l'attitude d'un individu face aux différents problèmes de vie : le Questionnaire d'attitude face aux problèmes (QAP). Journal de thérapie comportementale et cognitive, 15(4), 141–153.",
    },
    {
      citation:
        "Dugas, M. J., Savard, P., Gaudet, A., Turcotte, J., Laugesen, N., Robichaud, M., Francis, K., & Koerner, N. (2007). Can the components of a cognitive model predict the severity of generalized anxiety disorder? Behavior Therapy, 38(2), 169–178.",
      url: "https://doi.org/10.1016/j.beth.2006.07.002",
    },
  ],
  apaCitation:
    "Gosselin, P., Ladouceur, R., & Pelletier, O. (2005). Évaluation de l'attitude d'un individu face aux différents problèmes de vie : le Questionnaire d'attitude face aux problèmes (QAP). Journal de thérapie comportementale et cognitive, 15(4), 141–153.",

  related: ["eii", "psi-ii", "qec", "qips"],

  updatedAt: "2026-10-23",
};

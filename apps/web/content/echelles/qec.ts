import type { ScaleGuideContent } from "./types";

/** Sources internes : docs/scales/qec/qec.md. Sexton 2008 vérifié sur PubMed le 23/10/2026. */
export const qec: ScaleGuideContent = {
  scaleId: "qec",

  seoTitle: "QEC (évitement cognitif) : cotation et sous-échelles | Melya",
  seoDescription:
    "Coter et interpréter le Questionnaire d'évitement cognitif (QEC) : 25 items, 5 stratégies d'évitement (suppression, distraction…), usage dans le TAG.",
  heading: "QEC : le guide pratique du questionnaire d'évitement cognitif",

  essentials: [
    "Le QEC évalue en 25 items les **stratégies d'évitement cognitif** : tout ce que la personne fait pour ne pas penser à ce qui l'inquiète (supprimer ses pensées, se distraire, éviter ce qui les déclenche…).",
    "Dans le modèle de Dugas, ces stratégies entretiennent les inquiétudes du **trouble anxieux généralisé (TAG)**.",
    "Le score total va de 25 à 125, avec 5 sous-échelles. Les auteurs ne fournissent pas de seuil clinique.",
  ],
  audience: "Adolescents et adultes",
  administrationMode: "Auto-questionnaire",

  administration: {
    title: "Comment administrer le QEC ?",
    body: [
      "Le patient indique jusqu'à quel point chaque énoncé correspond à sa façon de réagir à certaines pensées, de 1 (pas du tout correspondant) à 5 (tout à fait correspondant). Comptez 5 à 10 minutes. Le QEC a été validé auprès d'adultes et d'adolescents.",
    ],
  },

  scoring: {
    title: "Comment coter le QEC ?",
    body: [
      "Le score total est la somme des 25 items, de 25 à 125 (fiche des auteurs). Les 5 sous-échelles comptent 5 items chacune (de 5 à 25) :",
      {
        list: [
          "**Suppression de pensées** : items 1, 2, 5, 6, 14.",
          "**Substitution de pensées** : items 4, 11, 17, 20, 25.",
          "**Distraction** : items 8, 10, 12, 13, 21.",
          "**Évitement des stimuli menaçants** : items 7, 9, 16, 18, 22.",
          "**Transformation des images en pensées** : items 3, 15, 19, 23, 24.",
        ],
      },
    ],
  },

  interpretation: {
    title: "Comment interpréter le QEC ?",
    body: [
      "**Il n'y a pas de seuil clinique** fourni par les auteurs. Plus le score est élevé, plus le patient recourt à l'évitement cognitif.",
      "Le profil des sous-échelles est le plus utile : il montre quelles stratégies le patient utilise (par exemple beaucoup de suppression et de distraction, peu d'évitement des situations), ce qui oriente le travail d'exposition cognitive.",
      "La sous-échelle « transformation des images en pensées » renvoie à l'idée que l'inquiétude verbale permet d'éviter des images mentales plus angoissantes : un score élevé est un point à explorer dans le TAG.",
    ],
  },

  vigilance: {
    title: "Points de vigilance et limites",
    body: [
      {
        list: [
          "**Pas de seuil** : comparez le patient à lui-même.",
          "**Certaines stratégies sont adaptatives** dans certaines situations (se distraire n'est pas toujours un problème) : c'est leur usage rigide face aux inquiétudes qui pose problème.",
        ],
      },
    ],
  },

  followUp: {
    title: "Suivre l'évolution avec le QEC",
    body: [
      "Repasser le QEC au fil de la TCC montre si le patient réduit son recours à l'évitement cognitif, en particulier après le travail d'exposition aux scénarios d'inquiétude.",
      "Avec Melya, le QEC est envoyé par email ; le score total et les 5 sous-scores sont calculés automatiquement, et chaque passation est conservée dans l'historique du patient.",
    ],
  },

  faq: [
    {
      question: "Que mesure le Questionnaire d'évitement cognitif ?",
      answer:
        "Cinq stratégies pour ne pas penser à ce qui inquiète : suppression de pensées, substitution de pensées, distraction, évitement des stimuli menaçants et transformation des images en pensées.",
    },
    {
      question: "Le QEC a-t-il un seuil ?",
      answer:
        "Non, les auteurs ne fournissent pas de seuil clinique. On l'interprète par le profil des sous-échelles et dans le temps.",
    },
    {
      question: "Quelle différence entre le QEC et le CAQ ?",
      answer:
        "C'est le même questionnaire : le QEC est l'original en français (Gosselin et al., 2002), le Cognitive Avoidance Questionnaire (CAQ) sa traduction anglaise (Sexton et Dugas, 2008).",
    },
    {
      question: "Comment citer le QEC ?",
      answer:
        "Gosselin, P., Langlois, F., Freeston, M. H., Ladouceur, R., Dugas, M. J., & Pelletier, O. (2002). Le Questionnaire d'évitement cognitif (QEC) : développement et validation auprès d'adultes et d'adolescents. Journal de thérapie comportementale et cognitive, 12, 24–37.",
    },
  ],

  questionnaire: {
    kind: "link",
    url: "https://uqo.ca/sites/default/files/fichiers-uqo/anxiete/qec.pdf",
    publisher:
      "le laboratoire de Michel Dugas (Université du Québec en Outaouais), avec la fiche de cotation",
  },
  frenchVersion: {
    summary:
      "Le QEC a été construit directement en français et validé auprès d'adultes et d'adolescents (Gosselin et al., 2002) : il n'y a pas de traduction. Melya reprend le formulaire du laboratoire des auteurs.",
    validated: true,
  },
  sources: [
    {
      citation:
        "Gosselin, P., Langlois, F., Freeston, M. H., Ladouceur, R., Dugas, M. J., & Pelletier, O. (2002). Le Questionnaire d'évitement cognitif (QEC) : développement et validation auprès d'adultes et d'adolescents. Journal de thérapie comportementale et cognitive, 12, 24–37.",
    },
    {
      citation:
        "Sexton, K. A., & Dugas, M. J. (2008). The Cognitive Avoidance Questionnaire: Validation of the English translation. Journal of Anxiety Disorders, 22(3), 355–370.",
      url: "https://doi.org/10.1016/j.janxdis.2007.04.005",
    },
  ],
  apaCitation:
    "Gosselin, P., Langlois, F., Freeston, M. H., Ladouceur, R., Dugas, M. J., & Pelletier, O. (2002). Le Questionnaire d'évitement cognitif (QEC) : développement et validation auprès d'adultes et d'adolescents. Journal de thérapie comportementale et cognitive, 12, 24–37.",

  related: ["eii", "psi-ii", "qap", "qips"],

  updatedAt: "2026-10-23",
};

import type { ScaleGuideContent } from "./types";

/** Sources internes : docs/scales/ww-ii/psi-ii.md. Dugas 2007 vérifié sur PubMed le 23/10/2026. */
export const psiII: ScaleGuideContent = {
  scaleId: "psi-ii",

  seoTitle: "PSI-II (Pourquoi s'inquiéter) : cotation | Melya",
  seoDescription:
    "Coter et interpréter le questionnaire Pourquoi s'inquiéter-II (PSI-II, WW-II) : 25 items, 5 croyances sur l'inquiétude, usage dans la TCC du TAG.",
  heading:
    "PSI-II : le guide pratique du questionnaire Pourquoi s'inquiéter-II",

  essentials: [
    "Le PSI-II évalue en 25 items les **croyances positives à l'égard des inquiétudes** : l'idée que s'inquiéter aide à résoudre les problèmes, motive, protège des émotions difficiles, prévient les malheurs ou montre qu'on est quelqu'un de bien.",
    "Ces croyances entretiennent les inquiétudes du **trouble anxieux généralisé (TAG)** dans le modèle de Dugas : les repérer permet de les travailler en thérapie.",
    "Le score total va de 25 à 125, avec 5 sous-scores. Les auteurs ne fournissent pas de seuil clinique.",
  ],
  audience: "Adultes",
  administrationMode: "Auto-questionnaire",

  administration: {
    title: "Comment administrer le PSI-II ?",
    body: [
      "Le patient pense aux moments où il s'inquiète et indique jusqu'à quel point chaque énoncé lui semble vrai, de 1 (pas du tout vrai) à 5 (tout à fait). Comptez 5 à 10 minutes.",
      "C'est un instrument original francophone, conçu au Québec : certaines formulations sont québécoises (« une personne qui voit à ses affaires ») et appartiennent à la version validée.",
    ],
  },

  scoring: {
    title: "Comment coter le PSI-II ?",
    body: [
      "La fiche de cotation des auteurs définit 5 sous-échelles de 5 items (de 5 à 25 chacune) :",
      {
        list: [
          "**S'inquiéter aide à résoudre les problèmes** : items 3, 5, 9, 14, 21.",
          "**S'inquiéter aide à se motiver** : items 8, 15, 16, 18, 19.",
          "**S'inquiéter protège des émotions difficiles si un événement s'avère négatif** : items 2, 4, 13, 22, 23.",
          "**S'inquiéter en soi prévient les événements négatifs** : items 6, 11, 17, 20, 24.",
          "**S'inquiéter est un trait de personnalité positif** : items 1, 7, 10, 12, 25.",
        ],
      },
      "Melya affiche aussi un score total (somme des 25 items, de 25 à 125). Ce total n'est pas défini par la fiche des auteurs : ce sont les sous-scores qui guident le travail clinique.",
    ],
  },

  interpretation: {
    title: "Comment interpréter le PSI-II ?",
    body: [
      "**Il n'y a pas de seuil clinique** fourni par les auteurs. L'intérêt du PSI-II est de montrer **quelles croyances** dominent chez le patient :",
      {
        list: [
          "Une sous-échelle nettement plus élevée que les autres indique la croyance à cibler en priorité (par exemple « s'inquiéter prévient les malheurs »).",
          "Comparez les sous-scores entre eux et dans le temps, plutôt qu'à une norme.",
        ],
      },
    ],
  },

  vigilance: {
    title: "Points de vigilance et limites",
    body: [
      {
        list: [
          "**Pas de seuil** : ne qualifiez pas un score de « pathologique » sans référence publiée.",
          "**Le score total** est un ajout de Melya pour le suivi ; la fiche des auteurs raisonne en sous-échelles.",
          "**Il mesure des croyances, pas des symptômes** : associez-le à une mesure de l'inquiétude (PSWQ) ou de l'anxiété (GAD-7).",
        ],
      },
    ],
  },

  followUp: {
    title: "Suivre l'évolution avec le PSI-II",
    body: [
      "Dans la TCC du TAG, la remise en question des croyances positives sur l'inquiétude est une étape du traitement : repasser le PSI-II avant et après ce travail montre si les croyances ciblées ont évolué.",
      "Avec Melya, le PSI-II est envoyé par email ; le score total et les 5 sous-scores sont calculés automatiquement, et chaque passation est conservée dans l'historique du patient.",
    ],
  },

  faq: [
    {
      question: "Que mesure le questionnaire Pourquoi s'inquiéter ?",
      answer:
        "Les croyances positives à l'égard des inquiétudes, en 5 dimensions : s'inquiéter aiderait à résoudre les problèmes, à se motiver, à se protéger des émotions difficiles, à prévenir les malheurs, et serait un trait de personnalité positif.",
    },
    {
      question: "Le PSI-II a-t-il un seuil ?",
      answer:
        "Non, les auteurs ne fournissent pas de seuil clinique. Il s'interprète en comparant les sous-scores entre eux et dans le temps.",
    },
    {
      question: "Quelle différence entre le PSI-II et le WW-II ?",
      answer:
        "C'est le même questionnaire : le PSI-II est l'original en français (Gosselin et al., 2003), le Why Worry-II (WW-II) son équivalent anglais.",
    },
    {
      question: "Comment citer le PSI-II ?",
      answer:
        "Gosselin, P., Ladouceur, R., Langlois, F., Freeston, M. H., Dugas, M. J., & Bertrand, J. (2003). Développement et validation d'un nouvel instrument évaluant les croyances erronées à l'égard des inquiétudes. Revue européenne de psychologie appliquée, 53(3–4), 199–211.",
    },
  ],

  questionnaire: {
    kind: "link",
    url: "https://uqo.ca/sites/default/files/fichiers-uqo/anxiete/psi-ii.pdf",
    publisher:
      "le laboratoire de Michel Dugas (Université du Québec en Outaouais), avec la fiche de cotation",
  },
  frenchVersion: {
    summary:
      "Le PSI-II a été construit directement en français (Gosselin et al., 2003) : il n'y a pas de traduction. Melya reprend mot pour mot le formulaire du laboratoire des auteurs, formulations québécoises comprises.",
    validated: true,
  },
  sources: [
    {
      citation:
        "Gosselin, P., Ladouceur, R., Langlois, F., Freeston, M. H., Dugas, M. J., & Bertrand, J. (2003). Développement et validation d'un nouvel instrument évaluant les croyances erronées à l'égard des inquiétudes. Revue européenne de psychologie appliquée, 53(3–4), 199–211.",
    },
    {
      citation:
        "Dugas, M. J., Savard, P., Gaudet, A., Turcotte, J., Laugesen, N., Robichaud, M., Francis, K., & Koerner, N. (2007). Can the components of a cognitive model predict the severity of generalized anxiety disorder? Behavior Therapy, 38(2), 169–178.",
      url: "https://doi.org/10.1016/j.beth.2006.07.002",
    },
  ],
  apaCitation:
    "Gosselin, P., Ladouceur, R., Langlois, F., Freeston, M. H., Dugas, M. J., & Bertrand, J. (2003). Développement et validation d'un nouvel instrument évaluant les croyances erronées à l'égard des inquiétudes. Revue européenne de psychologie appliquée, 53(3–4), 199–211.",

  related: ["eii", "qap", "qec", "qips"],

  updatedAt: "2026-10-23",
};

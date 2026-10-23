import type { ScaleGuideContent } from "./types";

/** Sources internes : docs/scales/audit/audit.md. Références vérifiées sur PubMed le 23/10/2026. */
export const audit: ScaleGuideContent = {
  scaleId: "audit",

  seoTitle: "Test AUDIT (alcool) : cotation et interprétation | Melya",
  seoDescription:
    "Coter et interpréter le test AUDIT de l'OMS : score sur 40, seuils français de mésusage (6 femme, 7 homme) et de dépendance (> 12), AUDIT-C et suivi.",
  heading:
    "Test AUDIT : le guide pratique du repérage des troubles liés à l'alcool",

  essentials: [
    "L'AUDIT est le questionnaire de l'OMS pour repérer une **consommation d'alcool à risque, nocive ou une dépendance** sur les 12 derniers mois. 10 questions, 2 à 3 minutes.",
    "Le score va de 0 à 40. Selon la Société française d'alcoologie, **un score ≥ 7 chez l'homme et ≥ 6 chez la femme évoque un mésusage**, et un score > 12 est en faveur d'une dépendance.",
    "Les 3 premières questions portent sur la consommation, les 3 suivantes sur les signes de dépendance, les 4 dernières sur les conséquences.",
  ],
  audience: "Adultes",
  administrationMode: "Auto-questionnaire",

  administration: {
    title: "Comment administrer le test AUDIT ?",
    body: [
      "La consigne porte sur les **12 derniers mois**, pas seulement sur les dernières semaines : rappelez-le au patient, surtout si sa consommation a changé récemment.",
      "Les questions 2 et 3 comptent des **verres standard**. En France, un verre standard contient 10 g d'alcool pur : un verre de vin (10 cl), un demi de bière (25 cl) ou une dose de spiritueux (3 cl) servis au bar. Montrer ces équivalences améliore la fiabilité des réponses.",
      "L'AUDIT se passe en auto-questionnaire ou en entretien. Pour qu'il soit honnête, présentez-le comme une question de santé, sans jugement.",
    ],
  },

  scoring: {
    title: "Comment coter le test AUDIT ?",
    body: [
      "Aucun item n'est inversé :",
      {
        list: [
          "**Questions 1 à 8** : de 0 à 4 points.",
          "**Questions 9 et 10** : 0 (non), 2 (oui, mais pas au cours de l'année) ou 4 (oui, au cours de l'année).",
        ],
      },
      "Le score total va de 0 à 40. Les questions se regroupent en trois domaines : consommation (1 à 3), signes de dépendance (4 à 6) et conséquences de la consommation (7 à 10). Un score élevé aux questions 4 à 6 oriente vers une dépendance, même si le total reste modéré.",
      "Attention à la question 10 : une traduction française ancienne demande si un proche s'est inquiété **et** a conseillé de réduire. L'original anglais dit « ou » ; Melya suit la formulation correcte de l'OFDT, pour ne pas faire perdre de points au patient.",
    ],
  },

  interpretation: {
    title: "Comment interpréter le score du test AUDIT ?",
    body: [
      "Melya utilise les seuils de la Société française d'alcoologie (2015), diffusés par l'OFDT :",
      {
        list: [
          "**Score de 0 à 5** : pas d'élément en faveur d'un mésusage actuel.",
          "**Score de 6 (femme) ou 7 (homme) à 12** : évocateur d'un mésusage actuel d'alcool.",
          "**Score supérieur à 12** : en faveur d'une dépendance à l'alcool.",
        ],
      },
      "Le seuil de mésusage dépend du sexe. L'interprétation affichée commence à 6, le seuil le plus sensible : **chez un homme, un score de 6 reste sous le seuil**.",
      "Les seuils internationaux de l'OMS sont un peu différents (consommation à risque à partir de 8). Un score positif ne pose pas de diagnostic : il ouvre une discussion sur la consommation et, si besoin, une évaluation addictologique.",
    ],
  },

  vigilance: {
    title: "Points de vigilance et limites de l'AUDIT",
    body: [
      {
        list: [
          "**La sous-déclaration** est fréquente, surtout si le patient craint d'être jugé. Un score bas n'exclut pas un problème si le tableau clinique le suggère.",
          "**Les verres standard** sont souvent mal estimés : un verre servi à la maison contient fréquemment plus de 10 g d'alcool.",
          "**La période de 12 mois** peut masquer un changement récent, dans un sens comme dans l'autre.",
          "**Un score > 12** justifie de proposer une orientation vers une consultation spécialisée en addictologie.",
        ],
      },
    ],
  },

  followUp: {
    title: "Suivre l'évolution avec l'AUDIT",
    body: [
      "L'AUDIT porte sur 12 mois : il est conçu pour le repérage plus que pour un suivi rapproché.",
      {
        list: [
          "**Repasser l'AUDIT complet** a du sens à intervalles longs (6 à 12 mois), par exemple pour objectiver un changement durable.",
          "**Pour un suivi plus fréquent**, l'AUDIT-C (les 3 premières questions, centrées sur la consommation) est souvent utilisé.",
        ],
      },
      "Avec Melya, l'AUDIT est envoyé par email, coté automatiquement, et chaque passation est conservée dans l'historique du patient.",
    ],
  },

  extraSections: [
    {
      title: "AUDIT ou AUDIT-C ?",
      body: [
        "L'AUDIT-C reprend les 3 premières questions de l'AUDIT, sur la fréquence et la quantité de consommation. Il est plus rapide mais ne renseigne ni les signes de dépendance ni les conséquences. L'AUDIT complet reste préférable pour une première évaluation en consultation.",
      ],
    },
  ],

  faq: [
    {
      question: "Quel est le score seuil du test AUDIT ?",
      answer:
        "En France (Société française d'alcoologie, 2015) : un score ≥ 7 chez l'homme et ≥ 6 chez la femme évoque un mésusage actuel d'alcool ; un score > 12 est en faveur d'une dépendance.",
    },
    {
      question: "Que signifie un score de 10 au test AUDIT ?",
      answer:
        "Un score de 10 dépasse le seuil de mésusage chez l'homme comme chez la femme, sans atteindre le seuil de dépendance (> 12). Il justifie d'aborder la consommation avec le patient. Regardez aussi les questions 4 à 6, qui portent sur les signes de dépendance.",
    },
    {
      question: "Le test AUDIT est-il gratuit ?",
      answer:
        "Oui, l'OMS autorise son utilisation sans frais, avec mention de la source. La version française est diffusée par l'OMS (auditscreen.org) et par l'OFDT.",
    },
    {
      question: "Quelle est la différence entre l'AUDIT et l'AUDIT-C ?",
      answer:
        "L'AUDIT-C ne comprend que les 3 premières questions de l'AUDIT, sur la consommation. L'AUDIT complet évalue aussi les signes de dépendance et les conséquences de la consommation.",
    },
    {
      question: "Combien de grammes d'alcool dans un verre standard ?",
      answer:
        "En France, un verre standard contient 10 g d'alcool pur : un verre de vin de 10 cl, un demi de bière de 25 cl ou 3 cl de spiritueux, tels que servis au bar.",
    },
    {
      question: "Comment citer le test AUDIT ?",
      answer:
        "Citez Saunders et al. (1993) pour l'instrument de l'OMS et Gache et al. (2005) pour la validation de la version française.",
    },
  ],

  questionnaire: {
    kind: "link",
    url: "https://www.ofdt.fr/sites/ofdt/files/2024-06/audit_vf_28-02-19.pdf",
    publisher:
      "l'Observatoire français des drogues et des tendances addictives (OFDT), avec les seuils de la Société française d'alcoologie",
  },
  frenchVersion: {
    summary:
      "Melya reprend la version française officielle de l'OMS (auditscreen.org), validée par Gache et al. (2005). Les quelques coquilles du document source et l'erreur de traduction de la question 10 (« et » au lieu de « ou ») sont corrigées à partir de la version de l'OFDT.",
    validated: true,
  },
  sources: [
    {
      citation:
        "Saunders, J. B., Aasland, O. G., Babor, T. F., de la Fuente, J. R., & Grant, M. (1993). Development of the Alcohol Use Disorders Identification Test (AUDIT): WHO collaborative project on early detection of persons with harmful alcohol consumption–II. Addiction, 88(6), 791–804.",
      url: "https://doi.org/10.1111/j.1360-0443.1993.tb02093.x",
    },
    {
      citation:
        "Gache, P., Michaud, P., Landry, U., Accietto, C., Arfaoui, S., Wenger, O., & Daeppen, J.-B. (2005). The Alcohol Use Disorders Identification Test (AUDIT) as a screening tool for excessive drinking in primary care: Reliability and validity of a French version. Alcoholism: Clinical and Experimental Research, 29(11), 2001–2007.",
      url: "https://doi.org/10.1097/01.alc.0000187034.58955.64",
    },
    {
      citation:
        "Babor, T. F., Higgins-Biddle, J. C., Saunders, J. B., & Monteiro, M. G. (2001). AUDIT: The Alcohol Use Disorders Identification Test. Guidelines for use in primary care (2e éd.). Organisation mondiale de la Santé.",
      url: "https://www.paho.org/sites/default/files/Auditmanual_ENG.pdf",
    },
    {
      citation:
        "Observatoire français des drogues et des tendances addictives. (2019). Questionnaire AUDIT : repérage des consommations problématiques d'alcool (seuils de la Société française d'alcoologie, 2015).",
      url: "https://www.ofdt.fr/sites/ofdt/files/2024-06/audit_vf_28-02-19.pdf",
    },
  ],
  apaCitation:
    "Saunders, J. B., Aasland, O. G., Babor, T. F., de la Fuente, J. R., & Grant, M. (1993). Development of the Alcohol Use Disorders Identification Test (AUDIT): WHO collaborative project on early detection of persons with harmful alcohol consumption–II. Addiction, 88(6), 791–804. https://doi.org/10.1111/j.1360-0443.1993.tb02093.x",

  related: ["cudit-r", "cast", "ftnd", "ecab"],

  updatedAt: "2026-10-23",
};

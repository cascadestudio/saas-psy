import type { ScaleGuideContent } from "./types";

/** Sources internes : docs/scales/pcl-s/pcl-s.md. Yao 2003 vérifié sur PubMed le 23/10/2026. */
export const pclS: ScaleGuideContent = {
  scaleId: "pcl-s",

  seoTitle: "PCL-S : cotation, seuil et interprétation | Melya",
  seoDescription:
    "Coter et interpréter la PCL-S (stress post-traumatique, DSM-IV) : score de 17 à 85, seuil de 44, méthode par critères, différences avec la PCL-5.",
  heading:
    "PCL-S : le guide pratique de l'échelle d'état de stress post-traumatique",

  essentials: [
    "La PCL-S est un auto-questionnaire de 17 items qui mesure les symptômes de stress post-traumatique liés à **un événement précis**, sur le mois écoulé. Elle suit les critères du DSM-IV.",
    "Le score va de 17 à 85. **Un score ≥ 44 est le seuil de dépistage recommandé en population générale.**",
    "Elle a été remplacée par la PCL-5 (DSM-5), mais reste utilisée, notamment pour comparer avec des évaluations antérieures.",
  ],
  audience: "Adolescents et adultes",
  administrationMode: "Auto-questionnaire",

  administration: {
    title: "Comment administrer la PCL-S ?",
    body: [
      "Le « S » signifie **spécifique** : les questions portent sur un épisode stressant précis. Identifiez-le avec le patient avant la passation.",
      "Le patient indique à quel point chaque problème l'a perturbé **dans le mois précédent**, sur 5 niveaux : pas du tout (1), un peu (2), parfois (3), souvent (4), très souvent (5). Comptez environ 5 minutes.",
    ],
  },

  scoring: {
    title: "Comment coter la PCL-S ?",
    body: [
      "Le score total est la somme des 17 items, de 17 à 85. Les items suivent les trois groupes de symptômes du DSM-IV :",
      {
        list: [
          "**Critère B — Reviviscences** : items 1 à 5.",
          "**Critère C — Évitement et émoussement** : items 6 à 12.",
          "**Critère D — Hyperactivation** : items 13 à 17.",
        ],
      },
      "**Méthode par critères** : un dépistage est aussi considéré positif si au moins 1 item du critère B, 3 items du critère C et 2 items du critère D sont cotés 3 (« parfois ») ou plus. Melya affiche les sous-scores par critère ; cette règle se vérifie à partir d'eux.",
    ],
  },

  interpretation: {
    title: "Comment interpréter le score de la PCL-S ?",
    body: [
      "Le seuil de **44** est celui recommandé par l'INSPQ pour le dépistage en population générale. Selon les études, les seuils varient de 30 à 50 ; 50 est souvent retenu chez les militaires.",
      {
        list: [
          "**Score de 17 à 43** : sous le seuil de dépistage du TSPT.",
          "**Score de 44 à 85** : dépistage positif, un TSPT est probable et doit être confirmé en entretien.",
        ],
      },
      "Au-delà du seuil, regardez les sous-scores : un profil dominé par l'évitement (critère C) n'appelle pas le même travail qu'un profil dominé par les reviviscences.",
    ],
  },

  vigilance: {
    title: "Points de vigilance et limites de la PCL-S",
    body: [
      {
        list: [
          "**Elle suit le DSM-IV.** Le DSM-5 a réorganisé les critères (4 groupes, nouveaux symptômes) : pour un nouveau suivi, préférez la PCL-5.",
          "**Elle suppose un événement identifié** : sans événement de référence, les réponses perdent leur sens.",
          "**Elle dépiste, elle ne diagnostique pas** : le diagnostic se pose en entretien structuré.",
        ],
      },
    ],
  },

  followUp: {
    title: "Suivre l'évolution avec la PCL-S",
    body: [
      "La consigne porte sur le mois précédent : une passation mensuelle est cohérente pour suivre l'évolution des symptômes. Comparez les scores d'un même patient avec la même version (PCL-S ou PCL-5), les scores n'étant pas interchangeables.",
      "Avec Melya, la PCL-S est envoyée par email ; vous recevez le score total et les sous-scores par critère, et chaque passation est conservée dans l'historique du patient.",
    ],
  },

  extraSections: [
    {
      title: "PCL-S ou PCL-5 ?",
      body: [
        "La PCL-5 (20 items, score de 0 à 80) suit les critères du DSM-5 et dispose d'une validation française récente. C'est la référence actuelle. La PCL-S (17 items, DSM-IV) reste utile pour poursuivre un suivi commencé avec elle ou comparer avec des données anciennes. Les deux scores ne se comparent pas directement.",
      ],
    },
  ],

  faq: [
    {
      question: "Quel est le seuil de la PCL-S ?",
      answer:
        "44 en population générale selon l'INSPQ. Les seuils publiés varient de 30 à 50 selon les populations, 50 étant souvent retenu chez les militaires.",
    },
    {
      question: "Quelle différence entre PCL-S, PCL-C et PCL-M ?",
      answer:
        "Ce sont trois versions de la même échelle DSM-IV : la PCL-S porte sur un événement spécifique, la PCL-C sur des expériences stressantes en général (version civile), la PCL-M sur des expériences militaires.",
    },
    {
      question: "La PCL-S est-elle libre de droits ?",
      answer:
        "Oui. Selon l'INSPQ, elle est dans le domaine public, à condition de citer la source (Weathers et al.).",
    },
    {
      question: "Comment citer la PCL-S ?",
      answer:
        "Citez Weathers et al. (1993) pour l'instrument et Yao et al. (2003) pour la validation de la version française.",
    },
  ],

  questionnaire: {
    kind: "link",
    url: "https://www.inspq.qc.ca/boite-outils-pour-la-surveillance-post-sinistre-des-impacts-sur-la-sante-mentale/instruments-de-mesure-standardises/questionnaires/symptomes-de-stress-post-traumatique",
    publisher: "l'Institut national de santé publique du Québec (INSPQ)",
  },
  frenchVersion: {
    summary:
      "Melya utilise la version française validée par Yao, Cottraux et al. (2003), telle que reproduite par l'INSPQ.",
    validated: true,
  },
  sources: [
    {
      citation:
        "Weathers, F. W., Litz, B. T., Herman, D. S., Huska, J. A., & Keane, T. M. (1993). The PTSD Checklist (PCL): Reliability, validity, and diagnostic utility. Communication présentée au congrès annuel de l'International Society for Traumatic Stress Studies, San Antonio.",
    },
    {
      citation:
        "Yao, S. N., Cottraux, J., Note, I., De Mey-Guillard, C., Mollard, E., & Ventureyra, V. (2003). Évaluation des états de stress post-traumatique : validation d'une échelle, la PCLS. L'Encéphale, 29(3), 232–238.",
      url: "https://pubmed.ncbi.nlm.nih.gov/12876547/",
    },
  ],
  apaCitation:
    "Yao, S. N., Cottraux, J., Note, I., De Mey-Guillard, C., Mollard, E., & Ventureyra, V. (2003). Évaluation des états de stress post-traumatique : validation d'une échelle, la PCLS. L'Encéphale, 29(3), 232–238.",

  related: ["traumatismes-pcl5", "pdeq", "pdi", "cries-13"],

  updatedAt: "2026-10-23",
};

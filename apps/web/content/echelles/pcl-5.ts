import type { ScaleGuideContent } from "./types";

/**
 * Sources internes : docs/scales/pcl-5/pcl-5.md. Références vérifiées sur
 * PubMed/CrossRef et page du National Center for PTSD le 23/10/2026.
 */
export const pcl5: ScaleGuideContent = {
  scaleId: "traumatismes-pcl5",

  seoTitle: "PCL-5 : cotation, interprétation, PDF français | Melya",
  seoDescription:
    "Coter et interpréter la PCL-5 (TSPT, DSM-5) : seuil de 32, sous-scores par cluster, diagnostic provisoire, suivi et questionnaire officiel en PDF.",
  heading: "PCL-5 : le guide pratique pour les psychologues",

  essentials: [
    "La PCL-5 est un auto-questionnaire de 20 items qui mesure la sévérité des symptômes de trouble de stress post-traumatique (TSPT) au cours du dernier mois, selon les critères du DSM-5.",
    "Le score va de 0 à 80. **Un score ≥ 32 est le seuil de dépistage de la version française validée.** Les sous-scores par groupe de symptômes (intrusions, évitement, cognitions et humeur, hyperéveil) complètent la lecture.",
    "Libre de droits et rempli en 5 à 10 minutes, c'est l'outil de référence pour dépister le TSPT et suivre son évolution.",
  ],
  audience: "Adolescents et adultes",
  administrationMode: "Auto-questionnaire",

  administration: {
    title: "Comment administrer la PCL-5 ?",
    body: [
      "La PCL-5 se remplit **en gardant à l'esprit un événement précis** : le pire événement vécu, celui qui perturbe le plus actuellement. Identifiez-le avec le patient avant la passation (en séance, ou avec un inventaire d'événements comme la LEC-5). Sans événement de référence, les réponses perdent leur sens.",
      "Le patient indique à quel point chaque problème l'a perturbé au cours du **dernier mois**, sur 5 niveaux :",
      {
        list: [
          "Pas du tout (0)",
          "Un peu (1)",
          "Modérément (2)",
          "Beaucoup (3)",
          "Extrêmement (4)",
        ],
      },
      "Le questionnaire se passe sur papier, en ligne ou en entretien. Il existe aussi une version « semaine écoulée », utilisée pour des suivis rapprochés ; Melya utilise la version standard « dernier mois ».",
    ],
  },

  scoring: {
    title: "Comment coter la PCL-5 ?",
    body: [
      "Le score total est la somme des 20 items (0 à 80). Aucun item n'est inversé.",
      "Les sous-scores suivent les 4 groupes de symptômes du DSM-5 :",
      {
        list: [
          "**B — Intrusions** (items 1 à 5) : 0 à 20.",
          "**C — Évitement** (items 6 et 7) : 0 à 8.",
          "**D — Altérations négatives des cognitions et de l'humeur** (items 8 à 14) : 0 à 28.",
          "**E — Altérations de l'éveil et de la réactivité** (items 15 à 20) : 0 à 24.",
        ],
      },
      "**Diagnostic provisoire.** Le National Center for PTSD propose aussi une règle calquée sur le DSM-5 : chaque item coté ≥ 2 (« modérément » ou plus) compte comme un symptôme présent, et il faut au moins 1 symptôme B, 1 symptôme C, 2 symptômes D et 2 symptômes E. C'est une aide à la décision, à confirmer en entretien.",
    ],
  },

  interpretation: {
    title: "Comment interpréter le score de la PCL-5 ?",
    body: [
      "Le seuil de **32** est celui de la validation française (Ashbaugh et al., 2016). Les études anglophones retiennent un seuil entre 31 et 33 : l'écart est marginal.",
      "Un score ≥ 32 signifie un **dépistage positif** : un TSPT est probable et doit être confirmé par une évaluation clinique structurée. Il n'existe pas de grille de sévérité standardisée (légère, modérée…) pour la PCL-5 : au-dessus du seuil, le score s'utilise comme une mesure continue de sévérité. Un score de 45, 50 ou 60 indique des symptômes d'autant plus marqués.",
      "Le seuil optimal varie selon la population et l'objectif : un seuil plus bas repère davantage de cas en dépistage, un seuil plus haut limite les faux positifs quand on cherche un diagnostic provisoire.",
      "Regardez toujours les sous-scores : un profil dominé par l'évitement n'appelle pas le même travail qu'un profil dominé par les intrusions ou l'hyperéveil.",
    ],
  },

  vigilance: {
    title: "Points de vigilance et limites de la PCL-5",
    body: [
      {
        list: [
          "**Pas d'événement de référence, pas d'interprétation.** La PCL-5 suppose un événement traumatique identifié ; elle ne vérifie pas elle-même que l'événement remplit le critère A du DSM-5.",
          "**Elle dépiste, elle ne diagnostique pas.** Le diagnostic se pose en entretien structuré (par exemple la CAPS-5).",
          "**L'item 16** (prendre des risques inconsidérés, conduites dangereuses) est un symptôme du TSPT, pas un indicateur de risque suicidaire. Aucun item de la PCL-5 n'évalue directement les idées suicidaires : explorez-les en entretien si le tableau le justifie.",
          "**Plusieurs versions françaises circulent.** Seule celle d'Ashbaugh et al. (2016) a une validation publiée ; c'est elle qui correspond au seuil de 32.",
        ],
      },
    ],
  },

  followUp: {
    title: "Suivre l'évolution avec la PCL-5",
    body: [
      "La PCL-5 est conçue pour suivre l'évolution des symptômes pendant et après une prise en charge.",
      {
        list: [
          "**À quelle fréquence ?** La version standard porte sur le dernier mois : une passation mensuelle est cohérente. Pour un suivi plus rapproché, la littérature utilise la version « semaine écoulée ».",
          "**Quel changement est significatif ?** Le National Center for PTSD souligne que les données restent limitées pour définir un seuil de changement cliniquement significatif. Lisez la tendance sur plusieurs passations et le passage sous le seuil de 32.",
          "**Suivez les sous-scores** : l'évitement et l'hyperéveil n'évoluent pas toujours au même rythme que les intrusions.",
        ],
      },
      "Avec Melya, la PCL-5 est envoyée par email ; vous recevez le score total, les sous-scores par groupe de symptômes et la règle de diagnostic provisoire, et chaque passation est conservée dans l'historique du patient.",
    ],
  },

  faq: [
    {
      question: "Quel est le seuil de la PCL-5 ?",
      answer:
        "32 pour la version française validée (Ashbaugh et al., 2016). Les études anglophones retiennent un seuil entre 31 et 33. Un score au-dessus du seuil indique un TSPT probable, à confirmer en entretien.",
    },
    {
      question: "Que signifie un score de 45 à la PCL-5 ?",
      answer:
        "Un score de 45 dépasse nettement le seuil de dépistage de 32 : un TSPT est probable. La PCL-5 n'a pas de grille de sévérité standardisée, mais plus le score est élevé, plus les symptômes sont marqués. Regardez les sous-scores et confirmez par une évaluation structurée.",
    },
    {
      question: "La PCL-5 est-elle libre de droits ?",
      answer:
        "Oui. L'instrument du National Center for PTSD est dans le domaine public, et la traduction française d'Ashbaugh et al. (2016) est publiée sous licence CC BY. Vous pouvez télécharger la version française depuis cette page.",
    },
    {
      question: "Faut-il un événement traumatique pour passer la PCL-5 ?",
      answer:
        "Oui. Les questions portent sur les réactions à un événement précis, le pire vécu. Identifiez-le avec le patient avant la passation ; un inventaire comme la LEC-5 peut y aider.",
    },
    {
      question: "Quelle différence entre la PCL-5 et la PCL-S ?",
      answer:
        "La PCL-S est l'ancienne version (17 items), alignée sur le DSM-IV. La PCL-5 (20 items) suit les critères du DSM-5, avec un groupe de symptômes « cognitions et humeur » ajouté. Pour un nouveau suivi, la PCL-5 est la référence actuelle.",
    },
    {
      question: "Comment citer la PCL-5 ?",
      answer:
        "Citez Weathers et al. (2013) pour l'instrument, Blevins et al. (2015) pour sa validation, et Ashbaugh et al. (2016) pour la version française.",
    },
  ],

  questionnaire: {
    kind: "download",
    file: "/questionnaires/pcl-5-questionnaire-francais.pdf",
    publisher:
      "le Centre national de ressources et de résilience (Cn2r), traduction validée d'Ashbaugh et al. (2016)",
  },
  frenchVersion: {
    summary:
      "Melya utilise la traduction française d'Ashbaugh et al. (2016), diffusée par le Cn2r, reprise mot pour mot. C'est la seule version française avec une validation psychométrique publiée (cohérence interne α = 0,94, fidélité test-retest de 0,89), et celle qui correspond au seuil de 32.",
    validated: true,
  },
  sources: [
    {
      citation:
        "Weathers, F. W., Litz, B. T., Keane, T. M., Palmieri, P. A., Marx, B. P., & Schnurr, P. P. (2013). The PTSD Checklist for DSM-5 (PCL-5). National Center for PTSD.",
      url: "https://www.ptsd.va.gov/professional/assessment/adult-sr/ptsd-checklist.asp",
    },
    {
      citation:
        "Ashbaugh, A. R., Houle-Johnson, S., Herbert, C., El-Hage, W., & Brunet, A. (2016). Psychometric validation of the English and French versions of the Posttraumatic Stress Disorder Checklist for DSM-5 (PCL-5). PLoS ONE, 11(10), e0161645.",
      url: "https://doi.org/10.1371/journal.pone.0161645",
    },
    {
      citation:
        "Blevins, C. A., Weathers, F. W., Davis, M. T., Witte, T. K., & Domino, J. L. (2015). The Posttraumatic Stress Disorder Checklist for DSM-5 (PCL-5): Development and initial psychometric evaluation. Journal of Traumatic Stress, 28(6), 489–498.",
      url: "https://doi.org/10.1002/jts.22059",
    },
    {
      citation:
        "Bovin, M. J., Marx, B. P., Weathers, F. W., Gallagher, M. W., Rodriguez, P., Schnurr, P. P., & Keane, T. M. (2016). Psychometric properties of the PTSD Checklist for Diagnostic and Statistical Manual of Mental Disorders–Fifth Edition (PCL-5) in veterans. Psychological Assessment, 28(11), 1379–1391.",
      url: "https://doi.org/10.1037/pas0000254",
    },
  ],
  apaCitation:
    "Ashbaugh, A. R., Houle-Johnson, S., Herbert, C., El-Hage, W., & Brunet, A. (2016). Psychometric validation of the English and French versions of the Posttraumatic Stress Disorder Checklist for DSM-5 (PCL-5). PLoS ONE, 11(10), e0161645. https://doi.org/10.1371/journal.pone.0161645",

  related: ["pcl-s", "pdeq", "pdi", "cries-13"],

  updatedAt: "2026-10-23",
};

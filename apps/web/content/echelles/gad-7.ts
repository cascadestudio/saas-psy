import type { ScaleGuideContent } from "./types";

/**
 * Sources internes : docs/scales/gad-7/gad-7.md (spec) et la page rédigée par
 * James sur Sanity, reprise et restructurée. Références ajoutées (Toussaint
 * 2020, Plummer 2016, Kroenke 2007) vérifiées sur PubMed le 23/10/2026.
 */
export const gad7: ScaleGuideContent = {
  scaleId: "gad-7",

  seoTitle: "GAD-7 : cotation, interprétation, PDF officiel | Melya",
  seoDescription:
    "Coter et interpréter le GAD-7 : seuils 5, 10 et 15, limites, suivi dans le temps et questionnaire officiel en PDF. Le guide pratique pour les psychologues.",
  heading: "GAD-7 : le guide pratique pour les psychologues",

  essentials: [
    "Le GAD-7 est un auto-questionnaire de 7 items qui mesure la sévérité des symptômes d'anxiété au cours des 2 dernières semaines. Il a été construit à partir des critères du trouble anxieux généralisé (TAG).",
    "Le score va de 0 à 21 ; **10 est le seuil de dépistage le plus utilisé**. Un score élevé signale une anxiété significative, sans préciser de quel trouble anxieux il s'agit.",
    "Libre de droits et rempli en 1 à 3 minutes, il s'utilise pour le dépistage comme pour le suivi, souvent en parallèle du PHQ-9.",
  ],
  audience: "Adultes",
  administrationMode: "Auto-questionnaire",

  administration: {
    title: "Comment administrer le GAD-7 ?",
    body: [
      "Le patient remplit seul le questionnaire, avant ou pendant la séance. La consigne officielle porte sur une période précise : « Au cours des 2 dernières semaines, selon quelle fréquence avez-vous été gêné(e) par les problèmes suivants ? ».",
      "Chaque item se répond sur 4 niveaux de fréquence :",
      {
        list: [
          "Jamais (0)",
          "Plusieurs jours (1)",
          "Plus de la moitié du temps (2)",
          "Presque tous les jours (3)",
        ],
      },
      "Le GAD-7 se passe sur papier, en ligne ou en entretien. Comme pour tout auto-questionnaire, le contexte compte : un patient anxieux à l'idée d'être évalué peut sur-coter, un autre minimiser. Le score se lit toujours à la lumière de l'entretien.",
      "Deux versions françaises circulent : la version « French for France » de Pfizer (« 2 dernières semaines », « gêné(e) ») et une version canadienne (« 14 derniers jours », « dérangé(e) »). Utilisez la même version d'une passation à l'autre, et de préférence celle du PHQ-9 si vous passez les deux.",
    ],
  },

  scoring: {
    title: "Comment coter le GAD-7 ?",
    body: [
      "Aucun item n'est inversé et il n'existe pas de sous-score officiel : seul le score total compte.",
      "Une passation incomplète ne se compare pas aux seuils. Certaines versions proposent de corriger le score quand 1 ou 2 items manquent ; Melya ne le fait pas et rend les 7 items obligatoires.",
    ],
  },

  interpretation: {
    title: "Comment interpréter le score du GAD-7 ?",
    body: [
      "Le score indique un **niveau de sévérité de l'anxiété**, pas un diagnostic. Un score de 12 ne signifie pas que le patient présente un trouble anxieux généralisé : il signifie que ses symptômes anxieux des 2 dernières semaines atteignent un niveau modéré sur cette échelle.",
      "Dans la publication originale, un score ≥ 10 repérait le trouble anxieux généralisé avec une sensibilité de 89 % et une spécificité de 82 %. Une méta-analyse ultérieure montre que les seuils de 7 à 10 donnent des performances proches : 10 reste le repère standard, mais un score de 8 ou 9 mérite aussi d'être exploré.",
      "Concrètement, score par score :",
      {
        list: [
          "**Score de 0 à 4** : anxiété minimale.",
          "**Score de 5 à 9** (par exemple 8) : anxiété légère, sous le seuil standard. À explorer si la plainte est au premier plan.",
          "**Score de 10 à 14** (par exemple 10 ou 13) : anxiété modérée, au-dessus du seuil de dépistage. Une évaluation clinique approfondie est indiquée.",
          "**Score de 15 à 21** : anxiété sévère.",
        ],
      },
      "Le GAD-7 réagit à l'anxiété en général, pas seulement au TAG. Il repère aussi le trouble panique, l'anxiété sociale et le stress post-traumatique, et un événement de vie (deuil, séparation, surcharge professionnelle) peut faire monter le score sans trouble anxieux caractérisé.",
    ],
  },

  vigilance: {
    title: "Points de vigilance et limites du GAD-7",
    body: [
      "Contrairement au PHQ-9, aucun item du GAD-7 ne déclenche d'alerte autonome : c'est le score total qui porte l'information. Les limites à garder en tête :",
      {
        list: [
          "**Il ne distingue pas les troubles anxieux.** Un score élevé peut correspondre à un TAG, un trouble panique, une anxiété sociale ou une anxiété réactionnelle. L'outil dépiste, il ne différencie pas.",
          "**Il ne mesure pas l'évitement**, souvent au cœur du maintien du trouble. Un patient qui évite massivement les situations anxiogènes peut obtenir un score modéré malgré un retentissement important.",
          "**Il ne mesure pas la durée des symptômes**, pourtant centrale dans le diagnostic du TAG : un score sur 2 semaines ne dit rien de la chronicité.",
          "**Il a été validé chez l'adulte.** Chez l'adolescent, il est utilisé en pratique, mais sans validation française spécifique : interprétez avec prudence.",
          "**Les seuils viennent de la population générale.** Dans certaines populations cliniques (épilepsie, cancer), des études françaises ou internationales proposent des seuils plus bas.",
        ],
      },
    ],
  },

  followUp: {
    title: "Suivre l'évolution avec le GAD-7",
    body: [
      "Le GAD-7 est sensible au changement au cours d'une prise en charge : c'est l'un de ses principaux intérêts.",
      {
        list: [
          "**À quelle fréquence ?** La consigne porte sur 2 semaines : espacez les passations d'au moins 2 semaines. En pratique, une passation toutes les 2 à 4 séances suffit, avec un rythme plus serré en début de suivi ou en période de crise.",
          "**Quel changement est significatif ?** Une variation de **4 points** est la différence minimale cliniquement significative (Toussaint et al., 2020). En dessous, la variation peut relever de l'erreur de mesure.",
          "**Lisez la tendance**, pas un point isolé : passer de 9 à 10 change la catégorie de sévérité sans avoir de sens clinique en soi.",
        ],
      },
      "Avec Melya, vous envoyez le GAD-7 par email avant la séance, seul ou avec le PHQ-9 dans la même passation. Le score est calculé automatiquement et chaque passation est conservée dans l'historique du patient.",
    ],
  },

  extraSections: [
    {
      title: "GAD-7 et PHQ-9 : pourquoi les associer ?",
      body: [
        "Anxiété et dépression sont très souvent associées. Les deux questionnaires partagent la même période de référence (2 dernières semaines) et les mêmes modalités de réponse, ce qui permet de les passer ensemble en moins de 10 minutes.",
        "Un patient en dépression modérée au PHQ-9 et en anxiété sévère au GAD-7 n'a pas le même tableau qu'un patient qui ne score que sur l'une des deux dimensions : la combinaison donne une lecture plus complète.",
      ],
    },
    {
      title: "GAD-7 ou GAD-2 ?",
      body: [
        "Le GAD-2 reprend les 2 premiers items du GAD-7. C'est un outil de triage très rapide : un score ≥ 3 indique qu'une évaluation plus complète est nécessaire. En consultation psychologique, le GAD-7 complet est presque toujours préférable, notamment pour le suivi.",
      ],
    },
  ],

  faq: [
    {
      question: "Le GAD-7 est-il libre de droits ?",
      answer:
        "Oui. Le formulaire officiel indique que la reproduction, la traduction, l'affichage et la distribution sont autorisés sans demande préalable. La mention des auteurs (Spitzer, Williams, Kroenke et collègues, avec une allocation d'études de Pfizer Inc.) doit être conservée.",
    },
    {
      question: "Où trouver le GAD-7 en français (PDF) ?",
      answer:
        "La version de référence en France est la traduction « French for France » distribuée par Pfizer. Vous pouvez la télécharger depuis cette page, dans la section « Questionnaire officiel et sources ».",
    },
    {
      question: "Que signifie un score de 10 au GAD-7 ?",
      answer:
        "Un score de 10 correspond à une anxiété modérée et atteint le seuil de dépistage standard. Il ne pose pas de diagnostic, mais justifie une évaluation clinique pour préciser la nature de l'anxiété (TAG, trouble panique, anxiété sociale, anxiété réactionnelle…).",
    },
    {
      question:
        "Le GAD-7 peut-il diagnostiquer un trouble anxieux généralisé ?",
      answer:
        "Non. C'est un outil de dépistage et de suivi. Un score élevé indique que des symptômes anxieux significatifs sont présents ; le diagnostic repose sur l'entretien clinique, l'histoire du patient et la durée des symptômes.",
    },
    {
      question: "Peut-on utiliser le GAD-7 avec des adolescents ?",
      answer:
        "Il est utilisé en pratique chez l'adolescent, mais n'a pas de validation française spécifique pour cette population. Les seuils établis chez l'adulte ne s'appliquent pas directement : interprétez avec prudence.",
    },
    {
      question: "À quelle fréquence repasser le GAD-7 ?",
      answer:
        "Au moins 2 semaines entre deux passations, puisque la consigne porte sur cette période. Une passation toutes les 2 à 4 séances suffit en général ; une variation de 4 points ou plus est cliniquement significative.",
    },
    {
      question: "Comment citer le GAD-7 ?",
      answer:
        "Citez la publication originale : Spitzer, R. L., Kroenke, K., Williams, J. B. W., & Löwe, B. (2006). A brief measure for assessing generalized anxiety disorder: The GAD-7. Archives of Internal Medicine, 166(10), 1092–1097.",
    },
  ],

  questionnaire: {
    kind: "download",
    file: "/questionnaires/gad-7-questionnaire-francais.pdf",
    publisher: "Pfizer Inc., version officielle « French for France »",
  },
  frenchVersion: {
    summary:
      "Melya utilise la traduction officielle « French for France » distribuée par Pfizer, reprise mot pour mot, par cohérence avec le PHQ-9. Le GAD-7 a fait l'objet d'une validation française en population clinique (Micoulaud-Franchi et al., 2016, chez des patients épileptiques), qui confirme ses bonnes propriétés psychométriques.",
    validated: true,
  },
  sources: [
    {
      citation:
        "Spitzer, R. L., Kroenke, K., Williams, J. B. W., & Löwe, B. (2006). A brief measure for assessing generalized anxiety disorder: The GAD-7. Archives of Internal Medicine, 166(10), 1092–1097.",
      url: "https://doi.org/10.1001/archinte.166.10.1092",
    },
    {
      citation:
        "Kroenke, K., Spitzer, R. L., Williams, J. B. W., Monahan, P. O., & Löwe, B. (2007). Anxiety disorders in primary care: Prevalence, impairment, comorbidity, and detection. Annals of Internal Medicine, 146(5), 317–325.",
      url: "https://doi.org/10.7326/0003-4819-146-5-200703060-00004",
    },
    {
      citation:
        "Plummer, F., Manea, L., Trepel, D., & McMillan, D. (2016). Screening for anxiety disorders with the GAD-7 and GAD-2: A systematic review and diagnostic metaanalysis. General Hospital Psychiatry, 39, 24–31.",
      url: "https://doi.org/10.1016/j.genhosppsych.2015.11.005",
    },
    {
      citation:
        "Toussaint, A., Hüsing, P., Gumz, A., Wingenfeld, K., Härter, M., Schramm, E., & Löwe, B. (2020). Sensitivity to change and minimal clinically important difference of the 7-item Generalized Anxiety Disorder Questionnaire (GAD-7). Journal of Affective Disorders, 265, 395–401.",
      url: "https://doi.org/10.1016/j.jad.2020.01.032",
    },
    {
      citation:
        "Löwe, B., Decker, O., Müller, S., Brähler, E., Schellberg, D., Herzog, W., & Herzberg, P. Y. (2008). Validation and standardization of the Generalized Anxiety Disorder Screener (GAD-7) in the general population. Medical Care, 46(3), 266–274.",
      url: "https://doi.org/10.1097/MLR.0b013e318160d093",
    },
    {
      citation:
        "Micoulaud-Franchi, J.-A., Lagarde, S., Barkate, G., Dufournet, B., Besancon, C., Trébuchon-Da Fonseca, A., Gavaret, M., Bartolomei, F., Bonini, F., & McGonigal, A. (2016). Rapid detection of generalized anxiety disorder and major depression in epilepsy: Validation of the GAD-7 as a complementary tool to the NDDI-E in a French sample. Epilepsy & Behavior, 57(Pt A), 211–216.",
      url: "https://doi.org/10.1016/j.yebeh.2016.02.015",
    },
  ],
  apaCitation:
    "Spitzer, R. L., Kroenke, K., Williams, J. B. W., & Löwe, B. (2006). A brief measure for assessing generalized anxiety disorder: The GAD-7. Archives of Internal Medicine, 166(10), 1092–1097. https://doi.org/10.1001/archinte.166.10.1092",

  related: ["phq-9", "qips", "pdss", "echelle-d-anxiete-sociale-de-liebowitz"],

  updatedAt: "2026-10-23",
};

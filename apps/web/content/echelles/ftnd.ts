import type { ScaleGuideContent } from "./types";

/** Sources internes : docs/scales/ftnd/ftnd.md. Références vérifiées sur PubMed le 23/10/2026. */
export const ftnd: ScaleGuideContent = {
  scaleId: "ftnd",

  seoTitle: "Test de Fagerström : cotation et interprétation | Melya",
  seoDescription:
    "Coter et interpréter le test de Fagerström (FTND) en 6 questions : score sur 10, niveaux de dépendance à la nicotine selon la HAS, version en 2 questions.",
  heading:
    "Test de Fagerström : le guide pratique de l'évaluation de la dépendance à la nicotine",

  essentials: [
    "Le test de Fagerström (FTND) évalue en 6 questions le **degré de dépendance physique à la nicotine** chez les fumeurs de cigarettes. Il se remplit en 2 minutes.",
    "Le score va de 0 à 10. Selon la HAS : **0-2 pas de dépendance, 3-4 faible, 5-6 moyenne, 7-10 forte ou très forte**.",
    "Il est notamment utilisé pour orienter le choix et le dosage des substituts nicotiniques.",
  ],
  audience: "Adultes fumeurs de cigarettes",
  administrationMode: "Auto-questionnaire",

  administration: {
    title: "Comment administrer le test de Fagerström ?",
    body: [
      "Le test s'adresse aux **fumeurs de cigarettes** : chez un non-fumeur, un score de 0 n'a pas de signification. La version de la HAS n'a pas de consigne : le patient répond directement aux 6 questions.",
      "Les questions portent sur le délai entre le réveil et la première cigarette, la difficulté à ne pas fumer dans les lieux où c'est interdit, la cigarette à laquelle il serait le plus difficile de renoncer, le nombre de cigarettes par jour, la consommation plus importante le matin et le fait de fumer même malade.",
    ],
  },

  scoring: {
    title: "Comment coter le test de Fagerström ?",
    body: [
      {
        list: [
          "**Questions 1 et 4** (délai avant la première cigarette, nombre de cigarettes par jour) : de 0 à 3 points.",
          "**Questions 2, 3, 5 et 6** : 0 ou 1 point.",
        ],
      },
      "Le score total est la somme des 6 questions, de 0 à 10. Attention : dans le questionnaire, l'ordre des réponses ne suit pas toujours l'ordre des points (par exemple pour le délai avant la première cigarette, où « dans les 5 minutes » vaut 3 points). Cotez d'après la valeur de chaque réponse, pas sa position.",
    ],
  },

  interpretation: {
    title: "Comment interpréter le score du test de Fagerström ?",
    body: [
      "Melya utilise l'interprétation de la HAS (2014) :",
      {
        list: [
          "**Score de 0 à 2** : pas de dépendance.",
          "**Score de 3 à 4** : dépendance faible.",
          "**Score de 5 à 6** : dépendance moyenne.",
          "**Score de 7 à 10** : dépendance forte ou très forte.",
        ],
      },
      "D'autres documents (Unicancer, RESPADD) utilisent un découpage en 5 niveaux : 0-2 très faible, 3-4 faible, 5 moyenne, 6-7 forte, 8-10 très forte. Un score de 6 est donc « moyen » selon la HAS et « fort » selon ce découpage : précisez la grille utilisée.",
      "Le test mesure la dépendance physique. Un score faible n'empêche pas une dépendance comportementale ou psychologique importante.",
    ],
  },

  vigilance: {
    title: "Points de vigilance et limites",
    body: [
      {
        list: [
          "**Il est conçu pour la cigarette** : il n'est pas adapté au tabac à rouler en grande quantité sans adaptation, au cigare, à la chicha ou à la cigarette électronique.",
          "**Il ne mesure que la dépendance physique** : motivation, contexte et dépendance comportementale s'évaluent en entretien.",
          "**Deux grilles d'interprétation circulent** (4 ou 5 niveaux) : comparez les scores, pas les étiquettes.",
        ],
      },
    ],
  },

  followUp: {
    title: "Le test de Fagerström dans le suivi",
    body: [
      "Le test se passe en début d'accompagnement au sevrage pour situer la dépendance et adapter la substitution nicotinique. Le repasser au cours d'une réduction de consommation permet d'objectiver l'évolution.",
      "Avec Melya, il est envoyé par email, coté automatiquement, et chaque passation est conservée dans l'historique du patient.",
    ],
  },

  extraSections: [
    {
      title: "Fagerström en 6 ou en 2 questions ?",
      body: [
        "La HAS propose aussi un test simplifié en 2 questions (délai avant la première cigarette et nombre de cigarettes par jour), très rapide pour un repérage. La version en 6 questions donne une évaluation plus complète ; c'est celle que propose Melya.",
      ],
    },
  ],

  faq: [
    {
      question: "Comment interpréter le score du test de Fagerström ?",
      answer:
        "Selon la HAS : 0 à 2, pas de dépendance ; 3 à 4, dépendance faible ; 5 à 6, dépendance moyenne ; 7 à 10, dépendance forte ou très forte.",
    },
    {
      question: "Que signifie un score de 5 au test de Fagerström ?",
      answer:
        "Un score de 5 correspond à une dépendance moyenne à la nicotine, selon la HAS comme selon le découpage en 5 niveaux.",
    },
    {
      question: "Quelle différence entre FTND et FTCD ?",
      answer:
        "C'est le même test. En 2012, Karl Fagerström a proposé de le renommer « Fagerström Test for Cigarette Dependence » (FTCD), car il mesure surtout la dépendance à la cigarette. L'appellation FTND reste la plus utilisée.",
    },
    {
      question: "Le test de Fagerström est-il gratuit ?",
      answer:
        "Oui. Il peut être reproduit sans autorisation, et la version française est diffusée par la HAS.",
    },
    {
      question:
        "Le test de Fagerström s'applique-t-il à la cigarette électronique ?",
      answer:
        "Non. Il a été conçu pour la cigarette et ses questions (nombre de cigarettes, première cigarette du matin) ne se transposent pas directement au vapotage. Des questionnaires spécifiques existent pour la cigarette électronique, comme le Penn State Electronic Cigarette Dependence Index (Foulds et al., 2015).",
    },
    {
      question: "Peut-on faire passer le test de Fagerström en ligne ?",
      answer:
        "Oui. Avec Melya, vous envoyez le test de Fagerström à votre patient par email : il y répond en ligne, le score est calculé automatiquement et chaque passation est conservée dans son historique.",
    },
    {
      question: "Comment citer le test de Fagerström ?",
      answer:
        "Heatherton, T. F., Kozlowski, L. T., Frecker, R. C., & Fagerström, K. O. (1991). The Fagerström Test for Nicotine Dependence: A revision of the Fagerström Tolerance Questionnaire. British Journal of Addiction, 86(9), 1119–1127.",
    },
  ],

  questionnaire: {
    kind: "link",
    url: "https://www.has-sante.fr/upload/docs/application/pdf/2014-11/outil_tests_fagerstrom.pdf",
    publisher: "la Haute Autorité de santé (HAS), page 2 du document",
  },
  frenchVersion: {
    summary:
      "Melya utilise la version française diffusée par la HAS en 2014 avec sa recommandation sur l'arrêt du tabac, reprise mot pour mot. Le traducteur n'est pas nommé et aucune étude de validation française n'est citée par la HAS, qui renvoie aux publications originales.",
    validated: false,
    warning:
      "La HAS ne cite pas d'étude de validation de cette version française : elle renvoie aux références originales anglophones.",
  },
  sources: [
    {
      citation:
        "Heatherton, T. F., Kozlowski, L. T., Frecker, R. C., & Fagerström, K. O. (1991). The Fagerström Test for Nicotine Dependence: A revision of the Fagerström Tolerance Questionnaire. British Journal of Addiction, 86(9), 1119–1127.",
      url: "https://doi.org/10.1111/j.1360-0443.1991.tb01879.x",
    },
    {
      citation:
        "Fagerström, K. (2012). Determinants of tobacco use and renaming the FTND to the Fagerström Test for Cigarette Dependence. Nicotine & Tobacco Research, 14(1), 75–78.",
      url: "https://doi.org/10.1093/ntr/ntr137",
    },
    {
      citation:
        "Haute Autorité de santé. (2014). Test de Fagerström en six questions. Outil associé à la recommandation « Arrêt de la consommation de tabac : du dépistage individuel au maintien de l'abstinence ».",
      url: "https://www.has-sante.fr/upload/docs/application/pdf/2014-11/outil_tests_fagerstrom.pdf",
    },
    {
      citation:
        "Foulds, J., Veldheer, S., Yingst, J., Hrabovsky, S., Wilson, S. J., Nichols, T. T., & Eissenberg, T. (2015). Development of a questionnaire for assessing dependence on electronic cigarettes among a large sample of ex-smoking e-cigarette users. Nicotine & Tobacco Research, 17(2), 186–192.",
      url: "https://doi.org/10.1093/ntr/ntu204",
    },
  ],
  apaCitation:
    "Heatherton, T. F., Kozlowski, L. T., Frecker, R. C., & Fagerström, K. O. (1991). The Fagerström Test for Nicotine Dependence: A revision of the Fagerström Tolerance Questionnaire. British Journal of Addiction, 86(9), 1119–1127. https://doi.org/10.1111/j.1360-0443.1991.tb01879.x",

  related: ["honc", "audit", "cudit-r", "cast"],

  updatedAt: "2026-10-23",
};

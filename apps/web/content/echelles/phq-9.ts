import type { ScaleGuideContent } from "./types";

/**
 * Sources internes : docs/scales/phq-9/phq-9.md (spec) et la page rédigée
 * par James sur Sanity, reprise et restructurée. Les références ajoutées
 * (Löwe 2004, Levis 2019, Simon 2013, PHQ-2, PHQ-A) ont été vérifiées sur
 * PubMed le 23/10/2026.
 */
export const phq9: ScaleGuideContent = {
  scaleId: "phq-9",

  seoTitle: "PHQ-9 : cotation, interprétation, PDF officiel | Melya",
  seoDescription:
    "Coter et interpréter le PHQ-9 : seuils, item 9, suivi dans le temps et questionnaire officiel en PDF. Le guide pratique pour les psychologues.",
  heading: "PHQ-9 : le guide pratique pour les psychologues",

  essentials: [
    "Le PHQ-9 est un auto-questionnaire de 9 items qui mesure la sévérité des symptômes dépressifs au cours des 2 dernières semaines. Ses items reprennent un à un les 9 critères de l'épisode dépressif caractérisé du DSM.",
    "Le score va de 0 à 27 ; **10 est le seuil de dépistage le plus utilisé**. Indépendamment du score total, toute réponse ≥ 1 à l'item 9 (pensées de mort ou d'auto-agression) appelle une évaluation du risque suicidaire.",
    "Libre de droits et rempli en 3 à 5 minutes, c'est l'un des outils de référence pour dépister la dépression et suivre son évolution séance après séance.",
  ],
  audience: "Adultes",
  administrationMode: "Auto-questionnaire",

  administration: {
    title: "Comment administrer le PHQ-9 ?",
    body: [
      "Le patient remplit seul le questionnaire, avant ou pendant la séance. La consigne officielle porte sur une fenêtre précise : « Au cours des 2 dernières semaines, selon quelle fréquence avez-vous été gêné(e) par les problèmes suivants ? ». Vérifiez qu'il a bien compris cette période avant de commencer.",
      "Chaque item se répond sur 4 niveaux de fréquence :",
      {
        list: [
          "Jamais (0)",
          "Plusieurs jours (1)",
          "Plus de la moitié du temps (2)",
          "Presque tous les jours (3)",
        ],
      },
      "Le formulaire officiel se termine par une question d'impact fonctionnel, non cotée : à quel point ces problèmes ont rendu difficiles le travail, les tâches à la maison ou les relations avec les autres. Elle n'entre pas dans le score, mais renseigne utilement sur le retentissement.",
      "Le PHQ-9 s'utilise sur papier, en ligne, par téléphone ou en entretien. Dans tous les cas, le contexte compte : un patient qui craint d'être évalué, ou qui minimise par pudeur, produira un score en deçà de son état réel. Le questionnaire se lit toujours à la lumière de l'entretien clinique.",
    ],
  },

  scoring: {
    title: "Comment coter le PHQ-9 ?",
    body: [
      "Aucun item n'est inversé et il n'existe pas de sous-score officiel : seul le score total compte. La question d'impact fonctionnel ne s'additionne pas.",
      "Une passation incomplète ne se compare pas aux seuils, qui supposent les 9 items renseignés. Dans Melya, les 9 items sont obligatoires.",
      "La publication originale propose aussi un algorithme diagnostique : un épisode dépressif caractérisé est évoqué quand au moins 5 des 9 items sont cotés « plus de la moitié du temps » ou plus, dont l'item 1 (perte d'intérêt) ou l'item 2 (humeur dépressive) ; l'item 9 compte dès qu'il est présent. Cet algorithme oriente, il ne remplace pas le diagnostic clinique.",
    ],
  },

  interpretation: {
    title: "Comment interpréter le score du PHQ-9 ?",
    body: [
      "Le score total indique un **niveau de sévérité des symptômes**, pas un diagnostic. Un score de 14 ne signifie pas que le patient présente un épisode dépressif caractérisé : il signifie que ses symptômes des 2 dernières semaines atteignent un niveau modéré sur cette échelle. Le diagnostic reste une conclusion clinique.",
      "Le seuil de 10 est le repère de dépistage de référence. Dans la publication originale, un score ≥ 10 détectait un épisode dépressif caractérisé avec une sensibilité et une spécificité de 88 %. Une méta-analyse sur données individuelles (58 études, plus de 17 000 participants) a confirmé que 10 est le seuil qui équilibre le mieux sensibilité (88 %) et spécificité (85 %).",
      "Concrètement, score par score :",
      {
        list: [
          "**Score de 0 à 4** : symptômes minimes. Pas d'argument pour une dépression sur cette période.",
          "**Score de 5 à 9** (par exemple 8) : symptômes légers, sous le seuil de dépistage. À surveiller, et à repasser si la plainte persiste.",
          "**Score de 10 à 14** (par exemple 10 ou 12) : symptômes modérés, au-dessus du seuil de dépistage. Une évaluation clinique approfondie est indiquée.",
          "**Score de 15 à 19** : symptômes modérément sévères. Le retentissement est généralement marqué.",
          "**Score de 20 à 27** : symptômes sévères.",
        ],
      },
      "Quel que soit le score, regardez l'item 9 séparément (voir ci-dessous).",
    ],
  },

  vigilance: {
    title: "Points de vigilance : l'item 9 et les limites du PHQ-9",
    body: [
      "**L'item 9 obéit à une règle à part.** Il porte sur les pensées qu'il vaudrait mieux mourir ou l'envie de se faire du mal. Toute réponse ≥ 1 doit déclencher une évaluation du risque suicidaire, même si le score total est bas, même si le patient minimise. Un suivi de plus de 80 000 patients a montré que la réponse à cet item identifie un risque accru de tentative de suicide et de décès par suicide dans les mois qui suivent.",
      "L'item mélange toutefois des pensées de mort passives et des idées d'auto-agression : une réponse positive signale qu'il faut explorer, elle ne mesure pas le niveau de risque. C'est l'évaluation clinique qui le fait.",
      "Les autres limites à garder en tête :",
      {
        list: [
          "**Il ne distingue pas dépression unipolaire et bipolaire.** Un score élevé peut correspondre à la phase dépressive d'un trouble bipolaire, dont la prise en charge diffère.",
          "**Plusieurs items sont somatiques** (sommeil, fatigue, appétit). Une maladie physique, une grossesse ou un post-partum peuvent faire monter le score sans dépression.",
          "**Il ne mesure pas la durée des symptômes**, pourtant centrale pour le diagnostic : un score élevé sur 2 semaines ne dit rien de la chronicité.",
          "**Il est sensible à la désirabilité sociale.** Certains patients minimisent, surtout en début de suivi ; d'autres sur-cotent pour faire entendre leur détresse.",
          "**Il a été validé chez l'adulte.** Pour les adolescents, préférez le PHQ-A.",
        ],
      },
    ],
  },

  followUp: {
    title: "Suivre l'évolution avec le PHQ-9",
    body: [
      "C'est l'usage où le PHQ-9 est le plus utile : comparer les scores dans le temps objective ce qui change, ou ce qui ne change pas.",
      {
        list: [
          "**À quelle fréquence ?** La consigne porte sur les 2 dernières semaines : espacez les passations d'au moins 2 semaines pour qu'elles ne couvrent pas la même période. En pratique, une passation toutes les 2 à 4 séances suffit, avec un rythme plus serré en début de suivi ou lors d'un changement de prise en charge.",
          "**Quel changement est significatif ?** Une variation de **5 points** est la différence minimale cliniquement significative pour un patient donné (Löwe et al., 2004). En dessous, la variation peut relever de l'erreur de mesure.",
          "**Attention aux changements de catégorie.** Passer de 9 à 10 fait changer de niveau de sévérité, mais un écart d'un point n'a pas de sens clinique en soi. Lisez la tendance sur plusieurs passations plutôt qu'un point isolé.",
        ],
      },
      "Avec Melya, vous envoyez le PHQ-9 par email avant la séance. Le patient répond depuis son téléphone, le score est calculé automatiquement et chaque passation est conservée dans l'historique du patient, pour comparer les résultats d'une fois sur l'autre.",
    ],
  },

  extraSections: [
    {
      title: "PHQ-9 ou PHQ-2 : lequel choisir ?",
      body: [
        "Le PHQ-2 reprend uniquement les 2 premiers items du PHQ-9 (perte d'intérêt et humeur dépressive). C'est un outil de triage très rapide : un score ≥ 3 indique qu'une évaluation plus complète est nécessaire, et c'est là que le PHQ-9 prend le relais.",
        "En consultation psychologique, le PHQ-9 est presque toujours préférable : il couvre l'ensemble des symptômes, dont l'item 9, et permet le suivi de la sévérité. Le PHQ-2 sert au dépistage, pas au suivi.",
      ],
    },
  ],

  faq: [
    {
      question: "Qu'est-ce que le PHQ-9 ?",
      answer:
        "Le PHQ-9 (Patient Health Questionnaire-9) est un auto-questionnaire de 9 questions qui évalue la sévérité des symptômes dépressifs sur les 2 dernières semaines. Chaque question correspond à un critère de l'épisode dépressif caractérisé du DSM. Il sert au dépistage et au suivi de la dépression.",
    },
    {
      question: "Le PHQ-9 est-il gratuit et libre de droits ?",
      answer:
        "Oui. Le formulaire officiel l'indique : la reproduction, la traduction, l'affichage et la distribution du PHQ-9 sont autorisés sans demande préalable. La mention des auteurs (Spitzer, Williams, Kroenke et collègues, avec une allocation d'études de Pfizer Inc.) doit être conservée.",
    },
    {
      question: "Où trouver le PHQ-9 en français (PDF) ?",
      answer:
        "La version de référence en France est la traduction officielle « French for France » distribuée par Pfizer. Vous pouvez la télécharger depuis cette page, dans la section des sources, en bas de page.",
    },
    {
      question: "Que signifie un score de 10 au PHQ-9 ?",
      answer:
        "Un score de 10 correspond à des symptômes dépressifs modérés et atteint le seuil de dépistage de référence. Il ne pose pas de diagnostic, mais justifie une évaluation clinique approfondie. Vérifiez aussi l'item 9, indépendamment du score total.",
    },
    {
      question: "Que faire si un patient répond 1 ou plus à l'item 9 ?",
      answer:
        "Conduire une évaluation du risque suicidaire, indépendamment du score total : nature des pensées (passives ou actives), existence d'un projet ou d'un scénario, accès aux moyens, facteurs de protection. Le PHQ-9 ne remplace pas cette évaluation, il la déclenche.",
    },
    {
      question: "Peut-on poser un diagnostic de dépression avec le PHQ-9 ?",
      answer:
        "Non. Le PHQ-9 mesure la sévérité des symptômes et oriente le dépistage. Son algorithme diagnostique (au moins 5 items cotés « plus de la moitié du temps », dont l'item 1 ou 2) évoque un épisode dépressif caractérisé, mais le diagnostic repose sur l'entretien clinique, l'histoire du patient et le contexte.",
    },
    {
      question: "Quelle est la différence entre le PHQ-9 et le BDI-II ?",
      answer:
        "Les deux mesurent la sévérité dépressive, mais ne sont pas construits de la même façon. Le PHQ-9 suit les critères du DSM et se remplit en 3 à 5 minutes. Le BDI-II, plus long (21 items), est plus sensible aux nuances cognitives et émotionnelles de la dépression. Un même patient peut obtenir des niveaux différents sur les deux : ils ne sont pas interchangeables.",
    },
    {
      question: "Peut-on utiliser le PHQ-9 avec des adolescents ?",
      answer:
        "Le PHQ-9 a été validé chez l'adulte. Pour les adolescents, la version PHQ-A adapte certains items au contexte développemental et a fait l'objet d'une validation spécifique (Johnson et al., 2002).",
    },
    {
      question: "Le PHQ-9 peut-il être rempli en ligne ?",
      answer:
        "Oui. Le PHQ-9 est conçu pour l'auto-évaluation et s'utilise aussi bien sur papier qu'en ligne. Ce qui compte est de proposer le texte officiel, sans modification des items ni des modalités de réponse.",
    },
    {
      question: "Comment citer le PHQ-9 ?",
      answer:
        "Citez la publication originale : Kroenke, K., Spitzer, R. L., & Williams, J. B. W. (2001). The PHQ-9: Validity of a brief depression severity measure. Journal of General Internal Medicine, 16(9), 606–613.",
    },
  ],

  questionnaire: {
    kind: "download",
    file: "/questionnaires/phq-9-questionnaire-francais.pdf",
    publisher: "Pfizer Inc., version officielle « French for France »",
  },
  frenchVersion: {
    summary:
      "Melya utilise la traduction officielle « French for France » distribuée par Pfizer, reprise mot pour mot. Cette version précise n'a pas fait l'objet d'une étude de validation publiée sur population française ; les validations francophones portent sur des versions proches, en Suisse romande (Carballeira et al., 2007) et au Canada (Arthurs et al., 2012), qui montrent des scores comparables à la version anglaise.",
    validated: false,
  },
  sources: [
    {
      citation:
        "Kroenke, K., Spitzer, R. L., & Williams, J. B. W. (2001). The PHQ-9: Validity of a brief depression severity measure. Journal of General Internal Medicine, 16(9), 606–613.",
      url: "https://doi.org/10.1046/j.1525-1497.2001.016009606.x",
    },
    {
      citation:
        "Levis, B., Benedetti, A., & Thombs, B. D. (2019). Accuracy of Patient Health Questionnaire-9 (PHQ-9) for screening to detect major depression: Individual participant data meta-analysis. BMJ, 365, l1476.",
      url: "https://doi.org/10.1136/bmj.l1476",
    },
    {
      citation:
        "Löwe, B., Unützer, J., Callahan, C. M., Perkins, A. J., & Kroenke, K. (2004). Monitoring depression treatment outcomes with the Patient Health Questionnaire-9. Medical Care, 42(12), 1194–1201.",
      url: "https://doi.org/10.1097/00005650-200412000-00006",
    },
    {
      citation:
        "Simon, G. E., Rutter, C. M., Peterson, D., Oliver, M., Whiteside, U., Operskalski, B., & Ludman, E. J. (2013). Does response on the PHQ-9 Depression Questionnaire predict subsequent suicide attempt or suicide death? Psychiatric Services, 64(12), 1195–1202.",
      url: "https://doi.org/10.1176/appi.ps.201200587",
    },
    {
      citation:
        "Kroenke, K., Spitzer, R. L., & Williams, J. B. W. (2003). The Patient Health Questionnaire-2: Validity of a two-item depression screener. Medical Care, 41(11), 1284–1292.",
      url: "https://doi.org/10.1097/01.MLR.0000093487.78664.3C",
    },
    {
      citation:
        "Johnson, J. G., Harris, E. S., Spitzer, R. L., & Williams, J. B. W. (2002). The Patient Health Questionnaire for Adolescents: Validation of an instrument for the assessment of mental disorders among adolescent primary care patients. Journal of Adolescent Health, 30(3), 196–204.",
      url: "https://doi.org/10.1016/s1054-139x(01)00333-0",
    },
    {
      citation:
        "Carballeira, Y., Dumont, P., Borgacci, S., Rentsch, D., de Tonnac, N., Archinard, M., & Andreoli, A. (2007). Criterion validity of the French version of Patient Health Questionnaire (PHQ) in a hospital department of internal medicine. Psychology and Psychotherapy, 80(1), 69–77.",
      url: "https://doi.org/10.1348/147608306X103641",
    },
    {
      citation:
        "Arthurs, E., Steele, R. J., Hudson, M., Baron, M., & Thombs, B. D. (2012). Are scores on English and French versions of the PHQ-9 comparable? An assessment of differential item functioning. PLoS One, 7(12), e52028.",
      url: "https://doi.org/10.1371/journal.pone.0052028",
    },
  ],
  apaCitation:
    "Kroenke, K., Spitzer, R. L., & Williams, J. B. W. (2001). The PHQ-9: Validity of a brief depression severity measure. Journal of General Internal Medicine, 16(9), 606–613. https://doi.org/10.1046/j.1525-1497.2001.016009606.x",

  related: ["gad-7", "adrs", "atq", "bat-w"],

  updatedAt: "2026-10-23",
  // reviewedBy: { name: "Renata Dujmusic", jobTitle: "Psychologue TCC", date: "AAAA-MM-JJ" },
  // ↑ à décommenter une fois sa relecture faite.
};

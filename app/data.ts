export const questionnaires = [
  {
    id: 1,
    title: "Échelle d'anxiété sociale de Liebowitz",
    description:
      "Un questionnaire clinique de 24 items qui mesure la peur et l'évitement dans des situations sociales et de performance",
    category: "Anxiété sociale",
    estimatedTime: "10-15 minutes",
    longDescription:
      "L'Échelle d'anxiété sociale de Liebowitz (LSAS) est un questionnaire développé par le psychiatre Michael Liebowitz pour évaluer la gravité de l'anxiété sociale. Il mesure à la fois la peur et l'évitement dans 24 situations sociales différentes. Chaque situation est évaluée deux fois : une fois pour le niveau d'anxiété qu'elle provoque (de 0 à 3, où 0 signifie aucune anxiété et 3 une anxiété sévère) et une fois pour la fréquence d'évitement de la situation (également de 0 à 3). Le LSAS est largement utilisé en recherche clinique et en pratique pour évaluer l'efficacité des traitements pour l'anxiété sociale.",
    questions: [
      "Téléphoner en public",
      "Participer à un petit groupe",
      "Manger dans un lieu public",
      // "Boire en compagnie dans un lieu public",
      // "Parler à des personnes qui détiennent une autorité",
      // "Jouer, donner une représentation ou une conférence devant un public",
      // "Aller à une soirée",
      // "Travailler en étant observé",
      // "Écrire en étant observé",
      // "Appeler quelqu'un que vous ne connaissez pas très bien",
      // "Parler à des personnes que vous ne connaissez pas très bien",
      // "Rencontrer des inconnus",
      // "Uriner dans des toilettes publiques",
      // "Entrer dans une pièce alors que tout le monde est déjà assis",
      // "Être le centre d'attention",
      // "Prendre la parole à une réunion",
      // "Passer un examen",
      // "Exprimer son désaccord ou sa désapprobation à des personnes que vous ne connaissez pas très bien",
      // "Regarder dans les yeux des personnes que vous ne connaissez pas très bien",
      // "Faire un compte rendu à un groupe",
      // "Essayer de séduire quelqu'un",
      // "Rapporter des marchandises dans un magasin",
      // "Donner une soirée",
      // "Résister aux pressions d'un vendeur insistant",
    ],
    answerScales: {
      anxiety: [
        { value: 0, label: "Aucune" },
        { value: 1, label: "Légère" },
        { value: 2, label: "Moyenne" },
        { value: 3, label: "Sévère" },
      ],
      avoidance: [
        { value: 0, label: "Jamais (0%)" },
        { value: 1, label: "Occasionnellement (1-33%)" },
        { value: 2, label: "Fréquemment (34-67%)" },
        { value: 3, label: "Habituellement (68-100%)" },
      ],
    },
    scoring: {
      ranges: [
        { min: 0, max: 54, interpretation: "Anxiété sociale légère" },
        { min: 55, max: 64, interpretation: "Anxiété sociale modérée" },
        { min: 65, max: 79, interpretation: "Anxiété sociale marquée" },
        { min: 80, max: 144, interpretation: "Anxiété sociale sévère" },
      ],
      method:
        "Pour chaque situation, additionnez les scores d'anxiété (0-3) et d'évitement (0-3). Le score total varie de 0 à 144.",
    },
  },
  // {
  //   id: 1,
  //   title: "Inventaire de Dépression de Beck (BDI)",
  //   description:
  //     "Un questionnaire d'auto-évaluation à choix multiples de 21 questions pour mesurer la sévérité de la dépression",
  //   category: "Dépression",
  //   questions: 21,
  //   estimatedTime: "10-15 minutes",
  //   longDescription:
  //     "L'Inventaire de Dépression de Beck (BDI) est un questionnaire d'auto-évaluation à choix multiples de 21 questions, l'un des tests psychométriques les plus largement utilisés pour mesurer la sévérité de la dépression. Son développement a marqué un changement parmi les professionnels de la santé mentale, qui avaient jusqu'alors considéré la dépression d'un point de vue psychodynamique, au lieu de la voir comme enracinée dans les propres pensées du patient. Le BDI est largement utilisé comme outil d'évaluation par les professionnels de la santé et les chercheurs dans divers contextes.",
  //   sampleQuestions: [
  //     "Tristesse",
  //     "Pessimisme",
  //     "Échecs passés",
  //     "Perte de plaisir",
  //     "Sentiments de culpabilité",
  //   ],
  // },
  // {
  //   id: 2,
  //   title: "Échelle d'Anxiété de Hamilton (HAM-A)",
  //   description:
  //     "Un questionnaire psychologique utilisé pour évaluer la sévérité de l'anxiété d'un patient",
  //   category: "Anxiété",
  //   questions: 14,
  //   estimatedTime: "10-15 minutes",
  //   longDescription:
  //     "L'Échelle d'Anxiété de Hamilton (HAM-A) est un questionnaire psychologique utilisé par les cliniciens pour évaluer la sévérité de l'anxiété d'un patient. L'anxiété peut faire référence à des choses telles qu'\"un état mental... une pulsion... une réponse à une situation particulière... un trait de personnalité... et un trouble psychiatrique.\" L'échelle comprend 14 items conçus pour évaluer la sévérité de l'anxiété d'un patient. Chaque item est noté sur une échelle de 5 points, allant de 0 (non présent) à 4 (sévère).",
  //   sampleQuestions: [
  //     "Humeur anxieuse",
  //     "Tension",
  //     "Peurs",
  //     "Insomnie",
  //     "Intellectuel",
  //   ],
  // },
  // {
  //   id: 3,
  //   title: "Échelle d'Évaluation du TDAH",
  //   description:
  //     "Un questionnaire utilisé pour évaluer les symptômes du trouble déficitaire de l'attention avec hyperactivité",
  //   category: "TDAH",
  //   questions: 18,
  //   estimatedTime: "5-10 minutes",
  //   longDescription:
  //     "L'Échelle d'Évaluation du TDAH est un inventaire de rapport parental ou enseignant créé par George J. DuPaul, Thomas J. Power, Arthur D. Anastopoulos et Robert Reid. Il a été publié pour la première fois en 1998 et est actuellement dans sa cinquième édition, l'Échelle d'Évaluation du TDAH-5. Il est utilisé pour aider à diagnostiquer le trouble déficitaire de l'attention avec hyperactivité (TDAH) chez les enfants âgés de 5 à 17 ans. Le questionnaire comprend 18 questions directement liées aux critères diagnostiques du DSM pour le TDAH.",
  //   sampleQuestions: [
  //     "Ne parvient pas à prêter attention aux détails ou fait des erreurs d'inattention",
  //     "Remue les mains ou les pieds ou se tortille sur son siège",
  //     "A des difficultés à maintenir son attention dans les tâches ou les activités ludiques",
  //     "Quitte son siège en classe ou dans d'autres situations où il est attendu de rester assis",
  //     "Ne semble pas écouter lorsqu'on lui parle directement",
  //   ],
  // },
  // {
  //   id: 4,
  //   title: "Indice de Qualité du Sommeil de Pittsburgh (PSQI)",
  //   description:
  //     "Un questionnaire d'auto-évaluation qui évalue la qualité du sommeil sur une période d'un mois",
  //   category: "Sommeil",
  //   questions: 19,
  //   estimatedTime: "5-10 minutes",
  //   longDescription:
  //     "L'Indice de Qualité du Sommeil de Pittsburgh (PSQI) est un questionnaire d'auto-évaluation qui évalue la qualité du sommeil sur une période d'un mois. La mesure comprend 19 items individuels, créant 7 composantes qui produisent un score global. Le PSQI est destiné à être une mesure standardisée de la qualité du sommeil pour aider les cliniciens à identifier facilement les bons et les mauvais dormeurs. Il a été traduit en 56 langues et a été utilisé dans un large éventail d'études cliniques et basées sur la population.",
  //   sampleQuestions: [
  //     "Au cours du mois dernier, à quelle heure vous êtes-vous habituellement couché ?",
  //     "Combien de temps (en minutes) vous a-t-il fallu pour vous endormir chaque nuit ?",
  //     "À quelle heure vous êtes-vous habituellement levé le matin ?",
  //     "Combien d'heures de sommeil réel avez-vous eu par nuit ?",
  //     "Comment évalueriez-vous la qualité globale de votre sommeil ?",
  //   ],
  // },
  // {
  //   id: 5,
  //   title: "Trouble d'Anxiété Généralisée 7 (GAD-7)",
  //   description:
  //     "Un questionnaire auto-déclaré pour le dépistage et la mesure de la sévérité du trouble d'anxiété généralisée",
  //   category: "Anxiété",
  //   questions: 7,
  //   estimatedTime: "2-5 minutes",
  //   longDescription:
  //     "Le Trouble d'Anxiété Généralisée 7 (GAD-7) est un questionnaire auto-déclaré pour le dépistage et la mesure de la sévérité du trouble d'anxiété généralisée (TAG). Le GAD-7 comporte sept items, qui mesurent la sévérité de divers signes de TAG selon les catégories de réponse rapportées avec des points attribués. L'évaluation est indiquée par le score total, qui est constitué en additionnant les scores pour l'échelle des sept items.",
  //   sampleQuestions: [
  //     "Se sentir nerveux, anxieux ou à cran",
  //     "Ne pas être capable d'arrêter de s'inquiéter ou de contrôler ses inquiétudes",
  //     "S'inquiéter trop à propos de différentes choses",
  //     "Avoir du mal à se détendre",
  //     "Être si agité qu'il est difficile de rester assis",
  //   ],
  // },
  // {
  //   id: 6,
  //   title: "Questionnaire sur la Santé du Patient (PHQ-9)",
  //   description:
  //     "Un instrument polyvalent pour le dépistage, le diagnostic, le suivi et la mesure de la sévérité de la dépression",
  //   category: "Dépression",
  //   questions: 9,
  //   estimatedTime: "2-5 minutes",
  //   longDescription:
  //     "Le Questionnaire sur la Santé du Patient (PHQ-9) est un instrument de 9 questions donné aux patients dans un cadre de soins primaires pour dépister la présence et la sévérité de la dépression. C'est l'échelle de dépression à 9 items du Questionnaire sur la Santé du Patient (PHQ). Les résultats du PHQ-9 peuvent être utilisés pour établir un diagnostic de dépression selon les critères du DSM-IV et prennent moins de 3 minutes à compléter.",
  //   sampleQuestions: [
  //     "Peu d'intérêt ou de plaisir à faire les choses",
  //     "Se sentir triste, déprimé ou désespéré",
  //     "Difficultés à s'endormir ou à rester endormi, ou dormir trop",
  //     "Se sentir fatigué ou avoir peu d'énergie",
  //     "Mauvais appétit ou trop manger",
  //   ],
  // },
];

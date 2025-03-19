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
      "Boire en compagnie dans un lieu public",
      "Parler à des personnes qui détiennent une autorité",
      "Jouer, donner une représentation ou une conférence devant un public",
      "Aller à une soirée",
      "Travailler en étant observé",
      "Écrire en étant observé",
      "Appeler quelqu'un que vous ne connaissez pas très bien",
      "Parler à des personnes que vous ne connaissez pas très bien",
      "Rencontrer des inconnus",
      "Uriner dans des toilettes publiques",
      "Entrer dans une pièce alors que tout le monde est déjà assis",
      "Être le centre d'attention",
      "Prendre la parole à une réunion",
      "Passer un examen",
      "Exprimer son désaccord ou sa désapprobation à des personnes que vous ne connaissez pas très bien",
      "Regarder dans les yeux des personnes que vous ne connaissez pas très bien",
      "Faire un compte rendu à un groupe",
      "Essayer de séduire quelqu'un",
      "Rapporter des marchandises dans un magasin",
      "Donner une soirée",
      "Résister aux pressions d'un vendeur insistant",
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
  //   id: 2,
  //   title: "Inventaire de Dépression de Beck (BDI)",
  //   description:
  //     "Un questionnaire d'auto-évaluation à choix multiples de 21 questions pour mesurer la sévérité de la dépression",
  //   category: "Dépression",
  //   estimatedTime: "10-15 minutes",
  //   longDescription:
  //     "L'Inventaire de Dépression de Beck (BDI) est un questionnaire d'auto-évaluation à choix multiples de 21 questions, l'un des tests psychométriques les plus largement utilisés pour mesurer la sévérité de la dépression. Son développement a marqué un changement parmi les professionnels de la santé mentale, qui avaient jusqu'alors considéré la dépression d'un point de vue psychodynamique, au lieu de la voir comme enracinée dans les propres pensées du patient. Le BDI est largement utilisé comme outil d'évaluation par les professionnels de la santé et les chercheurs dans divers contextes.",
  //   questions: [
  //     "Tristesse",
  //     "Pessimisme",
  //     "Échecs passés",
  //     "Perte de plaisir",
  //     "Sentiments de culpabilité",
  //     "Sentiments de punition",
  //     "Déception envers soi-même",
  //     "Auto-critique",
  //     "Pensées ou désirs de suicide",
  //     "Pleurs",
  //     "Agitation",
  //     "Perte d'intérêt",
  //     "Indécision",
  //     "Dévalorisation",
  //     "Perte d'énergie",
  //     "Modifications dans les habitudes de sommeil",
  //     "Irritabilité",
  //     "Modifications de l'appétit",
  //     "Difficulté de concentration",
  //     "Fatigue",
  //     "Perte d'intérêt pour le sexe",
  //   ],
  //   answerScales: {
  //     intensity: [
  //       { value: 0, label: "Pas du tout" },
  //       { value: 1, label: "Légèrement" },
  //       { value: 2, label: "Modérément" },
  //       { value: 3, label: "Sévèrement" },
  //     ],
  //   },
  //   scoring: {
  //     ranges: [
  //       { min: 0, max: 13, interpretation: "Dépression minimale" },
  //       { min: 14, max: 19, interpretation: "Dépression légère" },
  //       { min: 20, max: 28, interpretation: "Dépression modérée" },
  //       { min: 29, max: 63, interpretation: "Dépression sévère" },
  //     ],
  //     method:
  //       "Additionnez les scores de chaque question (0-3). Le score total varie de 0 à 63.",
  //   },
  // },
  // {
  //   id: 3,
  //   title: "Échelle d'Anxiété de Hamilton (HAM-A)",
  //   description:
  //     "Un questionnaire psychologique utilisé pour évaluer la sévérité de l'anxiété d'un patient",
  //   category: "Anxiété",
  //   estimatedTime: "10-15 minutes",
  //   longDescription:
  //     "L'Échelle d'Anxiété de Hamilton (HAM-A) est un questionnaire psychologique utilisé par les cliniciens pour évaluer la sévérité de l'anxiété d'un patient. L'anxiété peut faire référence à des choses telles qu'\"un état mental... une pulsion... une réponse à une situation particulière... un trait de personnalité... et un trouble psychiatrique.\" L'échelle comprend 14 items conçus pour évaluer la sévérité de l'anxiété d'un patient. Chaque item est noté sur une échelle de 5 points, allant de 0 (non présent) à 4 (sévère).",
  //   questions: [
  //     "Humeur anxieuse (inquiétudes, anticipation du pire)",
  //     "Tension (sensation de tension, sursauts, pleurs faciles, tremblements)",
  //     "Peurs (du noir, des étrangers, d'être abandonné, des animaux)",
  //     "Insomnie (difficultés d'endormissement, sommeil interrompu)",
  //     "Fonctions intellectuelles (difficultés de concentration, mémoire défaillante)",
  //     "Humeur dépressive (perte d'intérêt, anhédonie, insomnie matinale)",
  //     "Symptômes somatiques généraux - musculaires (douleurs, raideurs)",
  //     "Symptômes somatiques généraux - sensoriels (bourdonnements d'oreilles, vision floue)",
  //     "Symptômes cardiovasculaires (tachycardie, palpitations, douleurs thoraciques)",
  //     "Symptômes respiratoires (pression thoracique, sensation d'étouffement)",
  //     "Symptômes gastro-intestinaux (difficultés à avaler, nausées, douleurs abdominales)",
  //     "Symptômes génito-urinaires (mictions fréquentes, impuissance)",
  //     "Symptômes du système nerveux autonome (bouche sèche, pâleur, transpiration)",
  //     "Comportement lors de l'entretien (agitation, impatience, tension)",
  //   ],
  //   answerScales: {
  //     severity: [
  //       { value: 0, label: "Absent" },
  //       { value: 1, label: "Léger" },
  //       { value: 2, label: "Moyen" },
  //       { value: 3, label: "Fort" },
  //       { value: 4, label: "Très fort" },
  //     ],
  //   },
  //   scoring: {
  //     ranges: [
  //       { min: 0, max: 17, interpretation: "Anxiété légère" },
  //       { min: 18, max: 24, interpretation: "Anxiété modérée" },
  //       { min: 25, max: 30, interpretation: "Anxiété sévère" },
  //       { min: 31, max: 56, interpretation: "Anxiété très sévère" },
  //     ],
  //     method:
  //       "Additionnez les scores de chaque item (0-4). Le score total varie de 0 à 56.",
  //   },
  // },
  // {
  //   id: 4,
  //   title: "Trouble d'Anxiété Généralisée 7 (GAD-7)",
  //   description:
  //     "Un questionnaire auto-déclaré pour le dépistage et la mesure de la sévérité du trouble d'anxiété généralisée",
  //   category: "Anxiété",
  //   estimatedTime: "2-5 minutes",
  //   longDescription:
  //     "Le Trouble d'Anxiété Généralisée 7 (GAD-7) est un questionnaire auto-déclaré pour le dépistage et la mesure de la sévérité du trouble d'anxiété généralisée (TAG). Le GAD-7 comporte sept items, qui mesurent la sévérité de divers signes de TAG selon les catégories de réponse rapportées avec des points attribués. L'évaluation est indiquée par le score total, qui est constitué en additionnant les scores pour l'échelle des sept items.",
  //   questions: [
  //     "Se sentir nerveux, anxieux ou à cran",
  //     "Ne pas être capable d'arrêter de s'inquiéter ou de contrôler ses inquiétudes",
  //     "S'inquiéter trop à propos de différentes choses",
  //     "Avoir du mal à se détendre",
  //     "Être si agité qu'il est difficile de rester assis",
  //     "Devenir facilement contrarié ou irritable",
  //     "Avoir peur que quelque chose d'horrible puisse arriver",
  //   ],
  //   answerScales: {
  //     frequency: [
  //       { value: 0, label: "Jamais" },
  //       { value: 1, label: "Plusieurs jours" },
  //       { value: 2, label: "Plus de la moitié des jours" },
  //       { value: 3, label: "Presque tous les jours" },
  //     ],
  //   },
  //   scoring: {
  //     ranges: [
  //       { min: 0, max: 4, interpretation: "Anxiété minimale" },
  //       { min: 5, max: 9, interpretation: "Anxiété légère" },
  //       { min: 10, max: 14, interpretation: "Anxiété modérée" },
  //       { min: 15, max: 21, interpretation: "Anxiété sévère" },
  //     ],
  //     method:
  //       "Additionnez les scores de chaque item (0-3). Le score total varie de 0 à 21.",
  //   },
  // },
  // {
  //   id: 5,
  //   title: "Questionnaire sur la Santé du Patient (PHQ-9)",
  //   description:
  //     "Un instrument polyvalent pour le dépistage, le diagnostic, le suivi et la mesure de la sévérité de la dépression",
  //   category: "Dépression",
  //   estimatedTime: "2-5 minutes",
  //   longDescription:
  //     "Le Questionnaire sur la Santé du Patient (PHQ-9) est un instrument de 9 questions donné aux patients dans un cadre de soins primaires pour dépister la présence et la sévérité de la dépression. C'est l'échelle de dépression à 9 items du Questionnaire sur la Santé du Patient (PHQ). Les résultats du PHQ-9 peuvent être utilisés pour établir un diagnostic de dépression selon les critères du DSM-IV et prennent moins de 3 minutes à compléter.",
  //   questions: [
  //     "Peu d'intérêt ou de plaisir à faire les choses",
  //     "Se sentir triste, déprimé ou désespéré",
  //     "Difficultés à s'endormir ou à rester endormi, ou dormir trop",
  //     "Se sentir fatigué ou avoir peu d'énergie",
  //     "Mauvais appétit ou trop manger",
  //     "Mauvaise perception de vous-même — ou vous pensez que vous êtes un perdant ou que vous n'avez pas satisfait vos propres attentes ou celles de votre famille",
  //     "Difficultés à se concentrer sur des choses telles que lire le journal ou regarder la télévision",
  //     "Vous bougez ou parlez si lentement que les autres personnes ont pu le remarquer. Ou au contraire — vous êtes si agité que vous bougez beaucoup plus que d'habitude",
  //     "Vous avez pensé que vous seriez mieux mort ou pensé à vous blesser d'une façon ou d'une autre",
  //   ],
  //   answerScales: {
  //     frequency: [
  //       { value: 0, label: "Jamais" },
  //       { value: 1, label: "Plusieurs jours" },
  //       { value: 2, label: "Plus de la moitié des jours" },
  //       { value: 3, label: "Presque tous les jours" },
  //     ],
  //   },
  //   scoring: {
  //     ranges: [
  //       { min: 0, max: 4, interpretation: "Dépression minimale ou absente" },
  //       { min: 5, max: 9, interpretation: "Dépression légère" },
  //       { min: 10, max: 14, interpretation: "Dépression modérée" },
  //       { min: 15, max: 19, interpretation: "Dépression modérément sévère" },
  //       { min: 20, max: 27, interpretation: "Dépression sévère" },
  //     ],
  //     method:
  //       "Additionnez les scores de chaque item (0-3). Le score total varie de 0 à 27.",
  //   },
  // },
  // {
  //   id: 6,
  //   title: "Échelle d'Évaluation du TDAH",
  //   description:
  //     "Un questionnaire utilisé pour évaluer les symptômes du trouble déficitaire de l'attention avec hyperactivité",
  //   category: "TDAH",
  //   estimatedTime: "5-10 minutes",
  //   longDescription:
  //     "L'Échelle d'Évaluation du TDAH est un inventaire de rapport parental ou enseignant créé par George J. DuPaul, Thomas J. Power, Arthur D. Anastopoulos et Robert Reid. Il a été publié pour la première fois en 1998 et est actuellement dans sa cinquième édition, l'Échelle d'Évaluation du TDAH-5. Il est utilisé pour aider à diagnostiquer le trouble déficitaire de l'attention avec hyperactivité (TDAH) chez les enfants âgés de 5 à 17 ans. Le questionnaire comprend 18 questions directement liées aux critères diagnostiques du DSM pour le TDAH.",
  //   questions: [
  //     "Ne parvient pas à prêter attention aux détails ou fait des erreurs d'inattention",
  //     "Remue les mains ou les pieds ou se tortille sur son siège",
  //     "A des difficultés à maintenir son attention dans les tâches ou les activités ludiques",
  //     "Quitte son siège en classe ou dans d'autres situations où il est attendu de rester assis",
  //     "Ne semble pas écouter lorsqu'on lui parle directement",
  //     "Court ou grimpe excessivement dans des situations où cela est inapproprié",
  //     "Ne suit pas les instructions et ne parvient pas à terminer le travail scolaire",
  //     "A des difficultés à jouer ou à s'engager dans des activités de loisirs calmement",
  //     "A des difficultés à s'organiser pour les tâches et les activités",
  //     "Est 'sur la brèche' ou agit comme s'il était 'monté sur ressorts'",
  //     "Évite, n'aime pas ou est réticent à s'engager dans des tâches nécessitant un effort mental soutenu",
  //     "Parle excessivement",
  //     "Perd des objets nécessaires aux tâches ou activités",
  //     "Laisse échapper des réponses avant que les questions ne soient terminées",
  //     "Est facilement distrait",
  //     "A des difficultés à attendre son tour",
  //     "Est étourdi dans les activités quotidiennes",
  //     "Interrompt ou s'impose aux autres",
  //   ],
  //   answerScales: {
  //     frequency: [
  //       { value: 0, label: "Jamais ou rarement" },
  //       { value: 1, label: "Parfois" },
  //       { value: 2, label: "Souvent" },
  //       { value: 3, label: "Très souvent" },
  //     ],
  //   },
  //   scoring: {
  //     ranges: [
  //       { min: 0, max: 16, interpretation: "Symptômes de TDAH peu probables" },
  //       { min: 17, max: 23, interpretation: "Symptômes de TDAH possibles" },
  //       { min: 24, max: 30, interpretation: "Symptômes de TDAH probables" },
  //       {
  //         min: 31,
  //         max: 54,
  //         interpretation: "Symptômes de TDAH très probables",
  //       },
  //     ],
  //     method:
  //       "Additionnez les scores de chaque item (0-3). Les items 1-9 mesurent l'inattention, les items 10-18 mesurent l'hyperactivité/impulsivité. Le score total varie de 0 à 54.",
  //   },
  // },
  // {
  //   id: 7,
  //   title: "Indice de Qualité du Sommeil de Pittsburgh (PSQI)",
  //   description:
  //     "Un questionnaire d'auto-évaluation qui évalue la qualité du sommeil sur une période d'un mois",
  //   category: "Sommeil",
  //   estimatedTime: "5-10 minutes",
  //   longDescription:
  //     "L'Indice de Qualité du Sommeil de Pittsburgh (PSQI) est un questionnaire d'auto-évaluation qui évalue la qualité du sommeil sur une période d'un mois. La mesure comprend 19 items individuels, créant 7 composantes qui produisent un score global. Le PSQI est destiné à être une mesure standardisée de la qualité du sommeil pour aider les cliniciens à identifier facilement les bons et les mauvais dormeurs. Il a été traduit en 56 langues et a été utilisé dans un large éventail d'études cliniques et basées sur la population.",
  //   questions: [
  //     "Au cours du mois dernier, à quelle heure vous êtes-vous habituellement couché ?",
  //     "Combien de temps (en minutes) vous a-t-il fallu pour vous endormir chaque nuit ?",
  //     "À quelle heure vous êtes-vous habituellement levé le matin ?",
  //     "Combien d'heures de sommeil réel avez-vous eu par nuit ?",
  //     "Au cours du mois dernier, combien de fois avez-vous eu des difficultés à dormir parce que vous ne pouviez pas vous endormir dans les 30 minutes ?",
  //     "Au cours du mois dernier, combien de fois avez-vous eu des difficultés à dormir parce que vous vous réveilliez au milieu de la nuit ou tôt le matin ?",
  //     "Au cours du mois dernier, combien de fois avez-vous eu des difficultés à dormir parce que vous deviez vous lever pour aller aux toilettes ?",
  //     "Au cours du mois dernier, combien de fois avez-vous eu des difficultés à dormir parce que vous ne pouviez pas respirer confortablement ?",
  //     "Au cours du mois dernier, combien de fois avez-vous eu des difficultés à dormir parce que vous toussiez ou ronfliez bruyamment ?",
  //     "Au cours du mois dernier, combien de fois avez-vous eu des difficultés à dormir parce que vous aviez trop froid ?",
  //     "Au cours du mois dernier, combien de fois avez-vous eu des difficultés à dormir parce que vous aviez trop chaud ?",
  //     "Au cours du mois dernier, combien de fois avez-vous eu des difficultés à dormir parce que vous faisiez de mauvais rêves ?",
  //     "Au cours du mois dernier, combien de fois avez-vous eu des difficultés à dormir parce que vous aviez des douleurs ?",
  //     "Au cours du mois dernier, combien de fois avez-vous pris des médicaments pour vous aider à dormir ?",
  //     "Au cours du mois dernier, combien de fois avez-vous eu des difficultés à rester éveillé pendant que vous conduisiez, mangiez ou participiez à une activité sociale ?",
  //     "Au cours du mois dernier, à quel point a-t-il été difficile de garder suffisamment d'enthousiasme pour faire les choses ?",
  //     "Comment évalueriez-vous la qualité globale de votre sommeil ?",
  //   ],
  //   answerScales: {
  //     frequency: [
  //       { value: 0, label: "Pas durant le dernier mois" },
  //       { value: 1, label: "Moins d'une fois par semaine" },
  //       { value: 2, label: "Une ou deux fois par semaine" },
  //       { value: 3, label: "Trois fois ou plus par semaine" },
  //     ],
  //     quality: [
  //       { value: 0, label: "Très bonne" },
  //       { value: 1, label: "Assez bonne" },
  //       { value: 2, label: "Assez mauvaise" },
  //       { value: 3, label: "Très mauvaise" },
  //     ],
  //   },
  //   scoring: {
  //     ranges: [
  //       { min: 0, max: 5, interpretation: "Bonne qualité de sommeil" },
  //       { min: 6, max: 10, interpretation: "Mauvaise qualité de sommeil" },
  //       { min: 11, max: 21, interpretation: "Trouble du sommeil sévère" },
  //     ],
  //     method:
  //       "Les 19 questions sont regroupées en 7 composantes, chacune notée de 0 à 3. Le score global varie de 0 à 21, un score plus élevé indiquant une moins bonne qualité de sommeil.",
  //   },
  // },
];

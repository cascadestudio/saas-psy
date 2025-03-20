export const questionnaires = [
  {
    id: "echelle-d-anxiete-sociale-de-liebowitz",
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
  {
    id: "inventaire-de-depression-de-beck",
    title: "Inventaire de Dépression de Beck (BDI)",
    description:
      "Un questionnaire d'auto-évaluation à choix multiples de 21 questions pour mesurer la sévérité de la dépression",
    category: "Dépression",
    estimatedTime: "10-15 minutes",
    longDescription:
      "L'Inventaire de Dépression de Beck (BDI) est un questionnaire d'auto-évaluation à choix multiples de 21 questions, l'un des tests psychométriques les plus largement utilisés pour mesurer la sévérité de la dépression. Son développement a marqué un changement parmi les professionnels de la santé mentale, qui avaient jusqu'alors considéré la dépression d'un point de vue psychodynamique, au lieu de la voir comme enracinée dans les propres pensées du patient. Le BDI est largement utilisé comme outil d'évaluation par les professionnels de la santé et les chercheurs dans divers contextes.",
    questions: [
      "Tristesse",
      "Pessimisme",
      "Échecs passés",
      "Perte de plaisir",
      "Sentiments de culpabilité",
      "Sentiments de punition",
      "Déception envers soi-même",
      "Auto-critique",
      "Pensées ou désirs de suicide",
      "Pleurs",
      "Agitation",
      "Perte d'intérêt",
      "Indécision",
      "Dévalorisation",
      "Perte d'énergie",
      "Modifications dans les habitudes de sommeil",
      "Irritabilité",
      "Modifications de l'appétit",
      "Difficulté de concentration",
      "Fatigue",
      "Perte d'intérêt pour le sexe",
    ],
    answerScales: {
      intensity: [
        { value: 0, label: "Pas du tout" },
        { value: 1, label: "Légèrement" },
        { value: 2, label: "Modérément" },
        { value: 3, label: "Sévèrement" },
      ],
    },
    scoring: {
      ranges: [
        { min: 0, max: 13, interpretation: "Dépression minimale" },
        { min: 14, max: 19, interpretation: "Dépression légère" },
        { min: 20, max: 28, interpretation: "Dépression modérée" },
        { min: 29, max: 63, interpretation: "Dépression sévère" },
      ],
      method:
        "Additionnez les scores de chaque question (0-3). Le score total varie de 0 à 63.",
    },
  },
  {
    id: "test-questionnaire",
    title: "Questionnaire Test",
    description: "Un questionnaire court de 3 questions pour tester le système",
    category: "Test",
    estimatedTime: "2-3 minutes",
    longDescription:
      "Ce questionnaire est conçu pour tester le fonctionnement du système avec un minimum de questions.",
    questions: [
      "Comment évaluez-vous votre niveau de stress aujourd'hui ?",
      "À quel point vous sentez-vous motivé(e) ?",
      "Comment qualifieriez-vous votre qualité de sommeil ?",
    ],
    answerScales: {
      intensity: [
        { value: 0, label: "Pas du tout" },
        { value: 1, label: "Un peu" },
        { value: 2, label: "Modérément" },
        { value: 3, label: "Beaucoup" },
      ],
    },
    scoring: {
      ranges: [
        { min: 0, max: 3, interpretation: "Score faible" },
        { min: 4, max: 6, interpretation: "Score moyen" },
        { min: 7, max: 9, interpretation: "Score élevé" },
      ],
      method:
        "Additionnez les scores de chaque question (0-3). Le score total varie de 0 à 9.",
    },
  },
];

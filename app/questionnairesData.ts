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
      {
        title: "Tristesse",
        options: [
          { value: 0, text: "Je ne me sens pas triste." },
          { value: 1, text: "Je me sens morose ou triste." },
          {
            value: 2,
            text: "Je suis morose ou triste tout le temps et je ne peux pas me remettre d'aplomb.",
          },
          {
            value: 3,
            text: "Je suis tellement triste ou malheureux(se) que je ne peux plus le supporter.",
          },
        ],
      },
      {
        title: "Pessimisme",
        options: [
          {
            value: 0,
            text: "Je ne suis pas particulièrement découragé(e) par l'avenir.",
          },
          { value: 1, text: "Je me sens découragé(e) par l'avenir." },
          {
            value: 2,
            text: "J'ai l'impression de n'avoir aucune attente dans la vie ou que je n'arriverai jamais à surmonter mes difficultés.",
          },
          {
            value: 3,
            text: "Je sens que l'avenir est sans espoir et que les choses ne peuvent pas s'améliorer.",
          },
        ],
      },
      {
        title: "Échec personnel",
        options: [
          {
            value: 0,
            text: "Je n'ai pas l'impression d'avoir échoué dans la vie ou d'être un(e) raté(e).",
          },
          {
            value: 1,
            text: "J'ai l'impression d'avoir subi plus d'échecs que la moyenne des gens.",
          },
          {
            value: 2,
            text: "Quand je pense à ma vie passée, je ne vois que des échecs.",
          },
          { value: 3, text: "Je suis un(e) raté(e) complet(e)." },
        ],
      },
      {
        title: "Insatisfaction",
        options: [
          {
            value: 0,
            text: "Je tire autant de satisfaction de la vie qu'auparavant.",
          },
          {
            value: 1,
            text: "Je ne tire plus autant de satisfaction de la vie qu'auparavant.",
          },
          {
            value: 2,
            text: "Je ne tire plus de satisfaction de quoi que ce soit.",
          },
          { value: 3, text: "Tout me rend insatisfait ou m'ennuie." },
        ],
      },
      {
        title: "Culpabilité",
        options: [
          { value: 0, text: "Je ne me sens pas particulièrement coupable." },
          { value: 1, text: "Je me sens coupable une bonne partie du temps." },
          { value: 2, text: "Je me sens coupable la plupart du temps." },
          { value: 3, text: "Je me sens tout le temps coupable." },
        ],
      },
      {
        title: "Sentiment d'être puni(e)",
        options: [
          { value: 0, text: "Je n'ai pas l'impression d'être puni(e)." },
          { value: 1, text: "J'ai l'impression que je pourrais être puni(e)." },
          { value: 2, text: "Je m'attends à être puni(e)." },
          { value: 3, text: "J'ai l'impression d'être puni(e)." },
        ],
      },
      {
        title: "Déception envers soi-même",
        options: [
          { value: 0, text: "Je ne suis pas déçu(e) de moi-même." },
          { value: 1, text: "Je suis déçu(e) de moi-même." },
          { value: 2, text: "Je suis dégoûté(e) de moi-même." },
          { value: 3, text: "Je me hais." },
        ],
      },
      {
        title: "Auto-accusation",
        options: [
          { value: 0, text: "Je ne pense pas être pire que les autres." },
          {
            value: 1,
            text: "Je suis critique envers moi-même concernant mes faiblesses ou mes erreurs.",
          },
          { value: 2, text: "Je me blâme tout le temps pour mes fautes." },
          {
            value: 3,
            text: "Je me blâme pour tous les malheurs qui arrivent.",
          },
        ],
      },
      {
        title: "Idées suicidaires",
        options: [
          { value: 0, text: "Je ne pense pas du tout à me faire du mal." },
          {
            value: 1,
            text: "Je pense parfois à me faire du mal, mais je ne le ferais pas.",
          },
          {
            value: 2,
            text: "Je pense que la mort me libérerait ou j'ai des plans précis pour me suicider.",
          },
          { value: 3, text: "Je me tuerais si j'en avais l'occasion." },
        ],
      },
      {
        title: "Pleurs",
        options: [
          { value: 0, text: "Je ne pleure pas plus que d'habitude." },
          { value: 1, text: "Je pleure plus qu'avant." },
          { value: 2, text: "Je pleure pour la moindre petite chose." },
          {
            value: 3,
            text: "Je voudrais pleurer mais je n'en suis pas capable.",
          },
        ],
      },
      {
        title: "Irritabilité",
        options: [
          {
            value: 0,
            text: "Je ne suis pas plus irritable qu'habituellement.",
          },
          { value: 1, text: "Je suis plus irritable que d'habitude." },
          { value: 2, text: "Je suis beaucoup plus irritable que d'habitude." },
          { value: 3, text: "Je suis constamment irritable." },
        ],
      },
      {
        title: "Retrait social",
        options: [
          { value: 0, text: "Je n'ai pas perdu d'intérêt pour les autres." },
          { value: 1, text: "Je m'intéresse moins aux autres qu'avant." },
          {
            value: 2,
            text: "J'ai perdu la plupart de mon intérêt pour les autres.",
          },
          { value: 3, text: "J'ai perdu tout intérêt pour les autres." },
        ],
      },
      {
        title: "Indécision",
        options: [
          { value: 0, text: "Je prends des décisions aussi bien qu'avant." },
          {
            value: 1,
            text: "Je remets les décisions au lendemain plus que d'habitude.",
          },
          {
            value: 2,
            text: "J'ai beaucoup plus de difficultés à prendre des décisions qu'auparavant.",
          },
          { value: 3, text: "Je n'arrive plus à prendre de décisions." },
        ],
      },
      {
        title: "Dévalorisation",
        options: [
          {
            value: 0,
            text: "Je n'ai pas l'impression de paraître pire qu'avant.",
          },
          {
            value: 1,
            text: "Je m'inquiète de paraître vieux (vieille) ou peu attrayant(e).",
          },
          {
            value: 2,
            text: "J'ai l'impression qu'il y a des changements permanents dans mon apparence qui me rendent peu attrayant(e).",
          },
          { value: 3, text: "Je me trouve laid(e)." },
        ],
      },
      {
        title: "Difficulté de travail",
        options: [
          { value: 0, text: "Je travaille aussi bien qu'avant." },
          {
            value: 1,
            text: "J'ai besoin de faire des efforts supplémentaires pour commencer à faire quelque chose ou je ne travaille pas aussi bien qu'avant.",
          },
          {
            value: 2,
            text: "Je dois me forcer pour faire quoi que ce soit.",
          },
          { value: 3, text: "Je ne peux faire aucun travail." },
        ],
      },
      {
        title: "Troubles du sommeil",
        options: [
          { value: 0, text: "Je dors aussi bien que d'habitude." },
          { value: 1, text: "Je ne dors pas aussi bien qu'avant." },
          {
            value: 2,
            text: "Je me réveille une à deux heures plus tôt que d'habitude et j'ai du mal à me rendormir.",
          },
          {
            value: 3,
            text: "Je me réveille plusieurs heures plus tôt que d'habitude et je ne peux me rendormir.",
          },
        ],
      },
      {
        title: "Fatigue",
        options: [
          { value: 0, text: "Je ne me fatigue pas plus que d'habitude." },
          { value: 1, text: "Je me fatigue plus facilement que d'habitude." },
          {
            value: 2,
            text: "Je me fatigue en faisant presque n'importe quoi.",
          },
          {
            value: 3,
            text: "Je suis trop fatigué(e) pour faire quoi que ce soit.",
          },
        ],
      },
      {
        title: "Perte d'appétit",
        options: [
          { value: 0, text: "Mon appétit n'est pas pire que d'habitude." },
          { value: 1, text: "Mon appétit n'est pas aussi bon qu'il l'était." },
          { value: 2, text: "Mon appétit a beaucoup diminué." },
          { value: 3, text: "Je n'ai plus d'appétit du tout." },
        ],
      },
      {
        title: "Perte de poids",
        options: [
          { value: 0, text: "Je n'ai pas perdu de poids dernièrement." },
          { value: 1, text: "J'ai perdu plus de 2 kilos." },
          { value: 2, text: "J'ai perdu plus de 4 kilos." },
          { value: 3, text: "J'ai perdu plus de 7 kilos." },
        ],
      },
      {
        title: "Préoccupations somatiques",
        options: [
          {
            value: 0,
            text: "Je ne suis pas plus préoccupé(e) par ma santé que d'habitude.",
          },
          {
            value: 1,
            text: "Je suis préoccupé(e) par des maux et des douleurs, des problèmes d'estomac ou de constipation.",
          },
          {
            value: 2,
            text: "Je suis tellement préoccupé(e) par ce que je ressens ou comment je me sens qu'il est difficile de penser à autre chose.",
          },
          {
            value: 3,
            text: "Je suis complètement absorbé(e) par ce que je ressens.",
          },
        ],
      },
      {
        title: "Perte de libido",
        options: [
          {
            value: 0,
            text: "Je n'ai pas remarqué de changement récent dans mon intérêt pour le sexe.",
          },
          { value: 1, text: "Je m'intéresse moins au sexe qu'auparavant." },
          {
            value: 2,
            text: "Je m'intéresse beaucoup moins au sexe maintenant.",
          },
          { value: 3, text: "J'ai perdu tout intérêt pour le sexe." },
        ],
      },
    ],
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
  {
    id: "stai-anxiete-generalisee",
    title: "STAI - Inventaire d'Anxiété État-Trait",
    description:
      "Un questionnaire de 40 items évaluant l'anxiété situationnelle (état) et l'anxiété générale (trait)",
    category: "Anxiété généralisée",
    estimatedTime: "15-20 minutes",
    longDescription:
      "L'Inventaire d'Anxiété État-Trait (STAI) est un outil d'évaluation psychologique qui mesure deux types d'anxiété : l'anxiété-état (anxiété situationnelle) et l'anxiété-trait (anxiété générale). Développé par Spielberger, il est largement utilisé en recherche clinique et en pratique. Le questionnaire comprend 40 items au total, divisés en deux parties de 20 items chacune.",
    questions: [
      {
        title: "Anxiété-État (comment vous vous sentez maintenant)",
        items: [
          "Je me sens calme",
          "Je me sens en sécurité",
          "Je suis tendu(e)",
          "Je me sens surmené(e)",
          "Je me sens tranquille",
          "Je me sens bouleversé(e)",
          "Je suis préoccupé(e) par des malheurs possibles",
          "Je me sens satisfait(e)",
          "Je me sens effrayé(e)",
          "Je me sens à l'aise",
          "Je me sens sûr(e) de moi",
          "Je me sens nerveux(se)",
          "Je suis affolé(e)",
          "Je me sens indécis(e)",
          "Je suis détendu(e)",
          "Je me sens content(e)",
          "Je suis inquiet(ète)",
          "Je me sens troublé(e)",
          "Je me sens stable",
          "Je me sens bien",
        ],
      },
      {
        title: "Anxiété-Trait (comment vous vous sentez généralement)",
        items: [
          "Je me sens bien généralement",
          "Je me fatigue rapidement",
          "J'ai envie de pleurer",
          "Je souhaiterais être aussi heureux(se) que les autres semblent l'être",
          "Je perds de belles occasions parce que je n'arrive pas à me décider assez rapidement",
          "Je me sens reposé(e)",
          "Je suis calme, tranquille et en paix",
          "Je sens que les difficultés s'accumulent au point que je ne peux pas les surmonter",
          "Je m'inquiète à propos de choses sans importance",
          "Je suis heureux(se)",
          "J'ai des pensées troublantes",
          "Je manque de confiance en moi",
          "Je me sens en sécurité",
          "Je prends des décisions facilement",
          "Je me sens incompétent(e)",
          "Je suis satisfait(e)",
          "Des idées sans importance me trottent dans la tête et me tracassent",
          "Je prends les déceptions tellement à cœur que je les oublie difficilement",
          "Je suis une personne posée",
          "Je deviens tendu(e) et agité(e) quand je réfléchis à mes soucis",
        ],
      },
    ],
    answerScales: {
      intensity: [
        { value: 1, label: "Pas du tout" },
        { value: 2, label: "Un peu" },
        { value: 3, label: "Modérément" },
        { value: 4, label: "Beaucoup" },
      ],
    },
    scoring: {
      ranges: [
        { min: 20, max: 35, interpretation: "Anxiété très faible" },
        { min: 36, max: 45, interpretation: "Anxiété faible" },
        { min: 46, max: 55, interpretation: "Anxiété moyenne" },
        { min: 56, max: 65, interpretation: "Anxiété élevée" },
        { min: 66, max: 80, interpretation: "Anxiété très élevée" },
      ],
      method:
        "Pour chaque partie (État et Trait), additionnez les scores (1-4) des 20 items. Certains items sont inversés. Le score total pour chaque échelle varie de 20 à 80.",
    },
  },
  {
    id: "traumatismes-pcl5",
    title: "PCL-5 - Liste de Vérification du TSPT",
    description:
      "Un questionnaire de 20 items évaluant les symptômes du trouble de stress post-traumatique (TSPT)",
    category: "Traumatismes",
    estimatedTime: "5-10 minutes",
    longDescription:
      "La PCL-5 (Post-traumatic Stress Disorder Checklist) est un questionnaire d'auto-évaluation de 20 items qui évalue la présence et la sévérité des symptômes du TSPT selon les critères du DSM-5. Cet outil est largement utilisé tant en clinique qu'en recherche pour le dépistage du TSPT, le diagnostic provisoire, et le suivi des changements de symptômes pendant et après le traitement.",
    questions: [
      "Des souvenirs répétés, pénibles et involontaires de l'expérience stressante ?",
      "Des rêves répétés et pénibles de l'expérience stressante ?",
      "Se sentir ou agir soudainement comme si vous viviez à nouveau l'expérience stressante ?",
      "Se sentir mal quand quelque chose vous rappelle l'événement ?",
      "Avoir de fortes réactions physiques lorsque quelque chose vous rappelle l'événement (accélération cardiaque, difficulté respiratoire, sudation) ?",
      "Essayer d'éviter les souvenirs, pensées, et sentiments liés à l'événement ?",
      "Essayer d'éviter les personnes et les choses qui vous rappellent l'expérience stressante (lieux, personnes, activités, objets) ?",
      "Des difficultés à vous rappeler des parties importantes de l'événement ?",
      "Des croyances négatives sur vous-même, les autres, le monde (des croyances comme : je suis mauvais, j'ai quelque chose qui cloche, je ne peux avoir confiance en personne, le monde est dangereux) ?",
      "Vous blâmer ou blâmer quelqu'un d'autre pour l'événement ou ce qui s'est produit ensuite ?",
      "Avoir des sentiments négatifs intenses tels que peur, horreur, colère, culpabilité, ou honte ?",
      "Perdre de l'intérêt pour des activités que vous aimiez auparavant ?",
      "Vous sentir distant ou coupé des autres ?",
      "Avoir du mal à éprouver des sentiments positifs (par exemple être incapable de ressentir de la joie ou de l'amour envers vos proches) ?",
      "Comportement irritable, explosions de colère, ou agir agressivement ?",
      "Prendre des risques inconsidérés ou encore avoir des conduites qui pourraient vous mettre en danger ?",
      "Être en état de « super-alerte », hyper vigilant ou sur vos gardes ?",
      "Sursauter facilement ?",
      "Avoir du mal à vous concentrer ?",
      "Avoir du mal à trouver le sommeil ou à rester endormi ?",
    ],
    answerScales: {
      intensity: [
        { value: 0, label: "Pas du tout" },
        { value: 1, label: "Un peu" },
        { value: 2, label: "Modérément" },
        { value: 3, label: "Beaucoup" },
        { value: 4, label: "Extrêmement" },
      ],
    },
    scoring: {
      ranges: [
        { min: 0, max: 31, interpretation: "Symptômes légers" },
        { min: 32, max: 43, interpretation: "Symptômes modérés" },
        { min: 44, max: 80, interpretation: "Symptômes sévères" },
      ],
      method:
        "Additionnez les scores de chaque item (0-4). Le score total varie de 0 à 80. Un score total de 32 ou plus suggère un diagnostic probable de TSPT.",
    },
  },
  {
    id: "index-symptomes-ybocs",
    title: "Y-BOCS - Index des Symptômes Obsessionnels-Compulsifs",
    description:
      "Une échelle d'évaluation des symptômes obsessionnels-compulsifs mesurant la sévérité du TOC",
    category: "Troubles Obsessionnels Compulsifs",
    estimatedTime: "15-20 minutes",
    longDescription:
      "L'échelle Y-BOCS (Yale-Brown Obsessive Compulsive Scale) est l'outil de référence pour évaluer la sévérité des symptômes du trouble obsessionnel-compulsif (TOC). Elle évalue séparément les obsessions et les compulsions selon cinq dimensions : le temps passé, l'interférence, la détresse, la résistance et le contrôle.",
    questions: [
      // Obsessions
      "Temps passé aux obsessions : Combien de temps passez-vous à avoir des pensées obsessionnelles ?",
      "Interférence due aux obsessions : À quel point vos obsessions interfèrent-elles avec votre vie sociale, professionnelle ou personnelle ?",
      "Détresse associée aux obsessions : Quel degré de détresse vos obsessions vous causent-elles ?",
      "Résistance aux obsessions : Quel effort faites-vous pour résister aux obsessions ?",
      "Contrôle sur les obsessions : Quel contrôle avez-vous sur vos obsessions ?",
      // Compulsions
      "Temps passé aux compulsions : Combien de temps passez-vous à effectuer des comportements compulsifs ?",
      "Interférence due aux compulsions : À quel point vos compulsions interfèrent-elles avec votre vie sociale, professionnelle ou personnelle ?",
      "Détresse associée aux compulsions : Quel degré de détresse ressentiriez-vous si vous étiez empêché(e) d'accomplir vos compulsions ?",
      "Résistance aux compulsions : Quel effort faites-vous pour résister aux compulsions ?",
      "Contrôle sur les compulsions : Quel contrôle avez-vous sur vos compulsions ?",
    ],
    answerScales: {
      intensity: [
        { value: 0, label: "Aucun symptôme" },
        { value: 1, label: "Léger" },
        { value: 2, label: "Modéré" },
        { value: 3, label: "Sévère" },
        { value: 4, label: "Extrême" },
      ],
    },
    scoring: {
      ranges: [
        { min: 0, max: 7, interpretation: "Symptômes sous-cliniques" },
        { min: 8, max: 15, interpretation: "TOC léger" },
        { min: 16, max: 23, interpretation: "TOC modéré" },
        { min: 24, max: 31, interpretation: "TOC sévère" },
        { min: 32, max: 40, interpretation: "TOC extrême" },
      ],
      method:
        "Additionnez les scores (0-4) pour chaque item. Le score total varie de 0 à 40. Les scores sont divisés en sous-totaux pour les obsessions (items 1-5) et les compulsions (items 6-10).",
    },
  },
];

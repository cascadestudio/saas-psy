export type ScaleFormType = "single-scale" | "dual-scale" | "options";

export interface ScaleOption {
  value: number;
  label: string;
}

export interface ScaleRange {
  min: number;
  max: number;
  interpretation: string;
}

export interface ScaleScoring {
  ranges: ScaleRange[];
  /** Max possible total score (e.g. 27 for PHQ-9, 144 for LSAS, 40 for Y-BOCS / RSES). */
  maxScore: number;
  /** Human description of how the score is computed (shown on the scale page). */
  method: string;
}

export interface SectionIntro {
  /** 0-based question index at which this intro should be shown. */
  startIndex: number;
  text: string;
}

export interface Scale {
  id: string;
  acronym: string;
  label: string;
  icon: string;
  color: string;
  colorLight: string;
  formType: ScaleFormType;
  title: string;
  description: string;
  category: string;
  estimatedTime: string;
  longDescription: string;
  instructions?: string;
  /**
   * Per-section intros (e.g. Y-BOCS has distinct consignes for obsessions / compulsions).
   * When set, the patient flow displays each text before its `startIndex` item, and the
   * results page can surface them as separate consigne reminders.
   */
  sectionIntros?: SectionIntro[];
  /**
   * Required copyright / attribution mention. Displayed:
   * - on the patient end-of-passation screen (gris discret, une fois)
   * - on the practitioner scale library page
   * - in the footer of the practitioner results page
   */
  copyrightAttribution: string;
  reverseItems?: number[];
  /**
   * True when a higher score = better health (e.g. RSES self-esteem).
   * False for symptom scales (PHQ-9, GAD-7, PCL-5, Y-BOCS, LSAS) where higher = worse.
   * Drives delta direction, severity coloring, and trend interpretation.
   */
  higherIsBetter: boolean;
  questions: any[];
  answerScales?: Record<string, ScaleOption[]>;
  scoring: ScaleScoring;
}

export const scales: Scale[] = [
  {
    id: "echelle-d-anxiete-sociale-de-liebowitz",
    acronym: "LSAS",
    label: "Échelle d'anxiété sociale de Liebowitz",
    icon: "/images/scales/lsas.svg",
    color: "#6A9BCC",
    colorLight: "#B4CDE5",
    formType: "dual-scale",
    title: "Échelle d'anxiété sociale de Liebowitz",
    description:
      "Une échelle clinique de 24 items qui mesure la peur et l'évitement dans des situations sociales et de performance",
    category: "Anxiété sociale",
    estimatedTime: "10-15 minutes",
    longDescription:
      "L'Échelle d'anxiété sociale de Liebowitz (LSAS) est un questionnaire développé par le psychiatre Michael Liebowitz pour évaluer la gravité de l'anxiété sociale. Il mesure à la fois la peur et l'évitement dans 24 situations sociales différentes. Chaque situation est évaluée deux fois : une fois pour le niveau d'anxiété qu'elle provoque (de 0 à 3, où 0 signifie aucune anxiété et 3 une anxiété sévère) et une fois pour la fréquence d'évitement de la situation (également de 0 à 3). Le LSAS est largement utilisé en recherche clinique et en pratique pour évaluer l'efficacité des traitements pour l'anxiété sociale.",
    instructions:
      "Cette échelle évalue la façon dont l'anxiété sociale joue un rôle dans votre vie au travers de différentes situations.\n\nLisez chaque situation attentivement et répondez à deux questions à son sujet. La première concerne le niveau de peur ou d'anxiété que vous ressentez dans cette situation. La seconde concerne la fréquence à laquelle vous évitez cette situation.\n\nSi vous rencontrez une situation que vous ne vivez pas habituellement, imaginez « que se passerait-il si j'y étais confronté(e) », et cotez le niveau de peur que vous ressentiriez ainsi que la fréquence à laquelle vous l'éviteriez. Basez vos réponses sur la façon dont ces situations vous ont affecté(e) au cours de la semaine écoulée.",
    copyrightAttribution:
      "Liebowitz Social Anxiety Scale (LSAS) — Liebowitz M.R., 1987. Traduction française : J.P. Lépine & H. Cardot, 1990. Validation française : Yao et al., L'Encéphale, 1999.",
    higherIsBetter: false,
    questions: [
      { id: 1, text: "Téléphoner en public", type: "performance" },
      { id: 2, text: "Participer au sein d'un petit groupe", type: "interaction" },
      { id: 3, text: "Manger dans un lieu public", type: "performance" },
      { id: 4, text: "Boire en compagnie dans un lieu public", type: "performance" },
      { id: 5, text: "Parler à des personnes qui détiennent une autorité", type: "interaction" },
      { id: 6, text: "Jouer, donner une représentation ou une conférence devant un public", type: "performance" },
      { id: 7, text: "Aller à une soirée", type: "interaction" },
      { id: 8, text: "Travailler en étant observé", type: "performance" },
      { id: 9, text: "Écrire en étant observé", type: "performance" },
      { id: 10, text: "Appeler quelqu'un que vous ne connaissez pas très bien", type: "interaction" },
      { id: 11, text: "Parler à des personnes que vous ne connaissez pas très bien", type: "interaction" },
      { id: 12, text: "Rencontrer des inconnus", type: "interaction" },
      { id: 13, text: "Uriner dans des toilettes publiques", type: "performance" },
      { id: 14, text: "Entrer dans une pièce alors que tout le monde est déjà assis", type: "performance" },
      { id: 15, text: "Être le centre d'attention", type: "performance" },
      { id: 16, text: "Prendre la parole à une réunion", type: "performance" },
      { id: 17, text: "Passer un examen", type: "performance" },
      { id: 18, text: "Exprimer son désaccord ou sa désapprobation à des personnes que vous ne connaissez pas très bien", type: "interaction" },
      { id: 19, text: "Regarder dans les yeux des personnes que vous ne connaissez pas très bien", type: "interaction" },
      { id: 20, text: "Faire un compte rendu à un groupe", type: "performance" },
      { id: 21, text: "Essayer de séduire quelqu'un", type: "interaction" },
      { id: 22, text: "Rapporter des marchandises dans un magasin", type: "performance" },
      { id: 23, text: "Donner une soirée", type: "interaction" },
      { id: 24, text: "Résister aux pressions d'un vendeur insistant", type: "interaction" },
    ],
    answerScales: {
      anxiety: [
        { value: 0, label: "Aucune" },
        { value: 1, label: "Légère" },
        { value: 2, label: "Moyenne" },
        { value: 3, label: "Sévère" },
      ],
      avoidance: [
        { value: 0, label: "Jamais" },
        { value: 1, label: "Occasionnel (0-33%)" },
        { value: 2, label: "Fréquent (34-66%)" },
        { value: 3, label: "Habituel (67-100%)" },
      ],
    },
    scoring: {
      ranges: [
        { min: 0, max: 54, interpretation: "Anxiété sociale légère" },
        { min: 55, max: 64, interpretation: "Anxiété sociale modérée" },
        { min: 65, max: 79, interpretation: "Anxiété sociale marquée" },
        { min: 80, max: 144, interpretation: "Anxiété sociale sévère" },
      ],
      maxScore: 144,
      method:
        "Pour chaque situation, additionnez les scores d'anxiété (0-3) et d'évitement (0-3). Le score total varie de 0 à 144.",
    },
  },
  {
    id: "phq-9",
    acronym: "PHQ-9",
    label: "Questionnaire sur la Santé du Patient",
    icon: "/images/scales/phq-9.svg",
    color: "#CBCADB",
    colorLight: "#E5E4ED",
    formType: "single-scale",
    title: "PHQ-9 - Questionnaire sur la Santé du Patient",
    description:
      "Une échelle de 9 items évaluant la sévérité des symptômes dépressifs au cours des 2 dernières semaines",
    category: "Dépression",
    estimatedTime: "3-5 minutes",
    longDescription:
      "Le PHQ-9 (Patient Health Questionnaire-9) est un auto-questionnaire de 9 items issu du PRIME-MD, utilisé pour le dépistage et le suivi de la sévérité d'un épisode dépressif. Il reprend les 9 critères diagnostiques de l'épisode dépressif caractérisé du DSM. Chaque item est coté de 0 (jamais) à 3 (presque tous les jours) et le score total (0-27) permet de situer la sévérité. L'item 9 (idéation suicidaire) requiert une attention clinique particulière dès qu'il est coté ≥ 1, indépendamment du score total.",
    instructions:
      "Au cours des 2 dernières semaines, selon quelle fréquence avez-vous été gêné(e) par les problèmes suivants ?",
    copyrightAttribution:
      "PHQ-9 — Spitzer R.L., Williams J.B.W., Kroenke K. et collègues, développé avec une allocation d'études de Pfizer Inc. Aucune autorisation requise pour reproduction, traduction, affichage ou diffusion.",
    higherIsBetter: false,
    questions: [
      "Peu d'intérêt ou de plaisir à faire les choses",
      "Être triste, déprimé(e) ou désespéré(e)",
      "Difficultés à s'endormir ou à rester endormi(e), ou dormir trop",
      "Se sentir fatigué(e) ou manquer d'énergie",
      "Avoir peu d'appétit ou manger trop",
      "Avoir une mauvaise opinion de soi-même, ou avoir le sentiment d'être nul(le), ou d'avoir déçu sa famille ou s'être déçu(e) soi-même",
      "Avoir du mal à se concentrer, par exemple pour lire le journal ou regarder la télévision",
      "Bouger ou parler si lentement que les autres auraient pu le remarquer. Ou au contraire, être si agité(e) que vous avez eu du mal à tenir en place par rapport à d'habitude",
      "Penser qu'il vaudrait mieux mourir ou envisager de vous faire du mal d'une manière ou d'une autre",
    ],
    answerScales: {
      intensity: [
        { value: 0, label: "Jamais" },
        { value: 1, label: "Plusieurs jours" },
        { value: 2, label: "Plus de la moitié du temps" },
        { value: 3, label: "Presque tous les jours" },
      ],
    },
    scoring: {
      ranges: [
        { min: 0, max: 4, interpretation: "Dépression minimale" },
        { min: 5, max: 9, interpretation: "Dépression légère" },
        { min: 10, max: 14, interpretation: "Dépression modérée" },
        { min: 15, max: 19, interpretation: "Dépression modérément sévère" },
        { min: 20, max: 27, interpretation: "Dépression sévère" },
      ],
      maxScore: 27,
      method:
        "Additionnez les scores de chaque item (0-3). Le score total varie de 0 à 27. Tout score ≥ 1 à l'item 9 (idéation suicidaire) doit déclencher une alerte clinique indépendamment du score total.",
    },
  },
  {
    id: "gad-7",
    acronym: "GAD-7",
    label: "Trouble Anxieux Généralisé",
    icon: "/images/scales/gad-7.svg",
    color: "#6A9BCC",
    colorLight: "#B4CDE5",
    formType: "single-scale",
    title: "GAD-7 - Generalized Anxiety Disorder 7-item",
    description:
      "Une échelle de 7 items évaluant la sévérité des symptômes d'anxiété généralisée au cours des 14 derniers jours",
    category: "Anxiété généralisée",
    estimatedTime: "2-3 minutes",
    longDescription:
      "Le GAD-7 (Generalized Anxiety Disorder 7-item) est un auto-questionnaire de 7 items développé par Spitzer et collaborateurs (2006) pour le dépistage et la mesure de la sévérité du trouble anxieux généralisé. Chaque item est coté de 0 (jamais) à 3 (presque tous les jours), le score total varie de 0 à 21. Un score ≥ 10 correspond au seuil clinique de suspicion de TAG (sensibilité 89 %, spécificité 82 %), à laisser au jugement du practicien.",
    instructions:
      "Au cours des 14 derniers jours, à quelle fréquence avez-vous été dérangé(e) par les problèmes suivants ?",
    copyrightAttribution:
      "GAD-7 — Spitzer R.L., Kroenke K., Williams J.B.W., Löwe B. (2006). Développé avec une allocation d'études de Pfizer Inc.",
    higherIsBetter: false,
    questions: [
      "Sentiment de nervosité, d'anxiété ou de tension",
      "Incapable d'arrêter de vous inquiéter ou de contrôler vos inquiétudes",
      "Inquiétudes excessives à propos de tout et de rien",
      "Difficulté à se détendre",
      "Agitation telle qu'il est difficile de rester tranquille",
      "Devenir facilement contrarié(e) ou irritable",
      "Avoir peur que quelque chose d'épouvantable puisse arriver",
    ],
    answerScales: {
      intensity: [
        { value: 0, label: "Jamais" },
        { value: 1, label: "Plusieurs jours" },
        { value: 2, label: "Plus de la moitié des jours" },
        { value: 3, label: "Presque tous les jours" },
      ],
    },
    scoring: {
      ranges: [
        { min: 0, max: 4, interpretation: "Anxiété minimale" },
        { min: 5, max: 9, interpretation: "Anxiété légère" },
        { min: 10, max: 14, interpretation: "Anxiété modérée" },
        { min: 15, max: 21, interpretation: "Anxiété sévère" },
      ],
      maxScore: 21,
      method:
        "Additionnez les scores de chaque item (0-3). Le score total varie de 0 à 21.",
    },
  },
  {
    id: "traumatismes-pcl5",
    acronym: "PCL-5",
    label: "Liste de Vérification du TSPT",
    icon: "/images/scales/pcl-5.svg",
    color: "#C46686",
    colorLight: "#E1B2C2",
    formType: "single-scale",
    title: "PCL-5 - Liste de Vérification du TSPT",
    description:
      "Une échelle de 20 items évaluant les symptômes du trouble de stress post-traumatique (TSPT)",
    category: "Traumatismes",
    estimatedTime: "5-10 minutes",
    instructions:
      "Dans le dernier mois, dans quelle mesure avez-vous été affecté par :",
    copyrightAttribution:
      "PCL-5 — Weathers, Litz, Keane, Palmieri, Marx & Schnurr (2013), National Center for PTSD ©2013. Traduction française : Ashbaugh, Houle-Johnson, Herbert, El-Hage & Brunet (2016).",
    higherIsBetter: false,
    longDescription:
      "La PCL-5 (Post-traumatic Stress Disorder Checklist) est un questionnaire d'auto-évaluation de 20 items qui évalue la présence et la sévérité des symptômes du TSPT selon les critères du DSM-5. Cet outil est largement utilisé tant en clinique qu'en recherche pour le dépistage du TSPT, le diagnostic provisoire, et le suivi des changements de symptômes pendant et après le traitement.",
    questions: [
      "Des souvenirs indésirables, perturbants et répétitifs de l'expérience stressante ?",
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
        { min: 0, max: 32, interpretation: "Pas de trouble de stress post-traumatique" },
        { min: 33, max: 80, interpretation: "Présence éventuelle d'un trouble de stress post-traumatique" },
      ],
      maxScore: 80,
      method:
        "Additionnez les scores de chaque item (0-4). Le score total varie de 0 à 80. Un score total de 33 ou plus suggère un diagnostic probable de TSPT.",
    },
  },
  {
    id: "index-symptomes-ybocs",
    acronym: "Y-BOCS",
    label: "Index des Symptômes Obsessionnels-Compulsifs",
    icon: "/images/scales/y-bocs.svg",
    color: "#BCD1CA",
    colorLight: "#DDE8E4",
    formType: "options",
    title: "Y-BOCS - Index des Symptômes Obsessionnels-Compulsifs",
    description:
      "Une échelle d'évaluation des symptômes obsessionnels-compulsifs mesurant la sévérité du TOC",
    category: "Troubles Obsessionnels Compulsifs",
    estimatedTime: "15-20 minutes",
    higherIsBetter: false,
    instructions:
      "Les obsessions sont des idées pénibles, des pensées, des images ou des désirs impulsifs qui vous viennent à l'esprit d'une manière répétitive. Elles peuvent vous sembler apparaître contre votre volonté. Vous pouvez aussi les trouver répugnantes, reconnaître qu'elles sont dénuées de sens, ou estimer qu'elles ne correspondent pas du tout à votre personnalité. Elles sont souvent source d'angoisse.",
    sectionIntros: [
      {
        startIndex: 0,
        text: "Les obsessions sont des idées pénibles, des pensées, des images ou des désirs impulsifs qui vous viennent à l'esprit d'une manière répétitive. Elles peuvent vous sembler apparaître contre votre volonté. Vous pouvez aussi les trouver répugnantes, reconnaître qu'elles sont dénuées de sens, ou estimer qu'elles ne correspondent pas du tout à votre personnalité. Elles sont souvent source d'angoisse.",
      },
      {
        startIndex: 5,
        text: "Les compulsions, d'un autre côté, sont des comportements ou des actes que vous vous sentez obligé d'accomplir, même si vous les reconnaissez comme dénués de sens ou excessifs. Parfois, vous essayez de résister et de ne pas les faire, mais ceci s'avère souvent difficile. Vous pouvez ressentir une anxiété qui ne diminuera pas, tant que l'acte n'est pas accompli.",
      },
    ],
    copyrightAttribution:
      "Échelle Y-BOCS — Goodman et al. (1989). Traduction française : Mollard, Cottraux & Bouvard (1989), L'Encéphale, XV, 335-341.",
    longDescription:
      "L'échelle Y-BOCS (Yale-Brown Obsessive Compulsive Scale) est l'outil de référence pour évaluer la sévérité des symptômes du trouble obsessionnel-compulsif (TOC). Elle évalue séparément les obsessions et les compulsions selon cinq dimensions : le temps passé, l'interférence, la détresse, la résistance et le contrôle.",
    questions: [
      {
        title: "DURÉE DES PENSÉES OBSÉDANTES",
        prompt:
          "Combien de temps durent les pensées obsédantes ? Combien de fois la pensée obsédante arrive-t-elle ?",
        options: [
          { value: 0, text: "Aucun" },
          { value: 1, text: "Moins d'une heure par jour, ou survenue occasionnelle (pas plus de 8 fois par jour)" },
          { value: 2, text: "1 à 3 heures par jour, ou survenue très fréquente (plus de 8 fois par jour, mais la majorité de ma journée se passe sans)" },
          { value: 3, text: "3 à 8 heures par jour, ou survenue très fréquente (plus de 8 fois par jour, occupant une très grande partie de ma journée)" },
          { value: 4, text: "Plus de 8 heures par jour, ou envahissement pratiquement constant (pensées tellement nombreuses que je ne peux les compter)" },
        ],
      },
      {
        title: "GÊNE LIÉE AUX PENSÉES OBSÉDANTES",
        prompt:
          "Dans quelle mesure vos pensées obsédantes vous gênent-elles dans votre vie sociale ou professionnelle ? Y a-t-il des choses qu'il vous est impossible de faire à cause de ces pensées obsédantes ?",
        options: [
          { value: 0, text: "Aucune" },
          { value: 1, text: "Faible gêne dans mes activités sociales ou professionnelles, mais mon efficacité globale n'est pas altérée" },
          { value: 2, text: "Gêne nette dans mes activités sociales ou professionnelles, mais je peux encore faire face" },
          { value: 3, text: "Altération réelle de mes activités sociales ou professionnelles" },
          { value: 4, text: "Gêne invalidante" },
        ],
      },
      {
        title: "ANGOISSE ASSOCIÉE AUX PENSÉES OBSÉDANTES",
        prompt:
          "Quel niveau d'angoisse ces pensées obsédantes créent-elles en vous ?",
        options: [
          { value: 0, text: "Aucune" },
          { value: 1, text: "Légère, rare et très peu gênante" },
          { value: 2, text: "Moyenne, fréquente et gênante, mais je la gère encore assez bien" },
          { value: 3, text: "Importante, très fréquente et très gênante" },
          { value: 4, text: "Extrêmement importante, pratiquement constante et d'une gêne invalidante" },
        ],
      },
      {
        title: "RÉSISTANCE AUX PENSÉES OBSÉDANTES",
        prompt:
          "Quel effort fournissez-vous pour résister aux pensées obsédantes ? Essayez-vous souvent de détourner votre attention de ces pensées quand elles vous viennent à l'esprit ?",
        options: [
          { value: 0, text: "Je fais toujours l'effort de résister, ou les symptômes sont si minimes qu'il n'est pas nécessaire de leur résister" },
          { value: 1, text: "J'essaie de résister la plupart du temps" },
          { value: 2, text: "Je fais quelques efforts pour résister" },
          { value: 3, text: "Je cède à toutes les obsessions sans essayer de les contrôler, mais je suis quelque peu contrarié(e) de ne pouvoir mieux faire" },
          { value: 4, text: "Je cède volontiers et totalement à toutes les obsessions" },
        ],
      },
      {
        title: "DEGRÉ DE CONTRÔLE SUR LES PENSÉES OBSÉDANTES",
        prompt:
          "Quel contrôle exercez-vous sur vos pensées obsédantes ? Dans quelle mesure arrivez-vous à stopper ou à détourner vos pensées obsédantes ?",
        options: [
          { value: 0, text: "Contrôle total" },
          { value: 1, text: "Beaucoup de contrôle ; je suis généralement capable de stopper ou détourner les obsessions avec quelques efforts et de la concentration" },
          { value: 2, text: "Contrôle moyen, j'arrive de temps en temps à stopper ou détourner mes obsessions" },
          { value: 3, text: "Peu de contrôle, j'arrive rarement à stopper mes obsessions, je peux seulement détourner mon attention avec difficulté" },
          { value: 4, text: "Aucun contrôle, je me sens totalement dépourvu(e) de volonté, rarement capable de détourner mon attention de mes obsessions, même momentanément" },
        ],
      },
      {
        title: "DURÉE DES RITUELS",
        prompt:
          "Combien de temps passez-vous à faire des rituels ? Quelle est la fréquence de vos rituels ?",
        options: [
          { value: 0, text: "Aucun rituel" },
          { value: 1, text: "Moins d'une heure par jour, ou émission occasionnelle de conduites ritualisées (pas plus de 8 fois par jour)" },
          { value: 2, text: "1 à 3 heures par jour, ou apparition fréquente (plus de 8 fois par jour, mais le temps n'est pas en majorité envahi)" },
          { value: 3, text: "3 à 8 heures par jour, ou apparition très fréquente (plus de 8 fois par jour, la plupart du temps est pris par les compulsions)" },
          { value: 4, text: "Plus de 8 heures par jour, ou présence pratiquement constante (conduites trop nombreuses pour être dénombrées)" },
        ],
      },
      {
        title: "GÊNE LIÉE AUX RITUELS",
        prompt:
          "Dans quelle mesure les rituels vous gênent-ils dans votre vie sociale ou professionnelle ? Y a-t-il des choses qu'il vous est impossible de faire à cause de vos rituels ?",
        options: [
          { value: 0, text: "Aucune gêne" },
          { value: 1, text: "Faible gêne dans mes activités sociales ou professionnelles, mais mon efficacité globale n'est pas altérée" },
          { value: 2, text: "Gêne nette dans mes activités sociales ou professionnelles, mais je peux encore faire face" },
          { value: 3, text: "Altération réelle de mes activités sociales ou professionnelles" },
          { value: 4, text: "Gêne invalidante" },
        ],
      },
      {
        title: "ANGOISSE ASSOCIÉE AUX RITUELS",
        prompt:
          "Comment vous sentiriez-vous si l'on vous empêchait de faire votre/vos rituel(s) ? Seriez-vous très anxieux ?",
        options: [
          { value: 0, text: "Aucune angoisse" },
          { value: 1, text: "Légère anxiété si l'on m'empêchait de ritualiser, ou légère anxiété pendant l'accomplissement" },
          { value: 2, text: "L'angoisse monterait mais resterait contrôlable si l'on m'empêchait, ou l'anxiété augmente mais reste contrôlée pendant l'accomplissement" },
          { value: 3, text: "Augmentation très nette et très éprouvante de l'anxiété si les rituels sont interrompus, ou pendant leur accomplissement" },
          { value: 4, text: "Anxiété invalidante dès qu'une intervention vise à modifier l'activité ritualisée, ou pendant l'accomplissement" },
        ],
      },
      {
        title: "RÉSISTANCE AUX COMPULSIONS",
        prompt: "Quel effort fournissez-vous pour résister aux compulsions ?",
        options: [
          { value: 0, text: "Je fais toujours l'effort de résister, ou les symptômes sont si minimes qu'il n'est pas nécessaire de leur résister" },
          { value: 1, text: "J'essaie de résister la plupart du temps" },
          { value: 2, text: "Je fais quelques efforts pour résister" },
          { value: 3, text: "Je cède à tous les rituels sans essayer de les contrôler, mais je suis quelque peu contrarié(e) de ne pouvoir mieux faire" },
          { value: 4, text: "Je cède volontiers et totalement à tous les rituels" },
        ],
      },
      {
        title: "DEGRÉ DE CONTRÔLE SUR LES RITUELS",
        prompt:
          "Quelle est l'intensité de la pulsion qui vous oblige à ritualiser ? Quel contrôle pouvez-vous exercer sur les rituels ?",
        options: [
          { value: 0, text: "Contrôle total" },
          { value: 1, text: "Beaucoup de contrôle ; je ressens une certaine obligation à accomplir les rituels, mais je peux généralement exercer un contrôle volontaire sur cette pression" },
          { value: 2, text: "Contrôle moyen, forte obligation à accomplir les rituels, je peux la contrôler mais avec difficulté" },
          { value: 3, text: "Peu de contrôle, très forte obligation à accomplir les rituels ; je dois aller jusqu'au bout de l'activité ritualisée et ne peux différer qu'avec difficulté" },
          { value: 4, text: "Aucun contrôle, l'obligation à accomplir les rituels est vécue comme complètement involontaire et irrésistible ; je ne peux que rarement différer même momentanément l'activité" },
        ],
      },
    ],
    scoring: {
      ranges: [
        { min: 0, max: 7, interpretation: "Symptômes sous-cliniques" },
        { min: 8, max: 15, interpretation: "TOC léger" },
        { min: 16, max: 23, interpretation: "TOC modéré" },
        { min: 24, max: 31, interpretation: "TOC sévère" },
        { min: 32, max: 40, interpretation: "TOC extrême" },
      ],
      maxScore: 40,
      method:
        "Additionnez les scores (0-4) pour chaque item. Le score total varie de 0 à 40. Les scores sont divisés en sous-totaux pour les obsessions (items 1-5) et les compulsions (items 6-10).",
    },
  },
  {
    id: "rses",
    acronym: "RSES",
    label: "Échelle d'Estime de Soi de Rosenberg",
    icon: "/images/scales/rses.svg",
    color: "#E7BC92",
    colorLight: "#F5DFC5",
    formType: "single-scale",
    title: "RSES - Échelle d'Estime de Soi de Rosenberg",
    description:
      "Une échelle de 10 items évaluant le niveau global d'estime de soi",
    category: "Estime de soi",
    estimatedTime: "3-5 minutes",
    longDescription:
      "L'Échelle d'Estime de Soi de Rosenberg (RSES) est l'outil le plus utilisé dans la recherche et la pratique clinique pour mesurer l'estime de soi globale. Elle compte 10 items (5 formulations positives, 5 négatives), cotés de 1 à 4 sur une échelle Likert. Les items négatifs (3, 5, 8, 9, 10) sont inversés avant sommation. Le score total varie de 10 à 40 ; un score plus élevé indique une estime de soi plus élevée. Version française : Vallières & Vallerand (1990).",
    instructions:
      "Pour chacune des caractéristiques ou descriptions suivantes, indiquez à quel point chacune est vraie pour vous en cliquant sur le chiffre approprié.",
    copyrightAttribution:
      "© Évelyne F. Vallières et Robert J. Vallerand, 1990. Traduction de la Rosenberg Self-Esteem Scale (Rosenberg, 1965).",
    higherIsBetter: true,
    reverseItems: [3, 5, 8, 9, 10],
    questions: [
      "Je pense que je suis une personne de valeur, au moins égale à n'importe qui d'autre.",
      "Je pense que je possède un certain nombre de belles qualités.",
      "Tout bien considéré, je suis porté-e à me considérer comme un-e raté-e.",
      "Je suis capable de faire les choses aussi bien que la majorité des gens.",
      "Je sens peu de raisons d'être fier-e de moi.",
      "J'ai une attitude positive vis-à-vis moi-même.",
      "Dans l'ensemble, je suis satisfait-e de moi.",
      "J'aimerais avoir plus de respect pour moi-même.",
      "Parfois je me sens vraiment inutile.",
      "Il m'arrive de penser que je suis un-e bon-ne à rien.",
    ],
    answerScales: {
      intensity: [
        { value: 1, label: "Tout à fait en désaccord" },
        { value: 2, label: "Plutôt en désaccord" },
        { value: 3, label: "Plutôt en accord" },
        { value: 4, label: "Tout à fait en accord" },
      ],
    },
    scoring: {
      ranges: [
        {
          min: 10,
          max: 40,
          interpretation:
            "Plus le score est élevé, plus l'estime de soi est élevée.",
        },
      ],
      maxScore: 40,
      method:
        "Inverser les cotes des items 3, 5, 8, 9 et 10 (1↔4, 2↔3), puis additionner les 10 items. Le score total varie de 10 à 40.",
    },
  },
];

export function getScaleById(id: string): Scale | undefined {
  return scales.find((s) => s.id === id);
}

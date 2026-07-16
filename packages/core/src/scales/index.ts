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
  /**
   * Optional long-form definition shown as a full-screen transition before the
   * section's first item during patient passation.
   */
  description?: string;
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
   * Consigne affichée en en-tête persistant au-dessus de chaque item pendant la passation.
   * Si absent, fallback sur `instructions`. Utile quand la consigne d'intro (longue,
   * contextualisante) diffère du rappel actionnable item par item (ex. PCL-5).
   */
  persistentInstructions?: string;
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
  /**
   * Sous-titre affiché sous l'acronyme sur **toutes les surfaces vues par le patient** :
   * écran d'intro (`IntroScreen`) ET cards du batch (`p/[batchId]/page.tsx`).
   * Doit reproduire ce qui figure sur le PDF de la source primaire :
   * - `undefined` : fallback sur `label` (comportement par défaut historique).
   * - `null` : aucun sous-titre — le PDF n'affiche que l'acronyme (ex. GAD-7).
   * - `string` : libellé exact du PDF s'il diffère de `label`.
   * Les surfaces praticien (catalogue, fiche patient, résultats) ne sont **pas**
   * concernées : elles continuent d'afficher `label` / `title` enrichis.
   * Documenter le choix dans le §4 du spec correspondant.
   */
  patientIntroSubtitle?: string | null;
  reverseItems?: number[];
  /**
   * True when a higher score = better health (e.g. RSES self-esteem).
   * False for symptom scales (PHQ-9, GAD-7, PCL-5, Y-BOCS, LSAS) where higher = worse.
   * Drives delta direction, severity coloring, and trend interpretation.
   */
  higherIsBetter: boolean;
  questions: any[];
  answerScales?: Record<string, ScaleOption[]>;
  /**
   * Item de suivi non scoré, présenté au patient après les items scorés.
   * Sa réponse est stockée sous `key` dans le record de réponses ; les scorers
   * doivent ignorer cette clé. Affiché côté praticien dans une section dédiée.
   * Exemple : item d'impact fonctionnel du PHQ-9.
   */
  followUpItem?: {
    key: string;
    questionText: string;
    options: ScaleOption[];
  };
  /**
   * Item d'ouverture en texte libre, non scoré, présenté au patient AVANT les
   * items scorés (ex. QIA item 1 : thèmes d'inquiétude). Sa réponse (string)
   * est stockée sous `key` dans le record de réponses ; les scorers ne la
   * somment jamais mais peuvent la lire (ex. critère « au moins un thème »).
   * Le patient peut poursuivre sans remplir le champ (fidèle au papier).
   */
  openingTextItem?: {
    key: string;
    questionText: string;
    /** Texte d'aide affiché sous le champ. */
    helperText?: string;
  };
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
    title: "LSAS - Échelle d'anxiété sociale de Liebowitz",
    description:
      "Une échelle clinique de 24 items qui mesure la peur et l'évitement dans des situations sociales et de performance",
    category: "Anxiété sociale",
    estimatedTime: "10-15 minutes",
    longDescription:
      "L'Échelle d'anxiété sociale de Liebowitz (LSAS) est un questionnaire développé par le psychiatre Michael Liebowitz pour évaluer la gravité de l'anxiété sociale. Il mesure à la fois la peur et l'évitement dans 24 situations sociales différentes. Chaque situation est évaluée deux fois : une fois pour le niveau d'anxiété qu'elle provoque (de 0 à 3, où 0 signifie aucune anxiété et 3 une anxiété sévère) et une fois pour la fréquence d'évitement de la situation (également de 0 à 3). Le LSAS est largement utilisé en recherche clinique et en pratique pour évaluer l'efficacité des traitements pour l'anxiété sociale.",
    instructions:
      "Cette échelle évalue la façon dont l'anxiété sociale joue un rôle dans votre vie au travers de différentes situations.\n\nLisez chaque situation attentivement et répondez à deux questions à son sujet. La première concerne le niveau de peur ou d'anxiété que vous ressentez dans cette situation. La seconde concerne la fréquence à laquelle vous évitez cette situation.\n\nSi vous rencontrez une situation que vous ne vivez pas habituellement, imaginez « que se passerait-il si j'y étais confronté(e) », et évaluez le niveau de peur que vous ressentiriez ainsi que la fréquence à laquelle vous l'éviteriez. Basez vos réponses sur la façon dont ces situations vous ont affecté(e) au cours de la semaine écoulée.",
    copyrightAttribution:
      "Liebowitz Social Anxiety Scale (LSAS) — Liebowitz M.R., 1987. Traduction française : J.P. Lépine & H. Cardot, 1990. Validation française : Yao et al., L'Encéphale, 1999.",
    higherIsBetter: false,
    questions: [
      { id: 1, text: "Téléphoner en public", type: "performance" },
      {
        id: 2,
        text: "Participer au sein d'un petit groupe",
        type: "performance",
      },
      { id: 3, text: "Manger dans un lieu public", type: "performance" },
      {
        id: 4,
        text: "Boire en compagnie dans un lieu public",
        type: "performance",
      },
      {
        id: 5,
        text: "Parler à des gens qui détiennent une autorité",
        type: "interaction",
      },
      {
        id: 6,
        text: "Jouer, donner une représentation ou une conférence devant un public",
        type: "performance",
      },
      { id: 7, text: "Aller à une soirée", type: "interaction" },
      { id: 8, text: "Travailler en étant observé", type: "performance" },
      { id: 9, text: "Écrire en étant observé", type: "performance" },
      {
        id: 10,
        text: "Contacter par téléphone quelqu'un que vous ne connaissez pas très bien",
        type: "interaction",
      },
      {
        id: 11,
        text: "Parler à des gens que vous ne connaissez pas très bien",
        type: "interaction",
      },
      { id: 12, text: "Rencontrer des inconnus", type: "interaction" },
      {
        id: 13,
        text: "Uriner dans les toilettes publiques",
        type: "performance",
      },
      {
        id: 14,
        text: "Entrer dans une pièce alors que tout le monde est déjà assis",
        type: "performance",
      },
      { id: 15, text: "Être le centre d'attention", type: "interaction" },
      { id: 16, text: "Prendre la parole à une réunion", type: "performance" },
      { id: 17, text: "Passer un examen", type: "performance" },
      {
        id: 18,
        text: "Exprimer son désaccord ou sa désapprobation à des gens que vous ne connaissez pas très bien",
        type: "interaction",
      },
      {
        id: 19,
        text: "Regarder dans les yeux des gens que vous ne connaissez pas très bien",
        type: "interaction",
      },
      {
        id: 20,
        text: "Faire un compte-rendu à un groupe",
        type: "performance",
      },
      { id: 21, text: "Essayer de « draguer » quelqu'un", type: "interaction" },
      {
        id: 22,
        text: "Rapporter des marchandises dans un magasin",
        type: "interaction",
      },
      { id: 23, text: "Donner une soirée", type: "interaction" },
      {
        id: 24,
        text: "Résister aux pressions d'un vendeur insistant",
        type: "interaction",
      },
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
        { value: 1, label: "Occasionnel" },
        { value: 2, label: "Fréquent" },
        { value: 3, label: "Habituel" },
      ],
    },
    scoring: {
      ranges: [
        { min: 0, max: 29, interpretation: "Pas d'anxiété sociale" },
        { min: 30, max: 49, interpretation: "Anxiété sociale légère" },
        { min: 50, max: 64, interpretation: "Anxiété sociale modérée" },
        { min: 65, max: 79, interpretation: "Anxiété sociale marquée" },
        { min: 80, max: 94, interpretation: "Anxiété sociale sévère" },
        { min: 95, max: 144, interpretation: "Anxiété sociale très sévère" },
      ],
      maxScore: 144,
      method:
        "Pour chaque situation, additionnez les scores d'anxiété (0-3) et d'évitement (0-3). Le score total varie de 0 à 144.",
    },
  },
  {
    id: "spin",
    acronym: "SPIN",
    label: "Inventaire de phobie sociale",
    patientIntroSubtitle: null,
    icon: "/images/scales/spin.svg",
    color: "#6A9BCC",
    colorLight: "#B4CDE5",
    formType: "single-scale",
    title: "SPIN - Inventaire de phobie sociale",
    description:
      "Une échelle de 17 items mesurant la sévérité de l'anxiété sociale (peur, évitement, symptômes physiologiques) au cours de la semaine écoulée",
    category: "Anxiété sociale",
    estimatedTime: "3-5 minutes",
    longDescription:
      "Le SPIN (Social Phobia Inventory) est un auto-questionnaire de 17 items développé par Jonathan Davidson et son équipe à l'Université Duke pour dépister et mesurer la sévérité du trouble d'anxiété sociale (phobie sociale). Il couvre les trois dimensions du trouble : la peur, l'évitement et les symptômes physiologiques (rougissement, transpiration, palpitations, tremblements). Chaque item porte sur la semaine écoulée et est coté de 0 (pas du tout) à 4 (extrêmement) ; le score total varie de 0 à 68. Un score plus élevé indique une anxiété sociale plus sévère.",
    instructions:
      "Indiquez à quel point les problèmes suivants vous ont gêné(e) au cours de la semaine écoulée. Répondez à tous les items en choisissant une seule réponse par ligne.",
    copyrightAttribution:
      "Social Phobia Inventory (SPIN) — © Jonathan R. T. Davidson, 1995, 2008, 2015, Duke University. Toute reproduction est soumise à l'autorisation du détenteur des droits (mail@cd-risc.com).",
    higherIsBetter: false,
    questions: [
      "J'ai peur des personnes qui ont de l'autorité",
      "Le fait de rougir devant les gens me dérange",
      "Les fêtes et les événements sociaux me font peur",
      "J'évite de parler à des personnes que je ne connais pas",
      "Être critiqué m'effraie beaucoup",
      "La peur d'être gêné me pousse à éviter de faire des choses ou de parler aux gens",
      "Transpirer devant les autres me perturbe",
      "J'évite d'aller aux fêtes",
      "J'évite les activités où je suis le centre de l'attention",
      "Parler à des inconnus me fait peur",
      "J'évite d'avoir à faire des discours",
      "Je ferais n'importe quoi pour éviter d'être critiqué",
      "Les palpitations cardiaques me gênent quand je suis entouré de gens",
      "J'ai peur de faire des choses quand les gens pourraient me regarder",
      "Être gêné ou avoir l'air stupide fait partie de mes pires craintes",
      "J'évite de parler à toute personne ayant de l'autorité",
      "Trembler devant les autres me perturbe",
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
        { min: 0, max: 20, interpretation: "Pas d'anxiété sociale" },
        { min: 21, max: 30, interpretation: "Anxiété sociale légère" },
        { min: 31, max: 40, interpretation: "Anxiété sociale modérée" },
        { min: 41, max: 50, interpretation: "Anxiété sociale sévère" },
        { min: 51, max: 68, interpretation: "Anxiété sociale très sévère" },
      ],
      maxScore: 68,
      method:
        "Additionnez les scores de chaque item (0-4). Le score total varie de 0 à 68. Aucun item n'est inversé.",
    },
  },
  {
    id: "phq-9",
    acronym: "PHQ-9",
    label: "Questionnaire sur la santé du patient",
    patientIntroSubtitle: "Questionnaire sur la santé du patient – 9",
    icon: "/images/scales/phq-9.svg",
    color: "#CBCADB",
    colorLight: "#E5E4ED",
    formType: "single-scale",
    title: "PHQ-9 - Questionnaire sur la santé du patient",
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
      "Avoir du mal à se concentrer, par exemple, pour lire le journal ou regarder la télévision",
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
    followUpItem: {
      key: "functional_impact",
      questionText:
        "Si vous avez indiqué au moins un des problèmes évoqués, à quel point ce(s) problème(s) a-t-il (ont-ils) rendu votre travail, vos tâches à la maison ou votre capacité à vous entendre avec les autres difficile(s) ?",
      options: [
        { value: 0, label: "Pas du tout difficile(s)" },
        { value: 1, label: "Assez difficile(s)" },
        { value: 2, label: "Très difficile(s)" },
        { value: 3, label: "Extrêmement difficile(s)" },
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
    label: "Trouble anxieux généralisé",
    patientIntroSubtitle: null,
    icon: "/images/scales/gad-7.svg",
    color: "#6A9BCC",
    colorLight: "#B4CDE5",
    formType: "single-scale",
    title: "GAD-7 - Trouble anxieux généralisé",
    description:
      "Une échelle de 7 items évaluant la sévérité des symptômes d'anxiété généralisée au cours des 2 dernières semaines",
    category: "Anxiété généralisée",
    estimatedTime: "2-3 minutes",
    longDescription:
      "Le GAD-7 (Generalized Anxiety Disorder 7-item) est un auto-questionnaire de 7 items développé par Spitzer et collaborateurs (2006) pour le dépistage et la mesure de la sévérité du trouble anxieux généralisé. Chaque item est coté de 0 (jamais) à 3 (presque tous les jours), le score total varie de 0 à 21. Un score ≥ 10 correspond au seuil clinique de suspicion de TAG (sensibilité 89 %, spécificité 82 %), à laisser au jugement du practicien.",
    instructions:
      "Au cours des 2 dernières semaines, selon quelle fréquence avez-vous été gêné(e) par les problèmes suivants ?",
    copyrightAttribution:
      "Développé par les Dr Robert L. Spitzer, Janet B.W. Williams, Kurt Kroenke et leurs collègues grâce à une allocation d'études de Pfizer Inc.",
    higherIsBetter: false,
    questions: [
      "Un sentiment de nervosité, d'anxiété ou de tension",
      "Une incapacité à arrêter de s'inquiéter ou à contrôler ses inquiétudes",
      "Une inquiétude excessive à propos de différentes choses",
      "Des difficultés à se détendre",
      "Une agitation telle qu'il est difficile à tenir en place",
      "Une tendance à être facilement contrarié(e) ou irritable",
      "Un sentiment de peur comme si quelque chose de terrible risquait de se produire",
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
    id: "qips",
    acronym: "QIPS",
    label: "Questionnaire sur les inquiétudes du Penn State",
    icon: "/images/scales/qips.svg",
    color: "#6A9BCC",
    colorLight: "#B4CDE5",
    formType: "single-scale",
    title: "QIPS - Questionnaire sur les inquiétudes du Penn State",
    description:
      "Une échelle de 16 items mesurant la tendance générale à s'inquiéter (inquiétude excessive du trouble anxieux généralisé)",
    category: "Anxiété généralisée",
    estimatedTime: "5-10 minutes",
    longDescription:
      "Le QIPS (Questionnaire sur les inquiétudes du Penn State) est la traduction française du Penn State Worry Questionnaire (PSWQ, Meyer et al. 1990), validée par Gosselin et collaborateurs (2001). C'est un auto-questionnaire de 16 items évaluant la tendance générale, excessive et incontrôlable à s'inquiéter, symptôme central du trouble anxieux généralisé. Chaque item est coté de 1 (pas du tout caractéristique) à 5 (extrêmement caractéristique). Les items 1, 3, 8, 10 et 11, formulés à l'inverse, sont recodés avant sommation. Le score total varie de 16 à 80 ; un score plus élevé traduit une propension à s'inquiéter plus marquée.",
    instructions:
      "Veuillez utiliser l'échelle ci-dessous pour exprimer jusqu'à quel point chacun des énoncés suivants vous correspond.",
    persistentInstructions:
      "Jusqu'à quel point cet énoncé vous correspond-il ?",
    copyrightAttribution:
      "Penn State Worry Questionnaire (PSWQ) — Meyer, Miller, Metzger & Borkovec, 1990. Traduction française (QIPS) : P. Gosselin, M. J. Dugas, R. Ladouceur & M. H. Freeston, 2001, L'Encéphale.",
    higherIsBetter: false,
    reverseItems: [1, 3, 8, 10, 11],
    questions: [
      "Si je n'ai pas assez de temps pour tout faire, je ne m'en inquiète pas.",
      "Mes inquiétudes me submergent.",
      "Je n'ai pas tendance à m'inquiéter à propos des choses.",
      "Plusieurs situations m'amènent à m'inquiéter.",
      "Je sais que je ne devrais pas m'inquiéter, mais je n'y peux rien.",
      "Quand je suis sous pression, je m'inquiète beaucoup.",
      "Je m'inquiète continuellement à propos de tout.",
      "Il m'est facile de me débarrasser de pensées inquiétantes.",
      "Aussitôt que j'ai fini une tâche, je commence immédiatement à m'inquiéter au sujet de toutes les autres choses que j'ai encore à faire.",
      "Je ne m'inquiète jamais.",
      "Quand je ne peux plus rien faire au sujet d'un souci, je ne m'en inquiète plus.",
      "J'ai été un inquiet tout au long de ma vie.",
      "Je remarque que je m'inquiète pour certains sujets.",
      "Quand je commence à m'inquiéter, je ne peux plus m'arrêter.",
      "Je m'inquiète tout le temps.",
      "Je m'inquiète au sujet de mes projets jusqu'à ce qu'ils soient terminés.",
    ],
    answerScales: {
      intensity: [
        { value: 1, label: "Pas du tout caractéristique" },
        { value: 2, label: "Un peu caractéristique" },
        { value: 3, label: "Assez caractéristique" },
        { value: 4, label: "Très caractéristique" },
        { value: 5, label: "Extrêmement caractéristique" },
      ],
    },
    scoring: {
      ranges: [
        { min: 16, max: 39, interpretation: "Inquiétude faible" },
        { min: 40, max: 54, interpretation: "Inquiétude modérée" },
        {
          min: 55,
          max: 80,
          interpretation: "Inquiétude élevée (évocatrice d'un TAG)",
        },
      ],
      maxScore: 80,
      method:
        "Inverser les cotes des items 1, 3, 8, 10 et 11 (1↔5, 2↔4), puis additionner les 16 items. Le score total varie de 16 à 80.",
    },
  },
  {
    id: "traumatismes-pcl5",
    acronym: "PCL-5",
    label: "Liste de vérification du TSPT",
    patientIntroSubtitle: null,
    icon: "/images/scales/pcl-5.svg",
    color: "#C46686",
    colorLight: "#E1B2C2",
    formType: "single-scale",
    title: "PCL-5 - Liste de vérification du TSPT",
    description:
      "Une échelle de 20 items évaluant les symptômes du trouble de stress post-traumatique (TSPT)",
    category: "Traumatismes",
    estimatedTime: "5-10 minutes",
    instructions:
      "Lisez chacun des énoncés en gardant à l'esprit le pire évènement que vous avez vécu ; celui qui vous perturbe le plus actuellement. Puis indiquez à quel point vous avez été perturbé(e) par ce problème au cours du dernier mois.",
    persistentInstructions:
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
        {
          min: 0,
          max: 31,
          interpretation: "Pas de TSPT au seuil de dépistage",
        },
        {
          min: 32,
          max: 80,
          interpretation: "Présence de TSPT au seuil de dépistage",
        },
      ],
      maxScore: 80,
      method:
        "Additionnez les scores de chaque item (0-4). Le score total varie de 0 à 80. Un score total de 32 ou plus suggère un dépistage positif (version FR validée, Ashbaugh 2016).",
    },
  },
  {
    id: "index-symptomes-ybocs",
    acronym: "Y-BOCS",
    label: "Échelle d'obsession-compulsion de Yale-Brown",
    icon: "/images/scales/y-bocs.svg",
    color: "#BCD1CA",
    colorLight: "#DDE8E4",
    formType: "options",
    title: "Y-BOCS - Échelle d'obsession-compulsion de Yale-Brown",
    description:
      "Une échelle d'évaluation des symptômes obsessionnels-compulsifs mesurant la sévérité du TOC",
    category: "Troubles Obsessionnels Compulsifs",
    estimatedTime: "10-15 minutes",
    higherIsBetter: false,
    instructions:
      "Cette échelle évalue la sévérité de vos symptômes obsessionnels et compulsifs au cours de la semaine écoulée. Vous trouverez 10 questions, réparties en deux blocs : 5 questions sur les obsessions, puis 5 sur les compulsions.\n\nLes obsessions sont des idées pénibles, des pensées, des images ou des désirs impulsifs qui vous viennent à l'esprit d'une manière répétitive. Elles peuvent vous sembler apparaître contre votre volonté. Vous pouvez aussi les trouver répugnantes, reconnaître qu'elles sont dénuées de sens, ou estimer qu'elles ne correspondent pas du tout à votre personnalité. Elles sont souvent source d'angoisse.\n\nLes compulsions, d'un autre côté, sont des comportements ou des actes que vous vous sentez obligé d'accomplir, même si vous les reconnaissez comme dénués de sens ou excessifs. Parfois, vous essayez de résister et de ne pas les faire, mais ceci s'avère souvent difficile. Vous pouvez ressentir une anxiété qui ne diminuera pas, tant que l'acte n'est pas accompli.",
    sectionIntros: [
      {
        startIndex: 0,
        text: "Obsessions",
      },
      {
        startIndex: 5,
        text: "Compulsions",
        description:
          "Les compulsions sont des actes que vous vous sentez obligé d'accomplir, même si vous les reconnaissez comme dénués de sens ou excessifs. Parfois, vous essayez de résister et de ne pas les faire, mais ceci s'avère souvent difficile. Vous pouvez ressentir une anxiété qui ne diminuera pas, tant que l'acte n'est pas accompli.",
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
          {
            value: 1,
            text: "Moins d'une heure par jour, ou survenue occasionnelle (pas plus de 8 fois par jour)",
          },
          {
            value: 2,
            text: "1 à 3 heures par jour, ou survenue très fréquente (plus de 8 fois par jour, mais la majorité de ma journée se passe sans)",
          },
          {
            value: 3,
            text: "3 à 8 heures par jour, ou survenue très fréquente (plus de 8 fois par jour, occupant une très grande partie de ma journée)",
          },
          {
            value: 4,
            text: "Plus de 8 heures par jour, ou envahissement pratiquement constant ; pensées tellement nombreuses que je ne peux les compter, et il est très rare de passer 1 heure dans ma journée sans que plusieurs pensées ne surviennent",
          },
        ],
      },
      {
        title: "GÊNE LIÉE AUX PENSÉES OBSÉDANTES",
        prompt:
          "Dans quelle mesure vos pensées obsédantes vous gênent-elles dans votre vie sociale ou professionnelle ? Y a-t-il des choses qu'il vous est impossible de faire à cause de ces pensées obsédantes ?",
        options: [
          { value: 0, text: "Aucune" },
          {
            value: 1,
            text: "Faible gêne dans mes activités sociales ou professionnelles, mais mon efficacité globale n'est pas altérée",
          },
          {
            value: 2,
            text: "Gêne nette dans mes activités sociales ou professionnelles, mais je peux encore faire face",
          },
          {
            value: 3,
            text: "Altération réelle de mes activités sociales ou professionnelles",
          },
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
          {
            value: 2,
            text: "Moyenne, fréquente et gênante, mais je la gère encore assez bien",
          },
          { value: 3, text: "Importante, très fréquente et très gênante" },
          {
            value: 4,
            text: "Extrêmement importante, pratiquement constante et d'une gêne invalidante",
          },
        ],
      },
      {
        title: "RÉSISTANCE AUX PENSÉES OBSÉDANTES",
        prompt:
          "Quel effort fournissez-vous pour résister aux pensées obsédantes ? Essayez-vous souvent de détourner votre attention de ces pensées quand elles vous viennent à l'esprit ?",
        options: [
          {
            value: 0,
            text: "Je fais toujours l'effort de résister, ou les obsessions sont si minimes qu'il n'est pas nécessaire de leur résister",
          },
          { value: 1, text: "J'essaie de résister la plupart du temps" },
          { value: 2, text: "Je fais quelques efforts pour résister" },
          {
            value: 3,
            text: "Je cède à toutes les obsessions sans essayer de les contrôler, mais je suis quelque peu contrarié(e) de ne pouvoir mieux faire",
          },
          {
            value: 4,
            text: "Je cède volontiers et totalement à toutes les obsessions",
          },
        ],
      },
      {
        title: "DEGRÉ DE CONTRÔLE SUR LES PENSÉES OBSÉDANTES",
        prompt:
          "Quel contrôle exercez-vous sur vos pensées obsédantes ? Dans quelle mesure arrivez-vous à stopper ou à détourner vos pensées obsédantes ?",
        options: [
          { value: 0, text: "Contrôle total" },
          {
            value: 1,
            text: "Beaucoup de contrôle ; je suis généralement capable de stopper ou détourner les obsessions avec quelques efforts et de la concentration",
          },
          {
            value: 2,
            text: "Contrôle moyen, j'arrive de temps en temps à stopper ou détourner mes obsessions",
          },
          {
            value: 3,
            text: "Peu de contrôle, j'arrive rarement à stopper mes obsessions, je peux seulement détourner mon attention avec difficulté",
          },
          {
            value: 4,
            text: "Aucun contrôle, je me sens totalement dépourvu(e) de volonté, rarement capable de détourner mon attention de mes obsessions, même momentanément",
          },
        ],
      },
      {
        title: "DURÉE DES COMPULSIONS",
        prompt:
          "Combien de temps passez-vous à faire des compulsions ? Quelle est la fréquence de vos compulsions ?",
        options: [
          { value: 0, text: "Aucune compulsion" },
          {
            value: 1,
            text: "Moins d'une heure par jour, ou émission occasionnelle de compulsions (pas plus de 8 fois par jour)",
          },
          {
            value: 2,
            text: "1 à 3 heures par jour, ou apparition fréquente (plus de 8 fois par jour, mais le temps n'est pas en majorité envahi)",
          },
          {
            value: 3,
            text: "3 à 8 heures par jour, ou apparition très fréquente (plus de 8 fois par jour, la plupart du temps est pris par les compulsions)",
          },
          {
            value: 4,
            text: "Plus de 8 heures par jour, ou présence pratiquement constante de compulsions (trop nombreuses pour être dénombrées) ; une heure se passe rarement sans que plusieurs compulsions n'apparaissent",
          },
        ],
      },
      {
        title: "GÊNE LIÉE AUX COMPULSIONS",
        prompt:
          "Dans quelle mesure les compulsions vous gênent-elles dans votre vie sociale ou professionnelle ? Y a-t-il des choses qu'il vous est impossible de faire à cause de vos compulsions ?",
        options: [
          { value: 0, text: "Aucune gêne" },
          {
            value: 1,
            text: "Faible gêne dans mes activités sociales ou professionnelles, mais mon efficacité globale n'est pas altérée",
          },
          {
            value: 2,
            text: "Gêne nette dans mes activités sociales ou professionnelles, mais je peux encore faire face",
          },
          {
            value: 3,
            text: "Altération réelle de mes activités sociales ou professionnelles",
          },
          { value: 4, text: "Gêne invalidante" },
        ],
      },
      {
        title: "ANGOISSE ASSOCIÉE AUX COMPULSIONS",
        prompt:
          "Comment vous sentiriez-vous si l'on vous empêchait de faire vos compulsions ? Seriez-vous très anxieux ?",
        options: [
          { value: 0, text: "Aucune angoisse" },
          {
            value: 1,
            text: "Légère anxiété si l'on m'empêchait d'accomplir mes compulsions, ou légère anxiété pendant l'accomplissement",
          },
          {
            value: 2,
            text: "L'angoisse monterait mais resterait contrôlable si l'on m'empêchait, ou l'anxiété augmente mais reste contrôlée pendant l'accomplissement",
          },
          {
            value: 3,
            text: "Augmentation très nette et très éprouvante de l'anxiété si les compulsions sont interrompues, ou pendant leur accomplissement",
          },
          {
            value: 4,
            text: "Anxiété invalidante dès qu'une intervention vise à modifier la compulsion, ou pendant l'accomplissement",
          },
        ],
      },
      {
        title: "RÉSISTANCE AUX COMPULSIONS",
        prompt: "Quel effort fournissez-vous pour résister aux compulsions ?",
        options: [
          {
            value: 0,
            text: "Je fais toujours l'effort de résister, ou les symptômes sont si minimes qu'il n'est pas nécessaire de leur résister",
          },
          { value: 1, text: "J'essaie de résister la plupart du temps" },
          { value: 2, text: "Je fais quelques efforts pour résister" },
          {
            value: 3,
            text: "Je cède à toutes les compulsions sans essayer de les contrôler, mais je suis quelque peu contrarié(e) de ne pouvoir mieux faire",
          },
          {
            value: 4,
            text: "Je cède volontiers et totalement à toutes les compulsions",
          },
        ],
      },
      {
        title: "DEGRÉ DE CONTRÔLE SUR LES COMPULSIONS",
        prompt:
          "Quelle est l'intensité de la pulsion qui vous oblige à accomplir vos compulsions ? Quel contrôle pouvez-vous exercer sur les compulsions ?",
        options: [
          { value: 0, text: "Contrôle total" },
          {
            value: 1,
            text: "Beaucoup de contrôle ; je ressens une certaine obligation à accomplir les compulsions, mais je peux généralement exercer un contrôle volontaire sur cette pression",
          },
          {
            value: 2,
            text: "Contrôle moyen, forte obligation à accomplir les compulsions, je peux la contrôler mais avec difficulté",
          },
          {
            value: 3,
            text: "Peu de contrôle, très forte obligation à accomplir les compulsions ; je dois aller jusqu'au bout de la compulsion et ne peux différer qu'avec difficulté",
          },
          {
            value: 4,
            text: "Aucun contrôle, l'obligation à accomplir les compulsions est vécue comme complètement involontaire et irrésistible ; je ne peux que rarement différer même momentanément l'activité",
          },
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
    label: "Échelle d'estime de soi de Rosenberg",
    icon: "/images/scales/rses.svg",
    color: "#E7BC92",
    colorLight: "#F5DFC5",
    formType: "single-scale",
    title: "RSES - Échelle d'estime de soi de Rosenberg",
    description:
      "Une échelle de 10 items évaluant le niveau global d'estime de soi",
    category: "Estime de soi",
    estimatedTime: "2-5 minutes",
    longDescription:
      "L'Échelle d'Estime de Soi de Rosenberg (RSES) est l'outil le plus utilisé dans la recherche et la pratique clinique pour mesurer l'estime de soi globale. Elle compte 10 items (5 formulations positives, 5 négatives), cotés de 1 à 4 sur une échelle Likert. Les items négatifs (3, 5, 8, 9, 10) sont inversés avant sommation. Le score total varie de 10 à 40 ; un score plus élevé indique une estime de soi plus élevée. Version française : Vallières & Vallerand (1990).",
    instructions:
      "Pour chacune des caractéristiques ou descriptions suivantes, indiquez à quel point chacune est vraie pour vous en sélectionnant la réponse appropriée.",
    persistentInstructions:
      "Pour chacune des caractéristiques ou descriptions suivantes, indiquez à quel point chacune est vraie pour vous en sélectionnant la réponse appropriée.",
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
  {
    id: "audit",
    acronym: "AUDIT",
    label: "Test de repérage des troubles liés à l'usage de l'alcool",
    patientIntroSubtitle: null,
    icon: "/images/scales/audit.svg",
    color: "#A97BA5",
    colorLight: "#D6BDD3",
    formType: "options",
    title: "AUDIT - Test de repérage des troubles liés à l'usage de l'alcool",
    description:
      "Un questionnaire de 10 items développé par l'OMS pour repérer une consommation d'alcool à risque, nocive ou une dépendance au cours des 12 derniers mois",
    category: "Addictions",
    estimatedTime: "2-3 minutes",
    longDescription:
      "L'AUDIT (Alcohol Use Disorders Identification Test) est un auto-questionnaire de 10 items développé par l'Organisation mondiale de la Santé (Saunders et al., 1993) pour repérer les consommations d'alcool problématiques. Les items 1 à 3 portent sur la consommation (fréquence, quantité, ivresses), les items 4 à 6 sur les signes de dépendance et les items 7 à 10 sur les conséquences. Chaque item est coté de 0 à 4 (items 9 et 10 : 0, 2 ou 4), pour un score total de 0 à 40 portant sur les 12 derniers mois. Selon la Société Française d'Alcoologie (2015), un score ≥ 7 chez l'homme et ≥ 6 chez la femme évoque un mésusage actuel, et un score > 12 (quel que soit le sexe) est en faveur d'une dépendance. Ce seuil de repérage est sexe-spécifique : l'interprétation affichée retient le seuil le plus sensible (≥ 6) et doit être lue en tenant compte du sexe de la personne.",
    instructions:
      "Ce questionnaire porte sur votre consommation d'alcool au cours des douze derniers mois. Veillez à ce que vos réponses reflètent bien cette période, et pas seulement les dernières semaines.\n\nUn « verre standard » correspond à la quantité d'alcool servie dans un bar (environ 10 g d'alcool pur) : un ballon de vin, un demi de bière, une dose de spiritueux.",
    persistentInstructions:
      "Au cours des douze derniers mois :",
    copyrightAttribution:
      "AUDIT (Alcohol Use Disorders Identification Test) — Organisation mondiale de la Santé ; Saunders, Aasland, Babor, de la Fuente & Grant (1993). Version française validée : Gache et al. (2005). Seuils : Société Française d'Alcoologie (2015).",
    higherIsBetter: false,
    questions: [
      {
        title: "Fréquence de consommation",
        prompt: "Combien de fois vous arrive-t-il de consommer de l'alcool ?",
        options: [
          { value: 0, text: "Jamais" },
          { value: 1, text: "Une fois par mois ou moins" },
          { value: 2, text: "2 à 4 fois par mois" },
          { value: 3, text: "2 à 3 fois par semaine" },
          { value: 4, text: "4 fois ou plus par semaine" },
        ],
      },
      {
        title: "Quantité par occasion",
        prompt:
          "Combien de verres standards buvez-vous au cours d'une journée ordinaire où vous buvez de l'alcool ?",
        options: [
          { value: 0, text: "Un ou deux" },
          { value: 1, text: "Trois ou quatre" },
          { value: 2, text: "Cinq ou six" },
          { value: 3, text: "Sept à neuf" },
          { value: 4, text: "Dix ou plus" },
        ],
      },
      {
        title: "Consommations importantes",
        prompt:
          "Au cours d'une même occasion, combien de fois vous arrive-t-il de boire six verres standards ou plus ?",
        options: [
          { value: 0, text: "Jamais" },
          { value: 1, text: "Moins d'une fois par mois" },
          { value: 2, text: "Une fois par mois" },
          { value: 3, text: "Une fois par semaine" },
          { value: 4, text: "Chaque jour ou presque" },
        ],
      },
      {
        title: "Perte de contrôle",
        prompt:
          "Combien de fois avez-vous observé que vous n'étiez plus capable de vous arrêter de boire après avoir commencé ?",
        options: [
          { value: 0, text: "Jamais" },
          { value: 1, text: "Moins d'une fois par mois" },
          { value: 2, text: "Une fois par mois" },
          { value: 3, text: "Une fois par semaine" },
          { value: 4, text: "Chaque jour ou presque" },
        ],
      },
      {
        title: "Obligations non remplies",
        prompt:
          "Combien de fois le fait d'avoir bu de l'alcool vous a-t-il empêché de faire ce qu'on attendait normalement de vous ?",
        options: [
          { value: 0, text: "Jamais" },
          { value: 1, text: "Moins d'une fois par mois" },
          { value: 2, text: "Une fois par mois" },
          { value: 3, text: "Une fois par semaine" },
          { value: 4, text: "Chaque jour ou presque" },
        ],
      },
      {
        title: "Consommation matinale",
        prompt:
          "Combien de fois, après une période de forte consommation, avez-vous dû boire de l'alcool dès le matin pour vous remettre en forme ?",
        options: [
          { value: 0, text: "Jamais" },
          { value: 1, text: "Moins d'une fois par mois" },
          { value: 2, text: "Une fois par mois" },
          { value: 3, text: "Une fois par semaine" },
          { value: 4, text: "Chaque jour ou presque" },
        ],
      },
      {
        title: "Culpabilité",
        prompt:
          "Combien de fois avez-vous eu un sentiment de culpabilité ou de regret après avoir bu ?",
        options: [
          { value: 0, text: "Jamais" },
          { value: 1, text: "Moins d'une fois par mois" },
          { value: 2, text: "Une fois par mois" },
          { value: 3, text: "Une fois par semaine" },
          { value: 4, text: "Chaque jour ou presque" },
        ],
      },
      {
        title: "Trous de mémoire",
        prompt:
          "Combien de fois avez-vous été incapable de vous souvenir de ce qui s'était passé la nuit précédente parce que vous aviez bu ?",
        options: [
          { value: 0, text: "Jamais" },
          { value: 1, text: "Moins d'une fois par mois" },
          { value: 2, text: "Une fois par mois" },
          { value: 3, text: "Une fois par semaine" },
          { value: 4, text: "Chaque jour ou presque" },
        ],
      },
      {
        title: "Blessures",
        prompt:
          "Vous êtes-vous blessé ou avez-vous blessé quelqu'un parce que vous aviez bu ?",
        options: [
          { value: 0, text: "Non" },
          { value: 2, text: "Oui, mais pas au cours de l'année écoulée" },
          { value: 4, text: "Oui, au cours de l'année écoulée" },
        ],
      },
      {
        title: "Inquiétude de l'entourage",
        prompt:
          "Un parent, un ami, un médecin ou un autre professionnel de santé s'est-il déjà préoccupé de votre consommation d'alcool et vous a-t-il conseillé de la diminuer ?",
        options: [
          { value: 0, text: "Non" },
          { value: 2, text: "Oui, mais pas au cours de l'année écoulée" },
          { value: 4, text: "Oui, au cours de l'année écoulée" },
        ],
      },
    ],
    scoring: {
      ranges: [
        { min: 0, max: 5, interpretation: "Consommation à faible risque" },
        {
          min: 6,
          max: 12,
          interpretation:
            "Mésusage d'alcool probable (seuil ≥ 6 femme / ≥ 7 homme)",
        },
        {
          min: 13,
          max: 40,
          interpretation: "Dépendance à l'alcool probable",
        },
      ],
      maxScore: 40,
      method:
        "Additionnez les scores de chaque item (items 1-8 : 0-4 ; items 9-10 : 0, 2 ou 4). Le score total varie de 0 à 40. Seuils Société Française d'Alcoologie (2015) : mésusage ≥ 7 chez l'homme / ≥ 6 chez la femme ; dépendance probable > 12.",
    },
  },
  {
    id: "pdeq",
    acronym: "PDEQ",
    label: "Questionnaire sur les expériences de dissociation péritraumatique",
    icon: "/images/scales/pdeq.svg",
    color: "#C46686",
    colorLight: "#E1B2C2",
    formType: "single-scale",
    title: "PDEQ - Questionnaire sur les expériences de dissociation péritraumatique",
    description:
      "Un questionnaire de 10 items évaluant les expériences de dissociation vécues pendant un événement traumatogène et immédiatement après",
    category: "Traumatismes",
    estimatedTime: "5 minutes",
    longDescription:
      "Le PDEQ (Peritraumatic Dissociative Experiences Questionnaire) est un auto-questionnaire de 10 items développé par Marmar, Weiss et Metzler (1997) pour évaluer la dissociation péritraumatique — une réaction psychique involontaire et ponctuelle survenant au cours d'un événement potentiellement traumatique ou dans les heures qui le suivent. Une dissociation péritraumatique élevée est un facteur de risque de développer un trouble de stress post-traumatique. Chaque item est coté de 1 (pas du tout vrai) à 5 (extrêmement vrai) ; le score total varie de 10 à 50. Un score total ≥ 15 permet le dépistage d'une dissociation péritraumatique significative. Traduction française validée par Birmes et al. (2005).",
    instructions:
      "Veuillez répondre aux énoncés suivants en choisissant la réponse qui décrit le mieux vos expériences et réactions durant l'événement et immédiatement après.\n\nSi une question ne s'applique pas à votre expérience, répondez « pas du tout vrai ».",
    persistentInstructions: "Durant l'événement et immédiatement après :",
    copyrightAttribution:
      "PDEQ — Marmar, Weiss & Metzler (1997) ©1997. Traduction française et validation : Birmes et al. (2005), European Psychiatry. Mise en page : Centre national de ressources et de résilience (Cn2r).",
    higherIsBetter: false,
    questions: [
      "Il y a eu des moments où j'ai perdu le fil de ce qui se passait – j'étais complètement déconnecté(e) ou, d'une certaine façon, j'ai senti que je ne faisais pas partie de ce qui se passait.",
      "Je me suis retrouvé(e) sur le « pilote automatique » – je me suis mis(e) à faire des choses que, je l'ai réalisé plus tard, je n'avais pas activement décidé de faire.",
      "Ma perception du temps a changé – les choses avaient l'air de se dérouler au ralenti.",
      "Ce qui se passait me semblait irréel, comme si j'étais dans un rêve ou au cinéma, ou en train de jouer un rôle.",
      "C'est comme si j'étais le (ou la) spectateur(trice) de ce qui m'arrivait, comme si je flottais au-dessus de la scène et l'observais de l'extérieur.",
      "Il y a eu des moments où la perception que j'avais de mon corps était distordue ou changée. Je me sentais déconnecté(e) de mon propre corps, ou bien il me semblait plus grand ou plus petit que d'habitude.",
      "J'avais l'impression que les choses qui arrivaient aux autres m'arrivaient à moi aussi – comme par exemple être en danger alors que je ne l'étais pas.",
      "J'ai été surpris(e) de constater après coup que plusieurs choses s'étaient produites sans que je m'en rende compte, des choses que j'aurais habituellement remarquées.",
      "J'étais confus(e) ; c'est-à-dire que par moment j'avais de la difficulté à comprendre ce qui se passait vraiment.",
      "J'étais désorienté(e) ; c'est-à-dire que par moment j'étais incertain(e) de l'endroit où je me trouvais, ou de l'heure qu'il était.",
    ],
    answerScales: {
      intensity: [
        { value: 1, label: "Pas du tout vrai" },
        { value: 2, label: "Un peu vrai" },
        { value: 3, label: "Plutôt vrai" },
        { value: 4, label: "Très vrai" },
        { value: 5, label: "Extrêmement vrai" },
      ],
    },
    scoring: {
      ranges: [
        {
          min: 10,
          max: 14,
          interpretation: "Dissociation péritraumatique non significative",
        },
        {
          min: 15,
          max: 50,
          interpretation: "Dissociation péritraumatique significative",
        },
      ],
      maxScore: 50,
      method:
        "Additionnez les scores de chaque item (1-5). Le score total varie de 10 à 50. Un score ≥ 15 permet le dépistage d'une dissociation péritraumatique significative.",
    },
  },
  {
    id: "eii",
    acronym: "ÉII",
    label: "Échelle d'intolérance à l'incertitude",
    icon: "/images/scales/eii.svg",
    color: "#6A9BCC",
    colorLight: "#B4CDE5",
    formType: "single-scale",
    title: "ÉII - Échelle d'intolérance à l'incertitude",
    description:
      "Une échelle de 27 items mesurant les réactions émotionnelles, cognitives et comportementales face à l'incertitude de la vie",
    category: "Anxiété généralisée",
    estimatedTime: "5-10 minutes",
    longDescription:
      "L'Échelle d'intolérance à l'incertitude (ÉII, connue internationalement sous le sigle IUS — Intolerance of Uncertainty Scale) est un auto-questionnaire de 27 items développé en français par Freeston, Rhéaume, Letarte, Dugas et Ladouceur (1994). Elle mesure les réactions face aux situations ambiguës, à l'incertitude et aux événements futurs — un mécanisme central du trouble anxieux généralisé dans le modèle de Dugas. Chaque item est coté de 1 (pas du tout correspondant) à 5 (tout à fait correspondant) ; le score total varie de 27 à 135, sans seuil clinique établi : plus le score est élevé, plus l'intolérance à l'incertitude est marquée. L'échelle peut aussi se coter en deux facteurs : « l'incertitude a des implications négatives sur la perception de soi et les comportements » (facteur 1) et « l'incertitude est injuste et gâche tout » (facteur 2).",
    instructions:
      "Voici une série d'énoncés qui représentent comment les gens peuvent réagir à l'incertitude dans la vie.\n\nVeuillez indiquer jusqu'à quel point chacun des énoncés suivants correspond à vous.",
    persistentInstructions:
      "Jusqu'à quel point cet énoncé correspond-il à vous ?",
    copyrightAttribution:
      "Échelle d'intolérance à l'incertitude (ÉII / IUS) — Freeston, Rhéaume, Letarte, Dugas & Ladouceur (1994), Personality and Individual Differences, 17, 791-802. Instrument original francophone.",
    higherIsBetter: false,
    questions: [
      "L'incertitude m'empêche de prendre position.",
      "Être incertain(e) veut dire qu'on est une personne désorganisée.",
      "L'incertitude rend la vie intolérable.",
      "C'est injuste de ne pas avoir de garanties dans la vie.",
      "Je ne peux pas avoir l'esprit tranquille tant que je ne sais pas ce qui va arriver le lendemain.",
      "L'incertitude me rend mal à l'aise, anxieux(se) ou stressé(e).",
      "Les imprévus me dérangent énormément.",
      "Ça me frustre de ne pas avoir toute l'information dont j'ai besoin.",
      "L'incertitude m'empêche de profiter pleinement de la vie.",
      "On devrait tout prévenir pour éviter les surprises.",
      "Un léger imprévu peut tout gâcher, même la meilleure des planifications.",
      "Lorsque c'est le temps d'agir, l'incertitude me paralyse.",
      "Être incertain(e) veut dire que je ne suis pas à la hauteur.",
      "Lorsque je suis incertain(e), je ne peux pas aller de l'avant.",
      "Lorsque je suis incertain(e), je ne peux pas bien fonctionner.",
      "Contrairement à moi, les autres semblent toujours savoir où ils vont dans la vie.",
      "L'incertitude me rend vulnérable, malheureux(se) ou triste.",
      "Je veux toujours savoir ce que l'avenir me réserve.",
      "Je déteste être pris(e) au dépourvu.",
      "Le moindre doute peut m'empêcher d'agir.",
      "Je devrais être capable de tout organiser à l'avance.",
      "Être incertain(e), ça veut dire que je manque de confiance.",
      "Je trouve injuste que d'autres personnes semblent certaines face à leur avenir.",
      "L'incertitude m'empêche de bien dormir.",
      "Je dois me retirer de toute situation incertaine.",
      "Les ambiguïtés de la vie me stressent.",
      "Je ne tolère pas d'être indécis(e) au sujet de mon avenir.",
    ],
    answerScales: {
      intensity: [
        { value: 1, label: "Pas du tout correspondant" },
        { value: 2, label: "Un peu correspondant" },
        { value: 3, label: "Assez correspondant" },
        { value: 4, label: "Très correspondant" },
        { value: 5, label: "Tout à fait correspondant" },
      ],
    },
    scoring: {
      ranges: [
        {
          min: 27,
          max: 135,
          interpretation:
            "Plus le score est élevé, plus l'intolérance à l'incertitude est marquée.",
        },
      ],
      maxScore: 135,
      method:
        "Additionnez les scores des 27 items (1-5). Le score total varie de 27 à 135. Pas de seuil clinique établi ; la cotation bifactorielle (facteurs 1 et 2) est fournie en sous-scores.",
    },
  },
  {
    id: "cudit-r",
    acronym: "CUDIT-R",
    label: "Test de repérage des troubles liés à l'usage du cannabis",
    patientIntroSubtitle: "Cannabis Use Disorder Identification Test - Revised (CUDIT-R-Fr)",
    icon: "/images/scales/cudit-r.svg",
    color: "#A97BA5",
    colorLight: "#D6BDD3",
    formType: "options",
    title: "CUDIT-R - Test de repérage des troubles liés à l'usage du cannabis",
    description:
      "Un questionnaire de 8 items repérant une consommation de cannabis problématique ou un trouble de l'usage au cours des 6 derniers mois",
    category: "Addictions",
    estimatedTime: "2-3 minutes",
    longDescription:
      "Le CUDIT-R (Cannabis Use Disorder Identification Test – Revised) est un auto-questionnaire de 8 items développé par Adamson et al. (2010) pour repérer les consommations de cannabis problématiques et les troubles de l'usage du cannabis, sur les 6 derniers mois. Les items 1 à 7 sont cotés de 0 à 4 et l'item 8 est coté 0, 2 ou 4 ; le score total varie de 0 à 32. Un score de 8 à 10 évoque une consommation possiblement problématique ; au-delà de 10, un trouble de l'usage du cannabis est possible. La version française (CUDIT-R-Fr) a été validée par Luquiens et al. (2021). Ce questionnaire s'adresse aux personnes ayant consommé du cannabis au cours des 6 derniers mois.",
    instructions:
      "Ce questionnaire s'adresse aux personnes ayant consommé du cannabis au cours des 6 derniers mois.\n\nRépondez aux questions suivantes en choisissant la réponse qui correspond le plus à votre consommation de cannabis au cours des 6 derniers mois. Veuillez répondre à toutes les questions.",
    persistentInstructions:
      "Votre consommation au cours des 6 derniers mois :",
    copyrightAttribution:
      "CUDIT-R — Adamson, Kay-Lambkin, Baker, Lewin, Thornton, Kelly & Sellman (2010). Version française (CUDIT-R-Fr) : Luquiens et al. (2021), Drug and Alcohol Review. Diffusion : RESPADD.",
    higherIsBetter: false,
    questions: [
      {
        title: "Fréquence de consommation",
        prompt: "À quelle fréquence consommez-vous du cannabis ?",
        options: [
          { value: 0, text: "Jamais" },
          { value: 1, text: "Une fois par mois ou moins" },
          { value: 2, text: "2 à 4 fois par mois" },
          { value: 3, text: "2 à 3 fois par semaine" },
          { value: 4, text: "4 fois ou plus par semaine" },
        ],
      },
      {
        title: "Durée des effets",
        prompt:
          "Combien d'heures êtes-vous « défoncé(e) » un jour typique où vous consommez du cannabis ?",
        options: [
          { value: 0, text: "Moins d'une heure" },
          { value: 1, text: "1 ou 2 heures" },
          { value: 2, text: "3 ou 4 heures" },
          { value: 3, text: "5 ou 6 heures" },
          { value: 4, text: "7 heures ou plus" },
        ],
      },
      {
        title: "Perte de contrôle",
        prompt:
          "Au cours des 6 derniers mois, à quelle fréquence avez-vous constaté que vous n'étiez plus capable de vous arrêter de fumer du cannabis une fois que vous aviez commencé ?",
        options: [
          { value: 0, text: "Jamais" },
          { value: 1, text: "Moins d'une fois par mois" },
          { value: 2, text: "Environ une fois par mois" },
          { value: 3, text: "Environ une fois par semaine" },
          { value: 4, text: "Tous les jours ou presque" },
        ],
      },
      {
        title: "Obligations non remplies",
        prompt:
          "Au cours des 6 derniers mois, combien de fois votre consommation de cannabis vous a-t-elle empêché de faire ce qui était normalement attendu de vous ?",
        options: [
          { value: 0, text: "Jamais" },
          { value: 1, text: "Moins d'une fois par mois" },
          { value: 2, text: "Environ une fois par mois" },
          { value: 3, text: "Environ une fois par semaine" },
          { value: 4, text: "Tous les jours ou presque" },
        ],
      },
      {
        title: "Temps consacré",
        prompt:
          "Au cours des 6 derniers mois, combien de fois avez-vous passé une grande partie de votre temps à chercher à vous procurer ou à consommer du cannabis, ou à vous remettre des effets du cannabis ?",
        options: [
          { value: 0, text: "Jamais" },
          { value: 1, text: "Moins d'une fois par mois" },
          { value: 2, text: "Environ une fois par mois" },
          { value: 3, text: "Environ une fois par semaine" },
          { value: 4, text: "Tous les jours ou presque" },
        ],
      },
      {
        title: "Mémoire et concentration",
        prompt:
          "Au cours des 6 derniers mois, combien de fois avez-vous éprouvé des problèmes de mémoire ou de concentration après avoir fumé du cannabis ?",
        options: [
          { value: 0, text: "Jamais" },
          { value: 1, text: "Moins d'une fois par mois" },
          { value: 2, text: "Environ une fois par mois" },
          { value: 3, text: "Environ une fois par semaine" },
          { value: 4, text: "Tous les jours ou presque" },
        ],
      },
      {
        title: "Situations à risque",
        prompt:
          "À quelle fréquence consommez-vous du cannabis dans des situations qui pourraient entraîner un danger, par exemple conduire un véhicule, utiliser une machine, ou s'occuper d'enfants ?",
        options: [
          { value: 0, text: "Jamais" },
          { value: 1, text: "Moins d'une fois par mois" },
          { value: 2, text: "Environ une fois par mois" },
          { value: 3, text: "Environ une fois par semaine" },
          { value: 4, text: "Tous les jours ou presque" },
        ],
      },
      {
        title: "Envie de réduire ou d'arrêter",
        prompt:
          "Avez-vous déjà envisagé de réduire ou d'arrêter votre consommation de cannabis ?",
        options: [
          { value: 0, text: "Jamais" },
          { value: 2, text: "Oui, mais pas au cours des 6 derniers mois" },
          { value: 4, text: "Oui, au cours des 6 derniers mois" },
        ],
      },
    ],
    scoring: {
      ranges: [
        {
          min: 0,
          max: 7,
          interpretation: "Pas de trouble de l'usage repéré",
        },
        {
          min: 8,
          max: 10,
          interpretation: "Consommation de cannabis possiblement problématique",
        },
        {
          min: 11,
          max: 32,
          interpretation: "Trouble de l'usage du cannabis possible",
        },
      ],
      maxScore: 32,
      method:
        "Additionnez les scores de chaque item (items 1-7 : 0-4 ; item 8 : 0, 2 ou 4). Le score total varie de 0 à 32. De 8 à 10 : consommation possiblement problématique ; au-delà de 10 : trouble de l'usage possible.",
    },
  },
  {
    id: "hsps",
    acronym: "HSPS",
    label: "Questionnaire d'hypersensibilité d'Elaine Aron",
    patientIntroSubtitle: null,
    icon: "/images/scales/hsps.svg",
    color: "#7FA99B",
    colorLight: "#C2D6CE",
    formType: "single-scale",
    title: "HSPS - Questionnaire d'hypersensibilité d'Elaine Aron",
    description:
      "Un auto-test de 23 items (oui/non) issu des travaux d'Elaine Aron sur la haute sensibilité de traitement sensoriel",
    category: "Hypersensibilité",
    estimatedTime: "3-5 minutes",
    longDescription:
      "Ce questionnaire d'hypersensibilité est l'auto-test en 23 items publié par Elaine N. Aron dans « The Highly Sensitive Person » (1996), issu de ses travaux sur la sensibilité de traitement sensoriel (Highly Sensitive Person Scale). Chaque énoncé appelle une réponse OUI (s'applique le plus souvent à vous) ou NON (ne s'applique pas vraiment ou pas du tout). Un total de 12 réponses OUI ou plus suggère une probable hypersensibilité. Comme le rappelle l'auteure, aucun test psychologique n'est d'une exactitude absolue : si certaines affirmations résonnent fortement, une hypersensibilité reste très probable même sous le seuil. Il s'agit d'un outil d'auto-repérage, distinct de la version de recherche à cotation Likert.",
    instructions:
      "Répondez de la façon la plus sincère possible à chaque question.\n\nRépondez OUI si cela s'applique le plus souvent à vous. Répondez NON si cela ne s'applique pas vraiment ou pas du tout à vous.",
    copyrightAttribution:
      "Questionnaire d'hypersensibilité — Elaine N. Aron, The Highly Sensitive Person (1996). Traduction française : « Ces gens qui ont peur d'avoir peur », Éditions de l'Homme.",
    higherIsBetter: false,
    questions: [
      "Je suis conscient(e) des subtiles nuances de mon environnement",
      "L'humeur des autres me touche",
      "Je suis très sensible à la douleur",
      "J'ai besoin de me retirer pendant les journées frénétiques, soit au lit, soit dans une chambre obscurcie, soit dans tout endroit où je suis susceptible d'être tranquille et libéré(e) de toute stimulation",
      "Je suis particulièrement sensible aux effets de la caféine",
      "Je suis facilement terrassé(e) par les lumières violentes, les odeurs fortes, les tissus grossiers ou les sirènes proches",
      "J'ai une vie intérieure riche et complexe",
      "Le bruit me dérange",
      "Les arts et la musique suscitent en moi une émotion profonde",
      "Je suis une personne consciencieuse",
      "Je sursaute facilement",
      "Je m'énerve lorsque j'ai beaucoup à faire en peu de temps",
      "Lorsque les autres se sentent mal à l'aise dans leur environnement matériel, je sens en général ce que je dois faire pour les soulager (changer l'éclairage, proposer d'autres sièges)",
      "Je perds les pédales lorsqu'on essaie de me faire faire trop de choses à la fois",
      "J'essaie vraiment d'éviter de commettre des erreurs ou des oublis",
      "Je fais en sorte d'éviter les films et les émissions qui contiennent des scènes de violence",
      "Je m'énerve lorsque beaucoup de choses se passent autour de moi",
      "La faim provoque en moi une forte réaction, perturbe ma concentration et mon humeur",
      "Les changements qui se produisent dans ma vie m'ébranlent",
      "Je remarque et j'apprécie les parfums et les goûts délicats, les bruits doux, les subtiles œuvres d'art",
      "Je fais mon possible pour éviter les situations inquiétantes ou perturbatrices",
      "Lorsque je dois rivaliser avec d'autres ou lorsqu'on m'observe pendant que je travaille, je perds mon sang-froid et j'obtiens un résultat bien pire que lorsqu'on me laisse tranquille",
      "Lorsque j'étais enfant, mes parents ou mes enseignants semblaient me considérer comme sensible ou timide",
    ],
    answerScales: {
      intensity: [
        { value: 1, label: "Oui" },
        { value: 0, label: "Non" },
      ],
    },
    scoring: {
      ranges: [
        {
          min: 0,
          max: 11,
          interpretation: "Hypersensibilité peu probable",
        },
        {
          min: 12,
          max: 23,
          interpretation: "Hypersensibilité probable",
        },
      ],
      maxScore: 23,
      method:
        "Comptez les réponses OUI (1 point chacune). Le score total varie de 0 à 23. À partir de 12 réponses OUI, une hypersensibilité est probable.",
    },
  },
  {
    id: "qia",
    acronym: "QIA",
    label: "Questionnaire sur l'inquiétude et l'anxiété",
    icon: "/images/scales/qia.svg",
    color: "#6A9BCC",
    colorLight: "#B4CDE5",
    formType: "options",
    title: "QIA - Questionnaire sur l'inquiétude et l'anxiété",
    description:
      "Un questionnaire de 11 items évaluant la présence et la sévérité des symptômes du trouble anxieux généralisé (inquiétudes, symptômes somatiques, interférence)",
    category: "Anxiété généralisée",
    estimatedTime: "5 minutes",
    longDescription:
      "Le QIA (Questionnaire sur l'Inquiétude et l'Anxiété, connu internationalement sous le sigle WAQ — Worry and Anxiety Questionnaire) est un auto-questionnaire développé en français par Dugas et al. (2001) pour évaluer la présence et la sévérité des symptômes du trouble anxieux généralisé selon les critères diagnostiques. Le patient liste d'abord ses thèmes d'inquiétude (item 1, non coté), puis cote de 0 à 8 le caractère excessif de ses inquiétudes, leur fréquence, la difficulté à les contrôler, six sensations somatiques et l'interférence avec sa vie. Le score total (somme des items cotés, 0 à 80) suit l'évolution ; la cotation par critères repère un profil compatible avec le TAG : au moins un thème d'inquiétude, un score ≥ 4 aux items 2, 3, 4 et 6, et un score ≥ 4 sur au moins 3 des 6 sensations somatiques.",
    instructions:
      "Ce questionnaire porte sur vos inquiétudes et votre anxiété au cours des six derniers mois.\n\nVous listerez d'abord les sujets à propos desquels vous vous inquiétez le plus souvent, puis vous répondrez à chaque question en choisissant le chiffre correspondant (0 à 8).",
    copyrightAttribution:
      "Questionnaire sur l'Inquiétude et l'Anxiété (QIA / WAQ) — Dugas, Freeston, Provencher, Lachance, Ladouceur & Gosselin (2001), Journal de Thérapie Comportementale et Cognitive, 11(1), 31-36. Instrument original francophone.",
    higherIsBetter: false,
    openingTextItem: {
      key: "worry_themes",
      questionText:
        "Quels sont les sujets à propos desquels vous vous inquiétez le plus souvent ?",
      helperText:
        "Listez jusqu'à six sujets (par exemple : santé, travail, famille, finances…).",
    },
    sectionIntros: [
      {
        startIndex: 3,
        text: "Sensations physiques",
        description:
          "Durant les derniers six mois, avez-vous souvent été troublé(e) par une ou l'autre des sensations suivantes lorsque vous étiez inquiet(ète) ou anxieux(se) ? Cotez chaque sensation de 0 à 8.",
      },
    ],
    questions: [
      {
        title: "Caractère excessif des inquiétudes",
        prompt:
          "Est-ce que vos inquiétudes vous semblent excessives ou exagérées ?",
        options: [
          { value: 0, text: "0 — Aucunement excessives" },
          { value: 1, text: "1" },
          { value: 2, text: "2" },
          { value: 3, text: "3" },
          { value: 4, text: "4 — Modérément excessives" },
          { value: 5, text: "5" },
          { value: 6, text: "6" },
          { value: 7, text: "7" },
          { value: 8, text: "8 — Complètement excessives" },
        ],
      },
      {
        title: "Fréquence des inquiétudes",
        prompt:
          "Durant les derniers six mois, combien de jours avez-vous été troublé(e) par des inquiétudes excessives ?",
        options: [
          { value: 0, text: "0 — Jamais" },
          { value: 1, text: "1" },
          { value: 2, text: "2" },
          { value: 3, text: "3" },
          { value: 4, text: "4 — 1 jour sur 2" },
          { value: 5, text: "5" },
          { value: 6, text: "6" },
          { value: 7, text: "7" },
          { value: 8, text: "8 — À tous les jours" },
        ],
      },
      {
        title: "Contrôle des inquiétudes",
        prompt:
          "Est-ce que vous avez de la difficulté à contrôler vos inquiétudes ? Par exemple, lorsque vous commencez à vous inquiéter à propos de quelque chose, avez-vous de la difficulté à vous arrêter ?",
        options: [
          { value: 0, text: "0 — Aucune difficulté" },
          { value: 1, text: "1" },
          { value: 2, text: "2" },
          { value: 3, text: "3" },
          { value: 4, text: "4 — Difficulté modérée" },
          { value: 5, text: "5" },
          { value: 6, text: "6" },
          { value: 7, text: "7" },
          { value: 8, text: "8 — Difficulté extrême" },
        ],
      },
      {
        title: "Sensations physiques",
        prompt: "Agité(e), surexcité(e) ou avoir les nerfs à vif",
        options: [
          { value: 0, text: "0 — Aucunement" },
          { value: 1, text: "1" },
          { value: 2, text: "2" },
          { value: 3, text: "3" },
          { value: 4, text: "4 — Modérément" },
          { value: 5, text: "5" },
          { value: 6, text: "6" },
          { value: 7, text: "7" },
          { value: 8, text: "8 — Très sévèrement" },
        ],
      },
      {
        title: "Sensations physiques",
        prompt: "Facilement fatigué(e)",
        options: [
          { value: 0, text: "0 — Aucunement" },
          { value: 1, text: "1" },
          { value: 2, text: "2" },
          { value: 3, text: "3" },
          { value: 4, text: "4 — Modérément" },
          { value: 5, text: "5" },
          { value: 6, text: "6" },
          { value: 7, text: "7" },
          { value: 8, text: "8 — Très sévèrement" },
        ],
      },
      {
        title: "Sensations physiques",
        prompt: "Difficulté à se concentrer ou blanc de mémoire",
        options: [
          { value: 0, text: "0 — Aucunement" },
          { value: 1, text: "1" },
          { value: 2, text: "2" },
          { value: 3, text: "3" },
          { value: 4, text: "4 — Modérément" },
          { value: 5, text: "5" },
          { value: 6, text: "6" },
          { value: 7, text: "7" },
          { value: 8, text: "8 — Très sévèrement" },
        ],
      },
      {
        title: "Sensations physiques",
        prompt: "Irritabilité",
        options: [
          { value: 0, text: "0 — Aucunement" },
          { value: 1, text: "1" },
          { value: 2, text: "2" },
          { value: 3, text: "3" },
          { value: 4, text: "4 — Modérément" },
          { value: 5, text: "5" },
          { value: 6, text: "6" },
          { value: 7, text: "7" },
          { value: 8, text: "8 — Très sévèrement" },
        ],
      },
      {
        title: "Sensations physiques",
        prompt: "Tensions musculaires",
        options: [
          { value: 0, text: "0 — Aucunement" },
          { value: 1, text: "1" },
          { value: 2, text: "2" },
          { value: 3, text: "3" },
          { value: 4, text: "4 — Modérément" },
          { value: 5, text: "5" },
          { value: 6, text: "6" },
          { value: 7, text: "7" },
          { value: 8, text: "8 — Très sévèrement" },
        ],
      },
      {
        title: "Sensations physiques",
        prompt:
          "Problèmes de sommeil (difficulté à tomber ou rester endormi(e) ou sommeil agité et insatisfaisant)",
        options: [
          { value: 0, text: "0 — Aucunement" },
          { value: 1, text: "1" },
          { value: 2, text: "2" },
          { value: 3, text: "3" },
          { value: 4, text: "4 — Modérément" },
          { value: 5, text: "5" },
          { value: 6, text: "6" },
          { value: 7, text: "7" },
          { value: 8, text: "8 — Très sévèrement" },
        ],
      },
      {
        title: "Interférence avec la vie",
        prompt:
          "À quel point est-ce que l'anxiété ou l'inquiétude interfère avec votre vie, c'est-à-dire votre travail, activités sociales, famille, etc. ?",
        options: [
          { value: 0, text: "0 — Aucunement" },
          { value: 1, text: "1" },
          { value: 2, text: "2" },
          { value: 3, text: "3" },
          { value: 4, text: "4 — Modérément" },
          { value: 5, text: "5" },
          { value: 6, text: "6" },
          { value: 7, text: "7" },
          { value: 8, text: "8 — Très sévèrement" },
        ],
      },
    ],
    scoring: {
      ranges: [
        {
          min: 0,
          max: 80,
          interpretation:
            "Plus le score est élevé, plus la symptomatologie d'inquiétude et d'anxiété est marquée.",
        },
      ],
      maxScore: 80,
      method:
        "Additionnez les 10 items cotés (0-8), l'item 1 (thèmes d'inquiétude) n'est pas coté. Le score total varie de 0 à 80. La cotation par critères repère un profil compatible avec le TAG : ≥ 1 thème d'inquiétude, score ≥ 4 aux items 2, 3, 4 et 6, et ≥ 4 sur au moins 3 des 6 sensations somatiques.",
    },
  },
];

export function getScaleById(id: string): Scale | undefined {
  return scales.find((s) => s.id === id);
}

export type ScaleFormType = "single-scale" | "dual-scale" | "options";

export interface ScaleOption {
  value: number;
  label: string;
}

export interface ScaleRange {
  min: number;
  max: number;
  interpretation: string;
  /**
   * Custom label for the gauge tick at the start of this range (defaults to
   * `min`). Use "\n" for a two-line label, e.g. sex-specific thresholds.
   */
  thresholdLabel?: string;
}

export interface ScaleScoring {
  ranges: ScaleRange[];
  /** Max possible total score (e.g. 27 for PHQ-9, 144 for LSAS, 40 for Y-BOCS / RSES). */
  maxScore: number;
  /** Human description of how the score is computed (shown on the scale page). */
  method: string;
  /**
   * Short source of the interpretation thresholds, shown in small print under
   * the practitioner result gauge (e.g. "Seuils OFDT…").
   */
  thresholdsSource?: string;
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

/** Domaines cliniques (enum fermé). Plusieurs `category` peuvent partager un domaine. */
export type ScaleDomain =
  | "anxiete"
  | "humeur"
  | "trauma"
  | "toc"
  | "estime"
  | "addictions"
  | "hypersensibilite"
  | "neurodeveloppement"
  | "burnout"
  | "pleine-conscience";

export interface Scale {
  id: string;
  acronym: string;
  label: string;
  /** Domaine clinique : pilote la couleur de l'échelle dans l'UI (cf. apps/web/lib/scale-appearance). */
  domain: ScaleDomain;
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
    domain: "anxiete",
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
    domain: "anxiete",
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
    domain: "humeur",
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
    domain: "anxiete",
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
    // id historique/interne (clé DB + Sanity) — l'affichage et l'URL publique
    // utilisent l'acronyme PSWQ (cf. scale-slug.ts). Ne pas migrer sans plan de
    // reprise des sessions existantes et des landing pages Sanity.
    id: "qips",
    acronym: "PSWQ",
    label: "Questionnaire sur les inquiétudes du Penn State",
    domain: "anxiete",
    formType: "single-scale",
    title: "PSWQ - Questionnaire sur les inquiétudes du Penn State",
    description:
      "Une échelle de 16 items mesurant la tendance générale à s'inquiéter (inquiétude excessive du trouble anxieux généralisé)",
    category: "Anxiété généralisée",
    estimatedTime: "5-10 minutes",
    longDescription:
      "Le PSWQ (Penn State Worry Questionnaire, Meyer et al. 1990) est un auto-questionnaire de 16 items évaluant la tendance générale, excessive et incontrôlable à s'inquiéter, symptôme central du trouble anxieux généralisé. Melya utilise sa version française validée, le QIPS (Gosselin et al., 2001). Chaque item est coté de 1 (pas du tout correspondant) à 5 (extrêmement correspondant). Les items 1, 3, 8, 10 et 11, formulés à l'inverse, sont recodés avant sommation. Le score total varie de 16 à 80 ; un score plus élevé traduit une propension à s'inquiéter plus marquée.",
    instructions:
      "Veuillez utiliser l'échelle ci-dessous pour exprimer jusqu'à quel point chacun des énoncés suivants correspond à vous.",
    persistentInstructions:
      "Jusqu'à quel point cet énoncé vous correspond-il ?",
    copyrightAttribution:
      "Penn State Worry Questionnaire (PSWQ) — Meyer, Miller, Metzger & Borkovec, 1990. Traduction française (QIPS) © P. Gosselin, M. J. Dugas, R. Ladouceur & M. H. Freeston (2001), Université Laval — L'Encéphale, 27(5). Tous droits réservés.",
    higherIsBetter: false,
    reverseItems: [1, 3, 8, 10, 11],
    questions: [
      "Si je n'ai pas assez de temps pour tout faire, je ne m'inquiète pas.",
      "Mes inquiétudes me submergent.",
      "Je n'ai pas tendance à m'inquiéter à propos des choses.",
      "Plusieurs situations m'amènent à m'inquiéter.",
      "Je sais que je ne devrais pas m'inquiéter mais je n'y peux rien.",
      "Quand je suis sous pression, je m'inquiète beaucoup.",
      "Je m'inquiète continuellement à propos de tout.",
      "Il m'est facile de me débarrasser de pensées inquiétantes.",
      "Aussitôt que j'ai fini une tâche, je commence immédiatement à m'inquiéter au sujet de toutes les autres choses que j'ai encore à faire.",
      "Je ne m'inquiète jamais.",
      "Quand je n'ai plus rien à faire au sujet d'un tracas, je ne m'en inquiète plus.",
      "J'ai été inquiet tout au long de ma vie.",
      "Je remarque que je m'inquiète pour certains sujets.",
      "Quand je commence à m'inquiéter, je ne peux pas m'arrêter.",
      "Je m'inquiète tout le temps.",
      "Je m'inquiète au sujet de mes projets jusqu'à ce qu'ils soient terminés.",
    ],
    answerScales: {
      intensity: [
        { value: 1, label: "Pas du tout correspondant" },
        { value: 2, label: "Un peu correspondant" },
        { value: 3, label: "Assez correspondant" },
        { value: 4, label: "Très correspondant" },
        { value: 5, label: "Extrêmement correspondant" },
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
    domain: "trauma",
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
    domain: "toc",
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
            text: "1 à 3 heures par jour, ou survenue fréquente (plus de 8 fois par jour, mais la majorité de ma journée se passe sans)",
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
    domain: "estime",
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
    domain: "addictions",
    formType: "options",
    title: "AUDIT - Test de repérage des troubles liés à l'usage de l'alcool",
    description:
      "Un questionnaire de 10 items développé par l'OMS pour repérer une consommation d'alcool à risque, nocive ou une dépendance au cours des 12 derniers mois",
    category: "Addictions",
    estimatedTime: "2-3 minutes",
    longDescription:
      "L'AUDIT (Alcohol Use Disorders Identification Test) est un auto-questionnaire de 10 items développé par l'Organisation mondiale de la Santé (Saunders et al., 1993) pour repérer les consommations d'alcool problématiques. Les items 1 à 3 portent sur la consommation (fréquence, quantité, ivresses), les items 4 à 6 sur les signes de dépendance et les items 7 à 10 sur les conséquences. Chaque item est coté de 0 à 4 (items 9 et 10 : 0, 2 ou 4), pour un score total de 0 à 40 portant sur les 12 derniers mois. Selon la Société Française d'Alcoologie (2015), un score ≥ 7 chez l'homme et ≥ 6 chez la femme évoque un mésusage actuel, et un score > 12 (quel que soit le sexe) est en faveur d'une dépendance. L'interprétation affichée retient le seuil de 6 ; chez l'homme, un score de 6 reste sous le seuil de mésusage (7).",
    instructions:
      "Ce questionnaire interroge votre consommation d'alcool des douze derniers mois. Attention à ce que vos réponses reflètent cette unité de temps et pas seulement les dernières semaines. Un verre standard = 10 g d'alcool pur.",
    copyrightAttribution:
      "AUDIT (Alcohol Use Disorders Identification Test) — Organisation mondiale de la Santé ; Saunders, Aasland, Babor, de la Fuente & Grant (1993). Version française validée : Gache et al. (2005). Seuils : Société Française d'Alcoologie (2015).",
    higherIsBetter: false,
    questions: [
      {
        title: "Combien de fois vous arrive-t-il de consommer de l'alcool ?",
        options: [
          { value: 0, text: "Jamais" },
          { value: 1, text: "Une fois par mois ou moins" },
          { value: 2, text: "2 à 4 fois par mois" },
          { value: 3, text: "2 à 3 fois par semaine" },
          { value: 4, text: "4 fois ou plus par semaine" },
        ],
      },
      {
        title:
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
        title:
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
        title:
          "Dans les douze derniers mois, combien de fois avez-vous observé que vous n'étiez plus capable de vous arrêter de boire après avoir commencé ?",
        options: [
          { value: 0, text: "Jamais" },
          { value: 1, text: "Moins d'une fois par mois" },
          { value: 2, text: "Une fois par mois" },
          { value: 3, text: "Une fois par semaine" },
          { value: 4, text: "Chaque jour ou presque" },
        ],
      },
      {
        title:
          "Dans les douze derniers mois, combien de fois le fait d'avoir bu de l'alcool vous a-t-il empêché de faire ce qu'on attendait normalement de vous ?",
        options: [
          { value: 0, text: "Jamais" },
          { value: 1, text: "Moins d'une fois par mois" },
          { value: 2, text: "Une fois par mois" },
          { value: 3, text: "Une fois par semaine" },
          { value: 4, text: "Chaque jour ou presque" },
        ],
      },
      {
        title:
          "Dans les douze derniers mois, combien de fois, après une période de forte consommation, avez-vous dû boire de l'alcool dès le matin pour vous remettre en forme ?",
        options: [
          { value: 0, text: "Jamais" },
          { value: 1, text: "Moins d'une fois par mois" },
          { value: 2, text: "Une fois par mois" },
          { value: 3, text: "Une fois par semaine" },
          { value: 4, text: "Chaque jour ou presque" },
        ],
      },
      {
        title:
          "Dans les douze derniers mois, combien de fois avez-vous eu un sentiment de culpabilité ou de regret après avoir bu ?",
        options: [
          { value: 0, text: "Jamais" },
          { value: 1, text: "Moins d'une fois par mois" },
          { value: 2, text: "Une fois par mois" },
          { value: 3, text: "Une fois par semaine" },
          { value: 4, text: "Chaque jour ou presque" },
        ],
      },
      {
        title:
          "Dans les douze derniers mois, combien de fois avez-vous été incapable de vous souvenir de ce qui s'était passé la nuit précédente parce que vous aviez bu ?",
        options: [
          { value: 0, text: "Jamais" },
          { value: 1, text: "Moins d'une fois par mois" },
          { value: 2, text: "Une fois par mois" },
          { value: 3, text: "Une fois par semaine" },
          { value: 4, text: "Chaque jour ou presque" },
        ],
      },
      {
        title:
          "Vous êtes-vous blessé ou avez-vous blessé quelqu'un parce que vous aviez bu ?",
        options: [
          { value: 0, text: "Non" },
          { value: 2, text: "Oui, mais pas au cours de l'année écoulée" },
          { value: 4, text: "Oui, au cours de l'année" },
        ],
      },
      {
        title:
          "Un parent, un ami, un médecin ou autre soignant s'est-il inquiété de votre consommation d'alcool ou a-t-il suggéré que vous la réduisiez ?",
        options: [
          { value: 0, text: "Non" },
          { value: 2, text: "Oui, mais pas au cours de l'année écoulée" },
          { value: 4, text: "Oui, au cours de l'année" },
        ],
      },
    ],
    scoring: {
      ranges: [
        {
          min: 0,
          max: 5,
          interpretation: "Non évocateur d'un mésusage actuel d'alcool",
        },
        {
          min: 6,
          max: 12,
          interpretation: "Évocateur d'un mésusage actuel d'alcool",
          thresholdLabel: "6 F\n7 H",
        },
        {
          min: 13,
          max: 40,
          interpretation: "En faveur d'une dépendance à l'alcool",
        },
      ],
      maxScore: 40,
      thresholdsSource:
        "Seuils OFDT (Société Française d'Alcoologie, 2015) : mésusage dès 6 chez la femme (F) et dès 7 chez l'homme (H), dépendance au-delà de 12.",
      method:
        "Additionnez les scores de chaque item (items 1-8 : 0-4 ; items 9-10 : 0, 2 ou 4). Le score total varie de 0 à 40. Seuils Société Française d'Alcoologie (2015) : mésusage ≥ 7 chez l'homme / ≥ 6 chez la femme ; dépendance probable > 12.",
    },
  },
  {
    id: "pdeq",
    acronym: "PDEQ",
    label: "Questionnaire sur les expériences de dissociation péritraumatique",
    domain: "trauma",
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
      "PDEQ — Marmar, Weiss & Metzler (1997) ©1997. Traduction française : Brunet & Routhier (1999), avec l'autorisation des auteurs. Validation française : Birmes et al. (2005), European Psychiatry. Mise en page : Centre national de ressources et de résilience (Cn2r).",
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
    domain: "anxiete",
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
    patientIntroSubtitle: "Cannabis Use Disorder Identification Test - Revised - version française (CUDIT-R-Fr)",
    domain: "addictions",
    formType: "options",
    title: "CUDIT-R - Test de repérage des troubles liés à l'usage du cannabis",
    description:
      "Un questionnaire de 8 items repérant une consommation de cannabis problématique ou un trouble de l'usage au cours des 6 derniers mois",
    category: "Addictions",
    estimatedTime: "2-3 minutes",
    longDescription:
      "Le CUDIT-R (Cannabis Use Disorder Identification Test – Revised) est un auto-questionnaire de 8 items développé par Adamson et al. (2010) pour repérer les consommations de cannabis problématiques et les troubles de l'usage du cannabis, sur les 6 derniers mois. Les items 1 à 7 sont cotés de 0 à 4 et l'item 8 est coté 0, 2 ou 4 ; le score total varie de 0 à 32. Un score de 8 à 10 évoque une consommation pouvant être problématique ; au-delà de 10, un trouble important de l'usage de cannabis est possible. La version française (CUDIT-R-Fr) a été validée par Luquiens et al. (2021). Ce questionnaire s'adresse aux personnes ayant consommé du cannabis au cours des 6 derniers mois.",
    instructions:
      "Ce questionnaire s'adresse aux personnes ayant consommé du cannabis au cours des 6 derniers mois.\n\nRépondez aux questions suivantes en choisissant la réponse qui correspond le plus à votre consommation de cannabis au cours des 6 derniers mois. Veuillez répondre à toutes les questions.",
    persistentInstructions:
      "Votre consommation au cours des 6 derniers mois :",
    copyrightAttribution:
      "CUDIT-R — Adamson, Kay-Lambkin, Baker, Lewin, Thornton, Kelly & Sellman (2010). Version française (CUDIT-R-Fr) : Luquiens et al. (2021), Drug and Alcohol Review. Diffusion : RESPADD.",
    higherIsBetter: false,
    questions: [
      {
        title: "À quelle fréquence consommez-vous du cannabis ?",
        options: [
          { value: 0, text: "Jamais" },
          { value: 1, text: "Une fois par mois ou moins" },
          { value: 2, text: "2 à 4 fois par mois" },
          { value: 3, text: "2 à 3 fois par semaine" },
          { value: 4, text: "4 fois ou plus par semaine" },
        ],
      },
      {
        title:
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
        title:
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
        title:
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
        title:
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
        title:
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
        title:
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
        title:
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
          interpretation: "Consommation pouvant être à faible risque",
        },
        {
          min: 8,
          max: 10,
          interpretation: "Consommation de cannabis pouvant être problématique",
        },
        {
          min: 11,
          max: 32,
          interpretation: "Trouble important de l'usage de cannabis possible",
        },
      ],
      maxScore: 32,
      method:
        "Additionnez les scores de chaque item (items 1-7 : 0-4 ; item 8 : 0, 2 ou 4). Le score total varie de 0 à 32. De 8 à 10 : consommation pouvant être problématique ; au-delà de 10 : trouble important de l'usage possible.",
    },
  },
  {
    id: "ftnd",
    acronym: "FTND",
    label: "Test de Fagerström en six questions",
    domain: "addictions",
    formType: "options",
    title: "FTND - Test de Fagerström en six questions",
    description:
      "Un questionnaire de 6 items évaluant le degré de dépendance physique à la nicotine chez les fumeurs de cigarettes",
    category: "Addictions",
    estimatedTime: "2 minutes",
    longDescription:
      "Le test de Fagerström (Fagerström Test for Nicotine Dependence, Heatherton et al., 1991) est un auto-questionnaire de 6 items évaluant le degré de dépendance physique à la nicotine. Il est notamment utilisé pour orienter le choix et le dosage des substituts nicotiniques. Les items 1 et 4 sont cotés de 0 à 3, les items 2, 3, 5 et 6 de 0 à 1 ; le score total varie de 0 à 10. Interprétation selon la Haute Autorité de Santé (2014) : 0 à 2, pas de dépendance ; 3 à 4, dépendance faible ; 5 à 6, dépendance moyenne ; 7 à 10, dépendance forte ou très forte. Ce questionnaire s'adresse aux fumeurs de cigarettes.",
    copyrightAttribution:
      "Heatherton TF, Kozlowski LT, Frecker RC, Fagerström KO, 1991 — version française : Haute Autorité de Santé, 2014",
    higherIsBetter: false,
    // Pas de `prompt` : la source HAS n'a pas d'intitulé court par item, la
    // question s'affiche seule. Options dans l'ordre du PDF HAS (a, b, c, d),
    // qui n'est pas l'ordre des valeurs — ne pas trier.
    questions: [
      {
        title:
          "Le matin, combien de temps après être réveillé(e), fumez-vous votre première cigarette ?",
        options: [
          { value: 3, text: "Dans les 5 minutes" },
          { value: 2, text: "6 - 30 minutes" },
          { value: 1, text: "31 - 60 minutes" },
          { value: 0, text: "Plus de 60 minutes" },
        ],
      },
      {
        title:
          "Trouvez-vous qu'il est difficile de vous abstenir de fumer dans les endroits où c'est interdit ? (ex. : cinémas, bibliothèques)",
        options: [
          { value: 1, text: "Oui" },
          { value: 0, text: "Non" },
        ],
      },
      {
        title: "À quelle cigarette renonceriez-vous le plus difficilement ?",
        options: [
          { value: 1, text: "À la première de la journée" },
          { value: 0, text: "À une autre" },
        ],
      },
      {
        title: "Combien de cigarettes fumez-vous par jour, en moyenne ?",
        options: [
          { value: 0, text: "10 ou moins" },
          { value: 1, text: "11 à 20" },
          { value: 2, text: "21 à 30" },
          { value: 3, text: "31 ou plus" },
        ],
      },
      {
        title:
          "Fumez-vous à intervalles plus rapprochés durant les premières heures de la matinée que durant le reste de la journée ?",
        options: [
          { value: 1, text: "Oui" },
          { value: 0, text: "Non" },
        ],
      },
      {
        title:
          "Fumez-vous lorsque vous êtes malade au point de devoir rester au lit presque toute la journée ?",
        options: [
          { value: 1, text: "Oui" },
          { value: 0, text: "Non" },
        ],
      },
    ],
    scoring: {
      ranges: [
        { min: 0, max: 2, interpretation: "Pas de dépendance" },
        { min: 3, max: 4, interpretation: "Dépendance faible" },
        { min: 5, max: 6, interpretation: "Dépendance moyenne" },
        { min: 7, max: 10, interpretation: "Dépendance forte ou très forte" },
      ],
      maxScore: 10,
      method:
        "Additionnez les scores des 6 items (items 1 et 4 : 0-3 ; items 2, 3, 5 et 6 : 0-1). Le score total varie de 0 à 10. Seuils HAS (2014) : 0-2 pas de dépendance ; 3-4 dépendance faible ; 5-6 dépendance moyenne ; 7-10 dépendance forte ou très forte.",
    },
  },
  {
    id: "pdss",
    acronym: "PDSS",
    label: "Questionnaire d'appréciation des symptômes du trouble panique",
    domain: "anxiete",
    formType: "options",
    title: "PDSS - Questionnaire d'appréciation des symptômes du trouble panique",
    description:
      "Un questionnaire de 7 items évaluant la sévérité du trouble panique au cours de la dernière semaine",
    category: "Trouble panique",
    estimatedTime: "5 minutes",
    longDescription:
      "La PDSS (Panic Disorder Severity Scale, Shear et al., 1997) est portée ici dans sa version auto-questionnaire (PDSS-SR, Houck et al., 2002). Ses 7 items évaluent, sur la dernière semaine, la fréquence des attaques de panique, la détresse qu'elles provoquent, l'anxiété anticipatoire, l'évitement des situations et des sensations physiques, et le retentissement professionnel et social. Chaque item est coté de 0 à 4 ; le score total varie de 0 à 28. Un score ≥ 9 correspond au seuil de diagnostic probable de trouble panique de la validation française (Roberge et al., 2022 ; sensibilité 78,8 %, spécificité 70,4 %). C'est un seuil de dépistage, pas une gradation de sévérité.",
    // Consigne du formulaire MSSS verbatim, sauf « en cochant la case » →
    // « en choisissant la réponse ». Les `\n\n` séparent les paragraphes, les
    // lignes en "- " forment la liste à puces des symptômes (cases à cocher
    // non cotées dans le PDF), les autres `\n` passent à la ligne.
    instructions:
      "Plusieurs des questions qui suivent font référence à des attaques de panique et à des attaques subcliniques. Dans le présent questionnaire, l'attaque de panique correspond à un accès soudain de peur ou de malaise s'accompagnant d'au moins quatre symptômes de la liste ci-dessous. Pour répondre au critère de l'accès soudain, les symptômes doivent atteindre leur point culminant en dix minutes ou moins. Les épisodes qui ressemblent à une attaque de panique, mais comportent moins de quatre symptômes de la liste ci-dessous sont appelés des attaques subcliniques.\n\n" +
      "Voici la liste dans laquelle doivent figurer les symptômes :\n" +
      "- Battements de cœur rapides ou forts\n" +
      "- Transpiration\n" +
      "- Tremblements\n" +
      "- Essoufflement\n" +
      "- Sensation d'étranglement\n" +
      "- Douleur ou gêne thoraciques\n" +
      "- Nausée\n" +
      "- Étourdissement ou vertige\n" +
      "- Sentiment d'irréalité\n" +
      "- Engourdissement ou fourmillement\n" +
      "- Frissons ou bouffées de chaleur\n" +
      "- Peur de perdre le contrôle de soi ou de devenir fou\n" +
      "- Peur de mourir\n\n" +
      "1. Utilisez les échelles décrites à chaque item.\n" +
      "2. Répondez à chacun des items en choisissant la réponse qui correspond le mieux à votre situation.",
    copyrightAttribution:
      "Panic Disorder Severity Scale – PDSS © 1997 Katherine Shear — version française : ministère de la Santé et des Services sociaux du Québec, 2019",
    higherIsBetter: false,
    // Pas de `prompt` : la source n'a pas d'intitulé court par item.
    // Typographie québécoise de la source conservée (pas d'espace avant « ? »).
    questions: [
      {
        title:
          "Combien d'attaques de panique et d'attaques subcliniques avez-vous eues au cours de la semaine?",
        options: [
          { value: 0, text: "Aucune attaque de panique ou attaque subclinique" },
          {
            value: 1,
            text: "Léger : Aucune attaque de panique complète et pas plus d'une attaque subclinique par jour",
          },
          {
            value: 2,
            text: "Modéré : Une ou deux attaques de panique complètes et/ou plusieurs attaques subcliniques par jour",
          },
          {
            value: 3,
            text: "Grave : Plus de deux attaques de panique complètes, mais pas plus d'une par jour en moyenne",
          },
          {
            value: 4,
            text: "Extrême : Attaques de panique complètes plus d'une fois par jour, la plupart des jours",
          },
        ],
      },
      {
        title:
          "Si vous avez eu des attaques de panique au cours de la dernière semaine, quelle est l'intensité de la détresse (état de malaise et de peur) que vous avez ressentie pendant qu'elles se produisaient? (Si vous avez eu plus d'une attaque de panique, veuillez indiquer leur intensité moyenne. Si vous n'avez eu aucune attaque de panique, mais avez eu des attaques subcliniques, veuillez fournir une réponse au sujet de vos attaques subcliniques.)",
        options: [
          {
            value: 0,
            text: "Aucune détresse, ou encore aucune attaque de panique ou attaque subclinique au cours de la dernière semaine",
          },
          { value: 1, text: "Légère détresse (pas trop intense)" },
          { value: 2, text: "Détresse modérée (intense, mais gérable)" },
          { value: 3, text: "Détresse grave (très intense)" },
          { value: 4, text: "Détresse extrême (pendant toutes les attaques)" },
        ],
      },
      {
        title:
          "Au cours de la dernière semaine, à quel point vous êtes-vous inquiété au sujet du moment où surviendrait votre prochaine attaque de panique ou de vos craintes liées aux attaques (par exemple, les attaques pourraient signifier que vous avez un problème de santé physique ou mentale ou vous causer une humiliation sur le plan social)?",
        options: [
          { value: 0, text: "Pas du tout" },
          { value: 1, text: "Parfois ou seulement un peu" },
          { value: 2, text: "Souvent ou modérément" },
          { value: 3, text: "Très souvent ou de façon très perturbante" },
          { value: 4, text: "Presque continuellement et de façon invalidante" },
        ],
      },
      {
        title:
          "Au cours de la dernière semaine, avez-vous évité ou craint (vous vous sentiez mal à l'aise ou aviez envie d'éviter une situation ou de partir) certains endroits ou certaines situations (par exemple, les transports en commun, les salles de cinéma, les foules, les tunnels ou les ponts, les centres commerciaux, vous retrouver seul) parce que vous aviez peur d'avoir une attaque de panique? Y a-t-il d'autres situations que vous auriez évitées ou craintes, pour la même raison, si elles étaient survenues au cours de la semaine? Si vous répondez oui à l'une de ces questions, veuillez indiquer l'intensité de vos craintes et de vos évitements au cours de la dernière semaine.",
        options: [
          { value: 0, text: "Aucune crainte ou évitement." },
          {
            value: 1,
            text: "Léger : Crainte et/ou évitement occasionnels, mais j'ai généralement pu faire face à la situation ou la supporter. Je n'ai eu à apporter aucun ou seulement peu de changements à mon mode de vie pour cette raison.",
          },
          {
            value: 2,
            text: "Modéré : Crainte et/ou évitement notables, mais gérables. J'ai évité certaines situations, mais je pouvais y faire face en compagnie d'une autre personne. J'ai dû apporter certains changements à mon mode de vie pour cette raison, mais cela n'a pas nui à mon fonctionnement en général.",
          },
          {
            value: 3,
            text: "Grave : Évitement important. J'ai dû apporter des changements importants à mon mode de vie pour éviter des situations. Par conséquent, j'ai eu de la difficulté à accomplir mes activités quotidiennes.",
          },
          {
            value: 4,
            text: "Extrême : Volonté d'éviter des situations et/ou crainte envahissantes et invalidantes. J'ai dû modifier mon mode de vie en profondeur, si bien que j'ai été incapable d'accomplir des tâches importantes.",
          },
        ],
      },
      {
        title:
          "Au cours de la dernière semaine, avez-vous évité ou craint (vous vous sentiez mal à l'aise, aviez envie d'éviter la situation ou d'y mettre fin) des activités (par exemple, faire de l'exercice physique, avoir des relations sexuelles, prendre une douche ou un bain chaud, boire du café, regarder un film d'action ou d'horreur) parce qu'elles causent des sensations physiques semblables à celles que vous ressentez lors d'une attaque de panique ou parce que vous aviez peur qu'elles déclenchent une attaque de panique? Y a-t-il d'autres activités que vous auriez évitées ou craintes pour la même raison si l'occasion s'était présentée au cours de la semaine? Si vous répondez oui à l'une de ces questions, veuillez indiquer l'intensité des craintes et de l'évitement de ces activités au cours de la dernière semaine.",
        options: [
          {
            value: 0,
            text: "Aucune crainte ou évitement des activités en raison de sensations physiques perturbantes.",
          },
          {
            value: 1,
            text: "Léger : Crainte et/ou évitement occasionnels, mais j'ai généralement pu faire face à la situation ou supporter les activités provoquant des sensations physiques en ne ressentant qu'une légère détresse. Je n'ai eu à apporter que peu de changements à mon mode de vie pour cette raison.",
          },
          {
            value: 2,
            text: "Modéré : Évitement notable, mais gérable. J'ai dû apporter quelques changements à mon mode de vie, mais cela n'a pas nui à mon fonctionnement en général.",
          },
          {
            value: 3,
            text: "Grave : Évitement important. J'ai dû apporter des changements importants à mon mode de vie, ou ceci a nui à mon fonctionnement en général.",
          },
          {
            value: 4,
            text: "Extrême : Évitement envahissant et invalidant. J'ai dû modifier mon mode de vie en profondeur, si bien que j'ai été incapable d'accomplir des tâches ou des activités importantes.",
          },
        ],
      },
      {
        title:
          "Au cours de la dernière semaine, dans quelle mesure les symptômes mentionnés précédemment, dans leur ensemble (attaques de panique et attaques subcliniques, inquiétude au sujet des attaques, crainte de situations et d'activités en lien avec les attaques), ont-ils nui à votre capacité de travailler ou de vous acquitter de vos responsabilités à la maison? (Si vos responsabilités au travail ou à la maison ont été moins importantes que d'habitude au cours de la dernière semaine, veuillez estimer dans quelle mesure les symptômes vous auraient nui si vous aviez dû assumer vos responsabilités habituelles.)",
        options: [
          {
            value: 0,
            text: "Aucune : Les symptômes n'ont pas nui à mon travail ou à mes responsabilités à la maison.",
          },
          {
            // Source : « responsabilités la maison » — « à » ajouté (coquille).
            value: 1,
            text: "Légère : Les symptômes ont légèrement nui à mon travail ou à mes responsabilités à la maison, mais j'ai pu accomplir presque toutes les tâches que j'aurais accomplies si je n'avais pas eu ces problèmes.",
          },
          {
            value: 2,
            text: "Modérée : Les symptômes ont nui de façon notable à mon travail ou à mes responsabilités à la maison, mais j'ai réussi à accomplir les tâches nécessaires.",
          },
          {
            value: 3,
            text: "Grave : Les symptômes ont nui de façon importante à mon travail ou à mes responsabilités à la maison; j'ai été incapable d'accomplir plusieurs tâches importantes à cause de ces problèmes.",
          },
          {
            value: 4,
            text: "Extrême : Les symptômes ont été extrêmement invalidants, si bien que je n'ai été en mesure d'accomplir pratiquement aucune tâche relative à mon travail ou à mes responsabilités à la maison.",
          },
        ],
      },
      {
        title:
          "Au cours de la dernière semaine, dans quelle mesure les attaques de panique, les attaques subcliniques, l'inquiétude au sujet des attaques et la crainte de situations et d'activités ont-elles perturbé votre vie sociale? (Si vous n'avez pas eu beaucoup d'occasions de socialiser au cours de la dernière semaine, veuillez estimer dans quelle mesure votre vie sociale aurait été perturbée si les occasions s'étaient présentées.)",
        options: [
          { value: 0, text: "Aucune : Pas de perturbation." },
          {
            value: 1,
            text: "Légère : Les symptômes ont occasionné une légère perturbation de mes activités sociales, mais j'ai pu faire presque toutes les activités auxquelles je me serais adonné si je n'avais pas eu ces problèmes.",
          },
          {
            value: 2,
            text: "Modérée : Les symptômes ont occasionné une perturbation notable de mes activités sociales, mais j'ai pu faire la plupart de mes activités en faisant un effort.",
          },
          {
            value: 3,
            text: "Grave : Les symptômes ont occasionné une perturbation importante de mes activités sociales; j'ai été incapable de faire de nombreuses activités comportant des interactions sociales à cause de ces problèmes.",
          },
          {
            value: 4,
            text: "Extrême : Les symptômes ont été extrêmement invalidants, si bien que je n'ai été en mesure de m'adonner à presque aucune activité sociale.",
          },
        ],
      },
    ],
    scoring: {
      ranges: [
        { min: 0, max: 8, interpretation: "En dessous du seuil de dépistage" },
        { min: 9, max: 28, interpretation: "Trouble panique probable" },
      ],
      maxScore: 28,
      method:
        "Additionnez les scores des 7 items (0-4). Le score total varie de 0 à 28. Un score ≥ 9 correspond au seuil de diagnostic probable de trouble panique (Roberge et al., 2022).",
    },
  },
  {
    id: "hsps",
    acronym: "HSPS",
    label: "Questionnaire d'hypersensibilité d'Elaine Aron",
    patientIntroSubtitle: null,
    domain: "hypersensibilite",
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
    domain: "anxiete",
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
  {
    id: "psi-ii",
    acronym: "PSI-II",
    label: "Questionnaire Pourquoi s'inquiéter-II",
    domain: "anxiete",
    formType: "single-scale",
    title: "PSI-II - Questionnaire Pourquoi s'inquiéter-II",
    description:
      "Un questionnaire de 25 items évaluant les croyances erronées à l'égard des inquiétudes",
    category: "Anxiété généralisée",
    estimatedTime: "5-10 minutes",
    longDescription:
      "Le Questionnaire Pourquoi s'inquiéter-II (PSI-II, connu en anglais sous le sigle WW-II — Why Worry-II) est un auto-questionnaire de 25 items développé en français par Gosselin, Ladouceur, Langlois, Freeston, Dugas et Bertrand (2003). Il évalue les croyances erronées à l'égard des inquiétudes. Chaque item est coté de 1 (pas du tout vrai) à 5 (tout à fait) ; le score total varie de 25 à 125. La fiche de cotation des auteurs définit cinq sous-échelles de 5 items : s'inquiéter aide à résoudre les problèmes ; s'inquiéter aide à se motiver ; s'inquiéter aide l'individu à se prémunir de vivre des émotions difficiles si un événement s'avère négatif ; s'inquiéter en soi prévient les événements négatifs ; s'inquiéter est un trait de personnalité positif. Pas de seuil clinique fourni par les auteurs.",
    instructions:
      "Vous retrouvez ci-dessous une série d'énoncés qui peuvent se rapporter aux inquiétudes. En vous référant aux moments où vous vous inquiétez, veuillez indiquer jusqu'à quel point les énoncés suivants vous semblent vrais.",
    persistentInstructions:
      "En vous référant aux moments où vous vous inquiétez, veuillez indiquer jusqu'à quel point les énoncés suivants vous semblent vrais.",
    copyrightAttribution:
      "Questionnaire Pourquoi s'inquiéter-II (PSI-II) — Gosselin, Ladouceur, Langlois, Freeston, Dugas & Bertrand (2003), Revue européenne de psychologie appliquée, 53(3-4), 199-211. Instrument original francophone.",
    patientIntroSubtitle: null,
    higherIsBetter: false,
    questions: [
      "Si je ne m'inquiétais pas, je serais insouciant(e) et irresponsable.",
      "Si je m'inquiète, je serai moins ébranlé(e) lorsque des événements imprévus se produiront.",
      "Je m'inquiète dans le but de savoir quoi faire.",
      "Si je m'inquiète à l'avance, je serai moins déçu(e) si quelque chose de grave se produit.",
      "Le fait de m'inquiéter m'aide à planifier mes actions pour résoudre un problème.",
      "Le simple fait de m'inquiéter peut empêcher les malheurs d'arriver.",
      "Si je ne m'inquiétais pas, cela ferait de moi une personne négligente.",
      "C'est en m'inquiétant que je finis par entreprendre le travail que j'ai à faire.",
      "Je m'inquiète parce que je pense que cela peut m'aider à trouver une solution à mon problème.",
      "Le fait de m'inquiéter prouve que je suis une personne qui voit à ses affaires.",
      "Trop penser à des choses positives peut les empêcher de se produire.",
      "Le fait de m'inquiéter confirme que je suis une personne prévoyante.",
      "Si un malheur arrive, je me sentirai moins responsable si je m'en suis inquiété(e) auparavant.",
      "En m'inquiétant, je peux trouver une meilleure façon de faire.",
      "L'inquiétude me stimule et me rend plus efficace.",
      "Le fait de m'inquiéter m'incite à passer à l'action.",
      "Le simple fait de m'inquiéter diminue le risque que quelque chose de grave arrive.",
      "En m'inquiétant, je fais certaines choses que je ne me déciderais pas à faire autrement.",
      "Le fait de m'inquiéter me motive à faire les choses que je dois faire.",
      "Mes inquiétudes à elles seules peuvent diminuer les risques de danger.",
      "En m'inquiétant, j'augmente mes chances de trouver la meilleure solution.",
      "Le fait de m'inquiéter me permettra de me sentir moins coupable si quelque chose de grave se produit.",
      "Si je m'inquiète, je serai moins triste lorsqu'un événement négatif se produira.",
      "En ne s'inquiétant pas, on peut attirer les malheurs.",
      "Le fait de m'inquiéter démontre que je suis une bonne personne.",
    ],
    answerScales: {
      intensity: [
        { value: 1, label: "Pas du tout vrai" },
        { value: 2, label: "Un peu vrai" },
        { value: 3, label: "Assez vrai" },
        { value: 4, label: "Très vrai" },
        { value: 5, label: "Tout à fait" },
      ],
    },
    scoring: {
      ranges: [
        {
          min: 25,
          max: 125,
          interpretation: "Pas de seuil clinique fourni par les auteurs.",
        },
      ],
      maxScore: 125,
      method:
        "Additionnez les 25 items (1-5) : le score total varie de 25 à 125. Les cinq sous-échelles de la fiche de cotation des auteurs (5 items chacune, de 5 à 25) sont fournies en sous-scores. Pas de seuil clinique fourni par les auteurs.",
    },
  },
  {
    id: "adrs",
    acronym: "ADRS",
    label: "Échelle de repérage de la dépression de l'adolescent",
    domain: "humeur",
    formType: "single-scale",
    title: "ADRS - Échelle de repérage de la dépression de l'adolescent",
    description:
      "Un auto-questionnaire de 10 items (vrai / faux) pour repérer un risque de dépression chez l'adolescent",
    category: "Dépression — adolescents",
    estimatedTime: "5 minutes",
    longDescription:
      "L'ADRS (Adolescent Depression Rating Scale) est un instrument développé en français par Revah-Lévy, Birmaher, Gasquet et Falissard (2007) pour évaluer la dépression de l'adolescent, validé auprès de 402 adolescents francophones (France, Belgique, Suisse). La version auto-questionnaire compte 10 items cotés vrai (1) ou faux (0) ; le score varie de 0 à 10. Les enquêtes nationales françaises (OFDT, Santé publique France) distinguent un niveau de risque faible (0 à 3), modéré (4 à 6) et un risque important de dépression (7 à 10). Il s'agit d'un outil de repérage, pas d'un diagnostic.",
    copyrightAttribution:
      "ADRS (Adolescent Depression Rating Scale), version auto-questionnaire — Revah-Lévy, Birmaher, Gasquet & Falissard (2007), BMC Psychiatry, 7:2 (article sous licence CC BY 2.0). Instrument original francophone.",
    patientIntroSubtitle: null,
    higherIsBetter: false,
    questions: [
      "Je n'ai pas d'énergie pour l'école, pour le travail",
      "J'ai du mal à réfléchir",
      "Je sens que la tristesse, le cafard me débordent en ce moment",
      "Il n'y a rien qui m'intéresse, plus rien qui m'amuse",
      "Ce que je fais ne sert à rien",
      "Au fond, quand c'est comme ça, j'ai envie de mourir",
      "Je ne supporte pas grand-chose",
      "Je me sens découragé(e)",
      "Je dors très mal",
      "À l'école, au boulot, j'y arrive pas",
    ],
    answerScales: {
      intensity: [
        { value: 1, label: "Vrai" },
        { value: 0, label: "Faux" },
      ],
    },
    scoring: {
      ranges: [
        { min: 0, max: 3, interpretation: "Niveau de risque faible" },
        { min: 4, max: 6, interpretation: "Niveau de risque modéré" },
        { min: 7, max: 10, interpretation: "Risque important de dépression" },
      ],
      maxScore: 10,
      method:
        "Comptez les réponses « Vrai » (1 point chacune) : le score varie de 0 à 10. Tranches des enquêtes nationales (OFDT, Santé publique France) : 0-3 niveau de risque faible, 4-6 niveau de risque modéré, 7-10 risque important de dépression. Une réponse « Vrai » à l'item 6 (envie de mourir) déclenche une alerte.",
      thresholdsSource: "Tranches OFDT / Santé publique France (enquête EnCLASS)",
    },
  },
  {
    id: "qap",
    acronym: "QAP",
    label: "Questionnaire d'attitude face aux problèmes",
    domain: "anxiete",
    formType: "single-scale",
    title: "QAP - Questionnaire d'attitude face aux problèmes",
    description:
      "Un questionnaire de 12 items évaluant l'attitude négative face aux problèmes de la vie quotidienne",
    category: "Anxiété généralisée",
    estimatedTime: "3-5 minutes",
    longDescription:
      "Le Questionnaire d'attitude face aux problèmes (QAP) est un auto-questionnaire de 12 items développé en français par Gosselin, Ladouceur et Pelletier (2005). Il évalue l'orientation négative face aux problèmes de la vie quotidienne (connu en anglais sous le nom de Negative Problem Orientation Questionnaire). Chaque item est coté de 1 (pas du tout correspondant) à 5 (extrêmement correspondant) ; mesure unifactorielle sans item inversé, le score total varie de 12 à 60. Pas de seuil clinique fourni par les auteurs.",
    instructions:
      "Les gens peuvent réagir de différentes façons lorsqu'ils font face à des problèmes de la vie quotidienne (ex : problèmes de santé, disputes, manques de temps, etc.). Veuillez utiliser l'échelle ci-dessous pour exprimer jusqu'à quel point chacun des énoncés suivants correspond à votre façon de réagir ou de penser lorsque vous êtes confronté(e) à un problème.",
    persistentInstructions:
      "Veuillez utiliser l'échelle ci-dessous pour exprimer jusqu'à quel point chacun des énoncés suivants correspond à votre façon de réagir ou de penser lorsque vous êtes confronté(e) à un problème.",
    copyrightAttribution:
      "Questionnaire d'attitude face aux problèmes (QAP) — Gosselin, Ladouceur & Pelletier (2005), Journal de thérapie comportementale et cognitive, 15(4), 141-153. Instrument original francophone.",
    patientIntroSubtitle: null,
    higherIsBetter: false,
    questions: [
      "Je perçois les problèmes comme étant menaçants pour mon bien-être.",
      "Je doute souvent de mes capacités à résoudre les problèmes.",
      "Souvent, avant même d'avoir essayé de trouver une solution, je me dis qu'il est difficile de résoudre un problème.",
      "Les problèmes qui m'arrivent me semblent souvent insurmontables.",
      "Lorsque je tente de résoudre un problème, je remets souvent en question mes habiletés.",
      "Souvent, j'ai l'impression que les problèmes qui m'arrivent ne peuvent pas être résolus.",
      "Même si j'arrive à voir certaines solutions à mes problèmes, je doute qu'ils pourront se régler facilement.",
      "J'ai tendance à voir les problèmes comme un danger.",
      "Ma première réaction devant un problème est de remettre en question mes habiletés.",
      "Je perçois souvent mes problèmes comme étant plus gros qu'ils le sont en réalité.",
      "Même si j'ai regardé un problème sous tous les angles possibles, je me demande encore si la solution que j'ai retenue va être efficace.",
      "Je considère les problèmes comme des obstacles qui perturbent mon fonctionnement.",
    ],
    answerScales: {
      intensity: [
        { value: 1, label: "Pas du tout correspondant" },
        { value: 2, label: "Un peu correspondant" },
        { value: 3, label: "Assez correspondant" },
        { value: 4, label: "Très correspondant" },
        { value: 5, label: "Extrêmement correspondant" },
      ],
    },
    scoring: {
      ranges: [
        {
          min: 12,
          max: 60,
          interpretation: "Pas de seuil clinique fourni par les auteurs.",
        },
      ],
      maxScore: 60,
      method:
        "Additionnez les 12 items (1-5) : mesure unifactorielle sans item inversé, le score total varie de 12 à 60. Pas de seuil clinique fourni par les auteurs.",
    },
  },
  {
    id: "qec",
    acronym: "QEC",
    label: "Questionnaire d'évitement cognitif",
    domain: "anxiete",
    formType: "single-scale",
    title: "QEC - Questionnaire d'évitement cognitif",
    description:
      "Un questionnaire de 25 items évaluant cinq stratégies d'évitement cognitif",
    category: "Anxiété généralisée",
    estimatedTime: "5-10 minutes",
    longDescription:
      "Le Questionnaire d'évitement cognitif (QEC, connu en anglais sous le sigle CAQ — Cognitive Avoidance Questionnaire) est un auto-questionnaire de 25 items développé en français par Gosselin, Langlois, Freeston, Ladouceur, Dugas et Pelletier (2002), validé auprès d'adultes et d'adolescents. Chaque item est coté de 1 (pas du tout correspondant) à 5 (tout à fait correspondant) ; le score total varie de 25 à 125. La fiche de cotation des auteurs définit cinq sous-échelles de 5 items : substitution de pensées ; transformation des images en pensées ; distraction ; évitement des stimuli menaçants ; suppression de pensées. Pas de seuil clinique fourni par les auteurs.",
    instructions:
      "Les gens réagissent de différentes façons à certains types de pensées. Veuillez utiliser l'échelle ci-dessous pour exprimer jusqu'à quel point chacun des énoncés suivants correspond à votre façon de réagir à certaines pensées.",
    persistentInstructions:
      "Veuillez utiliser l'échelle ci-dessous pour exprimer jusqu'à quel point chacun des énoncés suivants correspond à votre façon de réagir à certaines pensées.",
    copyrightAttribution:
      "Questionnaire d'évitement cognitif (QEC) — Gosselin, Langlois, Freeston, Ladouceur, Dugas & Pelletier (2002), Journal de thérapie comportementale et cognitive, 12, 24-37. Instrument original francophone.",
    patientIntroSubtitle: null,
    higherIsBetter: false,
    questions: [
      "Il y a des choses auxquelles je préfère ne pas penser.",
      "J'évite certaines situations qui m'amènent à porter attention à des choses auxquelles je ne veux pas penser.",
      "Je remplace les images menaçantes que j'ai en tête par un discours intérieur.",
      "Je pense à des choses qui me concernent comme si cela arrivait à quelqu'un d'autre que moi.",
      "J'ai des pensées que j'essaie d'éviter.",
      "J'essaie de ne pas penser aux aspects les plus dérangeants de certaines situations pour ne pas avoir trop peur.",
      "J'évite parfois des objets qui peuvent déclencher des idées dérangeantes.",
      "Je me distrais pour éviter de penser à certains sujets troublants.",
      "J'évite des gens qui me font penser à des choses auxquelles je ne veux pas réfléchir.",
      "Je fais souvent des choses pour me distraire de mes pensées.",
      "Je pense à des détails inutiles pour ne pas penser aux sujets importants qui m'inquiètent.",
      "Parfois, je me plonge dans une activité pour ne pas penser à certaines choses.",
      "Pour éviter de penser aux sujets qui me dérangent, je m'efforce de penser à autre chose.",
      "Il y a des choses auxquelles j'essaie de ne pas penser.",
      "Je maintiens un discours intérieur pour éviter de voir des scénarios (une suite d'images) qui me font peur.",
      "Parfois, j'évite des endroits qui me font réfléchir à des choses auxquelles je préfèrerais ne pas penser.",
      "Je pense aux événements passés pour ne pas penser aux événements futurs insécurisants.",
      "J'évite de poser des gestes qui me rappellent des choses auxquelles je ne veux pas penser.",
      "Lorsque je vois des images dans ma tête qui sont trop dérangeantes, je les remplace par des pensées verbales (monologue interne).",
      "Je m'inquiète de beaucoup de petites affaires pour ne pas penser aux choses plus importantes.",
      "Parfois, je me garde occupé(e) seulement pour empêcher les pensées de surgir dans mon esprit.",
      "J'évite des situations avec d'autres personnes qui me font penser à des choses désagréables.",
      "J'essaie de décrire intérieurement des événements dérangeants plutôt que d'en former une image dans ma tête.",
      "Je mets de côté les images associées à une situation menaçante en tentant plutôt de me la décrire intérieurement.",
      "Je pense à ce qui inquiète les autres plutôt que de penser à mes propres inquiétudes.",
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
          min: 25,
          max: 125,
          interpretation: "Pas de seuil clinique fourni par les auteurs.",
        },
      ],
      maxScore: 125,
      method:
        "Additionnez les 25 items (1-5) : le score total varie de 25 à 125 (usage unifactoriel). Les cinq sous-échelles de la fiche de cotation des auteurs (5 items chacune, de 5 à 25) sont fournies en sous-scores. Pas de seuil clinique fourni par les auteurs.",
    },
  },
  {
    id: "pdi",
    acronym: "PDI",
    label: "Inventaire de détresse péritraumatique",
    domain: "trauma",
    formType: "single-scale",
    title: "PDI - Inventaire de détresse péritraumatique",
    description:
      "Un questionnaire de 13 items évaluant la détresse émotionnelle et physique ressentie pendant un événement traumatogène et immédiatement après",
    category: "Traumatismes",
    estimatedTime: "5 minutes",
    longDescription:
      "L'Inventaire de détresse péritraumatique (PDI, Peritraumatic Distress Inventory) est un auto-questionnaire de 13 items développé par Brunet et al. (2001) pour évaluer les réactions de détresse émotionnelle et physique au moment d'un événement traumatique et dans les minutes et les heures qui suivent. Une détresse péritraumatique élevée est un facteur de risque de développer un trouble de stress post-traumatique. Chaque item est coté de 0 (pas du tout vrai) à 4 (extrêmement vrai) ; le score total varie de 0 à 52. Un score total ≥ 15 indique une détresse péritraumatique significative. Traduction française et validation par Jehel et al. (2005).",
    instructions:
      "Complétez s'il vous plaît les énoncés qui suivent en choisissant la réponse qui correspond au mieux à ce que vous avez ressenti pendant et immédiatement après l'événement critique.\n\nSi une proposition ne s'applique pas à votre expérience de l'événement, alors choisissez la réponse « Pas du tout vrai ».",
    persistentInstructions:
      "Pendant et immédiatement après l'événement critique :",
    copyrightAttribution:
      "PDI — Brunet, Weiss, Metzler et al. (2001), American Journal of Psychiatry ©2001. Traduction française et validation : Jehel et al. (2005), Canadian Journal of Psychiatry. Mise en page : Centre national de ressources et de résilience (Cn2r).",
    higherIsBetter: false,
    questions: [
      "Je me sentais totalement incapable de faire quoi que ce soit.",
      "Je ressentais de la tristesse et du chagrin.",
      "Je me sentais frustré(e) et en colère car je ne pouvais rien faire de plus.",
      "J'avais peur pour ma propre sécurité.",
      "Je me sentais coupable.",
      "J'avais honte de mes réactions émotionnelles.",
      "J'étais inquiet pour la sécurité des autres.",
      "J'avais l'impression de perdre le contrôle de mes émotions.",
      "J'avais envie d'uriner et d'aller à la selle.",
      "J'étais horrifié(e) par ce que j'avais vu.",
      "J'avais des réactions physiques comme des sueurs, des tremblements et des palpitations.",
      "J'étais sur le point de m'évanouir.",
      "Je pensais que j'allais mourir.",
    ],
    answerScales: {
      intensity: [
        { value: 0, label: "Pas du tout vrai" },
        { value: 1, label: "Un peu vrai" },
        { value: 2, label: "Plutôt vrai" },
        { value: 3, label: "Très vrai" },
        { value: 4, label: "Extrêmement vrai" },
      ],
    },
    scoring: {
      ranges: [
        {
          min: 0,
          max: 14,
          interpretation: "Détresse péritraumatique non significative",
        },
        {
          min: 15,
          max: 52,
          interpretation: "Détresse péritraumatique significative",
        },
      ],
      maxScore: 52,
      method:
        "Additionnez les scores de chaque item (0-4). Le score total varie de 0 à 52. Un score ≥ 15 indique une détresse péritraumatique significative.",
      thresholdsSource: "Seuil de la fiche descriptive Cn2r",
    },
  },
  {
    id: "cast",
    acronym: "CAST",
    label: "Cannabis Abuse Screening Test",
    patientIntroSubtitle: null,
    domain: "addictions",
    formType: "single-scale",
    title: "CAST - Cannabis Abuse Screening Test",
    description:
      "Un questionnaire de 6 items repérant un usage problématique de cannabis au cours des 12 derniers mois",
    category: "Addictions",
    estimatedTime: "2 minutes",
    longDescription:
      "Le CAST (Cannabis Abuse Screening Test) est un auto-questionnaire de 6 items développé en français par l'Observatoire français des drogues et des toxicomanies (OFDT) à partir de 2002, dans sa version définitive depuis 2006 (Legleye et al., 2007). Il repère les usages problématiques de cannabis au cours des 12 derniers mois : usage le matin ou seul, troubles de la mémoire, remarques de l'entourage, échecs des tentatives de réduction ou d'arrêt, problèmes liés à la consommation. Chaque item est coté de 0 (jamais) à 4 (très souvent) ; le score total varie de 0 à 24. Selon l'OFDT, un score inférieur à 3 correspond à un usage sans risque, un score de 3 à 6 à un risque faible et un score ≥ 7 à un risque élevé d'usage problématique, voire de dépendance. Outil de repérage ; il ne remplace pas un diagnostic clinique.",
    instructions: "Au cours des 12 derniers mois…",
    persistentInstructions: "Au cours des 12 derniers mois…",
    copyrightAttribution:
      "CAST (Cannabis Abuse Screening Test) — Observatoire français des drogues et des toxicomanies (OFDT) ; Legleye, Karila, Beck & Reynaud (2007), Journal of Substance Use. Questionnaire et cotation : Spilka, Janssen & Legleye, Note OFDT n°2013-02.",
    higherIsBetter: false,
    questions: [
      "Avez-vous fumé du cannabis avant midi ?",
      "Avez-vous fumé du cannabis lorsque vous étiez seul(e) ?",
      "Avez-vous eu des problèmes de mémoire quand vous fumiez du cannabis ?",
      "Des amis ou des membres de votre famille vous ont-ils dit que vous devriez réduire votre consommation de cannabis ?",
      "Avez-vous essayé de réduire ou d'arrêter votre consommation de cannabis sans y arriver ?",
      "Avez-vous eu des problèmes à cause de votre consommation de cannabis (dispute, bagarre, accident, mauvais résultats à l'école…) ?",
    ],
    answerScales: {
      intensity: [
        { value: 0, label: "Jamais" },
        { value: 1, label: "Rarement" },
        { value: 2, label: "De temps en temps" },
        { value: 3, label: "Assez souvent" },
        { value: 4, label: "Très souvent" },
      ],
    },
    scoring: {
      ranges: [
        { min: 0, max: 2, interpretation: "Usage sans risque" },
        { min: 3, max: 6, interpretation: "Risque faible" },
        {
          min: 7,
          max: 24,
          interpretation: "Risque élevé d'usage problématique, voire de dépendance",
        },
      ],
      maxScore: 24,
      method:
        "Additionnez les 6 items (0-4) : le score total varie de 0 à 24. Moins de 3 : usage sans risque ; 3 à 6 : risque faible ; 7 ou plus : risque élevé d'usage problématique, voire de dépendance (seuils OFDT).",
      thresholdsSource: "Seuils OFDT (Note n°2013-02)",
    },
  },
  {
    id: "asrs",
    acronym: "ASRS-V1.1",
    label: "Test de dépistage et d'auto-évaluation des troubles déficitaires de l'attention avec hyperactivité de l'adulte",
    patientIntroSubtitle: "Test de dépistage avec échelle d'auto-évaluation V1.1",
    domain: "neurodeveloppement",
    formType: "single-scale",
    title: "ASRS-V1.1 - Test de dépistage du TDAH de l'adulte (6 questions)",
    description:
      "Un test de dépistage de 6 questions repérant des symptômes pouvant correspondre à un TDAH chez l'adulte, au cours des 6 derniers mois",
    category: "TDAH de l'adulte",
    estimatedTime: "2 minutes",
    longDescription:
      "Le test de dépistage ASRS-V1.1 (Adult ADHD Self-Report Scale, 6 questions) est la partie A de l'échelle d'auto-évaluation en 18 items conçue par Adler et Kessler avec l'Organisation mondiale de la santé. Destiné aux adultes de 18 ans et plus, il porte sur les 6 derniers mois. Chaque question se répond de « Jamais » à « Très souvent » ; une réponse compte si elle tombe dans la zone grisée du formulaire (à partir de « Quelquefois » pour les questions 1 à 3, à partir de « Souvent » pour les questions 4 à 6). Quatre réponses ou plus dans la zone grisée indiquent que les symptômes peuvent correspondre à ceux d'un TDAH de l'adulte et justifient une évaluation clinique. Ce n'est pas un outil diagnostique.",
    instructions:
      "Choisissez la réponse qui décrit le mieux ce que vous avez ressenti et comment vous vous êtes comporté au cours des 6 derniers mois.",
    persistentInstructions: "Au cours des 6 derniers mois :",
    copyrightAttribution:
      "The 6-question Adult Self-Report Scale-Version1.1 (ASRS-V1.1) Screener is a subset of the 18-question Adult ADHD Self-Report Scale-Version1.1 (Adult ASRSV1.1) Symptom Checklist. © New York University and the President and Fellows of Harvard College. Créé par Lenard Adler (NYU) et Ronald Kessler (Harvard), avec l'Organisation mondiale de la santé. Version française officielle.",
    higherIsBetter: false,
    questions: [
      "A quelle fréquence vous arrive-t-il d'avoir des difficultés à finaliser les derniers détails d'un projet une fois que les parties les plus stimulantes ont été faites ?",
      "A quelle fréquence vous arrive-t-il d'avoir des difficultés à mettre les choses en ordre lorsque vous devez faire quelque chose qui demande de l'organisation ?",
      "A quelle fréquence vous arrive-t-il d'avoir des difficultés à vous rappeler vos rendez-vous ou vos obligations ?",
      "Quand vous devez faire quelque chose qui demande beaucoup de réflexion, à quelle fréquence vous arrive-t-il d'éviter de le faire ou de le remettre à plus tard ?",
      "A quelle fréquence vous arrive-t-il de remuer ou de tortiller les mains ou les pieds lorsque vous devez rester assis pendant une période prolongée ?",
      "A quelle fréquence vous arrive-t-il de vous sentir excessivement actif et contraint de faire quelque chose, comme si vous étiez entraîné malgré vous par un moteur ?",
    ],
    answerScales: {
      intensity: [
        { value: 0, label: "Jamais" },
        { value: 1, label: "Rarement" },
        { value: 2, label: "Quelquefois" },
        { value: 3, label: "Souvent" },
        { value: 4, label: "Très souvent" },
      ],
    },
    scoring: {
      ranges: [
        {
          min: 0,
          max: 3,
          interpretation: "Dépistage négatif : moins de 4 réponses dans la zone grisée",
        },
        {
          min: 4,
          max: 6,
          interpretation:
            "Symptômes pouvant correspondre à ceux d'un TDAH de l'adulte : évaluation clinique recommandée",
        },
      ],
      maxScore: 6,
      method:
        "Comptez les réponses dans la zone grisée : questions 1 à 3 à partir de « Quelquefois », questions 4 à 6 à partir de « Souvent ». Le score varie de 0 à 6 ; 4 ou plus indique que les symptômes peuvent correspondre à ceux d'un TDAH de l'adulte.",
      thresholdsSource: "Règle de cotation du formulaire ASRS-V1.1 (NYU / Harvard / OMS)",
    },
  },
  {
    id: "qcs-tag",
    acronym: "QCS-TAG",
    label: "Questionnaire sur les comportements sécurisants du trouble d'anxiété généralisée",
    patientIntroSubtitle: null,
    domain: "anxiete",
    formType: "single-scale",
    title: "QCS-TAG - Questionnaire sur les comportements sécurisants du trouble d'anxiété généralisée",
    description:
      "Un questionnaire de 10 items évaluant les comportements sécurisants associés au trouble d'anxiété généralisée au cours du dernier mois",
    category: "Anxiété généralisée",
    estimatedTime: "3-5 minutes",
    longDescription:
      "Le Questionnaire sur les comportements sécurisants du trouble d'anxiété généralisée (QCS-TAG) est la version abrégée en 10 items, validée auprès d'un échantillon clinique par Marcotte-Beaumier, Hébert et Dugas (2020), du questionnaire de Hebert et Dugas (2019). Il évalue les comportements sécurisants (évitement, recherche de réassurance, vérification, procrastination, surpréparation) au cours du dernier mois. Chaque item, accompagné d'un exemple, est coté de 1 (pas du tout typique de moi) à 5 (extrêmement typique de moi) ; le score total varie de 10 à 50. Pas de seuil clinique fourni par les auteurs.",
    instructions:
      "Les énoncés suivants présentent des comportements sécurisants rapportés par des personnes ayant un trouble d'anxiété généralisée. Veuillez indiquer jusqu'à quel point chacun de ces comportements est typique de vous au cours du dernier mois en choisissant la réponse appropriée. Il n'y a pas de bonne ou mauvaise réponse.",
    persistentInstructions:
      "Veuillez indiquer jusqu'à quel point chacun de ces comportements est typique de vous au cours du dernier mois.",
    copyrightAttribution:
      "QCS-TAG — Marcotte-Beaumier, Hébert & Dugas (2020), Revue canadienne des sciences du comportement, 52, 324-330 ; version originale : Hebert & Dugas (2019), Cognitive and Behavioral Practice. Laboratoire des troubles d'anxiété (UQO).",
    higherIsBetter: false,
    questions: [
      "J'évite fréquemment des situations dont l'issue pourrait être négative. Ex : Éviter d'aller manger dans un nouveau restaurant",
      "À répétition, je refais ou change des choses à des tâches que j'ai déjà terminées. Ex : Reprendre un projet que j'ai déjà fini et y apporter des changements.",
      "Je cherche beaucoup d'information afin de me sentir rassuré(e). Ex : Vérifier les rapports de circulation afin de savoir s'il y a eu un accident sur la route qu'emprunte mon conjoint(e).",
      "J'évite de m'engager totalement dans un emploi, un projet ou une relation parce que je ne suis pas certain(e) de comment ça va se passer. Ex : Refuser de m'impliquer dans un projet ambitieux au travail.",
      "Je cherche constamment de la rassurance à cause de mes inquiétudes. Ex : Demander à mon (ma) conjoint(e) de me rassurer à propos de mes inquiétudes face à notre relation.",
      "Je vérifie constamment pour m'assurer que j'ai bien fait une tâche ou un projet correctement. Ex : Vérifier un courriel plusieurs fois pour m'assurer que j'y ai joint le bon document.",
      "Je remets souvent une prise de décision ou un comportement à cause de mes inquiétudes. Ex : Retarder un appel téléphonique à cause de mes inquiétudes.",
      "J'évite constamment des situations dans lesquelles je me sens incertain(e). Ex : Éviter des fêtes où des gens que je ne connais pas sont présents.",
      "Je recherche souvent des gens en particulier, des objets ou des routines dans le but de me sentir plus « certain(e) ». Ex : Me rendre seulement à une fête si un(e) tel(le) ami(e) s'y rend avec moi.",
      "Je prends beaucoup de temps et d'effort pour me préparer à des situations pour lesquelles un résultat négatif peut arriver. Ex : Avant un rendez-vous chez le médecin, passer des heures à faire des recherches sur internet à propos de symptômes.",
    ],
    answerScales: {
      intensity: [
        { value: 1, label: "Pas du tout typique de moi" },
        { value: 2, label: "Un peu typique de moi" },
        { value: 3, label: "Modérément typique de moi" },
        { value: 4, label: "Plutôt typique de moi" },
        { value: 5, label: "Extrêmement typique de moi" },
      ],
    },
    scoring: {
      ranges: [
        {
          min: 10,
          max: 50,
          interpretation: "Pas de seuil clinique fourni par les auteurs.",
        },
      ],
      maxScore: 50,
      method:
        "Additionnez les 10 items (1-5) : le score total varie de 10 à 50. Plus il est élevé, plus le recours aux comportements sécurisants est important. Pas de seuil clinique fourni par les auteurs.",
    },
  },
  {
    id: "cries-13",
    acronym: "CRIES-13",
    label: "Échelle révisée pour mesurer l'impact des événements sur les enfants",
    patientIntroSubtitle: "Children's Revised Impact of Event Scale",
    domain: "trauma",
    formType: "single-scale",
    title: "CRIES-13 - Échelle révisée pour mesurer l'impact des événements sur les enfants",
    description:
      "Un questionnaire de 13 items mesurant l'impact d'un événement traumatique chez l'enfant à partir de 8 ans, au cours des sept derniers jours",
    category: "Traumatismes",
    estimatedTime: "5-10 minutes",
    longDescription:
      "La CRIES-13 (Children's Revised Impact of Event Scale) est un auto-questionnaire de 13 items adapté de l'Impact of Event Scale de Horowitz pour les enfants à partir de 8 ans (Smith, Perrin, Dyregrov & Yule, 2003 ; Children and War Foundation). Il mesure, sur les sept derniers jours, les reviviscences, l'évitement et l'hyperréactivité après un événement stressant. Les réponses valent 0 (pas du tout), 1 (rarement), 3 (quelques fois) et 5 (souvent) ; le score total varie de 0 à 65. Un score total ≥ 30 permet le dépistage d'un trouble de stress post-traumatique. La traduction française n'a pas été entièrement validée.",
    instructions:
      "Ci-dessous se trouvent des commentaires émis par des gens après avoir vécu des événements stressants. Veuillez répondre à chaque question en montrant la fréquence de ces réactions pendant ces sept derniers jours.",
    persistentInstructions:
      "Pendant ces sept derniers jours :",
    copyrightAttribution:
      "CRIES-13 — Smith, Perrin, Dyregrov & Yule (2003) © Children and War Foundation, 1998. Traduction française non validée entièrement. Mise en page : Centre national de ressources et de résilience (Cn2r).",
    higherIsBetter: false,
    questions: [
      "Y penses-tu même quand tu ne le veux pas ?",
      "Essaies-tu de chasser l'événement de ta mémoire ?",
      "As-tu des difficultés à être attentif ou à te concentrer ?",
      "Ressens-tu soudainement des vagues de sentiments intenses à ce sujet ?",
      "T'effraies-tu plus souvent ou te sens-tu plus nerveux qu'avant l'incident ?",
      "Essaies-tu de t'éloigner de ce qui peut te rappeler l'événement ? (p. ex. des endroits ou situations)",
      "Essaies-tu de ne pas en parler ?",
      "T'arrive-t-il d'avoir des images de l'événement à l'esprit ?",
      "Est-ce qu'il y a d'autres choses qui t'y font penser ?",
      "Essaies-tu de ne pas penser à l'événement ?",
      "T'irrites-tu facilement ?",
      "Es-tu alerte et vigilant même s'il n'y a apparemment pas lieu de l'être ?",
      "As-tu des problèmes de sommeil ?",
    ],
    answerScales: {
      intensity: [
        { value: 0, label: "Pas du tout" },
        { value: 1, label: "Rarement" },
        { value: 3, label: "Quelques fois" },
        { value: 5, label: "Souvent" },
      ],
    },
    scoring: {
      ranges: [
        { min: 0, max: 29, interpretation: "Sous le seuil de dépistage du TSPT (score < 30)" },
        { min: 30, max: 65, interpretation: "Dépistage positif de TSPT (score ≥ 30)" },
      ],
      maxScore: 65,
      method:
        "Additionnez les 13 items (0, 1, 3 ou 5 points) : le score total varie de 0 à 65. Un score total ≥ 30 permet le dépistage du TSPT. Trois sous-scores : intrusion (items 1, 4, 8, 9), évitement (2, 6, 7, 10), hyperréactivité (3, 5, 11, 12, 13).",
      thresholdsSource: "Seuil de la fiche descriptive Cn2r",
    },
  },
  {
    id: "ecab",
    acronym: "ECAB",
    label: "Échelle cognitive d'attachement aux benzodiazépines",
    patientIntroSubtitle: "Échelle cognitive d'attachement aux benzodiazépines",
    domain: "addictions",
    formType: "single-scale",
    title: "ECAB - Échelle cognitive d'attachement aux benzodiazépines",
    description:
      "Un questionnaire de 10 items vrai/faux évaluant l'attachement du patient à son traitement par benzodiazépine ou médicament apparenté",
    category: "Addictions",
    estimatedTime: "2 minutes",
    longDescription:
      "L'Échelle cognitive d'attachement aux benzodiazépines (ECAB) est un auto-questionnaire français de 10 items (Pélissolo et Naja, 1996) qui évalue les idées du patient sur les tranquillisants et somnifères qu'il prend. Chaque réponse « vrai » vaut 1 point, sauf l'item 10 où c'est la réponse « faux » qui vaut 1 point ; le score total varie de 0 à 10. Un score ≥ 6 permet de différencier les patients dépendants des patients non dépendants (sensibilité 94 %, spécificité 81 %). Outil proposé par la HAS pour préparer l'arrêt des benzodiazépines.",
    instructions:
      "Les questions ci-dessous concernent certaines idées que vous pouvez avoir sur les médicaments tranquillisants et/ou somnifères que vous prenez.\n\nSi une proposition correspond à ce que vous pensez, choisissez « vrai » ; choisissez « faux » dans le cas contraire.\n\nIl est indispensable de répondre à toutes les propositions avec une seule réponse « vrai » ou « faux », même si vous n'êtes pas très sûr(e) de votre réponse.",
    persistentInstructions:
      "Les questions ci-dessous concernent certaines idées que vous pouvez avoir sur les médicaments tranquillisants et/ou somnifères que vous prenez.",
    copyrightAttribution:
      "ECAB — Pélissolo & Naja (1996), Synapse, 131, 37-40. Fiche « Modalités d'arrêt des benzodiazépines et médicaments apparentés chez le patient âgé », © Haute Autorité de santé – 2007.",
    reverseItems: [10],
    higherIsBetter: false,
    questions: [
      "Où que j'aille, j'ai besoin d'avoir ce médicament avec moi",
      "Ce médicament est pour moi comme une drogue",
      "Je pense souvent que je ne pourrai jamais arrêter ce médicament",
      "J'évite de dire à mes proches que je prends ce médicament",
      "J'ai l'impression de prendre beaucoup trop de ce médicament",
      "J'ai parfois peur à l'idée de manquer de ce médicament",
      "Lorsque j'arrête ce médicament, je me sens très malade",
      "Je prends ce médicament parce que je ne peux plus m'en passer",
      "Je prends ce médicament parce que je vais mal quand j'arrête",
      "Je ne prends ce médicament que lorsque j'en ressens le besoin",
    ],
    answerScales: {
      intensity: [
        { value: 1, label: "Vrai" },
        { value: 0, label: "Faux" },
      ],
    },
    scoring: {
      ranges: [
        { min: 0, max: 5, interpretation: "Sous le seuil de dépendance (score < 6)" },
        { min: 6, max: 10, interpretation: "Score en faveur d'une dépendance aux benzodiazépines (score ≥ 6)" },
      ],
      maxScore: 10,
      method:
        "1 point par réponse « vrai », sauf l'item 10 (1 point pour « faux ») : le score total varie de 0 à 10. Un score ≥ 6 permet de différencier les patients dépendants des patients non dépendants (sensibilité 94 %, spécificité 81 %).",
      thresholdsSource: "Seuil de la fiche HAS (2007)",
    },
  },
  {
    id: "honc",
    acronym: "HONC",
    label: "Test HONC de mise en évidence de la dépendance tabagique",
    domain: "addictions",
    formType: "single-scale",
    title: "HONC - Test de mise en évidence de la dépendance tabagique (Hooked on Nicotine Checklist)",
    description:
      "Un test de 10 questions oui/non repérant la perte d'autonomie vis-à-vis du tabac, notamment chez les jeunes fumeurs",
    category: "Addictions",
    estimatedTime: "2 minutes",
    longDescription:
      "Le test HONC (Hooked on Nicotine Checklist, DiFranza et al., 2002) comporte dix questions oui/non qui mettent en évidence la perte de contrôle vis-à-vis de la consommation de tabac chez les jeunes fumeurs. Chaque réponse positive vaut 1 point (score de 0 à 10). Une réponse positive à un seul item suffit à indiquer une perte d'autonomie liée à la consommation de tabac ; plus le score est élevé, plus il évoque une dépendance. Un score supérieur ou égal à 7 indique un niveau de forte dépendance à la nicotine.",
    copyrightAttribution:
      "HONC (Hooked on Nicotine Checklist) — d'après DiFranza JR, Savageau JA, Fletcher K, et al., Arch Pediatr Adolesc Med 2002;156(4):397-403. Version française : La Revue du Praticien (« Tabac et adolescents »).",
    higherIsBetter: false,
    questions: [
      "Avez-vous déjà essayé d'arrêter de fumer sans y parvenir ?",
      "Fumez-vous actuellement parce que c'est vraiment difficile d'arrêter ?",
      "Pensez-vous être dépendant(e) du tabac ?",
      "Avez-vous déjà eu des envies impérieuses de fumer ?",
      "Avez-vous déjà eu un grand besoin d'une cigarette ?",
      "Est-ce difficile de ne pas fumer aux endroits où c'est interdit, comme à l'école ?",
      "Quand vous essayez d'arrêter ou quand vous n'avez pas fumé depuis un certain temps : Était-il difficile de vous concentrer ?",
      "Avez-vous été plus irritable parce que vous ne pouviez pas fumer ?",
      "Avez-vous senti un besoin urgent, une envie impérieuse de fumer ?",
      "Vous êtes-vous senti(e) nerveux(se), incapable de rester tranquille ou angoissé(e) parce que vous ne pouviez pas fumer ?",
    ],
    answerScales: {
      intensity: [
        { value: 1, label: "Oui" },
        { value: 0, label: "Non" },
      ],
    },
    scoring: {
      ranges: [
        { min: 0, max: 0, interpretation: "Pas de perte d'autonomie mise en évidence (aucune réponse positive)" },
        { min: 1, max: 6, interpretation: "Perte d'autonomie liée à la consommation de tabac" },
        { min: 7, max: 10, interpretation: "Forte dépendance à la nicotine (score ≥ 7)" },
      ],
      maxScore: 10,
      method:
        "1 point par réponse « oui » : le score varie de 0 à 10. Une réponse positive à un seul item suffit à indiquer une perte d'autonomie liée à la consommation de tabac ; un score ≥ 7 indique un niveau de forte dépendance à la nicotine.",
      thresholdsSource: "La Revue du Praticien, d'après DiFranza et al. (2002)",
    },
  },
  {
    id: "scared",
    acronym: "SCARED",
    label: "Dépistage des troubles liés à l'anxiété chez l'enfant",
    domain: "anxiete",
    formType: "single-scale",
    title: "SCARED - Dépistage des troubles liés à l'anxiété chez l'enfant (version de l'enfant)",
    description:
      "Un questionnaire de 41 items rempli par l'enfant pour dépister les troubles anxieux au cours des 3 derniers mois",
    category: "Anxiété — enfants et adolescents",
    estimatedTime: "10 minutes",
    longDescription:
      "Le SCARED (Screen for Child Anxiety Related Disorders, Birmaher et al., 1995-1999) est un questionnaire de 41 items rempli par l'enfant, qui dépiste les troubles anxieux au cours des 3 derniers mois. Chaque item est coté 0 (pas vrai ou presque jamais vrai), 1 (plutôt vrai ou parfois vrai) ou 2 (très vrai ou souvent vrai) ; le score total varie de 0 à 82. Un score total ≥ 25 peut indiquer la présence d'un trouble anxieux ; les scores supérieurs à 30 sont plus spécifiques. Cinq sous-échelles, chacune avec son seuil : trouble panique ou symptômes somatiques (7), anxiété généralisée (9), anxiété de séparation (5), phobie sociale (8), refus scolaire anxieux (3). Pour les enfants de 8 à 11 ans, il est recommandé qu'un adulte soit présent pour expliquer les questions.",
    instructions:
      "Tu trouveras ci-dessous une liste de phrases qui décrivent ce que les gens ressentent. Lis chaque énoncé et décide s'il est « Pas vrai ou presque jamais vrai » ou « Plutôt vrai ou parfois vrai » ou « Très vrai ou souvent vrai » pour toi. Ensuite, pour chaque phrase, choisis la réponse qui semble te décrire au cours des 3 derniers mois.",
    persistentInstructions:
      "Au cours des 3 derniers mois :",
    copyrightAttribution:
      "SCARED — élaboré par Boris Birmaher, Suneeta Khetarpal, Marlane Cully, David Brent et Sandra McKenzie, Western Psychiatric Institute and Clinic, University of Pittsburgh (octobre 1995). Version française (fr-CA) diffusée gratuitement par l'University of Pittsburgh.",
    higherIsBetter: false,
    questions: [
      "Quand j'ai peur, j'ai du mal à respirer.",
      "J'ai des maux de tête lorsque je suis à l'école.",
      "Je n'aime pas être avec des gens que je ne connais pas bien.",
      "J'ai peur quand je dors ailleurs qu'à la maison.",
      "J'ai peur que les autres ne m'aiment pas.",
      "Quand j'ai peur, je me sens comme si j'allais m'évanouir.",
      "Je suis nerveux.",
      "Je suis ma mère ou mon père partout où ils vont.",
      "Les gens me disent que j'ai l'air nerveux.",
      "Je me sens nerveux avec les gens que je ne connais pas bien.",
      "J'ai des maux de ventre quand je suis à l'école.",
      "Quand j'ai peur, j'ai l'impression de devenir fou.",
      "Je m'inquiète à l'idée de dormir seul.",
      "Je m'inquiète de ne pas être aussi bon que les autres enfants.",
      "Quand j'ai peur, j'ai l'impression que les choses ne sont pas réelles.",
      "Je fais des cauchemars à propos de choses négatives qui arrivent à mes parents.",
      "Je m'inquiète à l'idée d'aller à l'école.",
      "Quand j'ai peur, mon cœur bat vite.",
      "Je tremble.",
      "Je fais des cauchemars à propos de quelque chose de négatif qui m'arrive.",
      "Je m'inquiète à propos de ce qui va m'arriver.",
      "Quand j'ai peur, je transpire beaucoup.",
      "Je m'inquiète.",
      "J'ai vraiment peur sans aucune raison.",
      "J'ai peur d'être seul dans la maison.",
      "C'est difficile pour moi de parler avec des gens que je ne connais pas bien.",
      "Quand j'ai peur, je me sens comme si j'étouffais.",
      "Les gens me disent que je m'inquiète trop.",
      "Je n'aime pas être loin de ma famille.",
      "J'ai peur d'avoir des crises d'anxiété (ou de panique).",
      "Je m'inquiète qu'il puisse arriver quelque chose de mal à mes parents.",
      "Je suis gêné avec les gens que je ne connais pas bien.",
      "Je m'inquiète à propos de ce qui va arriver dans le futur.",
      "Quand j'ai peur, je me sens comme si j'allais vomir.",
      "Je m'inquiète de la façon dont je fais les choses.",
      "J'ai peur d'aller à l'école.",
      "Je m'inquiète des choses qui se sont déjà passées.",
      "Quand j'ai peur, je me sens étourdi.",
      "Je me sens nerveux lorsque je suis avec d'autres enfants ou adultes et je dois faire quelque chose pendant qu'ils me surveillent (par exemple : lire à voix haute, parler, jouer à un jeu, jouer à un sport).",
      "Je me sens nerveux quand je vais à des fêtes, à des danses ou à tout autre endroit où il y aura des gens que je ne connais pas bien.",
      "Je suis timide.",
    ],
    answerScales: {
      intensity: [
        { value: 0, label: "Pas vrai ou presque jamais vrai" },
        { value: 1, label: "Plutôt vrai ou parfois vrai" },
        { value: 2, label: "Très vrai ou souvent vrai" },
      ],
    },
    scoring: {
      ranges: [
        { min: 0, max: 24, interpretation: "Sous le seuil de dépistage (score < 25)" },
        { min: 25, max: 30, interpretation: "Peut indiquer la présence d'un trouble anxieux (score ≥ 25)" },
        { min: 31, max: 82, interpretation: "Peut indiquer la présence d'un trouble anxieux (score > 30, plus spécifique)" },
      ],
      maxScore: 82,
      method:
        "Additionnez les 41 items (0-2) : le score total varie de 0 à 82. Un score total ≥ 25 peut indiquer la présence d'un trouble anxieux ; les scores supérieurs à 30 sont plus spécifiques. Sous-échelles (seuil indicatif entre parenthèses) : trouble panique ou symptômes somatiques, items 1, 6, 9, 12, 15, 18, 19, 22, 24, 27, 30, 34, 38 (7) ; anxiété généralisée, 5, 7, 14, 21, 23, 28, 33, 35, 37 (9) ; anxiété de séparation, 4, 8, 13, 16, 20, 25, 29, 31 (5) ; phobie sociale, 3, 10, 26, 32, 39, 40, 41 (8) ; refus scolaire anxieux, 2, 11, 17, 36 (3).",
      thresholdsSource: "Seuils de la version française de l'University of Pittsburgh",
    },
  },
  {
    id: "scared-r",
    acronym: "SCARED-R-51",
    label: "Grille d'évaluation des troubles anxieux chez l'enfant (SCARED-R, 51 items)",
    patientIntroSubtitle: null,
    domain: "anxiete",
    formType: "single-scale",
    title: "SCARED-R-51 - Grille d'évaluation des troubles anxieux chez l'enfant (SCARED-R, 51 items)",
    description:
      "Un questionnaire de 51 items rempli par l'enfant, évaluant dix types de peurs et de troubles anxieux au cours des 3 derniers mois",
    category: "Anxiété — enfants et adolescents",
    estimatedTime: "10-15 minutes",
    longDescription:
      "Le SCARED-R-51 est une version française en 51 items (© Martin et Gosselin, 2011) du Screen for Child Anxiety Related Emotional Disorders – Revised (Muris et al.). L'enfant indique à quel point il a vécu chaque peur durant les 3 derniers mois : 0 (jamais ou presque jamais), 1 (quelques fois) ou 2 (souvent). Le score total varie de 0 à 102 ; dix sous-échelles décrivent les symptômes de trouble panique, d'anxiété généralisée, d'anxiété de séparation, de phobie sociale, de TOC, de stress post-traumatique, de phobie scolaire, de phobie des animaux, de phobie de type situationnel et de phobie des soins médicaux. Pas de seuil clinique fourni par les auteurs.",
    instructions:
      "Voici des peurs que les personnes de ton âge peuvent avoir. Regarde chacune des phrases attentivement et indique à quel point tu as vécu ces peurs durant les 3 derniers mois. Il n'y a pas de bonne ou mauvaise réponse. Choisis la réponse qui te ressemble le plus.",
    persistentInstructions:
      "Durant les 3 derniers mois :",
    copyrightAttribution:
      "SCARED-R-51 — © Martin, A. et Gosselin, P. (2011), d'après le SCARED-R de Muris et al. Version diffusée par l'University of Pittsburgh.",
    higherIsBetter: false,
    questions: [
      "Quand j'ai peur, j'ai de la difficulté à respirer.",
      "J'ai peur des hauteurs.",
      "J'ai des maux de tête ou de ventre quand je suis à l'école.",
      "Je n'aime pas être avec des gens que je ne connais pas.",
      "Quand je vois du sang, je me sens étourdi.",
      "Je tiens à ce que les choses soient rangées ou en ordre.",
      "J'ai peur quand je dors ailleurs qu'à la maison.",
      "J'ai peur que les autres ne m'aiment pas.",
      "Quand j'ai peur, je me sens comme si j'allais m'évanouir.",
      "Je suis mes parents peu importe où ils vont.",
      "Je me sens nerveux avec les gens que je ne connais pas bien.",
      "J'ai peur d'aller chez le médecin.",
      "Je n'aime pas aller à l'école.",
      "Quand j'ai peur, je me sens comme si j'allais devenir fou.",
      "Je m'inquiète à l'idée de dormir seul.",
      "J'ai peur d'aller chez le dentiste.",
      "Je m'inquiète de ne pas être aussi bon que les autres.",
      "J'ai peur d'un animal qui n'est pas réellement dangereux.",
      "J'ai peur quand il y a du tonnerre dans l'air.",
      "Je fais les choses plus d'une fois en ligne pour vérifier si je les ai bien faites.",
      "Je fais des rêves effrayants à propos d'un événement très négatif que j'ai vécu.",
      "Je veux que les choses soient propres et en ordre.",
      "J'aurais peur si j'avais à prendre l'avion.",
      "Je fais des cauchemars à propos de choses négatives qui arrivent à mes parents.",
      "Je m'inquiète à l'idée d'aller à l'école.",
      "J'ai peur quand je reçois une piqûre.",
      "Je me sens faible et tremblotant.",
      "J'ai tellement peur d'un animal qui n'est pas dangereux que je n'ose pas lui toucher.",
      "Je m'inquiète à propos de ce qui va m'arriver.",
      "Je suis une personne inquiète.",
      "J'essaie de ne pas penser à un événement négatif que j'ai déjà vécu.",
      "J'ai peur d'être seul à la maison.",
      "J'ai peur quand je repense à un événement très négatif que j'ai vécu.",
      "Il est difficile pour moi de parler à des personnes que je connais peu.",
      "Quand j'ai peur, je me sens comme si j'étouffais.",
      "Les gens me disent que je m'inquiète trop.",
      "Je n'aime pas être loin de ma famille.",
      "Je m'inquiète qu'il puisse arriver quelque chose de mal à mes parents.",
      "Je suis gêné avec les gens que je ne connais pas bien.",
      "Sans le vouloir, j'ai des pensées dans lesquelles je blesse d'autres personnes.",
      "Je m'inquiète à propos de ce qui va arriver dans le futur.",
      "Quand j'ai peur, je me sens comme si j'allais vomir.",
      "Je m'inquiète à propos de mes résultats.",
      "J'ai peur d'aller à l'école.",
      "Quand j'ai peur, je me sens étourdi.",
      "J'ai peur dans les endroits petits et fermés.",
      "J'ai des pensées que je ne voudrais pas avoir.",
      "J'ai peur du noir.",
      "J'ai des pensées qui arrivent sans raison dans ma tête à propos d'un événement négatif que j'ai vécu.",
      "J'ai peur d'un animal dont la plupart des enfants n'ont pas peur.",
      "Je n'aime pas être dans un hôpital.",
    ],
    answerScales: {
      intensity: [
        { value: 0, label: "Jamais ou presque jamais" },
        { value: 1, label: "Quelques fois" },
        { value: 2, label: "Souvent" },
      ],
    },
    scoring: {
      ranges: [
        { min: 0, max: 102, interpretation: "Pas de seuil clinique fourni par les auteurs." },
      ],
      maxScore: 102,
      method:
        "Additionnez les 51 items (0-2) : le score total varie de 0 à 102. Dix sous-scores (symptômes de trouble panique, d'anxiété généralisée, d'anxiété de séparation, de phobie sociale, de TOC, de TSPT, de phobie scolaire, de phobie des animaux, de phobie situationnelle, de phobie des soins médicaux). Pas de seuil clinique fourni par les auteurs.",
    },
  },
  {
    id: "pcl-s",
    acronym: "PCL-S",
    label: "Échelle de l'état de stress post-traumatique, version spécifique",
    patientIntroSubtitle: "Posttraumatic Stress Disorder Checklist for DSM-IV",
    domain: "trauma",
    formType: "single-scale",
    title: "PCL-S - Échelle de l'état de stress post-traumatique (version spécifique, DSM-IV)",
    description:
      "Un questionnaire de 17 items évaluant les symptômes de stress post-traumatique liés à un événement précis, dans le mois précédent (critères DSM-IV)",
    category: "Traumatismes",
    estimatedTime: "5 minutes",
    longDescription:
      "La PCL-S (Posttraumatic Stress Disorder Checklist, version spécifique ; Weathers et al., 1993-1994) est un auto-questionnaire de 17 items construit sur les critères DSM-IV de l'état de stress post-traumatique, en lien avec un épisode stressant précis. Version française validée par Yao, Cottraux et al. (2003). Chaque item est coté de 1 (pas du tout) à 5 (très souvent) ; le score total varie de 17 à 85. Un seuil de 44 est recommandé pour dépister un TSPT en population générale (il varie de 30 à 50 dans la littérature ; 50 chez les militaires). Une seconde méthode de dépistage repose sur les critères : au moins 1 item du critère B (items 1 à 5), 3 items du critère C (6 à 12) et 2 items du critère D (13 à 17) cotés 3 ou plus. Le DSM-5 l'a remplacée par la PCL-5.",
    instructions:
      "Veuillez trouver ci-dessous une liste de problèmes et de symptômes fréquents à la suite d'un épisode de vie stressant. Veuillez lire chaque problème avec soin puis veuillez choisir la réponse qui indique à quel point vous avez été perturbé par ce problème dans le mois précédent.",
    persistentInstructions:
      "Dans le mois précédent :",
    copyrightAttribution:
      "PCL-S — Weathers, Litz, Herman, Huska & Keane (1994), National Center for PTSD (domaine public). Version française : Yao, Cottraux, Note, De Mey-Guillard, Mollard & Ventureyra (2003), L'Encéphale, 29(3), 232-238. Diffusion : INSPQ.",
    higherIsBetter: false,
    questions: [
      "Être perturbé(e) par des souvenirs, des pensées ou des images en relation avec cet épisode stressant.",
      "Être perturbé(e) par des rêves répétés en relation avec cet événement.",
      "Brusquement agir ou sentir comme si l'épisode stressant se reproduisait (comme si vous étiez en train de le revivre).",
      "Se sentir très bouleversé(e) lorsque quelque chose vous rappelle l'épisode stressant.",
      "Avoir des réactions physiques, par exemple battements de cœur, difficultés à respirer, sueurs lorsque quelque chose vous a rappelé l'épisode stressant.",
      "Éviter de penser ou de parler de votre épisode stressant ou éviter des sentiments qui sont en relation avec lui.",
      "Éviter des activités ou des situations parce qu'elles vous rappellent votre épisode stressant.",
      "Avoir des difficultés à se souvenir de parties importantes de l'expérience stressante.",
      "Perte d'intérêt dans des activités qui habituellement vous faisaient plaisir.",
      "Se sentir distant ou coupé(e) des autres personnes.",
      "Se sentir émotionnellement anesthésié(e) ou être incapable d'avoir des sentiments d'amour pour ceux qui sont proches de vous.",
      "Se sentir comme si votre avenir était en quelque sorte raccourci.",
      "Avoir des difficultés pour vous endormir ou rester endormi(e).",
      "Se sentir irritable ou avoir des bouffées de colère.",
      "Avoir des difficultés à vous concentrer.",
      "Être en état de super-alarme, sur la défensive, ou sur vos gardes.",
      "Se sentir énervé(e) ou sursauter facilement.",
    ],
    answerScales: {
      intensity: [
        { value: 1, label: "Pas du tout" },
        { value: 2, label: "Un peu" },
        { value: 3, label: "Parfois" },
        { value: 4, label: "Souvent" },
        { value: 5, label: "Très souvent" },
      ],
    },
    scoring: {
      ranges: [
        { min: 17, max: 43, interpretation: "Sous le seuil de dépistage du TSPT (score < 44)" },
        { min: 44, max: 85, interpretation: "Dépistage positif de TSPT (score ≥ 44)" },
      ],
      maxScore: 85,
      method:
        "Additionnez les 17 items (1-5) : le score total varie de 17 à 85. Seuil de 44 recommandé pour le dépistage du TSPT en population générale (30 à 50 selon les études ; 50 chez les militaires). Méthode par critères : diagnostic provisoire si au moins 1 item du critère B (1 à 5), 3 items du critère C (6 à 12) et 2 items du critère D (13 à 17) sont cotés 3 ou plus.",
      thresholdsSource: "Seuil de la fiche INSPQ (population générale)",
    },
  },
  {
    id: "cat-q",
    acronym: "CAT-Q",
    label: "Questionnaire sur les traits autistiques de camouflage",
    patientIntroSubtitle: null,
    domain: "neurodeveloppement",
    formType: "single-scale",
    title: "CAT-Q - Questionnaire sur les traits autistiques de camouflage",
    description:
      "Un questionnaire de 25 items mesurant le recours aux stratégies de camouflage social des traits autistiques chez l'adulte",
    category: "Autisme (TSA) de l'adulte",
    estimatedTime: "5-10 minutes",
    longDescription:
      "Le CAT-Q (Camouflaging Autistic Traits Questionnaire, Hull et al., 2018) est un auto-questionnaire de 25 items qui mesure le degré d'utilisation des stratégies de camouflage social chez l'adulte (16 ans et plus) : compensation (9 items), masquage (8 items) et assimilation (8 items). Chaque énoncé est coté de 1 (totalement en désaccord) à 7 (tout à fait d'accord), avec 5 items inversés ; le score total varie de 25 à 175. Un score élevé reflète davantage de camouflage. Pas de seuil : les auteurs précisent qu'il n'existe pas de score seuil et qu'il ne faut pas en appliquer (Hannon, Hull, Lai, Magiati & Mandy, 2026) ; le CAT-Q n'est pas un outil de dépistage de l'autisme. Traduction française de Marika B. Bessette (non validée ; une validation française de Bureau et al. existe, 2024).",
    instructions:
      "Lisez les énoncés suivants et choisissez les réponses qui correspondent le plus fidèlement possible à vos expériences personnelles lors d'interactions sociales.",
    persistentInstructions:
      "Lisez les énoncés suivants et choisissez les réponses qui correspondent le plus fidèlement possible à vos expériences personnelles lors d'interactions sociales.",
    copyrightAttribution:
      "CAT-Q — Hull, Mandy, Lai, Baron-Cohen, Allison, Smith & Petrides (2018), article original sous licence CC BY 4.0. Traduction française : Marika B. Bessette (Embrace Autism).",
    reverseItems: [3, 12, 19, 22, 24],
    higherIsBetter: false,
    questions: [
      "Lorsque j'interagis avec quelqu'un, je copie délibérément son langage corporel ou ses expressions faciales.",
      "Je surveille mon langage corporel ou mes expressions faciales afin de paraître détendu.",
      "Je ressens rarement le besoin de jouer la comédie pour m'en sortir dans une situation sociale.",
      "J'ai développé un script à suivre dans les situations sociales.",
      "Je répète des phrases que j'ai entendues dire par d'autres personnes, exactement de la même manière que je les ai entendues.",
      "J'adapte mon langage corporel ou mes expressions faciales de manière à paraître intéressé par la personne avec laquelle j'interagis.",
      "Dans les situations sociales, j'ai l'impression de « performer » plutôt que d'être moi-même.",
      "Dans mes propres interactions sociales, j'utilise des comportements que j'ai appris en regardant d'autres personnes interagir.",
      "Je pense toujours à l'impression que je donne aux autres.",
      "J'ai besoin du soutien d'autres personnes pour m'aider à socialiser.",
      "Je pratique mes expressions faciales et mon langage corporel pour m'assurer qu'ils ont l'air naturels.",
      "Je ne ressens pas le besoin d'établir un contact visuel avec d'autres personnes si je n'en ai pas envie.",
      "Je dois me forcer à interagir avec les gens lorsque je suis dans des situations sociales.",
      "J'ai essayé d'améliorer ma compréhension des compétences sociales en observant d'autres personnes.",
      "Je surveille mon langage corporel ou mes expressions faciales afin de paraître intéressé par la personne avec laquelle j'interagis.",
      "Dans les situations sociales, j'essaie de trouver des moyens d'éviter d'interagir avec les autres.",
      "J'ai fait des recherches sur « les règles des interactions sociales » pour améliorer mes propres compétences sociales.",
      "Je suis toujours conscient de l'impression que je donne aux autres.",
      "Je me sens libre d'être moi-même lorsque je suis avec d'autres personnes.",
      "J'apprends comment les gens utilisent leur corps et leur visage pour interagir en regardant la télévision ou des films, ou en lisant des ouvrages de fiction.",
      "J'adapte mon langage corporel ou mes expressions faciales de manière à paraître détendu.",
      "Lorsque je parle à d'autres personnes, j'ai l'impression que la conversation se déroule naturellement.",
      "J'ai passé du temps à apprendre les compétences sociales à partir d'émissions de télévision et de films, et j'essaie de les utiliser dans mes interactions.",
      "Dans les interactions sociales, je ne fais pas attention à ce que font mon visage ou mon corps.",
      "Dans les situations sociales, j'ai l'impression de faire semblant d'être « normal ».",
    ],
    answerScales: {
      intensity: [
        { value: 1, label: "Totalement en désaccord" },
        { value: 2, label: "Pas d'accord" },
        { value: 3, label: "Un peu en désaccord" },
        { value: 4, label: "Ni d'accord ni en désaccord" },
        { value: 5, label: "Plutôt d'accord" },
        { value: 6, label: "D'accord" },
        { value: 7, label: "Tout à fait d'accord" },
      ],
    },
    scoring: {
      ranges: [
        { min: 25, max: 175, interpretation: "Pas de seuil clinique fourni par les auteurs." },
      ],
      maxScore: 175,
      method:
        "Inversez les items 3, 12, 19, 22 et 24 (1↔7, 2↔6, 3↔5), puis additionnez les 25 items : le score total varie de 25 à 175. Sous-scores : compensation (items 1, 4, 5, 8, 11, 14, 17, 20, 23), masquage (2, 6, 9, 12, 15, 18, 21, 24), assimilation (3, 7, 10, 13, 16, 19, 22, 25). Pas de seuil clinique : les auteurs déconseillent tout score seuil (Hannon et al., 2026).",
    },
  },
  {
    id: "bat-w",
    acronym: "BAT",
    label: "Burnout Assessment Tool — version travail",
    patientIntroSubtitle: null,
    domain: "burnout",
    formType: "single-scale",
    title: "BAT - Burnout Assessment Tool (version travail)",
    description:
      "Un questionnaire de 33 items évaluant les symptômes de burn-out (au travail) : épuisement, distance mentale, déficiences cognitive et émotionnelle, plaintes secondaires",
    category: "Burn-out",
    estimatedTime: "5 minutes",
    longDescription:
      "Le Burnout Assessment Tool (BAT ; Schaufeli, De Witte et Desart, KU Leuven, 2019-2020) évalue les plaintes de burn-out. Version travail : 23 items de symptômes primaires (épuisement, distance mentale, déficience cognitive, déficience émotionnelle) et 10 items de symptômes secondaires (plaintes psychiques et psychosomatiques), cotés de 1 (jamais) à 5 (toujours). Le score de référence est la moyenne des 23 items primaires (1 à 5), comparée aux seuils cliniques flamands : vert (pas de risque), orange (risque de burn-out), rouge (risque très élevé). Melya affiche la somme équivalente (23 à 115). Le BAT n'est pas un outil diagnostique. Seuils des sous-échelles (moyennes) : épuisement 3,06 / 3,31 ; distance mentale 2,50 / 3,10 ; déficience émotionnelle 2,10 / 2,90 ; déficience cognitive 2,70 / 3,10 ; symptômes secondaires 2,85 / 3,35 (début des zones orange / rouge).",
    instructions:
      "Les énoncés suivants sont liés à votre situation de travail et à la manière dont vous la vivez. Veuillez indiquer la fréquence à laquelle chaque déclaration s'applique à vous.",
    persistentInstructions:
      "Veuillez indiquer la fréquence à laquelle chaque déclaration s'applique à vous.",
    copyrightAttribution:
      "BAT — Schaufeli, W.B., De Witte, H. & Desart, S. (2020). Burnout Assessment Tool (BAT) – Development, validity and reliability. International Journal of Environmental Research and Public Health, 17, 9495. Version française (France), avec l'aide de Dr Ilona Boniwell (Positran). Outil non propriétaire (KU Leuven).",
    higherIsBetter: false,
    questions: [
      "Au travail, je me sens épuisé/e mentalement",
      "Tout ce que je fais au travail me demande beaucoup d'efforts",
      "Après une journée au travail, il m'est difficile de retrouver mon énergie",
      "Au travail, je me sens épuisé physiquement",
      "Quand je me lève le matin, je manque d'énergie pour commencer une nouvelle journée de travail",
      "Je veux être actif/ve au travail, mais il m'est impossible d'y arriver",
      "Quand je fais beaucoup d'efforts au travail, je me fatigue plus que d'habitude",
      "A la fin de ma journée de travail, je me sens épuisé et vidé mentalement",
      "J'ai du mal à être enthousiaste à propos de mon travail",
      "Au travail, je ne réfléchis pas à ce que je fais et je fonctionne en pilote automatique",
      "Je ressens une profonde aversion pour mon travail",
      "Je ressens de l'indifférence à propos de mon travail",
      "Je ne pense pas que les autres accordent de l'importance à mon travail",
      "Au travail, j'ai du mal à rester attentif/ve",
      "Au travail, il m'est difficile de penser de manière claire",
      "J'oublie des choses et je suis distrait/e au travail",
      "Quand je travaille, j'ai du mal à me concentrer",
      "Je fais des erreurs dans mon travail car mon esprit est ailleurs",
      "Au travail, je me sens incapable de contrôler mes émotions",
      "Je ne me reconnais pas dans mes réactions émotionnelles au travail",
      "Quand je suis au travail, je deviens irritable quand les choses ne se passent pas comme je voudrais",
      "Il m'arrive d'être en colère ou triste au travail sans vraiment savoir pourquoi",
      "Au travail, il m'arrive de réagir avec excès sans en avoir l'intention",
      "J'ai du mal à m'endormir ou je me réveille en pleine nuit",
      "J'ai tendance à m'inquiéter",
      "Je me sens tendu et stressé",
      "Je me sens anxieux et/ou je souffre d'attaques de panique",
      "Le bruit et la foule me dérangent",
      "Je souffre de palpitations et de douleurs de poitrine",
      "Je souffre de douleurs d'estomac et/ou intestinales",
      "Je souffre de migraines",
      "Je souffre de douleurs musculaires, par exemple dans le cou, l'épaule ou le dos",
      "Je tombe souvent malade",
    ],
    answerScales: {
      intensity: [
        { value: 1, label: "Jamais" },
        { value: 2, label: "Rarement" },
        { value: 3, label: "Parfois" },
        { value: 4, label: "Souvent" },
        { value: 5, label: "Toujours" },
      ],
    },
    scoring: {
      ranges: [
        { min: 23, max: 59, interpretation: "Zone verte : pas de risque de burn-out (moyenne ≤ 2,58)" },
        { min: 60, max: 69, interpretation: "Zone orange : risque de burn-out (moyenne 2,59 à 3,01)" },
        { min: 70, max: 115, interpretation: "Zone rouge : risque très élevé de burn-out (moyenne ≥ 3,02)" },
      ],
      maxScore: 115,
      method:
        "Le score total additionne les 23 items de symptômes primaires (1-5), soit 23 à 115. Il équivaut à la moyenne du manuel (somme ÷ 23, arrondie à 2 décimales) : moyenne ≤ 2,58 = zone verte, 2,59 à 3,01 = zone orange, ≥ 3,02 = zone rouge. Les 10 items de symptômes secondaires (plaintes psychiques et psychosomatiques) forment un sous-score à part, hors total. Seuils des sous-échelles (moyennes) : épuisement 3,06 / 3,31 ; distance mentale 2,50 / 3,10 ; déficience émotionnelle 2,10 / 2,90 ; déficience cognitive 2,70 / 3,10 ; symptômes secondaires 2,85 / 3,35 (début des zones orange / rouge).",
      thresholdsSource: "Seuils cliniques flamands du manuel BAT 2.0 (moyennes converties en sommes)",
    },
  },
  {
    id: "bat-g",
    acronym: "BAT",
    label: "Burnout Assessment Tool — version générale",
    patientIntroSubtitle: null,
    domain: "burnout",
    formType: "single-scale",
    title: "BAT - Burnout Assessment Tool (version générale)",
    description:
      "Un questionnaire de 32 items évaluant les symptômes de burn-out (hors travail) : épuisement, distance mentale, déficiences cognitive et émotionnelle, plaintes secondaires",
    category: "Burn-out",
    estimatedTime: "5 minutes",
    longDescription:
      "Le Burnout Assessment Tool (BAT ; Schaufeli, De Witte et Desart, KU Leuven, 2019-2020) évalue les plaintes de burn-out. Version générale : 22 items de symptômes primaires (épuisement, distance mentale, déficience cognitive, déficience émotionnelle) et 10 items de symptômes secondaires (plaintes psychiques et psychosomatiques), cotés de 1 (jamais) à 5 (toujours). Le score de référence est la moyenne des 22 items primaires (1 à 5), comparée aux seuils cliniques flamands : vert (pas de risque), orange (risque de burn-out), rouge (risque très élevé). Melya affiche la somme équivalente (22 à 110). Le BAT n'est pas un outil diagnostique. Version destinée aux personnes qui ne travaillent pas actuellement ; seuils pour les personnes flamandes ne travaillant pas. Seuils des sous-échelles (moyennes) : épuisement 3,31 / 3,81 ; distance mentale 2,50 / 3,10 ; déficience émotionnelle 2,10 / 3,50 ; déficience cognitive 2,70 / 3,50 (début des zones orange / rouge).",
    instructions:
      "Les énoncés suivants sont liés à ce que vous ressentez et à la manière dont vous la vivez. Veuillez indiquer la fréquence à laquelle chaque déclaration s'applique à vous.",
    persistentInstructions:
      "Veuillez indiquer la fréquence à laquelle chaque déclaration s'applique à vous.",
    copyrightAttribution:
      "BAT — Schaufeli, W.B., De Witte, H. & Desart, S. (2020). Burnout Assessment Tool (BAT) – Development, validity and reliability. International Journal of Environmental Research and Public Health, 17, 9495. Version française (France), avec l'aide de Dr Ilona Boniwell (Positran). Outil non propriétaire (KU Leuven).",
    higherIsBetter: false,
    questions: [
      "Je me sens épuisé/e mentalement",
      "Tout ce que je fais me demande beaucoup d'efforts",
      "Après une journée, il m'est difficile de retrouver mon énergie",
      "Je me sens épuisé physiquement",
      "Quand je me lève le matin, je manque d'énergie pour commencer une nouvelle journée",
      "Je veux être actif/ve, mais il m'est impossible d'y arriver",
      "Quand je fais beaucoup d'efforts, je me fatigue plus que d'habitude",
      "A la fin de ma journée, je me sens épuisé et vidé mentalement",
      "J'ai du mal à être enthousiaste à propos de mon travail",
      "Je ressens une profonde aversion pour mon travail",
      "Je ressens de l'indifférence à propos de mon travail",
      "Je ne pense pas que les autres accordent de l'importance à mon travail",
      "J'ai du mal à rester attentif/ve",
      "Il m'est difficile de penser de manière claire",
      "J'oublie des choses et je suis distrait/e",
      "J'ai du mal à me concentrer",
      "Je fais des erreurs car mon esprit est ailleurs",
      "Je me sens incapable de contrôler mes émotions",
      "Je ne me reconnais pas dans mes réactions émotionnelles",
      "Je deviens irritable quand les choses ne se passent pas comme je voudrais",
      "Il m'arrive d'être en colère ou triste sans vraiment savoir pourquoi",
      "Il m'arrive de réagir avec excès sans en avoir l'intention",
      "J'ai du mal à m'endormir ou je me réveille en pleine nuit",
      "J'ai tendance à m'inquiéter",
      "Je me sens tendu et stressé",
      "Je me sens anxieux et/ou je souffre d'attaques de panique",
      "Le bruit et la foule me dérangent",
      "Je souffre de palpitations et de douleurs de poitrine",
      "Je souffre de douleurs d'estomac et/ou intestinales",
      "Je souffre de migraines",
      "Je souffre de douleurs musculaires, par exemple dans le cou, l'épaule ou le dos",
      "Je tombe souvent malade",
    ],
    answerScales: {
      intensity: [
        { value: 1, label: "Jamais" },
        { value: 2, label: "Rarement" },
        { value: 3, label: "Parfois" },
        { value: 4, label: "Souvent" },
        { value: 5, label: "Toujours" },
      ],
    },
    scoring: {
      ranges: [
        { min: 22, max: 56, interpretation: "Zone verte : pas de risque de burn-out (moyenne ≤ 2,58)" },
        { min: 57, max: 66, interpretation: "Zone orange : risque de burn-out (moyenne 2,59 à 3,01)" },
        { min: 67, max: 110, interpretation: "Zone rouge : risque très élevé de burn-out (moyenne ≥ 3,02)" },
      ],
      maxScore: 110,
      method:
        "Le score total additionne les 22 items de symptômes primaires (1-5), soit 22 à 110. Il équivaut à la moyenne du manuel (somme ÷ 22, arrondie à 2 décimales) : moyenne ≤ 2,58 = zone verte, 2,59 à 3,01 = zone orange, ≥ 3,02 = zone rouge. Les 10 items de symptômes secondaires (plaintes psychiques et psychosomatiques) forment un sous-score à part, hors total. Version destinée aux personnes qui ne travaillent pas actuellement ; seuils pour les personnes flamandes ne travaillant pas. Seuils des sous-échelles (moyennes) : épuisement 3,31 / 3,81 ; distance mentale 2,50 / 3,10 ; déficience émotionnelle 2,10 / 3,50 ; déficience cognitive 2,70 / 3,50 (début des zones orange / rouge).",
      thresholdsSource: "Seuils cliniques flamands du manuel BAT 2.0 (moyennes converties en sommes)",
    },
  },
  {
    id: "cst",
    acronym: "CST",
    label: "Échelle brève d'évaluation du stress (Cungi)",
    patientIntroSubtitle: null,
    domain: "anxiete",
    formType: "single-scale",
    title: "CST - Échelle brève d'évaluation du stress (Cungi)",
    description:
      "Une échelle brève de 11 questions issue des travaux de Charly Cungi pour évaluer son niveau de stress",
    category: "Stress",
    estimatedTime: "3 minutes",
    longDescription:
      "L'échelle brève d'évaluation du stress, issue des travaux du psychiatre Charly Cungi, comporte 11 questions sur les manifestations émotionnelles, comportementales et physiques du stress. Chaque question est cotée de 1 (pas du tout) à 6 (extrêmement) ; le score total varie de 11 à 66 : niveau de stress très bas, bas, élevé ou très élevé. Texte repris d'une source secondaire, à confronter à l'ouvrage de référence (Cungi, Savoir gérer son stress).",
    instructions:
      "Pour chacune des questions, choisissez la réponse appropriée selon l'échelle suivante : 1 - Non pas du tout, 2 - Faiblement, 3 - Un peu, 4 - Assez, 5 - Beaucoup, 6 - Extrêmement.",
    copyrightAttribution:
      "Échelle brève d'évaluation du stress — issue des travaux de Charly Cungi (Savoir gérer son stress, Retz). Version reprise de Lefebvre Dalloz Compétences.",
    higherIsBetter: false,
    questions: [
      "Suis-je émotif, sensible aux remarques, aux critiques d'autrui ?",
      "Suis-je colérique ou rapidement irritable ?",
      "Suis-je perfectionniste, ai-je tendance à ne pas être satisfait de ce que j'ai fait ou de ce que les autres ont fait ?",
      "Ai-je le cœur qui bat vite, de la transpiration, des tremblements, des secousses musculaires, par exemple au niveau du visage, des paupières ?",
      "Est-ce que je me sens tendu au niveau des muscles, ai-je une sensation de crispation au niveau des mâchoires, du visage, du corps en général ?",
      "Ai-je des problèmes de sommeil ?",
      "Suis-je anxieux, est-ce que je me fais souvent du souci ?",
      "Ai-je des manifestations corporelles comme un trouble digestif, des douleurs, des maux de tête, des allergies, de l'eczéma ?",
      "Est-ce que je suis fatigué ?",
      "Ai-je des problèmes de santé plus importants comme un ulcère d'estomac, une maladie de peau, un problème de cholestérol, de l'hypertension artérielle, un trouble cardio-vasculaire ?",
      "Est-ce que je fume ou bois de l'alcool pour me stimuler ou me calmer ? Est-ce que j'utilise d'autres produits ou des médicaments dans ce but ?",
    ],
    answerScales: {
      intensity: [
        { value: 1, label: "Non pas du tout" },
        { value: 2, label: "Faiblement" },
        { value: 3, label: "Un peu" },
        { value: 4, label: "Assez" },
        { value: 5, label: "Beaucoup" },
        { value: 6, label: "Extrêmement" },
      ],
    },
    scoring: {
      ranges: [
        { min: 11, max: 19, interpretation: "Niveau de stress très bas" },
        { min: 20, max: 30, interpretation: "Niveau de stress bas" },
        { min: 31, max: 45, interpretation: "Niveau de stress élevé" },
        { min: 46, max: 66, interpretation: "Niveau de stress très élevé" },
      ],
      maxScore: 66,
      method:
        "Additionnez les 11 réponses (1-6) : le score total varie de 11 à 66. Entre 11 et 19 : stress très bas ; entre 19 et 30 : bas ; entre 30 et 45 : élevé ; au-dessus de 45 : très élevé (bornes de la source, qui se chevauchent ; Melya retient 11-19, 20-30, 31-45, 46-66, borne haute incluse comme l'impose « au-dessus de 45 »).",
      thresholdsSource: "Bornes de la source (Lefebvre Dalloz, d'après Cungi), chevauchements tranchés par Melya",
    },
  },
  {
    id: "ders",
    acronym: "DERS",
    label: "Échelle des difficultés de régulation émotionnelle",
    patientIntroSubtitle: "Echelle de régulation émotionnelle",
    domain: "humeur",
    formType: "single-scale",
    title: "DERS - Échelle des difficultés de régulation émotionnelle",
    description:
      "Une échelle de 36 items évaluant les difficultés de régulation émotionnelle selon six dimensions",
    category: "Régulation émotionnelle",
    estimatedTime: "10 minutes",
    longDescription:
      "La DERS (Difficulties in Emotion Regulation Scale, Gratz & Roemer, 2004) est un auto-questionnaire de 36 items qui évalue les difficultés de régulation émotionnelle. Elle fournit un score total et six sous-scores : non-acceptation des réponses émotionnelles, difficultés à adopter des comportements dirigés vers un but, difficultés de contrôle des impulsions, manque de conscience émotionnelle, accès limité aux stratégies de régulation et manque de clarté émotionnelle. Version française validée : DERS-F (Dan-Glauser & Scherer, 2013, Université de Genève).",
    instructions:
      "Le DERS est une échelle permettant d'évaluer à quel point vous êtes attentifs à vos émotions dans la vie de tous les jours, à quel point vous utilisez les informations que vos émotions vous donnent et comment vous réagissez de manière générale.\n\nRépondez à toutes les questions en choisissant à chaque fois une seule réponse par énoncé selon si celui-ci vous correspond.",
    copyrightAttribution:
      "DERS — Gratz & Roemer (2004). Version française validée (DERS-F) : Dan-Glauser & Scherer (2013), Swiss Journal of Psychology, 72(1), 5-11 ; Université de Genève.",
    reverseItems: [1, 2, 6, 7, 8, 10, 17, 20, 22, 24, 34],
    higherIsBetter: false,
    questions: [
      "Je comprends bien mes sentiments",
      "Je fais attention à ce que je ressens",
      "Les expériences émotionnelles me submergent et sont incontrôlables",
      "Je n'ai aucune idée concernant comment je me sens",
      "J'ai des difficultés à donner un sens à mes sentiments",
      "Je fais attention à mes sentiments",
      "Je sais exactement comment je me sens",
      "Je prends garde à ce que je ressens",
      "Je suis déconcerté(e) par ce que je ressens",
      "Quand je suis contrarié(e), je prends en compte cette émotion",
      "Quand je suis contrarié(e), le fait de ressentir une telle émotion me met en colère contre moi-même",
      "Quand je suis contrarié(e), je suis embarrassé(e) de ressentir une telle émotion",
      "Quand je suis contrarié(e), j'ai de la difficulté à terminer un travail",
      "Quand je suis contrarié(e), je deviens incontrôlable",
      "Quand je suis contrarié(e), je crois que je vais rester comme ça très longtemps",
      "Quand je suis contrarié(e), je crois que je vais bientôt me sentir très déprimé(e)",
      "Quand je suis contrarié(e), je crois que mes sentiments sont valables et importants",
      "Quand je suis contrarié(e), j'ai des difficultés à me concentrer sur d'autres choses",
      "Quand je suis contrarié(e), je me sens incontrôlable",
      "Quand je suis contrarié(e), je peux continuer à faire des choses",
      "Quand je suis contrarié(e), j'ai honte de ressentir une telle émotion",
      "Quand je suis contrarié(e), je sais que je peux trouver un moyen pour enfin aller mieux",
      "Quand je suis contrarié(e), je me sens désarmé(e)",
      "Quand je suis contrarié(e), je sens que je peux garder le contrôle de mes comportements",
      "Quand je suis contrarié(e), je me sens coupable de ressentir une telle émotion",
      "Quand je suis contrarié(e), j'ai des difficultés à me concentrer",
      "Quand je suis contrarié(e), j'ai des difficultés à contrôler mon comportement",
      "Quand je suis contrarié(e), je crois qu'il n'y a rien que je puisse faire pour me sentir mieux",
      "Quand je suis contrarié(e), je m'en veux de ressentir une telle émotion",
      "Quand je suis contrarié(e), je me sens vraiment mal",
      "Quand je suis contrarié(e), je pense que me complaire dans ces contrariétés est la seule chose à faire",
      "Quand je suis contrarié(e), je perds le contrôle de mes comportements",
      "Quand je suis contrarié(e), j'ai des difficultés à penser à autre chose",
      "Quand je suis contrarié(e), je prends le temps de découvrir ce que je ressens vraiment",
      "Quand je suis contrarié(e), cela prend du temps avant que je ne me sente mieux",
      "Quand je suis contrarié(e), mes émotions prennent le dessus",
    ],
    answerScales: {
      intensity: [
        { value: 1, label: "Presque jamais" },
        { value: 2, label: "Quelques fois" },
        { value: 3, label: "La moitié du temps" },
        { value: 4, label: "La plupart du temps" },
        { value: 5, label: "Presque toujours" },
      ],
    },
    scoring: {
      ranges: [
        { min: 36, max: 180, interpretation: "Pas de seuil clinique fourni par les auteurs." },
      ],
      maxScore: 180,
      method:
        "Inversez les items 1, 2, 6, 7, 8, 10, 17, 20, 22, 24 et 34 (1↔5, 2↔4), puis additionnez les 36 items : le score total varie de 36 à 180 ; plus il est élevé, plus les difficultés de régulation émotionnelle sont importantes. Six sous-scores (Gratz & Roemer, 2004) : non-acceptation (11, 12, 21, 23, 25, 29), buts (13, 18, 20, 26, 33), impulsions (3, 14, 19, 24, 27, 32), conscience (2, 6, 8, 10, 17, 34), stratégies (15, 16, 22, 28, 30, 31, 35, 36), clarté (1, 4, 5, 7, 9). Pas de seuil clinique publié.",
    },
  },
  {
    id: "atq",
    acronym: "QPA",
    label: "Questionnaire des pensées automatiques",
    domain: "humeur",
    formType: "single-scale",
    title: "QPA-30 - Questionnaire des pensées automatiques",
    description:
      "Un questionnaire de 30 pensées automatiques négatives évaluant leur fréquence au cours de la dernière semaine",
    category: "Dépression",
    estimatedTime: "15 minutes",
    longDescription:
      "Le questionnaire des pensées automatiques (QPA-30 ; Automatic Thoughts Questionnaire, Hollon & Kendall, 1980, traduction française de J. Cottraux) évalue le contenu négatif du monologue intérieur des personnes déprimées : 30 pensées automatiques dont la fréquence est cotée de 1 (pas du tout) à 5 (tout le temps) pour la dernière semaine. Le score varie de 30 à 150 ; plus il est élevé, plus les pensées automatiques négatives sont fréquentes. Repères de la version française : sujets déprimés 95,7 (écart-type 23), sujets contrôles 46,24 (écart-type 12).",
    instructions:
      "Vous trouverez ci-dessous une liste de 30 pensées qui peuvent émerger dans l'esprit des gens. Veuillez lire attentivement chaque pensée et indiquer avec quelle fréquence, si c'est le cas, cette pensée a été vôtre durant la dernière semaine. Lisez chacune des 30 pensées attentivement et choisissez la réponse correspondante.",
    persistentInstructions:
      "Durant la dernière semaine",
    copyrightAttribution:
      "Questionnaire des pensées automatiques (ATQ) — Hollon & Kendall (1980). Traduction française : J. Cottraux.",
    higherIsBetter: false,
    questions: [
      "J'ai la plus grande difficulté à faire face au monde.",
      "Je ne suis pas bon.",
      "Pourquoi est-ce que je ne réussis jamais ?",
      "Personne ne me comprend.",
      "J'ai laissé tomber les autres.",
      "Je ne pense pas pouvoir continuer.",
      "J'aimerais être quelqu'un de mieux.",
      "Je suis si faible.",
      "Ma vie ne se déroule pas comme je le souhaite.",
      "Je me déçois moi-même.",
      "Rien n'est bon comme avant.",
      "Je ne puis supporter cela plus longtemps.",
      "Je n'arrive pas à commencer les choses.",
      "Qu'y a-t-il de mauvais en moi ?",
      "Je souhaite être quelqu'un d'autre.",
      "Je ne puis faire marcher les choses.",
      "Je me déteste.",
      "Je suis sans valeur.",
      "Je souhaite disparaître.",
      "Qu'est-ce qui ne va pas en moi ?",
      "Je suis un perdant.",
      "Ma vie est un gâchis.",
      "Je suis un raté.",
      "Je n'y arriverai pas.",
      "Je suis tellement sans espoir",
      "Quelque chose doit changer.",
      "Il doit y avoir quelque chose de mauvais en moi.",
      "Mon avenir est lugubre.",
      "Cela ne vaut pas la peine.",
      "Je n'arrive pas à terminer les choses.",
    ],
    answerScales: {
      intensity: [
        { value: 1, label: "Pas du tout" },
        { value: 2, label: "Parfois" },
        { value: 3, label: "Assez souvent" },
        { value: 4, label: "Souvent" },
        { value: 5, label: "Tout le temps" },
      ],
    },
    scoring: {
      ranges: [
        { min: 30, max: 150, interpretation: "Pas de seuil clinique fourni par les auteurs." },
      ],
      maxScore: 150,
      method:
        "Additionnez les 30 items (1 à 5) : le score varie de 30 à 150 ; plus il est élevé, plus les pensées automatiques négatives sont fréquentes. Pas de seuil clinique ; repères de la version française : sujets déprimés 95,7 (écart-type 23), sujets contrôles 46,24 (écart-type 12).",
    },
  },
  {
    id: "ffmq",
    acronym: "FFMQ",
    label: "Questionnaire des cinq facettes de la pleine conscience",
    patientIntroSubtitle: null,
    domain: "pleine-conscience",
    formType: "single-scale",
    title: "FFMQ - Questionnaire des cinq facettes de la pleine conscience",
    description:
      "Un questionnaire de 39 items évaluant cinq facettes de la pleine conscience (observation, description, action consciente, non-réactivité, non-jugement)",
    category: "Pleine conscience",
    estimatedTime: "10 minutes",
    longDescription:
      "Le FFMQ (Five Facets Mindfulness Questionnaire, Baer et al., 2006-2008) mesure la tendance à la pleine conscience au quotidien selon cinq facettes : observation, description de l'expérience, action en pleine conscience, non-réactivité aux évènements privés et non-jugement. 39 items cotés de 1 (jamais ou très rarement vrai) à 5 (très souvent ou toujours vrai), dont 19 inversés. Le score global (39 à 195) additionne les cinq facettes ; plus il est élevé, plus la pleine conscience est marquée. Adaptation et validation francophone : Heeren et al. (2011), Université catholique de Louvain.",
    instructions:
      "Evaluez chacune des propositions ci-dessous en utilisant l'échelle proposée. Choisissez la réponse qui correspond le mieux à ce qui est généralement vrai pour vous.",
    copyrightAttribution:
      "FFMQ — version originale : Baer et al. (2008). Adaptation et validation francophone : Heeren et al. (2011), Université catholique de Louvain.",
    reverseItems: [3, 5, 8, 10, 12, 13, 14, 16, 17, 18, 22, 23, 25, 28, 30, 34, 35, 38, 39],
    higherIsBetter: true,
    questions: [
      "Quand je marche, je prends délibérément conscience des sensations de mon corps en mouvement.",
      "Je suis doué(e) pour trouver les mots qui décrivent mes sentiments.",
      "Je me critique lorsque j'ai des émotions irrationnelles ou inappropriées.",
      "Je perçois mes émotions et sentiments sans devoir y réagir.",
      "Quand je fais quelque chose, mon esprit s'égare et je suis facilement distrait(e).",
      "Lorsque je prends une douche ou un bain, je reste attentif(ve) aux sensations de l'eau sur mon corps.",
      "Je peux facilement verbaliser mes croyances, opinions et attentes.",
      "Je ne fais pas attention à ce que je fais car je suis dans la lune, je me tracasse ou suis de quelconque façon distrait(e).",
      "J'observe mes sentiments sans me laisser emporter par eux.",
      "Je me dis que je ne devrais pas ressentir mes émotions comme je les ressens.",
      "Je remarque comment la nourriture et les boissons influencent mes pensées, mes sensations corporelles et mes émotions.",
      "Il m'est difficile de trouver les mots qui décrivent ce à quoi je pense.",
      "Je suis facilement distrait(e)",
      "Je crois que certaines de mes pensées sont anormales ou mauvaises et que je ne devrais pas penser de cette manière.",
      "Je prête attention aux sensations, comme le vent dans mes cheveux ou le soleil sur mon visage.",
      "J'éprouve des difficultés à trouver les mots justes pour exprimer la manière dont je ressens les choses.",
      "Je pose des jugements quant à savoir si mes pensées sont bonnes ou mauvaises.",
      "J'ai des difficultés à rester centré(e) sur ce qui se passe dans le moment présent.",
      "Lorsque j'ai des pensées ou des images pénibles, je prends du recul et suis conscient(e) de la pensée ou image, sans me laisser envahir par elle.",
      "Je fais attention aux sons, comme le tintement des cloches, le sifflement des oiseaux ou le passage des voitures.",
      "Dans les situations difficiles, je suis capable de faire une pause sans réagir immédiatement.",
      "Lorsque j'éprouve une sensation dans mon corps, il m'est difficile de la décrire car je n'arrive pas à trouver les mots justes.",
      "On dirait que je fonctionne en mode \"automatique\" sans prendre vraiment conscience de ce que je fais.",
      "Lorsque j'ai des pensées ou images pénibles, je me sens calme peu de temps après.",
      "Je me dis que je ne devrais pas penser de la manière dont je pense.",
      "Je remarque les odeurs et les arômes des choses.",
      "Même lorsque je me sens terriblement bouleversé(e), je parviens à trouver une manière de le transposer en mots.",
      "Je me précipite dans des activités sans y être réellement attentif(ve).",
      "Lorsque j'ai des pensées ou images pénibles, je suis capable de simplement les remarquer sans y réagir.",
      "Je pense que certaines de mes émotions sont mauvaises ou inappropriées et que je ne devrais pas les ressentir.",
      "Je remarque les détails visuels dans l'art ou la nature, comme les couleurs, les formes, les textures ou les patterns d'ombres et de lumières.",
      "Ma tendance naturelle est de traduire mes expériences en mots.",
      "Lorsque j'ai des pensées ou images pénibles, je les remarque et les laisse passer.",
      "Je réalise mes travaux ou les tâches automatiquement sans être conscient(e) de ce que je fais.",
      "Lorsque j'ai des pensées ou images pénibles, je me juge bon ou mauvais, en fonction de ce que suggère cette pensée/image.",
      "Je prête attention à la manière dont mes émotions affectent mes pensées et mon comportement.",
      "Je peux habituellement décrire la manière dont je me sens au moment présent avec des détails considérables.",
      "Je me retrouve en train de faire des choses sans y prêter attention.",
      "Je me désapprouve lorsque j'ai des idées irrationnelles.",
    ],
    answerScales: {
      intensity: [
        { value: 1, label: "Jamais ou très rarement vrai" },
        { value: 2, label: "Rarement vrai" },
        { value: 3, label: "Parfois vrai" },
        { value: 4, label: "Souvent vrai" },
        { value: 5, label: "Très souvent ou toujours vrai" },
      ],
    },
    scoring: {
      ranges: [
        { min: 39, max: 195, interpretation: "Pas de seuil clinique fourni par les auteurs." },
      ],
      maxScore: 195,
      method:
        "Inversez les items 3, 5, 8, 10, 12, 13, 14, 16, 17, 18, 22, 23, 25, 28, 30, 34, 35, 38 et 39 (1↔5, 2↔4). Chaque facette est la somme de ses items : observation (1, 6, 11, 15, 20, 26, 31, 36), description de l'expérience (2, 7, 12, 16, 22, 27, 32, 37), action en pleine conscience (5, 8, 13, 18, 23, 28, 34, 38), non-réactivité aux évènements privés (4, 9, 19, 21, 24, 29, 33), non-jugement (3, 10, 14, 17, 25, 30, 35, 39). Le score global « Mindfulness » additionne les cinq facettes (39 à 195). Pas de seuil clinique publié.",
    },
  },
  {
    id: "edi",
    acronym: "EDI",
    label: "Échelle d'infériorité",
    patientIntroSubtitle: null,
    domain: "estime",
    formType: "single-scale",
    title: "EDI - Échelle d'infériorité",
    description:
      "Une échelle de 34 pensées évaluant le sentiment d'infériorité aux yeux de soi-même et aux yeux des autres",
    category: "Sentiment d'infériorité",
    estimatedTime: "10 minutes",
    longDescription:
      "L'Échelle d'infériorité (EDI ; Yao, Cottraux et coll., 1998) est une auto-évaluation de 34 pensées, construite en français pour mesurer le sentiment d'infériorité, notamment chez les personnes anxieuses (TOC, phobie sociale). Chaque énoncé est coté de 1 (ne correspond pas du tout) à 5 (correspond exactement). Le score total (34 à 170) se décompose en deux sous-scores : sentiment d'infériorité aux yeux de soi-même et aux yeux des autres. Repères de la validation : sujets non cliniques 58,8 (écart-type 12,6), phobiques sociaux 109,3, patients TOC 105,8 ; les auteurs situent la limite « environ » vers 70.",
    instructions:
      "Vous trouverez ci-dessous une liste de pensées. Pour chacun des énoncés, veuillez choisir la réponse qui correspond le mieux à votre façon de penser.",
    copyrightAttribution:
      "Échelle d'infériorité (EDI) — Yao, S.-N. et coll. (1998b). Formulaire reproduit dans la thèse de S.-N. Yao, Université Lumière Lyon 2 (1999).",
    higherIsBetter: false,
    questions: [
      "J'ai souvent peur d'être moins bien que les autres.",
      "J'ai peur que si les choses sont mal faites, on va croire que je suis moins compétent(e) que les autres.",
      "J'ai toujours l'impression que l'on ne voit pas mes qualités.",
      "Il faut que je sois toujours à la hauteur, sinon, je suis inférieur(e) à tout le monde.",
      "J'ai souvent peur que l'on ait une mauvaise image de moi.",
      "Même si j'ai beaucoup de qualités, j'ai toujours l'impression que je n'en ai pas.",
      "Je supporte mal d'être fatigué, car cela me diminue.",
      "Si les autres me font un compliment, ils vont s'apercevoir que je ne le méritais pas.",
      "J'ai peur d'apparaître ridicule car cela va me diminuer.",
      "Même si je peux réussir certaines choses difficiles, je me sens toujours moins compétent(e) que les autres.",
      "Si j'apparais maladroit, je serai mal considéré(e) par les autres.",
      "Il faut que je fasse toujours mieux que les autres, sinon, je serai sous-estimé(e) par tout le monde.",
      "Si je suis critiqué(e) par les autres, je me sens rabaissé(e).",
      "Si les autres voient mes faiblesses, ils vont croire que je suis quelqu'un d'incapable.",
      "Je voudrais toujours que toutes les choses soient bien faites, sinon, je suis inférieur(e) aux autres.",
      "Si on me critique cela veut dire que je suis mal jugé(e) par les autres.",
      "Il faut au moins que je sache tout ce que les autres savent pour être apprécié(e) d'eux.",
      "Je me sens diminué(e) si je demande de l'aide.",
      "J'ai peur de ne pas être à la hauteur, car je ne serai pas apprécié(e) par tout le monde.",
      "J'ai peur de faire la moindre erreur, car je risque de donner une mauvaise image de moi aux autres.",
      "Si je montre le moindre signe d'anxiété, je vais être pris(e) pour quelqu'un de moins fort.",
      "J'ai l'impression que l'on remarque souvent mes fautes ou mes faiblesses pour me dévaloriser.",
      "Il faut que je fasse toujours plus de choses que les autres, sinon j'ai moins de valeur qu'eux.",
      "Je ne vois que mes faiblesses, alors je me sens diminué(e).",
      "Si, pour une raison quelconque, je ne peux pas faire ce que l'on me demande, on va me croire incapable.",
      "Si je ne sais pas répondre à toutes les questions qu'on me pose, je me trouve moins intelligent(e) que les autres.",
      "Si j'accepte mes faiblesses je risque de diminuer mes qualités.",
      "Je me sens souvent inférieur car les gens me jugent négativement.",
      "Même si on me fait un compliment, j'ai toujours l'impression que je n'ai pas assez bien fait.",
      "Si je commets une seule erreur, je serai mal vu(e) par les autres.",
      "Je ne me sens jamais content(e) de ce que j'ai réussi, car les autres trouvent que c'est banal.",
      "Si je ne réussis pas une chose que je veux faire, je me vois faible dans tous les domaines.",
      "Je me compare toujours avec les gens qui sont meilleurs, alors je me sens toujours inférieur(e).",
      "Si je n'arrive pas à faire tout ce que l'on attend de moi, on me jugera incompétent(e).",
    ],
    answerScales: {
      intensity: [
        { value: 1, label: "Ne correspond pas du tout" },
        { value: 2, label: "Correspond faiblement" },
        { value: 3, label: "Correspond moyennement" },
        { value: 4, label: "Correspond assez fortement" },
        { value: 5, label: "Correspond exactement" },
      ],
    },
    scoring: {
      ranges: [
        { min: 34, max: 170, interpretation: "Pas de seuil clinique fourni par les auteurs." },
      ],
      maxScore: 170,
      method:
        "Additionnez les 34 items (1 à 5) : score total EDI-T de 34 à 170. Sous-scores : EDI-soi (items 1, 4, 6, 7, 9, 10, 13, 15, 18, 20, 23, 24, 26, 27, 29, 32, 33) et EDI-autres (items 2, 3, 5, 8, 11, 12, 14, 16, 17, 19, 21, 22, 25, 28, 30, 31, 34). Pas de seuil validé ; repères de la validation (Yao et coll., 1998b) : sujets non cliniques 58,8 (écart-type 12,6), phobiques sociaux 109,3 (22), patients TOC 105,8 (35,8) — « environ au-dessous de 70 » chez les sujets non cliniques.",
    },
  },
];

export function getScaleById(id: string): Scale | undefined {
  return scales.find((s) => s.id === id);
}

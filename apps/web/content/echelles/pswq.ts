import type { ScaleGuideContent } from "./types";

/** Sources internes : docs/scales/pswq/pswq.md. Références vérifiées sur PubMed le 23/10/2026. */
export const pswq: ScaleGuideContent = {
  scaleId: "qips",

  seoTitle: "PSWQ (QIPS) : cotation et interprétation | Melya",
  seoDescription:
    "Coter et interpréter le PSWQ, questionnaire sur les inquiétudes du Penn State : items inversés, score de 16 à 80, moyennes de référence françaises et limites.",
  heading:
    "PSWQ : le guide pratique du questionnaire sur les inquiétudes du Penn State",

  essentials: [
    "Le PSWQ (Penn State Worry Questionnaire) mesure en 16 items la **tendance générale à s'inquiéter** de façon excessive et incontrôlable, symptôme central du trouble anxieux généralisé (TAG).",
    "C'est une mesure de **trait**, pas d'état : il n'y a pas de période de référence. Le score va de 16 à 80, après inversion de 5 items.",
    "Sa version française (QIPS) a été validée par Gosselin et al. (2001), qui publient des moyennes de référence : environ 45 en population générale, environ 62 chez des patients souffrant de TAG.",
  ],
  audience: "Adultes",
  administrationMode: "Auto-questionnaire",

  administration: {
    title: "Comment administrer le PSWQ ?",
    body: [
      "Le patient indique jusqu'à quel point chaque énoncé lui correspond, sur 5 niveaux : pas du tout, un peu, assez, très ou extrêmement correspondant (1 à 5). Comptez 5 à 10 minutes.",
      "La consigne de la version validée ne fixe **aucune période** : le PSWQ évalue une disposition durable. Évitez de la reformuler en « ces derniers temps », ce qui en ferait une mesure d'état et fausserait la comparaison avec les normes.",
    ],
  },

  scoring: {
    title: "Comment coter le PSWQ ?",
    body: [
      "Cinq items sont formulés dans le sens d'une faible inquiétude : ce sont eux qu'on inverse avant d'additionner.",
      {
        list: [
          "**Items inversés** : 1, 3, 8, 10 et 11. Recodez-les en 6 − la réponse (1↔5, 2↔4, 3 reste 3).",
          "**Score total** : somme des 16 items après inversion, de 16 à 80.",
        ],
      },
      "Oublier l'inversion est l'erreur de cotation la plus fréquente : elle peut déplacer le score de plusieurs dizaines de points. Les 16 items sont nécessaires.",
    ],
  },

  interpretation: {
    title: "Comment interpréter le score du PSWQ ?",
    body: [
      "**L'article de validation française ne fixe aucun seuil clinique.** La grille affichée ci-dessus est un repère construit par Melya à partir des valeurs d'un formulaire de cabinet (environ 25 à 40 en population générale, 55 à 75 dans le TAG) ; elle sert à situer le score, pas à classer le patient.",
      "Le plus fiable est de comparer le score aux moyennes publiées par Gosselin et al. (2001) :",
      {
        list: [
          "**Population non clinique** : moyenne autour de 45 (écart-type d'environ 12).",
          "**Patients souffrant de TAG** : moyenne autour de 62 (écart-type d'environ 9).",
        ],
      },
      "Un score de 45 est donc dans la moyenne de la population générale, même s'il tombe dans la bande « modérée » de la grille. Un score proche de 60 ou plus est comparable à celui des patients souffrant de TAG et mérite une évaluation clinique.",
    ],
  },

  vigilance: {
    title: "Points de vigilance et limites du PSWQ",
    body: [
      "Aucun item ne déclenche d'alerte. Les points à garder en tête :",
      {
        list: [
          "**Il mesure l'inquiétude, pas l'anxiété en général** : un patient anxieux sans tendance à ruminer des inquiétudes peut avoir un score modéré.",
          "**Il n'est pas spécifique au TAG** : l'inquiétude est aussi élevée dans d'autres troubles anxieux et dans la dépression.",
          "**Les inversions** : vérifiez que la cotation en tient compte, surtout si vous comparez avec un score calculé à la main.",
        ],
      },
    ],
  },

  followUp: {
    title: "Suivre l'évolution avec le PSWQ",
    body: [
      "Bien qu'il mesure un trait, le PSWQ est utilisé pour suivre l'effet des thérapies ciblant l'inquiétude (TCC du TAG).",
      {
        list: [
          "**Une mesure stable** : la fidélité test-retest de la version française est de 0,86 à 4 semaines. Une baisse nette sur plusieurs mois reflète donc plus probablement un vrai changement.",
          "**À quelle fréquence ?** Comme il évalue une disposition, des passations espacées (en début de suivi, à mi-parcours, en fin de prise en charge) suffisent.",
        ],
      },
      "Avec Melya, le PSWQ est envoyé par email, les inversions sont appliquées automatiquement et chaque passation est conservée dans l'historique du patient.",
    ],
  },

  extraSections: [
    {
      title: "PSWQ ou GAD-7 ?",
      body: [
        "Le GAD-7 mesure la fréquence des symptômes anxieux sur les 2 dernières semaines ; le PSWQ mesure la tendance durable à s'inquiéter. Ils se complètent : le GAD-7 suit l'intensité actuelle, le PSWQ cible le processus d'inquiétude travaillé en TCC du TAG.",
      ],
    },
  ],

  faq: [
    {
      question: "Quel est le score seuil du PSWQ ?",
      answer:
        "La validation française (Gosselin et al., 2001) ne définit pas de seuil. Les repères les plus fiables sont les moyennes publiées : environ 45 en population générale et environ 62 chez les patients souffrant de TAG.",
    },
    {
      question: "Quels sont les items inversés du PSWQ ?",
      answer:
        "Les items 1, 3, 8, 10 et 11. Ils se recodent en 6 − la réponse avant d'additionner les 16 items.",
    },
    {
      question: "Quelle différence entre le PSWQ et le QIPS ?",
      answer:
        "C'est le même questionnaire : le QIPS (Questionnaire sur les inquiétudes du Penn State) est la traduction française validée du PSWQ par Gosselin, Dugas, Ladouceur et Freeston (2001).",
    },
    {
      question: "Le PSWQ mesure-t-il l'anxiété actuelle ?",
      answer:
        "Non. Il mesure une tendance générale et durable à s'inquiéter, sans période de référence. Pour l'intensité des symptômes anxieux récents, le GAD-7 est plus adapté.",
    },
    {
      question: "Existe-t-il un PSWQ pour les enfants ?",
      answer:
        "Oui : le PSWQ-C (Chorpita et al., 1997) est une adaptation en 14 items pour les enfants et les adolescents. Melya propose la version adulte ; ses repères ne s'appliquent pas au PSWQ-C.",
    },
    {
      question: "Peut-on faire passer le PSWQ en ligne ?",
      answer:
        "Oui. Avec Melya, vous envoyez le PSWQ à votre patient par email : il y répond en ligne, le score est calculé automatiquement et chaque passation est conservée dans son historique.",
    },
    {
      question: "Comment citer le PSWQ ?",
      answer:
        "Citez l'article original (Meyer et al., 1990) et, pour la version française, Gosselin et al. (2001). Les références complètes figurent dans la section des sources, en bas de page.",
    },
  ],

  questionnaire: {
    kind: "link",
    url: "https://pubmed.ncbi.nlm.nih.gov/11760697/",
    publisher:
      "l'article de validation de Gosselin et al. (L'Encéphale, 2001), qui le reproduit en annexe",
  },
  frenchVersion: {
    summary:
      "Melya utilise la version française validée (QIPS) de Gosselin et al. (2001), reprise mot pour mot, à une adaptation près : « complétés » (québécisme) devient « terminés » à l'item 16. La validation montre une excellente cohérence interne et une bonne stabilité dans le temps.",
    validated: true,
  },
  sources: [
    {
      citation:
        "Meyer, T. J., Miller, M. L., Metzger, R. L., & Borkovec, T. D. (1990). Development and validation of the Penn State Worry Questionnaire. Behaviour Research and Therapy, 28(6), 487–495.",
      url: "https://doi.org/10.1016/0005-7967(90)90135-6",
    },
    {
      citation:
        "Gosselin, P., Dugas, M. J., Ladouceur, R., & Freeston, M. H. (2001). Évaluation des inquiétudes : validation d'une traduction française du Penn State Worry Questionnaire. L'Encéphale, 27(5), 475–484.",
      url: "https://pubmed.ncbi.nlm.nih.gov/11760697/",
    },
    {
      citation:
        "Chorpita, B. F., Tracey, S. A., Brown, T. A., Collica, T. J., & Barlow, D. H. (1997). Assessment of worry in children and adolescents: An adaptation of the Penn State Worry Questionnaire. Behaviour Research and Therapy, 35(6), 569–581.",
      url: "https://doi.org/10.1016/S0005-7967(96)00116-7",
    },
  ],
  apaCitation:
    "Gosselin, P., Dugas, M. J., Ladouceur, R., & Freeston, M. H. (2001). Évaluation des inquiétudes : validation d'une traduction française du Penn State Worry Questionnaire. L'Encéphale, 27(5), 475–484.",

  related: ["gad-7", "eii", "qia", "qcs-tag"],

  updatedAt: "2026-10-23",
};

import type { ScaleGuideContent } from "./types";

/** Sources internes : docs/scales/spin/spin.md. Connor 2000 vérifié sur PubMed le 23/10/2026. */
export const spin: ScaleGuideContent = {
  scaleId: "spin",

  seoTitle: "SPIN (phobie sociale) : cotation et interprétation | Melya",
  seoDescription:
    "Coter et interpréter le SPIN, inventaire de phobie sociale en 17 items : score sur 68, seuil de 19, niveaux de sévérité et suivi. Le guide pratique.",
  heading: "SPIN : le guide pratique de l'inventaire de phobie sociale",

  essentials: [
    "Le SPIN (Social Phobia Inventory) est un auto-questionnaire de 17 items qui mesure la sévérité de l'anxiété sociale sur la semaine écoulée, à travers trois dimensions : la peur, l'évitement et les symptômes physiques (rougir, transpirer, trembler, palpitations).",
    "Le score va de 0 à 68. Dans l'étude de validation, **un score de 19** séparait les personnes souffrant de phobie sociale des témoins.",
    "Plus court que la LSAS (3 à 5 minutes), il convient au dépistage et au suivi de la réponse au traitement.",
  ],
  audience: "Adultes",
  administrationMode: "Auto-questionnaire",

  administration: {
    title: "Comment administrer le SPIN ?",
    body: [
      "Le patient indique à quel point chaque problème l'a gêné au cours de la **semaine écoulée**, sur 5 niveaux :",
      {
        list: [
          "Pas du tout (0)",
          "Un peu (1)",
          "Modérément (2)",
          "Beaucoup (3)",
          "Extrêmement (4)",
        ],
      },
      "Tous les items doivent être renseignés, avec une seule réponse par ligne. Le questionnaire se passe sur papier, en ligne ou en entretien.",
    ],
  },

  scoring: {
    title: "Comment coter le SPIN ?",
    body: [
      "Le score total est la somme des 17 items (0 à 68). Aucun item n'est inversé.",
      "La littérature décrit trois dimensions (peur, évitement, symptômes physiologiques), mais Melya ne restitue que le score total, qui est la mesure de référence. Une passation incomplète n'est pas cotée.",
    ],
  },

  interpretation: {
    title: "Comment interpréter le score du SPIN ?",
    body: [
      "La grille de sévérité en 5 niveaux est celle des formulaires de l'auteur, reprise par la littérature. Un score de 20 est rattaché à « pas d'anxiété sociale » : un des formulaires écrit « moins de 20 », ce qui laissait cette valeur sans catégorie.",
      "Le seuil de dépistage de **19** (Connor et al., 2000) est un repère complémentaire : à partir de là, une anxiété sociale mérite d'être explorée en entretien.",
      {
        list: [
          "**Score de 0 à 20** : pas d'anxiété sociale.",
          "**Score de 21 à 30** : anxiété sociale légère.",
          "**Score de 31 à 40** : anxiété sociale modérée.",
          "**Score de 41 à 50** : anxiété sociale sévère.",
          "**Score de 51 à 68** : anxiété sociale très sévère.",
        ],
      },
      "Comme toute échelle de dépistage, le SPIN oriente : le diagnostic de trouble d'anxiété sociale se pose en entretien.",
    ],
  },

  vigilance: {
    title: "Points de vigilance et limites du SPIN",
    body: [
      "Aucun item ne déclenche d'alerte autonome. Les limites à connaître :",
      {
        list: [
          "**Pas de version française validée.** La version utilisée par Melya est une traduction de l'original anglais : comparez les scores d'un même patient dans le temps plutôt qu'à des normes.",
          "**Il ne distingue pas les situations de performance et d'interaction**, contrairement à la LSAS.",
          "**Les symptômes physiques** (palpitations, transpiration) peuvent être influencés par une cause somatique ou un traitement.",
          "**Validé chez l'adulte** : à interpréter avec prudence chez l'adolescent.",
        ],
      },
    ],
  },

  followUp: {
    title: "Suivre l'évolution avec le SPIN",
    body: [
      "Le SPIN est sensible au changement : dans l'étude de validation, il reflétait la réponse au traitement au fil des semaines.",
      {
        list: [
          "**À quelle fréquence ?** La consigne porte sur la semaine écoulée : une passation toutes les 2 à 4 séances suffit en général.",
          "**Lisez la tendance** plutôt qu'un point isolé, et comparez le patient à lui-même.",
        ],
      },
      "Avec Melya, le SPIN est envoyé par email, coté automatiquement, et chaque passation est conservée dans l'historique du patient.",
    ],
  },

  extraSections: [
    {
      title: "SPIN ou LSAS ?",
      body: [
        "Le SPIN est plus court (17 items, 3 à 5 minutes) et couvre les symptômes physiques. La LSAS (24 situations, 10 à 15 minutes) distingue peur et évitement, situations de performance et d'interaction, et dispose d'une validation française : elle est préférable pour une évaluation détaillée ou pour construire une hiérarchie d'exposition.",
      ],
    },
  ],

  faq: [
    {
      question: "Quel est le score seuil du SPIN ?",
      answer:
        "Dans l'étude de validation de Connor et al. (2000), un score de 19 distinguait les personnes souffrant de phobie sociale des témoins. La grille de sévérité commence à « légère » à partir de 21.",
    },
    {
      question: "Le SPIN est-il libre de droits ?",
      answer:
        "Non. Le SPIN est protégé (© Jonathan R. T. Davidson, Duke University) et sa reproduction est soumise à l'autorisation du détenteur des droits. Melya ne diffuse donc pas le questionnaire.",
    },
    {
      question: "Existe-t-il une version française validée du SPIN ?",
      answer:
        "Aucune version française validée n'a été identifiée. Des traductions circulent en ligne, mais certaines déforment le sens des items originaux. Pour une évaluation de l'anxiété sociale avec une validation française, la LSAS est une alternative.",
    },
    {
      question: "Comment citer le SPIN ?",
      answer:
        "Connor, K. M., Davidson, J. R. T., Churchill, L. E., Sherwood, A., Foa, E., & Weisler, R. H. (2000). Psychometric properties of the Social Phobia Inventory (SPIN): New self-rating scale. British Journal of Psychiatry, 176(4), 379–386.",
    },
  ],

  questionnaire: {
    kind: "none",
    reason:
      "Le SPIN est protégé : sa reproduction est soumise à l'autorisation de son auteur (Jonathan R. T. Davidson, Duke University). Melya ne diffuse pas le questionnaire.",
  },
  frenchVersion: {
    summary:
      "Aucune version française publiée et validée n'a pu être identifiée. Melya utilise une traduction calée au plus près de l'original anglais, en corrigeant les contresens relevés dans les traductions qui circulent en ligne.",
    validated: false,
  },
  sources: [
    {
      citation:
        "Connor, K. M., Davidson, J. R. T., Churchill, L. E., Sherwood, A., Foa, E., & Weisler, R. H. (2000). Psychometric properties of the Social Phobia Inventory (SPIN): New self-rating scale. British Journal of Psychiatry, 176(4), 379–386.",
      url: "https://doi.org/10.1192/bjp.176.4.379",
    },
  ],
  apaCitation:
    "Connor, K. M., Davidson, J. R. T., Churchill, L. E., Sherwood, A., Foa, E., & Weisler, R. H. (2000). Psychometric properties of the Social Phobia Inventory (SPIN): New self-rating scale. British Journal of Psychiatry, 176(4), 379–386. https://doi.org/10.1192/bjp.176.4.379",

  related: ["echelle-d-anxiete-sociale-de-liebowitz", "gad-7", "qips"],

  updatedAt: "2026-10-23",
};

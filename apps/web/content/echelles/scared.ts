import type { ScaleGuideContent } from "./types";

/** Sources internes : docs/scales/scared/scared.md. Références vérifiées sur PubMed le 23/10/2026. */
export const scared: ScaleGuideContent = {
  scaleId: "scared",

  seoTitle: "SCARED (anxiété de l'enfant) : cotation et seuils | Melya",
  seoDescription:
    "Coter et interpréter le SCARED, dépistage des troubles anxieux chez l'enfant et l'adolescent : 41 items, seuil de 25, 5 sous-échelles et leurs seuils.",
  heading:
    "SCARED : le guide pratique du dépistage des troubles anxieux chez l'enfant",

  essentials: [
    "Le SCARED dépiste en 41 items les **troubles anxieux de l'enfant et de l'adolescent** (8 à 18 ans), sur les 3 derniers mois. C'est l'enfant qui répond.",
    "Le score va de 0 à 82. **Un score ≥ 25 peut indiquer un trouble anxieux** ; au-delà de 30, le repérage est plus spécifique.",
    "Cinq sous-échelles, chacune avec son seuil, orientent vers le type d'anxiété : panique ou symptômes somatiques, anxiété généralisée, anxiété de séparation, phobie sociale, refus scolaire anxieux.",
  ],
  audience: "Enfants et adolescents (8 à 18 ans)",
  administrationMode: "Auto-questionnaire (l'enfant répond)",

  administration: {
    title: "Comment administrer le SCARED ?",
    body: [
      "L'enfant lit chaque phrase et indique si elle est « pas vraie ou presque jamais vraie » (0), « plutôt vraie ou parfois vraie » (1) ou « très vraie ou souvent vraie » (2) pour lui, **au cours des 3 derniers mois**. Comptez environ 10 minutes.",
      "Pour les enfants de 8 à 11 ans, la source recommande qu'un adulte soit présent pour expliquer les questions, sans orienter les réponses.",
      "Une version parent existe (mêmes items reformulés) ; Melya propose la version remplie par l'enfant.",
    ],
  },

  scoring: {
    title: "Comment coter le SCARED ?",
    body: [
      "Le score total est la somme des 41 items, de 0 à 82. Les 5 sous-échelles ont chacune un seuil indicatif :",
      {
        list: [
          "**Trouble panique ou symptômes somatiques** : items 1, 6, 9, 12, 15, 18, 19, 22, 24, 27, 30, 34, 38 (seuil 7).",
          "**Anxiété généralisée** : items 5, 7, 14, 21, 23, 28, 33, 35, 37 (seuil 9).",
          "**Anxiété de séparation** : items 4, 8, 13, 16, 20, 25, 29, 31 (seuil 5).",
          "**Phobie sociale** : items 3, 10, 26, 32, 39, 40, 41 (seuil 8).",
          "**Refus scolaire anxieux** : items 2, 11, 17, 36 (seuil 3).",
        ],
      },
    ],
  },

  interpretation: {
    title: "Comment interpréter le score du SCARED ?",
    body: [
      "Selon la version française de l'Université de Pittsburgh :",
      {
        list: [
          "**Score de 0 à 24** : sous le seuil de dépistage.",
          "**Score de 25 à 30** : peut indiquer la présence d'un trouble anxieux.",
          "**Score de 31 à 82** : peut indiquer un trouble anxieux, avec une meilleure spécificité.",
        ],
      },
      "Les sous-échelles dont le score atteint leur seuil indiquent le type d'anxiété à explorer en priorité. Un enfant peut être sous le seuil total mais au-dessus du seuil d'une sous-échelle (par exemple l'anxiété de séparation) : ce signal mérite aussi l'attention.",
    ],
  },

  vigilance: {
    title: "Points de vigilance et limites du SCARED",
    body: [
      {
        list: [
          "**C'est un outil de dépistage** : un trouble anxieux se confirme en entretien avec l'enfant et sa famille.",
          "**Pas de validation française de cette traduction** : la version utilisée est la traduction franco-canadienne diffusée par l'Université de Pittsburgh. Les seuils viennent des études anglophones.",
          "**Les jeunes enfants** comprennent parfois mal certaines phrases : la présence d'un adulte est recommandée avant 12 ans.",
          "**La version parent et la version enfant** donnent souvent des scores différents : croiser les deux points de vue est utile.",
        ],
      },
    ],
  },

  followUp: {
    title: "Suivre l'évolution avec le SCARED",
    body: [
      "La consigne porte sur les 3 derniers mois : le SCARED se repasse à intervalles de quelques mois, par exemple en début et en fin de prise en charge, en suivant le total et les sous-échelles.",
      "Avec Melya, le SCARED est envoyé par email ; le score total et les 5 sous-scores sont calculés automatiquement, et chaque passation est conservée dans l'historique du patient.",
    ],
  },

  faq: [
    {
      question: "Quel est le seuil du SCARED ?",
      answer:
        "Un score total ≥ 25 peut indiquer un trouble anxieux ; au-delà de 30, le repérage est plus spécifique. Chaque sous-échelle a aussi son seuil (de 3 à 9).",
    },
    {
      question: "À partir de quel âge utiliser le SCARED ?",
      answer:
        "De 8 à 18 ans. Pour les 8-11 ans, il est recommandé qu'un adulte soit présent pour expliquer les questions.",
    },
    {
      question: "Quelle différence entre le SCARED et le SCARED-R ?",
      answer:
        "Le SCARED (41 items, Birmaher) couvre 5 dimensions de l'anxiété. Le SCARED-R (Muris) est une version révisée qui ajoute notamment le TOC, le stress post-traumatique et des phobies spécifiques.",
    },
    {
      question: "Comment citer le SCARED ?",
      answer:
        "Birmaher, B., Khetarpal, S., Brent, D., Cully, M., Balach, L., Kaufman, J., & Neer, S. M. (1997). The Screen for Child Anxiety Related Emotional Disorders (SCARED): Scale construction and psychometric characteristics. Journal of the American Academy of Child & Adolescent Psychiatry, 36(4), 545–553.",
    },
  ],

  questionnaire: {
    kind: "link",
    url: "https://pre.pediatricbipolar.pitt.edu/sites/default/files/assets/AH/SCARED_Child_Updated_June_2015_fr-CA.pdf",
    publisher: "l'Université de Pittsburgh (version française de l'enfant)",
  },
  frenchVersion: {
    summary:
      "Melya utilise la traduction franco-canadienne de la version de l'enfant, diffusée gratuitement par l'Université de Pittsburgh. Aucune validation française de cette traduction n'a été trouvée.",
    validated: false,
  },
  sources: [
    {
      citation:
        "Birmaher, B., Khetarpal, S., Brent, D., Cully, M., Balach, L., Kaufman, J., & Neer, S. M. (1997). The Screen for Child Anxiety Related Emotional Disorders (SCARED): Scale construction and psychometric characteristics. Journal of the American Academy of Child & Adolescent Psychiatry, 36(4), 545–553.",
      url: "https://doi.org/10.1097/00004583-199704000-00018",
    },
    {
      citation:
        "Birmaher, B., Brent, D. A., Chiappetta, L., Bridge, J., Monga, S., & Baugher, M. (1999). Psychometric properties of the Screen for Child Anxiety Related Emotional Disorders (SCARED): A replication study. Journal of the American Academy of Child & Adolescent Psychiatry, 38(10), 1230–1236.",
      url: "https://doi.org/10.1097/00004583-199910000-00011",
    },
  ],
  apaCitation:
    "Birmaher, B., Khetarpal, S., Brent, D., Cully, M., Balach, L., Kaufman, J., & Neer, S. M. (1997). The Screen for Child Anxiety Related Emotional Disorders (SCARED): Scale construction and psychometric characteristics. Journal of the American Academy of Child & Adolescent Psychiatry, 36(4), 545–553. https://doi.org/10.1097/00004583-199704000-00018",

  related: ["scared-r", "cries-13", "adrs", "gad-7"],

  updatedAt: "2026-10-23",
};

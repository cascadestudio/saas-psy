import type { ScaleGuideContent } from "./types";

/** Sources internes : docs/scales/pdeq/pdeq.md. Références vérifiées sur PubMed le 23/10/2026. */
export const pdeq: ScaleGuideContent = {
  scaleId: "pdeq",

  seoTitle: "PDEQ (dissociation péritraumatique) : cotation | Melya",
  seoDescription:
    "Coter et interpréter le PDEQ, questionnaire de dissociation péritraumatique : score de 10 à 50, seuil de 15, lien avec le risque de TSPT. Le guide pratique.",
  heading:
    "PDEQ : le guide pratique du questionnaire de dissociation péritraumatique",

  essentials: [
    "Le PDEQ évalue en 10 items la **dissociation vécue pendant un événement traumatique et juste après** : impression d'irréalité, de « pilote automatique », temps qui ralentit, sensation de se voir de l'extérieur…",
    "Le score va de 10 à 50. **Un score ≥ 15 signale une dissociation péritraumatique significative.**",
    "Son intérêt est pronostique : la dissociation péritraumatique est l'un des facteurs qui prédisent le plus fortement l'apparition d'un trouble de stress post-traumatique (TSPT).",
  ],
  audience: "Adultes exposés à un événement traumatique",
  administrationMode: "Auto-questionnaire",

  administration: {
    title: "Comment administrer le PDEQ ?",
    body: [
      "Le questionnaire porte sur **un événement précis** : le patient décrit ses expériences et réactions « durant l'événement et immédiatement après ». Identifiez l'événement avec lui avant la passation.",
      "Chaque énoncé se cote de 1 (pas du tout vrai) à 5 (extrêmement vrai). Si un énoncé ne s'applique pas à son expérience, le patient répond « pas du tout vrai ». Comptez environ 5 minutes.",
      "Le PDEQ s'utilise idéalement dans les jours ou semaines qui suivent l'événement, quand le souvenir des réactions immédiates est encore précis. Il peut aussi être passé plus tard, en gardant à l'esprit le biais de mémoire.",
    ],
  },

  scoring: {
    title: "Comment coter le PDEQ ?",
    body: [
      "Le score total est la somme des 10 items, de 10 à 50. Aucun item n'est inversé et il n'y a pas de sous-score. Les 10 items sont nécessaires.",
    ],
  },

  interpretation: {
    title: "Comment interpréter le score du PDEQ ?",
    body: [
      "Le seuil de **15** est celui de la fiche descriptive du Centre national de ressources et de résilience (Cn2r) :",
      {
        list: [
          "**Score de 10 à 14** : dissociation péritraumatique non significative.",
          "**Score de 15 à 50** : dissociation péritraumatique significative.",
        ],
      },
      "Un score significatif n'est pas un diagnostic : il signale un **facteur de risque** de TSPT. Dans une méta-analyse de référence (Ozer et al., 2003), la dissociation péritraumatique était le prédicteur de TSPT le plus fort parmi ceux étudiés. C'est une indication pour proposer un suivi rapproché et dépister les symptômes post-traumatiques dans les semaines suivantes.",
    ],
  },

  vigilance: {
    title: "Points de vigilance et limites du PDEQ",
    body: [
      {
        list: [
          "**C'est une mesure rétrospective** : plus la passation est éloignée de l'événement, plus le souvenir des réactions immédiates peut être reconstruit, notamment sous l'influence des symptômes actuels.",
          "**Il ne mesure pas le TSPT** : pour évaluer les symptômes post-traumatiques, utilisez la PCL-5.",
          "**Il porte sur un seul événement** : en cas d'expositions multiples, précisez lequel est évalué.",
        ],
      },
    ],
  },

  followUp: {
    title: "Le PDEQ dans le suivi",
    body: [
      "Le PDEQ décrit des réactions passées : il ne se répète pas pour mesurer une évolution. Il s'utilise une fois, au début de la prise en charge, pour repérer les patients à risque.",
      "En cas de score significatif, le suivi se fait plutôt avec une échelle de symptômes post-traumatiques, comme la PCL-5, répétée dans le temps.",
      "Avec Melya, le PDEQ est envoyé par email, coté automatiquement, et conservé dans l'historique du patient à côté de ses autres passations.",
    ],
  },

  faq: [
    {
      question: "Quel est le seuil du PDEQ ?",
      answer:
        "Un score total ≥ 15 permet de dépister une dissociation péritraumatique significative (fiche descriptive du Cn2r).",
    },
    {
      question: "Qu'est-ce que la dissociation péritraumatique ?",
      answer:
        "Ce sont des réactions involontaires survenant pendant un événement traumatique ou juste après : impression d'irréalité, de détachement, de fonctionner en « pilote automatique », distorsion du temps, sensation d'observer la scène de l'extérieur. Elle est associée à un risque accru de TSPT.",
    },
    {
      question: "Quand faire passer le PDEQ ?",
      answer:
        "Idéalement dans les jours ou semaines qui suivent l'événement, pour limiter le biais de mémoire. Il peut être utilisé plus tard, en tenant compte de ce biais.",
    },
    {
      question: "Quelle différence entre le PDEQ et la PDI ?",
      answer:
        "Les deux portent sur les réactions pendant et juste après l'événement : le PDEQ évalue la dissociation, l'inventaire de détresse péritraumatique (PDI) la détresse émotionnelle (peur, impuissance, culpabilité…). Ils sont souvent utilisés ensemble.",
    },
    {
      question: "Comment citer le PDEQ ?",
      answer:
        "Citez Marmar, Weiss et Metzler (1997) pour l'instrument et Birmes et al. (2005) pour la validation française.",
    },
  ],

  questionnaire: {
    kind: "link",
    url: "https://cn2r.fr/wp-content/uploads/2025/04/PDEQ_Cn2r.pdf",
    publisher: "le Centre national de ressources et de résilience (Cn2r)",
  },
  frenchVersion: {
    summary:
      "Melya utilise la traduction de Brunet et Routhier (1999), réalisée avec l'autorisation des auteurs et diffusée par le Cn2r. Sa version auto-questionnaire a été validée par Birmes et al. (2005) dans deux échantillons francophones exposés à un traumatisme.",
    validated: true,
  },
  sources: [
    {
      citation:
        "Marmar, C. R., Weiss, D. S., & Metzler, T. J. (1997). The Peritraumatic Dissociative Experiences Questionnaire. In J. P. Wilson & T. M. Keane (Eds.), Assessing psychological trauma and PTSD (pp. 412–428). Guilford Press.",
    },
    {
      citation:
        "Birmes, P., Brunet, A., Benoit, M., Defer, S., Hatton, L., Sztulman, H., & Schmitt, L. (2005). Validation of the Peritraumatic Dissociative Experiences Questionnaire self-report version in two samples of French-speaking individuals exposed to trauma. European Psychiatry, 20(2), 145–151.",
      url: "https://doi.org/10.1016/j.eurpsy.2004.06.033",
    },
    {
      citation:
        "Ozer, E. J., Best, S. R., Lipsey, T. L., & Weiss, D. S. (2003). Predictors of posttraumatic stress disorder and symptoms in adults: A meta-analysis. Psychological Bulletin, 129(1), 52–73.",
      url: "https://doi.org/10.1037/0033-2909.129.1.52",
    },
  ],
  apaCitation:
    "Birmes, P., Brunet, A., Benoit, M., Defer, S., Hatton, L., Sztulman, H., & Schmitt, L. (2005). Validation of the Peritraumatic Dissociative Experiences Questionnaire self-report version in two samples of French-speaking individuals exposed to trauma. European Psychiatry, 20(2), 145–151. https://doi.org/10.1016/j.eurpsy.2004.06.033",

  related: ["pdi", "traumatismes-pcl5", "pcl-s", "cries-13"],

  updatedAt: "2026-10-23",
};

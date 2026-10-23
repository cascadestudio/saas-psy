import type { ScaleGuideContent } from "./types";

/** Sources internes : docs/scales/pdi/pdi.md. Références vérifiées sur PubMed le 23/10/2026. */
export const pdi: ScaleGuideContent = {
  scaleId: "pdi",

  seoTitle: "PDI (détresse péritraumatique) : cotation, PDF | Melya",
  seoDescription:
    "Coter et interpréter l'inventaire de détresse péritraumatique (PDI) : score de 0 à 52, seuil de 15, risque de TSPT et questionnaire officiel en PDF.",
  heading:
    "PDI : le guide pratique de l'inventaire de détresse péritraumatique",

  essentials: [
    "La PDI évalue en 13 items la **détresse émotionnelle et physique ressentie pendant un événement traumatique et juste après** : impuissance, peur, horreur, culpabilité, sensation de perdre le contrôle, peur de mourir…",
    "Le score va de 0 à 52. **Un score ≥ 15 indique une détresse péritraumatique significative.**",
    "Comme le PDEQ, dont elle est l'instrument jumeau, elle sert à repérer les personnes à risque de développer un trouble de stress post-traumatique (TSPT).",
  ],
  audience: "Adultes exposés à un événement traumatique",
  administrationMode: "Auto-questionnaire",

  administration: {
    title: "Comment administrer la PDI ?",
    body: [
      "La PDI porte sur **un événement précis** : le patient décrit ce qu'il a ressenti « pendant et immédiatement après l'événement critique ». Identifiez l'événement avec lui avant la passation.",
      "Chaque énoncé se cote de 0 (pas du tout vrai) à 4 (extrêmement vrai). Si un énoncé ne s'applique pas à son expérience, le patient répond « pas du tout vrai ». Comptez environ 5 minutes.",
      "Elle se passe de préférence peu de temps après l'événement, quand le souvenir des réactions immédiates est encore précis.",
    ],
  },

  scoring: {
    title: "Comment coter la PDI ?",
    body: [
      "Le score total est la somme des 13 items, de 0 à 52. Aucun item n'est inversé et il n'y a pas de sous-score. Les 13 items sont nécessaires.",
    ],
  },

  interpretation: {
    title: "Comment interpréter le score de la PDI ?",
    body: [
      "Melya retient le seuil de **15** de la fiche descriptive du Centre national de ressources et de résilience (Cn2r) :",
      {
        list: [
          "**Score de 0 à 14** : détresse péritraumatique non significative.",
          "**Score de 15 à 52** : détresse péritraumatique significative.",
        ],
      },
      "Les sources ne s'accordent pas tout à fait sur la borne : l'INSPQ (Québec) parle d'un risque à partir de 14. Un score de 14 mérite donc la même attention qu'un score de 15.",
      "Un score significatif n'est pas un diagnostic : c'est un **facteur de risque** de TSPT. La validation française montre que la détresse péritraumatique prédit les symptômes post-traumatiques ultérieurs. Proposez un suivi et dépistez les symptômes de TSPT dans les semaines suivantes.",
    ],
  },

  vigilance: {
    title: "Points de vigilance et limites de la PDI",
    body: [
      {
        list: [
          "**L'item 13** (« Je pensais que j'allais mourir ») décrit une peur de mourir pendant l'événement, pas des idées suicidaires.",
          "**C'est une mesure rétrospective** : le souvenir des réactions immédiates peut être influencé par l'état actuel du patient, d'autant plus que la passation est tardive.",
          "**Elle ne mesure pas le TSPT** : pour évaluer les symptômes post-traumatiques, utilisez la PCL-5.",
          "**Une version pour enfants (PDI-C)** existe ; la PDI s'adresse aux adultes.",
        ],
      },
    ],
  },

  followUp: {
    title: "La PDI dans le suivi",
    body: [
      "Comme le PDEQ, la PDI décrit des réactions passées : elle ne se répète pas pour mesurer une évolution. Elle s'utilise une fois, en début de prise en charge, pour repérer les patients à risque.",
      "En cas de score significatif, suivez l'apparition des symptômes post-traumatiques avec la PCL-5 dans les semaines suivantes.",
      "Avec Melya, la PDI est envoyée par email, cotée automatiquement, et conservée dans l'historique du patient.",
    ],
  },

  faq: [
    {
      question: "Quel est le seuil de la PDI ?",
      answer:
        "Un score total ≥ 15 indique une détresse péritraumatique significative (fiche descriptive du Cn2r). L'INSPQ cite un seuil de 14 : traitez un score de 14 avec la même attention.",
    },
    {
      question: "La PDI est-elle gratuite et libre de droits ?",
      answer:
        "Oui. Selon l'INSPQ, l'instrument est dans le domaine public, à condition de citer les sources (Brunet et al., 2001 ; Jehel et al., 2005). Vous pouvez télécharger la version française diffusée par le Cn2r depuis cette page.",
    },
    {
      question: "Quelle différence entre la PDI et le PDEQ ?",
      answer:
        "Les deux portent sur les réactions pendant et juste après l'événement. La PDI mesure la détresse émotionnelle et physique, le PDEQ la dissociation. Ils sont souvent utilisés ensemble pour repérer le risque de TSPT.",
    },
    {
      question: "Peut-on faire passer la PDI en ligne ?",
      answer:
        "Oui. Avec Melya, vous envoyez la PDI à votre patient par email : il y répond en ligne, le score est calculé automatiquement et chaque passation est conservée dans son historique.",
    },
    {
      question: "Comment citer la PDI ?",
      answer:
        "Citez Brunet et al. (2001) pour l'instrument et Jehel et al. (2005) pour la version française.",
    },
  ],

  questionnaire: {
    kind: "download",
    file: "/questionnaires/pdi-questionnaire-francais.pdf",
    publisher:
      "le Centre national de ressources et de résilience (Cn2r), traduction validée de Jehel et al. (2005)",
  },
  frenchVersion: {
    summary:
      "Melya utilise la traduction française validée par Jehel et al. (2005), telle que diffusée par le Cn2r. Une variante québécoise, qui reformule six items, n'est pas retenue.",
    validated: true,
  },
  sources: [
    {
      citation:
        "Brunet, A., Weiss, D. S., Metzler, T. J., Best, S. R., Neylan, T. C., Rogers, C., Fagan, J., & Marmar, C. R. (2001). The Peritraumatic Distress Inventory: A proposed measure of PTSD criterion A2. American Journal of Psychiatry, 158(9), 1480–1485.",
      url: "https://doi.org/10.1176/appi.ajp.158.9.1480",
    },
    {
      citation:
        "Jehel, L., Brunet, A., Paterniti, S., & Guelfi, J. D. (2005). Validation de la version française de l'inventaire de détresse péritraumatique. Canadian Journal of Psychiatry, 50(1), 67–71.",
      url: "https://doi.org/10.1177/070674370505000112",
    },
  ],
  apaCitation:
    "Jehel, L., Brunet, A., Paterniti, S., & Guelfi, J. D. (2005). Validation de la version française de l'inventaire de détresse péritraumatique. Canadian Journal of Psychiatry, 50(1), 67–71. https://doi.org/10.1177/070674370505000112",

  related: ["pdeq", "traumatismes-pcl5", "pcl-s", "cries-13"],

  updatedAt: "2026-10-23",
};

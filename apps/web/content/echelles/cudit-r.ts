import type { ScaleGuideContent } from "./types";

/** Sources internes : docs/scales/cudit-r/cudit-r.md. Références vérifiées sur PubMed/CrossRef le 23/10/2026. */
export const cuditR: ScaleGuideContent = {
  scaleId: "cudit-r",

  seoTitle: "CUDIT-R (cannabis) : cotation et interprétation | Melya",
  seoDescription:
    "Coter et interpréter le CUDIT-R, test de repérage des troubles liés à l'usage du cannabis : score sur 32, seuils français 8 et 10, version validée CUDIT-R-Fr.",
  heading:
    "CUDIT-R : le guide pratique du test de repérage de l'usage de cannabis",

  essentials: [
    "Le CUDIT-R repère en 8 questions une **consommation de cannabis problématique ou un trouble de l'usage**, sur les 6 derniers mois. Il se remplit en 2 à 3 minutes.",
    "Le score va de 0 à 32. Selon la version française validée, **de 8 à 10 la consommation peut être problématique, au-delà de 10 un trouble important de l'usage est possible**.",
    "Il s'adresse aux personnes qui ont consommé du cannabis au cours des 6 derniers mois.",
  ],
  audience: "Adultes consommateurs de cannabis",
  administrationMode: "Auto-questionnaire",

  administration: {
    title: "Comment administrer le CUDIT-R ?",
    body: [
      "Vérifiez d'abord que le patient a consommé du cannabis au cours des **6 derniers mois** : sinon, le questionnaire n'a pas lieu d'être passé. Le patient choisit ensuite, pour chaque question, la réponse qui correspond le mieux à sa consommation sur cette période.",
      "Les questions portent sur la fréquence de consommation, le temps passé « défoncé », la difficulté à s'arrêter, les conséquences sur les obligations, les problèmes de mémoire ou de concentration, les situations à risque et l'envie de réduire.",
    ],
  },

  scoring: {
    title: "Comment coter le CUDIT-R ?",
    body: [
      {
        list: [
          "**Questions 1 à 7** : de 0 à 4 points.",
          "**Question 8** : 0, 2 ou 4 points.",
        ],
      },
      "Le score total est la somme des 8 questions, de 0 à 32. Aucun item n'est inversé et il n'y a pas de sous-score.",
    ],
  },

  interpretation: {
    title: "Comment interpréter le score du CUDIT-R ?",
    body: [
      "Melya retient les seuils de la version française (CUDIT-R-Fr), diffusés par le RESPADD :",
      {
        list: [
          "**Score de 0 à 7** : consommation pouvant être à faible risque.",
          "**Score de 8 à 10** : consommation de cannabis pouvant être problématique.",
          "**Score de 11 à 32** : trouble important de l'usage de cannabis possible.",
        ],
      },
      "La version originale anglaise utilise des bornes un peu différentes (consommation à risque dès 8, trouble probable dès 12). Un score élevé ouvre une discussion sur la consommation et, si besoin, une orientation vers une consultation spécialisée ; il ne pose pas de diagnostic.",
    ],
  },

  vigilance: {
    title: "Points de vigilance et limites du CUDIT-R",
    body: [
      {
        list: [
          "**La sous-déclaration** est fréquente : un score bas n'exclut pas un usage problématique si le tableau clinique le suggère.",
          "**La période de 6 mois** peut masquer un changement récent.",
          "**Il ne concerne que le cannabis** : en cas de consommations multiples, complétez avec l'AUDIT pour l'alcool.",
        ],
      },
    ],
  },

  followUp: {
    title: "Suivre l'évolution avec le CUDIT-R",
    body: [
      "La période de référence étant de 6 mois, le CUDIT-R se prête mieux au repérage et aux bilans espacés qu'à un suivi séance par séance. Repassez-le à quelques mois d'intervalle pour objectiver un changement durable.",
      "Avec Melya, le CUDIT-R est envoyé par email, coté automatiquement, et chaque passation est conservée dans l'historique du patient.",
    ],
  },

  extraSections: [
    {
      title: "CUDIT-R ou CAST ?",
      body: [
        "Les deux repèrent un usage problématique de cannabis. Le CAST (6 questions, 12 derniers mois) est l'outil de l'OFDT, très utilisé chez les jeunes. Le CUDIT-R (8 questions, 6 derniers mois) a été construit pour coller aux critères du trouble de l'usage ; sa validation française l'a comparé au CAST en population psychiatrique.",
      ],
    },
  ],

  faq: [
    {
      question: "Quel est le seuil du CUDIT-R ?",
      answer:
        "Selon la version française validée : de 8 à 10, la consommation peut être problématique ; au-delà de 10, un trouble important de l'usage de cannabis est possible.",
    },
    {
      question: "Le CUDIT-R existe-t-il en français ?",
      answer:
        "Oui. La version française (CUDIT-R-Fr) a été validée par Luquiens et al. (2021) et est diffusée par le RESPADD.",
    },
    {
      question: "Quelle différence entre le CUDIT et le CUDIT-R ?",
      answer:
        "Le CUDIT-R est la version révisée et raccourcie (8 items) de l'ancien CUDIT, qui comptait 10 items. Ce sont deux instruments distincts, avec des seuils différents.",
    },
    {
      question: "Peut-on faire passer le CUDIT-R en ligne ?",
      answer:
        "Oui. Avec Melya, vous envoyez le CUDIT-R à votre patient par email : il y répond en ligne, le score est calculé automatiquement et chaque passation est conservée dans son historique.",
    },
    {
      question: "Comment citer le CUDIT-R ?",
      answer:
        "Citez Adamson et al. (2010) pour l'instrument et Luquiens et al. (2021) pour la version française.",
    },
  ],

  questionnaire: {
    kind: "link",
    url: "https://www.respadd.org/wp-content/uploads/2021/11/Flyer-Test-Curit-Fr-BAT3.pdf",
    publisher: "le RESPADD (réseau de prévention des addictions)",
  },
  frenchVersion: {
    summary:
      "Melya utilise la version française CUDIT-R-Fr, validée par Luquiens et al. (2021) et diffusée par le RESPADD. La validation montre une très bonne cohérence interne et une excellente stabilité dans le temps.",
    validated: true,
  },
  sources: [
    {
      citation:
        "Adamson, S. J., Kay-Lambkin, F. J., Baker, A. L., Lewin, T. J., Thornton, L., Kelly, B. J., & Sellman, J. D. (2010). An improved brief measure of cannabis misuse: The Cannabis Use Disorders Identification Test–Revised (CUDIT-R). Drug and Alcohol Dependence, 110(1–2), 137–143.",
      url: "https://doi.org/10.1016/j.drugalcdep.2010.02.017",
    },
    {
      citation:
        "Luquiens, A., Berger-Viergat, A., Larrieu, A., Artigaud, L., Fener, C., Adamson, S., Laprévote, V., & Rolland, B. (2021). Validation of the French version of the Cannabis Use Disorder Identification Test–Revised and comparison with the Cannabis Abuse Screening Test for screening cannabis use disorder in a psychiatric sample. Drug and Alcohol Review, 40(7), 1334–1339.",
      url: "https://doi.org/10.1111/dar.13298",
    },
  ],
  apaCitation:
    "Adamson, S. J., Kay-Lambkin, F. J., Baker, A. L., Lewin, T. J., Thornton, L., Kelly, B. J., & Sellman, J. D. (2010). An improved brief measure of cannabis misuse: The Cannabis Use Disorders Identification Test–Revised (CUDIT-R). Drug and Alcohol Dependence, 110(1–2), 137–143. https://doi.org/10.1016/j.drugalcdep.2010.02.017",

  related: ["cast", "audit", "ftnd", "ecab"],

  updatedAt: "2026-10-23",
};

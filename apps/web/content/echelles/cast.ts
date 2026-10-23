import type { ScaleGuideContent } from "./types";

/** Sources internes : docs/scales/cast/cast.md. Références vérifiées sur PubMed/CrossRef le 23/10/2026. */
export const cast: ScaleGuideContent = {
  scaleId: "cast",

  seoTitle: "Test CAST (cannabis) : cotation et interprétation | Melya",
  seoDescription:
    "Coter et interpréter le CAST (Cannabis Abuse Screening Test) de l'OFDT : 6 questions, score sur 24, seuils 3 et 7, usage chez l'adolescent et l'adulte.",
  heading:
    "Test CAST : le guide pratique du repérage de l'usage problématique de cannabis",

  essentials: [
    "Le CAST (Cannabis Abuse Screening Test) repère en 6 questions un **usage problématique de cannabis** au cours des 12 derniers mois. Il a été conçu en français par l'OFDT et se remplit en 2 minutes.",
    "Le score va de 0 à 24. Selon l'OFDT, **moins de 3 : usage sans risque ; 3 à 6 : risque faible ; 7 ou plus : risque élevé** d'usage problématique, voire de dépendance.",
    "Il a d'abord été validé chez l'adolescent et s'utilise aussi chez l'adulte.",
  ],
  audience: "Adolescents et adultes consommateurs",
  administrationMode: "Auto-questionnaire",

  administration: {
    title: "Comment administrer le CAST ?",
    body: [
      "Le CAST s'adresse aux personnes qui ont consommé du cannabis **au cours des 12 derniers mois**. Pour chaque question, le patient indique la fréquence : jamais (0), rarement (1), de temps en temps (2), assez souvent (3), très souvent (4).",
      "Les questions portent sur la consommation le matin ou seul, les troubles de la mémoire, les remarques de l'entourage, les tentatives de réduire ou d'arrêter, et les problèmes liés à la consommation (dispute, accident, mauvais résultats…).",
      "Attention : une ancienne version, encore reproduite par certains documents, porte sur la vie entière avec des réponses oui/non. Elle ne se cote pas de la même façon ; Melya utilise la version définitive de l'OFDT.",
    ],
  },

  scoring: {
    title: "Comment coter le CAST ?",
    body: [
      "Chaque question est cotée de 0 à 4. Le score total est la somme des 6 questions, de 0 à 24. Aucun item n'est inversé et il n'y a pas de sous-score.",
    ],
  },

  interpretation: {
    title: "Comment interpréter le score du CAST ?",
    body: [
      "Melya utilise les seuils de l'OFDT (note n° 2013-02) :",
      {
        list: [
          "**Score de 0 à 2** : usage sans risque.",
          "**Score de 3 à 6** : risque faible.",
          "**Score de 7 à 24** : risque élevé d'usage problématique, voire de dépendance.",
        ],
      },
      "L'OFDT précise que ces seuils ne sont pas définitivement arrêtés. En population adulte, une étude du Baromètre santé (Legleye et al., 2015) situe le dépistage d'un trouble de l'usage modéré à sévère à partir de 3, et d'un trouble sévère à partir de 8.",
      "Le CAST est un outil de repérage : un score élevé ouvre une discussion et, si besoin, une orientation vers une consultation jeunes consommateurs ou d'addictologie.",
    ],
  },

  vigilance: {
    title: "Points de vigilance et limites du CAST",
    body: [
      {
        list: [
          "**Il tend à surestimer les usages problématiques** en population générale (OFDT) : un score positif appelle une évaluation, pas une conclusion.",
          "**La sous-déclaration** reste possible, en particulier chez l'adolescent vu en présence de ses parents.",
          "**Deux versions circulent** (12 mois cotée 0-4, et ancienne version oui/non « vie entière ») : vérifiez laquelle a été utilisée avant de comparer des scores.",
        ],
      },
    ],
  },

  followUp: {
    title: "Suivre l'évolution avec le CAST",
    body: [
      "La période de référence est de 12 mois : le CAST sert au repérage et aux bilans espacés, pas au suivi séance par séance.",
      "Avec Melya, le CAST est envoyé par email, coté automatiquement, et chaque passation est conservée dans l'historique du patient.",
    ],
  },

  faq: [
    {
      question: "Quel est le seuil du CAST ?",
      answer:
        "Selon l'OFDT : moins de 3 = usage sans risque, 3 à 6 = risque faible, 7 ou plus = risque élevé d'usage problématique, voire de dépendance.",
    },
    {
      question: "Le CAST est-il utilisable chez l'adolescent ?",
      answer:
        "Oui. Il a été construit et validé auprès d'adolescents français (enquêtes de l'OFDT), puis étudié en population adulte.",
    },
    {
      question: "Quelle différence entre le CAST et le CUDIT-R ?",
      answer:
        "Le CAST (6 questions, 12 mois) est l'outil de l'OFDT, très utilisé chez les jeunes. Le CUDIT-R (8 questions, 6 mois) est construit sur les critères du trouble de l'usage. Les deux repèrent un usage problématique de cannabis.",
    },
    {
      question: "Comment citer le CAST ?",
      answer:
        "Citez Legleye et al. (2007) pour la validation, et la note de l'OFDT n° 2013-02 pour le questionnaire et la cotation.",
    },
  ],

  questionnaire: {
    kind: "link",
    url: "https://www.ofdt.fr/publication/2013/detection-des-usages-problematiques-de-cannabis-le-cannabis-abuse-screening-test",
    publisher:
      "l'Observatoire français des drogues et des tendances addictives (OFDT), concepteur de l'outil",
  },
  frenchVersion: {
    summary:
      "Le CAST a été construit directement en français par l'OFDT : il n'y a pas de traduction. Melya utilise la version définitive (12 derniers mois, cotation de 0 à 4), validée chez l'adolescent puis étudiée chez l'adulte.",
    validated: true,
  },
  sources: [
    {
      citation:
        "Legleye, S., Karila, L., Beck, F., & Reynaud, M. (2007). Validation of the CAST, a general population Cannabis Abuse Screening Test. Journal of Substance Use, 12(4), 233–242.",
      url: "https://doi.org/10.1080/14659890701476532",
    },
    {
      citation:
        "Legleye, S., Piontek, D., & Kraus, L. (2011). Psychometric properties of the Cannabis Abuse Screening Test (CAST) in a French sample of adolescents. Drug and Alcohol Dependence, 113(2–3), 229–235.",
      url: "https://doi.org/10.1016/j.drugalcdep.2010.08.011",
    },
    {
      citation:
        "Legleye, S., Guignard, R., Richard, J.-B., Ludwig, K., Pabst, A., & Beck, F. (2015). Properties of the Cannabis Abuse Screening Test (CAST) in the general population. International Journal of Methods in Psychiatric Research, 24(2), 170–183.",
      url: "https://doi.org/10.1002/mpr.1465",
    },
    {
      citation:
        "Spilka, S., Janssen, E., & Legleye, S. (2013). Détection des usages problématiques de cannabis : le Cannabis Abuse Screening Test (CAST). Note n° 2013-02. OFDT.",
      url: "https://www.ofdt.fr/publication/2013/detection-des-usages-problematiques-de-cannabis-le-cannabis-abuse-screening-test",
    },
  ],
  apaCitation:
    "Legleye, S., Karila, L., Beck, F., & Reynaud, M. (2007). Validation of the CAST, a general population Cannabis Abuse Screening Test. Journal of Substance Use, 12(4), 233–242. https://doi.org/10.1080/14659890701476532",

  related: ["cudit-r", "audit", "ftnd", "ecab"],

  updatedAt: "2026-10-23",
};

import type { ScaleGuideContent } from "./types";

/** Sources internes : docs/scales/honc/honc.md. Références vérifiées sur PubMed/CrossRef le 23/10/2026. */
export const honc: ScaleGuideContent = {
  scaleId: "honc",

  seoTitle: "Test HONC (dépendance au tabac) : cotation | Melya",
  seoDescription:
    "Coter et interpréter le test HONC (Hooked on Nicotine Checklist) : 10 questions oui/non, perte d'autonomie dès une réponse positive, forte dépendance dès 7.",
  heading:
    "Test HONC : le guide pratique du repérage de la dépendance tabagique",

  essentials: [
    "Le test HONC (Hooked on Nicotine Checklist) repère en 10 questions oui/non la **perte d'autonomie vis-à-vis du tabac**. Il a été conçu pour les jeunes fumeurs et validé ensuite chez l'adulte.",
    "Chaque « oui » vaut 1 point (score de 0 à 10). **Une seule réponse positive suffit à signaler une perte d'autonomie** ; un score ≥ 7 indique une forte dépendance à la nicotine.",
    "Il repère les premiers signes de dépendance, souvent avant que la consommation soit quotidienne.",
  ],
  audience: "Jeunes fumeurs et adultes",
  administrationMode: "Auto-questionnaire (oui/non)",

  administration: {
    title: "Comment administrer le test HONC ?",
    body: [
      "Le patient répond par oui ou par non à 10 questions sur sa relation au tabac : difficulté à arrêter, envie de fumer, sentiment d'être accro, symptômes quand il essaie d'arrêter (besoin de fumer, nervosité, irritabilité, difficultés de concentration). Comptez 2 minutes.",
      "Les dernières questions portent sur ce que ressent la personne **quand elle essaie d'arrêter** : si elle n'a jamais essayé, elle répond en pensant aux moments où elle ne peut pas fumer.",
    ],
  },

  scoring: {
    title: "Comment coter le test HONC ?",
    body: [
      "Chaque réponse « oui » vaut 1 point, chaque « non » 0 point. Le score total va de 0 à 10.",
    ],
  },

  interpretation: {
    title: "Comment interpréter le score du test HONC ?",
    body: [
      "Selon La Revue du Praticien, d'après DiFranza et al. (2002) :",
      {
        list: [
          "**Score de 0** : pas de perte d'autonomie mise en évidence.",
          "**Score de 1 à 6** : perte d'autonomie liée à la consommation de tabac.",
          "**Score de 7 à 10** : forte dépendance à la nicotine.",
        ],
      },
      "Le principe du HONC est qu'**une seule réponse positive** signale déjà une perte d'autonomie. C'est ce qui en fait un outil sensible chez les jeunes fumeurs, qui peuvent perdre le contrôle de leur consommation avant de fumer tous les jours.",
    ],
  },

  vigilance: {
    title: "Points de vigilance et limites",
    body: [
      {
        list: [
          "**La traduction française n'a pas été validée formellement** : elle est publiée par une revue médicale professionnelle.",
          "**Il ne mesure pas l'intensité de la dépendance physique** comme le test de Fagerström : les deux outils se complètent.",
          "**Il ne porte que sur le tabac** fumé.",
        ],
      },
    ],
  },

  followUp: {
    title: "Le test HONC dans le suivi",
    body: [
      "Le HONC sert surtout au repérage. Repassé au cours d'un accompagnement, il permet de voir si les signes de perte d'autonomie régressent.",
      "Avec Melya, il est envoyé par email, coté automatiquement, et chaque passation est conservée dans l'historique du patient.",
    ],
  },

  extraSections: [
    {
      title: "HONC ou test de Fagerström ?",
      body: [
        "Le test de Fagerström mesure le degré de dépendance physique, surtout chez des fumeurs réguliers, et aide à doser les substituts nicotiniques. Le HONC repère la perte d'autonomie dès les premiers signes, ce qui le rend plus adapté aux jeunes fumeurs ou aux consommations occasionnelles.",
      ],
    },
  ],

  faq: [
    {
      question: "Comment interpréter le test HONC ?",
      answer:
        "Une seule réponse positive indique une perte d'autonomie liée au tabac ; un score ≥ 7 indique une forte dépendance à la nicotine. Un score de 0 ne met pas en évidence de perte d'autonomie.",
    },
    {
      question: "Le test HONC est-il adapté aux adolescents ?",
      answer:
        "Oui, il a été conçu et validé auprès d'adolescents (étude DANDY), puis chez l'adulte.",
    },
    {
      question: "Comment citer le test HONC ?",
      answer:
        "DiFranza, J. R., Savageau, J. A., Fletcher, K., et al. (2002). Measuring the loss of autonomy over nicotine use in adolescents: The DANDY study. Archives of Pediatrics & Adolescent Medicine, 156(4), 397–403.",
    },
  ],

  questionnaire: {
    kind: "link",
    url: "https://www.larevuedupraticien.fr/outil/test-honc-de-mise-en-evidence-de-la-dependance-tabagique",
    publisher: "La Revue du Praticien",
  },
  frenchVersion: {
    summary:
      "Melya utilise la version française publiée par La Revue du Praticien (encadré « Tabac et adolescents »), seule version française publiée trouvée. Le traducteur n'est pas nommé.",
    validated: false,
  },
  sources: [
    {
      citation:
        "DiFranza, J. R., Savageau, J. A., Fletcher, K., Ockene, J. K., Rigotti, N. A., McNeill, A. D., Coleman, M., & Wood, C. (2002). Measuring the loss of autonomy over nicotine use in adolescents: The DANDY (Development and Assessment of Nicotine Dependence in Youths) study. Archives of Pediatrics & Adolescent Medicine, 156(4), 397–403.",
      url: "https://doi.org/10.1001/archpedi.156.4.397",
    },
    {
      citation:
        "Wellman, R. J., DiFranza, J. R., Savageau, J. A., Godiwala, S., Friedman, K., & Hazelton, J. (2005). Measuring adults' loss of autonomy over nicotine use: The Hooked on Nicotine Checklist. Nicotine & Tobacco Research, 7(1), 157–161.",
      url: "https://doi.org/10.1080/14622200412331328394",
    },
  ],
  apaCitation:
    "DiFranza, J. R., Savageau, J. A., Fletcher, K., Ockene, J. K., Rigotti, N. A., McNeill, A. D., Coleman, M., & Wood, C. (2002). Measuring the loss of autonomy over nicotine use in adolescents: The DANDY study. Archives of Pediatrics & Adolescent Medicine, 156(4), 397–403. https://doi.org/10.1001/archpedi.156.4.397",

  related: ["ftnd", "audit", "cast", "cudit-r"],

  updatedAt: "2026-10-23",
};

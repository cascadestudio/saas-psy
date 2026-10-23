import type { ScaleGuideContent } from "./types";

/**
 * Sources internes : docs/scales/bat/bat.md (versions travail et générale).
 * Schaufeli 2020 vérifié sur CrossRef le 23/10/2026.
 *
 * Les deux fiches partagent l'essentiel du contenu ; ce qui les distingue
 * (public, nombre d'items, bornes des zones) est passé en paramètre pour
 * qu'elles ne soient pas des copies l'une de l'autre.
 */
function batGuide(version: {
  scaleId: string;
  slugLabel: string;
  heading: string;
  audience: string;
  audienceLabel: string;
  context: string;
  primaryItems: number;
  totalItems: number;
  zones: { green: string; orange: string; red: string };
  related: string[];
}): ScaleGuideContent {
  const { primaryItems: n } = version;

  return {
    scaleId: version.scaleId,

    seoTitle: `BAT ${version.slugLabel} (burn-out) : cotation | Melya`,
    seoDescription: `Coter et interpréter le Burnout Assessment Tool (BAT), ${version.slugLabel} : ${version.totalItems} items, zones verte, orange et rouge, 4 dimensions du burn-out et PDF officiel.`,
    heading: version.heading,

    essentials: [
      `Le BAT (Burnout Assessment Tool) évalue les **symptômes de burn-out** : épuisement, distance mentale, déficience cognitive et déficience émotionnelle. Cette ${version.slugLabel} s'adresse ${version.audience}.`,
      `Le score de référence est la moyenne des ${n} items de symptômes primaires, classée en **zone verte (pas de risque), orange (risque de burn-out) ou rouge (risque très élevé)**.`,
      "Conçu à la KU Leuven, il est libre d'utilisation, sans modification et avec citation de la source.",
    ],
    audience: version.audienceLabel,
    administrationMode: "Auto-questionnaire",

    administration: {
      title: `Comment administrer le BAT ${version.slugLabel} ?`,
      body: [
        `${version.context} Pour chaque énoncé, la personne indique la fréquence : jamais (1), rarement (2), parfois (3), souvent (4), toujours (5). Comptez environ 5 minutes.`,
        `Le questionnaire compte ${version.totalItems} items : ${n} items de symptômes primaires et 10 items de symptômes secondaires (plaintes psychiques et psychosomatiques).`,
        "Le manuel conseille de ne pas présenter le questionnaire comme un « test de burn-out » au répondant, pour ne pas orienter ses réponses : Melya n'affiche au patient que le sigle BAT.",
      ],
    },

    scoring: {
      title: `Comment coter le BAT ${version.slugLabel} ?`,
      body: [
        `Le manuel calcule la **moyenne des ${n} items primaires** (de 1 à 5). Melya affiche la somme équivalente (de ${n} à ${n * 5}) : les zones sont converties exactement.`,
        "Les sous-scores correspondent aux 4 dimensions primaires (épuisement, distance mentale, déficience cognitive, déficience émotionnelle) et aux symptômes secondaires, qui sont interprétés à part et n'entrent pas dans le total.",
      ],
    },

    interpretation: {
      title: `Comment interpréter le score du BAT ${version.slugLabel} ?`,
      body: [
        "Melya utilise les seuils cliniques du manuel BAT 2.0, établis en Flandre :",
        {
          list: [
            `**Zone verte** (moyenne ≤ 2,58, ${version.zones.green}) : pas de risque de burn-out.`,
            `**Zone orange** (moyenne de 2,59 à 3,01, ${version.zones.orange}) : risque de burn-out.`,
            `**Zone rouge** (moyenne ≥ 3,02, ${version.zones.red}) : risque très élevé de burn-out.`,
          ],
        },
        "Chaque dimension a aussi ses propres seuils (par exemple, pour l'épuisement, zone orange dès 3,06 et rouge dès 3,31 en moyenne) : un profil très marqué sur l'épuisement n'a pas le même sens qu'un profil dominé par la distance mentale.",
        "Le BAT évalue un risque ; ce n'est pas un outil diagnostique.",
      ],
    },

    vigilance: {
      title: "Points de vigilance et limites du BAT",
      body: [
        {
          list: [
            "**Des seuils flamands** : le manuel recommande d'utiliser des normes locales quand elles existent ; il n'y en a pas encore pour la France.",
            "**Pas de validation française de France** : la traduction officielle (France) est diffusée par les auteurs, mais elle n'a pas fait l'objet d'une étude de validation publiée.",
            "**Le burn-out n'est pas un diagnostic psychiatrique** : un score en zone rouge appelle aussi à rechercher une dépression ou un trouble anxieux, qui se recoupent largement avec l'épuisement.",
          ],
        },
      ],
    },

    followUp: {
      title: "Suivre l'évolution avec le BAT",
      body: [
        "Le BAT peut être repassé au cours de l'accompagnement ou lors d'une reprise du travail pour suivre l'évolution des 4 dimensions. Comparez la personne à elle-même, dimension par dimension.",
        "Avec Melya, le BAT est envoyé par email ; la zone, le total et les sous-scores sont calculés automatiquement, et chaque passation est conservée dans l'historique du patient.",
      ],
    },

    extraSections: [
      {
        title: "Version travail ou version générale ?",
        body: [
          "La version travail (33 items) s'adresse aux personnes en emploi et formule les énoncés en lien avec le travail. La version générale (32 items) s'adresse aux personnes qui ne travaillent pas actuellement, par exemple en arrêt prolongé. Les zones sont les mêmes en moyenne, mais les sommes diffèrent puisque le nombre d'items primaires n'est pas le même.",
        ],
      },
    ],

    faq: [
      {
        question: "Comment interpréter le score du BAT ?",
        answer: `Calculez la moyenne des ${n} items primaires : jusqu'à 2,58, zone verte (pas de risque) ; de 2,59 à 3,01, zone orange (risque de burn-out) ; à partir de 3,02, zone rouge (risque très élevé).`,
      },
      {
        question: "Le BAT est-il gratuit ?",
        answer:
          "Oui. Il est non propriétaire et peut être utilisé sans demander d'autorisation, à condition de ne pas le modifier et de citer la publication de référence. Vous pouvez télécharger la version française (France) depuis cette page.",
      },
      {
        question: "Quelle différence entre le BAT et le MBI ?",
        answer:
          "Le Maslach Burnout Inventory (MBI) est l'outil historique, payant. Le BAT a été conçu plus récemment pour mieux couvrir les symptômes du burn-out (dont les déficiences cognitive et émotionnelle) et il est libre d'utilisation.",
      },
      {
        question: "Comment citer le BAT ?",
        answer:
          "Schaufeli, W. B., Desart, S., & De Witte, H. (2020). Burnout Assessment Tool (BAT): Development, validity, and reliability. International Journal of Environmental Research and Public Health, 17(24), 9495.",
      },
    ],

    questionnaire: {
      kind: "download",
      file: "/questionnaires/bat-questionnaire-francais.pdf",
      publisher:
        "les auteurs (KU Leuven), version française (France) réalisée avec Ilona Boniwell, versions travail et générale",
    },
    frenchVersion: {
      summary:
        "Melya utilise la version française (France) officielle diffusée par les auteurs, reprise sans modification comme l'exige leur licence. Aucune étude de validation de cette version en France n'a été trouvée ; une validation franco-canadienne existe auprès d'enseignants.",
      validated: false,
    },
    sources: [
      {
        citation:
          "Schaufeli, W. B., Desart, S., & De Witte, H. (2020). Burnout Assessment Tool (BAT): Development, validity, and reliability. International Journal of Environmental Research and Public Health, 17(24), 9495.",
        url: "https://doi.org/10.3390/ijerph17249495",
      },
      {
        citation:
          "Schaufeli, W. B., De Witte, H., & Desart, S. (2020). Manual Burnout Assessment Tool (BAT), version 2.0. KU Leuven.",
        url: "https://burnoutassessmenttool.be/",
      },
    ],
    apaCitation:
      "Schaufeli, W. B., Desart, S., & De Witte, H. (2020). Burnout Assessment Tool (BAT): Development, validity, and reliability. International Journal of Environmental Research and Public Health, 17(24), 9495. https://doi.org/10.3390/ijerph17249495",

    related: version.related,

    updatedAt: "2026-10-23",
  };
}

export const batWork = batGuide({
  scaleId: "bat-w",
  slugLabel: "version travail",
  heading:
    "BAT version travail : le guide pratique du Burnout Assessment Tool pour les personnes en emploi",
  audience: "aux personnes en emploi",
  audienceLabel: "Adultes en emploi",
  context:
    "Les énoncés portent sur la situation de travail de la personne et la manière dont elle la vit.",
  primaryItems: 23,
  totalItems: 33,
  zones: {
    green: "somme de 23 à 59",
    orange: "somme de 60 à 69",
    red: "somme de 70 à 115",
  },
  related: ["bat-g", "phq-9", "gad-7", "ders"],
});

export const batGeneral = batGuide({
  scaleId: "bat-g",
  slugLabel: "version générale",
  heading:
    "BAT version générale : le guide pratique du Burnout Assessment Tool hors travail",
  audience: "aux personnes qui ne travaillent pas actuellement",
  audienceLabel: "Adultes sans activité professionnelle actuelle",
  context:
    "Les énoncés ne font pas référence au travail : cette version convient notamment aux personnes en arrêt prolongé.",
  primaryItems: 22,
  totalItems: 32,
  zones: {
    green: "somme de 22 à 56",
    orange: "somme de 57 à 66",
    red: "somme de 67 à 110",
  },
  related: ["bat-w", "phq-9", "gad-7", "ders"],
});

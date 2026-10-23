import type { ScaleGuideContent } from "./types";

/**
 * Sources internes : docs/scales/y-bocs/y-bocs.md. Références vérifiées sur
 * PubMed le 23/10/2026 (contenu de Mataix-Cols 2016 non relu en texte
 * intégral : cf. FICHES_ECHELLES_A_VALIDER.md).
 */
export const ybocs: ScaleGuideContent = {
  scaleId: "index-symptomes-ybocs",

  seoTitle: "Y-BOCS : cotation et interprétation du score | Melya",
  seoDescription:
    "Coter et interpréter la Y-BOCS (TOC) : score sur 40, obsessions et compulsions, niveaux de sévérité, réponse au traitement et rémission. Le guide pratique.",
  heading:
    "Y-BOCS : le guide pratique de l'échelle d'obsession-compulsion de Yale-Brown",

  essentials: [
    "La Y-BOCS est l'échelle de référence pour mesurer la **sévérité d'un trouble obsessionnel-compulsif (TOC)**. Elle ne dit pas quels sont les symptômes, mais à quel point ils pèsent.",
    "10 items cotés de 0 à 4 : 5 sur les obsessions, 5 sur les compulsions (temps passé, gêne, détresse, résistance, contrôle). Le score va de 0 à 40 ; **16 est le repère d'un TOC d'intensité clinique**.",
    "Elle est surtout utilisée pour suivre la réponse au traitement : une baisse de 35 % du score est le critère de réponse le plus utilisé.",
  ],
  audience: "Adultes",
  administrationMode: "Auto-questionnaire adapté",

  administration: {
    title: "Comment administrer la Y-BOCS ?",
    body: [
      "La Y-BOCS a été conçue comme un **entretien semi-structuré** mené par le clinicien. Une version auto-administrée existe en anglais et donne des scores proches de l'entretien (Steketee et al., 1996). Melya propose une adaptation en auto-questionnaire à partir de la traduction française de référence.",
      "La période évaluée est la **semaine écoulée**. Avant les questions, le patient lit les définitions des obsessions (pensées, images ou impulsions répétitives et intrusives) et des compulsions (actes qu'il se sent obligé d'accomplir).",
      "Pour une première évaluation, il est utile de passer en revue avec le patient la liste de ses symptômes obsessionnels et compulsifs : la Y-BOCS mesure leur sévérité globale, pas leur nature. Comptez 10 à 15 minutes.",
    ],
  },

  scoring: {
    title: "Comment coter la Y-BOCS ?",
    body: [
      "Le score total est la somme des 10 items (0 à 40). On en tire deux sous-scores :",
      {
        list: [
          "**Obsessions** : items 1 à 5, de 0 à 20.",
          "**Compulsions** : items 6 à 10, de 0 à 20.",
        ],
      },
      "Pour chaque bloc, les 5 items évaluent la même chose : temps occupé, interférence avec le fonctionnement, détresse, résistance, degré de contrôle.",
      "Attention aux items 4 et 9 (**résistance**) : 0 signifie que le patient résiste toujours, 4 qu'il cède complètement. Le sens reste cohérent avec le reste de l'échelle (plus haut = plus sévère), mais la formulation surprend parfois les patients.",
    ],
  },

  interpretation: {
    title: "Comment interpréter le score de la Y-BOCS ?",
    body: [
      "Les tranches de sévérité affichées ci-dessus sont les plus utilisées en clinique. Le repère le plus solide est le seuil de **16** : c'est le critère d'inclusion habituel des études sur le TOC, et la limite à partir de laquelle on parle de TOC d'intensité clinique.",
      {
        list: [
          "**Score de 0 à 7** : symptômes sous-cliniques.",
          "**Score de 8 à 15** (par exemple 14 ou 15) : TOC léger.",
          "**Score de 16 à 23** (par exemple 20 ou 22) : TOC modéré.",
          "**Score de 24 à 31** (par exemple 25 ou 29) : TOC sévère.",
          "**Score de 32 à 40** : TOC extrême.",
        ],
      },
      "Comparez les sous-scores : un TOC dominé par les obsessions (ruminations, pensées intrusives sans rituels visibles) n'appelle pas le même travail qu'un TOC dominé par les compulsions.",
      "La Y-BOCS mesure la sévérité d'un TOC déjà repéré ; elle ne pose pas le diagnostic.",
    ],
  },

  vigilance: {
    title: "Points de vigilance et limites de la Y-BOCS",
    body: [
      {
        list: [
          "**Une échelle d'entretien à l'origine.** En auto-passation, les patients avec peu de recul sur leurs symptômes peuvent sous-estimer le temps passé ou l'interférence. Revoyez les réponses en séance si le score ne colle pas au tableau clinique.",
          "**Elle ne décrit pas les symptômes** : deux patients au même score peuvent avoir des TOC très différents (vérification, contamination, pensées interdites…).",
          "**Les items de résistance** sont les plus souvent mal compris : expliquez qu'il s'agit de l'effort fait pour s'opposer aux obsessions ou aux compulsions.",
          "Aucun item ne déclenche d'alerte autonome.",
        ],
      },
    ],
  },

  followUp: {
    title: "Suivre l'évolution avec la Y-BOCS",
    body: [
      "C'est l'usage principal de la Y-BOCS : elle est la mesure de référence dans les essais de traitement du TOC.",
      {
        list: [
          "**Réponse au traitement** : une baisse d'au moins **35 %** du score par rapport au début de la prise en charge. Une baisse de 25 à 35 % correspond à une réponse partielle.",
          "**Rémission** : un consensus international d'experts propose un score ≤ 12 (Mataix-Cols et al., 2016) ; certains manuels français retiennent un score < 16.",
          "**À quelle fréquence ?** La consigne porte sur la semaine écoulée : une passation toutes les 4 à 6 séances suffit en général, à chaque étape clé de la prise en charge.",
        ],
      },
      "Avec Melya, la Y-BOCS est envoyée par email ; vous recevez le score total et les sous-scores obsessions et compulsions, et chaque passation est conservée dans l'historique du patient.",
    ],
  },

  faq: [
    {
      question: "Que signifie un score de 20 à la Y-BOCS ?",
      answer:
        "Un score de 20 correspond à un TOC modéré (tranche 16 à 23). Il dépasse le seuil de 16 utilisé pour parler de TOC d'intensité clinique. Regardez la répartition entre obsessions et compulsions pour orienter la prise en charge.",
    },
    {
      question: "Quel est le score seuil de la Y-BOCS ?",
      answer:
        "Le repère le plus utilisé est 16 : c'est le critère d'inclusion habituel des études sur le TOC. En dessous de 8, les symptômes sont considérés comme sous-cliniques.",
    },
    {
      question: "La Y-BOCS peut-elle être remplie par le patient ?",
      answer:
        "Elle a été conçue comme un entretien, mais une version auto-administrée existe et donne des scores proches (Steketee et al., 1996). Melya propose une adaptation en auto-questionnaire : relisez les réponses en séance si besoin.",
    },
    {
      question: "Quelle baisse de score indique une réponse au traitement ?",
      answer:
        "Une baisse d'au moins 35 % du score total est le critère de réponse le plus utilisé ; une baisse de 25 à 35 % correspond à une réponse partielle.",
    },
    {
      question: "Où trouver la Y-BOCS en PDF ?",
      answer:
        "Melya ne diffuse pas le questionnaire : sa numérisation est soumise à licence. La traduction française de référence est celle de Mollard, Cottraux et Bouvard (1989), publiée dans L'Encéphale.",
    },
    {
      question: "Comment citer la Y-BOCS ?",
      answer:
        "Citez Goodman et al. (1989) pour l'échelle originale et Mollard, Cottraux et Bouvard (1989) pour la version française.",
    },
  ],

  questionnaire: {
    kind: "none",
    reason:
      "Melya ne diffuse pas le questionnaire : sa numérisation est soumise à une licence de son détenteur. La traduction française de référence est publiée par Mollard, Cottraux et Bouvard (L'Encéphale, 1989).",
  },
  frenchVersion: {
    summary:
      "Melya s'appuie sur la traduction française de référence de Mollard, Cottraux et Bouvard (1989), validée par Bouvard et al. (1992). Cette traduction est rédigée pour l'entretien clinicien : Melya en a adapté les formulations à la première personne pour l'auto-passation, sur le modèle de la version auto-administrée anglaise (Steketee et al., 1996).",
    validated: false,
    warning:
      "La traduction française est validée en entretien clinicien. L'adaptation en auto-questionnaire proposée par Melya n'a pas fait l'objet d'une validation spécifique.",
  },
  sources: [
    {
      citation:
        "Goodman, W. K., Price, L. H., Rasmussen, S. A., Mazure, C., Fleischmann, R. L., Hill, C. L., Heninger, G. R., & Charney, D. S. (1989). The Yale-Brown Obsessive Compulsive Scale. I. Development, use, and reliability. Archives of General Psychiatry, 46(11), 1006–1011.",
      url: "https://doi.org/10.1001/archpsyc.1989.01810110048007",
    },
    {
      citation:
        "Goodman, W. K., Price, L. H., Rasmussen, S. A., Mazure, C., Delgado, P., Heninger, G. R., & Charney, D. S. (1989). The Yale-Brown Obsessive Compulsive Scale. II. Validity. Archives of General Psychiatry, 46(11), 1012–1016.",
      url: "https://doi.org/10.1001/archpsyc.1989.01810110054008",
    },
    {
      citation:
        "Mollard, E., Cottraux, J., & Bouvard, M. (1989). Version française de l'échelle d'obsession-compulsion de Yale-Brown. L'Encéphale, 15, 335–341.",
    },
    {
      citation:
        "Bouvard, M., Sauteraux, A., Note, I., Bourgeois, M., Dirson, S., & Cottraux, J. (1992). Étude de validation et analyse factorielle de la version française de l'échelle d'obsession-compulsion de Yale-Brown. Journal de Thérapie Comportementale et Cognitive, 2(4), 18–22.",
    },
    {
      citation:
        "Steketee, G., Frost, R., & Bogart, K. (1996). The Yale-Brown Obsessive Compulsive Scale: Interview versus self-report. Behaviour Research and Therapy, 34(8), 675–684.",
      url: "https://doi.org/10.1016/0005-7967(96)00036-8",
    },
    {
      citation:
        "Mataix-Cols, D., Fernández de la Cruz, L., Nordsletten, A. E., Lenhard, F., Isomura, K., & Simpson, H. B. (2016). Towards an international expert consensus for defining treatment response, remission, recovery and relapse in obsessive-compulsive disorder. World Psychiatry, 15(1), 80–81.",
      url: "https://doi.org/10.1002/wps.20299",
    },
  ],
  apaCitation:
    "Goodman, W. K., Price, L. H., Rasmussen, S. A., Mazure, C., Fleischmann, R. L., Hill, C. L., Heninger, G. R., & Charney, D. S. (1989). The Yale-Brown Obsessive Compulsive Scale. I. Development, use, and reliability. Archives of General Psychiatry, 46(11), 1006–1011. https://doi.org/10.1001/archpsyc.1989.01810110048007",

  related: ["gad-7", "qips", "eii", "phq-9"],

  updatedAt: "2026-10-23",
};

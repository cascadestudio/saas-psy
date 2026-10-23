import type { ScaleGuideContent } from "./types";

/** Sources internes : docs/scales/pdss/pdss.md. Références vérifiées sur PubMed/CrossRef le 23/10/2026. */
export const pdss: ScaleGuideContent = {
  scaleId: "pdss",

  seoTitle: "PDSS (trouble panique) : cotation et seuil | Melya",
  seoDescription:
    "Coter et interpréter la PDSS, échelle de sévérité du trouble panique en auto-questionnaire : 7 items, score sur 28, seuil de 9 de la validation française.",
  heading:
    "PDSS : le guide pratique de l'échelle de sévérité du trouble panique",

  essentials: [
    "La PDSS (Panic Disorder Severity Scale) évalue en 7 items la **sévérité du trouble panique sur la dernière semaine** : fréquence et détresse des attaques, anxiété anticipatoire, évitement des situations et des sensations physiques, retentissement au travail et dans la vie sociale.",
    "Le score va de 0 à 28. Dans la validation française de la version auto-questionnaire, **un score ≥ 9 correspond à un trouble panique probable**.",
    "Elle sert au dépistage parmi des patients anxieux et au suivi de la prise en charge.",
  ],
  audience: "Adultes",
  administrationMode: "Auto-questionnaire (PDSS-SR)",

  administration: {
    title: "Comment administrer la PDSS ?",
    body: [
      "La PDSS d'origine est un entretien mené par le clinicien (Shear et al., 1997). Melya utilise la **version auto-questionnaire** (PDSS-SR), dont la fiabilité a été établie (Houck et al., 2002).",
      "Avant les questions, le patient lit la définition d'une **attaque de panique** (accès soudain de peur avec au moins 4 symptômes, culminant en 10 minutes ou moins) et d'une **attaque subclinique** (moins de 4 symptômes). Prenez le temps de vérifier qu'il a compris cette distinction : les premiers items en dépendent.",
      "La période évaluée est la **dernière semaine**. Chaque item se cote de 0 à 4 ; les réponses sont détaillées et prennent environ 5 minutes.",
    ],
  },

  scoring: {
    title: "Comment coter la PDSS ?",
    body: [
      "Le score total est la somme des 7 items (0 à 28). Aucun item n'est inversé et il n'y a pas de sous-score : la validation française confirme une structure à un seul facteur.",
      "Si une réponse manque, le score ne peut pas être utilisé : les 7 items sont nécessaires.",
    ],
  },

  interpretation: {
    title: "Comment interpréter le score de la PDSS ?",
    body: [
      "Le seuil de **9** vient de la validation française de la PDSS-SR (Roberge et al., 2022) :",
      {
        list: [
          "**Score de 0 à 8** : en dessous du seuil de dépistage.",
          "**Score de 9 à 28** : trouble panique probable (sensibilité 78,8 %, spécificité 70,4 %).",
        ],
      },
      "Ce seuil a été établi **parmi des patients souffrant de troubles anxieux** : il aide à repérer le trouble panique chez un patient anxieux, pas en population générale. Ce n'est pas une gradation de sévérité ; au-delà du seuil, le score se lit comme une mesure continue.",
      "Les grilles de sévérité (légère, modérée, sévère) qui circulent en ligne portent sur la version clinicien en anglais : elles ne s'appliquent pas directement à l'auto-questionnaire français.",
    ],
  },

  vigilance: {
    title: "Points de vigilance et limites de la PDSS",
    body: [
      {
        list: [
          "**La définition de l'attaque de panique** conditionne les réponses : un patient qui compte toutes ses montées d'anxiété comme des attaques surestimera son score.",
          "**Elle ne pose pas de diagnostic** : le trouble panique se diagnostique en entretien, en excluant notamment une cause médicale aux symptômes physiques.",
          "**Version québécoise** : la version française utilisée est celle du ministère de la Santé du Québec ; aucune version de France n'a été trouvée.",
        ],
      },
    ],
  },

  followUp: {
    title: "Suivre l'évolution avec la PDSS",
    body: [
      "La PDSS est d'abord un outil de suivi : le ministère de la Santé du Québec en fait l'outil de suivi du trouble panique dans son programme pour les troubles mentaux fréquents.",
      {
        list: [
          "**À quelle fréquence ?** La consigne porte sur la dernière semaine : une passation toutes les 2 à 4 séances permet de suivre la prise en charge.",
          "**Lisez la tendance** et l'évolution de chaque item : l'évitement et l'anxiété anticipatoire ne diminuent pas toujours au même rythme que les attaques.",
        ],
      },
      "Avec Melya, la PDSS est envoyée par email, cotée automatiquement, et chaque passation est conservée dans l'historique du patient.",
    ],
  },

  faq: [
    {
      question: "Quel est le seuil de la PDSS ?",
      answer:
        "Pour la version auto-questionnaire française, un score ≥ 9 correspond à un trouble panique probable (Roberge et al., 2022). Ce seuil a été établi chez des patients anxieux.",
    },
    {
      question: "Que signifie un score de 14 à la PDSS ?",
      answer:
        "Un score de 14 dépasse le seuil de 9 : un trouble panique est probable et doit être confirmé en entretien. Il n'existe pas de grille de sévérité validée pour la version française auto-questionnaire.",
    },
    {
      question: "La PDSS peut-elle être remplie par le patient ?",
      answer:
        "Oui, dans sa version auto-questionnaire (PDSS-SR), dont la fiabilité a été établie et qui a une validation française. La version d'origine est un entretien clinicien.",
    },
    {
      question: "Peut-on faire passer la PDSS en ligne ?",
      answer:
        "Oui. Avec Melya, vous envoyez la PDSS à votre patient par email : il y répond en ligne, le score est calculé automatiquement et chaque passation est conservée dans son historique.",
    },
    {
      question: "Comment citer la PDSS ?",
      answer:
        "Citez Shear et al. (1997) pour l'échelle, Houck et al. (2002) pour la version auto-questionnaire et Roberge et al. (2022) pour la version française.",
    },
  ],

  questionnaire: {
    kind: "link",
    url: "https://www.gmfulevis.com/clients/CISSSCA/Sous-Sites/GMF-U/Arret_de_travail/Form-questionnaire_PDSS.pdf",
    publisher:
      "le ministère de la Santé et des Services sociaux du Québec (formulaire diffusé par le GMF-U de Lévis)",
  },
  frenchVersion: {
    summary:
      "Melya utilise le formulaire français du ministère de la Santé et des Services sociaux du Québec (2019). Une version française de la PDSS-SR a été validée par Roberge et al. (2022), qui en tirent le seuil de 9 ; on ne sait pas encore si leur texte est identique à celui du ministère.",
    validated: false,
    warning:
      "Version québécoise : la correspondance avec la version validée par Roberge et al. (2022) n'est pas encore établie.",
  },
  sources: [
    {
      citation:
        "Shear, M. K., Brown, T. A., Barlow, D. H., Money, R., Sholomskas, D. E., Woods, S. W., Gorman, J. M., & Papp, L. A. (1997). Multicenter collaborative panic disorder severity scale. American Journal of Psychiatry, 154(11), 1571–1575.",
      url: "https://doi.org/10.1176/ajp.154.11.1571",
    },
    {
      citation:
        "Houck, P. R., Spiegel, D. A., Shear, M. K., & Rucci, P. (2002). Reliability of the self-report version of the panic disorder severity scale. Depression and Anxiety, 15(4), 183–185.",
      url: "https://doi.org/10.1002/da.10049",
    },
    {
      citation:
        "Roberge, P., Marx, P., Couture, J., Carrier, N., Benoît, A., Provencher, M. D., Antony, M. M., & Norton, P. J. (2022). French adaptation and validation of the Panic Disorder Severity Scale—self-report. BMC Psychiatry, 22, 434.",
      url: "https://doi.org/10.1186/s12888-022-03989-x",
    },
  ],
  apaCitation:
    "Roberge, P., Marx, P., Couture, J., Carrier, N., Benoît, A., Provencher, M. D., Antony, M. M., & Norton, P. J. (2022). French adaptation and validation of the Panic Disorder Severity Scale—self-report. BMC Psychiatry, 22, 434. https://doi.org/10.1186/s12888-022-03989-x",

  related: ["gad-7", "qips", "echelle-d-anxiete-sociale-de-liebowitz", "phq-9"],

  updatedAt: "2026-10-23",
};

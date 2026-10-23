import type { ScaleGuideContent } from "./types";

/** Sources internes : docs/scales/cst/cst.md. Aucune publication de validation identifiée. */
export const cst: ScaleGuideContent = {
  scaleId: "cst",

  seoTitle: "Échelle de stress de Cungi : cotation et score | Melya",
  seoDescription:
    "Coter et interpréter l'échelle brève d'évaluation du stress de Charly Cungi : 11 questions, score de 11 à 66, niveaux de stress, limites et usage en séance.",
  heading: "Échelle brève d'évaluation du stress de Cungi : le guide pratique",

  essentials: [
    "L'échelle brève d'évaluation du stress, issue des travaux du psychiatre **Charly Cungi**, mesure en 11 questions les manifestations émotionnelles, comportementales et physiques du stress.",
    "Le score va de 11 à 66 : **stress très bas, bas, élevé ou très élevé**.",
    "C'est un outil simple pour objectiver le ressenti de stress et ouvrir la discussion ; il n'a pas fait l'objet d'une validation publiée.",
  ],
  audience: "Adultes",
  administrationMode: "Auto-questionnaire",

  administration: {
    title: "Comment administrer l'échelle de stress de Cungi ?",
    body: [
      "Pour chaque question, la personne choisit la réponse qui lui correspond, de 1 (non, pas du tout) à 6 (extrêmement). Comptez environ 3 minutes.",
      "Les questions portent notamment sur l'irritabilité, la tension, la fatigue, les troubles du sommeil et des manifestations physiques souvent associées au stress.",
    ],
  },

  scoring: {
    title: "Comment coter l'échelle de stress de Cungi ?",
    body: [
      "Le score total est la somme des 11 réponses, de 11 à 66. Aucun item n'est inversé et il n'y a pas de sous-score.",
    ],
  },

  interpretation: {
    title: "Comment interpréter le score ?",
    body: [
      {
        list: [
          "**Score de 11 à 19** : niveau de stress très bas.",
          "**Score de 20 à 30** : niveau de stress bas.",
          "**Score de 31 à 45** : niveau de stress élevé.",
          "**Score de 46 à 66** : niveau de stress très élevé.",
        ],
      },
      "Les bornes publiées dans les sources se chevauchent (« entre 19 et 30 », « entre 30 et 45 ») : Melya les a rendues continues, en gardant chaque borne haute dans la tranche indiquée. Un score situé à la limite (19, 30 ou 45) est à lire avec souplesse.",
      "Ces niveaux sont des repères pratiques, pas des seuils validés : servez-vous-en pour situer le ressenti de la personne et suivre son évolution.",
    ],
  },

  vigilance: {
    title: "Points de vigilance et limites",
    body: [
      {
        list: [
          "**Aucune validation publiée** n'a été identifiée, et le texte provient de sources secondaires qui reprennent l'ouvrage de Cungi.",
          "**Le stress n'est pas un diagnostic** : un score très élevé appelle à rechercher un trouble anxieux, une dépression ou un épuisement professionnel.",
          "**Certains items sont physiques** (tension artérielle, cholestérol, allergies…) : ils peuvent refléter un problème de santé indépendant du stress.",
          "**Une autre version plus longue** de l'échelle de Cungi circule : vérifiez la version avant de comparer des scores.",
        ],
      },
    ],
  },

  followUp: {
    title: "Suivre l'évolution avec l'échelle de Cungi",
    body: [
      "L'échelle se repasse facilement au cours d'un accompagnement à la gestion du stress, par exemple avant et après un programme de relaxation ou de restructuration cognitive.",
      "Avec Melya, elle est envoyée par email, cotée automatiquement, et chaque passation est conservée dans l'historique du patient.",
    ],
  },

  faq: [
    {
      question: "Comment interpréter l'échelle de stress de Cungi ?",
      answer:
        "De 11 à 19 : stress très bas ; de 20 à 30 : bas ; de 31 à 45 : élevé ; au-dessus de 45 : très élevé. Ce sont des repères, pas des seuils validés.",
    },
    {
      question: "L'échelle de Cungi est-elle validée ?",
      answer:
        "Aucune étude de validation publiée n'a été identifiée. C'est un outil d'auto-évaluation issu d'un ouvrage de vulgarisation clinique, utile pour objectiver le ressenti et suivre son évolution.",
    },
    {
      question: "Peut-on faire passer l'échelle de stress de Cungi en ligne ?",
      answer:
        "Oui. Avec Melya, vous envoyez l'échelle de stress de Cungi à votre patient par email : il y répond en ligne, le score est calculé automatiquement et chaque passation est conservée dans son historique.",
    },
    {
      question: "Comment citer l'échelle de Cungi ?",
      answer:
        "Citez l'ouvrage de Charly Cungi, Savoir gérer son stress (Retz), dont l'échelle est issue.",
    },
  ],

  questionnaire: {
    kind: "none",
    reason:
      "Aucune version officielle n'est diffusée publiquement : l'échelle est issue de l'ouvrage de Charly Cungi, Savoir gérer son stress (Retz). Melya ne diffuse pas le questionnaire.",
  },
  frenchVersion: {
    summary:
      "L'échelle a été conçue en français par Charly Cungi. Le texte utilisé par Melya est repris de sources secondaires concordantes (organisme de formation, établissement public suisse) ; il reste à confronter à l'ouvrage d'origine.",
    validated: false,
    warning:
      "Aucune étude de validation publiée n'a été identifiée pour cette échelle.",
  },
  sources: [
    {
      citation: "Cungi, C. Savoir gérer son stress. Retz.",
    },
  ],
  apaCitation: "Cungi, C. Savoir gérer son stress. Retz.",

  related: ["gad-7", "bat-w", "phq-9", "ders"],

  updatedAt: "2026-10-23",
};

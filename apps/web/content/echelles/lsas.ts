import type { ScaleGuideContent } from "./types";

/**
 * Sources internes : docs/scales/lsas/lsas.md (spec) et la page rédigée par
 * James sur Sanity, reprise et restructurée. Références vérifiées sur PubMed
 * et CrossRef le 23/10/2026.
 */
export const lsas: ScaleGuideContent = {
  scaleId: "echelle-d-anxiete-sociale-de-liebowitz",

  seoTitle: "LSAS (Liebowitz) : cotation et interprétation | Melya",
  seoDescription:
    "Coter et interpréter l'échelle d'anxiété sociale de Liebowitz (LSAS) : peur et évitement, sous-scores, seuils 30 et 60, suivi. Le guide pratique pour les psys.",
  heading:
    "LSAS : le guide pratique de l'échelle d'anxiété sociale de Liebowitz",

  essentials: [
    "La LSAS (échelle d'anxiété sociale de Liebowitz) évalue 24 situations sociales et de performance. Pour chacune, le patient cote séparément sa **peur** et son **évitement**, de 0 à 3.",
    "Le score total va de 0 à 144. Un score ≥ 30 évoque un trouble d'anxiété sociale, ≥ 60 sa forme généralisée. Les sous-scores (peur, évitement, performance, interaction) sont aussi utiles que le total.",
    "C'est l'échelle de référence de l'anxiété sociale en recherche comme en TCC, ici dans sa version auto-évaluation (LSAS-SR), validée en français.",
  ],
  audience: "Adolescents et adultes",
  administrationMode: "Auto-questionnaire (LSAS-SR)",

  administration: {
    title: "Comment administrer la LSAS ?",
    body: [
      "La LSAS existe en deux formes : l'entretien conduit par le clinicien (forme originale de Liebowitz, 1987) et l'auto-questionnaire rempli par le patient (LSAS-SR). Les deux reposent sur les mêmes 24 items et donnent des résultats équivalents. La version auto prend 10 à 15 minutes.",
      "Pour chaque situation, le patient répond à deux questions :",
      {
        list: [
          "**Peur ou anxiété** ressentie : aucune (0), légère (1), moyenne (2), sévère (3).",
          "**Évitement** de la situation : jamais (0 %), occasionnel (1-33 %), fréquent (34-66 %), habituel (67-100 %).",
        ],
      },
      "Point clé à expliquer avant de commencer : le patient doit coter **toutes** les situations, même celles qu'il n'a pas rencontrées récemment, en imaginant ce qu'il ressentirait s'il y était confronté. Sinon, les situations non vécues sont cotées 0 et le score d'évitement est faussé. La période de référence est la semaine écoulée.",
    ],
  },

  scoring: {
    title: "Comment coter la LSAS ?",
    body: [
      "Le score total additionne les 24 cotations de peur et les 24 cotations d'évitement. Il n'y a pas d'item inversé.",
      "Les 24 situations se répartissent en 12 situations de **performance** (P : parler en public, manger devant les autres, passer un examen…) et 12 situations d'**interaction sociale** (S : parler à un inconnu, exprimer un désaccord…). On en tire les sous-scores :",
      {
        list: [
          "**Peur** (0-72) et **évitement** (0-72) : somme des 24 cotations de chaque dimension.",
          "**Performance** (0-72) et **interaction sociale** (0-72) : peur + évitement sur les 12 items de chaque catégorie.",
          "Les 4 sous-scores croisés (peur × performance, peur × interaction, évitement × performance, évitement × interaction), de 0 à 36 chacun.",
        ],
      },
      "Attention à l'item 21 (« essayer de “draguer” quelqu'un ») : la version américaine le classait en performance, la validation française le classe en interaction sociale. Melya suit la version française, soit 12 items P et 12 items S.",
      "Les 48 cotations sont nécessaires : un score partiel n'est pas interprétable.",
    ],
  },

  interpretation: {
    title: "Comment interpréter le score de la LSAS ?",
    body: [
      "Les seuils de Melya sont ceux de Heimberg et Becker (2002), les plus utilisés au niveau international. Pour la version auto-évaluation, une étude sur près de 350 personnes a confirmé deux repères : **≥ 30** pour identifier un trouble d'anxiété sociale, **≥ 60** pour sa forme généralisée.",
      "Certains manuels français utilisent une grille plus restrictive, qui ne parle d'anxiété sociale qu'à partir de 56 : un même score peut donc être classé différemment selon la source. Indiquez la grille utilisée si vous transmettez un résultat.",
      "Au-delà du total, lisez les sous-scores :",
      {
        list: [
          "**Peur élevée, évitement faible** : le patient affronte malgré une anxiété intense, souvent au prix d'un épuisement important.",
          "**Peur modérée, évitement massif** : la vie s'est organisée autour de l'évitement, qui entretient le trouble.",
          "**Performance ou interaction ?** Certains patients redoutent surtout les situations de performance et fonctionnent bien en tête-à-tête ; d'autres l'inverse. Ce profil oriente la hiérarchie d'exposition.",
        ],
      },
      "Un score élevé ne pose pas de diagnostic : le trouble d'anxiété sociale se diagnostique en entretien, en tenant compte du retentissement et de la durée des symptômes.",
    ],
  },

  vigilance: {
    title: "Points de vigilance et limites de la LSAS",
    body: [
      "Aucun item de la LSAS ne déclenche d'alerte autonome. Les limites à garder en tête :",
      {
        list: [
          "**Elle ne distingue pas anxiété sociale et personnalité évitante**, dont les manifestations se recoupent largement.",
          "**Les situations non vécues** doivent être cotées en imaginant la situation : vérifiez que la consigne a été comprise.",
          "**Le contexte culturel compte.** Manger devant les autres ou exprimer un désaccord n'ont pas la même valeur sociale partout : une cotation élevée peut refléter une norme plutôt qu'une anxiété pathologique.",
          "**Certains patients sous-cotent**, notamment ceux qui ont normalisé un fonctionnement très évitant.",
        ],
      },
    ],
  },

  followUp: {
    title: "Suivre l'évolution avec la LSAS",
    body: [
      "La LSAS est l'échelle de suivi de référence dans les études de TCC de l'anxiété sociale.",
      {
        list: [
          "**À quelle fréquence ?** La consigne porte sur la semaine écoulée. En pratique, une passation toutes les 4 à 6 séances suffit, un peu plus souvent en début de prise en charge.",
          "**Suivez les sous-scores séparément.** Peur et évitement n'évoluent pas forcément au même rythme : voir lequel bouge en premier aide à ajuster le travail d'exposition et de restructuration.",
          "**Une mesure stable.** La version française auto-évaluée a une excellente fidélité test-retest (0,93 à 8 semaines, Heeren et al., 2012) : une baisse nette au fil du suivi reflète plus probablement un vrai changement qu'une fluctuation de mesure.",
        ],
      },
      "Avec Melya, vous envoyez la LSAS par email ; vous recevez le score total et les 8 sous-scores calculés automatiquement, et chaque passation est conservée dans l'historique du patient.",
    ],
  },

  faq: [
    {
      question: "Quel est le score seuil de la LSAS ?",
      answer:
        "Pour la version auto-évaluation, un score ≥ 30 évoque un trouble d'anxiété sociale et un score ≥ 60 sa forme généralisée (Rytwinski et al., 2009). Ces seuils orientent, ils ne posent pas de diagnostic.",
    },
    {
      question: "Que signifie un score de 50 à la LSAS ?",
      answer:
        "Selon la grille de Heimberg et Becker utilisée par Melya, un score de 50 correspond à une anxiété sociale modérée. Il dépasse le seuil de 30 sans atteindre celui de 60 associé à la forme généralisée. Regardez les sous-scores pour préciser le profil.",
    },
    {
      question: "Quelle est la différence entre la LSAS et le SPIN ?",
      answer:
        "Le SPIN (17 items) mesure aussi l'anxiété sociale, plus rapidement. La LSAS est plus longue mais distingue peur et évitement, et situations de performance et d'interaction : elle est préférée quand on veut une évaluation détaillée ou construire une hiérarchie d'exposition.",
    },
    {
      question: "Peut-on utiliser la LSAS avec des adolescents ?",
      answer:
        "La LSAS-SR s'utilise chez l'adolescent et l'adulte. Une version spécifique pour enfants et adolescents existe (LSAS-CA) ; dans tous les cas, les seuils établis chez l'adulte sont à interpréter avec prudence chez les plus jeunes.",
    },
    {
      question: "Où trouver la LSAS en PDF ?",
      answer:
        "Melya ne diffuse pas le questionnaire : les conditions de licence de la LSAS ne sont pas documentées publiquement. La version française a été publiée par Yao et al. (1999) ; avec Melya, vous pouvez la faire passer en ligne sans PDF.",
    },
    {
      question: "Comment citer la LSAS ?",
      answer:
        "Citez l'article original de Liebowitz (1987) et, pour la version française, Yao et al. (1999). La référence complète figure dans la section « Questionnaire officiel et sources ».",
    },
  ],

  questionnaire: {
    kind: "none",
    reason:
      "Melya ne diffuse pas le questionnaire : les conditions de licence de la LSAS ne sont pas documentées publiquement. La version française est publiée dans l'article de validation de Yao et al. (1999).",
  },
  frenchVersion: {
    summary:
      "Melya utilise la traduction française de Lépine et Cardot (1990), validée par Yao et al. (1999), qui ont aussi montré l'équivalence des versions clinicien et auto-évaluation. Les propriétés psychométriques de la version auto-évaluée ont été confirmées par Heeren et al. (2012). La consigne de la version auto-évaluation, absente des sources françaises, est traduite de Heimberg et Becker (2002).",
    validated: true,
  },
  sources: [
    {
      citation:
        "Liebowitz, M. R. (1987). Social phobia. Modern Problems of Pharmacopsychiatry, 22, 141–173.",
      url: "https://doi.org/10.1159/000414022",
    },
    {
      citation:
        "Yao, S. N., Note, I., Fanget, F., Albuisson, E., Bouvard, M., Jalenques, I., & Cottraux, J. (1999). L'anxiété sociale chez les phobiques sociaux : validation de l'échelle d'anxiété sociale de Liebowitz (version française). L'Encéphale, 25(5), 429–435.",
      url: "https://pubmed.ncbi.nlm.nih.gov/10598306/",
    },
    {
      citation:
        "Heeren, A., Maurage, P., Rossignol, M., Vanhaelen, M., Peschard, V., Eeckhout, C., & Philippot, P. (2012). Self-report version of the Liebowitz Social Anxiety Scale: Psychometric properties of the French version. Canadian Journal of Behavioural Science, 44(2), 99–107.",
      url: "https://doi.org/10.1037/a0026249",
    },
    {
      citation:
        "Rytwinski, N. K., Fresco, D. M., Heimberg, R. G., Coles, M. E., Liebowitz, M. R., Cissell, S., Stein, M. B., & Hofmann, S. G. (2009). Screening for social anxiety disorder with the self-report version of the Liebowitz Social Anxiety Scale. Depression and Anxiety, 26(1), 34–38.",
      url: "https://doi.org/10.1002/da.20503",
    },
    {
      citation:
        "Mennin, D. S., Fresco, D. M., Heimberg, R. G., Schneier, F. R., Davies, S. O., & Liebowitz, M. R. (2002). Screening for social anxiety disorder in the clinical setting: Using the Liebowitz Social Anxiety Scale. Journal of Anxiety Disorders, 16(6), 661–673.",
      url: "https://doi.org/10.1016/s0887-6185(02)00134-2",
    },
    {
      citation:
        "Heimberg, R. G., & Becker, R. E. (2002). Cognitive-behavioral group therapy for social phobia: Basic mechanisms and clinical strategies. Guilford Press.",
    },
  ],
  apaCitation:
    "Yao, S. N., Note, I., Fanget, F., Albuisson, E., Bouvard, M., Jalenques, I., & Cottraux, J. (1999). L'anxiété sociale chez les phobiques sociaux : validation de l'échelle d'anxiété sociale de Liebowitz (version française). L'Encéphale, 25(5), 429–435.",

  related: ["spin", "gad-7", "qips", "pdss"],

  updatedAt: "2026-10-23",
};

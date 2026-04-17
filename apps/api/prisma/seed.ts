import { PrismaClient, Prisma, SessionStatus } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

// Scales data matching apps/web/app/scalesData.ts
const scales: {
  id: string;
  title: string;
  description: string;
  category: string;
  estimatedTime: string;
  longDescription: string;
  formType: string;
  questions: Prisma.InputJsonValue;
  answerScales: Prisma.InputJsonValue;
  scoring: Prisma.InputJsonValue;
}[] = [
  {
    id: "echelle-d-anxiete-sociale-de-liebowitz",
    title: "Échelle d'anxiété sociale de Liebowitz",
    description: "Une échelle clinique de 24 items qui mesure la peur et l'évitement dans des situations sociales et de performance",
    category: "Anxiété sociale",
    estimatedTime: "10-15 minutes",
    formType: "dual-scale",
    longDescription: "L'Échelle d'anxiété sociale de Liebowitz (LSAS) est un questionnaire développé par le psychiatre Michael Liebowitz pour évaluer la gravité de l'anxiété sociale. Il mesure à la fois la peur et l'évitement dans 24 situations sociales différentes.",
    questions: [
      { id: 1, text: "Téléphoner en public", type: "performance" },
      { id: 2, text: "Participer à un petit groupe", type: "interaction" },
      { id: 3, text: "Manger dans un lieu public", type: "performance" },
      { id: 4, text: "Boire en compagnie dans un lieu public", type: "performance" },
      { id: 5, text: "Parler à des personnes qui détiennent une autorité", type: "interaction" },
      { id: 6, text: "Jouer, donner une représentation ou une conférence devant un public", type: "performance" },
      { id: 7, text: "Aller à une soirée", type: "interaction" },
      { id: 8, text: "Travailler en étant observé", type: "performance" },
      { id: 9, text: "Écrire en étant observé", type: "performance" },
      { id: 10, text: "Appeler quelqu'un que vous ne connaissez pas très bien", type: "interaction" },
      { id: 11, text: "Parler à des personnes que vous ne connaissez pas très bien", type: "interaction" },
      { id: 12, text: "Rencontrer des inconnus", type: "interaction" },
      { id: 13, text: "Uriner dans des toilettes publiques", type: "performance" },
      { id: 14, text: "Entrer dans une pièce alors que tout le monde est déjà assis", type: "performance" },
      { id: 15, text: "Être le centre d'attention", type: "performance" },
      { id: 16, text: "Prendre la parole à une réunion", type: "performance" },
      { id: 17, text: "Passer un examen", type: "performance" },
      { id: 18, text: "Exprimer son désaccord ou sa désapprobation à des personnes que vous ne connaissez pas très bien", type: "interaction" },
      { id: 19, text: "Regarder dans les yeux des personnes que vous ne connaissez pas très bien", type: "interaction" },
      { id: 20, text: "Faire un compte rendu à un groupe", type: "performance" },
      { id: 21, text: "Essayer de séduire quelqu'un", type: "interaction" },
      { id: 22, text: "Rapporter des marchandises dans un magasin", type: "performance" },
      { id: 23, text: "Donner une soirée", type: "interaction" },
      { id: 24, text: "Résister aux pressions d'un vendeur insistant", type: "interaction" },
    ],
    answerScales: {
      anxiety: [
        { value: 0, label: "Aucune" },
        { value: 1, label: "Légère" },
        { value: 2, label: "Moyenne" },
        { value: 3, label: "Sévère" },
      ],
      avoidance: [
        { value: 0, label: "Jamais (0%)" },
        { value: 1, label: "Occasionnellement (1-33%)" },
        { value: 2, label: "Fréquemment (34-67%)" },
        { value: 3, label: "Habituellement (68-100%)" },
      ],
    },
    scoring: {
      ranges: [
        { min: 0, max: 54, interpretation: "Anxiété sociale légère" },
        { min: 55, max: 64, interpretation: "Anxiété sociale modérée" },
        { min: 65, max: 79, interpretation: "Anxiété sociale marquée" },
        { min: 80, max: 144, interpretation: "Anxiété sociale sévère" },
      ],
      method: "Pour chaque situation, additionnez les scores d'anxiété (0-3) et d'évitement (0-3). Le score total varie de 0 à 144.",
    },
  },
  {
    id: "inventaire-de-depression-de-beck",
    title: "Inventaire de Dépression de Beck (BDI)",
    description: "Une échelle d'auto-évaluation à choix multiples de 21 questions pour mesurer la sévérité de la dépression",
    category: "Dépression",
    estimatedTime: "10-15 minutes",
    formType: "options",
    longDescription: "L'Inventaire de Dépression de Beck (BDI) est un questionnaire d'auto-évaluation à choix multiples de 21 questions, l'un des tests psychométriques les plus largement utilisés pour mesurer la sévérité de la dépression.",
    questions: [
      { title: "Tristesse", options: [{ value: 0, text: "Je ne me sens pas triste." }, { value: 1, text: "Je me sens morose ou triste." }, { value: 2, text: "Je suis morose ou triste tout le temps et je ne peux pas me remettre d'aplomb." }, { value: 3, text: "Je suis tellement triste ou malheureux(se) que je ne peux plus le supporter." }] },
      { title: "Pessimisme", options: [{ value: 0, text: "Je ne suis pas particulièrement découragé(e) par l'avenir." }, { value: 1, text: "Je me sens découragé(e) par l'avenir." }, { value: 2, text: "J'ai l'impression de n'avoir aucune attente dans la vie." }, { value: 3, text: "Je sens que l'avenir est sans espoir." }] },
      { title: "Échec personnel", options: [{ value: 0, text: "Je n'ai pas l'impression d'avoir échoué dans la vie." }, { value: 1, text: "J'ai l'impression d'avoir subi plus d'échecs que la moyenne." }, { value: 2, text: "Quand je pense à ma vie passée, je ne vois que des échecs." }, { value: 3, text: "Je suis un(e) raté(e) complet(e)." }] },
      { title: "Insatisfaction", options: [{ value: 0, text: "Je tire autant de satisfaction de la vie qu'auparavant." }, { value: 1, text: "Je ne tire plus autant de satisfaction de la vie qu'auparavant." }, { value: 2, text: "Je ne tire plus de satisfaction de quoi que ce soit." }, { value: 3, text: "Tout me rend insatisfait ou m'ennuie." }] },
      { title: "Culpabilité", options: [{ value: 0, text: "Je ne me sens pas particulièrement coupable." }, { value: 1, text: "Je me sens coupable une bonne partie du temps." }, { value: 2, text: "Je me sens coupable la plupart du temps." }, { value: 3, text: "Je me sens tout le temps coupable." }] },
      { title: "Sentiment d'être puni(e)", options: [{ value: 0, text: "Je n'ai pas l'impression d'être puni(e)." }, { value: 1, text: "J'ai l'impression que je pourrais être puni(e)." }, { value: 2, text: "Je m'attends à être puni(e)." }, { value: 3, text: "J'ai l'impression d'être puni(e)." }] },
      { title: "Déception envers soi-même", options: [{ value: 0, text: "Je ne suis pas déçu(e) de moi-même." }, { value: 1, text: "Je suis déçu(e) de moi-même." }, { value: 2, text: "Je suis dégoûté(e) de moi-même." }, { value: 3, text: "Je me hais." }] },
      { title: "Auto-accusation", options: [{ value: 0, text: "Je ne pense pas être pire que les autres." }, { value: 1, text: "Je suis critique envers moi-même." }, { value: 2, text: "Je me blâme tout le temps pour mes fautes." }, { value: 3, text: "Je me blâme pour tous les malheurs qui arrivent." }] },
      { title: "Idées suicidaires", options: [{ value: 0, text: "Je ne pense pas du tout à me faire du mal." }, { value: 1, text: "Je pense parfois à me faire du mal, mais je ne le ferais pas." }, { value: 2, text: "Je pense que la mort me libérerait." }, { value: 3, text: "Je me tuerais si j'en avais l'occasion." }] },
      { title: "Pleurs", options: [{ value: 0, text: "Je ne pleure pas plus que d'habitude." }, { value: 1, text: "Je pleure plus qu'avant." }, { value: 2, text: "Je pleure pour la moindre petite chose." }, { value: 3, text: "Je voudrais pleurer mais je n'en suis pas capable." }] },
      { title: "Irritabilité", options: [{ value: 0, text: "Je ne suis pas plus irritable qu'habituellement." }, { value: 1, text: "Je suis plus irritable que d'habitude." }, { value: 2, text: "Je suis beaucoup plus irritable que d'habitude." }, { value: 3, text: "Je suis constamment irritable." }] },
      { title: "Retrait social", options: [{ value: 0, text: "Je n'ai pas perdu d'intérêt pour les autres." }, { value: 1, text: "Je m'intéresse moins aux autres qu'avant." }, { value: 2, text: "J'ai perdu la plupart de mon intérêt pour les autres." }, { value: 3, text: "J'ai perdu tout intérêt pour les autres." }] },
      { title: "Indécision", options: [{ value: 0, text: "Je prends des décisions aussi bien qu'avant." }, { value: 1, text: "Je remets les décisions au lendemain." }, { value: 2, text: "J'ai beaucoup plus de difficultés à prendre des décisions." }, { value: 3, text: "Je n'arrive plus à prendre de décisions." }] },
      { title: "Dévalorisation", options: [{ value: 0, text: "Je n'ai pas l'impression de paraître pire qu'avant." }, { value: 1, text: "Je m'inquiète de paraître vieux (vieille) ou peu attrayant(e)." }, { value: 2, text: "J'ai l'impression de changements permanents dans mon apparence." }, { value: 3, text: "Je me trouve laid(e)." }] },
      { title: "Difficulté de travail", options: [{ value: 0, text: "Je travaille aussi bien qu'avant." }, { value: 1, text: "J'ai besoin de faire des efforts supplémentaires." }, { value: 2, text: "Je dois me forcer pour faire quoi que ce soit." }, { value: 3, text: "Je ne peux faire aucun travail." }] },
      { title: "Troubles du sommeil", options: [{ value: 0, text: "Je dors aussi bien que d'habitude." }, { value: 1, text: "Je ne dors pas aussi bien qu'avant." }, { value: 2, text: "Je me réveille une à deux heures plus tôt." }, { value: 3, text: "Je me réveille plusieurs heures plus tôt." }] },
      { title: "Fatigue", options: [{ value: 0, text: "Je ne me fatigue pas plus que d'habitude." }, { value: 1, text: "Je me fatigue plus facilement que d'habitude." }, { value: 2, text: "Je me fatigue en faisant presque n'importe quoi." }, { value: 3, text: "Je suis trop fatigué(e) pour faire quoi que ce soit." }] },
      { title: "Perte d'appétit", options: [{ value: 0, text: "Mon appétit n'est pas pire que d'habitude." }, { value: 1, text: "Mon appétit n'est pas aussi bon qu'il l'était." }, { value: 2, text: "Mon appétit a beaucoup diminué." }, { value: 3, text: "Je n'ai plus d'appétit du tout." }] },
      { title: "Perte de poids", options: [{ value: 0, text: "Je n'ai pas perdu de poids dernièrement." }, { value: 1, text: "J'ai perdu plus de 2 kilos." }, { value: 2, text: "J'ai perdu plus de 4 kilos." }, { value: 3, text: "J'ai perdu plus de 7 kilos." }] },
      { title: "Préoccupations somatiques", options: [{ value: 0, text: "Je ne suis pas plus préoccupé(e) par ma santé." }, { value: 1, text: "Je suis préoccupé(e) par des maux et des douleurs." }, { value: 2, text: "Je suis tellement préoccupé(e) par ce que je ressens." }, { value: 3, text: "Je suis complètement absorbé(e) par ce que je ressens." }] },
      { title: "Perte de libido", options: [{ value: 0, text: "Je n'ai pas remarqué de changement dans mon intérêt pour le sexe." }, { value: 1, text: "Je m'intéresse moins au sexe qu'auparavant." }, { value: 2, text: "Je m'intéresse beaucoup moins au sexe maintenant." }, { value: 3, text: "J'ai perdu tout intérêt pour le sexe." }] },
    ],
    answerScales: {},
    scoring: {
      ranges: [
        { min: 0, max: 13, interpretation: "Dépression minimale" },
        { min: 14, max: 19, interpretation: "Dépression légère" },
        { min: 20, max: 28, interpretation: "Dépression modérée" },
        { min: 29, max: 63, interpretation: "Dépression sévère" },
      ],
      method: "Additionnez les scores de chaque question (0-3). Le score total varie de 0 à 63.",
    },
  },
  {
    id: "test-scale",
    title: "Échelle Test",
    description: "Une échelle courte de 3 questions pour tester le système",
    category: "Test",
    estimatedTime: "2-3 minutes",
    formType: "single-scale",
    longDescription: "Cette échelle est conçue pour tester le fonctionnement du système avec un minimum de questions.",
    questions: [
      "Comment évaluez-vous votre niveau de stress aujourd'hui ?",
      "À quel point vous sentez-vous motivé(e) ?",
      "Comment qualifieriez-vous votre qualité de sommeil ?",
    ],
    answerScales: {
      intensity: [
        { value: 0, label: "Pas du tout" },
        { value: 1, label: "Un peu" },
        { value: 2, label: "Modérément" },
        { value: 3, label: "Beaucoup" },
      ],
    },
    scoring: {
      ranges: [
        { min: 0, max: 3, interpretation: "Score faible" },
        { min: 4, max: 6, interpretation: "Score moyen" },
        { min: 7, max: 9, interpretation: "Score élevé" },
      ],
      method: "Additionnez les scores de chaque question (0-3). Le score total varie de 0 à 9.",
    },
  },
  {
    id: "stai-anxiete-generalisee",
    title: "STAI - Inventaire d'Anxiété État-Trait",
    description: "Une échelle de 40 items évaluant l'anxiété situationnelle (état) et l'anxiété générale (trait)",
    category: "Anxiété généralisée",
    estimatedTime: "15-20 minutes",
    formType: "grouped-items",
    longDescription: "L'Inventaire d'Anxiété État-Trait (STAI) est un outil d'évaluation psychologique qui mesure deux types d'anxiété : l'anxiété-état (anxiété situationnelle) et l'anxiété-trait (anxiété générale).",
    questions: [
      {
        title: "Anxiété-État (comment vous vous sentez maintenant)",
        items: [
          "Je me sens calme", "Je me sens en sécurité", "Je suis tendu(e)", "Je me sens surmené(e)",
          "Je me sens tranquille", "Je me sens bouleversé(e)", "Je suis préoccupé(e) par des malheurs possibles",
          "Je me sens satisfait(e)", "Je me sens effrayé(e)", "Je me sens à l'aise", "Je me sens sûr(e) de moi",
          "Je me sens nerveux(se)", "Je suis affolé(e)", "Je me sens indécis(e)", "Je suis détendu(e)",
          "Je me sens content(e)", "Je suis inquiet(ète)", "Je me sens troublé(e)", "Je me sens stable", "Je me sens bien",
        ],
      },
      {
        title: "Anxiété-Trait (comment vous vous sentez généralement)",
        items: [
          "Je me sens bien généralement", "Je me fatigue rapidement", "J'ai envie de pleurer",
          "Je souhaiterais être aussi heureux(se) que les autres semblent l'être",
          "Je perds de belles occasions parce que je n'arrive pas à me décider assez rapidement",
          "Je me sens reposé(e)", "Je suis calme, tranquille et en paix",
          "Je sens que les difficultés s'accumulent au point que je ne peux pas les surmonter",
          "Je m'inquiète à propos de choses sans importance", "Je suis heureux(se)", "J'ai des pensées troublantes",
          "Je manque de confiance en moi", "Je me sens en sécurité", "Je prends des décisions facilement",
          "Je me sens incompétent(e)", "Je suis satisfait(e)",
          "Des idées sans importance me trottent dans la tête et me tracassent",
          "Je prends les déceptions tellement à cœur que je les oublie difficilement",
          "Je suis une personne posée", "Je deviens tendu(e) et agité(e) quand je réfléchis à mes soucis",
        ],
      },
    ],
    answerScales: {
      intensity: [
        { value: 1, label: "Pas du tout" },
        { value: 2, label: "Un peu" },
        { value: 3, label: "Modérément" },
        { value: 4, label: "Beaucoup" },
      ],
    },
    scoring: {
      ranges: [
        { min: 20, max: 35, interpretation: "Anxiété très faible" },
        { min: 36, max: 45, interpretation: "Anxiété faible" },
        { min: 46, max: 55, interpretation: "Anxiété moyenne" },
        { min: 56, max: 65, interpretation: "Anxiété élevée" },
        { min: 66, max: 80, interpretation: "Anxiété très élevée" },
      ],
      method: "Pour chaque partie (État et Trait), additionnez les scores (1-4) des 20 items.",
    },
  },
  {
    id: "traumatismes-pcl5",
    title: "PCL-5 - Liste de Vérification du TSPT",
    description: "Une échelle de 20 items évaluant les symptômes du trouble de stress post-traumatique (TSPT)",
    category: "Traumatismes",
    estimatedTime: "5-10 minutes",
    formType: "single-scale",
    longDescription: "La PCL-5 (Post-traumatic Stress Disorder Checklist) est un questionnaire d'auto-évaluation de 20 items qui évalue la présence et la sévérité des symptômes du TSPT selon les critères du DSM-5.",
    questions: [
      "Des souvenirs répétés, pénibles et involontaires de l'expérience stressante ?",
      "Des rêves répétés et pénibles de l'expérience stressante ?",
      "Se sentir ou agir soudainement comme si vous viviez à nouveau l'expérience stressante ?",
      "Se sentir mal quand quelque chose vous rappelle l'événement ?",
      "Avoir de fortes réactions physiques lorsque quelque chose vous rappelle l'événement ?",
      "Essayer d'éviter les souvenirs, pensées, et sentiments liés à l'événement ?",
      "Essayer d'éviter les personnes et les choses qui vous rappellent l'expérience stressante ?",
      "Des difficultés à vous rappeler des parties importantes de l'événement ?",
      "Des croyances négatives sur vous-même, les autres, le monde ?",
      "Vous blâmer ou blâmer quelqu'un d'autre pour l'événement ?",
      "Avoir des sentiments négatifs intenses tels que peur, horreur, colère, culpabilité, ou honte ?",
      "Perdre de l'intérêt pour des activités que vous aimiez auparavant ?",
      "Vous sentir distant ou coupé des autres ?",
      "Avoir du mal à éprouver des sentiments positifs ?",
      "Comportement irritable, explosions de colère, ou agir agressivement ?",
      "Prendre des risques inconsidérés ou encore avoir des conduites qui pourraient vous mettre en danger ?",
      "Être en état de « super-alerte », hyper vigilant ou sur vos gardes ?",
      "Sursauter facilement ?",
      "Avoir du mal à vous concentrer ?",
      "Avoir du mal à trouver le sommeil ou à rester endormi ?",
    ],
    answerScales: {
      intensity: [
        { value: 0, label: "Pas du tout" },
        { value: 1, label: "Un peu" },
        { value: 2, label: "Modérément" },
        { value: 3, label: "Beaucoup" },
        { value: 4, label: "Extrêmement" },
      ],
    },
    scoring: {
      ranges: [
        { min: 0, max: 32, interpretation: "Pas de trouble de stress post-traumatique" },
        { min: 33, max: 80, interpretation: "Présence éventuelle d'un trouble de stress post-traumatique" },
      ],
      method: "Additionnez les scores de chaque item (0-4). Le score total varie de 0 à 80. Un score total de 33 ou plus suggère un diagnostic probable de TSPT.",
    },
  },
  {
    id: "index-symptomes-ybocs",
    title: "Y-BOCS - Index des Symptômes Obsessionnels-Compulsifs",
    description: "Une échelle d'évaluation des symptômes obsessionnels-compulsifs mesurant la sévérité du TOC",
    category: "Troubles Obsessionnels Compulsifs",
    estimatedTime: "15-20 minutes",
    formType: "options",
    longDescription: "L'échelle Y-BOCS (Yale-Brown Obsessive Compulsive Scale) est l'outil de référence pour évaluer la sévérité des symptômes du trouble obsessionnel-compulsif (TOC).",
    questions: [
      { title: "Temps accaparé par les pensées obsédantes:", options: [{ value: 0, text: "Aucune" }, { value: 1, text: "Moins d'une heure par jour" }, { value: 2, text: "Entre une et trois heures par jour" }, { value: 3, text: "Entre trois et huit heures par jour" }, { value: 4, text: "Plus de huit heures par jour" }] },
      { title: "Interférence causée par les pensées obsédantes:", options: [{ value: 0, text: "Aucune interférence" }, { value: 1, text: "Nuisent un peu" }, { value: 2, text: "Nuisent sans aucun doute" }, { value: 3, text: "Nuisent considérablement" }, { value: 4, text: "M'empêchent de fonctionner" }] },
      { title: "Détresse occasionnée par les pensées obsédantes:", options: [{ value: 0, text: "Pas du tout" }, { value: 1, text: "Un peu" }, { value: 2, text: "À un niveau tolérable" }, { value: 3, text: "Énormément" }, { value: 4, text: "Détresse invalidante" }] },
      { title: "Résistance opposée aux obsessions:", options: [{ value: 0, text: "J'essaie toujours de leur résister" }, { value: 1, text: "J'essaie de leur résister la plupart du temps" }, { value: 2, text: "Je fais certains efforts" }, { value: 3, text: "Je cède à contrecœur" }, { value: 4, text: "Je cède complètement" }] },
      { title: "Degré d'emprise sur les pensées obsédantes:", options: [{ value: 0, text: "Je les maîtrise complètement" }, { value: 1, text: "J'arrive généralement à les refreiner" }, { value: 2, text: "J'arrive parfois à les refréner" }, { value: 3, text: "J'arrive rarement à les refréner" }, { value: 4, text: "Je n'ai aucune emprise" }] },
      { title: "Temps accaparé par les comportements compulsifs:", options: [{ value: 0, text: "Aucune" }, { value: 1, text: "Moins d'une heure par jour" }, { value: 2, text: "Entre une et trois heures par jour" }, { value: 3, text: "Entre trois et huit heures par jour" }, { value: 4, text: "Plus de huit heures par jour" }] },
      { title: "Interférence causée par les comportements compulsifs:", options: [{ value: 0, text: "Aucune interférence" }, { value: 1, text: "Nuisent un peu" }, { value: 2, text: "Nuisent sans aucun doute" }, { value: 3, text: "Nuisent considérablement" }, { value: 4, text: "M'empêchent de fonctionner" }] },
      { title: "Détresse occasionnée par les comportements compulsifs:", options: [{ value: 0, text: "Je ne me sentirais nullement angoissé(e)" }, { value: 1, text: "Je me sentirais un peu angoissé(e)" }, { value: 2, text: "À un niveau tolérable" }, { value: 3, text: "Je me sentirais très angoissé(e)" }, { value: 4, text: "Extrêmement angoissé(e)" }] },
      { title: "Résistance opposée aux compulsions:", options: [{ value: 0, text: "J'essaie toujours de leur résister" }, { value: 1, text: "J'essaie de leur résister la plupart du temps" }, { value: 2, text: "Je fais certains efforts" }, { value: 3, text: "Je cède à contrecœur" }, { value: 4, text: "Je cède complètement" }] },
      { title: "Degré d'emprise sur les compulsions:", options: [{ value: 0, text: "Je les maîtrise complètement" }, { value: 1, text: "J'arrive généralement à me dominer" }, { value: 2, text: "J'arrive à me dominer avec beaucoup d'efforts" }, { value: 3, text: "J'arrive seulement à en retarder l'accomplissement" }, { value: 4, text: "J'éprouve un besoin irrésistible" }] },
    ],
    answerScales: {},
    scoring: {
      ranges: [
        { min: 0, max: 7, interpretation: "Symptômes sous-cliniques" },
        { min: 8, max: 15, interpretation: "TOC léger" },
        { min: 16, max: 23, interpretation: "TOC modéré" },
        { min: 24, max: 31, interpretation: "TOC sévère" },
        { min: 32, max: 40, interpretation: "TOC extrême" },
      ],
      method: "Additionnez les scores (0-4) pour chaque item. Le score total varie de 0 à 40.",
    },
  },
];

async function main() {
  console.log('Seeding scales...');

  // Delete old scales that don't match new IDs
  const oldScaleIds = [
    'echelle-d-evaluation-de-l-anxiete-de-hamilton',
    'echelle-d-obsession-compulsion-de-yale-brown',
    'checklist-du-trouble-de-stress-post-traumatique',
  ];

  for (const id of oldScaleIds) {
    try {
      await prisma.scale.delete({ where: { id } });
      console.log(`  ✗ Deleted old scale: ${id}`);
    } catch {
      // Scale doesn't exist, ignore
    }
  }

  // Upsert all scales
  for (const s of scales) {
    await prisma.scale.upsert({
      where: { id: s.id },
      update: {
        title: s.title,
        description: s.description,
        longDescription: s.longDescription,
        category: s.category,
        estimatedTime: s.estimatedTime,
        formType: s.formType,
        questions: s.questions,
        answerScales: s.answerScales,
        scoring: s.scoring,
      },
      create: {
        id: s.id,
        title: s.title,
        description: s.description,
        longDescription: s.longDescription,
        category: s.category,
        estimatedTime: s.estimatedTime,
        formType: s.formType,
        questions: s.questions,
        answerScales: s.answerScales,
        scoring: s.scoring,
      },
    });
    console.log(`  ✓ ${s.title}`);
  }

  // ============================================
  // TEST ACCOUNT WITH FULL DATA
  // ============================================
  console.log('\n📦 Seeding test account...');

  const TEST_EMAIL = 'test@test.test';
  const TEST_PASSWORD = 'testtest';
  const passwordHash = await bcrypt.hash(TEST_PASSWORD, 10);

  // Create or update test user
  const testUser = await prisma.user.upsert({
    where: { email: TEST_EMAIL },
    update: { passwordHash, firstName: 'Marie', lastName: 'Dupont', isPremium: true },
    create: {
      email: TEST_EMAIL,
      passwordHash,
      firstName: 'Marie',
      lastName: 'Dupont',
      role: 'PRACTITIONER',
      isPremium: true,
      emailVerified: new Date(),
    },
  });
  console.log(`  ✓ User: ${TEST_EMAIL} / ${TEST_PASSWORD}`);

  // Profile with favorite scales
  await prisma.profile.upsert({
    where: { userId: testUser.id },
    update: { favoriteScales: ['inventaire-de-depression-de-beck', 'stai-anxiete-generalisee', 'echelle-d-anxiete-sociale-de-liebowitz'] },
    create: {
      userId: testUser.id,
      favoriteScales: ['inventaire-de-depression-de-beck', 'stai-anxiete-generalisee', 'echelle-d-anxiete-sociale-de-liebowitz'],
      preferences: { theme: 'light', notifications: true },
    },
  });
  console.log('  ✓ Profile with favorite scales');

  // Create patients
  const patientsData = [
    { firstName: 'Lucas', lastName: 'Martin', email: 'lucas.martin@email.com', birthDate: new Date('1990-03-15'), notes: 'Suivi anxiété sociale depuis janvier 2026. Progrès notables.' },
    { firstName: 'Emma', lastName: 'Bernard', email: 'emma.bernard@email.com', birthDate: new Date('1985-07-22'), notes: 'Dépression modérée. Thérapie cognitive en cours.' },
    { firstName: 'Hugo', lastName: 'Petit', email: 'hugo.petit@email.com', birthDate: new Date('1998-11-03'), notes: 'TSPT suite accident. Début de prise en charge.' },
    { firstName: 'Chloé', lastName: 'Robert', email: 'chloe.robert@email.com', birthDate: new Date('1978-01-30'), notes: 'TOC - rituels de vérification. Sous traitement.' },
    { firstName: 'Théo', lastName: 'Richard', email: 'theo.richard@email.com', birthDate: null, notes: null },
    { firstName: 'Léa', lastName: 'Moreau', email: 'lea.moreau@email.com', birthDate: new Date('2001-09-12'), notes: 'Anxiété de performance. Étudiante en médecine.' },
  ];

  const patients: Record<string, any> = {};
  for (const p of patientsData) {
    const patient = await prisma.patient.upsert({
      where: { practitionerId_email: { practitionerId: testUser.id, email: p.email } },
      update: { firstName: p.firstName, lastName: p.lastName, birthDate: p.birthDate, notes: p.notes },
      create: { ...p, practitionerId: testUser.id },
    });
    patients[p.firstName] = patient;
    console.log(`  ✓ Patient: ${p.firstName} ${p.lastName}`);
  }

  // Archive one patient (Théo - no data)
  await prisma.patient.update({
    where: { id: patients['Théo'].id },
    data: { archivedAt: new Date('2026-01-15') },
  });
  console.log('  ✓ Archived patient: Théo Richard');

  // Helper to create sessions
  const now = new Date();
  const daysAgo = (d: number) => new Date(now.getTime() - d * 86400000);

  // Delete existing sessions for test user to avoid duplicates
  await prisma.session.deleteMany({ where: { practitionerId: testUser.id } });

  // ---- SESSIONS ----
  const sessionsData = [
    // Lucas - Liebowitz: completed sessions showing improvement over time
    {
      scaleId: 'echelle-d-anxiete-sociale-de-liebowitz',
      patientId: patients['Lucas'].id,
      status: SessionStatus.COMPLETED,
      sentAt: daysAgo(90),
      startedAt: daysAgo(89),
      completedAt: daysAgo(89),
      responses: JSON.stringify({ answers: Array.from({ length: 24 }, (_, i) => ({ questionId: i + 1, anxiety: 2, avoidance: 2 })) }),
      score: JSON.stringify({ totalScore: 96, maxTotal: 144, anxietyScore: 48, avoidanceScore: 48, maxAnxiety: 72, maxAvoidance: 72, interpretation: 'Anxiété sociale sévère' }),
      interpretation: 'Anxiété sociale sévère',
    },
    {
      scaleId: 'echelle-d-anxiete-sociale-de-liebowitz',
      patientId: patients['Lucas'].id,
      status: SessionStatus.COMPLETED,
      sentAt: daysAgo(30),
      startedAt: daysAgo(29),
      completedAt: daysAgo(29),
      responses: JSON.stringify({ answers: Array.from({ length: 24 }, (_, i) => ({ questionId: i + 1, anxiety: 1, avoidance: 1 })) }),
      score: JSON.stringify({ totalScore: 48, maxTotal: 144, anxietyScore: 24, avoidanceScore: 24, maxAnxiety: 72, maxAvoidance: 72, interpretation: 'Anxiété sociale légère' }),
      interpretation: 'Anxiété sociale légère',
    },
    // Lucas - BDI completed
    {
      scaleId: 'inventaire-de-depression-de-beck',
      patientId: patients['Lucas'].id,
      status: SessionStatus.COMPLETED,
      sentAt: daysAgo(30),
      startedAt: daysAgo(29),
      completedAt: daysAgo(29),
      batchId: 'batch-lucas-1',
      responses: JSON.stringify({ answers: Array.from({ length: 21 }, (_, i) => ({ questionId: i + 1, value: 0 })) }),
      score: JSON.stringify({ totalScore: 5, maxTotal: 63, interpretation: 'Dépression minimale' }),
      interpretation: 'Dépression minimale',
    },

    // Emma - BDI: multiple completed showing depression trajectory
    {
      scaleId: 'inventaire-de-depression-de-beck',
      patientId: patients['Emma'].id,
      status: SessionStatus.COMPLETED,
      sentAt: daysAgo(60),
      startedAt: daysAgo(59),
      completedAt: daysAgo(59),
      responses: JSON.stringify({ answers: Array.from({ length: 21 }, (_, i) => ({ questionId: i + 1, value: 2 })) }),
      score: JSON.stringify({ totalScore: 28, maxTotal: 63, interpretation: 'Dépression modérée' }),
      interpretation: 'Dépression modérée',
    },
    {
      scaleId: 'inventaire-de-depression-de-beck',
      patientId: patients['Emma'].id,
      status: SessionStatus.COMPLETED,
      sentAt: daysAgo(14),
      startedAt: daysAgo(13),
      completedAt: daysAgo(13),
      responses: JSON.stringify({ answers: Array.from({ length: 21 }, (_, i) => ({ questionId: i + 1, value: 1 })) }),
      score: JSON.stringify({ totalScore: 16, maxTotal: 63, interpretation: 'Dépression légère' }),
      interpretation: 'Dépression légère',
    },
    // Emma - STAI completed
    {
      scaleId: 'stai-anxiete-generalisee',
      patientId: patients['Emma'].id,
      status: SessionStatus.COMPLETED,
      sentAt: daysAgo(14),
      startedAt: daysAgo(13),
      completedAt: daysAgo(13),
      batchId: 'batch-emma-1',
      responses: JSON.stringify({ answers: Array.from({ length: 40 }, (_, i) => ({ questionId: i + 1, value: 2 })) }),
      score: JSON.stringify({ totalScore: 100, maxTotal: 160, stateScore: 50, traitScore: 50, maxState: 80, maxTrait: 80, interpretation: { state: 'Anxiété modérée', trait: 'Anxiété modérée' } }),
      interpretation: JSON.stringify({ state: 'Anxiété modérée', trait: 'Anxiété modérée' }),
    },

    // Hugo - PCL-5 completed
    {
      scaleId: 'traumatismes-pcl5',
      patientId: patients['Hugo'].id,
      status: SessionStatus.COMPLETED,
      sentAt: daysAgo(7),
      startedAt: daysAgo(6),
      completedAt: daysAgo(6),
      responses: JSON.stringify({ answers: Array.from({ length: 20 }, (_, i) => ({ questionId: i + 1, value: 3 })) }),
      score: JSON.stringify({ totalScore: 60, maxTotal: 80, interpretation: 'Présence éventuelle d\'un trouble de stress post-traumatique' }),
      interpretation: 'Présence éventuelle d\'un trouble de stress post-traumatique',
      patientComments: 'J\'ai eu du mal à répondre aux questions sur les cauchemars.',
    },

    // Chloé - Y-BOCS completed
    {
      scaleId: 'index-symptomes-ybocs',
      patientId: patients['Chloé'].id,
      status: SessionStatus.COMPLETED,
      sentAt: daysAgo(21),
      startedAt: daysAgo(20),
      completedAt: daysAgo(20),
      responses: JSON.stringify({ answers: Array.from({ length: 10 }, (_, i) => ({ questionId: i + 1, value: 3 })) }),
      score: JSON.stringify({ totalScore: 30, maxTotal: 40, interpretation: 'TOC sévère' }),
      interpretation: 'TOC sévère',
    },

    // Léa - STAI: sent but not started yet
    {
      scaleId: 'stai-anxiete-generalisee',
      patientId: patients['Léa'].id,
      status: SessionStatus.SENT,
      sentAt: daysAgo(1),
      expiresAt: new Date(now.getTime() + 6 * 86400000),
    },

    // Léa - BDI: started but not completed
    {
      scaleId: 'inventaire-de-depression-de-beck',
      patientId: patients['Léa'].id,
      status: SessionStatus.STARTED,
      sentAt: daysAgo(3),
      startedAt: daysAgo(2),
      expiresAt: new Date(now.getTime() + 4 * 86400000),
    },

    // Hugo - Liebowitz: expired
    {
      scaleId: 'echelle-d-anxiete-sociale-de-liebowitz',
      patientId: patients['Hugo'].id,
      status: SessionStatus.EXPIRED,
      sentAt: daysAgo(30),
      expiresAt: daysAgo(23),
    },

    // Emma - PCL-5: cancelled
    {
      scaleId: 'traumatismes-pcl5',
      patientId: patients['Emma'].id,
      status: SessionStatus.CANCELLED,
      sentAt: daysAgo(10),
      createdAt: daysAgo(10),
    },

    // Lucas - STAI: just created, not sent
    {
      scaleId: 'stai-anxiete-generalisee',
      patientId: patients['Lucas'].id,
      status: SessionStatus.CREATED,
    },
  ];

  for (const s of sessionsData) {
    await prisma.session.create({
      data: { ...s, practitionerId: testUser.id },
    });
  }
  console.log(`  ✓ ${sessionsData.length} sessions (all statuses)`);

  // ---- EMAIL LOGS ----
  await prisma.emailLog.createMany({
    data: [
      { to: 'lucas.martin@email.com', from: 'noreply@melya.app', subject: 'Questionnaire à compléter - Liebowitz', sessionId: null, status: 'sent', provider: 'resend', sentAt: daysAgo(90) },
      { to: 'lucas.martin@email.com', from: 'noreply@melya.app', subject: 'Questionnaire à compléter - BDI', sessionId: null, status: 'sent', provider: 'resend', sentAt: daysAgo(30) },
      { to: 'emma.bernard@email.com', from: 'noreply@melya.app', subject: 'Questionnaire à compléter - BDI', sessionId: null, status: 'sent', provider: 'resend', sentAt: daysAgo(14) },
      { to: 'hugo.petit@email.com', from: 'noreply@melya.app', subject: 'Questionnaire à compléter - PCL-5', sessionId: null, status: 'sent', provider: 'resend', sentAt: daysAgo(7) },
      { to: 'lea.moreau@email.com', from: 'noreply@melya.app', subject: 'Questionnaire à compléter - STAI', sessionId: null, status: 'failed', provider: 'resend', error: 'Temporary Resend API error', sentAt: daysAgo(2) },
      { to: 'lea.moreau@email.com', from: 'noreply@melya.app', subject: 'Questionnaire à compléter - STAI', sessionId: null, status: 'sent', provider: 'resend', sentAt: daysAgo(1) },
    ],
  });
  console.log('  ✓ Email logs (sent + failed)');

  // ---- AUDIT LOGS ----
  await prisma.auditLog.createMany({
    data: [
      { userId: testUser.id, action: 'USER_LOGIN', resource: 'User', resourceId: testUser.id, ipAddress: '127.0.0.1', userAgent: 'Mozilla/5.0', timestamp: daysAgo(1) },
      { userId: testUser.id, action: 'PATIENT_CREATED', resource: 'Patient', resourceId: patients['Lucas'].id, metadata: { firstName: 'Lucas', lastName: 'Martin' }, timestamp: daysAgo(90) },
      { userId: testUser.id, action: 'SESSION_CREATED', resource: 'Session', metadata: { scaleId: 'bdi', patientName: 'Emma Bernard' }, timestamp: daysAgo(60) },
      { userId: testUser.id, action: 'DATA_ACCESSED', resource: 'Session', metadata: { action: 'view_results' }, timestamp: daysAgo(5) },
      { userId: testUser.id, action: 'PATIENT_ARCHIVED', resource: 'Patient', resourceId: patients['Théo'].id, timestamp: daysAgo(30) },
    ],
  });
  console.log('  ✓ Audit logs');

  console.log('\n✅ Seeding complete!');
  console.log(`\n🔑 Test account: ${TEST_EMAIL} / ${TEST_PASSWORD}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

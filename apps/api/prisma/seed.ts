import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const scales: {
  id: string;
  title: string;
  description: string;
  category: string;
  estimatedTime: string;
  longDescription: string;
  questions: Prisma.InputJsonValue;
  answerScales: Prisma.InputJsonValue;
  scoring: Prisma.InputJsonValue;
}[] = [
  {
    id: "echelle-d-anxiete-sociale-de-liebowitz",
    title: "Échelle d'anxiété sociale de Liebowitz",
    description: "Un questionnaire clinique de 24 items qui mesure la peur et l'évitement dans des situations sociales et de performance",
    category: "Anxiété sociale",
    estimatedTime: "10-15 minutes",
    longDescription: "L'Échelle d'anxiété sociale de Liebowitz (LSAS) est un questionnaire développé par le psychiatre Michael Liebowitz pour évaluer la gravité de l'anxiété sociale.",
    questions: [],
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
    },
  },
  {
    id: "inventaire-de-depression-de-beck",
    title: "Inventaire de Dépression de Beck (BDI)",
    description: "Un questionnaire d'auto-évaluation à choix multiples de 21 questions pour mesurer la sévérité de la dépression",
    category: "Dépression",
    estimatedTime: "10-15 minutes",
    longDescription: "L'Inventaire de Dépression de Beck (BDI) est un questionnaire d'auto-évaluation à choix multiples de 21 questions.",
    questions: [],
    answerScales: {},
    scoring: {
      ranges: [
        { min: 0, max: 13, interpretation: "Dépression minimale" },
        { min: 14, max: 19, interpretation: "Dépression légère" },
        { min: 20, max: 28, interpretation: "Dépression modérée" },
        { min: 29, max: 63, interpretation: "Dépression sévère" },
      ],
    },
  },
  {
    id: "echelle-d-evaluation-de-l-anxiete-de-hamilton",
    title: "Échelle d'évaluation de l'anxiété de Hamilton (HAM-A)",
    description: "Une échelle clinique de 14 items évaluant la sévérité des symptômes anxieux",
    category: "Anxiété",
    estimatedTime: "15-20 minutes",
    longDescription: "L'échelle d'évaluation de l'anxiété de Hamilton (HAM-A) est un questionnaire psychologique utilisé par les cliniciens pour évaluer la sévérité de l'anxiété d'un patient.",
    questions: [],
    answerScales: {},
    scoring: {
      ranges: [
        { min: 0, max: 17, interpretation: "Anxiété légère" },
        { min: 18, max: 24, interpretation: "Anxiété légère à modérée" },
        { min: 25, max: 30, interpretation: "Anxiété modérée à sévère" },
      ],
    },
  },
  {
    id: "echelle-d-obsession-compulsion-de-yale-brown",
    title: "Échelle d'obsession-compulsion de Yale-Brown (Y-BOCS)",
    description: "Une échelle clinique de 10 items mesurant la sévérité des symptômes obsessionnels-compulsifs",
    category: "TOC",
    estimatedTime: "15-20 minutes",
    longDescription: "L'échelle d'obsession-compulsion de Yale-Brown est un test permettant d'évaluer la sévérité des symptômes du trouble obsessionnel-compulsif.",
    questions: [],
    answerScales: {},
    scoring: {
      ranges: [
        { min: 0, max: 7, interpretation: "TOC sous-clinique" },
        { min: 8, max: 15, interpretation: "TOC léger" },
        { min: 16, max: 23, interpretation: "TOC modéré" },
        { min: 24, max: 31, interpretation: "TOC sévère" },
        { min: 32, max: 40, interpretation: "TOC extrême" },
      ],
    },
  },
  {
    id: "checklist-du-trouble-de-stress-post-traumatique",
    title: "Checklist du trouble de stress post-traumatique (PCL-5)",
    description: "Un questionnaire d'auto-évaluation de 20 items évaluant les symptômes du TSPT selon le DSM-5",
    category: "Trauma",
    estimatedTime: "5-10 minutes",
    longDescription: "La PCL-5 est un questionnaire d'auto-évaluation de 20 items qui évalue les symptômes du TSPT selon les critères du DSM-5.",
    questions: [],
    answerScales: {},
    scoring: {
      ranges: [
        { min: 0, max: 30, interpretation: "Symptômes légers" },
        { min: 31, max: 33, interpretation: "Seuil clinique probable" },
        { min: 34, max: 80, interpretation: "TSPT probable" },
      ],
    },
  },
];

async function main() {
  console.log('Seeding scales...');

  for (const s of scales) {
    await prisma.scale.upsert({
      where: { id: s.id },
      update: {
        title: s.title,
        description: s.description,
        longDescription: s.longDescription,
        category: s.category,
        estimatedTime: s.estimatedTime,
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
        questions: s.questions,
        answerScales: s.answerScales,
        scoring: s.scoring,
      },
    });
    console.log(`  ✓ ${s.title}`);
  }

  console.log('Seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

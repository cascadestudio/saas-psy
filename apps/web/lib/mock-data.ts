import type { Patient, Session } from "@/lib/api-client";

const daysAgo = (days: number) => {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString();
};

const indexed = (
  prefix: string,
  values: number[],
): Record<string, number> =>
  Object.fromEntries(values.map((v, i) => [`${prefix}_${i}`, v]));

export const MOCK_PATIENTS: Patient[] = [
  {
    id: "mock-patient-1",
    firstName: "Marie",
    lastName: "Dupont",
    email: "marie.dupont@example.com",
    birthDate: "1989-05-14",
    notes: "Suivi pour anxiété sociale. Début du suivi en janvier.",
    createdAt: daysAgo(120),
    updatedAt: daysAgo(2),
    archivedAt: null,
  },
  {
    id: "mock-patient-2",
    firstName: "Jean",
    lastName: "Martin",
    email: "jean.martin@example.com",
    birthDate: "1976-11-02",
    notes: "Symptômes dépressifs modérés.",
    createdAt: daysAgo(90),
    updatedAt: daysAgo(5),
    archivedAt: null,
  },
  {
    id: "mock-patient-3",
    firstName: "Sophie",
    lastName: "Bernard",
    email: "sophie.bernard@example.com",
    birthDate: "1995-03-22",
    createdAt: daysAgo(60),
    updatedAt: daysAgo(1),
    archivedAt: null,
  },
  {
    id: "mock-patient-4",
    firstName: "Lucas",
    lastName: "Moreau",
    email: "lucas.moreau@example.com",
    birthDate: "1982-09-08",
    createdAt: daysAgo(200),
    updatedAt: daysAgo(40),
    archivedAt: null,
  },
];

const patientById = Object.fromEntries(MOCK_PATIENTS.map((p) => [p.id, p]));

export const MOCK_SESSIONS: Session[] = [
  // À relancer : envoyée il y a 9 jours, pas démarrée
  {
    id: "mock-session-1",
    patientId: "mock-patient-1",
    scaleId: "phq-9",
    status: "SENT",
    sentAt: daysAgo(9),
    createdAt: daysAgo(9),
    updatedAt: daysAgo(9),
    patient: patientById["mock-patient-1"],
  },
  // À relancer : démarrée mais pas finie
  {
    id: "mock-session-2",
    patientId: "mock-patient-3",
    scaleId: "gad-7",
    status: "STARTED",
    sentAt: daysAgo(11),
    startedAt: daysAgo(8),
    createdAt: daysAgo(11),
    updatedAt: daysAgo(8),
    patient: patientById["mock-patient-3"],
  },
  // Résultat récent non lu
  {
    id: "mock-session-3",
    patientId: "mock-patient-2",
    scaleId: "echelle-d-anxiete-sociale-de-liebowitz",
    status: "COMPLETED",
    sentAt: daysAgo(5),
    startedAt: daysAgo(4),
    completedAt: daysAgo(2),
    responses: {
      ...indexed("anxiety", [
        2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1,
      ]),
      ...indexed("avoidance", [
        2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1,
      ]),
    },
    score: {
      totalScore: 67,
      maxScore: 144,
      interpretation: "Anxiété sociale marquée",
      severityIndex: 2,
      severityRangeCount: 4,
      subscores: [
        { key: "anxiety", label: "Anxiété", value: 35, max: 72 },
        { key: "avoidance", label: "Évitement", value: 32, max: 72 },
      ],
    },
    interpretation: "Anxiété sociale marquée",
    createdAt: daysAgo(5),
    updatedAt: daysAgo(2),
    patient: patientById["mock-patient-2"],
  },
  // Résultat récent lu
  {
    id: "mock-session-4",
    patientId: "mock-patient-1",
    scaleId: "rses",
    status: "COMPLETED",
    sentAt: daysAgo(8),
    startedAt: daysAgo(7),
    completedAt: daysAgo(6),
    viewedAt: daysAgo(5),
    responses: indexed("intensity", [2, 2, 3, 2, 3, 2, 3, 3, 3, 2]),
    score: {
      totalScore: 22,
      maxScore: 40,
      interpretation:
        "Plus le score est élevé, plus l'estime de soi est élevée.",
      severityIndex: 0,
      severityRangeCount: 1,
    },
    interpretation: "Estime de soi moyenne",
    createdAt: daysAgo(8),
    updatedAt: daysAgo(5),
    patient: patientById["mock-patient-1"],
  },
  // Résultat récent
  {
    id: "mock-session-5",
    patientId: "mock-patient-4",
    scaleId: "traumatismes-pcl5",
    status: "COMPLETED",
    sentAt: daysAgo(15),
    startedAt: daysAgo(14),
    completedAt: daysAgo(13),
    viewedAt: daysAgo(12),
    responses: indexed("intensity", [
      3, 3, 2, 2, 2, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1,
    ]),
    score: {
      totalScore: 41,
      maxScore: 80,
      interpretation:
        "Présence éventuelle d'un trouble de stress post-traumatique",
      severityIndex: 1,
      severityRangeCount: 2,
      subscores: [
        { key: "cluster-b", label: "Intrusions (B)", value: 12, max: 20 },
        { key: "cluster-c", label: "Évitement (C)", value: 5, max: 8 },
        { key: "cluster-d", label: "Cognitions et humeur (D)", value: 14, max: 28 },
        { key: "cluster-e", label: "Hyperéveil (E)", value: 10, max: 24 },
      ],
      alerts: [
        {
          kind: "diagnostic-threshold",
          severity: "warning",
          message:
            "Selon les critères DSM-5, ce profil correspond à un diagnostic provisoire de TSPT (≥1B, ≥1C, ≥2D, ≥2E avec items cotés ≥ 2). Confirmation requise par évaluation clinique structurée.",
        },
      ],
    },
    interpretation:
      "Présence éventuelle d'un trouble de stress post-traumatique",
    patientComments:
      "J'ai eu du mal à répondre aux questions sur les cauchemars, ça reste flou. Les nuits sont compliquées depuis la rentrée.",
    createdAt: daysAgo(15),
    updatedAt: daysAgo(12),
    patient: patientById["mock-patient-4"],
  },
  // Récente envoyée (pas encore à relancer)
  {
    id: "mock-session-6",
    patientId: "mock-patient-2",
    scaleId: "phq-9",
    status: "SENT",
    sentAt: daysAgo(1),
    createdAt: daysAgo(1),
    updatedAt: daysAgo(1),
    patient: patientById["mock-patient-2"],
  },
  // Historique : ancien résultat pour Marie
  {
    id: "mock-session-7",
    patientId: "mock-patient-1",
    scaleId: "phq-9",
    status: "COMPLETED",
    sentAt: daysAgo(45),
    startedAt: daysAgo(44),
    completedAt: daysAgo(43),
    viewedAt: daysAgo(42),
    responses: indexed("intensity", [2, 2, 2, 1, 2, 2, 1, 1, 1]),
    score: {
      totalScore: 14,
      maxScore: 27,
      interpretation: "Dépression modérée",
      severityIndex: 2,
      severityRangeCount: 5,
      alerts: [
        {
          kind: "suicide-ideation",
          severity: "warning",
          message:
            "Idéation suicidaire endossée à l'item 9 (cotation 1). Évaluation clinique du risque suicidaire recommandée.",
          itemIndex: 8,
        },
      ],
    },
    interpretation: "Dépression modérée",
    patientComments:
      "Je me sens mieux qu'au début du suivi mais les matins restent durs.",
    createdAt: daysAgo(45),
    updatedAt: daysAgo(42),
    patient: patientById["mock-patient-1"],
  },
  // Historique pour TrendBlock — PHQ-9 plus ancien de Marie (T0, score plus haut → amélioration vs T-7)
  {
    id: "mock-session-8",
    patientId: "mock-patient-1",
    scaleId: "phq-9",
    status: "COMPLETED",
    sentAt: daysAgo(90),
    startedAt: daysAgo(89),
    completedAt: daysAgo(88),
    viewedAt: daysAgo(85),
    responses: indexed("intensity", [3, 3, 2, 2, 2, 3, 2, 2, 1]),
    score: {
      totalScore: 20,
      maxScore: 27,
      interpretation: "Dépression sévère",
      severityIndex: 4,
      severityRangeCount: 5,
      alerts: [
        {
          kind: "suicide-ideation",
          severity: "warning",
          message:
            "Idéation suicidaire endossée à l'item 9 (cotation 1). Évaluation clinique du risque suicidaire recommandée.",
          itemIndex: 8,
        },
      ],
    },
    interpretation: "Dépression sévère",
    createdAt: daysAgo(90),
    updatedAt: daysAgo(85),
    patient: patientById["mock-patient-1"],
  },
  // Historique — LSAS plus ancien de Jean (score plus haut → amélioration vs mock-3)
  {
    id: "mock-session-9",
    patientId: "mock-patient-2",
    scaleId: "echelle-d-anxiete-sociale-de-liebowitz",
    status: "COMPLETED",
    sentAt: daysAgo(60),
    startedAt: daysAgo(59),
    completedAt: daysAgo(58),
    viewedAt: daysAgo(57),
    responses: {
      ...indexed("anxiety", [
        3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2,
      ]),
      ...indexed("avoidance", [
        3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2,
      ]),
    },
    score: {
      totalScore: 110,
      maxScore: 144,
      interpretation: "Anxiété sociale sévère",
      severityIndex: 3,
      severityRangeCount: 4,
      subscores: [
        { key: "anxiety", label: "Anxiété", value: 56, max: 72 },
        { key: "avoidance", label: "Évitement", value: 54, max: 72 },
      ],
    },
    interpretation: "Anxiété sociale sévère",
    createdAt: daysAgo(60),
    updatedAt: daysAgo(57),
    patient: patientById["mock-patient-2"],
  },
  // Historique — RSES plus ancien de Marie (score plus bas → amélioration car higherIsBetter)
  {
    id: "mock-session-10",
    patientId: "mock-patient-1",
    scaleId: "rses",
    status: "COMPLETED",
    sentAt: daysAgo(75),
    startedAt: daysAgo(74),
    completedAt: daysAgo(73),
    viewedAt: daysAgo(70),
    responses: indexed("intensity", [2, 2, 3, 1, 3, 1, 2, 4, 4, 3]),
    score: {
      totalScore: 16,
      maxScore: 40,
      interpretation:
        "Plus le score est élevé, plus l'estime de soi est élevée.",
      severityIndex: 0,
      severityRangeCount: 1,
    },
    interpretation: "Estime de soi faible",
    createdAt: daysAgo(75),
    updatedAt: daysAgo(70),
    patient: patientById["mock-patient-1"],
  },
  // Historique — PCL-5 plus ancien de Lucas (score plus bas → aggravation vs mock-5)
  {
    id: "mock-session-11",
    patientId: "mock-patient-4",
    scaleId: "traumatismes-pcl5",
    status: "COMPLETED",
    sentAt: daysAgo(50),
    startedAt: daysAgo(49),
    completedAt: daysAgo(48),
    viewedAt: daysAgo(47),
    responses: indexed("intensity", [
      2, 2, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    ]),
    score: {
      totalScore: 24,
      maxScore: 80,
      interpretation: "Pas de trouble de stress post-traumatique",
      severityIndex: 0,
      severityRangeCount: 2,
      subscores: [
        { key: "cluster-b", label: "Intrusions (B)", value: 7, max: 20 },
        { key: "cluster-c", label: "Évitement (C)", value: 3, max: 8 },
        { key: "cluster-d", label: "Cognitions et humeur (D)", value: 8, max: 28 },
        { key: "cluster-e", label: "Hyperéveil (E)", value: 6, max: 24 },
      ],
    },
    interpretation: "Pas de trouble de stress post-traumatique",
    createdAt: daysAgo(50),
    updatedAt: daysAgo(47),
    patient: patientById["mock-patient-4"],
  },
  // Y-BOCS Sophie — couvre formType "options", sous-scores obsessions/compulsions
  {
    id: "mock-session-12",
    patientId: "mock-patient-3",
    scaleId: "index-symptomes-ybocs",
    status: "COMPLETED",
    sentAt: daysAgo(10),
    startedAt: daysAgo(9),
    completedAt: daysAgo(8),
    viewedAt: daysAgo(7),
    responses: indexed("option", [2, 3, 2, 3, 2, 2, 2, 2, 2, 2]),
    score: {
      totalScore: 22,
      maxScore: 40,
      interpretation: "TOC modéré",
      severityIndex: 2,
      severityRangeCount: 5,
      subscores: [
        { key: "obsessions", label: "Obsessions", value: 12, max: 20 },
        { key: "compulsions", label: "Compulsions", value: 10, max: 20 },
      ],
    },
    interpretation: "TOC modéré",
    createdAt: daysAgo(10),
    updatedAt: daysAgo(7),
    patient: patientById["mock-patient-3"],
  },
  // Historique Y-BOCS Sophie — score identique → trend "stable"
  {
    id: "mock-session-13",
    patientId: "mock-patient-3",
    scaleId: "index-symptomes-ybocs",
    status: "COMPLETED",
    sentAt: daysAgo(40),
    startedAt: daysAgo(39),
    completedAt: daysAgo(38),
    viewedAt: daysAgo(37),
    responses: indexed("option", [3, 2, 3, 2, 2, 2, 2, 2, 2, 2]),
    score: {
      totalScore: 22,
      maxScore: 40,
      interpretation: "TOC modéré",
      severityIndex: 2,
      severityRangeCount: 5,
      subscores: [
        { key: "obsessions", label: "Obsessions", value: 12, max: 20 },
        { key: "compulsions", label: "Compulsions", value: 10, max: 20 },
      ],
    },
    interpretation: "TOC modéré",
    createdAt: daysAgo(40),
    updatedAt: daysAgo(37),
    patient: patientById["mock-patient-3"],
  },
  // PHQ-9 Lucas — alerte CRITICAL (item 9 = 3) + pas d'historique → état sans trend/historique
  {
    id: "mock-session-14",
    patientId: "mock-patient-4",
    scaleId: "phq-9",
    status: "COMPLETED",
    sentAt: daysAgo(3),
    startedAt: daysAgo(2),
    completedAt: daysAgo(1),
    responses: indexed("intensity", [3, 3, 3, 2, 2, 2, 2, 2, 3]),
    score: {
      totalScore: 22,
      maxScore: 27,
      interpretation: "Dépression sévère",
      severityIndex: 4,
      severityRangeCount: 5,
      alerts: [
        {
          kind: "suicide-ideation",
          severity: "critical",
          message:
            "Idéation suicidaire endossée à l'item 9 avec une cotation de 3 (presque tous les jours). Évaluation immédiate du risque suicidaire requise — orientation vers un dispositif d'urgence à envisager.",
          itemIndex: 8,
        },
      ],
    },
    interpretation: "Dépression sévère",
    patientComments:
      "Je n'arrive plus à voir de raison de continuer comme ça. Tout me paraît sans issue.",
    createdAt: daysAgo(3),
    updatedAt: daysAgo(1),
    patient: patientById["mock-patient-4"],
  },
];

export const isMockId = (id: string | undefined | null): boolean =>
  !!id && id.startsWith("mock-");

export const getMockPatient = (id: string): Patient | null =>
  MOCK_PATIENTS.find((p) => p.id === id) ?? null;

export const getMockSession = (id: string): Session | null =>
  MOCK_SESSIONS.find((s) => s.id === id) ?? null;

export const getMockSessionsByPatient = (patientId: string): Session[] =>
  MOCK_SESSIONS.filter((s) => s.patientId === patientId);

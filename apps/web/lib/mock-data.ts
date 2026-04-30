import type { Patient, Session } from "@/lib/api-client";

const daysAgo = (days: number) => {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString();
};

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
    createdAt: daysAgo(45),
    updatedAt: daysAgo(42),
    patient: patientById["mock-patient-1"],
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

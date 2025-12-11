/**
 * Mock session data for demo prototype
 * Sessions represent questionnaire completions by patients
 */

export type SessionStatus = "completed" | "in_progress" | "sent" | "expired";

export interface MockSession {
  id: string;
  patientId: string;
  questionnaireId: string;
  status: SessionStatus;
  score: number | null;
  interpretation: string | null;
  sentAt: string;
  completedAt: string | null;
  batchId: string | null; // Groups sessions sent together
  answers?: Record<string, unknown>; // Questionnaire responses
}

export const mockSessions: MockSession[] = [
  // Patient A.M. (p1) - 3 sessions
  {
    id: "s1",
    patientId: "p1",
    questionnaireId: "inventaire-de-depression-de-beck",
    status: "completed",
    score: 28,
    interpretation: "Dépression modérée",
    sentAt: "2024-09-05T10:00:00Z",
    completedAt: "2024-09-05T14:30:00Z",
    batchId: null,
  },
  {
    id: "s2",
    patientId: "p1",
    questionnaireId: "inventaire-de-depression-de-beck",
    status: "completed",
    score: 22,
    interpretation: "Dépression légère",
    sentAt: "2024-10-15T09:00:00Z",
    completedAt: "2024-10-15T16:20:00Z",
    batchId: null,
  },
  {
    id: "s3",
    patientId: "p1",
    questionnaireId: "inventaire-de-depression-de-beck",
    status: "completed",
    score: 16,
    interpretation: "Dépression minimale",
    sentAt: "2024-12-01T11:00:00Z",
    completedAt: "2024-12-01T15:45:00Z",
    batchId: null,
  },

  // Patient L.D. (p2) - Multiple questionnaires sent together (batch)
  {
    id: "s4",
    patientId: "p2",
    questionnaireId: "inventaire-de-depression-de-beck",
    status: "completed",
    score: 18,
    interpretation: "Dépression légère",
    sentAt: "2024-12-03T09:00:00Z",
    completedAt: "2024-12-03T16:45:00Z",
    batchId: "batch_001",
  },
  {
    id: "s5",
    patientId: "p2",
    questionnaireId: "stai-anxiete-generalisee",
    status: "completed",
    score: 52,
    interpretation: "Anxiété moyenne",
    sentAt: "2024-12-03T09:00:00Z",
    completedAt: "2024-12-03T17:15:00Z",
    batchId: "batch_001",
  },

  // Patient J.R. (p3) - Multiple sessions over time
  {
    id: "s6",
    patientId: "p3",
    questionnaireId: "index-symptomes-ybocs",
    status: "completed",
    score: 28,
    interpretation: "TOC sévère",
    sentAt: "2024-10-25T10:00:00Z",
    completedAt: "2024-10-25T14:00:00Z",
    batchId: null,
  },
  {
    id: "s7",
    patientId: "p3",
    questionnaireId: "index-symptomes-ybocs",
    status: "completed",
    score: 22,
    interpretation: "TOC modéré",
    sentAt: "2024-11-20T10:00:00Z",
    completedAt: "2024-11-20T15:30:00Z",
    batchId: null,
  },
  {
    id: "s8",
    patientId: "p3",
    questionnaireId: "index-symptomes-ybocs",
    status: "completed",
    score: 18,
    interpretation: "TOC modéré",
    sentAt: "2024-12-05T10:00:00Z",
    completedAt: "2024-12-05T16:00:00Z",
    batchId: null,
  },

  // Patient M.L. (p4) - Viewed/In progress
  {
    id: "s9",
    patientId: "p4",
    questionnaireId: "echelle-d-anxiete-sociale-de-liebowitz",
    status: "in_progress",
    score: null,
    interpretation: null,
    sentAt: "2024-12-07T14:00:00Z",
    completedAt: null,
    batchId: null,
  },
  {
    id: "s10a",
    patientId: "p1",
    questionnaireId: "index-symptomes-ybocs",
    status: "in_progress",
    score: null,
    interpretation: null,
    sentAt: "2024-12-04T11:00:00Z",
    completedAt: null,
    batchId: null,
  },

  // Patient S.P. (p5) - PTSD tracking
  {
    id: "s10",
    patientId: "p5",
    questionnaireId: "traumatismes-pcl5",
    status: "completed",
    score: 45,
    interpretation: "Présence éventuelle d'un trouble de stress post-traumatique",
    sentAt: "2024-11-10T09:00:00Z",
    completedAt: "2024-11-10T14:20:00Z",
    batchId: null,
  },
  {
    id: "s11",
    patientId: "p5",
    questionnaireId: "traumatismes-pcl5",
    status: "completed",
    score: 38,
    interpretation: "Présence éventuelle d'un trouble de stress post-traumatique",
    sentAt: "2024-12-01T09:00:00Z",
    completedAt: "2024-12-01T15:10:00Z",
    batchId: null,
  },

  // Expired session example
  {
    id: "s12",
    patientId: "p1",
    questionnaireId: "stai-anxiete-generalisee",
    status: "expired",
    score: null,
    interpretation: null,
    sentAt: "2024-11-20T10:00:00Z",
    completedAt: null,
    batchId: null,
  },

  // Sent sessions examples (not yet started)
  {
    id: "s13",
    patientId: "p1",
    questionnaireId: "echelle-d-anxiete-sociale-de-liebowitz",
    status: "sent",
    score: null,
    interpretation: null,
    sentAt: "2024-12-09T10:00:00Z",
    completedAt: null,
    batchId: null,
  },
  {
    id: "s14",
    patientId: "p2",
    questionnaireId: "traumatismes-pcl5",
    status: "sent",
    score: null,
    interpretation: null,
    sentAt: "2024-12-08T14:30:00Z",
    completedAt: null,
    batchId: null,
  },
  {
    id: "s15",
    patientId: "p3",
    questionnaireId: "stai-anxiete-generalisee",
    status: "sent",
    score: null,
    interpretation: null,
    sentAt: "2024-12-10T09:00:00Z",
    completedAt: null,
    batchId: null,
  },

  // Additional in-progress sessions for demo
  {
    id: "s16",
    patientId: "p4",
    questionnaireId: "inventaire-de-depression-de-beck",
    status: "in_progress",
    score: null,
    interpretation: null,
    sentAt: "2024-12-06T09:00:00Z",
    completedAt: null,
    batchId: null,
  },
  {
    id: "s17",
    patientId: "p5",
    questionnaireId: "echelle-d-anxiete-sociale-de-liebowitz",
    status: "sent",
    score: null,
    interpretation: null,
    sentAt: "2024-12-11T08:00:00Z",
    completedAt: null,
    batchId: null,
  },
  {
    id: "s18",
    patientId: "p2",
    questionnaireId: "inventaire-de-depression-de-beck",
    status: "in_progress",
    score: null,
    interpretation: null,
    sentAt: "2024-12-05T10:30:00Z",
    completedAt: null,
    batchId: null,
  },
  {
    id: "s19",
    patientId: "p3",
    questionnaireId: "echelle-d-anxiete-sociale-de-liebowitz",
    status: "in_progress",
    score: null,
    interpretation: null,
    sentAt: "2024-12-07T15:00:00Z",
    completedAt: null,
    batchId: null,
  },
];

/**
 * Get all sessions
 */
export function getAllSessions(): MockSession[] {
  return mockSessions;
}

/**
 * Get sessions by patient ID
 */
export function getSessionsByPatientId(patientId: string): MockSession[] {
  return mockSessions.filter((s) => s.patientId === patientId);
}

/**
 * Get session by ID
 */
export function getSessionById(id: string): MockSession | undefined {
  return mockSessions.find((s) => s.id === id);
}

/**
 * Get sessions by batch ID
 */
export function getSessionsByBatchId(batchId: string): MockSession[] {
  return mockSessions.filter((s) => s.batchId === batchId);
}

/**
 * Get recent sessions (last N)
 */
export function getRecentSessions(limit = 5): MockSession[] {
  return [...mockSessions]
    .sort((a, b) => new Date(b.sentAt).getTime() - new Date(a.sentAt).getTime())
    .slice(0, limit);
}

/**
 * Get sessions by status
 */
export function getSessionsByStatus(status: SessionStatus): MockSession[] {
  return mockSessions.filter((s) => s.status === status);
}

/**
 * Add new session (mock)
 */
let nextSessionId = 18;
export function addSession(
  session: Omit<MockSession, "id">
): MockSession {
  const newSession: MockSession = {
    ...session,
    id: `s${nextSessionId++}`,
  };

  mockSessions.push(newSession);
  return newSession;
}

/**
 * Get session statistics
 */
export function getSessionStats() {
  const total = mockSessions.length;
  const completed = mockSessions.filter((s) => s.status === "completed").length;
  const inProgress = mockSessions.filter((s) => s.status === "in_progress").length;
  const sent = mockSessions.filter((s) => s.status === "sent").length;
  const expired = mockSessions.filter((s) => s.status === "expired").length;

  return {
    total,
    completed,
    inProgress,
    sent,
    expired,
  };
}

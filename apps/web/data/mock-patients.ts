/**
 * Mock patient data for demo prototype
 */

export interface MockPatient {
  id: string;
  initials: string;
  fullName?: string; // For demo purposes, can show full name
  email: string;
  age: number;
  birthDate?: string;
  createdAt: string;
  sessionsCount: number;
  notes?: string;
}

export const mockPatients: MockPatient[] = [
  {
    id: "p1",
    initials: "A.M.",
    fullName: "Alice Martin",
    email: "alice.martin@example.com",
    age: 34,
    birthDate: "1990-03-15",
    createdAt: "2024-11-15",
    sessionsCount: 3,
    notes: "Patiente suivie pour troubles anxieux",
  },
  {
    id: "p2",
    initials: "L.D.",
    fullName: "Luc Dubois",
    email: "luc.dubois@example.com",
    age: 28,
    birthDate: "1996-07-22",
    createdAt: "2024-12-01",
    sessionsCount: 2,
    notes: "Premier suivi, symptômes dépressifs",
  },
  {
    id: "p3",
    initials: "J.R.",
    fullName: "Julie Rousseau",
    email: "julie.rousseau@example.com",
    age: 42,
    birthDate: "1982-11-08",
    createdAt: "2024-10-20",
    sessionsCount: 5,
    notes: "Suivi long terme, TOC",
  },
  {
    id: "p4",
    initials: "M.L.",
    fullName: "Marc Lefebvre",
    email: "marc.lefebvre@example.com",
    age: 31,
    birthDate: "1993-05-12",
    createdAt: "2024-11-28",
    sessionsCount: 1,
    notes: "Anxiété sociale",
  },
  {
    id: "p5",
    initials: "S.P.",
    fullName: "Sophie Petit",
    email: "sophie.petit@example.com",
    age: 38,
    birthDate: "1986-09-30",
    createdAt: "2024-11-05",
    sessionsCount: 4,
    notes: "TSPT post-accident",
  },
];

/**
 * Get all patients
 */
export function getAllPatients(): MockPatient[] {
  return mockPatients;
}

/**
 * Get patient by ID
 */
export function getPatientById(id: string): MockPatient | undefined {
  return mockPatients.find((p) => p.id === id);
}

/**
 * Search patients by name or initials
 */
export function searchPatients(query: string): MockPatient[] {
  const lowerQuery = query.toLowerCase();
  return mockPatients.filter(
    (p) =>
      p.initials.toLowerCase().includes(lowerQuery) ||
      p.fullName?.toLowerCase().includes(lowerQuery) ||
      p.email.toLowerCase().includes(lowerQuery)
  );
}

/**
 * Add new patient (mock - just stores in memory for demo)
 */
let nextPatientId = 6;
export function addPatient(
  patient: Omit<MockPatient, "id" | "createdAt" | "sessionsCount">
): MockPatient {
  const newPatient: MockPatient = {
    ...patient,
    id: `p${nextPatientId++}`,
    createdAt: new Date().toISOString().split("T")[0],
    sessionsCount: 0,
  };

  mockPatients.push(newPatient);
  return newPatient;
}

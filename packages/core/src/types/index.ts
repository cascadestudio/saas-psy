// User types
export interface User {
  id: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  role: UserRole;
}

export enum UserRole {
  PRACTITIONER = 'PRACTITIONER',
  ADMIN = 'ADMIN',
  PATIENT = 'PATIENT',
}

// Questionnaire types
export interface Questionnaire {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  category: string;
  estimatedTime: string;
  questions: QuestionnaireQuestion[];
  answerScales?: AnswerScales;
  scoring?: ScoringConfig;
}

export interface QuestionnaireQuestion {
  id: number;
  text: string;
  type: string;
  // Additional properties based on question type
  [key: string]: any;
}

export interface AnswerScales {
  anxiety?: ScaleOption[];
  avoidance?: ScaleOption[];
  intensity?: ScaleOption[];
  [key: string]: ScaleOption[] | undefined;
}

export interface ScaleOption {
  value: number;
  label: string;
}

export interface ScoringConfig {
  method: string;
  ranges: ScoreRange[];
  maxTrait?: number;
  maxState?: number;
}

export interface ScoreRange {
  min: number;
  max: number;
  interpretation: string;
}

// Session types
export interface Session {
  id: string;
  questionnaireId: string;
  patientFirstName: string;
  patientLastName: string;
  patientEmail?: string | null;
  practitionerId: string;
  status: SessionStatus;
  responses?: any;
  score?: ScoreResult;
  interpretation?: string | null;
  patientComments?: string | null;
  sentAt?: Date | null;
  startedAt?: Date | null;
  completedAt?: Date | null;
  expiresAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export enum SessionStatus {
  CREATED = 'CREATED',
  SENT = 'SENT',
  STARTED = 'STARTED',
  COMPLETED = 'COMPLETED',
  EXPIRED = 'EXPIRED',
  CANCELLED = 'CANCELLED',
}

// Scoring types
export interface ScoreResult {
  totalScore?: number;
  interpretation?: string;
  severity?: string;
  stateScore?: number;
  traitScore?: number;
  subscores?: Record<string, number>;
  details?: string;
  [key: string]: any;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}


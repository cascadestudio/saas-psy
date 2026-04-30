/**
 * Result of scoring a completed passation.
 *
 * Computed by the backend at the moment responses are submitted, then stored
 * as-is on `Session.score`. The frontend only reads — it never recomputes.
 */
export interface ScoreResult {
  /** Total raw score (after RSES inversion when applicable). */
  totalScore: number;
  /** Maximum possible score for this scale (e.g. 27 for PHQ-9). */
  maxScore: number;
  /** Textual interpretation matching the scale's range (e.g. "Dépression modérée"). */
  interpretation: string;
  /**
   * Index of the matched range in `scale.scoring.ranges`. -1 if score falls
   * outside any range. Used by the front to resolve the severity color.
   */
  severityIndex: number;
  /** Total number of ranges on the scale, for palette resolution. */
  severityRangeCount: number;
  /** Optional structured subscores (PCL-5 clusters, Y-BOCS obs/comp, LSAS anx/avo). */
  subscores?: Subscore[];
  /** Clinical alerts (suicide ideation, diagnostic threshold, etc.). */
  alerts?: ScoreAlert[];
}

export interface Subscore {
  /** Stable key (e.g. "intrusion", "obsessions", "anxiety"). */
  key: string;
  /** Display label in French. */
  label: string;
  value: number;
  max: number;
}

export type ScoreAlertKind =
  | "suicide-ideation"
  | "diagnostic-threshold"
  | "critical-item";

export type ScoreAlertSeverity = "info" | "warning" | "critical";

export interface ScoreAlert {
  kind: ScoreAlertKind;
  severity: ScoreAlertSeverity;
  /** Short message shown in the alert banner. */
  message: string;
  /** 0-based question index when the alert points to a specific item. */
  itemIndex?: number;
}

// User types ----------------------------------------------------------------

export interface User {
  id: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  role: UserRole;
}

export enum UserRole {
  PRACTITIONER = "PRACTITIONER",
  ADMIN = "ADMIN",
  PATIENT = "PATIENT",
}

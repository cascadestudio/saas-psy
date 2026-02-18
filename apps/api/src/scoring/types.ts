export interface ScoreResult {
  totalScore: number;
  maxTotal: number;
  interpretation: string | { trait: string; state: string };
  anxietyScore?: number;
  avoidanceScore?: number;
  stateScore?: number;
  traitScore?: number;
  anxietyPerformanceScore?: number;
  anxietyInteractionScore?: number;
  avoidancePerformanceScore?: number;
  avoidanceInteractionScore?: number;
  maxAnxiety?: number;
  maxAvoidance?: number;
  maxPerformanceAnxiety?: number;
  maxInteractionAnxiety?: number;
  maxPerformanceAvoidance?: number;
  maxInteractionAvoidance?: number;
  maxState?: number;
  maxTrait?: number;
}

export interface ScoreResult {
  totalScore: number;
  anxietyScore?: number;
  avoidanceScore?: number;
  stateScore?: number;
  traitScore?: number;
  anxietyPerformanceScore?: number;
  anxietyInteractionScore?: number;
  avoidancePerformanceScore?: number;
  avoidanceInteractionScore?: number;
  interpretation: string | { trait: string; state: string };
  scoreDetails: string;
  maxTotal: number;
  maxAnxiety?: number;
  maxAvoidance?: number;
  maxPerformanceAnxiety?: number;
  maxInteractionAnxiety?: number;
  maxPerformanceAvoidance?: number;
  maxInteractionAvoidance?: number;
  maxState?: number;
  maxTrait?: number;
}

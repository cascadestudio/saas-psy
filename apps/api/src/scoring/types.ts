export interface ScoreResult {
  totalScore: number;
  maxTotal: number;
  interpretation: string;
  obsessionsScore?: number;
  compulsionsScore?: number;
  maxObsessions?: number;
  maxCompulsions?: number;
  anxietyScore?: number;
  avoidanceScore?: number;
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
}

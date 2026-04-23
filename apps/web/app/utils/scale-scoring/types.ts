export interface ScoreResult {
  totalScore: number;
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
  interpretation: string;
  scoreDetails: string;
  maxTotal: number;
  maxAnxiety?: number;
  maxAvoidance?: number;
  maxPerformanceAnxiety?: number;
  maxInteractionAnxiety?: number;
  maxPerformanceAvoidance?: number;
  maxInteractionAvoidance?: number;
}

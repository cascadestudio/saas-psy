export interface ScoreResult {
  totalScore: number;
  anxietyScore?: number;
  avoidanceScore?: number;
  interpretation: string;
  scoreDetails: string;
  maxTotal: number;
  maxAnxiety?: number;
  maxAvoidance?: number;
  stateScore?: number;
  traitScore?: number;
  maxState?: number;
  maxTrait?: number;
}

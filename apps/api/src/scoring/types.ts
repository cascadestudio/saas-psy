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
  // PHQ-9
  alerteSuicide?: boolean;
  // PCL-5 — DSM-5 cluster subscores
  subscoreClusterB?: number;
  subscoreClusterC?: number;
  subscoreClusterD?: number;
  subscoreClusterE?: number;
  maxClusterB?: number;
  maxClusterC?: number;
  maxClusterD?: number;
  maxClusterE?: number;
  // PCL-5 — provisional DSM-5 diagnosis by symptom-count
  diagnosticProvisoireDSM5?: boolean;
}

import { ScoreResult, Questionnaire } from '../types';
/**
 * Calculate score for a questionnaire based on its scoring method
 */
export declare function calculateScore(questionnaire: Questionnaire, answers: Record<string, any>): ScoreResult;

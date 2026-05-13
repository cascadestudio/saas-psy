import { Injectable } from '@nestjs/common';
import { getScaleById, Scale, ScoreResult } from '@melya/core';
import { scorePhq9 } from './scorers/phq9';
import { scoreGad7 } from './scorers/gad7';
import { scorePcl5 } from './scorers/pcl5';
import { scoreYbocs } from './scorers/ybocs';
import { scoreRses } from './scorers/rses';
import { scoreLsas } from './scorers/lsas';

type Scorer = (scale: Scale, responses: Record<string, unknown>) => ScoreResult;

const SCORERS: Record<string, Scorer> = {
  'phq-9': scorePhq9,
  'gad-7': scoreGad7,
  'traumatismes-pcl5': scorePcl5,
  'index-symptomes-ybocs': scoreYbocs,
  rses: scoreRses,
  'echelle-d-anxiete-sociale-de-liebowitz': scoreLsas,
};

@Injectable()
export class ScoringService {
  calculateScore(
    scaleId: string,
    responses: Record<string, unknown>,
  ): ScoreResult {
    const scale = getScaleById(scaleId);
    if (!scale) {
      throw new Error(`Scale not found: ${scaleId}`);
    }
    const scorer = SCORERS[scaleId];
    if (!scorer) {
      throw new Error(`No scorer registered for scale: ${scaleId}`);
    }
    return scorer(scale, responses);
  }
}

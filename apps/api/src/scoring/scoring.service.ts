import { Injectable } from '@nestjs/common';
import { getScaleById } from '@melya/core';
import { ScoreResult } from './types';
import { calculateOptionsScore } from './calculators/options';
import { calculateLiebowitzScore } from './calculators/liebowitz';
import { calculateSingleScaleScore } from './calculators/single-scale';

@Injectable()
export class ScoringService {
  calculateScore(
    scaleId: string,
    responses: Record<string, any>,
  ): ScoreResult {
    const scale = getScaleById(scaleId);

    if (!scale) {
      throw new Error(`Scale not found: ${scaleId}`);
    }

    switch (scale.formType) {
      case 'dual-scale':
        return calculateLiebowitzScore(scale, responses);
      case 'options':
        return calculateOptionsScore(scale, responses);
      case 'single-scale':
      default:
        return calculateSingleScaleScore(scale, responses);
    }
  }
}

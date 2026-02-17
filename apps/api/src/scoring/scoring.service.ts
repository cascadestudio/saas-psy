import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ScoreResult } from './types';
import { calculateOptionsScore } from './calculators/options';
import { calculateSTAIScore } from './calculators/stai';
import { calculateLiebowitzScore } from './calculators/liebowitz';
import { calculateSingleScaleScore } from './calculators/single-scale';

@Injectable()
export class ScoringService {
  constructor(private prisma: PrismaService) {}

  async calculateScore(
    scaleId: string,
    responses: Record<string, any>,
  ): Promise<ScoreResult> {
    const scale = await this.prisma.scale.findUnique({
      where: { id: scaleId },
    });

    if (!scale) {
      throw new Error(`Scale not found: ${scaleId}`);
    }

    switch (scale.formType) {
      case 'dual-scale':
        return calculateLiebowitzScore(scale, responses);
      case 'grouped-items':
        return calculateSTAIScore(scale, responses);
      case 'options':
        return calculateOptionsScore(scale, responses);
      case 'single-scale':
      default:
        return calculateSingleScaleScore(scale, responses);
    }
  }
}

import { Injectable } from '@nestjs/common';
import { getScaleById, Scale, ScoreResult } from '@melya/core';
import { scorePhq9 } from './scorers/phq9';
import { scoreGad7 } from './scorers/gad7';
import { scorePcl5 } from './scorers/pcl5';
import { scoreYbocs } from './scorers/ybocs';
import { scoreRses } from './scorers/rses';
import { scoreLsas } from './scorers/lsas';
import { scoreSpin } from './scorers/spin';
import { scorePswq } from './scorers/pswq';
import { scoreAudit } from './scorers/audit';
import { scorePdeq } from './scorers/pdeq';
import { scoreEii } from './scorers/eii';
import { scoreCuditR } from './scorers/cudit';
import { scoreFtnd } from './scorers/ftnd';
import { scorePdss } from './scorers/pdss';
import { scoreHsps } from './scorers/hsps';
import { scoreQia } from './scorers/qia';
import { scorePsiII } from './scorers/psi-ii';
import { scoreAdrs } from './scorers/adrs';
import { scoreQap } from './scorers/qap';
import { scoreQec } from './scorers/qec';
import { scorePdi } from './scorers/pdi';
import { scoreCast } from './scorers/cast';
import { scoreAsrs } from './scorers/asrs';
import { scoreQcsTag } from './scorers/qcs-tag';
import { scoreCries13 } from './scorers/cries-13';
import { scoreEcab } from './scorers/ecab';
import { scoreHonc } from './scorers/honc';
import { scoreScared } from './scorers/scared';
import { scoreScaredR } from './scorers/scared-r';
import { scorePclS } from './scorers/pcl-s';
import { scoreCatQ } from './scorers/cat-q';

type Scorer = (scale: Scale, responses: Record<string, unknown>) => ScoreResult;

const SCORERS: Record<string, Scorer> = {
  'phq-9': scorePhq9,
  'gad-7': scoreGad7,
  'traumatismes-pcl5': scorePcl5,
  'index-symptomes-ybocs': scoreYbocs,
  rses: scoreRses,
  'echelle-d-anxiete-sociale-de-liebowitz': scoreLsas,
  spin: scoreSpin,
  qips: scorePswq, // clé = id historique de l'échelle ; acronyme public = PSWQ
  audit: scoreAudit,
  pdeq: scorePdeq,
  eii: scoreEii,
  'cudit-r': scoreCuditR,
  ftnd: scoreFtnd,
  pdss: scorePdss,
  hsps: scoreHsps,
  qia: scoreQia,
  'psi-ii': scorePsiII,
  adrs: scoreAdrs,
  qap: scoreQap,
  qec: scoreQec,
  pdi: scorePdi,
  cast: scoreCast,
  asrs: scoreAsrs,
  'qcs-tag': scoreQcsTag,
  'cries-13': scoreCries13,
  ecab: scoreEcab,
  honc: scoreHonc,
  scared: scoreScared,
  'scared-r': scoreScaredR,
  'pcl-s': scorePclS,
  'cat-q': scoreCatQ,
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

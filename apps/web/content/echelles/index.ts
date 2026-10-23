import { adrs } from "./adrs";
import { asrs } from "./asrs";
import { atq } from "./atq";
import { audit } from "./audit";
import { batGeneral, batWork } from "./bat";
import { cast } from "./cast";
import { catQ } from "./cat-q";
import { cries13 } from "./cries-13";
import { cst } from "./cst";
import { cuditR } from "./cudit-r";
import { ders } from "./ders";
import { ecab } from "./ecab";
import { edi } from "./edi";
import { eii } from "./eii";
import { ffmq } from "./ffmq";
import { ftnd } from "./ftnd";
import { gad7 } from "./gad-7";
import { honc } from "./honc";
import { hsps } from "./hsps";
import { lsas } from "./lsas";
import { pcl5 } from "./pcl-5";
import { pclS } from "./pcl-s";
import { pdeq } from "./pdeq";
import { pdi } from "./pdi";
import { pdss } from "./pdss";
import { phq9 } from "./phq-9";
import { psiII } from "./psi-ii";
import { pswq } from "./pswq";
import { qap } from "./qap";
import { qcsTag } from "./qcs-tag";
import { qec } from "./qec";
import { qia } from "./qia";
import { rses } from "./rses";
import { scared } from "./scared";
import { scaredR } from "./scared-r";
import { spin } from "./spin";
import type { ScaleGuideContent } from "./types";
import { ybocs } from "./y-bocs";

export type { ScaleGuideContent } from "./types";

/**
 * Fiches pratiques rédigées dans le repo, indexées par `id` d'échelle.
 * Une échelle absente d'ici est encore servie par l'ancienne page
 * (contenu Sanity s'il existe, sinon `@melya/core` seul).
 */
const guides: Record<string, ScaleGuideContent> = Object.fromEntries(
  [
    adrs,
    asrs,
    atq,
    audit,
    batGeneral,
    batWork,
    cast,
    catQ,
    cries13,
    cst,
    cuditR,
    ders,
    ecab,
    edi,
    eii,
    ffmq,
    ftnd,
    gad7,
    honc,
    hsps,
    lsas,
    pcl5,
    pclS,
    pdeq,
    pdi,
    pdss,
    phq9,
    psiII,
    pswq,
    qap,
    qcsTag,
    qec,
    qia,
    rses,
    scared,
    scaredR,
    spin,
    ybocs,
  ].map((guide) => [guide.scaleId, guide]),
);

export function getScaleGuide(scaleId: string): ScaleGuideContent | undefined {
  return guides[scaleId];
}

export type ScaleFormType = "single-scale" | "dual-scale" | "options";
export interface ScaleOption {
    value: number;
    label: string;
}
export interface ScaleRange {
    min: number;
    max: number;
    interpretation: string;
}
export interface ScaleScoring {
    ranges: ScaleRange[];
    /** Max possible total score (e.g. 27 for PHQ-9, 144 for LSAS, 40 for Y-BOCS / RSES). */
    maxScore: number;
    /** Human description of how the score is computed (shown on the scale page). */
    method: string;
}
export interface SectionIntro {
    /** 0-based question index at which this intro should be shown. */
    startIndex: number;
    text: string;
}
export interface Scale {
    id: string;
    acronym: string;
    label: string;
    icon: string;
    color: string;
    colorLight: string;
    formType: ScaleFormType;
    title: string;
    description: string;
    category: string;
    estimatedTime: string;
    longDescription: string;
    instructions?: string;
    /**
     * Per-section intros (e.g. Y-BOCS has distinct consignes for obsessions / compulsions).
     * When set, the patient flow displays each text before its `startIndex` item, and the
     * results page can surface them as separate consigne reminders.
     */
    sectionIntros?: SectionIntro[];
    /**
     * Required copyright / attribution mention. Displayed:
     * - on the patient end-of-passation screen (gris discret, une fois)
     * - on the practitioner scale library page
     * - in the footer of the practitioner results page
     */
    copyrightAttribution: string;
    reverseItems?: number[];
    /**
     * True when a higher score = better health (e.g. RSES self-esteem).
     * False for symptom scales (PHQ-9, GAD-7, PCL-5, Y-BOCS, LSAS) where higher = worse.
     * Drives delta direction, severity coloring, and trend interpretation.
     */
    higherIsBetter: boolean;
    questions: any[];
    answerScales?: Record<string, ScaleOption[]>;
    scoring: ScaleScoring;
}
export declare const scales: Scale[];
export declare function getScaleById(id: string): Scale | undefined;

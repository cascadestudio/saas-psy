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
     * Consigne affichée en en-tête persistant au-dessus de chaque item pendant la passation.
     * Si absent, fallback sur `instructions`. Utile quand la consigne d'intro (longue,
     * contextualisante) diffère du rappel actionnable item par item (ex. PCL-5).
     */
    persistentInstructions?: string;
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
    /**
     * Sous-titre affiché sous l'acronyme sur **toutes les surfaces vues par le patient** :
     * écran d'intro (`IntroScreen`) ET cards du batch (`p/[batchId]/page.tsx`).
     * Doit reproduire ce qui figure sur le PDF de la source primaire :
     * - `undefined` : fallback sur `label` (comportement par défaut historique).
     * - `null` : aucun sous-titre — le PDF n'affiche que l'acronyme (ex. GAD-7).
     * - `string` : libellé exact du PDF s'il diffère de `label`.
     * Les surfaces praticien (catalogue, fiche patient, résultats) ne sont **pas**
     * concernées : elles continuent d'afficher `label` / `title` enrichis.
     * Documenter le choix dans le §4 du spec correspondant.
     */
    patientIntroSubtitle?: string | null;
    reverseItems?: number[];
    /**
     * True when a higher score = better health (e.g. RSES self-esteem).
     * False for symptom scales (PHQ-9, GAD-7, PCL-5, Y-BOCS, LSAS) where higher = worse.
     * Drives delta direction, severity coloring, and trend interpretation.
     */
    higherIsBetter: boolean;
    questions: any[];
    answerScales?: Record<string, ScaleOption[]>;
    /**
     * Item de suivi non scoré, présenté au patient après les items scorés.
     * Sa réponse est stockée sous `key` dans le record de réponses ; les scorers
     * doivent ignorer cette clé. Affiché côté praticien dans une section dédiée.
     * Exemple : item d'impact fonctionnel du PHQ-9.
     */
    followUpItem?: {
        key: string;
        questionText: string;
        options: ScaleOption[];
    };
    scoring: ScaleScoring;
}
export declare const scales: Scale[];
export declare function getScaleById(id: string): Scale | undefined;

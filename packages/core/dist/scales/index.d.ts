export interface Scale {
    id: string;
    acronym: string;
    label: string;
    icon: string;
    color: string;
    colorLight: string;
    formType: string;
    title: string;
    description: string;
    category: string;
    estimatedTime: string;
    longDescription: string;
    instructions?: string;
    reverseItems?: number[];
    questions: any[];
    answerScales?: Record<string, {
        value: number;
        label: string;
    }[]>;
    scoring?: {
        ranges: {
            min: number;
            max: number;
            interpretation: string;
        }[];
        method: string;
        maxTrait?: number;
        maxState?: number;
    };
}
export declare const scales: Scale[];
export declare function getScaleById(id: string): Scale | undefined;

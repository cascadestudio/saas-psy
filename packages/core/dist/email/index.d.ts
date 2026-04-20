export interface BatchEmailParams {
    patientFirstName: string;
    patientLastName: string;
    scaleNames: string[];
    practitionerName: string;
    message?: string;
    portalUrl: string;
    logoUrl?: string;
}
export interface SessionEmailParams {
    patientFirstName: string;
    patientLastName: string;
    scaleName: string;
    practitionerName: string;
    message?: string;
    questionnaireUrl: string;
    logoUrl?: string;
}
export declare function buildBatchEmailHtml(params: BatchEmailParams): string;
export declare function buildSessionEmailHtml(params: SessionEmailParams): string;

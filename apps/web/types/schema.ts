export type TranscriptSpeaker = "Technician" | "Homeowner";

export interface TranscriptItem {
    id: number;
    speaker: TranscriptSpeaker;
    text: string;
}

export interface MetaData {
    call_type: string;
    overall_score: number;
    summary: string;
}

export interface ComplianceItem {
    step_name: string;
    description: string;
    status: string;
    quality: number;
    comment: string;
}

export type AnnotationCategory =
    | "Introduction"
    | "Problem Diagnosis"
    | "Solution Explanation"
    | "Upsell Attempts"
    | "Maintenance Plan Offer"
    | "Closing & Thank You"
    | "Sales Insights";

export interface Annotation {
    id: number;
    start_line_id: number;
    end_line_id: number;
    category: AnnotationCategory;
    title: string;
    content: string;
}

export interface TranscriptData {
    transcript: TranscriptItem[];
    meta: MetaData;
    compliance_checklist: ComplianceItem[];
    annotations: Annotation[];
}

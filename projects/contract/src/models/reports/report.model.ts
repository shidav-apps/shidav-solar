import { RecommendationsStatusReportParams } from "./recommendation-status-report.model";

export interface RecommendationStatusReport {
    readonly type: 'recommendation-status';
    readonly params: RecommendationsStatusReportParams;
    readonly siteId: number;
}


export type SolarReport = RecommendationStatusReport;
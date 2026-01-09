import { DbModel } from "@db-model";

export interface MockDashboardData {
    readonly records: MockDashboardRecord[];

}


export interface MockDashboardRecord {
    readonly invoices: DbModel.DashboardInvoice[];
    readonly recommendations: DbModel.DashboardRecommend[];
    readonly energy: number;
    readonly daylightHours: number;
    readonly revenue: number;
    readonly efficiency: number;
}
import { DashboardInvoice, DashboardRecommend } from "@contract";


export interface MockDashboardData {
    readonly records: MockDashboardRecord[];

}


export interface MockDashboardRecord {
    readonly invoices: DashboardInvoice[];
    readonly recommendations: DashboardRecommend[];
    readonly energy: number;
    readonly daylightHours: number;
    readonly revenue: number;
    readonly efficiency: number;
}
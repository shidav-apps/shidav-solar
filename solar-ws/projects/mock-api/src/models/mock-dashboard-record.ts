import { DashboardInvoice, DashboardWash } from "@contract";


export interface MockDashboardData {
    readonly records: MockDashboardRecord[];

}


export interface MockDashboardRecord {
    readonly invoices: DashboardInvoice[];
    readonly washes: DashboardWash[];
    readonly energy: number;
    readonly daylightHours: number;
    readonly revenue: number;
    readonly efficiency: number;
}
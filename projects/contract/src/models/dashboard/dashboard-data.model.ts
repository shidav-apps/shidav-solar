import { DashboardRecommend } from "@contract";
import { DataPeriod } from "../data-period.model";
import { DashboardTotals } from "./dahboard-totals.model";
import { DashboardInvoice } from "./dashboard-invoice.model";

export interface DashboardData {
    readonly siteId: number;
    readonly period: DataPeriod;
    readonly totals: DashboardTotals;
    readonly invoices: DashboardInvoice[];
    readonly recommendations: DashboardRecommend[]


}

export const EMPTY_DASHBOARD_DATA: DashboardData = {
    siteId: 0,
    period: 'this-month',
    totals: {
        daylightHoursAvg: 0, 
        efficiency: 0, 
        totalEnergy: 0, 
        totalRevenue: 0
    },
    invoices: [],
    recommendations: []
}
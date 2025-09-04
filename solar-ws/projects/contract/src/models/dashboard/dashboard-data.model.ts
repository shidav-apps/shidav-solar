import { DataPeriod } from "../data-period.model";
import { DashboardTotals } from "./dahboard-totals.model";
import { DashboardInvoice } from "./dashboard-invoice.model";
import { DashboardWash } from "./dashboard-wash.model";

export interface DashboardData {
    readonly siteId: number;
    readonly period: DataPeriod;
    readonly totals: DashboardTotals;
    readonly invoices: DashboardInvoice[];
    readonly washes: DashboardWash[]


}
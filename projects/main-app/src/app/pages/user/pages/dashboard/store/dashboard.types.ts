import { DataPeriod } from "@contract";

export interface PeriodRecord {
    readonly period: DataPeriod;
    readonly label: string;
}
export const POSSIBLE_PERIODS: PeriodRecord[] =[
    {period: 'today', label: 'היום'}, 
    {period: 'this-month', label: 'החודש'},
    {period: 'last-month', label: 'החודש שעבר'},
]

export interface DashboardParams {
    readonly siteId: number | null;
    readonly period: DataPeriod;
}

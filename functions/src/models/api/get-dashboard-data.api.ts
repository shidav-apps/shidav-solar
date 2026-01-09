import { DbModel } from "../db/alias";

export interface getDashboardDataRequest {
    readonly siteId: number;
    readonly period: DbModel.DataPeriod;
}
import { DbModel } from "@db-model";
import { PeriodRecord, POSSIBLE_PERIODS } from "./dashboard.types";
import { initialResourceModel, ResourceModel } from "@tools";

export interface DashboardSlice {
    readonly possiblePeriods: PeriodRecord[];
    readonly selectedPeriod: DbModel.DataPeriod;
    readonly dashboardData: ResourceModel<DbModel.DashboardData>;
}

export const initialDashboardSlice: DashboardSlice = {
    possiblePeriods: POSSIBLE_PERIODS,
    selectedPeriod: 'this-month', 
    dashboardData: initialResourceModel()
}

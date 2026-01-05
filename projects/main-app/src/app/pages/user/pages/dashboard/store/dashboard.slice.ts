import { DashboardData, DataPeriod } from "@contract"
import { initialResourceModel, ResourceModel } from "../../../../../utils/resource-model";
import { PeriodRecord, POSSIBLE_PERIODS } from "./dashboard.types";

export interface DashboardSlice {
    readonly possiblePeriods: PeriodRecord[];
    readonly selectedPeriod: DataPeriod;
    readonly dashboardData: ResourceModel<DashboardData>;
}

export const initialDashboardSlice: DashboardSlice = {
    possiblePeriods: POSSIBLE_PERIODS,
    selectedPeriod: 'this-month', 
    dashboardData: initialResourceModel()
}

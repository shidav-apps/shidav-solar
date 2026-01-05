import { DashboardData, DataPeriod } from "@contract";
import { PartialStateUpdater } from "@ngrx/signals";
import { DashboardSlice } from "./dashboard.slice";
import { busyResourceModel, errorResourceModel, initialResourceModel, resolvedResourceModel } from "../../../../../utils/resource-model";

export function setSelectedPeriod(period: DataPeriod): PartialStateUpdater<DashboardSlice> {
    return _ => ({
        selectedPeriod: period
    })
}

export function setBusy(): PartialStateUpdater<DashboardSlice> {
    return _ => ({
        dashboardData: busyResourceModel()
    })
}

export function setDashboardData(data: DashboardData): PartialStateUpdater<DashboardSlice> {
    return _ => ({
        dashboardData: resolvedResourceModel(data)
    })
}

export function setError(reason: string): PartialStateUpdater<DashboardSlice> {
    return _ => ({
        dashboardData: errorResourceModel(reason)
    })
}

export function resetDashboard(): PartialStateUpdater<DashboardSlice> {
    return _ => ({
        dashboardData: initialResourceModel()
    })
}
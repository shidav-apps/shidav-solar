import { DbModel } from "@db-model";

export interface DashboardRecommendationsVm {
    readonly items: DbModel.DashboardRecommend[];   
}

export function buildDashboardRecommendationsVm(models: DbModel.DashboardRecommend[]): DashboardRecommendationsVm {
    return {
        items: [...models]
            .sort((a, b) => a.date.localeCompare(b.date))
            .reverse()
            .slice(0, 10)
    };
}
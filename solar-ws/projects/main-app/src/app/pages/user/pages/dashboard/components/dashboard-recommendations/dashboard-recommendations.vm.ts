import { DashboardRecommend } from '@contract';

export interface DashboardRecommendationsVm {
    readonly items: DashboardRecommend[];   
}

export function buildDashboardRecommendationsVm(models: DashboardRecommend[]): DashboardRecommendationsVm {
    return {
        items: [...models]
            .sort((a, b) => a.date.localeCompare(b.date))
            .reverse()
            .slice(0, 10)
    };
}
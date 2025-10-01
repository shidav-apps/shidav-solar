export interface DashboardRecommend {
    readonly code: string;
    readonly date: string; // ISO date string
    readonly production: number; // in kWh
    readonly amount: number; // in currency units
    readonly dateStart: string; // ISO date string
    readonly dateEnd: string; // ISO date string
}
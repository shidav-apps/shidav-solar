export interface DashboardTotals {
  readonly totalEnergy: number; // in kWh
  readonly daylightHoursAvg: number; // in hours
  readonly efficiency: number; // in percentage
  readonly totalRevenue: number; // in currency unit
}

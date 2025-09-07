import { DataPeriod } from "@contract";
import { PeriodRecord } from "./dashboard.types";

export function getSelectedPeriodLabel(possiblePeriods: PeriodRecord[], selectedPeriod: DataPeriod): string {
    return possiblePeriods.find(p => p.period === selectedPeriod)?.label ?? '';
}
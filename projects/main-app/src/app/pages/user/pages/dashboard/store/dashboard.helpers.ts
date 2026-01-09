import { DbModel } from "@db-model";
import { PeriodRecord } from "./dashboard.types";

export function getSelectedPeriodLabel(possiblePeriods: PeriodRecord[], selectedPeriod: DbModel.DataPeriod): string {
    return possiblePeriods.find(p => p.period === selectedPeriod)?.label ?? '';
}
import { signalStore, withState } from "@ngrx/signals";
import { initialReportsState } from "./reports.model";

export const ReportsStore = signalStore(
    withState(initialReportsState)
)
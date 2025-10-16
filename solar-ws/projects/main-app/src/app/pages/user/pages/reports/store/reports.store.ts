import { signalStore, withMethods, withProps, withState } from "@ngrx/signals";
import { initialReportsState } from "./reports.model";
import { inject } from "@angular/core";
import { ReportDialogsService } from "../services/report-dialogs.service";

export const ReportsStore = signalStore(
    withState(initialReportsState), 
    withProps(_ => ({
        _dialogs: inject(ReportDialogsService)
    })),
    withMethods(store => ({
        openRecommendationsStatusDialog: () => {
            return store._dialogs.openRecommendationsStatusDialog();
        }
        
    }))
)
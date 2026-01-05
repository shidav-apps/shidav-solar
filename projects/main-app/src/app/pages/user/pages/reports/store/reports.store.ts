import { signalStore, withMethods, withProps, withState } from '@ngrx/signals';
import { initialReportsState } from './reports.model';
import { inject } from '@angular/core';
import { ReportDialogsService } from '../services/report-dialogs.service';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { exhaustMap, of, switchMap } from 'rxjs';
import { SOLAR_API } from '@contract';
import { SitesListStore } from '../../../components/sites-list/store/sites-list.store';

export const ReportsStore = signalStore(
  withState(initialReportsState),
  withProps((_) => ({
    _dialogs: inject(ReportDialogsService),
    _api: inject(SOLAR_API),
    _sitesListStore: inject(SitesListStore),
  })),
  withMethods((store) => ({
    createRecommendationsStatusDialog: rxMethod<void>((trigger$) =>
      trigger$.pipe(
        exhaustMap(() => store._dialogs.openRecommendationsStatusDialog()),
        switchMap((res) =>
          res === null
            ? of<void>()
            : store._api.downloadReport({
                type: 'recommendation-status',
                params: res!,
                siteId: store._sitesListStore.selectedSiteId()!,
              })
        )
      )
    ),
  }))
);

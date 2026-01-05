import { patchState, signalStore, withComputed, withHooks, withMethods, withProps, withState } from "@ngrx/signals";
import { initialDashboardSlice } from "./dashboard.slice";
import { computed, inject } from "@angular/core";
import { SitesListStore } from "../../../components/sites-list/store/sites-list.store";
import { setBusy, setDashboardData, setSelectedPeriod } from "./dashboard.updaters";
import { DashboardData, DataPeriod, EMPTY_DASHBOARD_DATA, SOLAR_API } from "@contract";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { DashboardParams } from "./dashboard.types";
import { of, switchMap, tap } from "rxjs";
import { withDevtools } from "@angular-architects/ngrx-toolkit";
import { getSelectedPeriodLabel } from "./dashboard.helpers";

export const DashboardStore = signalStore(
    withState(initialDashboardSlice), 
    withDevtools('DashboardStore'),
    withProps(_ => ({
        _selectedSiteId: inject(SitesListStore).selectedSiteId,
        _api: inject(SOLAR_API)
    })), 
    withComputed(store => ({
        _loadTrigger: computed(() => ({period: store.selectedPeriod(), siteId: store._selectedSiteId()})),
        selectedPeriodLabel: computed(() => getSelectedPeriodLabel(store.possiblePeriods(), store.selectedPeriod())),
    })), 
    withMethods(store => ({
        setSelectedPeriod: (period: DataPeriod) => patchState(store, setSelectedPeriod(period)),
        _loadData: rxMethod<DashboardParams>(trigger$ => trigger$.pipe(
            tap(_ => patchState(store, setBusy())), 
            switchMap(params => params.siteId === null 
                ? of<DashboardData>(EMPTY_DASHBOARD_DATA)
                : store._api.getDashboardData(params.siteId, params.period)), 
            tap(res => patchState(store, setDashboardData(res)))
        ))     
    })),
    withHooks(store => ({
        onInit: () => {
            store._loadData(store._loadTrigger);
        }
    })) 

);
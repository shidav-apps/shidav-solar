import { patchState, signalStore, withComputed, withMethods, withProps, withState } from "@ngrx/signals";
import { initialSitesListSlice } from "./sites-list.slice";
import { setSearchWord, setSelectedSiteId } from "./sites-list.updaters";
import { computed, inject } from "@angular/core";
import { AuthStore } from "../../../../../stores/auth/auth.store";
import { buildSitesListVm } from "./sites-list.builder";
import { withDevtools } from "@angular-architects/ngrx-toolkit";

export const SitesListStore = signalStore(
    withState(initialSitesListSlice),
    withDevtools('SitesListStore'),
    withProps(_ => {
        const _auth = inject(AuthStore);        
        return {
            _auth,
            _possibleSites: _auth.sitesList
        }
    }),
    withComputed(store => ({
        vm: computed(() => buildSitesListVm(
            store._possibleSites(), 
            store.searchWord(),
            store.selectedSiteId()))
    })),
    withMethods(store => ({
        setSearchWord: (searchWord: string) => patchState(store, setSearchWord(searchWord)),
        setSelectedSiteId: (siteId: number | null) => patchState(store, setSelectedSiteId(siteId)),
    }))
)
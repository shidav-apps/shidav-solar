import { patchState, signalStore, withComputed, withHooks, withMethods, withProps, withState } from "@ngrx/signals";
import { initialSitesListSlice } from "./sites-list.slice";
import { setSearchWord, setSelectedSiteId } from "./sites-list.updaters";
import { computed, effect, inject, untracked } from "@angular/core";
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
            store.selectedSiteId())), 
        selectedSiteTitle: computed(() => store._possibleSites().find(site => site.id === store.selectedSiteId())?.displayName || 'לא נבחר אתר')
    })),
    withMethods(store => ({
        setSearchWord: (searchWord: string) => patchState(store, setSearchWord(searchWord)),
        setSelectedSiteId: (siteId: number | null) => patchState(store, setSelectedSiteId(siteId)),
    })), 
    withHooks(store => ({
        onInit: () => {
            effect(() => {
                const sites = store._possibleSites();
                const selectedId = untracked(() => store.selectedSiteId());

                const selectedIsInList = sites.some(site => site.id === selectedId);
                if (!selectedIsInList) {
                    if (sites.length > 0) {
                        const firstSiteId = sites[0].id;
                        store.setSelectedSiteId(firstSiteId);
                    }
                }
            })
        }
    }))
)
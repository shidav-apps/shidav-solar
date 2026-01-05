import { PartialStateUpdater } from "@ngrx/signals";
import { SitesListSlice } from "./sites-list.slice";
import { _IdGenerator } from "@angular/cdk/a11y";

export function setSearchWord(searchWord: string): PartialStateUpdater<SitesListSlice> {
    return _ => ({
        searchWord,
    });
}

export function setSelectedSiteId(siteId: number | null): PartialStateUpdater<SitesListSlice> {
    return _ => ({
        selectedSiteId: siteId,
    });
}
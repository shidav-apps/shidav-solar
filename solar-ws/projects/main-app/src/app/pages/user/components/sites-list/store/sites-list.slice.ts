export interface SitesListSlice {
    readonly searchWord: string;
    readonly selectedSiteId: number | null;
}

export const initialSitesListSlice: SitesListSlice = {
    searchWord: '',
    selectedSiteId: null,
};
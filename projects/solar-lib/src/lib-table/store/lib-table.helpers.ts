import { LibTableSlice } from "./lib-table.slice";

export type SignalOf<T> = {
    [K in keyof T]: () => T[K]
};

export function getCoreState(store: SignalOf<LibTableSlice>): LibTableSlice {
    return {
        data: store.data(), 
        columns: store.columns(),
        trackBy: store.trackBy(),
        cellTemplates: store.cellTemplates(),
        headerTemplates: store.headerTemplates(),
        defaultCellTemplate: store.defaultCellTemplate(),
        defaultHeaderTemplate: store.defaultHeaderTemplate(),
        sortColumn: store.sortColumn(),
        sortDirection: store.sortDirection(),
        selectedItemId: store.selectedItemId(),
        selectionMode: store.selectionMode(),
        sortable: store.sortable()        
    }
}





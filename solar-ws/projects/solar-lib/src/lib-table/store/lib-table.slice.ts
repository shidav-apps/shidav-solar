import { TemplateRef } from "@angular/core";
import { LibTableColumnDefinition } from "../models/column-defition.model";
import { LibTableDataType, LibTableKeyType } from "../models/lib-table-values.model";
import { TrackBySelector } from "../models/selectors.model";
import { CellTemplateContext, HeaderTemplateContext, TemplateMap } from "../models/template-context.model";
import { ColumnSortDirection } from "../models/sort.model";

export interface LibTableSlice {
    readonly data: LibTableDataType[];
    readonly columns: LibTableColumnDefinition<LibTableDataType>[];
    readonly trackBy: TrackBySelector<LibTableDataType>;
    readonly defaultCellTemplate: TemplateRef<CellTemplateContext> | null;
    readonly defaultHeaderTemplate: TemplateRef<HeaderTemplateContext> | null;

    readonly cellTemplates: TemplateMap<CellTemplateContext>;
    readonly headerTemplates: TemplateMap<HeaderTemplateContext>;

    readonly sortColumn: string;
    readonly sortDirection: ColumnSortDirection;
    readonly selectedItemId: LibTableKeyType | null;
    readonly selectionMode: LibTableSelectionMode;
    readonly sortable: boolean;
}

export const initialLibTableSlice: LibTableSlice = {
    data: [],
    columns: [],
    trackBy: t => t,
    defaultCellTemplate: null,
    defaultHeaderTemplate: null,
    cellTemplates: {},
    headerTemplates: {},
    sortColumn: '',
    sortDirection: '',
    selectedItemId: null,
    selectionMode: 'select', 
    sortable: true
}


export type InitialLibTableState = LibTableSlice & {
    defaultCellTemplate: TemplateRef<CellTemplateContext>;
    defaultHeaderTemplate: TemplateRef<HeaderTemplateContext>;
}
export type LibTableSelectionMode = 'click' | 'select' | 'none';
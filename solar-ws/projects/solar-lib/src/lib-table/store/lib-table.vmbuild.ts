import { TableVm } from "../view-models/table.vm";
import { ColumnVm } from '../view-models/column.vm';
import { SortDirection } from '@angular/material/sort';
import { LibTableDataType, LibTableValueType } from '../models/lib-table-values.model';
import { RowVm } from '../view-models/row.vm';
import { CellVm } from '../view-models/cell.vm';
import { InitialLibTableState, LibTableSlice } from "./lib-table.slice";
import { ColumnSortDirection } from "../models/sort.model";

const EMPTY_STATE: TableVm = {
    columns: [], 
    rows: [], 
    selectedKey: null, 
    selectionMode: 'none', 
    sortable: false
}

export function buildLibTableVm(state: LibTableSlice): TableVm {
    if (!isInitializedState(state)) return EMPTY_STATE;
    const columns = state.columns.map((_, index) => buildColumnVm(state, index));
    const sortedData = getSortedData(state);
    const rows = sortedData.map(item => buildRowVm(state, item.index));
    const selectedKey = state.selectionMode === 'select' ? state.selectedItemId : null;

    return {
        columns, 
        rows, 
        selectedKey,
        selectionMode: state.selectionMode, 
        sortable: state.sortable
    }
}

export function isInitializedState(state: LibTableSlice): state is InitialLibTableState {
    return !!state.defaultCellTemplate && !!state.defaultHeaderTemplate;
}

export function buildColumnVm(state: LibTableSlice, index: number): ColumnVm {
    const coldef = state.columns[index];
    const id = coldef.id;
    const header = coldef.header ?? id;
    const template = state.headerTemplates[id] ?? state.defaultHeaderTemplate;
    const sortDirection: SortDirection = (state.sortColumn === id) ? state.sortDirection : '';
    const width: number = coldef.width ?? 100;
    const sortable: boolean = state.sortable && (coldef.value !== undefined);

    return {
        id, 
        header, 
        template, 
        sortDirection, 
        width, 
        sortable
    }
}

type SortItem = {
    item: LibTableDataType, 
    index: number, 
    value: LibTableValueType
}

type Comparer = (a: SortItem, b: SortItem) => number;
function getComparer(sortDirection: ColumnSortDirection): Comparer {
    const multiplier = (sortDirection === 'desc') ? -1 : 1;
    return (a, b) => {
        if (a.value === b.value) return 0;
        if (a.value > b.value) return 1 * multiplier;
        return -1 * multiplier;
    }
}

export function getSortedData(state: LibTableSlice): SortItem[] {
    const sortColDef = state.columns.find(c => c.id === state.sortColumn);

    if ((typeof(sortColDef) === 'undefined') || (typeof(sortColDef.value) === 'undefined')) {
        return state.data.map((item, index) => ({item, index, value: ''}))
    }

    const records: SortItem[] = state.data.map((item, index) => ({item, index, value: sortColDef.value!(item, index)}));
    const comparer = getComparer(state.sortDirection);
    const sorted = state.sortable ? records.sort(comparer) : records;
    return sorted;
}

export function buildRowVm(state: InitialLibTableState, rowIndex: number): RowVm {
    const item = state.data[rowIndex];
    const key = state.trackBy(item, rowIndex);
    const isSelected = (state.selectedItemId === key);
    const cells = state.columns.map((_, index) => buildCellVm(state, rowIndex, index, item, key));
    return {
        key, 
        cells, 
        isSelected, 
        item, 
        index: rowIndex
    }
}

export function buildCellVm(state: InitialLibTableState, rowIndex: number, columnIndex: number, item: LibTableDataType, rowKey: LibTableDataType): CellVm {
    const colDef = state.columns[columnIndex];
    const columnId = colDef.id;
    const value = (colDef.value === undefined) ? String(item) : colDef.value!(item, rowIndex);
    const template = state.cellTemplates[columnId] ?? state.defaultCellTemplate;
    const isRowSelected = (state.selectedItemId === rowKey);
    const width = colDef.width ?? 100;

    return {
        rowKey, 
        columnId, 
        value, 
        item, 
        template, 
        rowIndex, 
        isRowSelected, 
        width
    }
}
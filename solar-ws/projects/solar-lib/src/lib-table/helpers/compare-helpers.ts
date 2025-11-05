import isEqual from 'lodash.isequal';
import { TableVm } from "../view-models/table.vm";
import { LibTableSlice } from '../store/lib-table.slice';

export function areTableStatesEqual(s1: LibTableSlice, s2: LibTableSlice): boolean {
    return isEqual(s1.data, s2.data)
    && isEqual(s1.columns, s2.columns)
    && (s1.trackBy === s2.trackBy)
    && (s1.defaultCellTemplate === s2.defaultCellTemplate)
    && (s1.defaultHeaderTemplate === s2.defaultHeaderTemplate)
    && isEqual(s1.cellTemplates, s2.cellTemplates)
    && isEqual(s1.headerTemplates, s2.headerTemplates)
    && (s1.sortColumn === s2.sortColumn)
    && (s1.sortDirection === s2.sortDirection)
    && isEqual(s1.selectedItemId, s2.selectedItemId)
    && (s1.selectionMode === s2.selectionMode)
    && (s1.sortable === s2.sortable);
}

export function areTableVmsEqual(s1: TableVm, s2: TableVm): boolean {
    return isEqual(s1, s2);
}
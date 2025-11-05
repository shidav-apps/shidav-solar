import { TemplateRef } from '@angular/core';
import {
  PartialStateUpdater,
  patchState,
  signalMethod,
  SignalMethod,
  WritableStateSource,
} from '@ngrx/signals';
import { CellTemplateContext, HeaderTemplateContext } from '../models/template-context.model';
import { LibTableSlice } from './lib-table.slice';
import { calcNewSort } from '../helpers/sort-helpers';
import { LibTableKeyType } from '../models/lib-table-values.model';

export function propUpdater<T extends object, K extends keyof T>(
  store: WritableStateSource<T>,
  key: K
): SignalMethod<T[K]> {
  return signalMethod((value: T[K]) => {
    patchState(store, { [key]: value } as unknown as Partial<NoInfer<T>>);
  });
}

export function setTampleteRecord<T>(
  record: Record<string, T>,
  key: string,
  value: T | null
): Record<string, T> {
  if (value !== null) {
    return {
      ...record,
      [key]: value,
    };
  } else {
    // if the value is null = we return all the record except the specified key
    // so setting to null is like removing from the record
    const { [key]: value, ...result } = record;
    return result;
  }
}

export function updateHeaderTemplate(
  columnId: string,
  value: TemplateRef<HeaderTemplateContext> | null
): PartialStateUpdater<LibTableSlice> {
  return (state: LibTableSlice) => ({
    headerTemplates: setTampleteRecord(state.headerTemplates, columnId, value),
  });
}

export function updateCellTemplate(
  columnId: string,
  value: TemplateRef<CellTemplateContext> | null
): PartialStateUpdater<LibTableSlice> {
  return (state: LibTableSlice) => ({
    cellTemplates: setTampleteRecord(state.cellTemplates, columnId, value),
  });
}

export function toggleSort(id: string): PartialStateUpdater<LibTableSlice> {
    return (state: LibTableSlice) => {
        const newSort = calcNewSort({column: state.sortColumn, direction: state.sortDirection}, id);
        return {
            sortColumn: newSort.column, 
            sortDirection: newSort.direction
        }
    }
}

export function clearSort(): PartialStateUpdater<LibTableSlice> {
    return _ => ({
        sortColumn: '', 
        sortDirection: 'asc'
    })
}

export function toggleSelection(key: LibTableKeyType): PartialStateUpdater<LibTableSlice> {
    return (state: LibTableSlice) => ({
        selectedItemId: (state.selectedItemId === key) ? null : key
    })
}

export function clearSelected(): PartialStateUpdater<LibTableSlice> {
    return _ => ({selectedItemId: null})
}

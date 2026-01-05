import {
  patchState,
  signalMethod,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { initialLibTableSlice } from './lib-table.slice';
import { computed, TemplateRef } from '@angular/core';
import { buildLibTableVm } from './lib-table.vmbuild';
import { getCoreState } from './lib-table.helpers';
import { LibTableDataType } from '../models/lib-table-values.model';
import {
  CellTemplateContext,
  HeaderTemplateContext,
} from '../models/template-context.model';
import {
  clearSort,
  propUpdater,
  toggleSelection,
  toggleSort,
  updateCellTemplate,
  updateHeaderTemplate,
  clearSelected,
} from './lib-table.updaters';

export const LibTableStore = signalStore(
  withState(initialLibTableSlice),
  withComputed((store) => ({
    vm: computed(() => buildLibTableVm(getCoreState(store))),
  })),
  withMethods((store) => ({
    setData: propUpdater(store, 'data'),
    setColumns: propUpdater(store, 'columns'),
    setTrackBy: propUpdater(store, 'trackBy'),
    setDefaultCellTemplate: propUpdater(store, 'defaultCellTemplate'),
    setDefaultHeaderTemplate: propUpdater(store, 'defaultHeaderTemplate'),
    setSelectedItemId: propUpdater(store, 'selectedItemId'),
    setSelectionMode: propUpdater(store, 'selectionMode'),
    setSortable: propUpdater(store, 'sortable'),

    setHeaderTemplate: signalMethod(
      (prms: {
        columnId: string;
        value: TemplateRef<HeaderTemplateContext> | null;
      }) => {
        patchState(store, updateHeaderTemplate(prms.columnId, prms.value));
      }
    ),
    setCellTemplate: signalMethod(
      (prms: { columnId: string; value: TemplateRef<CellTemplateContext> | null}) => {
        patchState(store, updateCellTemplate(prms.columnId, prms.value));
      }
    ),
    toggleSort: signalMethod((columnId: string) =>
      patchState(store, toggleSort(columnId))
    ),
    clearSort: signalMethod(() => patchState(store, clearSort())),
    toggleSelection: signalMethod((key: LibTableDataType) =>
      patchState(store, toggleSelection(key))
    ),
    clearSelected: signalMethod(() => patchState(store, clearSelected())),
  }))
);

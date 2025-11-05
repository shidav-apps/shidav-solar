import {
  Component,
  TemplateRef,
  TrackByFunction,
  afterNextRender,
  computed,
  effect,
  inject,
  input,
  model,
  viewChild,
} from '@angular/core';
import {
  LibTableKeyType,
  LibTableDataType,
} from './models/lib-table-values.model';
import { LibTableColumnDefinition } from './models/column-defition.model';
import { TrackBySelector } from './models/selectors.model';
import {
  CellTemplateContext,
  HeaderTemplateContext,
} from './models/template-context.model';
import { RowVm } from './view-models/row.vm';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { LibTableStore } from './store/lib-table.store';
import { LibTableSelectionMode } from './store/lib-table.slice';

@Component({
  standalone: false,
  selector: 'lib-table',
  templateUrl: './lib-table.component.html',
  styleUrl: './lib-table.component.scss',
  providers: [LibTableStore],
  host: {
    '[style.--row-height.px]': 'rowHeight()',
  },
})
export class LibTableComponent {
  readonly store = inject(LibTableStore);

  readonly trackByRowKey: TrackByFunction<RowVm> = (_, row) => row.key;

  readonly rowHeight = input(40);
  readonly data = input<LibTableDataType[] | null>(null);
  readonly effectiveData = computed(() => this.data() ?? []);

  readonly columns = input<LibTableColumnDefinition<any>[]>([]);
  readonly trackBy = input<TrackBySelector<any>>((t) => t);
  readonly selected = model<LibTableKeyType | null>(null);
  readonly selectionMode = input<LibTableSelectionMode>('none');
  readonly sortable = input<boolean>(false);

  readonly defaultCellTemplate = viewChild.required<
    unknown,
    TemplateRef<CellTemplateContext>
  >('defaultCellTemplate', { read: TemplateRef });

  readonly defaultHeaderTemplate = viewChild.required<
    unknown,
    TemplateRef<HeaderTemplateContext>
  >('defaultHeaderTemplate', { read: TemplateRef });

  readonly virtualViewport = viewChild.required(CdkVirtualScrollViewport);

  constructor() {
    this.store.setData(this.effectiveData);
    this.store.setColumns(this.columns);
    this.store.setTrackBy(this.trackBy);
    this.store.setSelectedItemId(this.selected);
    this.store.setSelectionMode(this.selectionMode);
    this.store.setSortable(this.sortable);
    this.store.setDefaultCellTemplate(this.defaultCellTemplate);
    this.store.setDefaultHeaderTemplate(this.defaultHeaderTemplate);

    effect(() => {
      this.selected.set(this.store.selectedItemId());
    });

    afterNextRender(async () => {
      for (let index = 0; index < 5; index++) {
        await new Promise((res) => setTimeout(res, index * 200 + 100));
        this.virtualViewport().checkViewportSize();
      }
    });
  }

  toggleSelection(key: LibTableKeyType) {
    this.store.toggleSelection(key);
  }
}

import { Component, Input, inject, input } from '@angular/core';
import { ColumnVm } from '../../view-models/column.vm';
import { LibTableStore } from '../../store/lib-table.store';

@Component({
  standalone: false,
  selector: 'lib-header-row',
  templateUrl: './header-row.component.html',
  styleUrl: './header-row.component.scss'
})
export class HeaderRowComponent {
  readonly store = inject(LibTableStore);

  readonly columns = input.required<ColumnVm[]>();

  toggleSort(col: ColumnVm) {
    if (col.sortable) {
      this.store.toggleSort(col.id);
    }
  }

}

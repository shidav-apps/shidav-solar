import { Component, ContentChild, Input, computed, contentChild, inject, input } from '@angular/core';
import { TableCellDirective } from '../../directives/table-cell.directive';
import { TableHeaderDirective } from '../../directives/table-header.directive';
import { LibTableStore } from '../../store/lib-table.store';

@Component({
  standalone: false,
  selector: 'lib-column',
  templateUrl: './column.component.html',
  styleUrl: './column.component.scss'
})
export class ColumnComponent {
  readonly store = inject(LibTableStore);
  readonly id = input.required<string>();

  readonly tableCellDirective = contentChild(TableCellDirective);
  readonly cellTemplate = computed(() => this.tableCellDirective()?.template ?? null);
  readonly cellTemplateTrigger = computed(() => ({
    columnId: this.id(), 
    value: this.cellTemplate()
  }));

  readonly tableHeaderDirective = contentChild(TableHeaderDirective);
  readonly headerTemplate = computed(() => this.tableHeaderDirective()?.template ?? null);
  readonly headerTemplateTrigger = computed(() => ({
    columnId: this.id(), 
    value: this.headerTemplate()
  }));

  constructor() {
    this.store.setCellTemplate(this.cellTemplateTrigger);
    this.store.setHeaderTemplate(this.headerTemplateTrigger);
  }
}

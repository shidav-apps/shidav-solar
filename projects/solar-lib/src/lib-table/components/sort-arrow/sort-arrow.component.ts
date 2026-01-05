import { Component, input, Input } from '@angular/core';
import { SortDirection } from '@angular/material/sort';
import { ColumnSortDirection } from '../../models/sort.model';

@Component({
  standalone: false,
  selector: 'lib-sort-arrow',
  templateUrl: './sort-arrow.component.html',
  styleUrl: './sort-arrow.component.scss'
})
export class SortArrowComponent {
  readonly direction = input<ColumnSortDirection>('');
}

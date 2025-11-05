import { Component, input, Input } from '@angular/core';
import { RowVm } from '../../view-models/row.vm';

@Component({
  standalone: false,
  selector: 'lib-data-row',
  templateUrl: './data-row.component.html',
  styleUrl: './data-row.component.scss'
})
export class DataRowComponent {
  readonly row = input.required<RowVm>();
}

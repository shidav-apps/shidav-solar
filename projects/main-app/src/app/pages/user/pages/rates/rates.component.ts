import { Component, signal } from '@angular/core';
import { LibTableColumnDefinition, LibTableModule, SharedModule } from '@solar-lib';
import { SAMPLE_DATA, SampleRecord } from './sample-data';

@Component({
  selector: 'app-rates',
  imports: [LibTableModule, SharedModule],
  templateUrl: './rates.component.html',
  styleUrl: './rates.component.scss'
})
export default class RatesComponent {
  readonly columns: LibTableColumnDefinition<SampleRecord>[] = [
    { id: 'name', header: 'שם', value: r => r.name, width: 200 }, 
    { id: 'phone', header: 'טלפון', value : r => r.phone, width: 120 },
    { id: 'email', header: 'אימייל', value: r => r.email, width: 250 },
    { id: 'area', header: 'אזור', value: r => r.area, width: 100 },
    { id: 'supplier', header: 'ספק', value: r => r.supplier, width: 100 },
    { id: 'accountNumber', header: 'מספר חשבון', value: r => r.accountNumber, width: 150 },
  ] as const;

  readonly data = signal(SAMPLE_DATA);

}

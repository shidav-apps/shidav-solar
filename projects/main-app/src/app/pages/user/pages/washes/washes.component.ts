import { Component, computed, signal } from '@angular/core';
import { washColumns, washesData } from './washes.data';
import { LibTableModule, SharedModule } from '@solar-lib';

@Component({
  selector: 'app-washes',
  imports: [SharedModule, LibTableModule],
  templateUrl: './washes.component.html',
  styleUrl: './washes.component.scss'
})
export default class WashesComponent {
  readonly data = signal(washesData);
  readonly keyword = signal('');

  readonly filteredData = computed(() => this.data().filter(rec => 
      rec.customer.includes(this.keyword()) 
      || rec.id.toString().includes(this.keyword())
  ));

  readonly columns = signal(washColumns);
  readonly showRate = signal(true);

  readonly shownColumns = computed(() => this.showRate()
    ? this.columns()
    : this.columns().filter(col => col.id !== 'rate')
  );

  deleteRow(id: number) {
    this.data.update(rows => rows.filter(r => r.id !== id));
  }



}

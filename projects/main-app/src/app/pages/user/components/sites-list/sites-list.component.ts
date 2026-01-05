import { Component, inject } from '@angular/core';
import { SitesItemComponent } from '../sites-item/sites-item.component';
import { SitesListStore } from './store/sites-list.store';
import { SharedModule } from '@solar-lib';

@Component({
  selector: 'app-sites-list',
  imports: [SitesItemComponent, SharedModule],
  templateUrl: './sites-list.component.html',
  styleUrl: './sites-list.component.scss', 
  providers: []
})
export class SitesListComponent {
  readonly store = inject(SitesListStore);
}

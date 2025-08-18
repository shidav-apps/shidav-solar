import { Component, inject } from '@angular/core';
import { AuthStore } from '../../../../stores/auth/auth.store';
import { SitesItemComponent } from '../sites-item/sites-item.component';
import { SitesListStore } from './store/sites-list.store';
import { MatExpansionModule } from "@angular/material/expansion";

@Component({
  selector: 'app-sites-list',
  imports: [SitesItemComponent, MatExpansionModule],
  templateUrl: './sites-list.component.html',
  styleUrl: './sites-list.component.scss', 
  providers: [SitesListStore]
})
export class SitesListComponent {
  readonly store = inject(SitesListStore);
}

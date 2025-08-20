import { Component, inject, input } from '@angular/core';
import { SiteInfo } from '@contract';
import { SiteVm } from '../sites-list/store/view-model/site.vm';
import { SitesListStore } from '../sites-list/store/sites-list.store';
import { MatButtonModule } from "@angular/material/button";
import { SharedModule } from '@solar-lib';

@Component({
  selector: 'app-sites-item',
  imports: [SharedModule],
  templateUrl: './sites-item.component.html',
  styleUrl: './sites-item.component.scss', 
  host: {
    '[class.selected]': 'store.selectedSiteId() === site().id',
  }
})
export class SitesItemComponent {
  readonly site = input.required<SiteVm>();
  readonly store = inject(SitesListStore);

}

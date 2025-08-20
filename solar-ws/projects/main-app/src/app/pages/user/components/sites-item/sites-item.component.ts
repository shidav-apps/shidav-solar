import { Component, inject, input } from '@angular/core';
import { SiteInfo } from '@contract';
import { SiteVm } from '../sites-list/store/view-model/site.vm';
import { SitesListStore } from '../sites-list/store/sites-list.store';

@Component({
  selector: 'app-sites-item',
  imports: [],
  templateUrl: './sites-item.component.html',
  styleUrl: './sites-item.component.scss'
})
export class SitesItemComponent {
  readonly site = input.required<SiteVm>();
  readonly store = inject(SitesListStore);

}

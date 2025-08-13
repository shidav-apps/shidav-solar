import { Component, input } from '@angular/core';
import { SiteInfo } from '@contract';

@Component({
  selector: 'app-sites-item',
  imports: [],
  templateUrl: './sites-item.component.html',
  styleUrl: './sites-item.component.scss'
})
export class SitesItemComponent {
  readonly site = input.required<SiteInfo>();

}

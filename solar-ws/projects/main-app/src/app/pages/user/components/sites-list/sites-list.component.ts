import { Component, inject } from '@angular/core';
import { AuthStore } from '../../../../stores/auth/auth.store';
import { SitesItemComponent } from '../sites-item/sites-item.component';

@Component({
  selector: 'app-sites-list',
  imports: [SitesItemComponent],
  templateUrl: './sites-list.component.html',
  styleUrl: './sites-list.component.scss'
})
export class SitesListComponent {
  readonly auth = inject(AuthStore);

}

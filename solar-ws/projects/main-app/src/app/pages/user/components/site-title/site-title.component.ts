import { Component, computed, inject } from '@angular/core';
import { AuthStore } from '../../../../stores/auth/auth.store';
import { SitesListStore } from '../sites-list/store/sites-list.store';

@Component({
  selector: 'app-site-title',
  imports: [],
  templateUrl: './site-title.component.html',
  styleUrl: './site-title.component.scss',
  providers: []
})
export class SiteTitleComponent {
       readonly sitestore = inject(SitesListStore);
 }


      
       
        



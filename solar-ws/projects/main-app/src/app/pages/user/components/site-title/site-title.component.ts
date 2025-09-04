import { Component, inject } from '@angular/core';
import { AuthStore } from '../../../../stores/auth/auth.store';
import { SitesListStore } from '../sites-list/store/sites-list.store';

@Component({
  selector: 'app-site-title',
  imports: [],
  templateUrl: './site-title.component.html',
  styleUrl: './site-title.component.scss',
  providers: [SitesListStore]
})
export class SiteTitleComponent {
       readonly authstore = inject(AuthStore);  
       readonly sitestore = inject(SitesListStore);
       readonly siteslist = this.authstore.sitesList;
       readonly selectedsiteid = this.sitestore.selectedSiteId;
       
       readonly sitename = this.siteslist().find(site => site.id === this.selectedsiteid())?.displayName || 'y';


 }


      
       
        



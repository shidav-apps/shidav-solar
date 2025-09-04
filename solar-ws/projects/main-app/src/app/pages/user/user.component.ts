import { Component } from '@angular/core';
import { SharedModule } from '@solar-lib';
import { HeaderComponent } from "./components/header/header.component";
import { NavBarComponent } from "./components/nav-bar/nav-bar.component";
import { SitesListComponent } from "./components/sites-list/sites-list.component";
import { SiteTitleComponent } from "./components/site-title/site-title.component";
import { SitesListStore } from './components/sites-list/store/sites-list.store';

@Component({
  selector: 'app-user',
  imports: [SharedModule, HeaderComponent, NavBarComponent, SitesListComponent, SiteTitleComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss', 
  providers: [SitesListStore]
})
export default class UserComponent {

}

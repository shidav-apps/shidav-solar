import { Component } from '@angular/core';
import { SharedModule } from '@solar-lib';
import { HeaderComponent } from "./components/header/header.component";
import { NavBarComponent } from "./components/nav-bar/nav-bar.component";

@Component({
  selector: 'app-user',
  imports: [SharedModule, HeaderComponent, NavBarComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export default class UserComponent {

}

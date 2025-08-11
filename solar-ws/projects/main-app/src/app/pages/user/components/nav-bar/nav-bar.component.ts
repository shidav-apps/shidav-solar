import { Component } from '@angular/core';
import { SharedModule } from '@solar-lib';
import { NavBarItemComponent } from "../nav-bar-item/nav-bar-item.component";

@Component({
  selector: 'app-nav-bar',
  imports: [SharedModule, NavBarItemComponent],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {

}

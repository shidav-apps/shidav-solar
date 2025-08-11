import { Component, input, signal } from '@angular/core';
import { SharedModule } from '@solar-lib';

@Component({
  selector: 'app-nav-bar-item',
  imports: [SharedModule],
  templateUrl: './nav-bar-item.component.html',
  styleUrl: './nav-bar-item.component.scss'
})
export class NavBarItemComponent {
  readonly icon = input.required<string>();

}

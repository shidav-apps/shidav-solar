import { Component, inject, input, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { SharedModule } from '@solar-lib';

@Component({
  selector: 'a[appNavBarItem]',
  imports: [SharedModule, RouterModule],
  templateUrl: './nav-bar-item.component.html',
  styleUrl: './nav-bar-item.component.scss', 
  hostDirectives: [
    RouterLinkActive,
    {
      directive: RouterLink,
      inputs: [
        'routerLink: appNavBarItem'
      ],
    },
  ]
})
export class NavBarItemComponent {
  readonly icon = input.required<string>();

  readonly appNavBarItem = input.required<string | any[]>();

  constructor() {
    inject(RouterLinkActive).routerLinkActive = 'selected';
  }

}

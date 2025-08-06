import { Component, inject } from '@angular/core';
import { AuthStore } from '../../../../stores/auth/auth.store';
import { SharedModule } from '@solar-lib';


@Component({
  selector: 'app-header',
  imports: [SharedModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  readonly auth = inject(AuthStore);

}

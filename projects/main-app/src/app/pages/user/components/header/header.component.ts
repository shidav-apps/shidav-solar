import { Component, inject } from '@angular/core';
import { AuthStore } from '../../../../stores/auth/auth.store';
import { SharedModule } from '@solar-lib';
import { MatMenu } from "@angular/material/menu";


@Component({
  selector: 'app-header',
  imports: [SharedModule, MatMenu],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  readonly auth = inject(AuthStore);

}

import { Component, inject } from '@angular/core';
import { DashboardStore } from './store/dashboard.store';
import { SharedModule } from '@solar-lib';

@Component({
  selector: 'app-dashboard',
  imports: [SharedModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss', 
  providers: [DashboardStore]
})
export default class DashboardComponent {
  readonly store = inject(DashboardStore);

}

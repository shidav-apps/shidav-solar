import { Component, inject } from '@angular/core';
import { DashboardStore } from './store/dashboard.store';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss', 
  providers: [DashboardStore]
})
export default class DashboardComponent {
  readonly store = inject(DashboardStore);

}

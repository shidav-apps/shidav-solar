import { Component, inject } from '@angular/core';
import { DashboardStore } from './store/dashboard.store';
import { SharedModule } from '@solar-lib';
import { BusyComponent } from "../../../../components/busy/busy.component";

@Component({
  selector: 'app-dashboard',
  imports: [SharedModule, BusyComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss', 
  providers: [DashboardStore]
})
export default class DashboardComponent {
  readonly store = inject(DashboardStore);

}

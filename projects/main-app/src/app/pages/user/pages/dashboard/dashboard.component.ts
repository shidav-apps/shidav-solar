import { Component, computed, inject } from '@angular/core';
import { DashboardStore } from './store/dashboard.store';
import { SharedModule } from '@solar-lib';
import { BusyComponent } from "../../../../components/busy/busy.component";
import { DashboardInvoicesComponent } from "./components/dashboard-invoices/dashboard-invoices.component";
import { DashboardRecommendationsComponent } from "./components/dashboard-recommendations/dashboard-recommendations.component";

@Component({
  selector: 'app-dashboard',
  imports: [SharedModule, BusyComponent, DashboardInvoicesComponent, DashboardRecommendationsComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss', 
  providers: [DashboardStore]
})
export default class DashboardComponent {
  readonly store = inject(DashboardStore);


  readonly totals = computed(() => this.store.dashboardData().value?.totals ?? {
    totalEnergy: 0,
    daylightHoursAvg: 0,
    efficiency: 0,
    totalRevenue: 0
  })

}

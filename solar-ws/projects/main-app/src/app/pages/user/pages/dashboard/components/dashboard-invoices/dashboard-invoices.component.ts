import { Component, computed, inject } from '@angular/core';
import { DashboardStore } from '../../store/dashboard.store';
import { buildDashboardInvoicesVm, createDashboardInvoiceVm } from './dashboard.vm';
import { SharedModule } from '@solar-lib';

@Component({
  selector: 'app-dashboard-invoices',
  imports: [SharedModule],
  templateUrl: './dashboard-invoices.component.html',
  styleUrl: './dashboard-invoices.component.scss'
})
export class DashboardInvoicesComponent {
  readonly store = inject(DashboardStore);
  readonly data = computed(() => this.store.dashboardData().value?.invoices || []);
  readonly vm = computed(() => buildDashboardInvoicesVm(this.data()));

}

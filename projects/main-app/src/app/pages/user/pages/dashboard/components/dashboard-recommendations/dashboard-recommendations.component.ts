import { Component, computed, inject } from '@angular/core';
import { DashboardStore } from '../../store/dashboard.store';
import { buildDashboardRecommendationsVm } from './dashboard-recommendations.vm';
import { SharedModule } from '@solar-lib';

@Component({
  selector: 'app-dashboard-recommendations',
  imports: [SharedModule],
  templateUrl: './dashboard-recommendations.component.html',
  styleUrl: './dashboard-recommendations.component.scss'
})
export class DashboardRecommendationsComponent {
  readonly store = inject(DashboardStore);
  readonly data = computed(() => this.store.dashboardData().value?.recommendations || []);
  readonly vm = computed(() => buildDashboardRecommendationsVm(this.data()));

}

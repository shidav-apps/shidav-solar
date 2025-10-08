import { Component, inject } from '@angular/core';
import { ReportsStore } from './store/reports.store';
import { ReportCardComponent } from './components/report-card/report-card.component';

@Component({
  selector: 'app-reports',
  imports: [ReportCardComponent],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss', 
  providers: [ReportsStore]
})
export default class ReportsComponent {
  readonly store = inject(ReportsStore);

}

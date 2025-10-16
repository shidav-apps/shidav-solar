import { Component, input, output } from '@angular/core';
import { ResportsRecord } from '../../store/reports.model';
import { SharedModule } from '@solar-lib';

@Component({
  selector: 'app-report-card',
  imports: [SharedModule],
  templateUrl: './report-card.component.html',
  styleUrl: './report-card.component.scss'
})
export class ReportCardComponent {
  readonly report = input.required<ResportsRecord>();
  readonly create = output<void>();

}

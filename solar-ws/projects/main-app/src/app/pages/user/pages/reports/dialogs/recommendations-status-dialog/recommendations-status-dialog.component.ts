import { Component, inject } from '@angular/core';
import { SharedModule } from '@solar-lib';
import { RECOMMENDATIONS_STATUS_OPTIONS } from './recommendations-status-dialog.model';

@Component({
  selector: 'app-recommendations-status-dialog',
  imports: [SharedModule],
  templateUrl: './recommendations-status-dialog.component.html',
  styleUrl: './recommendations-status-dialog.component.scss'
})
export class RecommendationsStatusDialogComponent {
  readonly reportTypeOptions = createOptionsList(RECOMMENDATIONS_STATUS_OPTIONS.reportTypes);
  readonly invoiceStatusOptions = createOptionsList(RECOMMENDATIONS_STATUS_OPTIONS.invoiceStatuses);
  readonly dateTypeOptions = createOptionsList(RECOMMENDATIONS_STATUS_OPTIONS.dateTypes)
  readonly fileTypeOptions = createOptionsList(RECOMMENDATIONS_STATUS_OPTIONS.fileType)




}

function createOptionsList(options: object): { key: string; label: string }[] {
  return Object.entries(options).map(([key, label]) => ({ key, label }));
}

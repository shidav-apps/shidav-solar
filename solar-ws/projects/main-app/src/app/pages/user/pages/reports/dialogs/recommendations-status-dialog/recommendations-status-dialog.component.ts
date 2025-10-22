import { Component, computed, inject } from '@angular/core';
import { SharedModule } from '@solar-lib';
import {
  RECOMMENDATIONS_STATUS_OPTIONS,
  RecommendationsStatusDateType,
  RecommendationsStatusDialogOutput,
  RecommendationsStatusFileType,
  RecommendationsStatusInvoiceStatus,
  RecommendationsStatusReportType,
} from './recommendations-status-dialog.model';
import { FormControl, FormControlStatus, FormGroup, Validators } from '@angular/forms';
import { from } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-recommendations-status-dialog',
  imports: [SharedModule],
  templateUrl: './recommendations-status-dialog.component.html',
  styleUrl: './recommendations-status-dialog.component.scss',
})
export class RecommendationsStatusDialogComponent {
  readonly dialogRef = inject(MatDialogRef<RecommendationsStatusDialogComponent, RecommendationsStatusDialogOutput>);

  readonly reportTypeOptions = createOptionsList(
    RECOMMENDATIONS_STATUS_OPTIONS.reportTypes
  );
  readonly invoiceStatusOptions = createOptionsList(
    RECOMMENDATIONS_STATUS_OPTIONS.invoiceStatuses
  );
  readonly dateTypeOptions = createOptionsList(
    RECOMMENDATIONS_STATUS_OPTIONS.dateTypes
  );
  readonly fileTypeOptions = createOptionsList(
    RECOMMENDATIONS_STATUS_OPTIONS.fileType
  );

  readonly form = new FormGroup({
    reportType: new FormControl<RecommendationsStatusReportType | null>(null, [
      Validators.required,
    ]),
    invoiceStatus: new FormControl<RecommendationsStatusInvoiceStatus | null>(
      null,
      [Validators.required]
    ),
    allCustomers: new FormControl<boolean>(false, []),
    dateType: new FormControl<RecommendationsStatusDateType | null>(null, [
      Validators.required,
    ]),
    fromDate: new FormControl<string | null>(null, [Validators.required]),
    toDate: new FormControl<string | null>(null, [Validators.required]),
    fileType: new FormControl<RecommendationsStatusFileType | null>(null, [Validators.required]),
  });

  readonly formStatus = toSignal(this.form.statusChanges, {
    initialValue: 'INVALID' as FormControlStatus,
  });

  readonly isValid = computed(() => this.formStatus() === 'VALID');

  onSubmit() {
    if (this.form.valid) {
      const res = this.form.value as RecommendationsStatusDialogOutput;
      this.dialogRef.close(res);
    }
  }

}

function createOptionsList(options: object): { key: string; label: string }[] {
  return Object.entries(options).map(([key, label]) => ({ key, label }));
}

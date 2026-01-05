import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
  RecommendationsStatusDialogInput,
  RecommendationsStatusDialogOutput,
} from '../dialogs/recommendations-status-dialog/recommendations-status-dialog.model';
import { MatDialog } from '@angular/material/dialog';
import { RecommendationsStatusDialogComponent } from '../dialogs/recommendations-status-dialog/recommendations-status-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class ReportDialogsService {
  readonly matDialog = inject(MatDialog);

  openRecommendationsStatusDialog(): Observable<RecommendationsStatusDialogOutput | null> {
    const dialogRef = this.matDialog.open<
      RecommendationsStatusDialogComponent,
      RecommendationsStatusDialogInput,
      RecommendationsStatusDialogOutput
    >(RecommendationsStatusDialogComponent, {
      data: {},
    });

    const close$ = dialogRef.afterClosed().pipe(
        map(res => res || null)
    );

    return close$;
  }
}

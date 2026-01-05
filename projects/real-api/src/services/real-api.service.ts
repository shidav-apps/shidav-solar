import { Api, LoginResult, SolarReport } from '@contract';
import { delay, Observable, of } from 'rxjs';
import { DashboardData } from '../../../contract/src/models/dashboard/dashboard-data.model';
import { DataPeriod } from '../../../contract/src/models/data-period.model';

export class RealApiService implements Api {
  login(
    credentials: { userid: string; password: string } | null
  ): Observable<LoginResult> {
    throw new Error('Method not implemented.');
  }
  logout(): Observable<void> {
    throw new Error('Method not implemented.');
  }
  getDashboardData(
    siteId: number,
    period: DataPeriod
  ): Observable<DashboardData> {
    throw new Error('Method not implemented.');
  }

  downloadReport(report: SolarReport): Observable<void> {
    throw new Error('Method not implemented.');
  }
}

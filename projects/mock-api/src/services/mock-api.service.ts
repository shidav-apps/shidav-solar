import {
  Api,
  Company,
  LoginResult,
  SolarReport,
  User as UserModel,
} from '@contract';
import { delay, Observable, of } from 'rxjs';
import { MOCK_USERS } from '../data/users';
import { MOCK_COMPANY_MAP } from '../data/company';
import { mockCompanyToCompany } from './helpers';
import { DashboardData } from '../../../contract/src/models/dashboard/dashboard-data.model';
import { DataPeriod } from '../../../contract/src/models/data-period.model';
import { getDataForSiteForPeriod } from '../data/dashboard-data';
import { downloadCsv } from './downloader';
import { inject } from '@angular/core';
import {
  Auth,
  User,
} from '@angular/fire/auth';
import { fbAuth } from './fb-auth-helpers';

export class MockApiService implements Api {
  readonly auth = inject(Auth);

  #mockOfUser(user: User): UserModel {
    const mockUser = MOCK_USERS.find((u) => u.email === user.email);
    const companies: Company[] =
      mockUser?.companyIds
        .map((cid) => MOCK_COMPANY_MAP[cid])
        .map(mockCompanyToCompany) || [];
    return {
      id: user.uid,
      email: user.email || '',
      displayName: mockUser ? mockUser.displayName : 'Unknown User',
      companies: companies,
    };
  }

  login(
    req: { userid: string; password: string } | null
  ): Observable<LoginResult> {
    if (req === null)
      return fbAuth.relogin(this.auth, (user) => this.#mockOfUser(user));

    return fbAuth.loginWithCredentials(
      this.auth,
      req.userid,
      req.password,
      (user) => this.#mockOfUser(user)
    );
  }

  logout(): Observable<void> {
    return fbAuth.logout(this.auth);
  }

  getDashboardData(
    siteId: number,
    period: DataPeriod
  ): Observable<DashboardData> {
    const res = getDataForSiteForPeriod(siteId, period);
    return of(res).pipe(delay(2000));
  }

  downloadReport(report: SolarReport): Observable<void> {
    const content: string[][] = [
      ['Site ID', report.siteId.toString()],
      ['Report Type', report.type],
      ['Date', new Date().toISOString()],
    ];

    const filename = `report-site-${report.siteId}-${report.type}.csv`;

    downloadCsv(filename, content);
    return of(void 0).pipe(delay(1000));
  }
}

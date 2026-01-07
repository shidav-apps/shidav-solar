import { Api, Company, LoginError, LoginResult, SolarReport, User } from '@contract';
import { delay, from, map, Observable, of } from 'rxjs';
import { MOCK_USERS } from '../data/users';
import { MOCK_COMPANIES, MOCK_COMPANY_MAP } from '../data/company';
import { mockCompanyToCompany } from './helpers';
import { DashboardData } from '../../../contract/src/models/dashboard/dashboard-data.model';
import { DataPeriod } from '../../../contract/src/models/data-period.model';
import { getDataForSiteForPeriod } from '../data/dashboard-data';
import { downloadCsv } from './downloader';
import { inject } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { FirebaseError } from '@angular/fire/app';

export class MockApiService implements Api {
  readonly auth = inject(Auth);

  login(
    req: { userid: string; password: string } | null
  ): Observable<LoginResult> {
    if (req === null) {
      // relogin
      const res = new Observable<LoginResult>((subscriber) => {
        const unsub = this.auth.onAuthStateChanged((user) => {
          if (user) {
            const mockUser = MOCK_USERS.find((u) => u.email === user.email);
            if (mockUser) {
              const companies: Company[] = mockUser.companyIds
                .map((cid) => MOCK_COMPANY_MAP[cid])
                .map(mockCompanyToCompany);

              subscriber.next({
                type: 'success',
                user: {
                  id: user.uid,
                  email: user.email || '',
                  displayName: mockUser.displayName,
                  companies: companies,
                },
              });
            }
          } else {
            subscriber.next({ type: 'not-init' });
          }
        });
        return () => unsub();
      });
      return res;
    }

    // if we got here, there is a login request
    return new Observable<LoginResult>((subscriber) => {
      const executer = async () => {
        try {
          const userCredential = await signInWithEmailAndPassword(
            this.auth,
            req.userid,
            req.password
          );
          const id = userCredential.user.uid;
          const email = userCredential.user.email || '';
          const mockUser = MOCK_USERS.find((u) => u.email === email);
          const displayName = mockUser ? mockUser.displayName : 'Unknown User';
          const companies: Company[] = mockUser
            ? mockUser.companyIds
                .map((cid) => MOCK_COMPANY_MAP[cid])
                .map(mockCompanyToCompany)
            : [];

          const res: LoginResult = {
            type: 'success',
            user: {
              id: id,
              email: email,
              displayName: displayName,
              companies: companies,
            },
          };

          subscriber.next(res);
        } catch (error) {
          let reason: LoginError['reason'] = 'User Id Not Found';
          if ((error instanceof FirebaseError) 
              && error.code === 'auth/wrong-password') {
            reason = 'Incorrect Password';
          }

          const res: LoginResult = {
            type: 'error',
            reason: reason,
          };
          subscriber.next(res);
        }
      };
      executer();
      return () => {};
    });
  }

  logout(): Observable<void> {
    return from(signOut(this.auth)).pipe(map(() => void 0));
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

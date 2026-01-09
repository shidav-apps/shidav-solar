import { Api, Company, DashboardData, DataPeriod, LoginResult, SolarReport } from '@contract';
import { Observable } from 'rxjs';
import { Auth, User } from '@angular/fire/auth';
import { MOCK_USERS } from '../../../mock-api/src/data/users';
import { MOCK_COMPANY_MAP } from '../../../mock-api/src/data/company';
import { mockCompanyToCompany } from '../../../mock-api/src/services/helpers';
import { fbAuth } from '@tools';
import { inject } from '@angular/core';

export class RealApiService implements Api {
  readonly auth = inject(Auth);

  async #mockOfUser(user: User) {
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
    throw new Error('Method not implemented.');
  }

  downloadReport(report: SolarReport): Observable<void> {
    throw new Error('Method not implemented.');
  }
}

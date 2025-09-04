import { Api, Company, LoginResult, User } from '@contract';
import { delay, Observable, of } from 'rxjs';
import { MOCK_USERS } from '../data/users';
import { MOCK_COMPANY_MAP } from '../data/company';
import { mockCompanyToCompany } from './helpers';
import { DashboardData } from '../../../contract/src/models/dashboard/dashboard-data.model';
import { DataPeriod } from '../../../contract/src/models/data-period.model';

export class MockApiService implements Api {
  
  login(req: {userid: string, password: string} | null): Observable<LoginResult> {
    if (req === null) {
      const userString = localStorage.getItem('solar-user');
      if (userString) {
        const user: User = JSON.parse(userString);
        const res: LoginResult = { type: 'success', user };
        return of(res);
      } 
      return of({type: 'not-init' })
    }

    const mockUser = MOCK_USERS.find(u => u.id === req.userid);
    const found = (!!mockUser) && req.password === 'correct';

    if (!found) {
      const reason = (!mockUser) ? 'User Id Not Found' : 'Incorrect Password';
      const res: LoginResult = { type: 'error', reason };
      return of(res).pipe(
        delay(2000)
      );
    }

    const companiesOfUser = mockUser.companyIds.map(id => MOCK_COMPANY_MAP[id]);
    const companies: Company[] = companiesOfUser.map(mock => 
      mockCompanyToCompany(mock));

    const user: User = {
      id: mockUser.id,
      email: mockUser.email,
      displayName: mockUser.displayName,
      companies: companies
    };

    localStorage.setItem('solar-user', JSON.stringify(user));

    const res: LoginResult = { type: 'success', user };
    return of(res).pipe(delay(2000));
  }

  logout(): Observable<void> {
    localStorage.removeItem('solar-user');
    return of(void 0).pipe(
        delay(1000)
    );
  }

    getDashboardDate(siteId: number, period: DataPeriod): Observable<DashboardData> {
    throw new Error('Method not implemented.');
  }

}

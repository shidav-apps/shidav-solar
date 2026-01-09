import { Api } from '@contract';
import { firstValueFrom, Observable } from 'rxjs';
import { Auth, User } from '@angular/fire/auth';
import { fbAuth } from '@tools';
import { inject } from '@angular/core';
import { DbModel } from '@db-model';
import { FirebaseFunctionsService } from './firebase-functions.service';

export class RealApiService implements Api {
  readonly auth = inject(Auth);
  readonly functions = inject(FirebaseFunctionsService);

  async #userProfile(user: User) {
    const dbUser = await firstValueFrom(
      this.functions.getUserProfile(user.uid)
    );

    return {
      id: user.uid,
      email: user.email || '',
      displayName: dbUser.displayName,
      companies: dbUser.companies,
    };
  }

  login(
    req: { userid: string; password: string } | null
  ): Observable<DbModel.LoginResult> {
    if (req === null)
      return fbAuth.relogin(this.auth, (user) => this.#userProfile(user));

    return fbAuth.loginWithCredentials(
      this.auth,
      req.userid,
      req.password,
      (user) => this.#userProfile(user)
    );
  }

  logout(): Observable<void> {
    return fbAuth.logout(this.auth);
  }

  getDashboardData(
    siteId: number,
    period: DbModel.DataPeriod
  ): Observable<DbModel.DashboardData> {
    return this.functions.getDashboardData({ siteId, period });
  }

  downloadReport(report: DbModel.SolarReport): Observable<void> {
    throw new Error('Method not implemented.');
  }
}

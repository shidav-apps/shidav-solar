import { inject, Injectable } from '@angular/core';
import { Functions, httpsCallableData } from '@angular/fire/functions';
import { ApiModel } from '@api-model';
import { DbModel } from '@db-model';
import { catchError, Observable } from 'rxjs';

type CallableFunction<Req, Res> = (req: Req) => Observable<Res>;

@Injectable({
  providedIn: 'root',
})
export class FirebaseFunctionsService {
  readonly functions = inject(Functions);

  callable<Req, Res>(name: string) {
    const func = httpsCallableData<Req, Res>(this.functions, name);
    return (req: Req) =>
      func(req).pipe(
        catchError((error) => {
          console.error(`Error calling ${name}:`, error);
          throw error;
        })
      );
  }

  readonly #getDashboardData = this.callable<
    ApiModel.getDashboardDataRequest,
    DbModel.DashboardData
  >('getDashboardData');

  readonly #getUserProfile = this.callable<string, DbModel.User>(
    'getUserProfile'
  );

  readonly #getCompanyNames = this.callable<void, string[]>(
    'getCompanyNames'
  );

  getDashboardData(req: ApiModel.getDashboardDataRequest) {
    return this.#getDashboardData(req);
  }

  getUserProfile(userId: string) {
    return this.#getUserProfile(userId);
  }

  getCompanyNames() {
    return this.#getCompanyNames();
  }
}

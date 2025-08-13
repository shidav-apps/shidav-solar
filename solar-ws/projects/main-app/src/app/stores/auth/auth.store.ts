import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { initialAuthSlice } from './auth.slice';
import { computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SOLAR_API, User } from '@contract';
import { map, switchMap, tap } from 'rxjs';
import { loginResult, loginStarted, logoutSuccess } from './auth.updaters';
import { getLoginErrorMessage, getUserInitials } from './auth.helpers';
export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState(initialAuthSlice),
  withDevtools('AuthStore'),
  withProps((store) => ({
    _router: inject(Router),
    _api: inject(SOLAR_API),
  })),
  withComputed(store => ({
    errorMessage: computed(() => getLoginErrorMessage(store.user().error)), 
    selectedCompanyName: computed(() => store.selectedCompanyId() 
      ? store.user().value?.companies.find(c => c.id === store.selectedCompanyId())!.dispalyName
      : ''), 
    userEmail: computed(() => store.user().value?.email || ''),
    userInitials: computed(() => getUserInitials(store.user().value?.displayName || '')),
  })),
  withMethods((store) => ({
    login: rxMethod<{ userId: string; password: string }>((trigger$) =>
      trigger$.pipe(
        tap((_) => patchState(store, loginStarted())),
        switchMap((req) =>
          store._api.login(req.userId, req.password).pipe(
            tap((res) => patchState(store, loginResult(res))),
            tap((res) => {
              if (res.type === 'success') {
                store._router.navigate(['/']);
              }
            })
          )
        )
      )
    ),
    logout: rxMethod<void>((trigger$) =>
      trigger$.pipe(
        tap((_) => patchState(store, loginStarted())),
        switchMap((_) =>
          store._api
            .logout()
            .pipe(tap((_) => patchState(store, logoutSuccess())))
        )
      )
    ),
  }))
);

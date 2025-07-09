import {
  patchState,
  signalStore,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { initialAuthSlice } from './auth.slice';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { SOLAR_API, User } from '@contract';
import { map, switchMap, tap } from 'rxjs';
import { loginResult, loginStarted, logoutSuccess } from './auth.updaters';
export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState(initialAuthSlice),
  withDevtools('AuthStore'),
  withProps((store) => ({
    _router: inject(Router),
    _api: inject(SOLAR_API),
  })),
  withMethods((store) => ({
    login: rxMethod<{ userId: string; password: string }>((trigger$) =>
      trigger$.pipe(
        tap((_) => patchState(store, loginStarted())),
        switchMap((req) =>
          store._api
            .login(req.userId, req.password)
            .pipe(tap((res) => patchState(store, loginResult(res))))
        )
      )
    ),
    logout: rxMethod<void>((trigger$) =>
      trigger$.pipe(
        tap(_ => patchState(store, loginStarted())),
        switchMap(_ =>
          store._api
            .logout()
            .pipe(tap(_ => patchState(store, logoutSuccess())))
        )
      )
    ),
  }))
);

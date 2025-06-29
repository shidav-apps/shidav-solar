import {
  patchState,
  signalStore,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';
import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { initialAuthSlice } from './auth.slice';
import { User } from '../../models/user.model';
import { login } from './auth.updaters';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState(initialAuthSlice),
  withDevtools('AuthStore'),
  withProps((store) => ({
    _router: inject(Router),
  })),
  withMethods((store) => ({
    login: (user: User) => {
      patchState(store, login(user));
      store._router.navigate(['/user']);
    },
  }))
);

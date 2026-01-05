import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStore } from '../stores/auth/auth.store';

export const authGuard: CanActivateFn = (route, state) => {
  const user = inject(AuthStore).user();
  const router = inject(Router);
  if (user.status === 'resolved') {
    return true;
  } else {
    return router.createUrlTree(['/login']);
  }
};

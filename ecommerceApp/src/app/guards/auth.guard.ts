import { CanActivateFn, Router } from '@angular/router';
import { UserAuthService } from '../services/user-auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const userAuthService = inject(UserAuthService);
  const router = inject(Router);

  if (userAuthService.getUserlogged()) {
    return true;
  } else {
    router.navigateByUrl('/login');
    return false;
  }
};

export const guestGuard: CanActivateFn = (route, state) => {
  const userAuthService = inject(UserAuthService);
  const router = inject(Router);

  if (userAuthService.getUserlogged()) {
    router.navigateByUrl('/Dashboard');
    return false;
  }
  return true;
};

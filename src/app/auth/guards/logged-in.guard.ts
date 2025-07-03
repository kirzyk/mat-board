import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loggedInGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const isLoggedIn = !!localStorage.getItem('mock_token');

  if (isLoggedIn) {
    router.navigate(['orders']);
    return false;
  } else {
    return true;
  }
};

import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const AuthGuard: CanActivateFn = (route, state) => {
  const userData = localStorage.getItem('userData');
  if (!userData) {
    const router = inject(Router);
    router.navigate(['/auth']);
    return false;
  }
  return true;
};

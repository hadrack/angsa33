import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router'; // Added Router import
import { AuthService } from './service/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService); // Store injected AuthService in a variable
  const router = inject(Router); // Store injected Router in a variable

  if (authService.isLoggedIn === false) {
    router.navigate(['/login']);
    return false;
  } else {
    return true;
  }
};
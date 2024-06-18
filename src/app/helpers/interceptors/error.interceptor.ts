import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthenticationService } from '../../services/authentication.service';
import { authentication } from '../../types/constants/authentication';
import { Router } from '@angular/router';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);

  return next(req).pipe(catchError(err => {
    if([401].includes(err.status) && authService.isAuthenticated()){
      authService.isAuthenticated.set(false);
      localStorage.setItem(authentication.token, '');
      router.navigateByUrl('/login');
    }

    return throwError(()=> err);
  }));
};

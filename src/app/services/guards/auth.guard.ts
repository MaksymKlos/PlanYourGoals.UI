import { Injectable, inject } from "@angular/core";
import { AuthenticationService } from "../authentication.service";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";

@Injectable({providedIn: 'root'})
export class AuthGuard {
  private authService = inject(AuthenticationService);
  private router = inject(Router);

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(this.authService.isAuthenticated()){
      return true;
    }

    this.router.navigateByUrl('/login');
    return false;
  }
}

export const IsAuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  return inject(AuthGuard).canActivate(route, state);
}

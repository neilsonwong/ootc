import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { UserAuthContext } from '../models/UserAuthContext';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    protected authContext: UserAuthContext;

    constructor(protected router: Router,
        protected authService: AuthenticationService) {
        this.authService.getAuthContextStream()
            .subscribe((authContext: UserAuthContext) => {
                this.authContext = authContext;
            });
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.authContext && this.authContext.securityClearance) {
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}

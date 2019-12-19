import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserAuthContext } from 'src/app/models/UserAuthContext';
import { AuthGuard } from './auth.guard';

@Injectable({ providedIn: 'root' })
export class AdminAuthGuard extends AuthGuard {
    constructor(protected router: Router,
        protected authService: AuthenticationService) {
            super(router, authService);
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.authContext && this.authContext.securityClearance === 2) {
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}

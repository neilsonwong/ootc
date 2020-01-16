import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { UserAuthContext } from '../models/UserAuthContext';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    protected authContext: UserAuthContext;

    constructor(private authService: AuthenticationService) {
        this.authService.getAuthContextStream()
            .subscribe((authContext: UserAuthContext) => {
                this.authContext = authContext;
            });

    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        if (this.authContext && this.authContext.token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${this.authContext.token}`
                }
            });
        }

        return next.handle(request);
    }
}

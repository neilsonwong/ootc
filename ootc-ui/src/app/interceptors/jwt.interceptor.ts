import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { UserAuthContext } from '../models/UserAuthContext';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private auth: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        const authContext: UserAuthContext = this.auth.getAuthContext();
        if (authContext && authContext.token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${authContext.token}`
                }
            });
        }

        return next.handle(request);
    }
}

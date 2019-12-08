// adapted from 
// https://jasonwatmore.com/post/2019/06/26/angular-8-basic-http-authentication-tutorial-example#basic-auth-interceptor-ts

import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserAuthContext } from '../models/UserAuthContext';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {
    constructor(private auth: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with basic auth credentials if available

        // RETIRED
        // const authContext: UserAuthContext = this.auth.getAuthContext();
        // if (authContext) {
        //     request = request.clone({
        //         setHeaders: { 
        //             Authorization: `Basic ${authContext.authdata}`
        //         }
        //     });
        // }

        return next.handle(request);
    }
}

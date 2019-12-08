import { catchError } from 'rxjs/operators';
import { HttpErrorResponse, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ErrorService } from '../services/error.service';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
    constructor(private authService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
                // auto logout if 401 response returned from api
                this.authService.logout();
                location.reload(true);
            }
            return throwError(error);
        }));
    }
}

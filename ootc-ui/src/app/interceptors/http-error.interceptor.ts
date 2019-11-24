import { catchError } from 'rxjs/operators';
import { HttpErrorResponse, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ErrorService } from '../services/error.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
    constructor(private errorService: ErrorService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const ignoredErrors: string[] = request.headers.getAll('x-suppressed-errors');

        return next.handle(request).pipe(catchError((error: HttpErrorResponse) => {
            if ((ignoredErrors === null) || (ignoredErrors.indexOf('' + error.status) === -1)) {
                this.errorService.add(error.error);
            }
            return throwError(error);
        }));
    }
}

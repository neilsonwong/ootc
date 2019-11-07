import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { of, OperatorFunction } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export function suppressError(errorCodes?: string|string[]) {
    if (!errorCodes || !Array.isArray(errorCodes)) {
        errorCodes = ['400'];
    }
    return { headers: new HttpHeaders({ 'x-suppressed-errors': errorCodes }) };
}

export function map200toTrue(): OperatorFunction<any, boolean> {
    return map((response: any) => {
        if (response.status === 200) {
        return true;
        }
        return false;
    });
}

export function errorsAreFalse(): OperatorFunction<any, boolean> {
    return catchError((error: HttpErrorResponse) => {
        return of(false);
    });
}

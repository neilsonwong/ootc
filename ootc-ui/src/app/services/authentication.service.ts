import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  getSecurityClearance(): number {
    return 1;
  }

  login(username: string, password: string): Observable<boolean> {
    return of(true);
  }

  logout(): void {

  }

  validateEmail(validationCode): Observable<boolean> {
    return of(true);
  }

  resendValidationEmail(userId): Observable<boolean> {
    return of(true);
  }
}

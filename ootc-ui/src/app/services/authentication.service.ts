import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { UserAuthContext } from '../models/UserAuthContext';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  getSecurityClearance(): number {
    const authContext = <UserAuthContext> (JSON.parse(localStorage.getItem('currentUser')));
    if (authContext) {
      return authContext.securityClearance;
    }
    return 0;
  }

  login(username: string, password: string): Observable<boolean> {
    // fake login
    if (username && username.length > 0 &&
      password && password.length > 0) {
        // TODO: fix this bro
        const secClearance = username === 'admin' ? 2 : 1;
        localStorage.setItem('currentUser', JSON.stringify(new UserAuthContext(username, password, secClearance)));
        return of(true);
    }
    return of(false);
  }

  logout(): void {
    localStorage.removeItem('currentUser');
  }

  validateEmail(validationCode: number): Observable<boolean> {
    return of(true);
  }

  resendValidationEmail(userId: string): Observable<boolean> {
    return of(true);
  }
}

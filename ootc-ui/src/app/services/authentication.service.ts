import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { of, Observable } from 'rxjs';
import { UserAuthContext } from 'src/app/models/UserAuthContext';
import { LoginCredentials } from 'src/app/models/LoginCredentials';
import { map } from 'rxjs/operators';
import { EmailValidationCredentials } from 'src/app/models/EmailValidationCredentials';

const API_URL = environment.API_URL;

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  getSecurityClearance(): number {
    const authContext = this.getAuthContext();
    if (authContext) {
      return authContext.securityClearance;
    }
    return 0;
  }

  login(username: string, password: string): Observable<boolean> {
    const url = `${API_URL}/login`;
    const cred = new LoginCredentials(username, password);

    if (username && username.length > 0 &&
      password && password.length > 0) {
        return this.http.post<number>(url, cred)
          .pipe(
            map((response: any) => {
              const authContext = new UserAuthContext(username, password, response.securityClearance);
              sessionStorage.setItem('currentUser', JSON.stringify(authContext));
              return (authContext.securityClearance > 0);
            })
          )
    }
    return of(false);
  }

  logout(): void {
    sessionStorage.removeItem('currentUser');
  }

  validateEmail(userId: string, validationCode: number): Observable<boolean> {
    const url = `${API_URL}/validateEmail`;
    const cred = new EmailValidationCredentials(userId, validationCode.toString());
    return this.http.post(url, cred)
      .pipe(
        map((response: any) => {
          if (response.status === 200) {
            return true;
          }
          return false;
        })
      );
  }

  resendValidationEmail(userId: string): Observable<boolean> {
    const url = `${API_URL}/resendValidation`;
    return this.http.post(url, { userId: userId })
      .pipe(
        map((response: any) => {
          if (response.status === 200) {
            return true;
          }
          return false;
        })
      );
  }

  getAuthContext(): UserAuthContext {
    return <UserAuthContext> (JSON.parse(sessionStorage.getItem('currentUser')));
  }
}

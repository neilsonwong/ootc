import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { of, Observable, Subject, ReplaySubject } from 'rxjs';
import { UserAuthContext } from 'src/app/models/UserAuthContext';
import { LoginCredentials } from 'src/app/models/LoginCredentials';
import { map, catchError, shareReplay } from 'rxjs/operators';
import { EmailValidationCredentials } from 'src/app/models/EmailValidationCredentials';

const API_URL = environment.API_URL;

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private authContextEmitter: Subject<UserAuthContext> = new ReplaySubject(1);
  private $authContext: Observable<UserAuthContext> = this.authContextEmitter.pipe(shareReplay(1));

  constructor(private http: HttpClient) { }

  getSecurityClearance(): number {
    const authContext = this.getAuthContext();
    return authContext ? authContext.securityClearance : 0;
  }

  login(username: string, password: string): Observable<string> {
    const url = `${API_URL}/login`;
    const cred = new LoginCredentials(username, password);

    if (username && username.length > 0 &&
      password && password.length > 0) {
        return this.http.post<number>(url, cred)
          .pipe(
            map((response: any) => {
              const authContext = new UserAuthContext(username, password, response.securityClearance, response.name);
              sessionStorage.setItem('currentUser', JSON.stringify(authContext));

              // emit for subject
              this.authContextEmitter.next(authContext);
              return null;
            }),
            catchError((error: any) => {
              if (error.status === 401) {
                return of('Invalid Login Credentials');
              } else  if (error.status === 400) {
                return of('Email is missing or unvalidated.');
              }
            })
          )
    }
    return of('Invalid login parameters');
  }

  logout(): void {
    sessionStorage.removeItem('currentUser');
    // emit for subject
    this.authContextEmitter.next({} as UserAuthContext);
  }

  validateEmail(userId: string, validationCode: number): Observable<boolean> {
    const url = `${API_URL}/validateEmail`;
    const cred = new EmailValidationCredentials(userId, validationCode);
    return this.http.post(url, cred, { observe: 'response' })
      .pipe(
        map((response: any) => {
          if (response.status === 200) {
            return true;
          }
          return false;
        }),
        catchError((error: HttpErrorResponse) => {
          return of(false);
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
    try {
      const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
      return <UserAuthContext> currentUser;
    }
    catch(e) {
      return ({} as UserAuthContext);
    }
  }

  getAuthContextStream(): Observable<UserAuthContext> {
    this.authContextEmitter.next(this.getAuthContext());
    return this.$authContext;
  }

  resetPassword(email: string): Observable<any> {
    const url = `${API_URL}/resetPassword`;
    return this.http.post(url, {userId: email});
  }
}

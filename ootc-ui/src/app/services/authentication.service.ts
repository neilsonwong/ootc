import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, ReplaySubject, Subject } from 'rxjs';
import { catchError, map, shareReplay } from 'rxjs/operators';
import { EmailValidationCredentials } from 'src/app/models/EmailValidationCredentials';
import { LoginCredentials } from 'src/app/models/LoginCredentials';
import { UserAuthContext } from 'src/app/models/UserAuthContext';
import { environment } from 'src/environments/environment';
import { errorsAreFalse, map200toTrue } from '../utils/httpUtil';

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
      return this.http.post<any>(url, cred)
        .pipe(
          map((response: any) => {
            const authContext = new UserAuthContext(username, response.token, response.securityClearance, response.name);
            sessionStorage.setItem('currentUser', JSON.stringify(authContext));

            // emit for subject
            this.authContextEmitter.next(authContext);

            // refresh token 30 seconds before expiry
            const expiryTime = response.expiry - Date.now();
            setTimeout(() => { this.refresh(authContext) }, expiryTime - 30000);
            return null;
          }),
          catchError((error: any) => {
            console.log(error);
            if (error.status === 400) {
              if (error.error.error === "Invalid login credentials") {
                return of($localize `:@@error.login.credential:Invalid Login Credentials.`);
              }
              else {
                return of($localize `:@@error.login.invalidEmail:Email is missing or unvalidated.`);
              }
            }
          })
        )
    }
    return of('Invalid login parameters');
  }

  refresh(authContext: UserAuthContext): void {
    const url = `${API_URL}/refresh`;
    this.http.post<any>(url, {}).pipe(
      map((response: any) => {
        if (response && response.token && response.expiry) {
          authContext.token = response.token;
          sessionStorage.setItem('currentUser', JSON.stringify(authContext));

          // emit for subject
          this.authContextEmitter.next(authContext);

          // refresh token 30 seconds before expiry
          const expiryTime = response.expiry - Date.now();
          setTimeout(() => { this.refresh(authContext) }, expiryTime - 30000);
        }
      }),
      catchError((error: any) => {
        return of('Unable to refresh auth token');
      })
    ).subscribe();
  }

  logout(): void {
    sessionStorage.removeItem('currentUser');
    // emit for subject
    this.authContextEmitter.next({ securityClearance: 0 } as UserAuthContext);
  }

  validateEmail(userId: string, validationCode: number): Observable<boolean> {
    const url = `${API_URL}/validateEmail`;
    const cred = new EmailValidationCredentials(userId, validationCode);
    return this.http.post(url, cred, { observe: 'response' })
      .pipe(map200toTrue(), errorsAreFalse());
  }

  resendValidationEmail(userId: string): Observable<boolean> {
    const url = `${API_URL}/resendValidation`;
    return this.http.post(url, { userId: userId }, { observe: 'response' })
      .pipe(map200toTrue(), errorsAreFalse());
  }

  getAuthContext(): UserAuthContext {
    try {
      const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
      return <UserAuthContext>currentUser;
    }
    catch (e) {
      return ({} as UserAuthContext);
    }
  }

  getAuthContextStream(): Observable<UserAuthContext> {
    this.authContextEmitter.next(this.getAuthContext());
    return this.$authContext;
  }
}

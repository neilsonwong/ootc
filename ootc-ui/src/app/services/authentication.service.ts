import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, ReplaySubject, Subject } from 'rxjs';
import { catchError, map, shareReplay } from 'rxjs/operators';
import { EmailValidationCredentials } from 'src/app/models/EmailValidationCredentials';
import { LoginCredentials } from 'src/app/models/LoginCredentials';
import { UserAuthContext } from 'src/app/models/UserAuthContext';
import { environment } from 'src/environments/environment';
import { errorsAreFalse, map200toTrue } from 'src/app/utils/httpUtil';
import * as docCookies from 'src/app/utils/docCookies';
import { SESSION_AUTH_CONTEXT, COOKIE_AUTH_CONTEXT } from 'src/app/constants/storage-constants';

const API_URL = environment.API_URL;

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private authContextEmitter: Subject<UserAuthContext> = new ReplaySubject(1);
  private $authContext: Observable<UserAuthContext> = this.authContextEmitter.pipe(shareReplay(1));
  private refreshTimeout: any = undefined;

  constructor(private http: HttpClient) {
    // set up first replay authContext value
    const initialAuthContext = this.getAuthContext();
    this.authContextEmitter.next(initialAuthContext);
    if (initialAuthContext && initialAuthContext.securityClearance) {
      this.setupRefreshTimeout();
    }
  }

  login(username: string, password: string): Observable<string> {
    const url = `${API_URL}/login`;
    const cred = new LoginCredentials(username, password);
    this.refreshTimeout = undefined;

    if (username && username.length > 0 &&
      password && password.length > 0) {
      return this.http.post<any>(url, cred)
        .pipe(
          map((response: any) => {
            const authContext = new UserAuthContext(username, response.token, response.securityClearance, response.name, response.expiry);
            sessionStorage.setItem(SESSION_AUTH_CONTEXT, JSON.stringify(authContext));

            // emit for subject
            this.authContextEmitter.next(authContext);
            this.setupRefreshTimeout();
            return null;
          }),
          catchError((error: any) => {
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
          authContext.expiry = response.expiry;
          sessionStorage.setItem(SESSION_AUTH_CONTEXT, JSON.stringify(authContext));

          this.refreshTimeout = undefined;

          // emit for subject
          this.authContextEmitter.next(authContext);
          this.setupRefreshTimeout();
        }
      }),
      catchError((error: any) => {
        return of('Unable to refresh auth token');
      })
    ).subscribe();
  }

  setupRefreshTimeout(): void {
    if (this.refreshTimeout === undefined) {
      const authContext = this.getAuthContext();
      const expiryTime = authContext.expiry - Date.now();
      // console.log(`access token expires in ${expiryTime - 30000} sec`);
      this.refreshTimeout = setTimeout(() => {
        this.refresh(authContext);
      }, expiryTime - 30000);
    }
  }

  logout(): void {
    sessionStorage.removeItem(SESSION_AUTH_CONTEXT);
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
      const authContext = sessionStorage.getItem(SESSION_AUTH_CONTEXT) || this.readTransplantAuthContext();
      // don't need to manually delete the cookie as it will expire
      const currentUser = JSON.parse(authContext);
      return <UserAuthContext>currentUser;
    }
    catch (e) {
      return ({} as UserAuthContext);
    }
  }

  readTransplantAuthContext(): string {
    const cookieAuthString = docCookies.getItem(COOKIE_AUTH_CONTEXT);

    if (cookieAuthString !== null) {
      docCookies.removeItem(COOKIE_AUTH_CONTEXT);

      // replace it
      if (sessionStorage.getItem(SESSION_AUTH_CONTEXT) === null) {
        sessionStorage.setItem(SESSION_AUTH_CONTEXT, cookieAuthString);
        return cookieAuthString;
      }
    }
    return null;
  }

  getAuthContextStream(): Observable<UserAuthContext> {
    return this.$authContext;
  }
}

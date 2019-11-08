import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models/User';
import { ErrorService } from './error.service';

const API_URL = environment.API_URL;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private errorService: ErrorService) { }

  registerUser(user: User, password: string): Observable<User> {
    const url = `${API_URL}/register`;
    return this.http.post<User>(url, {user: user, password: password })
      .pipe(catchError((error: HttpErrorResponse) => {
        this.errorService.add(`We couldn't register the user.`);
        return throwError(error);
      }));
  }

  resetPassword(email: string): Observable<any> {
    const url = `${API_URL}/resetPassword`;
    return this.http.post(url, {userId: email});
  }

  changePassword(email: string, resetCode: string, oldPassword: string, newPassword: string): Observable<any> {
    const url = `${API_URL}/changePassword`;
    return this.http.post(url, {userId: email, resetCode: resetCode, oldPassword: oldPassword, newPassword: newPassword});
  }

  getAllUsers(): Observable<User[]> {
    const url = `${API_URL}/admin/users`;
    return this.http.get<any[]>(url)
      .pipe(map((rawUsers: any[]) => {
        return rawUsers.map((raw) => {
          // we need to remap as the fields don't match up without model field names
          return new User(raw.id, raw.email, raw.fname, raw.mname, raw.lname,
            raw.phone, raw.age, raw.experience, raw.comments,
            (raw.validated === 1), (raw.admin === 1));
        });
      }),
      catchError((error: HttpErrorResponse) => {
        this.errorService.add(`We couldn't get the list of all users at this time! Please try again later.`);
        return throwError(error);
      }));
  }

  updateUser(user: User): Observable<User> {
    const url = `${API_URL}/admin/user/update`;
    return this.http.post<User>(url, user)
      .pipe(catchError((error: HttpErrorResponse) => {
        this.errorService.add(`We couldn't update the user at this time! Please try again later.`);
        return throwError(error);
      }));

  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { of, Observable } from 'rxjs';
import { User } from '../models/User';
import { map } from 'rxjs/operators';

const API_URL = environment.API_URL;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  registerUser(user: User, password: string): Observable<User> {
    const url = `${API_URL}/register`;
    return this.http.post<User>(url, {user: user, password: password });
  }

  changePasswordRequest(userId: string): Observable<boolean> {
    return of(true);
  }

  changePassword(newPassword: string): Observable<boolean> {
    return of(true);
  }

  getAllUsers(): Observable<User[]> {
    const url = `${API_URL}/admin/users`;
    return this.http.get<any[]>(url)
      .pipe(map((rawUsers: any[]) => {
        return rawUsers.map((raw) => {
          return new User(raw.id, raw.email, raw.fname, raw.mname, raw.lname,
            raw.phone, raw.age, raw.experience, raw.comments,
            (raw.validated === 1), (raw.admin === 1));
        });
      }));
  }

  updateUser(user: User): Observable<User> {
    // TODO: ADMIN FUNCTION
    return of(user);
  }
}

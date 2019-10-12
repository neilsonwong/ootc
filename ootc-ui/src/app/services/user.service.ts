import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { of, Observable } from 'rxjs';
import { User } from '../models/User';

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
    // TODO: ADMIN FUNCTION
    return of([
      new User('a@b.com', 'a@b.com', 'Andrew', '', 'Ho', 4161234567, 20, 1, ''),
      new User('c@d.com', 'c@d.com', 'Carl', '', 'Lam', 9055111167, 25, 0, ''),
      new User('e@f.com', 'e@f.com', 'Edith', '', 'Tong', 4162225547, 30, 10, 'i am experienced'),
    ]);
  }

  updateUser(user: User): Observable<User> {
    // TODO: ADMIN FUNCTION
    return of(user);
  }
}

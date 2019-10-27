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
    const url = `${API_URL}/admin/users`;
    return this.http.get<User[]>(url);
  }

  updateUser(user: User): Observable<User> {
    // TODO: ADMIN FUNCTION
    return of(user);
  }
}

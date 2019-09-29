import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }
  registerUser(user: User): Observable<User> {
    return of(null);
  }

  changePasswordRequest(userId: string): Observable<boolean> {
    return of(null);
  }
  changePassword(newPassword: string): Observable<boolean> {
    return of(null);
  }

  getAllUsers(): Observable<User[]> {
    return of(null);
  }

  updateUser(user): Observable<User> {
    return of(null);
  }
}

import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }
  registerUser(user: User): Observable<User> {
    return of(user);
  }

  changePasswordRequest(userId: string): Observable<boolean> {
    return of(true);
  }
  changePassword(newPassword: string): Observable<boolean> {
    return of(true);
  }

  getAllUsers(): Observable<User[]> {
    return of([
      new User('a@b.com', 'a@b.com', 'Andrew', '', 'Ho', 4161234567, 20, 1, ''),
      new User('c@d.com', 'c@d.com', 'Carl', '', 'Lam', 9055111167, 25, 0, ''),
      new User('e@f.com', 'e@f.com', 'Edith', '', 'Tong', 4162225547, 30, 10, 'i am experienced'),
    ]);
  }

  updateUser(user: User): Observable<User> {
    return of(user);
  }
}

import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Users } from '../user-list/user-list.component';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/User';

interface UserTableData {
  email: string;
  fname: string;
  lname: string;
  phone: number;
  age: number;
  experience: number;
  //isAdmin: boolean;
}

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {

  private users: User[];
  public usersData: UserTableData[];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getAllUsers();
  }

  displayedColumns: string[] = ['lname', 'email', 'fname', 'phone', 'age', 'experience', 'isAdmin'];
  dataSource = new MatTableDataSource(Users);

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private getAllUsers() {
    this.userService.getAllUsers().subscribe((users: User[]) => {
      this.users = users;
      this.usersData = users.map((user: User) => {
        return {
          email: user.email,
          fname: user.fname,
          lname: user.lname,
          phone: user.phone,
          age: user.age,
          experience: user.experience,
          //isAdmin: user.isAdmin
      }});
      console.log(this.usersData);
      console.log(Users)
    });
  }
}

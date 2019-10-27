import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Users } from '../user-list/user-list.component';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/User';

interface UserTableData {
  id: string;
  email: string;
  fname: string;
  mname: string;
  lname: string;
  phone: number;
  age: number;
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

  displayedColumns: string[] = ['id', 'email', 'fname', 'mname', 'lname', 'phone', 'age'];
  dataSource = new MatTableDataSource(Users);

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private getAllUsers() {
    this.userService.getAllUsers().subscribe((users: User[]) => {
      this.users = users;
      this.usersData = users.map((user: User) => {
        return {
          id: user.id,
          email: user.email,
          fname: user.fname,
          mname: user.mname,
          lname: user.lname,
          phone: user.phone,
          age: user.age,
      }});
      console.log(this.usersData);
      console.log(Users)
    });
  }
}

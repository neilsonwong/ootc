import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Users } from '../user-list/user-list.component';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/User';
import { MatSort } from '@angular/material';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {

  private users: User[];
  public displayedColumns: string[];
  public dataSource: MatTableDataSource<User>;
  
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.displayedColumns = ['email', 'fname', 'lname', 'phone', 'age', 'experience', 'isAdmin'];
    this.getAllUsers();
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private getAllUsers() {
    this.userService.getAllUsers().subscribe((users: any[]) => {
      this.users = users;
      this.dataSource = new MatTableDataSource(this.users);
      this.dataSource.sort = this.sort;
    });
  }
}

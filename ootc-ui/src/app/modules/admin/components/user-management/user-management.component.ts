import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatSort } from '@angular/material';
import { MatTableDataSource } from '@angular/material/table';
import { tap } from 'rxjs/operators';
import { DIALOG_WIDTHS } from 'src/app/constants/dialog-widths';
import { LoadState } from 'src/app/constants/load-state.enum';
import { User } from 'src/app/models/User';
import { LoadingService } from 'src/app/services/loading.service';
import { UserService } from 'src/app/services/user.service';
import { CreateUserDialogComponent } from '../create-user-dialog/create-user-dialog.component';
import { UserUpdateDialogComponent } from '../user-update-dialog/user-update-dialog.component';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {

  private users: User[];
  private userdata: User;
  public displayedColumns: string[];
  public dataSource: MatTableDataSource<User>;

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private userService: UserService,
    private loadingService: LoadingService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.displayedColumns = ['email', 'fname', 'lname', 'phone', 'age', 'experience', 'isAdmin', 'updateUser'];
    this.getAllUsers();
  }

  /* This is all for User Table */
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

  /* This is for updateUser modal */
  private updateUser(userdata: User) {
    // set the admin value, this is a work around for now
    userdata.admin = userdata.isAdmin;

    const updateObs = this.userService.updateUser(userdata)
      .pipe(tap(() => { this.getAllUsers(); }));

    this.loadingService.callWithLoader(updateObs, [
      { state: LoadState.Loading, title: 'Updating User', text: 'Updating user info ...' },
      { state: LoadState.Complete, title: 'Updated User', text: 'User was updated with the provided info.' },
      { state: LoadState.Error, title: 'Update User Error' }
    ]);
  }

  onUpdateUser(user: User) {
    this.dialog.open(UserUpdateDialogComponent, {
      data: {
        user: user
      },
      width: DIALOG_WIDTHS.UPDATE_USER
    }).afterClosed().subscribe(result => {
      if (result) {
        this.updateUser(result);
      }
    });
  }

  onCreateUser() {
    this.dialog.open(CreateUserDialogComponent, {
      width: DIALOG_WIDTHS.CREATE_USER
    }).afterClosed().subscribe(result => {
      if (result) {
        this.getAllUsers();
      }
    });
  }
}

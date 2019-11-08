import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatSort } from '@angular/material';
import { MatTableDataSource } from '@angular/material/table';
import { DIALOG_WIDTHS } from 'src/app/constants/dialog-widths';
import { User } from 'src/app/models/User';
import { LoadingDialogComponent } from 'src/app/modules/shared/components/loading-dialog/loading-dialog.component';
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
  private userdata : User;
  public displayedColumns: string[];
  public dataSource: MatTableDataSource<User>;
  
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private userService: UserService,
    public dialog : MatDialog) { }

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
    let dialogRef;
    let done = false;

    // set the admin value, this is a work around for now
    userdata.admin = userdata.isAdmin;

    setTimeout(() => {
      if (!done) {
        dialogRef = this.dialog.open(LoadingDialogComponent, {
          data: {
            title: 'Updating',
            text: 'Updating the user...'
          },
          width: DIALOG_WIDTHS.LOADING
        });
      }
    }, 300);

    this.userService.updateUser(userdata).subscribe(res => {
      done = true;

      // close the loading modal
      if (dialogRef) {
        dialogRef.close();
      }

      this.getAllUsers();
    });
  }

  onUpdateUser(user: User) {
    const dialogRef = this.dialog.open(UserUpdateDialogComponent, {
      data: {
        user: user
      },
      width: DIALOG_WIDTHS.UPDATE_USER
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result){
          this.updateUser(result);
        }
      });
  }

  onCreateUser() {
    const dialogRef = this.dialog.open(CreateUserDialogComponent, {
      width: DIALOG_WIDTHS.CREATE_USER
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getAllUsers();
      }
    });
  }
}

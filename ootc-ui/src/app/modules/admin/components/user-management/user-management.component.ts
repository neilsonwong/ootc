import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Users } from '../user-list/user-list.component';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/User';
import { MatSort, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { UserUpdateDialogComponent } from '../user-update-dialog/user-update-dialog.component';
import { CreateUserFormComponent } from 'src/app/modules/authentication/components/create-user-form/create-user-form.component'
import { LoadingDialogComponent } from 'src/app/modules/shared/components/loading-dialog/loading-dialog.component';

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

    console.log(userdata);

    setTimeout(() => {
      if (!done) {
        dialogRef = this.dialog.open(LoadingDialogComponent, {
          data: {
            title: 'Updating',
            text: 'Updating the user...'
          }
        });
      }
    }, 300);

    this.userService.updateUser(userdata).subscribe(res => {
      console.log(res);
      done = true;

      // close the modal
      if (dialogRef) {
        dialogRef.close();
      }

      this.getAllUsers();
    });
  }

  openDialog(user: User) {
    const dialogRef = this.dialog.open(UserUpdateDialogComponent, {
      data: {
        user: user
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result === true){
          this.updateUser(this.userdata);
        }
      })
  }

}

import { Component, OnInit, Inject } from '@angular/core';
import { User } from 'src/app/models/User';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { ConfirmationDialogComponent } from 'src/app/modules/shared/components/confirmation-dialog/confirmation-dialog.component';
import { DIALOG_WIDTHS } from 'src/app/constants/dialog-widths';

@Component({
  selector: 'app-user-update-dialog',
  templateUrl: './user-update-dialog.component.html',
  styleUrls: ['./user-update-dialog.component.scss']
})
export class UserUpdateDialogComponent implements OnInit {
  public editUser: FormGroup;
  public user: User;

  constructor(private dialogRef: MatDialogRef<UserUpdateDialogComponent>,
    private fb: FormBuilder,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.user = this.data.user;

    this.editUser = this.fb.group({
      email: [{value: this.user.email, disabled: true }],
      firstName: [this.user.fname, Validators.minLength(1)],
      lastName: [this.user.lname, Validators.minLength(1)],
      phoneNumber: [this.user.phone, [
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern(/^-?(0|[1-9]\d*)?$/)
      ]],
      age: [this.user.age, [Validators.min(18)]],
      experience: [this.user.experience, [Validators.min(0)]],
      isAdmin: [this.user.isAdmin]
    })
  }

  onUpdate() {
    // update the user object then return it back to the page
    // no updating email
    this.user.fname = this.editUser.get('firstName').value;
    this.user.lname = this.editUser.get('lastName').value;
    this.user.phone = this.editUser.get('phoneNumber').value;
    this.user.age = this.editUser.get('age').value;
    this.user.experience = this.editUser.get('experience').value;
    if (this.user.email != 'tccc.ootc@gmail.com'){
      this.user.isAdmin = this.editUser.get('isAdmin').value;
    }
    this.dialogRef.close(this.user);
  }

  onDelete() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Delete User',
        text: `Are you sure you want to delete the user: ${this.user.email}?`,
        yesNo: true
      },
      width: DIALOG_WIDTHS.CONFIRMATION
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteUser(this.user.email);
      }
    });
  }

  deleteUser(user: string) {
    this.dialogRef.close({'delete': user});
  }
}

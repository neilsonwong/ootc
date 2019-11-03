import { Component, OnInit, Inject } from '@angular/core';
import { User } from 'src/app/models/User';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-update-dialog',
  templateUrl: './user-update-dialog.component.html',
  styleUrls: ['./user-update-dialog.component.scss']
})
export class UserUpdateDialogComponent implements OnInit {
  public editUser: FormGroup;
  private user: User;

  constructor(private dialogRef: MatDialogRef<UserUpdateDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  isAdmin(){
    this.user.isAdmin = true;
  }

  ngOnInit() {
    console.log(this.data);
    this.user = this.data.user;
    this.editUser = this.fb.group({
      email: [this.user.email], 
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
    console.log(this.data.user)
  }

}

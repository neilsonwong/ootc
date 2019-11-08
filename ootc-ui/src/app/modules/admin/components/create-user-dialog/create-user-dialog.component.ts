import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { User } from 'src/app/models/User';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { formErrorMessages } from 'src/app/modules/authentication/components/registration-form/registration-form.validators';
import { UserService } from 'src/app/services/user.service';
import { MAT_DIALOG_DATA } from '@angular/material';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-create-user-dialog',
  templateUrl: './create-user-dialog.component.html',
  styleUrls: ['./create-user-dialog.component.scss']
})
export class CreateUserDialogComponent implements OnInit {
  @Output() userCreated = new EventEmitter<User>();

  public createUserForm: FormGroup;
  public formErrors = formErrorMessages;

  constructor(private fb: FormBuilder,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.createUserForm = this.fb.group({
      firstName: ['', Validators.minLength(1)],
      middleName: [''],
      lastName: ['', Validators.minLength(1)],
      email: [''],  // don't validate this for admins creating users
      phoneNumber: ['', [
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern(/^-?(0|[1-9]\d*)?$/)
      ]],
      age: ['', [Validators.min(18)]],
      experience: ['', [Validators.min(0)]],
    });
  }

  onCreateUser() {
    const emailVal = this.createUserForm.get('email').value;
    const userId = (emailVal && emailVal.length > 0) ? emailVal : this.createUserForm.get('phoneNumber').value;

    const userToBeCreated = new User(
      undefined,
      userId,
      this.createUserForm.get('firstName').value,
      this.createUserForm.get('middleName').value,
      this.createUserForm.get('lastName').value,
      this.createUserForm.get('phoneNumber').value,
      this.createUserForm.get('age').value,
      this.createUserForm.get('experience').value,
      '');
    
    const randomPw = Date.now().toString();
    this.userService.registerUser(userToBeCreated, randomPw)
      .pipe(take(1))
      .subscribe((user: User) => {
        this.userCreated.emit(user);
      });
  }
}

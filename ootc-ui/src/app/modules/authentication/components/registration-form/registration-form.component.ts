import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegistrationFormErrorStateMatcher, formErrorMessages, MustMatch, ageRangeValidator } from './registration-form.validators';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/User';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit {
  httpErrors: string;
  formErrors = formErrorMessages;
  matcher = new RegistrationFormErrorStateMatcher();
  registrationForm: FormGroup;
  private confirmed = false;

  constructor(private fb: FormBuilder,
    private userService: UserService) { }

  ngOnInit() {
    // instantiate the form control
    this.registrationForm = this.fb.group({
      firstName: ['', Validators.minLength(1)],
      middleName: ['', Validators.minLength(1)],
      lastName: ['', Validators.minLength(1)],
      email: ['', [
        Validators.pattern('[\\w\\.-]+@[\\w\\.-]+\\.\\w{2,4}')]],
      password: ['', [ 
        Validators.minLength(8)]],
        verifypassword: [''],
      phoneNumber: ['',[
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      age: ['', [ageRangeValidator]],
      experience: [''],
      comments: [''],
    }, { validator : MustMatch('password','verifypassword')})
  ;}

  onRegister() {
    const pw = this.registrationForm.get('password').value;
    const registerThisGuy = new User(
      undefined, 
      this.registrationForm.get('email').value,
      this.registrationForm.get('firstName').value,
      this.registrationForm.get('middleName').value,
      this.registrationForm.get('lastName').value,
      this.registrationForm.get('phoneNumber').value,
      this.registrationForm.get('age').value,
      this.registrationForm.get('experience').value,
      this.registrationForm.get('comments').value);
    
    // do something here
    this.userService.registerUser(registerThisGuy, pw)
      .pipe(take(1))
      .subscribe((user: User) => {
        this.confirmed = true;
      });
  }
}

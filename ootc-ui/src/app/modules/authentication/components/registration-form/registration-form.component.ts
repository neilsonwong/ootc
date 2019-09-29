import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export function matchValidator(form: FormGroup){
  const condition = form.get('password').value !== form.get('passwordConfirmation').value;
  return condition ? { mismatch: true } : null;
}

export class CrossFieldErrorMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
      return control.touched && form.invalid;
  }
}

export const formErrors: { [key: string]: string } = {
  required: 'This is a required field',
  pattern: 'Email must be a valid email address (leia@alderaan.net).',
  minLength: 'Password must contain at least 8 characters.',
  mismatch: 'Passwords don\'t match.',
  unique: 'Passwords must contain at least 3 unique characters.'
};

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})

export class RegistrationFormComponent implements OnInit {
  registrationForm: FormGroup;

  constructor(
    public firstName = '',
    public lastName = '',
    public email = '',
    public password = '',
    public passwordConfirmation = '',
  ) { }

  ngOnInit() {
    // instantiate the form control
    this.registrationForm = new FormGroup({
      firstName: new FormControl('', [
      ]),
      middleName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(''),
      verifypassword: new FormControl('',[
        Validators.required
      ]),
      phoneNumber: new FormControl(''),
      age: new FormControl(''),
      experience: new FormControl(''),
      comments: new FormControl(''),
    });
  }

  confirmed = false;
  confirmedpw = false;

  onRegister() {
    this.confirmed = true;
    
    // do something here
  }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

// https://stackoverflow.com/questions/47884655/display-custom-validator-error-with-mat-error
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}

// custom validator to check that two fields match
export function MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
}

// https://stackoverflow.com/questions/47884655/display-custom-validator-error-with-mat-error
export const formErrors: { [key: string]: string } = {
  required: 'This is a required field',
  pattern: 'Email must be a valid email address (abc@tccc.ca).',
  minLength: 'Password must contain at least 8 characters.',
  //mismatch: 'Passwords don\'t match.',
  //unique: 'Passwords must contain at least 1 uppercase character'
};

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})


export class RegistrationFormComponent implements OnInit {
  httpErrors: string;
  formErrors = formErrors;
  matcher = new MyErrorStateMatcher();
  registrationForm: FormGroup;

  matchValidator(form: FormGroup) {
    let pass = form.get('password').value;
    let confirmPass = form.get('verifypassword').value;
  
    return pass == confirmPass ? null: { notsame: true }
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    // instantiate the form control
    this.registrationForm = this.fb.group({
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, 
        Validators.pattern('[\\w\\.-]+@[\\w\\.-]+\\.\\w{2,4}')]],
        password: ['', [Validators.required, 
          Validators.minLength(8)]],
          verifypassword: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      age: ['', Validators.required],
      experience: ['', Validators.required],
      comments: [''],
    }, { validator : MustMatch('password','verifypassword')})
  ;}

  confirmed = false;
  confirmedpw = false;

  onRegister() {
    this.confirmed = true;
    
    // do something here
  }
}

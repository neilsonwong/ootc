import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, FormGroupDirective, NgForm, FormGroup, AbstractControl } from '@angular/forms';

// https://stackoverflow.com/questions/47884655/display-custom-validator-error-with-mat-error
export class RegistrationFormErrorStateMatcher implements ErrorStateMatcher {
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

// https://dzone.com/articles/how-to-create-custom-validators-in-angular
export function ageRangeValidator(control: AbstractControl): { [key: string]: boolean } | null {
  if (control.value !== undefined && (isNaN(control.value) || control.value < 18 || control.value > 100)) {
      return { 'ageRange': true };
  }
  return null;
}

export function expRangeValidator(control: AbstractControl): { [key: string]: boolean } | null {
  if (control.value !== undefined && (isNaN(control.value) || control.value < 0 || control.value > 100)) {
      return { 'expRange': true };
  }
  return null;
}

// https://stackoverflow.com/questions/47884655/display-custom-validator-error-with-mat-error
export const formErrorMessages: { [key: string]: string } = {
  required: 'This is a required field',
  pattern: 'Email must be a valid email address (abc@tccc.ca).',
  minLength: 'Password must contain at least 8 characters.',
  number: 'Phone number must be a valid phone number (1234567890)',
  mismatch: 'Passwords don\'t match.',
  age: 'User must be 18 years or older',
  experience: 'Experience cannot be negative',
  fsymbol: 'First name must only contain letters',
  lsymbol: 'Last name must only contain letters'
  //unique: 'Passwords must contain at least 1 uppercase character'
};
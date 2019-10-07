import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, FormGroupDirective, NgForm, FormGroup } from '@angular/forms';

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

// https://stackoverflow.com/questions/47884655/display-custom-validator-error-with-mat-error
export const formErrorMessages: { [key: string]: string } = {
  required: 'This is a required field',
  pattern: 'Email must be a valid email address (abc@tccc.ca).',
  minLength: 'Password must contain at least 8 characters.',
  number: 'Phone number must be a valid phone number (123-456-7890)'
  //mismatch: 'Passwords don\'t match.',
  //unique: 'Passwords must contain at least 1 uppercase character'
};
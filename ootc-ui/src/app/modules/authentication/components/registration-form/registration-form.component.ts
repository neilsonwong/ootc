import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { tap } from 'rxjs/operators';
import { LoadState } from 'src/app/constants/load-state.enum';
import { User } from 'src/app/models/User';
import { LoadingService } from 'src/app/services/loading.service';
import { UserService } from 'src/app/services/user.service';
import { IAgeRange } from 'src/app/interfaces/IAgeRange';
import { ageRangeValidator, expRangeValidator, formErrorMessages, MustMatch } from './registration-form.validators';
import { AGE_RANGES } from 'src/app/constants/age-ranges';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit {
  public registrationForm: FormGroup;
  public formErrors = formErrorMessages;
  public registrationSuccessful: boolean;
  public ageRanges: IAgeRange[] = AGE_RANGES;

  constructor(private fb: FormBuilder,
    public dialog: MatDialog,
    private loadingService: LoadingService,
    private userService: UserService) { }

  ngOnInit() {
    // instantiate the form control
    this.registrationForm = this.fb.group({
      firstName: ['', [
        Validators.minLength(1),
        Validators.pattern('[a-zA-Z ]*')]
      ],
      middleName: ['', [
        Validators.minLength(1),
        Validators.pattern('[a-zA-Z ]*')]],
      lastName: ['',
        [Validators.minLength(1),
        Validators.pattern('[a-zA-Z ]*')]],
      email: ['', [
        Validators.pattern('[\\w\\.-]+@[\\w\\.-]+\\.\\w{2,4}')]],
      password: ['', Validators.minLength(8)],
      verifypassword: [''],
      phoneNumber: ['', [
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern(/^-?(0|[1-9]\d*)?$/)
      ]],
      age: ['', [
        ageRangeValidator,
        Validators.pattern(/^-?(0|[1-9]\d*)?$/)],
      ],
      experience: ['', [
        expRangeValidator,
        Validators.min(0),
        Validators.pattern(/^-?(0|[1-9]\d*)?$/)]
      ],
      comments: [''],
    }, { validator: MustMatch('password', 'verifypassword') })
      ;
  }

  onRegister() {
    const pw = this.registrationForm.get('password').value;
    const registerThisGuy = new User(
      undefined,
      this.registrationForm.get('email').value.toString().toLowerCase(),
      this.registrationForm.get('firstName').value,
      this.registrationForm.get('middleName').value,
      this.registrationForm.get('lastName').value,
      parseInt(this.registrationForm.get('phoneNumber').value),
      this.registrationForm.get('age').value,
      this.registrationForm.get('experience').value,
      this.registrationForm.get('comments').value);


    const registerObs = this.userService.registerUser(registerThisGuy, pw)
      .pipe(tap(() => { this.registrationSuccessful = true; }));

    this.loadingService.callWithLoader(registerObs, [
      { state: LoadState.Loading, title: 'Registering Volunteer', text: 'Registering our new volunteer ...' },
      { state: LoadState.Error, title: 'Registration Error' }
    ]);
  }
}

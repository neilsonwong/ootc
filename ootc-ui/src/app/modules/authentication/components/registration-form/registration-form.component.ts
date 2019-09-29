import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit {
  registrationForm: FormGroup;
  angForm: FormGroup;
  
  constructor(
  ) { }

  ngOnInit() {
    // instantiate the form control
    this.registrationForm = new FormGroup({
      firstName: new FormControl('',),
      middleName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl('', [
        Validators.required,
      ]),
      password: new FormControl(''),
      phoneNumber: new FormControl(''),
      age: new FormControl(''),
      experience: new FormControl(''),
      comments: new FormControl(''),
    });
  }

  confirmed = false;

  onRegister() {
    this.confirmed = true;
    // do something here
  }
}

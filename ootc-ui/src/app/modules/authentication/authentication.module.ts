import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/modules/shared/shared.module';

import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';
import { CreateUserFormComponent } from './components/create-user-form/create-user-form.component';

@NgModule({
  declarations: [
    LoginFormComponent, 
    RegistrationFormComponent, CreateUserFormComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    SharedModule,
  ],
  exports: [
    LoginFormComponent,
    RegistrationFormComponent,
    CreateUserFormComponent
  ],
})
export class AuthenticationModule { }

import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/modules/shared/shared.module';

import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';

@NgModule({
  declarations: [
    LoginFormComponent, 
    RegistrationFormComponent,
  ],
  imports: [
    SharedModule,
  ],
  exports: [
    LoginFormComponent,
    RegistrationFormComponent,
  ],
})
export class AuthenticationModule { }

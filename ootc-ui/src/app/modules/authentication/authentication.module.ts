import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { RegistrationComponent } from './components/registration/registration.component';

// Material Imports
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatInputModule } from '@angular/material/input'; 

@NgModule({
  declarations: [
    LoginComponent, 
    RegistrationComponent
  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [
    LoginComponent
  ],
})
export class AuthenticationModule { }

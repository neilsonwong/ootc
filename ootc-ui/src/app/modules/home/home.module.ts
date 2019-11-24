import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';

import { AuthenticationModule } from '../authentication/authentication.module';
import { LandingComponent } from './components/landing/landing.component';
import { AboutComponent } from './components/about/about.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { EmailValidationComponent } from './components/email-validation/email-validation.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    LandingComponent, AboutComponent, RegistrationComponent, EmailValidationComponent, ForgotPasswordComponent, ChangePasswordComponent, LoginComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HomeRoutingModule,
    ReactiveFormsModule,
    AuthenticationModule,
    SharedModule,
  ]
})
export class HomeModule { }

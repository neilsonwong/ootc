import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { HomeRoutingModule } from './home-routing.module';

import { AuthenticationModule } from '../authentication/authentication.module';
import { LandingComponent } from './components/landing/landing.component';
import { AboutComponent } from './components/about/about.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { EmailValidationComponent } from './components/email-validation/email-validation.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    LandingComponent, AboutComponent, RegistrationComponent, EmailValidationComponent,
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

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home/home.component';
import { TopBarComponent } from './components/home/top-bar/top-bar.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthenticationModule } from '../authentication/authentication.module';
import { LandingComponent } from './components/landing/landing.component';
import { AboutComponent } from './components/about/about.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { EmailValidationComponent } from './components/email-validation/email-validation.component';

@NgModule({
  declarations: [
    HomeComponent, 
    TopBarComponent, LandingComponent, AboutComponent, RegistrationComponent, EmailValidationComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    BrowserModule,
    ReactiveFormsModule,
    AuthenticationModule,
    RouterModule.forRoot([
      
    ])
  ],
  bootstrap: [ HomeComponent ]
})
export class HomeModule { }

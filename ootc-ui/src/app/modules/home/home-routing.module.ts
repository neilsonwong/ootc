import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { AboutComponent } from './components/about/about.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { EmailValidationComponent } from './components/email-validation/email-validation.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  // { path: 'about', component: AboutComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'validateEmail', component: EmailValidationComponent },
  { path: 'forgotPassword', component: ForgotPasswordComponent },
  { path: 'changePassword', component: ChangePasswordComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class HomeRoutingModule {
}

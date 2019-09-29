import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReservationSignUpComponent } from './components/reservation-sign-up/reservation-sign-up.component';
import { ReservationManagementComponent } from './components/reservation-management/reservation-management.component';

const routes: Routes = [
  { path: 'signup', component: ReservationSignUpComponent },
  { path: 'reservations', component: ReservationManagementComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class ReservationRoutingModule {
}

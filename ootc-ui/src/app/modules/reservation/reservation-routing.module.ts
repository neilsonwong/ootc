import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReservationSignUpComponent } from './components/reservation-sign-up/reservation-sign-up.component';
import { ReservationManagementComponent } from './components/reservation-management/reservation-management.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  { path: 'signup', component: ReservationSignUpComponent, canActivate: [AuthGuard] },
  { path: 'reservations', component: ReservationManagementComponent, canActivate: [AuthGuard] },
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

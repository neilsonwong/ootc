import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ReservationSignUpComponent } from './components/reservation-sign-up/reservation-sign-up.component';
import { ReservationManagementComponent } from './components/reservation-management/reservation-management.component';
import { UpcomingReservationListComponent } from './components/upcoming-reservation-list/upcoming-reservation-list.component';
import { ReservationDetailsComponent } from './components/reservation-details/reservation-details.component';
import { DepartmentSpotlightComponent } from './components/department-spotlight/department-spotlight.component';
import { ReservationSignUpFormComponent } from './components/reservation-sign-up-form/reservation-sign-up-form.component';



@NgModule({
  declarations: [SignUpComponent, ReservationSignUpComponent, ReservationManagementComponent, UpcomingReservationListComponent, ReservationDetailsComponent, DepartmentSpotlightComponent, ReservationSignUpFormComponent],
  imports: [
    CommonModule
  ]
})
export class ReservationModule { }

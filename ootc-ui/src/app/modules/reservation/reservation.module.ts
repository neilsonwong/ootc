import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/modules/shared/shared.module';
import { ReservationRoutingModule } from './reservation-routing.module';

import { ReservationSignUpComponent } from './components/reservation-sign-up/reservation-sign-up.component';
import { ReservationManagementComponent } from './components/reservation-management/reservation-management.component';
import { UpcomingReservationListComponent } from './components/upcoming-reservation-list/upcoming-reservation-list.component';
import { ReservationDetailsComponent } from './components/reservation-details/reservation-details.component';
import { DepartmentSpotlightComponent } from './components/department-spotlight/department-spotlight.component';
import { ReservationSignUpFormComponent } from './components/reservation-sign-up-form/reservation-sign-up-form.component';
import { ReservationSignUpLineComponent } from './components/reservation-sign-up-line/reservation-sign-up-line.component';
import { UpcomingReservationCardComponent } from './components/upcoming-reservation-card/upcoming-reservation-card.component';
import { AvailabilityCheckDirective } from './directives/availability-check.directive';

@NgModule({
  declarations: [
    ReservationSignUpComponent,
    ReservationManagementComponent,
    UpcomingReservationListComponent,
    ReservationDetailsComponent,
    DepartmentSpotlightComponent,
    ReservationSignUpFormComponent,
    ReservationSignUpLineComponent,
    UpcomingReservationCardComponent,
    AvailabilityCheckDirective
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReservationRoutingModule,
  ]
})
export class ReservationModule { }

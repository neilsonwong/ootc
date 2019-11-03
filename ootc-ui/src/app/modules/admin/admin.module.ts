import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/modules/shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';

import { UserManagementComponent } from './components/user-management/user-management.component';
import { ScheduleManagementComponent } from './components/schedule-management/schedule-management.component';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { ScheduleCreationComponent } from './components/schedule-creation/schedule-creation.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { AddTimeSlotDefComponent } from './components/add-time-slot-def/add-time-slot-def.component';
import { TimeSlotDefDetailsComponent } from './components/time-slot-def-details/time-slot-def-details.component';
import { TimeSlotDetailsComponent } from './components/time-slot-details/time-slot-details.component';
import { ReservationFullDetailsComponent } from './components/reservation-full-details/reservation-full-details.component';
import { UserUpdateDialogComponent } from './components/user-update-dialog/user-update-dialog.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    UserManagementComponent,
    ScheduleManagementComponent,
    AttendanceComponent,
    ScheduleCreationComponent,
    UserListComponent,
    AddTimeSlotDefComponent,
    TimeSlotDefDetailsComponent,
    TimeSlotDetailsComponent,
    ReservationFullDetailsComponent,
    UserUpdateDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule,
    FormsModule,
  ],
  entryComponents: [
    UserUpdateDialogComponent
  ]
})
export class AdminModule { }

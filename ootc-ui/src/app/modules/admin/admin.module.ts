import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/modules/shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';

import { UserManagementComponent } from './components/user-management/user-management.component';
import { ScheduleManagementComponent } from './components/schedule-management/schedule-management.component';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { ScheduleCreationComponent } from './components/schedule-creation/schedule-creation.component';
import { AddTimeSlotDefComponent } from './components/add-time-slot-def/add-time-slot-def.component';
import { TimeSlotDefDetailsComponent } from './components/time-slot-def-details/time-slot-def-details.component';
import { TimeSlotDetailsComponent } from './components/time-slot-details/time-slot-details.component';
import { ReservationFullDetailsComponent } from './components/reservation-full-details/reservation-full-details.component';
import { UserUpdateDialogComponent } from './components/user-update-dialog/user-update-dialog.component';
import { AssignReservationDialogComponent } from './components/assign-reservation-dialog/assign-reservation-dialog.component';
import { CreateUserDialogComponent } from './components/create-user-dialog/create-user-dialog.component';
import { UpdateTimeslotDialogComponent } from './components/update-timeslot-dialog/update-timeslot-dialog.component';
import { CopyClipboardDirective } from './directives/copy-clipboard.directive';

@NgModule({
  declarations: [
    UserManagementComponent,
    ScheduleManagementComponent,
    AttendanceComponent,
    ScheduleCreationComponent,
    AddTimeSlotDefComponent,
    TimeSlotDefDetailsComponent,
    TimeSlotDetailsComponent,
    ReservationFullDetailsComponent,
    UserUpdateDialogComponent,
    AssignReservationDialogComponent,
    CreateUserDialogComponent,
    UpdateTimeslotDialogComponent,
    CopyClipboardDirective,
  ],
  imports: [
    SharedModule,
    AdminRoutingModule,
  ],
  entryComponents: [
    UserUpdateDialogComponent,
    AssignReservationDialogComponent,
    CreateUserDialogComponent,
    UpdateTimeslotDialogComponent,
  ]
})
export class AdminModule { }

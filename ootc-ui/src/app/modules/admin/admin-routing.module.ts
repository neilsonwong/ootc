import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { ScheduleManagementComponent } from './components/schedule-management/schedule-management.component';
import { ScheduleCreationComponent } from './components/schedule-creation/schedule-creation.component';

const routes: Routes = [
  { path: 'admin/attendance', component: AttendanceComponent },
  { path: 'admin/users', component: UserManagementComponent },
  { path: 'admin/schedule', component: ScheduleManagementComponent },
  { path: 'admin/setup', component: ScheduleCreationComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class AdminRoutingModule {
}
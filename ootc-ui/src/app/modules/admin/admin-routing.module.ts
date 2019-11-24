import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { ScheduleManagementComponent } from './components/schedule-management/schedule-management.component';
import { ScheduleCreationComponent } from './components/schedule-creation/schedule-creation.component';
import { AdminAuthGuard } from 'src/app/guards/admin-auth.guard';

const routes: Routes = [
  { path: 'admin/attendance', component: AttendanceComponent, canActivate: [AdminAuthGuard] },
  { path: 'admin/users', component: UserManagementComponent, canActivate: [AdminAuthGuard] },
  { path: 'admin/schedule', component: ScheduleManagementComponent, canActivate: [AdminAuthGuard] },
  { path: 'admin/setup', component: ScheduleCreationComponent, canActivate: [AdminAuthGuard] }
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

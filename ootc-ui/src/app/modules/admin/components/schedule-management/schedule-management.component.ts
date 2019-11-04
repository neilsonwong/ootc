import { Component, OnInit } from '@angular/core';
import { ScheduleService } from 'src/app/services/schedule.service';
import { TimeSlotView } from 'src/app/models/TimeSlotView';

import * as reservationDisplayUtils from 'src/app/utils/reservationDisplay';

@Component({
  selector: 'app-schedule-management',
  templateUrl: './schedule-management.component.html',
  styleUrls: ['./schedule-management.component.scss']
})
export class ScheduleManagementComponent implements OnInit {
  public schedule: TimeSlotView[];
  public startDate: string;
  public endDate: string;

  constructor(private scheduleService: ScheduleService) { }

  ngOnInit() {
    const monthStart = new Date();
    const monthEnd = new Date();
    monthStart.setDate(1);

    monthEnd.setMonth(monthEnd.getMonth()+1);
    monthEnd.setDate(1);

    this.startDate = reservationDisplayUtils.dateToYYYYMMDD(monthStart);
    this.endDate = reservationDisplayUtils.dateToYYYYMMDD(monthEnd);
  }

  getSchedule() {
    this.scheduleService.getAllTimeSlots(this.startDate, this.endDate)
      .subscribe((res: TimeSlotView[]) => {
        this.schedule = res;
        console.log(res);
      });
  }
}

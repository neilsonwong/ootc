import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDatepicker } from '@angular/material';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import * as moment from 'moment';
import { IGroupedTimeSlotViews } from 'src/app/interfaces/IGroupedTimeSlotViews';
import { TimeSlotView } from 'src/app/models/TimeSlotView';
import { ScheduleService } from 'src/app/services/schedule.service';


@Component({
  selector: 'app-schedule-management',
  templateUrl: './schedule-management.component.html',
  styleUrls: ['./schedule-management.component.scss']
})
export class ScheduleManagementComponent implements OnInit {
  @ViewChild('picker', {static: true}) datePicker: MatDatepicker<Date>;

  public schedule: TimeSlotView[];
  public days: string[];
  public groupedTimeSlots: IGroupedTimeSlotViews = {};

  public startDate: string;
  public endDate: string;

  public lastWeek: string;
  public nextWeek: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private scheduleService: ScheduleService) { }

  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe((params: ParamMap) => {
      this.setupPage(params.get('start'));
    });
    this.datePicker._selectedChanged.subscribe((date: Date) => {
      const datePickerDate = moment(date).format('YYYY-MM-DD');
      // console.log(datePickerDate);
      this.setupPage(datePickerDate);
    });
  }

  setupPage(start: string) {
    const candiDate = (start !== null && moment(start, 'YYYY-MM-DD').isValid()) ?
      moment.utc(start, 'YYYY-MM-DD') :
      moment.utc();

    // if it is a sunday/monday we want the prev week
    // else current week

    this.startDate = (candiDate.day() < 2) ?
      candiDate.day(-5).format('YYYY-MM-DD') :
      candiDate.day(2).format('YYYY-MM-DD');
    this.endDate = moment(this.startDate).add(6, 'd').format('YYYY-MM-DD');

    this.lastWeek = moment(this.startDate).subtract(7, 'd').format('YYYY-MM-DD');
    this.nextWeek = moment(this.startDate).add(7, 'd').format('YYYY-MM-DD');

    this.getSchedule();
  }

  getSchedule() {
    this.scheduleService.getAllTimeSlotsBetween(this.startDate, this.endDate)
      .subscribe((res: TimeSlotView[]) => {
        this.schedule = res;
        this.processSchedule();
      });
  }

  processSchedule() {
    // clear out old ones
    const temp: IGroupedTimeSlotViews = {};

    for (const timeSlot of this.schedule) {
      if (temp[timeSlot.startDate] === undefined) {
        temp[timeSlot.startDate] = [];
      }
      temp[timeSlot.startDate].push(timeSlot);
    }

    this.groupedTimeSlots = temp;
    this.days = Object.keys(this.groupedTimeSlots);
  }

  goPreviousWeek() {
    this.router.navigate(['/', 'admin', 'schedule'], { queryParams: {start: this.lastWeek}});
  }

  goNextWeek() {
    this.router.navigate(['/', 'admin', 'schedule'], { queryParams: {start: this.nextWeek}});
  }
}

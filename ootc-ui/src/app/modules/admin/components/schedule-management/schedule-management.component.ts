import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDatepicker } from '@angular/material';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import * as moment from 'moment';
import { TimeSlotView } from 'src/app/models/TimeSlotView';
import { ScheduleService } from 'src/app/services/schedule.service';
import { GroupedEventList } from 'src/app/helpers/grouped-event-list';


@Component({
  selector: 'app-schedule-management',
  templateUrl: './schedule-management.component.html',
  styleUrls: ['./schedule-management.component.scss']
})
export class ScheduleManagementComponent extends GroupedEventList implements OnInit {
  @ViewChild('picker', {static: true}) datePicker: MatDatepicker<Date>;

  public startDate: string;
  public endDate: string;

  public lastWeek: string;
  public nextWeek: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private scheduleService: ScheduleService) {
    super();
  }

  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe((params: ParamMap) => {
      this.setupPage(params.get('start'));
    });
    this.datePicker._selectedChanged.subscribe((date: Date) => {
      const datePickerDate = moment(date).format('YYYY-MM-DD');
      this.router.navigate(['/', 'admin', 'schedule'], { queryParams: {start: datePickerDate}});
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
        this.allTimeSlots = res;
        this.processSchedule();
      });
  }

  goPreviousWeek() {
    this.router.navigate(['/', 'admin', 'schedule'], { queryParams: {start: this.lastWeek}});
  }

  goNextWeek() {
    this.router.navigate(['/', 'admin', 'schedule'], { queryParams: {start: this.nextWeek}});
  }
}

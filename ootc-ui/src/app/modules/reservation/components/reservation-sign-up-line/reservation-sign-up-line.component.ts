import { Component, OnInit } from '@angular/core';
import { TimeSlotView } from 'src/app/models/TimeSlotView';
import * as reservationDisplayUtils from 'src/app/utils/reservationDisplay';
import { EventDetailsComponent } from '../event-details.component';
import { I18nPluralPipe } from '@angular/common';

@Component({
  selector: 'app-reservation-sign-up-line',
  templateUrl: './reservation-sign-up-line.component.html',
  styleUrls: ['./reservation-sign-up-line.component.scss']
})

export class ReservationSignUpLineComponent extends EventDetailsComponent implements OnInit{
  private timeSlot: TimeSlotView;

  public endTime: string;
  public spotsLeft: number;
  public spotsPluralMapping = {
    '=1': '1 spot left',
    'other': '# spots left',
  };

  constructor() {
    super();
  }getEndTimeString

  ngOnInit() {
    super.ngOnInit();
    this.timeSlot = this.event as TimeSlotView;
    this.spotsLeft = this.timeSlot.signUpCap - this.timeSlot.reserved;
    this.endTime = reservationDisplayUtils.getEndTimeString(this.timeSlot.startDate, this.timeSlot.startTime, this.timeSlot.duration);
  }
}

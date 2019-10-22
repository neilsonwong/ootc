import { Component, OnInit, Input } from '@angular/core';
import { TimeSlotView } from 'src/app/models/TimeSlotView';
import * as reservationDisplayUtils from 'src/app/utils/reservationDisplay';

@Component({
  selector: 'app-reservation-sign-up-line',
  templateUrl: './reservation-sign-up-line.component.html',
  styleUrls: ['./reservation-sign-up-line.component.scss']
})
export class ReservationSignUpLineComponent implements OnInit {
  @Input() timeSlot: TimeSlotView;

  public startTime: string;
  public endTime: string;
  public duration: string;
  public spotsLeft: number;

  constructor() { }

  ngOnInit() {
    this.spotsLeft = this.timeSlot.signUpCap - this.timeSlot.reserved;
    this.duration = reservationDisplayUtils.minutesToHourString(this.timeSlot.duration);
    this.startTime = reservationDisplayUtils.to12HourClock(this.timeSlot.startTime);
    this.endTime = reservationDisplayUtils.getEndTime(this.timeSlot.startDate, this.timeSlot.startTime, this.timeSlot.duration);
  }
}

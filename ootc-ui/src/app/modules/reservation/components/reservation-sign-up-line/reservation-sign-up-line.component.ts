import { Component, OnInit, Input } from '@angular/core';
import { TimeSlotView } from 'src/app/models/TimeSlotView';
import * as reservationDisplayUtils from 'src/app/utils/reservationDisplay';
import { EventDetailsComponent } from '../event-details.component';

@Component({
  selector: 'app-reservation-sign-up-line',
  templateUrl: './reservation-sign-up-line.component.html',
  styleUrls: ['./reservation-sign-up-line.component.scss']
})

export class ReservationSignUpLineComponent extends EventDetailsComponent implements OnInit{
  private timeSlot: TimeSlotView;
  public endTime: string;
  public spotsLeft: number;

  constructor() {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.timeSlot = this.event as TimeSlotView;
    this.spotsLeft = this.timeSlot.signUpCap - this.timeSlot.reserved;
    this.endTime = reservationDisplayUtils.getEndTime(this.timeSlot.startDate, this.timeSlot.startTime, this.timeSlot.duration);
  }
}

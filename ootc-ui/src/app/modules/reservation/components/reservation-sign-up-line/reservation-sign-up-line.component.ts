import { Component, OnInit } from '@angular/core';
import { TimeSlotView } from 'src/app/models/TimeSlotView';
import * as reservationDisplayUtils from 'src/app/utils/reservationDisplay';
import { EventDetailsComponent } from 'src/app/helpers/event-details.component';

@Component({
  selector: 'app-reservation-sign-up-line',
  templateUrl: './reservation-sign-up-line.component.html',
  styleUrls: ['./reservation-sign-up-line.component.scss']
})

export class ReservationSignUpLineComponent extends EventDetailsComponent implements OnInit{
  private timeSlot: TimeSlotView;

  public endTime: string;
  public spotsLeft: number;
  public totalSpots: number;
  public spotsPluralMapping = {
    '=1': 'spot left',
    'other': 'spots left',
  };

  constructor() {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.timeSlot = this.event as TimeSlotView;
    this.totalSpots = this.timeSlot.signUpCap;
    this.spotsLeft = this.timeSlot.signUpCap - this.timeSlot.reserved;
  }
}

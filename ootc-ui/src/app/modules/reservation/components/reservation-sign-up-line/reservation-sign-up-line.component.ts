import { Component, OnInit, Input } from '@angular/core';
import { EventDetails } from 'src/app/helpers/event-details';
import { TimeSlotView } from 'src/app/models/TimeSlotView';

@Component({
  selector: 'app-reservation-sign-up-line',
  templateUrl: './reservation-sign-up-line.component.html',
  styleUrls: ['./reservation-sign-up-line.component.scss']
})
export class ReservationSignUpLineComponent extends EventDetails implements OnInit {
  @Input() reserved: boolean;
  
  private timeSlot: TimeSlotView;

  public endTime: string;
  public spotsLeft: number;
  public totalSpots: number;
  public spotsPluralMapping = {};

  constructor() {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.timeSlot = this.event as TimeSlotView;
    this.totalSpots = this.timeSlot.signUpCap;
    this.spotsLeft = this.timeSlot.signUpCap - this.timeSlot.reserved;

    this.spotsPluralMapping = {
      '=0': $localize `:@@plurals.spots.zero:Full`,
      '=1': $localize `:@@plurals.spots.one:1 / ${this.totalSpots} spot left`,
      'other': $localize `:@@plurals.spots.other:# / ${this.totalSpots} spots left`,
    };
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { ReservationView } from 'src/app/models/ReservationView';
import * as reservationDisplayUtils from 'src/app/utils/reservationDisplay';

interface GroupedReservations { [s: string]: ReservationView[]; }

@Component({
  selector: 'app-upcoming-reservation-list',
  templateUrl: './upcoming-reservation-list.component.html',
  styleUrls: ['./upcoming-reservation-list.component.scss']
})
export class UpcomingReservationListComponent implements OnInit {
  @Input() reservations: ReservationView[];

  public dayList: string[];
  public days: GroupedReservations;

  constructor() {
  }

  ngOnInit() {
    this.reservations = this.reservations.map((r: ReservationView) => {
      r.startTime = reservationDisplayUtils.to12HourClock(r.startTime);
      return r;
    })
    this.processReservations();
  }

  private processReservations() {
    // bit of reduce magic
    this.days = this.reservations.reduce((acc, obj) => ({
        ...acc,
        [obj['startDate']]: (acc[obj['startDate']] || []).concat(obj)
      }), {});
    
    this.dayList = Object.keys(this.days).sort((a, b) => (a.localeCompare(b)));
    console.log(this.dayList);
    console.log(this.days);
  }
}


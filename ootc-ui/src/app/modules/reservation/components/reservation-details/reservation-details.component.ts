import { Component, OnInit, Input } from '@angular/core';
import { ReservationView } from 'src/app/models/ReservationView';
import * as reservationDisplayUtils from 'src/app/utils/reservationDisplay';

@Component({
  selector: 'app-reservation-details',
  templateUrl: './reservation-details.component.html',
  styleUrls: ['./reservation-details.component.scss']
})


export class ReservationDetailsComponent implements OnInit {
  @Input() reservation: ReservationView;

  public startDate: string;
  public startTime: string;
  public endTime: string;
  public desc: string;
  public duration: string ;

  constructor() { }
  
  ngOnInit() {
    this.startDate = this.reservation.startDate;
    this.startTime = reservationDisplayUtils.to12HourClock(this.reservation.startTime);
    this.endTime = reservationDisplayUtils.getEndTime(this.reservation.startDate, this.reservation.startTime, this.reservation.duration);
    this.desc = this.reservation.desc;
    this.duration = reservationDisplayUtils.minutesToHourString(this.reservation.duration);
  }
}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Reservation } from 'src/app/models/Reservation';

@Component({
  selector: 'app-reservation-full-details',
  templateUrl: './reservation-full-details.component.html',
  styleUrls: ['./reservation-full-details.component.scss']
})
export class ReservationFullDetailsComponent implements OnInit {
  @Input() reservation: Reservation;
  @Output() reservationDeleteClicked = new EventEmitter<Reservation>();

  public user: string;

  constructor() { }

  ngOnInit() {
    this.user = this.reservation.user;
  }

  deleteReservation() {
    this.reservationDeleteClicked.emit(this.reservation);
  }
}

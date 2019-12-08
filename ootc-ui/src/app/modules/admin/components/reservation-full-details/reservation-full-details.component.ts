import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Reservation } from 'src/app/models/Reservation';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-reservation-full-details',
  templateUrl: './reservation-full-details.component.html',
  styleUrls: ['./reservation-full-details.component.scss']
})
export class ReservationFullDetailsComponent implements OnInit {
  @Input() reservation: Reservation;
  @Input() users: User[];
  @Output() reservationDeleteClicked = new EventEmitter<Reservation>();

  public user: User;
  public attended: boolean;

  constructor() { }

  ngOnInit() {
    this.user = this.users.find((user) => {
      return this.reservation.user === user.id;
    });
    this.attended = this.reservation.attended === 1;
  }

  deleteReservation() {
    this.reservationDeleteClicked.emit(this.reservation);
  }
}

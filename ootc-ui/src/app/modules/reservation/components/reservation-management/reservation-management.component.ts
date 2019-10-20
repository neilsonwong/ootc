import { Component, OnInit, Input } from '@angular/core';
import { ReservationService } from 'src/app/services/reservation.service';
import { ReservationView } from 'src/app/models/ReservationView';

@Component({
  selector: 'app-reservation-management',
  templateUrl: './reservation-management.component.html',
  styleUrls: ['./reservation-management.component.scss']
})
export class ReservationManagementComponent implements OnInit {
  listOfReservations: ReservationView[];

  constructor(private reservationService: ReservationService) { }

  ngOnInit() {
    this.reservationService.getReservationsForUser().subscribe((reservations: ReservationView[]) => {
      this.listOfReservations = reservations;
    });
  }

}

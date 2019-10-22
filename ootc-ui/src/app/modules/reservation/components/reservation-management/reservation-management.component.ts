import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ReservationService } from 'src/app/services/reservation.service';
import { ReservationView } from 'src/app/models/ReservationView';
import { MatSelectionList } from '@angular/material/list';
import { TimeSlotView } from 'src/app/models/TimeSlotView';
import { Reservation } from 'src/app/models/Reservation';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-reservation-management',
  templateUrl: './reservation-management.component.html',
  styleUrls: ['./reservation-management.component.scss']
})
export class ReservationManagementComponent implements OnInit {
  reservations: ReservationView[];

  @ViewChild('reservationList', {static: false}) reservationList: MatSelectionList;

  constructor(private reservationService: ReservationService) { }

  ngOnInit() {
    this.getReservations();
  }

  private getReservations() {
    this.reservationService.getReservationsForUser()
      .subscribe((reservations: ReservationView[]) => {
        this.reservations = reservations;
      });
  }

  clearSelected(): void {
    this.reservationList.deselectAll();
  }

  cancelSelected() {
    // TODO: pop a modal 

    const newReservationsReqs = this.reservationList.selectedOptions.selected.map(o => {
      const reservation: ReservationView = <ReservationView> o.value;
      return this.reservationService.cancelReservation(reservation.id);
    });

    forkJoin(newReservationsReqs).subscribe(results => {
      console.log(results);
    });    
  }
}

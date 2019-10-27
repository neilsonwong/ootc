import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReservationView } from 'src/app/models/ReservationView';
import { ConfirmationDialogComponent } from 'src/app/modules/shared/components/confirmation-dialog/confirmation-dialog.component';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-reservation-management',
  templateUrl: './reservation-management.component.html',
  styleUrls: ['./reservation-management.component.scss']
})
export class ReservationManagementComponent implements OnInit {
  reservations: ReservationView[];


  constructor(private reservationService: ReservationService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.getReservations();
  }

  private getReservations() {
    this.reservationService.getReservationsForUser()
      .subscribe((reservations: ReservationView[]) => {
        this.reservations = reservations;
      });
  }

  onCancel(reservationId: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Cancel Reservation',
        text: 'Are you sure you want to cancel this reservation?',
        yesNo: true
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result === true) {
        console.log('we are cancelling')
        this.reservationService.cancelReservation(reservationId).subscribe();
      }
    });
  }
}

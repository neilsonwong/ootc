import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ReservationView } from 'src/app/models/ReservationView';
import { ConfirmationDialogComponent } from 'src/app/modules/shared/components/confirmation-dialog/confirmation-dialog.component';
import { ReservationService } from 'src/app/services/reservation.service';
import { LoadingDialogComponent } from 'src/app/modules/shared/components/loading-dialog/loading-dialog.component';

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
      if (result === true) {
        this.cancelReservation(reservationId);
      }
    });
  }
  
  private cancelReservation(reservationId: number) {
    let dialogRef;
    let done = false;

    setTimeout(() => {
      if (!done) {
        dialogRef = this.dialog.open(LoadingDialogComponent, {
          data: {
            title: 'Deleting',
            text: 'Deleting your reservation'
          }
        });
      }
    }, 300);

    this.reservationService.cancelReservation(reservationId).subscribe(() => {
      done = true;

      // close the modal
      if (dialogRef) {
        dialogRef.close();
      }

      // refresh the reservations list
      this.getReservations();
    });
  }
}

import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { tap } from 'rxjs/operators';
import { DIALOG_WIDTHS } from 'src/app/constants/dialog-widths';
import { LoadState } from 'src/app/constants/load-state.enum';
import { ReservationView } from 'src/app/models/ReservationView';
import { ConfirmationDialogComponent } from 'src/app/modules/shared/components/confirmation-dialog/confirmation-dialog.component';
import { LoadingService } from 'src/app/services/loading.service';
import { ReservationService } from 'src/app/services/reservation.service';
import { to12HourClock } from 'src/app/utils/reservationDisplay';
import { LocaleService } from 'src/app/services/locale.service';
import { TranslationService } from 'src/app/services/translationService';

@Component({
  selector: 'app-reservation-management',
  templateUrl: './reservation-management.component.html',
  styleUrls: ['./reservation-management.component.scss']
})
export class ReservationManagementComponent implements OnInit {
  reservations: ReservationView[];

  constructor(private reservationService: ReservationService,
    private loadingService: LoadingService,
    public dialog: MatDialog,
    private localeService: LocaleService,
    private translationService: TranslationService) { }

  ngOnInit() {
    this.getReservations();
  }

  private getReservations() {
    this.reservationService.getReservationsForUser()
      .subscribe((reservations: ReservationView[]) => {
        this.reservations = reservations;
      });
  }

  onCancel(reservation: ReservationView) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: $localize `:@@modal.cancelReservation.title:Cancel Reservation`,
        text: $localize `:@@modal.cancelReservation.text:Are you sure you want to cancel this reservation?`,
        yesNo: true
      },
      width: DIALOG_WIDTHS.CONFIRMATION
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.cancelReservation(reservation);
      }
    });
  }
  
  private cancelReservation(reservation: ReservationView) {
    reservation.desc = this.translationService.translateRole(reservation.desc);
    const cancelObs = this.reservationService.cancelReservation(reservation.id)
      .pipe(tap(() => { this.getReservations(); }));

    this.loadingService.callWithLoader(cancelObs, [
      { state: LoadState.Loading, title: $localize `:@@mySchedule.cancel.loader.title:Cancelling`, text: $localize `:@@mySchedule.cancel.loader.text:Sending Cancellation ...` },
      { state: LoadState.Complete, title: $localize `:@@mySchedule.cancel.loader.done.title:Cancelled`, text: $localize
`:@@mySchedule.cancel.loader.done.text:We have cancelled your session for  
**${reservation.desc}** on  
**${formatDate(reservation.startDate, 'fullDate', this.localeService.locale)}** at **${to12HourClock(reservation.startTime)}**.`},
      { state: LoadState.Error, title: $localize `:@@mySchedule.cancel.loader.error:Cancellation Error` }
    ]);
  }
}

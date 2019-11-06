import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TimeSlotView } from 'src/app/models/TimeSlotView';
import { EventDetailsComponent } from 'src/app/helpers/event-details.component';
import { ScheduleService } from 'src/app/services/schedule.service';
import { Reservation } from 'src/app/models/Reservation';
import { MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from 'src/app/modules/shared/components/confirmation-dialog/confirmation-dialog.component';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-time-slot-details',
  templateUrl: './time-slot-details.component.html',
  styleUrls: ['./time-slot-details.component.scss']
})
export class TimeSlotDetailsComponent extends EventDetailsComponent implements OnInit {

  private timeSlot: TimeSlotView;
  public reservations: Reservation[];

  public department: string;
  public reserved: number;
  public totalSpots: number;
  public warn: boolean;

  /* inherited from EventDetailsComponent
  public startDate: string;
  public startTime: string;
  public endTime: string;
  public desc: string;
  public duration: number;
  */

  constructor(private scheduleService: ScheduleService,
    private reservationService: ReservationService,
    public dialog: MatDialog) {
    super();
  }

  ngOnInit() {
    this.setupFields();
  }

  setupFields() {
    super.ngOnInit();

    this.timeSlot = this.event as TimeSlotView;

    this.department = this.event.department;
    this.totalSpots = this.timeSlot.signUpCap;
    this.reserved = this.timeSlot.reserved;

    // warn if total < 5 and someone is missing
    if (this.totalSpots < 5) {
      this.warn = this.reserved !== this.totalSpots;
    }
    else {
      this.warn = this.reserved < Math.ceil(this.totalSpots * 0.75);
    }
  }

  loadReservations() {
    this.scheduleService.getReservationsForTimeslot(this.timeSlot.id)
      .subscribe((reservations: Reservation[]) => {
        this.reservations = reservations;
      });
  }

  onDeleteReservation(reservation: Reservation) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Delete Reservation',
        text: 'Are you sure you want to delete this reservation?',
        yesNo: true
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteReservation(reservation);
      }
    });
  }

  deleteReservation(reservation: Reservation) {
    this.reservationService.deleteReservation(reservation.id)
      .subscribe((res) => {
        this.loadReservations();
        this.refreshTimeSlot(this.timeSlot.id);
      })
  }


  refreshTimeSlot(timeSlotId: number) {
    this.scheduleService.getTimeSlot(timeSlotId)
      .subscribe((timeSlot: TimeSlotView) => {
        this.event = timeSlot;
        this.setupFields();
      });
  }

  makeReservationForUser() {
    console.log('Not Done Yet');
  }
}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TimeSlotView } from 'src/app/models/TimeSlotView';
import { EventDetails } from 'src/app/helpers/event-details';
import { ScheduleService } from 'src/app/services/schedule.service';
import { Reservation } from 'src/app/models/Reservation';
import { MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from 'src/app/modules/shared/components/confirmation-dialog/confirmation-dialog.component';
import { ReservationService } from 'src/app/services/reservation.service';
import { AssignReservationDialogComponent } from '../assign-reservation-dialog/assign-reservation-dialog.component';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';
import { tap } from 'rxjs/operators';
import { DIALOG_WIDTHS } from 'src/app/constants/dialog-widths';

@Component({
  selector: 'app-time-slot-details',
  templateUrl: './time-slot-details.component.html',
  styleUrls: ['./time-slot-details.component.scss']
})
export class TimeSlotDetailsComponent extends EventDetails implements OnInit {

  private timeSlot: TimeSlotView;
  private userList: User[];
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

  constructor(
    private userService: UserService,
    private scheduleService: ScheduleService,
    private reservationService: ReservationService,
    public dialog: MatDialog) {
    super();
  }

  ngOnInit() {
    this.setupFields();
    // run in parallel
    this.getAllUsers();
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

  onDeleteReservation(reservation: Reservation) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Delete Reservation',
        text: 'Are you sure you want to delete this reservation?',
        yesNo: true
      },
      width: DIALOG_WIDTHS.CONFIRMATION
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteReservation(reservation);
      }
    });
  }

  deleteReservation(reservation: Reservation) {
    this.reservationService.deleteReservation(reservation.id)
      .pipe(tap(() => this.refreshState()))
      .subscribe();
  }

  makeReservationForUser() {
    const dialogRef = this.dialog.open(AssignReservationDialogComponent, {
      data: {
        userList: this.userList
      },
      width: DIALOG_WIDTHS.ASSIGN_RESERVATION
    });

    dialogRef.componentInstance.event = this.timeSlot;

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('making the reservation');
        this.reservationService.addReservationForUser(result)
          .pipe(tap(() => this.refreshState()))
          .subscribe(res => {
            console.log('reservation made');
          });
      }
    });
  }

  private getAllUsers() {
    // TODO: optimize this later, should not be in this level, makes it slow
    this.userService.getAllUsers().subscribe((users: any[]) => {
      this.userList = users;
    });
  }

  public loadReservations() {
    this.scheduleService.getReservationsForTimeslot(this.timeSlot.id)
      .subscribe((reservations: Reservation[]) => {
        this.reservations = reservations;
      });
  }

  private refreshState() {
    this.loadReservations();

    this.scheduleService.getTimeSlot(this.timeSlot.id)
      .subscribe((timeSlot: TimeSlotView) => {
        this.event = timeSlot;
        this.setupFields();
      });
  }
}

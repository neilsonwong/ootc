import { Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog, MatOption, MatSelect, MatSelectChange } from '@angular/material';
import { MatSelectionList, MatSelectionListChange } from '@angular/material/list';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { DIALOG_WIDTHS } from 'src/app/constants/dialog-widths';
import { GroupedEventList } from 'src/app/helpers/grouped-event-list';
import { IBlockedTime } from 'src/app/interfaces/IBlockedTime';
import { IGroupedBlockedTimes } from 'src/app/interfaces/IGroupedBlockedTimes';
import { Department } from 'src/app/models/Department';
import { Reservation } from 'src/app/models/Reservation';
import { ReservationView } from 'src/app/models/ReservationView';
import { TimeSlotView } from 'src/app/models/TimeSlotView';
import { LoadingDialogComponent } from 'src/app/modules/shared/components/loading-dialog/loading-dialog.component';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ReservationService } from 'src/app/services/reservation.service';
import { ScheduleService } from 'src/app/services/schedule.service';
import * as reservationDisplayUtils from 'src/app/utils/reservationDisplay';

const twoMonthsInMillis = 60*60*24*60*1000;

@Component({
  selector: 'app-reservation-sign-up-form',
  templateUrl: './reservation-sign-up-form.component.html',
  styleUrls: ['./reservation-sign-up-form.component.scss']
})
export class ReservationSignUpFormComponent extends GroupedEventList implements OnInit, OnChanges {
  @Input() department: Department;
  @Input() reservations: ReservationView[];
  @Output() reservationsChanged = new EventEmitter<boolean>();

  @ViewChild('timeSlots', {static: false}) timeSlots: MatSelectionList;
  @ViewChild('roleSelect', {static: false}) roleFilter: MatSelect;
  @ViewChild('allRolesOption', {static: false}) allRolesOption: MatOption;

  private startDate: string;
  private endDate: string;
  private userId: string;

  public available: TimeSlotView[];
  public blocked: IGroupedBlockedTimes = {};
  public reservedTimeSlotIds: number[];
  public roles: string[];

  constructor(
    public dialog: MatDialog,
    private reservationService: ReservationService,
    private scheduleService: ScheduleService,
    private authService: AuthenticationService) {
    super();
  }

  ngOnInit(): void {
    // TODO: fix the dates later when we're not testing
    const today = new Date();
    const twoMonthsLater = new Date(Date.now() + twoMonthsInMillis);
    const fourMonthsLater = new Date(Date.now() + 2*twoMonthsInMillis);

    this.startDate = reservationDisplayUtils.dateToYYYYMMDD(twoMonthsLater);
    this.endDate = reservationDisplayUtils.dateToYYYYMMDD(fourMonthsLater);

    this.userId = this.authService.getAuthContext().username;
  }

  ngOnChanges() {
    this.setupForm();
  }

  private setupForm() {
    if (this.department !== undefined) {
      this.getAvailableTimeSlots(() => {
        this.initRoles();
        this.initReservationBasedFields();
        this.clearSelected();
        if (this.roleFilter) {
          if (this.roles.indexOf(this.roleFilter.value) !== -1) {
            this.onFilterChanged(this.roleFilter.value);
          }
          else {
            this.allRolesOption.select();
            this.onFilterChanged('All');
          }
        }
      });
    }
  }

  clearSelected(): void {
    if (this.timeSlots) {
      this.timeSlots.selectedOptions.selected.forEach(o => {
        const timeSlot: TimeSlotView = <TimeSlotView> o.value;
        this.removeBlocked(timeSlot);
      });
      this.timeSlots.deselectAll();
    }
  }

  reserveSelected() {
    let dialogRef;
    let done = false;

    setTimeout(() => {
      if (!done) {
        dialogRef = this.dialog.open(LoadingDialogComponent, {
          data: {
            title: 'Reserving',
            text: 'Booking your reservation'
          },
          width: DIALOG_WIDTHS.LOADING
        });
      }
    }, 300);

    const newReservationsReqs = this.timeSlots.selectedOptions.selected.map(o => {
      const timeSlot: TimeSlotView = <TimeSlotView> o.value;
      const reservation = new Reservation(undefined, this.userId, timeSlot.id, false);
      return this.reservationService.addReservation(reservation);
    });

    forkJoin(newReservationsReqs).subscribe(results => {
      done = true;
      // close the modal
      if (dialogRef) {
        dialogRef.close();
      }

      // check refresh the reservation list
      this.reservationsChanged.emit(true);
      this.setupForm();
    });
  }

  private getAvailableTimeSlots(postRun: () => void): void {
    this.scheduleService.getTimeSlots(this.department.id, this.startDate, this.endDate)
      .pipe(map((timeSlots: TimeSlotView[]) => {
        return timeSlots.map((timeSlotView: TimeSlotView) => {
          timeSlotView.hasSpace = timeSlotView.reserved < timeSlotView.signUpCap;
          return timeSlotView;
        });
      }))
      .subscribe((timeSlots: TimeSlotView[]) => {
        this.allTimeSlots = timeSlots;
        if (!this.available) {
          this.available = [].concat(this.allTimeSlots);
        }
        this.processSchedule();
        postRun();
      });
  }

  private initReservationBasedFields() {
    this.reservedTimeSlotIds = [];

    if (this.reservations) {
      for(const reservation of this.reservations) {
        // init reserved quick access
        this.reservedTimeSlotIds.push(reservation.timeSlotId);

        // init blocked array
        if (this.blocked[reservation.startDate] === undefined) {
          this.blocked[reservation.startDate] = [];
        }
  
        this.blocked[reservation.startDate].push({
          startTime: reservationDisplayUtils.getDateTime(reservation.startDate, reservation.startTime),
          endTime: reservationDisplayUtils.getDateTime(reservation.startDate, reservation.startTime, reservation.duration)
        });
      }
    }
  }

  private initRoles() {
    if (this.allTimeSlots) {
      this.roles = this.allTimeSlots
        .map((e: TimeSlotView) => (e.desc))
        .filter((v, i, a) => a.indexOf(v) === i); 
    }
  }

  onSelectionChange(event: MatSelectionListChange) {
    const timeSlot: TimeSlotView = event.option.value;
    if (event.option.selected) {
      this.addBlocked(timeSlot);
    }
    else {
      this.removeBlocked(timeSlot);
    }
  }

  private addBlocked(timeSlot: TimeSlotView): void {
    if (this.blocked[timeSlot.startDate] === undefined) {
      this.blocked[timeSlot.startDate] = [];
    }

    const temp: IBlockedTime[] = [...this.blocked[timeSlot.startDate]];
    temp.push({
      startTime: reservationDisplayUtils.getDateTime(timeSlot.startDate, timeSlot.startTime),
      endTime: reservationDisplayUtils.getDateTime(timeSlot.startDate, timeSlot.startTime, timeSlot.duration),
      timeSlotId: timeSlot.id,
    });
    this.blocked[timeSlot.startDate] = temp;
  }

  private removeBlocked(timeSlot: TimeSlotView): void {
    this.blocked[timeSlot.startDate] = this.blocked[timeSlot.startDate].filter((e: IBlockedTime) => {
      return (e.timeSlotId !== timeSlot.id);
    });
  }

  onFilterChanged(event: MatSelectChange | string) {
    // clear our check boxes and remove from blocked
    this.clearSelected();

    // run the filter
    const filterRole: string = typeof event === 'string' ? event : event.value;
    if (filterRole === 'All') {
      this.available = [].concat(this.allTimeSlots);
    }
    else {
      this.available = this.allTimeSlots.filter((t: TimeSlotView) => {
        return t.desc === filterRole;
      });
    }
  }
}

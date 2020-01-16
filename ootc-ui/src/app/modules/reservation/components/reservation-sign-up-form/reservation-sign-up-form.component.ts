import { Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog, MatOption, MatSelect, MatSelectChange } from '@angular/material';
import { MatSelectionList, MatSelectionListChange } from '@angular/material/list';
import { forkJoin, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { LoadState } from 'src/app/constants/load-state.enum';
import { GroupedEventList } from 'src/app/helpers/grouped-event-list';
import { IBlockedTime } from 'src/app/interfaces/IBlockedTime';
import { IGroupedBlockedTimes } from 'src/app/interfaces/IGroupedBlockedTimes';
import { IGroupedTimeSlotViews } from 'src/app/interfaces/IGroupedTimeSlotViews';
import { Department } from 'src/app/models/Department';
import { Reservation } from 'src/app/models/Reservation';
import { ReservationView } from 'src/app/models/ReservationView';
import { TimeSlotView } from 'src/app/models/TimeSlotView';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { LoadingService } from 'src/app/services/loading.service';
import { ReservationService } from 'src/app/services/reservation.service';
import { ScheduleService } from 'src/app/services/schedule.service';
import * as reservationDisplayUtils from 'src/app/utils/reservationDisplay';
import * as dateUtils from 'src/app/utils/dateUtils';
import * as moment from 'moment';
import { TranslationService } from 'src/app/services/translationService';

@Component({
  selector: 'app-reservation-sign-up-form',
  templateUrl: './reservation-sign-up-form.component.html',
  styleUrls: ['./reservation-sign-up-form.component.scss']
})
export class ReservationSignUpFormComponent extends GroupedEventList implements OnInit, OnChanges {
  @Input() department: Department;
  @Input() reservations: ReservationView[];
  @Output() reservationsChanged = new EventEmitter<boolean>();

  @ViewChild('timeSlots') timeSlots: MatSelectionList;
  @ViewChild('roleSelect') roleFilter: MatSelect;
  @ViewChild('allRolesOption') allRolesOption: MatOption;

  private startDate: string;
  private endDate: string;
  private userId: string;

  public available: TimeSlotView[];
  public blocked: IGroupedBlockedTimes = {};
  public reservedTimeSlotIds: number[];
  public roles: string[];
  public filterRole: string;
  public groupedDisplayTimeSlots: IGroupedTimeSlotViews = {};

  constructor(
    public dialog: MatDialog,
    private reservationService: ReservationService,
    private scheduleService: ScheduleService,
    private loadingService: LoadingService,
    private authService: AuthenticationService,
    private translationService: TranslationService) {
    super();
  }

  ngOnInit(): void {
    const rootDate = dateUtils.nowOrStartOfSeason();
    const twoMonthsLater = moment(rootDate).add(2, 'months')

    this.startDate = rootDate.format('YYYY-MM-DD');
    this.endDate = twoMonthsLater.format('YYYY-MM-DD');

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
        const timeSlot: TimeSlotView = <TimeSlotView>o.value;
        this.removeBlocked(timeSlot);
      });
      this.timeSlots.deselectAll();
    }
  }

  reserveSelected() {
    // make sure our reservations haven't changed
    // if so tell the user to reserve again

    this.reservationService.getReservationsForUser()
      .pipe(map((newestReservations: ReservationView[]) => {
        if (newestReservations.length === this.reservations.length) {
          // check if each reservation is the same
          const a = newestReservations.map(r => r.id).sort();
          const b = this.reservations.map(r => r.id).sort();
          for (let i = 0; i < a.length; ++i) {
            if (a[i] !== b[i]) {
              return true;
            }
          }
          return false;
        }
        return true;
      })).subscribe((reservationsChanged: boolean) => {
        if (reservationsChanged === false) {
          const newReservationsReqs = this.timeSlots.selectedOptions.selected.map(o => {
            const timeSlot: TimeSlotView = <TimeSlotView>o.value;
            const reservation = new Reservation(undefined, this.userId, timeSlot.id, 0);
            timeSlot.desc = this.translationService.translateRole(timeSlot.desc);
            return this.reservationService.addReservation(reservation)
              .pipe(
                map((val) => ($localize `:@@volunteerSignUp.success:SUCCESS: **${timeSlot.desc}** on **${timeSlot.startDate}** **${reservationDisplayUtils.to12HourClock(timeSlot.startTime)}**  `)),
                catchError((err) => of($localize `:@@volunteerSignUp.failure:FAILED: **${timeSlot.desc}** on **${timeSlot.startDate}** **${reservationDisplayUtils.to12HourClock(timeSlot.startTime)}**  `))
              );
          });

          const batchSignUpObs = forkJoin(newReservationsReqs)
            .pipe(
              map((val: string[]) => ($localize `:@@volunteerSignUp.results:#### Sign up results! ${'\n'+ val.join('\n\n')}`)),
              tap(() => {
                this.reservationsChanged.emit(true);
                this.setupForm();
              })
            );

          this.loadingService.callWithLoader(batchSignUpObs, [
            { state: LoadState.Loading, title: $localize `:@@volunteerSignUp.loader.title:Signing you up!`, text: $localize `:@@volunteerSignUp.loader.text:Sign ups are processing ...` },
            { state: LoadState.Complete, title: $localize `:@@volunteerSignUp.loader.done:Sign ups complete.` },
            { state: LoadState.Error, title: $localize `:@@volunteerSignUp.loader.error:Unable to sign up.` }
          ]);
        }
        else {
          this.reservationsChanged.emit(true);
          // TODO: add a dialog here later
        }
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
      for (const reservation of this.reservations) {
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
        .map((e: TimeSlotView) => (this.translationService.translateRole(e.desc)))
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
    const roleString = typeof event === 'string' ? event : event.value;

    // run the filter
    this.filterRole = (roleString) === 'All' ? undefined : roleString;

    if (roleString === 'All') {
      this.groupedDisplayTimeSlots = this.groupedTimeSlots;
    }
    else {
      const temp = {};
      for (const day in this.groupedTimeSlots) {
        temp[day] = this.groupedTimeSlots[day].filter((t: TimeSlotView) => (this.translationService.translateRole(t.desc) === roleString));
      }
      this.groupedDisplayTimeSlots = temp;
    }
  }
}

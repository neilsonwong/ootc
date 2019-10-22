import { Component, OnInit, Input, OnChanges, ViewChild } from '@angular/core';
import { MatSelectionList } from '@angular/material/list';
import { forkJoin } from 'rxjs';

import { TimeSlotView } from 'src/app/models/TimeSlotView';
import { Department } from 'src/app/models/Department';
import { Reservation } from 'src/app/models/Reservation';

import { ScheduleService } from 'src/app/services/schedule.service';
import { ReservationService } from 'src/app/services/reservation.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

import * as reservationDisplayUtils from 'src/app/utils/reservationDisplay';

const twoMonthsInMillis = 60*60*24*60*1000;

@Component({
  selector: 'app-reservation-sign-up-form',
  templateUrl: './reservation-sign-up-form.component.html',
  styleUrls: ['./reservation-sign-up-form.component.scss']
})
export class ReservationSignUpFormComponent implements OnInit, OnChanges {
  @Input() department: Department;

  @ViewChild('reservations', {static: false}) reservations: MatSelectionList;
  
  private startDate: string;
  private endDate: string;
  private userId: string;

  public available: TimeSlotView[];

  constructor(private reservationService: ReservationService,
    private scheduleService: ScheduleService,
    private authService: AuthenticationService) { }

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
    if (this.department !== undefined) {
      this.getAvailableTimeSlots();
    }
  }

  clearSelected(): void {
    this.reservations.deselectAll();
  }

  reserveSelected() {
    const newReservationsReqs = this.reservations.selectedOptions.selected.map(o => {
      const timeSlot: TimeSlotView = <TimeSlotView> o.value;
      const reservation = new Reservation(undefined, this.userId, timeSlot.id, false);
      return this.reservationService.addReservation(reservation);
    });

    forkJoin(newReservationsReqs).subscribe(results => {
      console.log(results);
    });    
  }

  private getAvailableTimeSlots(): void {
    this.scheduleService.getTimeSlots(this.department.id, this.startDate, this.endDate)
      .subscribe((timeSlots: TimeSlotView[]) => {
        this.available = timeSlots;
      });
  }
}

import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { TimeSlotView } from 'src/app/models/TimeSlotView';
import { ScheduleService } from 'src/app/services/schedule.service';
import { Department } from 'src/app/models/Department';

const twoMonthsInMillis = 60*60*24*60*1000;

@Component({
  selector: 'app-reservation-sign-up-form',
  templateUrl: './reservation-sign-up-form.component.html',
  styleUrls: ['./reservation-sign-up-form.component.scss']
})
export class ReservationSignUpFormComponent implements OnInit, OnChanges {
  @Input() department: Department;
  
  private startDate: string;
  private endDate: string;

  public available: TimeSlotView[];

  constructor(private scheduleService: ScheduleService) { }

  ngOnInit(): void {
    const today = new Date();
    const twoMonthsLater = new Date(Date.now() + twoMonthsInMillis);
    const fourMonthsLater = new Date(Date.now() + 2*twoMonthsInMillis);

    this.startDate = this.dateToYYYYMMDD(twoMonthsLater);
    this.endDate = this.dateToYYYYMMDD(fourMonthsLater);
  }

  ngOnChanges() {
    if (this.department !== undefined) {
      this.getAvailableTimeSlots();
    }
  }

  getAvailableTimeSlots() {
    this.scheduleService.getTimeSlots(this.department.id, this.startDate, this.endDate)
      .subscribe((timeSlots: TimeSlotView[]) => {
        this.available = timeSlots;
      });
  }

  private dateToYYYYMMDD(date: Date) {
    return [
      date.getFullYear(),
      ('0' + (date.getMonth() + 1)).slice(-2),
      ('0' + date.getDate()).slice(-2)
    ].join('-');
  }
}

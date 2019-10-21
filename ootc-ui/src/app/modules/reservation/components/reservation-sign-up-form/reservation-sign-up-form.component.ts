import { Component, OnInit, Input } from '@angular/core';
import { TimeSlotView } from 'src/app/models/TimeSlotView';
import { ScheduleService } from 'src/app/services/schedule.service';

const twoMonthsInMillis = 60*60*24*60*1000;

@Component({
  selector: 'app-reservation-sign-up-form',
  templateUrl: './reservation-sign-up-form.component.html',
  styleUrls: ['./reservation-sign-up-form.component.scss']
})
export class ReservationSignUpFormComponent implements OnInit {
  @Input() departmentId: number;
  private startDate: string;
  private endDate: string;

  public available: TimeSlotView[];

  constructor(private scheduleService: ScheduleService) {
    const today = new Date();
    const twoMonthsLater = new Date(Date.now() + twoMonthsInMillis);

    this.startDate = this.dateToYYYYMMDD(today);
    this.endDate = this.dateToYYYYMMDD(twoMonthsLater);
  }

  ngOnInit() {
    if (this.departmentId !== undefined) {
      this.getAvailableTimeSlots();
    }
  }

  getAvailableTimeSlots() {
    this.scheduleService.getTimeSlots(this.departmentId, this.startDate, this.endDate)
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

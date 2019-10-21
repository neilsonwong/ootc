import { Component, OnInit, Input } from '@angular/core';
import { TimeSlotView } from 'src/app/models/TimeSlotView';

@Component({
  selector: 'app-reservation-sign-up-line',
  templateUrl: './reservation-sign-up-line.component.html',
  styleUrls: ['./reservation-sign-up-line.component.scss']
})
export class ReservationSignUpLineComponent implements OnInit {
  @Input() timeSlot: TimeSlotView;

  public startTime: string;
  public endTime: string;
  public duration: string;
  public spotsLeft: number;

  constructor() { }

  ngOnInit() {
    this.spotsLeft = this.timeSlot.signUpCap - this.timeSlot.reserved;
    this.duration = this.minutesToHourString(this.timeSlot.duration);
    this.startTime = this.to12HourClock(this.timeSlot.startTime);
    this.endTime = this.getEndTime(this.timeSlot.startDate, this.timeSlot.startTime, this.timeSlot.duration);
  }

  private minutesToHourString(minutes: number): string {
    if (minutes < 60) {
      return `${minutes} mins`;
    }
    else {
      const hourDecimal = minutes % 60 === 0 ?
      (minutes / 60).toString() :
      (minutes / 60).toFixed(1).toString();
      return `${hourDecimal} hours`;
    }
  }

  private to12HourClock(time: string) {
    const [hour, min] = time.split(':').map(e => (parseInt(e)));
    const AMPM = (hour > 12) ? 'PM' : 'AM';

    const fixedHours = hour === 0 ? 12 : hour % 12;
    const fixedMins = ('0' + min).slice(-2);
    return `${fixedHours}:${fixedMins} ${AMPM}`;
  }

  private getEndTime(startDate: string, startTime: string, duration: number): string {
    const [year, month, day] = startDate.split('-').map(e => (parseInt(e)));
    const [hour, min] = startTime.split(':').map(e => (parseInt(e)));
    const jsStartDate = new Date(year, month - 1, day, hour, min);
    const jsEndDate = new Date(jsStartDate.getTime() + 60*1000*duration);

    // i'm leaving this hear for clarity, but this actually is rerun in to12HourClock
    // const endHours = ('0' + jsEndDate.getHours()).slice(-2);
    // const endMinutes = ('0' + jsEndDate.getMinutes()).slice(-2);

    return this.to12HourClock(`${jsEndDate.getHours()}:${jsEndDate.getMinutes()}`);
  }
}

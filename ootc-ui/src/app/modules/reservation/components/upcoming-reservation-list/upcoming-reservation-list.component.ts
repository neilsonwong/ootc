import { Component, Input, OnChanges} from '@angular/core';
import { ReservationView } from 'src/app/models/ReservationView';
import { IGroupedReservationViews } from 'src/app/interfaces/IGroupedReservationViews';

@Component({
  selector: 'app-upcoming-reservation-list',
  templateUrl: './upcoming-reservation-list.component.html',
  styleUrls: ['./upcoming-reservation-list.component.scss']
})
export class UpcomingReservationListComponent implements OnChanges {
  @Input() reservations: ReservationView[];

  public dayList: string[];
  public days: IGroupedReservationViews;

  constructor() {
  }

  ngOnChanges() {
    // this.reservations;
    this.processReservations();
  }

  private processReservations() {
    // bit of reduce magic
    this.days = this.reservations.reduce((acc, obj) => ({
        ...acc,
        [obj['startDate']]: (acc[obj['startDate']] || []).concat(obj)
      }), {});
    
    this.dayList = Object.keys(this.days).sort((a, b) => (a.localeCompare(b)));
    if (this.dayList.length > 3) {
      this.dayList = this.dayList.slice(0, 3);
    }

    for (const day of this.dayList) {
      this.days[day] = this.days[day]
        .sort((a,b) => (a.startTime.localeCompare(b.startTime)));
    }
  }
}


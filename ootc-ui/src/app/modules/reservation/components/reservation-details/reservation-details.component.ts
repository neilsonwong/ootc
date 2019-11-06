import { Component, OnInit } from '@angular/core';
import { EventDetailsComponent } from 'src/app/helpers/event-details.component';

@Component({
  selector: 'app-reservation-details',
  templateUrl: './reservation-details.component.html',
  styleUrls: ['./reservation-details.component.scss']
})
export class ReservationDetailsComponent extends EventDetailsComponent implements OnInit {
  constructor() {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
  }
}

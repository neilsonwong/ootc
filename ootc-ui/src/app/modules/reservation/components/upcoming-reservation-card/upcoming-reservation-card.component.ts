import { Component, OnInit, Input } from '@angular/core';
import { ReservationView } from 'src/app/models/ReservationView';

@Component({
  selector: 'app-upcoming-reservation-card',
  templateUrl: './upcoming-reservation-card.component.html',
  styleUrls: ['./upcoming-reservation-card.component.scss']
})
export class UpcomingReservationCardComponent implements OnInit {
  @Input() date: string;
  @Input() reservations: ReservationView[];

  constructor() { }

  ngOnInit() {
  }

}

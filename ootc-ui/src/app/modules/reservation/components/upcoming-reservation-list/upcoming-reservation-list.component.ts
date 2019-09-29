import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-upcoming-reservation-list',
  templateUrl: './upcoming-reservation-list.component.html',
  styleUrls: ['./upcoming-reservation-list.component.scss']
})
export class UpcomingReservationListComponent implements OnInit {
  @Input() reservations: any;
  
  constructor() { }

  ngOnInit() {
  }

}

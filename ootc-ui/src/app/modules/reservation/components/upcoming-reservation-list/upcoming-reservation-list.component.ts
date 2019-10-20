import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';

@Component({
  selector: 'app-upcoming-reservation-list',
  templateUrl: './upcoming-reservation-list.component.html',
  styleUrls: ['./upcoming-reservation-list.component.scss']
})

export class UpcomingReservationListComponent implements OnInit {
 // @Input() reservations: any;
  
  title = 'My Scheduler';
  
  mock_date_1 = 'Oct 12th';
  mock_date_2 = 'Oct 19th';
  mock_date_3 = 'Oct 26th';
  mock_date_4 = 'Nov 2nd';
  
  constructor() { }

  ngOnInit() {
  }

}


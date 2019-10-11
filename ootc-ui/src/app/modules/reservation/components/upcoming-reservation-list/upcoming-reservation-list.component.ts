import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';

@Component({
  selector: 'app-upcoming-reservation-list',
  templateUrl: './upcoming-reservation-list.component.html',
  styleUrls: ['./upcoming-reservation-list.component.scss']
})
export class UpcomingReservationListComponent implements OnInit {
 // @Input() reservations: any;
  
  title = 'My Scheduler';
  dates = ['Oct 10th','Oct 17th', 'Oct 24th', 'Oct 31st'];
  
  myDate = this.dates[0];
  
  constructor() { }

  ngOnInit() {
  }

}


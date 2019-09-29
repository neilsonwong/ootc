import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-reservation-details',
  templateUrl: './reservation-details.component.html',
  styleUrls: ['./reservation-details.component.scss']
})
export class ReservationDetailsComponent implements OnInit {
  @Input() reservation: any;
  constructor() { }

  ngOnInit() {
  }

}

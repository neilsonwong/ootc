import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-reservation-management',
  templateUrl: './reservation-management.component.html',
  styleUrls: ['./reservation-management.component.scss']
})
export class ReservationManagementComponent implements OnInit {
  @Input() listOfReservations;

  constructor() { }

  ngOnInit() {
  }

}

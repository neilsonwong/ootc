import { Component, OnInit, Input } from '@angular/core';
import { TimeSlotView } from 'src/app/models/TimeSlotView';

@Component({
  selector: 'app-time-slot-details',
  templateUrl: './time-slot-details.component.html',
  styleUrls: ['./time-slot-details.component.scss']
})
export class TimeSlotDetailsComponent implements OnInit {
  @Input() timeSlot: TimeSlotView;

  constructor() { }

  ngOnInit() {
  }

}

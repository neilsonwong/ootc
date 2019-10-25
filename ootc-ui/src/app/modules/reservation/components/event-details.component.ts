import { OnInit, Input } from '@angular/core';
import { IEvent } from 'src/app/models/IEvent';
import * as reservationDisplayUtils from 'src/app/utils/reservationDisplay';

export class EventDetailsComponent implements OnInit {
  @Input() event: IEvent;
  @Input() simple?: boolean;
  @Input() clear?: boolean;
  @Input() embedded?: boolean;

  public startDate: string;
  public startTime: string;
  public endTime: string;
  public desc: string;
  public duration: string ;

  constructor() { }
  
  ngOnInit() {
    this.startDate = this.event.startDate;
    this.startTime = reservationDisplayUtils.to12HourClock(this.event.startTime);
    this.endTime = reservationDisplayUtils.getEndTime(this.event.startDate, this.event.startTime, this.event.duration);
    this.desc = this.event.desc;
    this.duration = reservationDisplayUtils.minutesToHourString(this.event.duration);
  }
}
import { OnInit, Input, Directive } from '@angular/core';
import { IEvent } from 'src/app/interfaces/IEvent';
import * as reservationDisplayUtils from 'src/app/utils/reservationDisplay';
import { TranslationService } from '../services/translationService';

@Directive()
export class EventDetails implements OnInit {
  @Input() event: IEvent;
  @Input() simple?: boolean;
  @Input() clear?: boolean;
  @Input() embedded?: boolean;

  public startDate: string;
  public startTime: string;
  public endTime: string;
  public desc: string;
  public duration: number;

  public durationPluralMapping = {
    '=0.5': $localize `:@@plurals.duration.halfHour:30 mins`,
    '=1': $localize `:@@plurals.duration.hour:1 hour`,
    'other': $localize `:@@plurals.duration.hours:# hours`,
  };

  constructor(protected translationService: TranslationService) { }
  
  ngOnInit() {
    this.startDate = this.event.startDate;
    this.startTime = reservationDisplayUtils.to12HourClock(this.event.startTime);
    this.endTime = reservationDisplayUtils.getEndTimeString(this.event.startDate, this.event.startTime, this.event.duration);
    this.desc = this.translationService.translateRole(this.event.desc);
    this.duration = this.event.duration / 60;
  }
}
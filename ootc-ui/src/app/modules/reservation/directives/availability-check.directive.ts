import { Directive, Input, HostBinding, OnChanges, Host } from '@angular/core';
import { TimeSlotView } from 'src/app/models/TimeSlotView';
import { IBlockedTime } from 'src/app/interfaces/IBlockedTime';
import * as reservationDisplayUtils from 'src/app/utils/reservationDisplay';
import { MatListOption } from '@angular/material/list';

@Directive({
  selector: '[appAvailabilityCheck]'
})
export class AvailabilityCheckDirective implements OnChanges {
  @Input() value: TimeSlotView;
  @Input() blocked: IBlockedTime[];

  @HostBinding('class.disabled') classDisabled: boolean;

  constructor(@Host() private hostInput: MatListOption) { }

  ngOnChanges(): void {
    this.setDisabled(
      (this.value.hasSpace === false) ||
      this.isBusy());
  }

  private isBusy(): boolean {
    if (this.blocked) {
      for (const busyTime of this.blocked) {
        if (reservationDisplayUtils.conflicts(busyTime, this.value)) {
          return true;
        }
      }
    }
    return false;
  }

  private setDisabled(isDisabled: boolean) {
    this.classDisabled = isDisabled;
    this.hostInput.disabled = isDisabled;
  }
}

import { IGroupedTimeSlotViews } from 'src/app/interfaces/IGroupedTimeSlotViews';
import { TimeSlotView } from 'src/app/models/TimeSlotView';

export class GroupedEventList {
  public days: string[];
  public allTimeSlots: TimeSlotView[];
  public groupedTimeSlots: IGroupedTimeSlotViews = {};

  constructor() { }

  processSchedule() {
    // clear out old ones
    const temp: IGroupedTimeSlotViews = {};

    for (const timeSlot of this.allTimeSlots) {
      if (temp[timeSlot.startDate] === undefined) {
        temp[timeSlot.startDate] = [];
      }
      temp[timeSlot.startDate].push(timeSlot);
    }

    this.groupedTimeSlots = temp;
    this.days = Object.keys(this.groupedTimeSlots);
  }
}
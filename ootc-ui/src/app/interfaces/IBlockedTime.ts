import * as moment from "moment";

export interface IBlockedTime {
    startTime: moment.Moment;
    endTime: moment.Moment;
    timeSlotId?: number;
}
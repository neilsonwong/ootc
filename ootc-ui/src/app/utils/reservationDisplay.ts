import * as moment from 'moment';
import { IBlockedTime } from '../interfaces/IBlockedTime';
import { TimeSlotView } from '../models/TimeSlotView';

export function dateToYYYYMMDD(date: Date): string {
    return [
        date.getFullYear(),
        ('0' + (date.getMonth() + 1)).slice(-2),
        ('0' + date.getDate()).slice(-2)
    ].join('-');
}

export function minutesToHourString(minutes: number): string {
    if (minutes < 60) {
        return `${minutes} mins`;
    }
    else {
        const hourDecimal = minutes % 60 === 0 ?
            (minutes / 60).toString() :
            (minutes / 60).toFixed(1).toString();
        return `${hourDecimal} hours`;
    }
}

export function to12HourClock(time: string) {
    const [hour, min] = time.split(':').map(e => (parseInt(e)));
    const AMPM = (hour > 12) ? 'PM' : 'AM';

    const fixedHours = hour === 0 ? 12 : hour % 12;
    const fixedMins = ('0' + min).slice(-2);
    return `${fixedHours}:${fixedMins} ${AMPM}`;
}

export function getEndTimeString(startDate: string, startTime: string, duration: number): string {
    const endDateTime = getDateTime(startDate, startTime).add(duration, 'minutes');
    return endDateTime.format('h:mm A');
}

export function conflicts(busyTime: IBlockedTime, timeSlot: TimeSlotView): boolean {
    const timeSlotStart = getDateTime(timeSlot.startDate, timeSlot.startTime);
    const timeSlotEnd = moment(timeSlotStart).add(timeSlot.duration, 'minutes');

    const isConflict = busyTime.startTime.isBefore(timeSlotStart) ?
        timeSlotStart.isBetween(busyTime.startTime, busyTime.endTime, 'minute', '[)') :
        busyTime.startTime.isBetween(timeSlotStart, timeSlotEnd, 'minute', '[)');

    return isConflict;
}

export function getDateTime(startDate: string, startTime: string, offset?: number): moment.Moment {
    const paddedStartTime = ('0' + startTime).slice(-5);
    const base = moment(`${startDate} ${paddedStartTime}`);
    if (offset) {
        const basePlus = base.add(offset, 'minutes');
        return basePlus;
    }
    return base;
}
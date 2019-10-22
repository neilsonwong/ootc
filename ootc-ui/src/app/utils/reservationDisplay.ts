
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

export function getEndTime(startDate: string, startTime: string, duration: number): string {
    const [year, month, day] = startDate.split('-').map(e => (parseInt(e)));
    const [hour, min] = startTime.split(':').map(e => (parseInt(e)));
    const jsStartDate = new Date(year, month - 1, day, hour, min);
    const jsEndDate = new Date(jsStartDate.getTime() + 60 * 1000 * duration);

    // i'm leaving this hear for clarity, but this actually is rerun in to12HourClock
    // const endHours = ('0' + jsEndDate.getHours()).slice(-2);
    // const endMinutes = ('0' + jsEndDate.getMinutes()).slice(-2);

    return this.to12HourClock(`${jsEndDate.getHours()}:${jsEndDate.getMinutes()}`);
}
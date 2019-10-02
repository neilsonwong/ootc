export class Reservation {
    id: number;
    user: string;
    timeSlot: string;
    isAttended: boolean;

    constructor (
        id: number,
        user: string,
        timeSlot: string,
        isAttended: boolean
    ) {
        this.id = id;
        this.user = user;
        this.timeSlot = timeSlot;
        this.isAttended = isAttended;
    }
}
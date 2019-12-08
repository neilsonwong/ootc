export class Reservation {
    id: number;
    user: string;
    timeSlot: number;
    attended: number;

    constructor (
        id: number,
        user: string,
        timeSlot: number,
        attended: number 
    ) {
        this.id = id;
        this.user = user;
        this.timeSlot = timeSlot;
        this.attended = attended;
    }
}
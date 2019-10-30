export class ReservationView {
    id: number;
    user: string;
    timeSlotId: number;
    startDate: string;
    startTime: string; 
    duration: number;
    department: string;
    desc: string;

    constructor (
        id: number,
        user: string,
        timeSlotId: number,
        startDate: string,
        startTime: string, 
        duration: number,
        department: string,
        desc: string
    ) {
        this.id = id;
        this.user = user;
        this.timeSlotId = timeSlotId;
        this.startDate = startDate;
        this.startTime = startTime;
        this.duration = duration;
        this.department = department;
        this.desc = desc;
    }
}
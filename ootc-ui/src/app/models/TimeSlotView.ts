export class TimeSlotView {
    id: number;
    startDate: string;
    startTime: string; 
    duration: number;
    department: string;
    reserved: number;
    signUpCap: number;
    desc: string;

    constructor (
        id: number,
        startDate: string,
        startTime: string, 
        duration: number,
        department: string,
        reserved: number,
        signUpCap: number,
        desc: string
    ) {
        this.id = id;

        this.startDate = startDate;
        this.startTime = startTime;
        this.duration = duration;
        this.department = department;
        this.reserved = reserved;
        this.signUpCap = signUpCap;
        this.desc = desc;
    }
}
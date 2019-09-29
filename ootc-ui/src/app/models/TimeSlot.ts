export class TimeSlot {
    id: number;

    startDate: string;
    startTime: string; 
    duration: number;
    department: string;
    signUpCap: number;
    desc: string;

    constructor (
        id: number,
        startDate: string,
        startTime: string, 
        duration: number,
        department: string,
        signUpCap: number,
        desc: string
    ){
        this.id = id;

        this.startDate = startDate;
        this.startTime = startTime;
        this.duration = duration;
        this.department = department;
        this.signUpCap = signUpCap;
        this.desc = desc;
    }
}
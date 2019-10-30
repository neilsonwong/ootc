export class TimeSlotView {
    id: number;
    startDate: string;
    startTime: string; 
    duration: number;
    departmentId: number;
    department: string;
    reserved: number;
    signUpCap: number;
    desc: string;
    hasSpace?: boolean;

    constructor (
        id: number,
        startDate: string,
        startTime: string, 
        duration: number,
        departmentId: number,
        department: string,
        reserved: number,
        signUpCap: number,
        desc: string
    ) {
        this.id = id;

        this.startDate = startDate;
        this.startTime = startTime;
        this.duration = duration;
        this.departmentId = departmentId;
        this.department = department;
        this.reserved = reserved;
        this.signUpCap = signUpCap;
        this.desc = desc;
    }
}
export class TimeSlotDefinition {
    id: number;
    startTime: string;
    duration: number;
    department: number;
    signUpCap: number;
    desc: string;
    repeatStartDate: string;
    repeatCount: number;
    repeatInterval: number;
    repeatSkipEvery: number;

    constructor (
        id: number,
        startTime: string,
        duration: number,
        department: number,
        signUpCap: number,
        desc: string,
        repeatStartDate: string,
        repeatCount: number,
        repeatInterval: number,
        repeatSkipEvery: number
    ){
        this.id = id;

        // relating to day of actual events
        this.startTime = startTime;
        this.duration = duration;
        this.department = department;
        this.signUpCap = signUpCap;
        this.desc = desc;

        // relating to repeat/timeSlot cloning behaviour
        this.repeatStartDate = repeatStartDate;
        this.repeatCount = repeatCount;
        this.repeatInterval = repeatInterval;
        this.repeatSkipEvery = repeatSkipEvery;
    }
}
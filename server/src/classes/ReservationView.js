'use strict'; 

class ReservationView {
    constructor (id, user, timeSlotId, startDate, startTime, duration, department, desc) {
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

module.exports = ReservationView;

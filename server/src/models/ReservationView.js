'use strict'; 

class ReservationView {
    constructor (id, user, startDate, startTime, duration, department, desc) {
        this.id = id;
        this.user = user;
        this.startDate = startDate;
        this.startTime = startTime;
        this.duration = duration;
        this.department = department;
        this.desc = desc;
    }
}

module.exports = ReservationView;

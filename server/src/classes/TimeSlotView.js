'use strict';

class TimeSlotView {
  constructor(id, startDate, startTime, duration, departmentId, department, availableSpots, signUpCap, desc) {
  	this.id = id;
  	this.startDate = startDate;
  	this.startTime = startTime;
    this.duration = duration;
    this.departmentId = departmentId;
    this.department = department;
    this.availableSpots = availableSpots;
    this.signUpCap = signUpCap;
    this.desc = desc;
  }
}

module.exports = TimeSlotView;

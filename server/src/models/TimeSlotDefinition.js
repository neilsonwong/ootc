'use strict';

class TimeSlotDefinition {
  constructor(dayOfWeek, startTime, duration, activityType, signUpCap, year) {
  	this.dayOfWeek = dayOfWeek;
  	this.startTime = startTime;
  	this.duration = duration;
  	this.activityType = activityType;
    this.signUpCap = signUpCap;
    this.year = year;
  }
}

module.exports = TimeSlotDefinition;

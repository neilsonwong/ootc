'use strict';

class TimeSlotDefinition {
  constructor(dayOfWeek, startTime, duration, activityType, signUpCap) {
  	this.dayOfWeek = dayOfWeek;
  	this.startTime = startTime;
  	this.duration = duration;
  	this.activityType = activityType;
  	this.signUpCap = signUpCap;
  }
}

module.exports = TimeSlotDefinition;

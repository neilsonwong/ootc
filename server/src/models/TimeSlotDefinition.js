'use strict';

const Preparable = require('./Preparable');

class TimeSlotDefinition extends Preparable {
  constructor(id, dayOfWeek, startTime, duration, activityType, signUpCap, year) {
    super();
    this.id = id;
  	this.dayOfWeek = dayOfWeek;
  	this.startTime = startTime;
  	this.duration = duration;
  	this.activityType = activityType;
    this.signUpCap = signUpCap;
    this.year = year;
  }
}

module.exports = TimeSlotDefinition;

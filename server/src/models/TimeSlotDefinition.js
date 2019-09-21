'use strict';

const Preparable = require('./Preparable');

class TimeSlotDefinition extends Preparable {
  constructor(id, startTime, duration, department, signUpCap, repeatStartDate, repeatCount, repeatInterval, repeatSkipEvery) {
    super();
    this.id = id;

    // relating to day of actual events
  	this.startTime = startTime;
    this.duration = duration;
  	this.department = department;
    this.signUpCap = signUpCap;

    // relating to repeat/timeSlot cloning behaviour
    this.repeatStartDate = repeatStartDate;
    this.repeatCount = repeatCount;
    this.repeatInterval = repeatInterval;
    this.repeatSkipEvery = repeatSkipEvery;
  }
}

module.exports = TimeSlotDefinition;

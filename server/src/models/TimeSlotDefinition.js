'use strict';

const Preparable = require('./Preparable');

class TimeSlotDefinition extends Preparable {
  constructor(id, dayOfWeek, startTime, duration, department, signUpCap, year) {
    super();
    this.id = id;
  	this.dayOfWeek = dayOfWeek;
  	this.startTime = startTime;
  	this.duration = duration;
  	this.department = department;
    this.signUpCap = signUpCap;
    this.year = year;
  }
}

module.exports = TimeSlotDefinition;

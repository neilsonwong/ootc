'use strict';

const Preparable = require('./Preparable');

class TimeSlot extends Preparable {
  constructor(id, startDate, startTime, duration, department, signUpCap) {
    super();
  	this.id = id;

  	this.startDate = startDate;
  	this.startTime = startTime;
    this.duration = duration;
  	this.department = department;
    this.signUpCap = signUpCap;
  }
}

module.exports = TimeSlot;

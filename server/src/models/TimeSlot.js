'use strict';

const Preparable = require('../classes/Preparable');

class TimeSlot extends Preparable {
  constructor(id, startDate, startTime, duration, department, signUpCap, desc) {
    super();
  	this.id = id;

  	this.startDate = startDate;
  	this.startTime = startTime;
    this.duration = duration;
  	this.department = department;
    this.signUpCap = signUpCap;
    this.desc = desc;
  }
}

module.exports = TimeSlot;

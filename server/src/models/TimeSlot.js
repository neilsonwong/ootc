'use strict';

const Preparable = require('./Preparable');

class TimeSlot extends Preparable {
  constructor(id, datetime, timeSlotDef) {
    super();
  	this.id = id;
  	this.datetime = datetime;
    this.timeSlotDef = timeSlotDef;

    // archival purposes, as timeSlotDef can change
  	this.dayOfWeek = null;
  	this.startTime = null;
  	this.duration = null;
  	this.department = null;
    this.signUpCap = null;
    this.year = null;
  }
}

module.exports = TimeSlot;

'use strict';

const Preparable = require('./Preparable');

class TimeSlot extends Preparable {
  constructor(id, datetime, timeSlotDef) {
    super();
  	this.id = id;
  	this.datetime = datetime;
  	this.timeSlotDef = timeSlotDef;
  }
}

module.exports = TimeSlot;

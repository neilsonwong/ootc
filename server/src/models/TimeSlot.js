'use strict';

const Preparable = require('./Preparable');

class TimeSlot extends Preparable {
  constructor(id, datetime, duration, signUpCap) {
    super();
  	this.id = id;
  	this.datetime = datetime;
  	this.duration = duration;
  	this.signUpCap = signUpCap;
  }
}

module.exports = TimeSlot;

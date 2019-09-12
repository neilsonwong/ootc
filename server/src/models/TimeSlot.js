'use strict';

const uuidv4 = require('uuid/v4');

class TimeSlot {
  constructor(id, datetime, duration, signUpCap) {
  	this.id = id;
  	this.datetime = datetime;
  	this.duration = duration;
  	this.signUpCap = signUpCap;
  }
}

module.exports = TimeSlot;

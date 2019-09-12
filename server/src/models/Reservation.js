'use strict';

class Reservation {
  constructor(user, timeSlot, attended) {
  	this.user = user;
  	this.timeSlot = timeSlot;
  	this.attended = attended;
  }
}

module.exports = Reservation;

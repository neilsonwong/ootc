'use strict';

class Reservation {
  constructor(user, timeSlot, attended) {
  	this.user = user;
  	this.timeSlot = timeSlot;
  	this.attended = attended;
  }

  prepare() {
    return {
      $userid: user;
      $timeSlot: timeSlot;
      $attended: attended;
    }
  }
}

module.exports = Reservation;

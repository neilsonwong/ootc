'use strict';

const Preparable = require('../classes/Preparable');

class Reservation extends Preparable {
  constructor(id, user, timeSlot, attended) {
    super();
    this.id = id;
  	this.user = user;
  	this.timeSlot = timeSlot;
  	this.attended = attended;
  }
}

module.exports = Reservation;

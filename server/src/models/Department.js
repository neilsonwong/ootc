'use strict';

const Preparable = require('./Preparable');

class Department extends Preparable {
  constructor(id, name) {
    super();
    this.id = id;
  	this.name = name;
  }
}

module.exports = Department;

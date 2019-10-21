'use strict';

const Preparable = require('../classes/Preparable');

class Department extends Preparable {
  constructor(id, name, description) {
    super();
    this.id = id;
  	this.name = name;
  	this.description = description;
  }
}

module.exports = Department;

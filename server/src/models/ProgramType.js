'use strict';

class ActivityType {
  constructor(name) {
  	this.name = name;
  }

  prepare() {
    return {
      $programType: name
    }
  }
}

module.exports = ActivityType;

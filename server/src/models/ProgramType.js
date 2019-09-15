'use strict';

class ActivityType {
  constructor(name) {
  	this.name = name;
  }

  prepare() {
    return {
      $name: name
    }
  }
}

module.exports = ActivityType;

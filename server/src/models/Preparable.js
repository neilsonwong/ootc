'use strict';

class Preparable {
  constructor() {}

    // we just want to give this to errbody!!
    // returns a copy of the object with properties prepended with $
    // if a sql statement is passed in, it filters out properties not inside
  prepare(sql) {
    const prepared = {};
    for (const prop in this) {
      // if we have no sql statement
      // or sql contains the prop
      if (!sql || sql.includes(prop)) {
        prepared['$' + prop] = this[prop];
      }
    }
    return prepared;
  }
}

module.exports = Preparable;
'use strict';

const Preparable = require('./Preparable');

class User extends Preparable {
  constructor(id, email, fname, mname, lname, phone, age, experience, comments, validated, admin) {
    super();
    this.id = id;
    this.email = email;
    this.fname = fname;
    this.mname = mname;
    this.lname = lname;
    this.phone = phone;
    this.age = age;
    this.experience = experience;
    this.comments = comments;
    this.validated = validated;
    this.admin = admin; 
  }
}

module.exports = User;

'use strict';

class User {
  constructor(id, email, firstName, middleName, lastName, phone, age, volunteerExp, comments) {
    this.id = id;
    this.email = email;
    this.firstName = firstName;
    this.middleName = middleName;
    this.lastName = lastName;
    this.phone = phone;
    this.age = age;
    this.volunteerExp = volunteerExp;
    this.comments = comments;
    this.validated = false;
  }
}

module.exports = User;

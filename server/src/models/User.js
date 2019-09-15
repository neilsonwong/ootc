'use strict';

class User {
  constructor(id, email, firstName, middleName, lastName, phone, age, volunteerExp, comments, validated, admin) {
    this.id = id;
    this.email = email;
    this.firstName = firstName;
    this.middleName = middleName;
    this.lastName = lastName;
    this.phone = phone;
    this.age = age;
    this.volunteerExp = volunteerExp;
    this.comments = comments;
    this.validated = validated;
    this.admin = admin; 
  }
}

module.exports = User;

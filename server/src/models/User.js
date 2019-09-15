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

  prepare() {
    return {
      $id: id;
      $email: email;
      $fname: firstName;
      $mname: middleName;
      $lname: lastName;
      $phone: phone;
      $age: age;
      $experience: volunteerExp;
      $comments: comments;
      $validate: validated;
      $adin: admin; 
    }
  }

}

module.exports = User;

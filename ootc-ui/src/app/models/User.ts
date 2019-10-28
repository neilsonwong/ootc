export class User {
  id: string;
  email: string;
  fname: string;
  mname: string;
  lname: string;
  phone: number;
  age: number;
  experience: number;
  comments: string;
  isValidated: boolean;
  isAdmin: boolean;

  constructor (
      id: string,
      email: string,
      fname: string,
      mname: string,
      lname: string,
      phone: number,
      age: number,
      experience: number,
      comments: string,
      isValidated?: boolean,
      isAdmin?: boolean,
    ){
     this.id = id;
     this.email = email;
     this.fname = fname;
     this.mname = mname;
     this.lname = lname;
     this.phone = phone;
     this.age = age;
     this.experience = experience;
     this.comments = comments;
     this.isValidated = isValidated;
     this.isAdmin = isAdmin;
  }
}
